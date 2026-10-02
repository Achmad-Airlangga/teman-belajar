/* ===== TEMAN BELAJAR — views/dashboard.js (Dashboard, buka modul, halaman modul) ===== */
(function () {
  'use strict';
  const { Store, Router, esc, toast } = TB;
  const M = TB.Modules;

  /* ---------- Baris modul di dalam kartu ---------- */
  function moduleRow(m) {
    const unlocked = M.isUnlocked(m);
    const pct = M.progressOf(m.id);
    let status, action;

    if (M.isFree(m)) {
      status = `<span class="badge badge--free"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Gratis</span>`;
    } else if (unlocked) {
      status = `<span class="badge badge--open"><i class="fa-solid fa-lock-open" aria-hidden="true"></i> Terbuka</span>`;
    } else {
      status = `<span class="badge badge--locked"><i class="fa-solid fa-lock" aria-hidden="true"></i> ${m.cost} koin</span>`;
    }

    if (unlocked) {
      action = `<a class="btn btn--primary btn--sm" href="#/modul/${m.id}" aria-label="Mulai modul ${esc(m.title)}">
                  <i class="fa-solid fa-play" aria-hidden="true"></i> ${pct > 0 ? 'Lanjut' : 'Mulai'}</a>`;
    } else {
      action = `<button type="button" class="btn btn--ghost btn--sm" data-unlock="${m.id}"
                  aria-label="Buka modul ${esc(m.title)} dengan ${m.cost} koin">
                  <i class="fa-solid fa-lock" aria-hidden="true"></i> Buka ${m.cost} koin</button>`;
    }

    return `
      <li class="module-row ${unlocked ? '' : 'is-locked'}">
        <div class="module-row__info">
          <span class="module-row__title">${esc(m.title)}</span>
          ${status}
          ${unlocked && pct > 0 ? `<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}" aria-label="Progres ${esc(m.title)}"><span style="width:${pct}%"></span></div>` : ''}
        </div>
        ${action}
      </li>`;
  }

  function topicCard(t) {
    return `
      <article class="card topic-card" aria-labelledby="t-${t.id}">
        <div class="topic-card__head">
          <span class="topic-card__icon"><i class="fa-solid ${t.icon}" aria-hidden="true"></i></span>
          <div>
            <h3 id="t-${t.id}">${esc(t.title)}</h3>
            <p class="muted">${esc(t.desc)}</p>
          </div>
        </div>
        <ul class="module-list">${t.modules.map(moduleRow).join('')}</ul>
      </article>`;
  }

  /* ---------- Welcome Banner / Panduan Cepat ---------- */
  function welcomeBanner(u) {
    if (u.hideWelcome) return '';
    const firstModule = M.topics[0].modules[0].id;
    return `
      <section class="welcome" aria-labelledby="welcome-title">
        <div class="welcome__art" aria-hidden="true">
          <span class="welcome__orb">🤝</span>
          <span class="welcome__float welcome__float--1">📚</span>
          <span class="welcome__float welcome__float--2">🪙</span>
          <span class="welcome__float welcome__float--3">🏆</span>
          <span class="welcome__float welcome__float--4">⭐</span>
        </div>
        <div class="welcome__body">
          <p class="welcome__eyebrow"><i class="fa-solid fa-hand-sparkles" aria-hidden="true"></i> Panduan cepat</p>
          <h2 id="welcome-title">Selamat datang di Teman Belajar!</h2>
          <p class="welcome__lead">Pilih modul, selesaikan kuis, dan kumpulkan koin!</p>
          <ol class="welcome__steps">
            <li>
              <span class="step-n" aria-hidden="true">1</span>
              <span><strong><i class="fa-solid fa-book-open" aria-hidden="true"></i> Pilih modul</strong>
              Mulai dari modul <em>Gratis</em> pada tiap topik.</span>
            </li>
            <li>
              <span class="step-n" aria-hidden="true">2</span>
              <span><strong><i class="fa-solid fa-circle-question" aria-hidden="true"></i> Selesaikan kuis</strong>
              10 soal situasi sehari-hari. Jawaban benar pertama = +1 poin.</span>
            </li>
            <li>
              <span class="step-n" aria-hidden="true">3</span>
              <span><strong><i class="fa-solid fa-coins" aria-hidden="true"></i> Kumpulkan koin</strong>
              Buka modul lanjutan dengan ${M.ADVANCED_COST} koin, atau top up lewat QRIS.</span>
            </li>
          </ol>
          <div class="welcome__actions">
            <a class="btn btn--light" href="#/modul/${firstModule}"><i class="fa-solid fa-play" aria-hidden="true"></i> Mulai belajar</a>
            <button type="button" class="btn btn--outline-dark" data-welcome="hide">Sembunyikan panduan</button>
          </div>
        </div>
      </section>`;
  }

  /* ---------- Dashboard ---------- */
  Router.register('/dashboard', {
    title: 'Dashboard', auth: 'private',
    render() {
      const u = Store.user;
      const total = M.topics.reduce((n, t) => n + t.modules.length, 0);
      const open = M.topics.reduce((n, t) => n + t.modules.filter(M.isUnlocked).length, 0);
      return `
        <section aria-labelledby="dash-title">
          <div class="dash-head">
            <div>
              <h1 id="dash-title">Halo, ${esc(u.name)}! 👋</h1>
              <p class="muted">Pilih topik yang ingin kamu pelajari hari ini.</p>
            </div>
            <div class="stat-card" aria-label="Koin kamu">
              <span class="stat-card__icon"><i class="fa-solid fa-coins" aria-hidden="true"></i></span>
              <div>
                <span class="stat-card__value" id="coin-count">${u.coins}</span>
                <span class="stat-card__label">Koin</span>
              </div>
              <a class="btn btn--primary btn--sm" href="#/topup"><i class="fa-solid fa-plus" aria-hidden="true"></i> Top Up</a>
            </div>
          </div>

          ${welcomeBanner(u)}

          <ul class="stat-row" aria-label="Ringkasan">
            <li class="card"><strong>${open}/${total}</strong><span class="muted">Modul terbuka</span></li>
            <li class="card"><strong>${u.score}</strong><span class="muted">Total poin</span></li>
            <li class="card"><strong>${M.ADVANCED_COST} koin</strong><span class="muted">Biaya modul lanjutan</span></li>
          </ul>

          <p class="quick-links">
            <a class="btn btn--ghost btn--sm" href="#/profile"><i class="fa-solid fa-user" aria-hidden="true"></i> Profil Saya</a>
            ${u.hideWelcome ? '<button type="button" class="btn btn--ghost btn--sm" data-welcome="show"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> Panduan Cepat</button>' : ''}
          </p>

          <div class="grid grid--topics" id="topics">${M.topics.map(topicCard).join('')}</div>
        </section>

        <dialog id="unlock-dialog" class="dialog" aria-labelledby="unlock-title">
          <form method="dialog" id="unlock-form">
            <h2 id="unlock-title"></h2>
            <p id="unlock-text"></p>
            <div class="dialog__actions">
              <button class="btn btn--ghost" value="cancel" id="unlock-cancel">Batal</button>
              <button class="btn btn--primary" value="confirm" id="unlock-confirm"></button>
            </div>
          </form>
        </dialog>`;
    },
    mount(root) {
      root.querySelectorAll('[data-welcome]').forEach(btn => {
        btn.addEventListener('click', () => {
          Store.updateUser({ hideWelcome: btn.dataset.welcome === 'hide' });
          Router.resolve();
        });
      });

      const dlg = root.querySelector('#unlock-dialog');
      const title = root.querySelector('#unlock-title');
      const text = root.querySelector('#unlock-text');
      const confirmBtn = root.querySelector('#unlock-confirm');
      let pending = null;

      root.querySelectorAll('[data-unlock]').forEach(btn => {
        btn.addEventListener('click', () => {
          const m = M.find(btn.dataset.unlock);
          if (!m) return;
          pending = m;
          const coins = Store.user.coins;
          title.textContent = 'Buka "' + m.title + '"?';
          if (coins >= m.cost) {
            text.textContent = `Kamu akan memakai ${m.cost} koin. Sisa koin setelah dibuka: ${coins - m.cost}.`;
            confirmBtn.textContent = `Buka (−${m.cost} koin)`;
            confirmBtn.dataset.mode = 'unlock';
          } else {
            text.textContent = `Koin kamu ${coins}, butuh ${m.cost}. Top up dulu untuk membuka modul ini.`;
            confirmBtn.textContent = 'Top Up Koin';
            confirmBtn.dataset.mode = 'topup';
          }
          dlg.showModal();
          confirmBtn.focus();
        });
      });

      dlg.addEventListener('close', () => {
        if (dlg.returnValue !== 'confirm' || !pending) { pending = null; return; }
        const m = pending; pending = null;
        if (confirmBtn.dataset.mode === 'topup') return Router.go('/topup');

        const res = Store.unlockModule(m.id, m.cost);
        if (!res.ok) { toast(res.error); return; }
        toast(`Modul "${m.title}" terbuka! Sisa koin: ${res.coins}`);
        TB.refreshNav();
        Router.resolve(); // render ulang dashboard dengan status terbaru
      });
    }
  });
})();
