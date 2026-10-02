/* ===== TEMAN BELAJAR — views/kuis.js (Kuis layar penuh ala Duolingo) ===== */
(function () {
  'use strict';
  const { Store, A11y, esc, toast } = TB;

  /*
    TB.Quiz.init(root, modul, daftarSoal, { onProgress })
    - Kartu pembuka di #quiz, latihan berjalan di <dialog> layar penuh.
    - Alur: pilih kartu (belum submit) -> "Periksa" -> panel benar/salah -> "Lanjut".
  */
  function init(root, m, quiz, hooks) {
    const box = root.querySelector('#quiz');
    if (!box) return;
    const n = quiz.length;
    let st = null; // state latihan yang sedang berjalan

    const dlg = document.createElement('dialog');
    dlg.className = 'quiz-screen';
    dlg.setAttribute('aria-label', 'Latihan soal');
    root.appendChild(dlg);

    const $ = sel => dlg.querySelector(sel);

    /* ---------- Kartu pembuka ---------- */
    function renderIntro() {
      const finished = TB.Modules.progressOf(m.id) >= 100;
      box.innerHTML = `
        <h2 id="quiz-title">Latihan</h2>
        <p class="muted">${n} soal berbasis situasi. Jawaban benar pertama pada tiap soal memberi +1 poin.</p>
        ${finished ? '<p class="badge badge--open"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Latihan sudah pernah diselesaikan</p>' : ''}
        <button type="button" class="btn btn--primary btn--lg" data-start>
          <i class="fa-solid fa-play" aria-hidden="true"></i> ${finished ? 'Latihan lagi' : 'Mulai Latihan'}</button>`;
    }

    /* ---------- Tombol speaker (Web Speech API, klik lagi = berhenti) ---------- */
    const speakBtn = (kind, label) => `
      <button type="button" class="speak-btn" data-speak="${kind}" data-label="${label}"
              aria-pressed="false" aria-label="${label}">
        <i class="fa-solid fa-volume-high" aria-hidden="true"></i></button>`;

    function speakSetter(btn) {
      return on => {
        btn.setAttribute('aria-pressed', on);
        btn.classList.toggle('is-playing', on);
        btn.firstElementChild.className = 'fa-solid ' + (on ? 'fa-stop' : 'fa-volume-high');
        btn.setAttribute('aria-label', on ? 'Hentikan suara' : btn.dataset.label);
      };
    }

    /* ---------- Kerangka layar ---------- */
    function renderSkeleton() {
      dlg.innerHTML = `
        <div class="qs">
          <header class="qs__top">
            <button type="button" class="qs__close" aria-label="Keluar dari latihan">
              <i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
            <div class="qs__progress" role="progressbar" aria-label="Progres latihan"
                 aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div>
            <span class="qs__count" aria-hidden="true"></span>
          </header>
          <div class="qs__body" id="qs-body"></div>
          <footer class="qs__foot" id="qs-foot"></footer>
        </div>`;
    }

    function setBar(done) {
      const pct = Math.round(done / n * 100);
      const bar = $('.qs__progress');
      bar.setAttribute('aria-valuenow', pct);
      bar.firstElementChild.style.width = pct + '%';
      $('.qs__count').textContent = done + '/' + n;
    }

    /* ---------- Soal ---------- */
    function renderQuestion(focusQ) {
      const q = quiz[st.idx];
      st.sel = null;
      st.checked = false;

      $('#qs-body').innerHTML = `
        <p class="qs__label">Soal ${st.idx + 1} dari ${n}</p>
        <div class="qs__row">${speakBtn('q', 'Bacakan soal')}<span class="qs__hint">Dengarkan soal</span></div>
        <h2 class="qs__q" id="qs-q" tabindex="-1">${esc(q.q)}</h2>
        <div class="qs__row">${speakBtn('o', 'Bacakan semua pilihan jawaban')}<span class="qs__hint">Pilih satu jawaban</span></div>
        <div class="qcards" role="radiogroup" aria-labelledby="qs-q">
          ${q.options.map((o, i) => `
            <label class="qcard">
              <input class="qcard__input" type="radio" name="ans" value="${i}">
              <span class="qcard__body">
                <span class="qcard__key" aria-hidden="true">${i + 1}</span>
                <span class="qcard__text">${esc(o)}</span>
                <span class="qcard__mark"></span>
              </span>
            </label>`).join('')}
        </div>`;
      $('#qs-foot').className = 'qs__foot';
      $('#qs-foot').innerHTML = `<button type="button" class="btn btn--check" data-check disabled>Periksa</button>`;
      setBar(st.idx);
      $('#qs-body').scrollTop = 0;
      if (focusQ) $('#qs-q').focus();
    }

    function check() {
      if (st.checked || st.sel === null) return;
      A11y.stop();
      st.checked = true;
      const q = quiz[st.idx];
      const ok = st.sel === q.answer;
      const res = Store.recordAnswer(m.id + '-q' + (st.idx + 1), ok);
      if (ok) { st.right++; if (res.awarded) st.gained++; }
      A11y.beep(ok);

      // Tandai kartu (ikon + teks untuk pembaca layar, bukan hanya warna)
      dlg.querySelectorAll('.qcard').forEach((card, i) => {
        const input = card.querySelector('input');
        input.disabled = true;
        const mark = card.querySelector('.qcard__mark');
        if (i === q.answer) {
          card.classList.add('is-correct');
          mark.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i><span class="sr-only"> Jawaban benar</span>';
        } else if (i === st.sel) {
          card.classList.add('is-wrong');
          mark.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i><span class="sr-only"> Jawabanmu salah</span>';
        }
      });

      const last = st.idx === n - 1;
      const title = ok ? 'Benar!' : 'Kurang tepat';
      const point = ok ? (res.awarded ? ' +1 poin' : ' (poin soal ini sudah pernah kamu dapat)') : '';
      const detail = (ok ? '' : `Jawaban yang benar: ${q.options[q.answer]}. `) + q.explain;

      const foot = $('#qs-foot');
      foot.className = 'qs__foot ' + (ok ? 'is-correct' : 'is-wrong');
      foot.innerHTML = `
        <div class="fb" role="alert">
          <span class="fb__icon" aria-hidden="true"><i class="fa-solid ${ok ? 'fa-circle-check' : 'fa-circle-xmark'}"></i></span>
          <div class="fb__text">
            <strong>${esc(title)}${esc(point)}</strong>
            <p>${esc(detail)}</p>
          </div>
        </div>
        <button type="button" class="btn btn--next" data-next>${last ? 'Selesai' : 'Lanjut'}</button>`;
      setBar(st.idx + 1);
      foot.querySelector('[data-next]').focus();
    }

    function next() {
      if (!st.checked) return;
      A11y.stop();
      if (st.idx < n - 1) { st.idx++; renderQuestion(true); } else renderResult();
    }

    /* ---------- Hasil ---------- */
    function renderResult() {
      st.done = true;
      Store.setProgress(m.id, 100);
      if (hooks && hooks.onProgress) hooks.onProgress();
      setBar(n);
      const perfect = st.right === n;
      A11y.beep(perfect);

      $('#qs-body').innerHTML = `
        <div class="qs__result">
          <div class="qs__trophy" aria-hidden="true"><i class="fa-solid ${perfect ? 'fa-trophy' : 'fa-flag-checkered'}"></i></div>
          <h2 id="qs-q" tabindex="-1">Latihan selesai!</h2>
          <p class="score">Skor: <strong>${st.right}/${n}</strong></p>
          <p>Poin baru: <strong>+${st.gained}</strong> &middot; Total poin: <strong>${Store.user.score}</strong></p>
          <p class="muted">${perfect ? 'Luar biasa! Kamu memahami materi ini dengan baik.' : 'Baca ulang materi, lalu coba lagi ya.'}</p>
        </div>`;
      const foot = $('#qs-foot');
      foot.className = 'qs__foot';
      foot.innerHTML = `
        <button type="button" class="btn btn--ghost btn--lg" data-retry><i class="fa-solid fa-rotate-right" aria-hidden="true"></i> Ulangi</button>
        <button type="button" class="btn btn--next" data-finish>Selesai</button>`;
      $('#qs-q').focus();
    }

    /* ---------- Buka / tutup ---------- */
    function start() {
      st = { idx: 0, sel: null, checked: false, right: 0, gained: 0, done: false };
      renderSkeleton();
      renderQuestion(false);
      if (!dlg.open) dlg.showModal();
    }

    function requestClose() {
      if (!st || st.done) { dlg.close(); return; }
      TB.confirmModal({
        title: 'Keluar dari latihan?',
        text: 'Jawaban benar yang sudah kamu isi tetap tersimpan, tetapi latihan ini belum selesai.',
        confirmText: 'Ya, keluar', cancelText: 'Lanjut latihan',
        icon: 'fa-door-open', tone: 'danger'
      }).then(ok => { if (ok) dlg.close(); });
    }

    dlg.addEventListener('cancel', e => { e.preventDefault(); requestClose(); }); // tombol Esc
    dlg.addEventListener('close', () => {
      if (dlg.open) return; // event 'close' terlambat: latihan sudah dimulai ulang
      A11y.stop();
      const finished = st && st.done;
      const summary = finished ? `Modul selesai! Skor ${st.right}/${n}.` : '';
      st = null;
      renderIntro();
      if (finished) toast(summary);
    });

    dlg.addEventListener('click', e => {
      const sp = e.target.closest('[data-speak]');
      if (sp && st) {
        const q = quiz[st.idx];
        const text = sp.dataset.speak === 'q'
          ? 'Soal. ' + q.q
          : q.options.map((o, i) => `Pilihan ${i + 1}. ${o}.`).join(' ');
        A11y.toggleSpeak('quiz-' + sp.dataset.speak, text, speakSetter(sp));
        return;
      }
      if (e.target.closest('[data-check]')) return check();
      if (e.target.closest('[data-next]')) return next();
      if (e.target.closest('[data-retry]')) { A11y.stop(); return start(); }
      if (e.target.closest('[data-finish]')) return dlg.close();
      if (e.target.closest('.qs__close')) return requestClose();
    });

    // Pilih kartu = hanya menandai pilihan, belum disubmit
    dlg.addEventListener('change', e => {
      if (!st || !e.target.matches('.qcard__input')) return;
      st.sel = +e.target.value;
      const btn = $('[data-check]');
      if (btn) btn.disabled = false;
    });

    // Pintasan keyboard: angka 1-9 memilih kartu, Enter = Periksa / Lanjut
    dlg.addEventListener('keydown', e => {
      if (!st || st.done) return;
      if (e.target.closest('button') && e.key === 'Enter') return; // biarkan klik bawaan tombol
      if (/^[1-9]$/.test(e.key) && !st.checked) {
        const input = dlg.querySelectorAll('.qcard__input')[+e.key - 1];
        if (input) { input.checked = true; input.dispatchEvent(new Event('change', { bubbles: true })); input.focus(); }
      } else if (e.key === 'Enter') {
        if (st.checked) next(); else if (st.sel !== null) check();
      }
    });

    box.addEventListener('click', e => { if (e.target.closest('[data-start]')) start(); });
    renderIntro();
  }

  TB.Quiz = { init };
})();
