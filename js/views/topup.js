/* ===== TEMAN BELAJAR — views/topup.js (Simulasi Top Up via QRIS, tanpa backend) ===== */
(function () {
  'use strict';
  const { Store, Router, toast } = TB;
  const M = TB.Modules;

  /* ---------- QR Code dummy (SVG) ----------
     Pola acak deterministik + 3 penanda sudut. BUKAN QR sungguhan dan tidak bisa dipindai. */
  function dummyQrSvg(seedText) {
    const N = 29, CELL = 8, PAD = 16;
    let seed = 0;
    for (const ch of seedText) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

    const inFinder = (x, y) => {
      const boxes = [[0, 0], [N - 7, 0], [0, N - 7]];
      return boxes.some(([bx, by]) => x >= bx - 1 && x <= bx + 7 && y >= by - 1 && y <= by + 7);
    };
    const finderCell = (x, y) => {
      for (const [bx, by] of [[0, 0], [N - 7, 0], [0, N - 7]]) {
        const dx = x - bx, dy = y - by;
        if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
          const edge = dx === 0 || dx === 6 || dy === 0 || dy === 6;
          const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
          return edge || core;
        }
      }
      return false;
    };

    let rects = '';
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const on = inFinder(x, y) ? finderCell(x, y) : rnd() > 0.52;
        if (on) rects += `<rect x="${PAD + x * CELL}" y="${PAD + y * CELL}" width="${CELL}" height="${CELL}"/>`;
      }
    }
    const size = N * CELL + PAD * 2;
    return `<svg class="qr" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" role="img"
              aria-label="Gambar QR Code contoh untuk simulasi pembayaran QRIS">
              <rect width="${size}" height="${size}" fill="#fff"/><g fill="#111">${rects}</g></svg>`;
  }

  Router.register('/topup', {
    title: 'Top Up Koin', auth: 'private',

    render() {
      const u = Store.user;
      const pkgs = M.packages.map(p => `
        <label class="choice">
          <input class="choice__input" type="radio" name="package" value="${p.id}" required>
          <span class="choice__body">
            ${p.badge ? `<span class="choice__tag">${p.badge}</span>` : ''}
            <i class="fa-solid fa-coins choice__icon" aria-hidden="true"></i>
            <strong>${p.coins} Koin</strong>
            <span class="muted">${M.rupiah(p.price)}</span>
          </span>
        </label>`).join('');

      return `
        <section aria-labelledby="topup-title">
          <a href="#/dashboard"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Dashboard</a>
          <h1 id="topup-title">Top Up Koin</h1>
          <p class="muted">Saldo koin saat ini: <strong id="topup-balance">${u.coins}</strong> koin.
            Ini hanya simulasi, tidak ada pembayaran sungguhan.</p>

          <form id="form-topup" novalidate>
            <fieldset class="fieldset">
              <legend>1. Pilih paket koin</legend>
              <div class="choice-grid">${pkgs}</div>
              <p class="field-error" id="package-err"></p>
            </fieldset>

            <fieldset class="fieldset">
              <legend>2. Metode pembayaran</legend>
              <div class="pay-method" aria-label="Metode pembayaran: QRIS">
                <span class="pay-method__logo" aria-hidden="true"><i class="fa-solid fa-qrcode"></i></span>
                <div>
                  <strong>QRIS</strong>
                  <span class="muted">Bayar dengan scan QR lewat e-wallet atau mobile banking</span>
                </div>
                <i class="fa-solid fa-circle-check pay-method__check" aria-hidden="true"></i>
              </div>
            </fieldset>

            <div class="card summary" aria-live="polite">
              <span>Total bayar</span>
              <strong id="topup-total">Rp0</strong>
            </div>

            <button class="btn btn--primary btn--block" id="btn-pay" type="submit">
              <i class="fa-solid fa-qrcode" aria-hidden="true"></i> Bayar dengan QRIS</button>
          </form>
        </section>

        <dialog id="qris-dialog" class="dialog dialog--qr" aria-labelledby="qris-title">
          <h2 id="qris-title">Scan untuk membayar</h2>
          <p class="muted" id="qris-sub"></p>
          <div class="qr-wrap" id="qr-wrap"></div>
          <p class="qr-note"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> QR ini hanya contoh dan tidak bisa dipindai.</p>
          <div class="dialog__actions dialog__actions--wrap">
            <button type="button" class="btn btn--ghost" id="qris-cancel">Batal</button>
            <button type="button" class="btn btn--primary" id="qris-done">
              <i class="fa-solid fa-check" aria-hidden="true"></i> Simulasikan sudah bayar</button>
          </div>
        </dialog>`;
    },

    mount(root) {
      const form = root.querySelector('#form-topup');
      const total = root.querySelector('#topup-total');
      const dlg = root.querySelector('#qris-dialog');
      const doneBtn = root.querySelector('#qris-done');
      const selected = () => M.packages.find(p => p.id === (form.querySelector('input[name="package"]:checked') || {}).value);

      form.addEventListener('change', () => {
        const pkg = selected();
        total.textContent = pkg ? M.rupiah(pkg.price) : 'Rp0';
        root.querySelector('#package-err').textContent = '';
      });

      // Langkah 1: tampilkan QR dummy, saldo BELUM bertambah
      form.addEventListener('submit', e => {
        e.preventDefault();
        const pkg = selected();
        if (!pkg) {
          root.querySelector('#package-err').textContent = 'Pilih salah satu paket koin.';
          form.querySelector('input[name="package"]').focus();
          return;
        }
        root.querySelector('#qr-wrap').innerHTML = dummyQrSvg(pkg.id + Date.now());
        root.querySelector('#qris-sub').textContent = `${pkg.coins} koin · ${M.rupiah(pkg.price)}`;
        doneBtn.disabled = false;
        doneBtn.dataset.pkg = pkg.id;
        dlg.showModal();
      });

      root.querySelector('#qris-cancel').addEventListener('click', () => dlg.close());

      // Langkah 2: konfirmasi simulasi, baru koin ditambahkan
      doneBtn.addEventListener('click', () => {
        const pkg = M.packages.find(p => p.id === doneBtn.dataset.pkg);
        if (!pkg) return;
        doneBtn.disabled = true;
        doneBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Memverifikasi...';

        setTimeout(() => {
          const res = Store.addCoins(pkg.coins);
          dlg.close();
          if (!res.ok) { toast(res.error); return; }
          toast(`Pembayaran disimulasikan via QRIS. +${pkg.coins} koin!`);
          TB.refreshNav();
          Router.go('/dashboard');
        }, 1200);
      });
    }
  });
})();
