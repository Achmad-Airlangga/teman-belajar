/* ===== TEMAN BELAJAR — views/profile.js (Profil, Reset Progress, Logout) ===== */
(function () {
  'use strict';
  const { Store, Router, esc, toast } = TB;

  Router.register('/profile', {
    title: 'Profil', auth: 'private',

    render() {
      const u = Store.user;
      const initial = esc(u.name.trim().charAt(0).toUpperCase() || '?');
      const joined = new Date(u.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      const totalModules = TB.Modules.topics.reduce((n, t) => n + t.modules.length, 0);

      return `
        <section aria-labelledby="profile-title">
          <h1 id="profile-title">Profil Saya</h1>

          <div class="card profile-card">
            <div class="avatar" aria-hidden="true">${initial}</div>
            <dl class="profile-info">
              <div><dt>Nama</dt><dd>${esc(u.name)}</dd></div>
              <div><dt>Email</dt><dd>${esc(u.email)}</dd></div>
              <div><dt>Bergabung</dt><dd>${joined}</dd></div>
            </dl>
          </div>

          <ul class="stat-row" aria-label="Statistik">
            <li class="card"><strong><i class="fa-solid fa-coins" aria-hidden="true"></i> ${u.coins}</strong><span class="muted">Total koin</span></li>
            <li class="card"><strong><i class="fa-solid fa-star" aria-hidden="true"></i> ${u.score}</strong><span class="muted">Total poin</span></li>
            <li class="card"><strong><i class="fa-solid fa-circle-check" aria-hidden="true"></i> ${Store.completedCount()}/${totalModules}</strong><span class="muted">Modul diselesaikan</span></li>
          </ul>

          <div class="profile-actions">
            <button type="button" class="btn btn--ghost" id="btn-reset">
              <i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Reset Progress</button>
            <button type="button" class="btn btn--primary" id="btn-logout-profile">
              <i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i> Logout</button>
          </div>
        </section>

        <dialog id="reset-dialog" class="dialog" aria-labelledby="reset-title" aria-describedby="reset-text">
          <form method="dialog">
            <h2 id="reset-title"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> Reset progress?</h2>
            <p id="reset-text">Semua progress, poin latihan, dan modul lanjutan yang sudah dibuka akan dihapus. Akun dan saldo koin tetap ada, koin tidak dikembalikan. Tindakan ini tidak bisa dibatalkan.</p>
            <div class="dialog__actions">
              <button class="btn btn--ghost" value="cancel" id="reset-cancel">Batal</button>
              <button class="btn btn--danger" value="confirm">Ya, reset</button>
            </div>
          </form>
        </dialog>`;
    },

    mount(root) {
      const dlg = root.querySelector('#reset-dialog');

      root.querySelector('#btn-reset').addEventListener('click', () => {
        dlg.showModal();
        root.querySelector('#reset-cancel').focus(); // fokus awal ke opsi aman
      });

      dlg.addEventListener('close', () => {
        if (dlg.returnValue !== 'confirm') return;
        Store.resetProgress();
        toast('Progress berhasil direset.');
        TB.refreshNav();
        Router.resolve();
      });

      root.querySelector('#btn-logout-profile').addEventListener('click', TB.confirmLogout);
    }
  });
})();
