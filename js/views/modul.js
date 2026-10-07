/* ===== TEMAN BELAJAR — views/modul.js (Materi, Kuis, BISINDO) ===== */
(function () {
  'use strict';
  const { Store, Router, A11y, esc, toast } = TB;
  const M = TB.Modules;
  const C = TB.Content;

  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  // Gambar placeholder. Ganti per huruf dengan gambar isyarat BISINDO asli.
  const PLACEHOLDER_SRC = 'assets/img/placeholder.jpg';
  const BISINDO_GROUP = 'bisindo';

  /* ---------- Potongan HTML ---------- */
  function colorDemo() {
    return `
      <div class="swatch-row" role="group" aria-label="Contoh dua warna: merah dan hijau">
        <figure class="swatch" style="--sw:#c0392b"><div class="swatch__box"></div><figcaption>Merah</figcaption></figure>
        <figure class="swatch" style="--sw:#3a7d2a"><div class="swatch__box"></div><figcaption>Hijau</figcaption></figure>
      </div>
      <button type="button" class="btn btn--ghost btn--sm" id="btn-compare" aria-pressed="false">
        <i class="fa-solid fa-palette" aria-hidden="true"></i> <span>Lihat warna asli</span>
      </button>`;
  }

  function sectionHtml(s, i) {
    return `
      <section class="content-section card" aria-labelledby="sec-${i}">
        <div class="content-section__head">
          <h2 id="sec-${i}">${esc(s.h)}</h2>
          <button type="button" class="btn btn--ghost btn--sm" data-speak aria-label="Bacakan bagian ${esc(s.h)}">
            <i class="fa-solid fa-volume-high" aria-hidden="true"></i> Bacakan</button>
        </div>
        ${(s.p || []).map(p => `<p>${esc(p)}</p>`).join('')}
        ${s.list ? `<ul class="check-list">${s.list.map(li => `<li>${esc(li)}</li>`).join('')}</ul>` : ''}
        ${s.demo === 'colors' ? colorDemo() : ''}
      </section>`;
  }

  function bisindoHtml() {
    return `
      <section class="content-section card" aria-labelledby="bisindo-title">
        <div class="content-section__head">
          <h2 id="bisindo-title">Abjad BISINDO A–Z</h2>
          <span class="muted" id="bisindo-count" aria-live="polite"></span>
        </div>
        <p class="muted">Pilih huruf, lihat gambarnya, tirukan gerakannya, lalu tandai jika sudah bisa. Gambar saat ini masih placeholder.</p>
        <ul class="letter-grid" id="letter-grid"></ul>
      </section>

      <dialog id="letter-dialog" class="dialog dialog--wide" aria-labelledby="ld-title">
        <h2 id="ld-title"></h2>
        <img id="ld-img" class="letter-big" src="${PLACEHOLDER_SRC}" alt="">
        <ol class="steps">
          <li>Perhatikan bentuk tangan pada gambar.</li>
          <li>Tirukan gerakannya perlahan di depan dada.</li>
          <li>Ulangi beberapa kali sampai lancar.</li>
        </ol>
        <div class="dialog__actions dialog__actions--wrap">
          <button type="button" class="btn btn--ghost btn--sm" id="ld-prev"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i> Sebelumnya</button>
          <button type="button" class="btn btn--ghost btn--sm" id="ld-next">Berikutnya <i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
          <button type="button" class="btn btn--ghost btn--sm" id="ld-speak"><i class="fa-solid fa-volume-high" aria-hidden="true"></i> Bacakan</button>
          <button type="button" class="btn btn--primary btn--sm" id="ld-learn" aria-pressed="false"></button>
          <button type="button" class="btn btn--ghost btn--sm" id="ld-close">Tutup</button>
        </div>
      </dialog>`;
  }

  /* ---------- Progress header ---------- */
  function updateProgress(root, id) {
    const pct = M.progressOf(id);
    const bar = root.querySelector('#mod-progress');
    if (!bar) return;
    bar.setAttribute('aria-valuenow', pct);
    bar.firstElementChild.style.width = pct + '%';
    root.querySelector('#mod-progress-text').textContent = 'Progres: ' + pct + '%';
  }

  /* ---------- Route ---------- */
  Router.register('/modul/:id', {
    title: 'Modul', auth: 'private',

    render(params) {
      const m = M.find(params.id);
      if (!m) {
        return `<section class="card text-center"><h1>Modul tidak ditemukan</h1>
          <a class="btn btn--primary" href="#/dashboard">Kembali ke Dashboard</a></section>`;
      }
      if (!M.isUnlocked(m)) {
        return `<section class="card text-center">
          <h1><i class="fa-solid fa-lock" aria-hidden="true"></i> Modul Terkunci</h1>
          <p>"${esc(m.title)}" butuh ${m.cost} koin. Buka dari Dashboard.</p>
          <a class="btn btn--primary" href="#/dashboard">Ke Dashboard</a></section>`;
      }
      const c = C.byId[m.id];
      if (!c) {
        return `<section class="card">
          <a href="#/dashboard"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Dashboard</a>
          <p class="tagline">${esc(m.topicTitle)}</p>
          <h1>${esc(m.title)}</h1>
          <p class="muted">Materi modul ini segera hadir.</p></section>`;
      }

      const pct = M.progressOf(m.id);
      return `
        <article aria-labelledby="mod-title">
          <header class="page-banner">
            <a href="#/dashboard"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Dashboard</a>
            <p class="tagline">${esc(m.topicTitle)}</p>
            <h1 id="mod-title">${esc(m.title)}</h1>
            <p class="page-banner__intro">${esc(c.intro || '')}</p>
          </header>
          ${c.theme === 'mono' ? `<p class="banner" id="mono-banner"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> Tema monokrom aktif otomatis untuk modul ini.</p>` : ''}

          <div class="module-toolbar" role="toolbar" aria-label="Alat bantu modul">
            <button type="button" class="btn btn--ghost btn--sm" id="btn-read-all">
              <i class="fa-solid fa-volume-high" aria-hidden="true"></i> Bacakan semua</button>
            <button type="button" class="btn btn--ghost btn--sm" id="btn-stop">
              <i class="fa-solid fa-stop" aria-hidden="true"></i> Berhenti</button>
          </div>

          <div class="progress progress--lg" id="mod-progress" role="progressbar" aria-label="Progres modul"
               aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div>
          <p class="muted" id="mod-progress-text">Progres: ${pct}%</p>

          ${(c.sections || []).map(sectionHtml).join('')}
          ${c.type === 'bisindo' ? bisindoHtml() : ''}
          ${c.quiz ? `<section class="content-section card quiz" id="quiz" aria-labelledby="quiz-title"></section>` : ''}
        </article>`;
    },

    mount(root, params) {
      const m = M.find(params.id);
      const c = m && C.byId[m.id];
      if (!m || !c || !M.isUnlocked(m)) return;

      if (c.theme === 'mono') A11y.force({ mono: true });

      // Alat bantu
      root.querySelector('#btn-read-all').addEventListener('click', () => A11y.readPage());
      root.querySelector('#btn-stop').addEventListener('click', () => A11y.stop());
      // Bacakan satu bagian materi, dengan highlight pada paragraf yang sedang dibacakan
      root.querySelectorAll('[data-speak]').forEach(btn => {
        btn.addEventListener('click', () => {
          const sec = btn.closest('section');
          const parts = Array.from(sec.querySelectorAll('h2, p, li')).filter(el => el.innerText.trim());
          A11y.readElements(parts);
        });
      });

      // Bandingkan monokrom vs warna asli
      const cmp = root.querySelector('#btn-compare');
      if (cmp) {
        cmp.addEventListener('click', () => {
          const showOriginal = cmp.getAttribute('aria-pressed') !== 'true';
          cmp.setAttribute('aria-pressed', showOriginal);
          cmp.querySelector('span').textContent = showOriginal ? 'Kembali ke monokrom' : 'Lihat warna asli';
          if (showOriginal) A11y.clearForce(); else A11y.force({ mono: true });
        });
      }

      if (c.quiz) {
        Store.setProgress(m.id, 50); // materi dibuka = 50%
        updateProgress(root, m.id);
        TB.Quiz.init(root, m, c.quiz, { onProgress: () => updateProgress(root, m.id) });
      }
      if (c.type === 'bisindo') initBisindo(root, m);
    },

    unmount() {
      A11y.clearForce();
      A11y.stop();
    }
  });

  /* ---------- BISINDO ---------- */
  function initBisindo(root, m) {
    const grid = root.querySelector('#letter-grid');
    const count = root.querySelector('#bisindo-count');
    const dlg = root.querySelector('#letter-dialog');
    const learnBtn = root.querySelector('#ld-learn');
    let current = 'A';

    function renderGrid() {
      const done = Store.learnedList(BISINDO_GROUP);
      grid.innerHTML = LETTERS.map(l => {
        const isDone = done.includes(l);
        return `
          <li class="letter-card ${isDone ? 'is-done' : ''}">
            <img src="${PLACEHOLDER_SRC}" alt="Isyarat ${l}" loading="lazy" width="160" height="160">
            <h3>${l}</h3>
            ${isDone ? '<span class="badge badge--open"><i class="fa-solid fa-check" aria-hidden="true"></i> Sudah dipelajari</span>' : ''}
            <button type="button" class="btn btn--primary btn--sm" data-letter="${l}"
              aria-label="Pelajari gerakan isyarat huruf ${l}">Pelajari gerakan</button>
          </li>`;
      }).join('');
      count.textContent = done.length + '/26 huruf dipelajari';
    }

    function syncLearnBtn() {
      const on = Store.learnedList(BISINDO_GROUP).includes(current);
      learnBtn.setAttribute('aria-pressed', on);
      learnBtn.innerHTML = on
        ? '<i class="fa-solid fa-check" aria-hidden="true"></i> Sudah dipelajari'
        : '<i class="fa-regular fa-circle-check" aria-hidden="true"></i> Tandai sudah bisa';
    }

    function showLetter(l) {
      current = l;
      root.querySelector('#ld-title').textContent = 'Huruf ' + l;
      const img = root.querySelector('#ld-img');
      img.src = PLACEHOLDER_SRC;
      img.alt = 'Isyarat ' + l;
      syncLearnBtn();
    }

    function openLetter(l) {
      showLetter(l);
      if (!dlg.open) dlg.showModal();
    }

    function step(delta) {
      const i = (LETTERS.indexOf(current) + delta + LETTERS.length) % LETTERS.length;
      showLetter(LETTERS[i]);
    }

    grid.addEventListener('click', e => {
      const btn = e.target.closest('[data-letter]');
      if (btn) openLetter(btn.dataset.letter);
    });
    root.querySelector('#ld-prev').addEventListener('click', () => step(-1));
    root.querySelector('#ld-next').addEventListener('click', () => step(1));
    root.querySelector('#ld-close').addEventListener('click', () => dlg.close());
    root.querySelector('#ld-speak').addEventListener('click', () =>
      A11y.speak('Huruf ' + current + '. Tirukan gerakan tangan pada gambar.'));

    learnBtn.addEventListener('click', () => {
      const on = Store.toggleLearned(BISINDO_GROUP, current);
      const total = Store.learnedList(BISINDO_GROUP).length;
      Store.setProgress(m.id, total / LETTERS.length * 100, true);
      updateProgress(root, m.id);
      renderGrid();
      syncLearnBtn();
      if (on && total === LETTERS.length) {
        toast('Modul selesai! Semua huruf BISINDO sudah kamu pelajari 🎉');
      } else {
        toast(on ? `Huruf ${current} ditandai sudah dipelajari (${total}/26).` : `Tanda huruf ${current} dilepas (${total}/26).`);
      }
    });

    renderGrid();
  }
})();
