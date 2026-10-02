/* ===== TEMAN BELAJAR — app.js (state, router, aksesibilitas) ===== */
(function () {
  'use strict';

  const KEY = 'temanBelajar_v1';
  const SIGNUP_COINS = 5;

  const defaultState = () => ({
    users: [],            // {id, name, email, password, coins, score, progress, unlocked, createdAt}
    currentUserId: null,  // status login
    settings: { highContrast: false, mono: false, fontScale: 1 }
  });

  /* ---------- Store (LocalStorage) ---------- */
  const Store = {
    state: defaultState(),
    load() {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          this.state = Object.assign(defaultState(), saved);
          this.state.settings = Object.assign(defaultState().settings, saved.settings);
          // Migrasi: Mode Tunanetra sudah dihapus. Kembalikan pengaturan sebelum mode itu aktif.
          const st = this.state.settings;
          if (st.blindMode && st.blindPrev) { st.highContrast = st.blindPrev.highContrast; st.fontScale = st.blindPrev.fontScale; }
          delete st.blindMode; delete st.blindPrev;
        }
      } catch (e) { this.state = defaultState(); }
    },
    save() {
      try { localStorage.setItem(KEY, JSON.stringify(this.state)); } catch (e) { /* storage penuh/dinonaktifkan */ }
    },
    get user() { return this.state.users.find(u => u.id === this.state.currentUserId) || null; },
    get isLoggedIn() { return !!this.user; },

    register({ name, email, password }) {
      email = email.trim().toLowerCase();
      if (this.state.users.some(u => u.email === email)) {
        return { ok: false, error: 'Email sudah terdaftar. Silakan masuk.' };
      }
      const user = {
        id: 'u_' + Date.now().toString(36),
        name: name.trim(), email,
        // CATATAN: demo tanpa backend. Jangan simpan password polos di aplikasi nyata.
        password,
        coins: SIGNUP_COINS, score: 0,
        progress: {},        // { [modulId]: persen }
        unlocked: ['dasar'], // modul terbuka
        createdAt: new Date().toISOString()
      };
      this.state.users.push(user);
      this.state.currentUserId = user.id;
      this.save();
      return { ok: true, user };
    },
    login(email, password) {
      email = email.trim().toLowerCase();
      const user = this.state.users.find(u => u.email === email && u.password === password);
      if (!user) return { ok: false, error: 'Email atau kata sandi salah.' };
      this.state.currentUserId = user.id;
      this.save();
      return { ok: true, user };
    },
    logout() { this.state.currentUserId = null; this.save(); },

    /* ----- Sistem koin ----- */
    addCoins(amount) {
      if (!this.user || !(amount > 0)) return { ok: false, error: 'Jumlah koin tidak valid.' };
      this.user.coins += amount;
      this.save();
      return { ok: true, coins: this.user.coins };
    },
    spendCoins(amount) {
      if (!this.user) return { ok: false, error: 'Belum masuk.' };
      if (this.user.coins < amount) return { ok: false, error: 'Koin tidak cukup.' };
      this.user.coins -= amount;
      this.save();
      return { ok: true, coins: this.user.coins };
    },
    unlockModule(id, cost) {
      const u = this.user;
      if (!u) return { ok: false, error: 'Belum masuk.' };
      if (u.unlocked.includes(id)) return { ok: true, already: true, coins: u.coins };
      const paid = this.spendCoins(cost);
      if (!paid.ok) return paid;
      u.unlocked.push(id);
      this.save();
      return { ok: true, coins: u.coins };
    },

    /* ----- Progress, skor, latihan ----- */
    // Progress naik saja (maks 100) kecuali exact=true (mis. hitungan huruf BISINDO)
    setProgress(id, pct, exact) {
      const u = this.user;
      if (!u) return 0;
      pct = Math.max(0, Math.min(100, Math.round(pct)));
      u.progress[id] = exact ? pct : Math.max(u.progress[id] || 0, pct);
      this.save();
      return u.progress[id];
    },
    // Tambah 1 poin hanya pada jawaban benar PERTAMA tiap soal (anti farming poin)
    recordAnswer(questionId, correct) {
      const u = this.user;
      u.answered = u.answered || {};
      const awarded = !!correct && !u.answered[questionId];
      if (correct) u.answered[questionId] = true;
      if (awarded) u.score += 1;
      this.save();
      return { awarded, score: u.score };
    },
    // Hapus progress latihan & modul yang dibeli. Akun dan saldo koin tetap (koin tidak dikembalikan).
    resetProgress() {
      const u = this.user;
      if (!u) return false;
      u.progress = {};
      u.answered = {};
      u.learned = {};
      u.unlocked = ['dasar'];
      u.score = 0;
      this.save();
      return true;
    },
    completedCount() {
      const u = this.user;
      return u ? Object.values(u.progress || {}).filter(p => p >= 100).length : 0;
    },
    learnedList(group) {
      const u = this.user;
      return (u && u.learned && u.learned[group]) || [];
    },
    // Return true jika sekarang ditandai "sudah dipelajari", false jika tanda dilepas
    toggleLearned(group, key) {
      const u = this.user;
      u.learned = u.learned || {};
      const arr = u.learned[group] = u.learned[group] || [];
      const i = arr.indexOf(key);
      if (i >= 0) arr.splice(i, 1); else arr.push(key);
      this.save();
      return i < 0;
    },
    updateUser(patch) { Object.assign(this.user, patch); this.save(); },
    setSetting(k, v) { this.state.settings[k] = v; this.save(); }
  };

  /* ---------- Helper ---------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function toast(msg) {
    const region = document.getElementById('toast-region');
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    region.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }

  /* ---------- Router (hash-based SPA) ---------- */
  const routes = {};   // path -> { render(), title, auth: 'public'|'guest'|'private' }

  const Router = {
    register(path, def) { routes[path] = def; },
    go(path) { location.hash = '#' + path; },
    current() { return (location.hash.replace(/^#/, '') || '/').split('?')[0]; },
    // Cocokkan path persis, atau pola dengan parameter (mis. '/modul/:id')
    match(path) {
      if (routes[path]) return { route: routes[path], params: {} };
      const parts = path.split('/');
      for (const pattern in routes) {
        if (!pattern.includes(':')) continue;
        const pp = pattern.split('/');
        if (pp.length !== parts.length) continue;
        const params = {};
        const ok = pp.every((seg, i) => {
          if (seg.startsWith(':')) { params[seg.slice(1)] = decodeURIComponent(parts[i]); return true; }
          return seg === parts[i];
        });
        if (ok) return { route: routes[pattern], params };
      }
      return { route: routes['/404'], params: {} };
    },
    resolve() {
      const { route, params } = this.match(this.current());
      if (route.auth === 'private' && !Store.isLoggedIn) { return this.go('/login'); }
      if (route.auth === 'guest' && Store.isLoggedIn) { return this.go('/dashboard'); }

      // Bersihkan halaman sebelumnya (mis. paksa monokrom, suara yang sedang dibacakan)
      if (this._active && this._active.unmount) this._active.unmount();
      this._active = route;
      if ('speechSynthesis' in window) speechSynthesis.cancel();

      const app = document.getElementById('app');
      try {
        app.innerHTML = route.render(params);
        if (route.mount) route.mount(app, params);
      } catch (err) {
        console.error(err);
        app.innerHTML = '<section class="card"><h1>Terjadi kesalahan</h1><p>Halaman gagal ditampilkan. Coba muat ulang atau kembali ke <a href="#/">Beranda</a>.</p></section>';
      }
      document.title = (route.title ? route.title + ' — ' : '') + 'TEMAN BELAJAR';
      renderNavbar();
      A11y.apply(); // sinkronkan tombol toggle yang baru dirender
      window.scrollTo(0, 0);
      app.focus({ preventScroll: true }); // fokus ke konten baru untuk screen reader
    }
  };

  /* ---------- Modal konfirmasi kustom (pengganti window.confirm) ---------- */
  // Mengembalikan Promise<boolean>. Fokus awal di tombol "Batal"; Esc / klik latar = batal.
  function confirmModal({ title, text, confirmText = 'Ya', cancelText = 'Batal', icon = 'fa-circle-question', tone = 'primary' }) {
    return new Promise(resolve => {
      const dlg = document.createElement('dialog');
      dlg.className = 'dialog modal';
      dlg.setAttribute('aria-labelledby', 'cm-title');
      dlg.setAttribute('aria-describedby', 'cm-text');
      dlg.innerHTML = `
        <div class="modal__icon modal__icon--${tone}"><i class="fa-solid ${icon}" aria-hidden="true"></i></div>
        <h2 id="cm-title">${esc(title)}</h2>
        <p id="cm-text">${esc(text)}</p>
        <div class="dialog__actions modal__actions">
          <button type="button" class="btn btn--ghost" data-r="0">${esc(cancelText)}</button>
          <button type="button" class="btn ${tone === 'danger' ? 'btn--danger' : 'btn--primary'}" data-r="1">${esc(confirmText)}</button>
        </div>`;
      let result = false;
      dlg.addEventListener('click', e => {
        const btn = e.target.closest('[data-r]');
        if (btn) { result = btn.dataset.r === '1'; dlg.close(); return; }
        const r = dlg.getBoundingClientRect();
        const outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
        if (outside) dlg.close();
      });
      dlg.addEventListener('close', () => { dlg.remove(); resolve(result); });
      document.body.appendChild(dlg);
      dlg.showModal();
      dlg.querySelector('[data-r="0"]').focus();
    });
  }

  async function confirmLogout() {
    const ok = await confirmModal({
      title: 'Keluar dari akun?',
      text: 'Apakah kamu yakin ingin keluar?',
      confirmText: 'Ya, Keluar', cancelText: 'Batal',
      icon: 'fa-right-from-bracket', tone: 'danger'
    });
    if (!ok) return;
    Store.logout();
    toast('Kamu sudah keluar.');
    if (Router.current() === '/') Router.resolve(); else Router.go('/');
  }

  /* ---------- Navbar dinamis ---------- */
  function renderNavbar() {
    const nav = document.getElementById('nav-menu');
    const cur = Router.current();
    const link = (href, icon, label) =>
      `<a class="nav-link" href="#${href}" ${cur === href ? 'aria-current="page"' : ''}>
         <i class="fa-solid ${icon}" aria-hidden="true"></i> ${label}</a>`;
    const user = Store.user;

    if (user) {
      nav.innerHTML =
        link('/dashboard', 'fa-house', 'Dashboard') +
        link('/profile', 'fa-user', 'Profil') +
        link('/topup', 'fa-wallet', 'Top Up') +
        `<a class="coin-badge" href="#/topup" aria-label="Koin kamu: ${user.coins}. Buka halaman top up"><i class="fa-solid fa-coins" aria-hidden="true"></i> ${user.coins}</a>
         <button class="nav-link" id="btn-logout"><i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i> Keluar</button>`;
      document.getElementById('btn-logout').addEventListener('click', confirmLogout);
    } else {
      nav.innerHTML =
        link('/', 'fa-house', 'Beranda') +
        link('/login', 'fa-right-to-bracket', 'Masuk') +
        `<a class="btn btn--primary btn--sm" href="#/register">Daftar Gratis</a>`;
    }
    closeMenu();
  }

  function closeMenu() {
    const menu = document.getElementById('nav-menu');
    const btn = document.getElementById('nav-toggle');
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Buka menu');
  }

  /* ---------- Aksesibilitas ---------- */
  const A11y = {
    forced: {}, // override sementara oleh halaman (tidak disimpan), mis. { mono: true }
    force(opts) { this.forced = opts || {}; this.apply(); },
    clearForce() { this.forced = {}; this.apply(); },

    apply() {
      const s = Store.state.settings;
      const mono = !!(s.mono || this.forced.mono);
      document.body.classList.toggle('high-contrast', !!s.highContrast);
      document.body.classList.toggle('mono', mono);
      document.documentElement.style.setProperty('--fs-base', (16 * s.fontScale) + 'px');
      document.getElementById('btn-contrast').setAttribute('aria-pressed', !!s.highContrast);
      document.getElementById('btn-mono').setAttribute('aria-pressed', mono);
    },

    // Text-to-speech (Web Speech API); teks panjang dipecah agar tidak terpotong browser
    speak(text, onEnd) {
      if (!('speechSynthesis' in window)) return toast('Browser tidak mendukung text-to-speech.');
      this.stop();
      const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
      const chunks = [];
      let cur = '';
      sentences.forEach(s => {
        if ((cur + s).length > 200 && cur) { chunks.push(cur); cur = ''; }
        cur += s;
      });
      if (cur) chunks.push(cur);
      chunks.forEach((c, i) => {
        const u = new SpeechSynthesisUtterance(c);
        u.lang = 'id-ID';
        if (onEnd && i === chunks.length - 1) { u.onend = onEnd; u.onerror = onEnd; }
        speechSynthesis.speak(u);
      });
    },
    stop() {
      if (this._cur) { const c = this._cur; this._cur = null; c.setState(false); }
      if ('speechSynthesis' in window) speechSynthesis.cancel();
    },
    // Tombol speaker: klik pertama membacakan, klik lagi pada tombol yang sama menghentikan.
    // setState(true|false) dipakai untuk mengubah tampilan tombol.
    toggleSpeak(key, text, setState) {
      if (!('speechSynthesis' in window)) return toast('Browser tidak mendukung text-to-speech.');
      const same = this._cur && this._cur.key === key;
      this.stop();
      if (same) return;
      const tok = { key, setState };
      this.speak(text, () => { if (this._cur === tok) { this._cur = null; setState(false); } });
      this._cur = tok; // dipasang setelah speak() (yang memanggil stop() lebih dulu)
      setState(true);
    },
    // Efek suara singkat untuk jawaban benar/salah (Web Audio API)
    beep(ok) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this._ac = this._ac || new AC();
        const ac = this._ac;
        if (ac.state === 'suspended') ac.resume();
        const t = ac.currentTime;
        (ok ? [[660, 0], [880, .13]] : [[240, 0], [180, .15]]).forEach(([f, d]) => {
          const o = ac.createOscillator(), g = ac.createGain();
          o.type = ok ? 'sine' : 'triangle';
          o.frequency.value = f;
          g.gain.setValueAtTime(.0001, t + d);
          g.gain.exponentialRampToValueAtTime(.2, t + d + .02);
          g.gain.exponentialRampToValueAtTime(.0001, t + d + .22);
          o.connect(g); g.connect(ac.destination);
          o.start(t + d); o.stop(t + d + .24);
        });
      } catch (e) { /* audio tidak tersedia */ }
    },
    pageText() { return document.getElementById('app').innerText.replace(/\s+/g, ' ').trim(); },
    readPage() { this.speak(this.pageText()); },
    bind() {
      const $ = id => document.getElementById(id);
      $('btn-contrast').onclick = () => { Store.setSetting('highContrast', !Store.state.settings.highContrast); this.apply(); };
      $('btn-mono').onclick = () => { Store.setSetting('mono', !Store.state.settings.mono); this.apply(); };
      $('btn-font-up').onclick = () => { Store.setSetting('fontScale', Math.min(1.5, +(Store.state.settings.fontScale + 0.1).toFixed(1))); this.apply(); };
      $('btn-font-down').onclick = () => { Store.setSetting('fontScale', Math.max(0.8, +(Store.state.settings.fontScale - 0.1).toFixed(1))); this.apply(); };
      $('btn-tts').onclick = () => this.readPage();
      // Esc menghentikan suara & menutup menu
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { speechSynthesis && speechSynthesis.cancel(); closeMenu(); }
      });
    }
  };

  /* ---------- Init ---------- */
  function init() {
    Store.load();
    document.getElementById('year').textContent = new Date().getFullYear();

    document.getElementById('nav-toggle').addEventListener('click', e => {
      const menu = document.getElementById('nav-menu');
      const open = menu.classList.toggle('is-open');
      e.currentTarget.setAttribute('aria-expanded', open);
      e.currentTarget.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    });
    // "Lewati ke konten" harus memfokuskan <main>
    document.getElementById('skip-link').addEventListener('click', e => {
      e.preventDefault(); document.getElementById('app').focus();
    });

    A11y.bind();
    A11y.apply();
    window.addEventListener('hashchange', () => Router.resolve());
    Router.resolve();
  }

  window.TB = { Store, Router, A11y, esc, toast, init, SIGNUP_COINS, refreshNav: renderNavbar, confirmModal, confirmLogout };
})();
