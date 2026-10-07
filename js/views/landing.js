/* ===== TEMAN BELAJAR — views/landing.js (Hero, Demo Interaktif, Model Bisnis & Dampak) ===== */
(function () {
  'use strict';
  const { Store, Router, A11y, esc, toast, SIGNUP_COINS } = TB;

  const features = [
    ['fa-eye-low-vision', 'Buta Warna', 'Rasakan dunia lewat simulasi penglihatan warna yang berbeda.'],
    ['fa-person-walking-with-cane', 'Tunanetra', 'Belajar bernavigasi dengan suara dan sentuhan.'],
    ['fa-ear-deaf', 'Tunarungu', 'Pelajari kamus BISINDO untuk berkomunikasi lewat isyarat.'],
    ['fa-comment-slash', 'Nonverbal', 'Pahami cara berkomunikasi tanpa suara.'],
    ['fa-puzzle-piece', 'Down Syndrome', 'Kenali dan berinteraksi dengan empati dan percaya diri.'],
    ['fa-brain', 'Autisme (Neurodivergen)', 'Pahami cara otak yang berbeda bekerja dan cara mendukungnya.'],
    ['fa-wheelchair', 'Disabilitas Fisik (Daksa)', 'Pelajari etika berinteraksi dan lingkungan yang ramah akses.'],
    ['fa-trophy', 'Kuis & Poin', 'Kumpulkan poin dan koin untuk membuka modul lanjutan.']
  ];

  const business = [
    {
      icon: 'fa-triangle-exclamation', title: 'Masalah',
      items: [
        'Sekolah inklusi kekurangan media ajar yang menjembatani siswa reguler dan siswa berkebutuhan khusus.',
        'Guru dan pendamping butuh alat bantu praktis, bukan hanya buku teks.',
        'Siswa reguler jarang punya kesempatan memahami disabilitas lewat pengalaman, sehingga empati sulit tumbuh.'
      ]
    },
    {
      icon: 'fa-lightbulb', title: 'Solusi',
      items: [
        'Platform multisensori: visual, suara, dan interaktif dalam satu aplikasi web.',
        'Simulasi pengalaman disabilitas, kamus BISINDO, dan kuis studi kasus sehari-hari.',
        'Fitur aksesibilitas bawaan: kontras tinggi, monokrom, ukuran teks, text-to-speech, dan navigasi keyboard.'
      ]
    },
    {
      icon: 'fa-users', title: 'Segmen Pengguna',
      items: [
        'Sekolah inklusi dan SLB.',
        'Guru, guru pendamping khusus, dan orang tua.',
        'Komunitas, lembaga CSR, dan pemerintah daerah.'
      ]
    },
    {
      icon: 'fa-coins', title: 'Sumber Pendapatan',
      items: [
        'Freemium: modul dasar gratis, modul lanjutan dibuka dengan koin (top up QRIS).',
        'Lisensi sekolah untuk akses banyak siswa dan laporan belajar.',
        'Pelatihan dan workshop guru inklusi.',
        'Kemitraan CSR dan program sosial.'
      ]
    },
    {
      icon: 'fa-hand-holding-heart', title: 'Dampak',
      items: [
        'Meningkatkan empati dan pemahaman siswa reguler terhadap teman disabilitas.',
        'Memudahkan komunikasi antara siswa, guru, dan teman dengan kebutuhan berbeda.',
        'Mendukung SDG 4 (Pendidikan Berkualitas) dan SDG 10 (Berkurangnya Kesenjangan).'
      ]
    },
    {
      icon: 'fa-road', title: 'Tahap & Rencana',
      items: [
        'Saat ini: prototipe fungsional (proof of concept) yang sudah bisa dicoba.',
        'Berikutnya: uji coba terbatas di sekolah inklusi dan validasi konten bersama praktisi serta komunitas disabilitas.',
        'Lanjutan: dashboard guru, konten BISINDO resmi, dan modul lanjutan.'
      ]
    }
  ];

  /* ---------- Util ---------- */
  function totalQuestions() {
    const bank = TB.QuizBank || {};
    return Object.keys(bank).reduce((n, k) => n + bank[k].length, 0);
  }

  function goTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    el.focus({ preventScroll: true }); // pindahkan fokus agar pembaca layar ikut berpindah
  }

  /* ---------- Potongan HTML ---------- */
  function heroHtml() {
    const topics = TB.Modules.topics.length;
    const accountLine = Store.isLoggedIn
      ? `<a href="#/dashboard">Lanjut ke Dashboard</a>`
      : `Sudah punya akun? <a href="#/login">Masuk</a> &middot; atau <a href="#/register">daftar gratis &amp; dapat ${SIGNUP_COINS} koin</a>`;

    return `
      <section class="lp-hero" aria-labelledby="hero-title">
        <div class="lp-hero__text">
          <p class="chip"><span aria-hidden="true">✦</span> Proof of Concept - EdTech Inklusi 2026</p>
          <h1 id="hero-title">Platform Edukasi Inklusif Berbasis <span class="hl">Multisensori</span> untuk Sekolah Inklusi &amp; Anak Berkebutuhan Khusus</h1>
          <p class="lp-hero__sub">Solusi media ajar adaptif yang menjembatani komunikasi antara siswa reguler, disabilitas, dan pengajar inklusi secara interaktif.</p>
          <div class="lp-hero__cta">
            <button type="button" class="btn btn--primary btn--lg" data-goto="demo"><span aria-hidden="true">🚀</span> Coba Demo Interaktif</button>
            <button type="button" class="btn btn--ghost btn--lg" data-goto="bisnis"><span aria-hidden="true">📄</span> Lihat Model Bisnis &amp; Dampak</button>
          </div>
          <p class="lp-hero__account">${accountLine}</p>
          <ul class="lp-facts" aria-label="Isi prototipe">
            <li><strong>${topics}</strong> topik disabilitas</li>
            <li><strong>${totalQuestions()}</strong> soal studi kasus</li>
            <li><strong>Gratis</strong> modul dasar</li>
          </ul>
        </div>

        <div class="lp-hero__art" aria-hidden="true">
          <div class="lp-hero__logo"><img src="assets/img/logo.png" alt="" width="260" height="260"></div>
          <span class="lp-float lp-float--1"><i class="fa-solid fa-eye-low-vision"></i> Simulasi Buta Warna</span>
          <span class="lp-float lp-float--2"><i class="fa-solid fa-volume-high"></i> Text-to-Speech</span>
          <span class="lp-float lp-float--3"><i class="fa-solid fa-hands"></i> Kamus BISINDO</span>
          <span class="lp-float lp-float--4"><i class="fa-solid fa-circle-question"></i> Kuis Studi Kasus</span>
        </div>
      </section>`;
  }

  /* ---------- Data demo ---------- */
  // Matriks simulasi defisiensi penglihatan warna (Machado et al., severity 1.0)
  const CVD = [
    { id: 'normal', label: 'Normal', note: 'Penglihatan warna normal. Semua warna tampak sebagaimana mestinya.' },
    { id: 'protanopia', label: 'Protanopia', note: 'Protanopia: sulit melihat merah. Merah tampak gelap dan mirip hijau atau cokelat.',
      m: '0.152286 1.052583 -0.204868 0 0  0.114503 0.786281 0.099216 0 0  -0.003882 -0.048116 1.051998 0 0  0 0 0 1 0' },
    { id: 'deuteranopia', label: 'Deuteranopia', note: 'Deuteranopia: sulit melihat hijau. Merah dan hijau tampak mirip. Ini jenis yang paling umum.',
      m: '0.367322 0.860646 -0.227968 0 0  0.280085 0.672501 0.047413 0 0  -0.011820 0.042940 0.968881 0 0  0 0 0 1 0' },
    { id: 'tritanopia', label: 'Tritanopia', note: 'Tritanopia: sulit membedakan biru dan kuning. Jenis ini jarang terjadi.',
      m: '1.255528 -0.076749 -0.178779 0 0  -0.078411 0.930809 0.147602 0 0  0.004733 0.691367 0.303900 0 0  0 0 0 1 0' }
  ];

  const SIGN_LETTERS = ['A', 'B', 'C'];

  const GUEST = { name: 'Juri Guest', email: 'juri.guest@demo.teman-belajar.local', password: 'demo-juri-2026' };

  function sceneSvg() {
    return `
      <svg class="scene" viewBox="0 0 420 200" role="img"
           aria-label="Ilustrasi apel merah, pisang kuning, anggur ungu, dan lampu lalu lintas untuk simulasi warna">
        <rect width="420" height="200" fill="#e0f2fe"/>
        <rect y="150" width="420" height="50" fill="#4c9a2a"/>
        <circle cx="70" cy="110" r="38" fill="#d62828"/>
        <path d="M70 72 q10 -22 28 -20 q-4 18 -28 20z" fill="#2e8b2e"/>
        <path d="M140 140 q50 30 100 -40 q-10 50 -60 62 q-30 4 -40 -22z" fill="#f4c20d"/>
        <g fill="#7b2cbf"><circle cx="280" cy="96" r="13"/><circle cx="304" cy="96" r="13"/><circle cx="292" cy="118" r="13"/><circle cx="268" cy="118" r="13"/><circle cx="316" cy="118" r="13"/><circle cx="292" cy="140" r="13"/></g>
        <rect x="350" y="30" width="44" height="120" rx="10" fill="#222"/>
        <circle cx="372" cy="56" r="13" fill="#e63946"/><circle cx="372" cy="90" r="13" fill="#f4c20d"/><circle cx="372" cy="124" r="13" fill="#2ecc71"/>
      </svg>`;
  }

  function demoHtml() {
    const loggedIn = Store.isLoggedIn;
    return `
      <section class="lp-section" id="demo" tabindex="-1" aria-labelledby="demo-title">
        <header class="lp-section__head">
          <p class="chip chip--gold"><i class="fa-solid fa-bolt" aria-hidden="true"></i> Tanpa login</p>
          <h2 id="demo-title">Interactive Quick Demo</h2>
          <p class="muted">Coba tiga fitur utama langsung di sini. Tidak perlu daftar.</p>
        </header>

        <!-- Filter simulasi penglihatan warna -->
        <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
          ${CVD.filter(c => c.m).map(c => `<filter id="cvd-${c.id}"><feColorMatrix type="matrix" values="${c.m}"/></filter>`).join('')}
        </svg>

        <div class="card demo">
          <div class="demo__tabs" role="tablist" aria-label="Pilih demo">
            <button type="button" class="demo__tab" role="tab" id="tab-0" aria-selected="true" aria-controls="panel-0" data-tab="0">
              <i class="fa-solid fa-eye-low-vision" aria-hidden="true"></i> Simulasi Buta Warna</button>
            <button type="button" class="demo__tab" role="tab" id="tab-1" aria-selected="false" aria-controls="panel-1" data-tab="1" tabindex="-1">
              <i class="fa-solid fa-hands" aria-hidden="true"></i> Latihan BISINDO</button>
            <button type="button" class="demo__tab" role="tab" id="tab-2" aria-selected="false" aria-controls="panel-2" data-tab="2" tabindex="-1">
              <i class="fa-solid fa-circle-question" aria-hidden="true"></i> Kuis Interaktif</button>
          </div>

          <div class="demo__panel" role="tabpanel" id="panel-0" aria-labelledby="tab-0">
            <p>Pilih jenis penglihatan warna. Gambar berubah langsung.</p>
            <div class="seg" role="radiogroup" aria-label="Jenis penglihatan warna">
              ${CVD.map((c, i) => `
                <label class="seg__item">
                  <input type="radio" name="cvd" value="${c.id}" ${i === 0 ? 'checked' : ''}>
                  <span>${c.label}</span>
                </label>`).join('')}
            </div>
            <div class="cvd-stage" id="cvd-stage" data-cvd="normal">
              ${sceneSvg()}
              <div class="demo-swatches" role="group" aria-label="Contoh warna merah, hijau, oranye, dan biru">
                <figure class="swatch" style="--sw:#c0392b"><div class="swatch__box"></div><figcaption>Merah</figcaption></figure>
                <figure class="swatch" style="--sw:#3a7d2a"><div class="swatch__box"></div><figcaption>Hijau</figcaption></figure>
                <figure class="swatch" style="--sw:#e67e22"><div class="swatch__box"></div><figcaption>Oranye</figcaption></figure>
                <figure class="swatch" style="--sw:#2563eb"><div class="swatch__box"></div><figcaption>Biru</figcaption></figure>
                <figure class="swatch" style="--sw:#f1c40f"><div class="swatch__box"></div><figcaption>Kuning</figcaption></figure>
              </div>
              <p class="cvd-text">Teks contoh: <strong class="cvd-r">NYALA</strong> <span aria-hidden="true">vs</span> <strong class="cvd-g">AMAN</strong> (merah dan hijau)</p>
            </div>
            <p class="demo__note" id="cvd-note" aria-live="polite">${CVD[0].note}</p>
          </div>

          <div class="demo__panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1" hidden>
            <p>Klik kartu untuk mendengar hurufnya dan melihat gerakan tangan. Tirukan gerakannya!</p>
            <ul class="sign-grid">
              ${SIGN_LETTERS.map(l => `
                <li>
                  <button type="button" class="sign-card" data-letter="${l}" aria-label="Pelajari isyarat huruf ${l}">
                    <span class="sign-card__img">
                      <img src="assets/img/placeholder.jpg" alt="Isyarat ${l}" width="140" height="140">
                      <i class="fa-solid fa-hand sign-card__hand" aria-hidden="true"></i>
                    </span>
                    <strong class="sign-card__letter">${l}</strong>
                    <span class="sign-card__hint">Klik untuk dengar &amp; lihat gerakan</span>
                    <span class="sign-card__done"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Sudah dicoba</span>
                  </button>
                </li>`).join('')}
            </ul>
            <p class="demo__note" id="sign-status" aria-live="polite">Dicoba 0/${SIGN_LETTERS.length}</p>
            <p class="demo__note demo__note--small">Gambar isyarat masih placeholder dan akan diganti ilustrasi BISINDO resmi.</p>
          </div>

          <div class="demo__panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
            <div id="demo-quiz"></div>
          </div>
        </div>

        <div class="demo-cta">
          <p class="demo-cta__text"><strong>Ingin mencoba modul lengkap 10 soal?</strong>
            <span class="muted">${loggedIn ? 'Kamu sudah masuk.' : 'Masuk sebagai Juri Guest, tanpa daftar.'}</span></p>
          <button type="button" class="btn btn--primary btn--lg" id="demo-enter">
            <i class="fa-solid fa-right-to-bracket" aria-hidden="true"></i> ${loggedIn ? 'Buka Dashboard' : 'Masuk ke Dashboard Demo'}</button>
        </div>
      </section>`;
  }

  function businessHtml() {
    return `
      <section class="lp-section" id="bisnis" tabindex="-1" aria-labelledby="bisnis-title">
        <header class="lp-section__head">
          <p class="chip"><i class="fa-solid fa-chart-line" aria-hidden="true"></i> Untuk juri &amp; mitra</p>
          <h2 id="bisnis-title">Model Bisnis &amp; Dampak</h2>
          <p class="muted">Ringkasan masalah, solusi, sumber pendapatan, dan dampak yang ingin dicapai.</p>
        </header>
        <div class="grid grid--3">
          ${business.map(b => `
            <article class="card biz-card">
              <h3><span class="biz-card__icon" aria-hidden="true"><i class="fa-solid ${b.icon}"></i></span> ${b.title}</h3>
              <ul class="check-list">${b.items.map(i => `<li>${i}</li>`).join('')}</ul>
            </article>`).join('')}
        </div>
        <p class="lp-sdg">
          <span class="chip chip--gold">SDG 4 · Pendidikan Berkualitas</span>
          <span class="chip">SDG 10 · Berkurangnya Kesenjangan</span>
        </p>
      </section>`;
  }

  function featuresHtml() {
    return `
      <section class="lp-section" aria-labelledby="fitur-title">
        <header class="lp-section__head">
          <h2 id="fitur-title">Apa yang bisa kamu pelajari?</h2>
        </header>
        <div class="grid grid--3">
          ${features.map(f => `
            <article class="card feature">
              <i class="fa-solid ${f[0]}" aria-hidden="true"></i>
              <h3>${f[1]}</h3>
              <p class="muted">${f[2]}</p>
            </article>`).join('')}
        </div>
      </section>`;
  }

  function finalCta() {
    if (Store.isLoggedIn) return '';
    return `
      <section class="lp-final card" aria-labelledby="final-title">
        <h2 id="final-title">Siap belajar bersama?</h2>
        <p class="muted">Daftar gratis, dapatkan ${SIGNUP_COINS} koin, dan simpan progres belajarmu.</p>
        <a class="btn btn--primary btn--lg" href="#/register"><i class="fa-solid fa-user-plus" aria-hidden="true"></i> Daftar &amp; Dapat ${SIGNUP_COINS} Koin</a>
      </section>`;
  }

  /* ---------- Route ---------- */
  Router.register('/', {
    title: 'Beranda', auth: 'public',

    render() {
      return heroHtml() + demoHtml() + featuresHtml() + businessHtml() + finalCta();
    },

    mount(root) {
      // Tombol CTA hero: scroll ke bagian demo / model bisnis
      root.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => goTo(b.dataset.goto)));

      initTabs(root);
      initColorDemo(root);
      initBisindoDemo(root);
      initGuestCta(root);
      initMiniQuiz(root.querySelector('#demo-quiz'));
    },

    unmount() { A11y.stop(); }
  });

  /* ---------- Demo: tab ---------- */
  function initTabs(root) {
    const tabs = Array.from(root.querySelectorAll('.demo__tab'));
    const panels = tabs.map(t => root.querySelector('#' + t.getAttribute('aria-controls')));

    function select(i, focus) {
      tabs.forEach((t, n) => {
        const on = n === i;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        panels[n].hidden = !on;
      });
      if (focus) tabs[i].focus();
      A11y.stop();
    }
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', e => {
        const k = e.key;
        if (k === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length, true); }
        else if (k === 'ArrowLeft') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
        else if (k === 'Home') { e.preventDefault(); select(0, true); }
        else if (k === 'End') { e.preventDefault(); select(tabs.length - 1, true); }
      });
    });
  }

  /* ---------- Demo: simulasi buta warna (realtime) ---------- */
  function initColorDemo(root) {
    const stage = root.querySelector('#cvd-stage');
    const note = root.querySelector('#cvd-note');
    root.querySelectorAll('input[name="cvd"]').forEach(input => {
      input.addEventListener('change', () => {
        const c = CVD.find(x => x.id === input.value);
        stage.dataset.cvd = c.id;
        note.textContent = c.note;
      });
    });
  }

  /* ---------- Demo: latihan BISINDO (suara + gerakan) ---------- */
  function initBisindoDemo(root) {
    const cards = Array.from(root.querySelectorAll('.sign-card'));
    const status = root.querySelector('#sign-status');
    const tried = new Set();

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const letter = card.dataset.letter;

        // Ulang animasi gerakan tangan
        cards.forEach(c => c.classList.remove('is-signing'));
        void card.offsetWidth;
        card.classList.add('is-signing');
        card.addEventListener('animationend', function done(e) {
          if (e.animationName !== 'sign-wave') return;
          card.classList.remove('is-signing');
          card.removeEventListener('animationend', done);
        });

        // Suara: nada singkat + pengucapan huruf
        A11y.beep(true);
        A11y.speak(`Huruf ${letter}. Tirukan gerakan tangan pada gambar.`);

        tried.add(letter);
        card.classList.add('is-tried');
        status.textContent = `Dicoba ${tried.size}/${SIGN_LETTERS.length}`;
        if (tried.size === SIGN_LETTERS.length) toast('Hebat! Semua kartu sudah dicoba. Modul BISINDO lengkap ada di Dashboard.');
        else toast(`Huruf ${letter}: tirukan gerakannya!`);
      });
    });
  }

  /* ---------- Tombol "Masuk ke Dashboard Demo" (akun Juri Guest) ---------- */
  function initGuestCta(root) {
    root.querySelector('#demo-enter').addEventListener('click', () => {
      if (Store.isLoggedIn) { Router.go('/dashboard'); return; }  // jangan menimpa akun yang sedang masuk
      let res = Store.login(GUEST.email, GUEST.password);
      if (!res.ok) res = Store.register(GUEST);
      if (!res.ok) { toast(res.error); return; }
      toast('Masuk sebagai Juri Guest. Selamat mencoba!');
      Router.go('/dashboard');
    });
  }

  /* ---------- Demo: mini kuis (tanpa login, tidak menyimpan poin) ---------- */
  function initMiniQuiz(box) {
    const bank = TB.QuizBank || {};
    const ids = Object.keys(bank);
    if (!box || !ids.length) { if (box) box.innerHTML = '<p class="muted">Soal belum tersedia.</p>'; return; }

    let n = 0, sel = null, checked = false;

    function topicTitle(id) {
      const t = TB.Modules.topics.find(t => t.id === id.replace(/-dasar$/, ''));
      return t ? t.title : '';
    }

    function render() {
      const id = ids[n % ids.length];
      const q = bank[id][0];
      sel = null; checked = false;
      box.innerHTML = `
        <p class="qs__label">${esc(topicTitle(id))} · contoh soal</p>
        <p class="quiz-q" id="mq-q">${esc(q.q)}</p>
        <div class="qcards" role="radiogroup" aria-labelledby="mq-q">
          ${q.options.map((o, i) => `
            <label class="qcard">
              <input class="qcard__input" type="radio" name="mq" value="${i}">
              <span class="qcard__body">
                <span class="qcard__key" aria-hidden="true">${i + 1}</span>
                <span class="qcard__text">${esc(o)}</span>
                <span class="qcard__mark"></span>
              </span>
            </label>`).join('')}
        </div>
        <div class="demo__feedback" id="mq-fb" role="status" aria-live="polite"></div>
        <div class="demo__row">
          <button type="button" class="btn btn--primary" id="mq-check" disabled>Periksa</button>
          <button type="button" class="btn btn--ghost" id="mq-next"><i class="fa-solid fa-shuffle" aria-hidden="true"></i> Soal lain</button>
        </div>`;
    }

    box.addEventListener('change', e => {
      if (!e.target.matches('.qcard__input') || checked) return;
      sel = +e.target.value;
      box.querySelector('#mq-check').disabled = false;
    });

    box.addEventListener('click', e => {
      if (e.target.closest('#mq-next')) { n++; render(); return; }
      if (!e.target.closest('#mq-check') || checked || sel === null) return;

      checked = true;
      const q = bank[ids[n % ids.length]][0];
      const ok = sel === q.answer;
      A11y.beep(ok);
      box.querySelectorAll('.qcard').forEach((card, i) => {
        card.querySelector('input').disabled = true;
        const mark = card.querySelector('.qcard__mark');
        if (i === q.answer) {
          card.classList.add('is-correct');
          mark.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i><span class="sr-only"> Jawaban benar</span>';
        } else if (i === sel) {
          card.classList.add('is-wrong');
          mark.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i><span class="sr-only"> Jawabanmu salah</span>';
        }
      });
      const fb = box.querySelector('#mq-fb');
      fb.className = 'demo__feedback ' + (ok ? 'is-correct' : 'is-wrong');
      fb.innerHTML = `<strong>${ok ? 'Benar!' : 'Kurang tepat.'}</strong> ${esc(q.explain)}`;
      toast(ok ? 'Benar! 🎉' : 'Belum tepat. Baca penjelasannya ya.');
      box.querySelector('#mq-check').disabled = true;
    });

    render();
  }
})();
