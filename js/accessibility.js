/* ===== TEMAN BELAJAR — accessibility.js =====
   Perluasan TB.A11y (didefinisikan di app.js). Dimuat sesudah app.js, sebelum TB.init().
   - Kontras tinggi, font ramah disleksia, ukuran teks (rem base), umpan balik toggle
   - Text-to-Speech per blok dengan highlight bagian yang sedang dibacakan
*/
(function () {
  'use strict';
  const { A11y, Store, toast } = TB;

  const FONT_MIN = 0.8, FONT_MAX = 1.6, FONT_STEP = 0.1;
  const READABLE = 'h1, h2, h3, h4, p, li, blockquote, figcaption, dt, dd, th, td, .quiz-q, .qs__q';

  let session = 0;      // naik setiap stop/mulai baru, sehingga callback suara lama diabaikan
  let reading = false;
  let current = null;   // elemen yang sedang di-highlight

  const settings = () => Store.state.settings;
  const $ = id => document.getElementById(id);

  /* ---------- Tampilan toggle ---------- */
  function setTtsButton(on) {
    const b = $('btn-tts');
    if (!b) return;
    b.setAttribute('aria-pressed', on);
    b.setAttribute('aria-label', on ? 'Hentikan pembacaan halaman' : 'Bacakan halaman ini dengan suara');
    b.innerHTML = on
      ? '<i class="fa-solid fa-stop" aria-hidden="true"></i> <span>Berhenti</span>'
      : '<i class="fa-solid fa-volume-high" aria-hidden="true"></i> <span>Bacakan</span>';
  }

  function clearHighlight() {
    if (current) { current.classList.remove('tts-current'); current = null; }
  }

  /* ---------- apply(): kontras, mono, font disleksia, ukuran teks ---------- */
  const baseApply = A11y.apply;
  A11y.apply = function () {
    baseApply.call(this);
    const s = settings();
    document.body.classList.toggle('dyslexia', !!s.dyslexia);
    const dys = $('btn-dyslexia');
    if (dys) dys.setAttribute('aria-pressed', !!s.dyslexia);

    // Label tombol ukuran teks menyebut persentase saat ini (pembaca layar)
    const pct = Math.round((s.fontScale || 1) * 100);
    const up = $('btn-font-up'), down = $('btn-font-down');
    if (up) up.setAttribute('aria-label', `Perbesar teks (sekarang ${pct}%)`);
    if (down) down.setAttribute('aria-label', `Perkecil teks (sekarang ${pct}%)`);
  };

  function resize(delta) {
    const cur = settings().fontScale || 1;
    const next = Math.round(Math.min(FONT_MAX, Math.max(FONT_MIN, cur + delta)) * 10) / 10;
    if (next === cur) { toast(delta > 0 ? 'Ukuran teks sudah maksimum.' : 'Ukuran teks sudah minimum.'); return; }
    Store.setSetting('fontScale', next);   // diterapkan ke root (html) lewat --fs-base, jadi semua rem ikut proporsional
    A11y.apply();
    toast('Ukuran teks: ' + Math.round(next * 100) + '%');
  }

  /* ---------- Text-to-Speech dengan highlight ---------- */
  function pickVoice() {
    const voices = ('speechSynthesis' in window) ? speechSynthesis.getVoices() : [];
    return voices.find(v => /^id([-_]|$)/i.test(v.lang)) || null;
  }

  function chunksOf(text) {
    const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
    const out = [];
    let cur = '';
    sentences.forEach(s => {
      if ((cur + s).length > 200 && cur) { out.push(cur); cur = ''; }
      cur += s;
    });
    if (cur) out.push(cur);
    return out;
  }

  function speakText(text, token, done) {
    const chunks = chunksOf(text);
    let k = 0;
    const step = () => {
      if (token !== session) return;
      if (k >= chunks.length) { done(); return; }
      const u = new SpeechSynthesisUtterance(chunks[k++]);
      u.lang = 'id-ID';
      const v = pickVoice();
      if (v) u.voice = v;
      u.onend = step;
      u.onerror = () => { if (token === session) done(); };
      speechSynthesis.speak(u);
    };
    step();
  }

  function isVisible(el) {
    return el.getClientRects().length > 0 &&
      !el.closest('[hidden], dialog:not([open]), .sr-only, [aria-hidden="true"], .toast');
  }

  function collectReadable(root) {
    const all = Array.from(root.querySelectorAll(READABLE));
    return all.filter(el =>
      isVisible(el) &&
      el.innerText.trim() &&
      !all.some(o => o !== el && el.contains(o))   // ambil elemen paling dalam agar tidak dibaca dua kali
    );
  }

  const baseStop = A11y.stop;
  A11y.stop = function () {
    session++;
    reading = false;
    clearHighlight();
    setTtsButton(false);
    baseStop.call(this);
  };

  A11y.isReading = () => reading;

  // Bacakan daftar elemen satu per satu dan beri highlight pada yang sedang dibacakan
  A11y.readElements = function (els) {
    if (!('speechSynthesis' in window)) { toast('Browser tidak mendukung text-to-speech.'); return; }
    els = (els || []).filter(Boolean);
    this.stop();
    if (!els.length) return;

    const token = ++session;
    reading = true;
    setTtsButton(true);
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0;

    const next = () => {
      if (token !== session) return;
      clearHighlight();
      if (i >= els.length) { reading = false; setTtsButton(false); return; }
      const el = els[i++];
      const text = el.innerText.replace(/\s+/g, ' ').trim();
      if (!text) { next(); return; }
      el.classList.add('tts-current');
      current = el;
      el.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
      speakText(text, token, next);
    };
    next();
  };

  // Tombol "Bacakan" di toolbar: klik pertama membaca, klik lagi menghentikan
  A11y.readPage = function () {
    if (reading) { this.stop(); return; }
    this.readElements(collectReadable($('app')));
  };

  /* ---------- Pasang event toolbar ---------- */
  const baseBind = A11y.bind;
  A11y.bind = function () {
    baseBind.call(this);

    $('btn-contrast').onclick = () => {
      Store.setSetting('highContrast', !settings().highContrast);
      A11y.apply();
      toast(settings().highContrast ? 'Kontras tinggi aktif.' : 'Kontras tinggi dimatikan.');
    };
    $('btn-mono').onclick = () => {
      Store.setSetting('mono', !settings().mono);
      A11y.apply();
      toast(settings().mono ? 'Mode monokrom aktif.' : 'Mode monokrom dimatikan.');
    };
    $('btn-dyslexia').onclick = () => {
      Store.setSetting('dyslexia', !settings().dyslexia);
      A11y.apply();
      toast(settings().dyslexia ? 'Font ramah disleksia (Lexend) aktif.' : 'Font standar dipulihkan.');
    };
    $('btn-font-up').onclick = () => resize(FONT_STEP);
    $('btn-font-down').onclick = () => resize(-FONT_STEP);
    $('btn-tts').onclick = () => A11y.readPage();

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && reading) A11y.stop();
    });
  };
})();
