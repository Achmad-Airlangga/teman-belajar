/* ===== TEMAN BELAJAR — views/auth.js (Login, Register, 404) ===== */
(function () {
  'use strict';
  const { Store, Router, esc, toast, SIGNUP_COINS } = TB;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ---------- Utilitas form ---------- */
  function field({ id, label, type = 'text', autocomplete, placeholder = '', password = false }) {
    return `
      <div class="form-group">
        <label class="label" for="${id}">${label}</label>
        <div class="${password ? 'pw-wrap' : ''}">
          <input class="input" id="${id}" name="${id}" type="${type}" autocomplete="${autocomplete}"
                 placeholder="${placeholder}" aria-describedby="${id}-err" required>
          ${password ? `<button type="button" class="pw-toggle" data-target="${id}" aria-label="Tampilkan kata sandi">
            <i class="fa-solid fa-eye" aria-hidden="true"></i></button>` : ''}
        </div>
        <p class="field-error" id="${id}-err"></p>
      </div>`;
  }

  function setError(input, msg) {
    const err = document.getElementById(input.id + '-err');
    err.textContent = msg || '';
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  function showAlert(form, msg) {
    const box = form.querySelector('.form-alert');
    box.textContent = msg; box.hidden = !msg;
  }

  function bindPasswordToggles(root) {
    root.querySelectorAll('.pw-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.target);
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.setAttribute('aria-label', show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
        btn.firstElementChild.className = 'fa-solid ' + (show ? 'fa-eye-slash' : 'fa-eye');
      });
    });
  }

  /* ---------- Login ---------- */
  Router.register('/login', {
    title: 'Masuk', auth: 'guest',
    render() {
      return `
        <section class="auth-wrap card" aria-labelledby="login-title">
          <h1 id="login-title">Masuk</h1>
          <p class="muted">Lanjutkan belajarmu bersama TEMAN BELAJAR.</p>
          <form id="form-login" novalidate>
            <div class="form-alert" role="alert" hidden></div>
            ${field({ id: 'email', label: 'Email', type: 'email', autocomplete: 'email', placeholder: 'nama@email.com' })}
            ${field({ id: 'password', label: 'Kata sandi', type: 'password', autocomplete: 'current-password', password: true })}
            <button class="btn btn--primary btn--block" type="submit">
              <i class="fa-solid fa-right-to-bracket" aria-hidden="true"></i> Masuk</button>
          </form>
          <p class="text-center">Belum punya akun? <a href="#/register">Daftar di sini</a></p>
        </section>`;
    },
    mount(root) {
      bindPasswordToggles(root);
      const form = root.querySelector('#form-login');
      form.addEventListener('submit', e => {
        e.preventDefault();
        const email = form.email, pw = form.password;
        const okEmail = setError(email, EMAIL_RE.test(email.value.trim()) ? '' : 'Masukkan email yang valid.');
        const okPw = setError(pw, pw.value ? '' : 'Kata sandi wajib diisi.');
        if (!okEmail || !okPw) { (okEmail ? pw : email).focus(); return; }

        const res = Store.login(email.value, pw.value);
        if (!res.ok) { showAlert(form, res.error); return; }
        toast(`Selamat datang kembali, ${res.user.name}!`);
        Router.go('/dashboard');
      });
      root.querySelector('#email').focus();
    }
  });

  /* ---------- Register ---------- */
  Router.register('/register', {
    title: 'Daftar', auth: 'guest',
    render() {
      return `
        <section class="auth-wrap card" aria-labelledby="reg-title">
          <h1 id="reg-title">Buat Akun</h1>
          <p class="promo"><i class="fa-solid fa-gift" aria-hidden="true"></i> Gratis ${SIGNUP_COINS} koin untuk pendaftar baru!</p>
          <form id="form-register" novalidate>
            <div class="form-alert" role="alert" hidden></div>
            ${field({ id: 'name', label: 'Nama lengkap', autocomplete: 'name', placeholder: 'Nama kamu' })}
            ${field({ id: 'email', label: 'Email', type: 'email', autocomplete: 'email', placeholder: 'nama@email.com' })}
            ${field({ id: 'password', label: 'Kata sandi (min. 6 karakter)', type: 'password', autocomplete: 'new-password', password: true })}
            ${field({ id: 'confirm', label: 'Ulangi kata sandi', type: 'password', autocomplete: 'new-password', password: true })}
            <button class="btn btn--primary btn--block" type="submit">
              <i class="fa-solid fa-user-plus" aria-hidden="true"></i> Daftar</button>
          </form>
          <p class="text-center">Sudah punya akun? <a href="#/login">Masuk</a></p>
        </section>`;
    },
    mount(root) {
      bindPasswordToggles(root);
      const form = root.querySelector('#form-register');
      form.addEventListener('submit', e => {
        e.preventDefault();
        const { name, email, password, confirm } = form;
        const checks = [
          [name, name.value.trim().length >= 2 ? '' : 'Nama minimal 2 karakter.'],
          [email, EMAIL_RE.test(email.value.trim()) ? '' : 'Masukkan email yang valid.'],
          [password, password.value.length >= 6 ? '' : 'Kata sandi minimal 6 karakter.'],
          [confirm, confirm.value === password.value ? '' : 'Kata sandi tidak sama.']
        ];
        const results = checks.map(([input, msg]) => setError(input, msg));
        const firstBad = checks.find((_, i) => !results[i]);
        if (firstBad) { firstBad[0].focus(); return; }

        const res = Store.register({ name: name.value, email: email.value, password: password.value });
        if (!res.ok) { showAlert(form, res.error); return; }
        toast(`Selamat datang, ${res.user.name}! Kamu dapat ${SIGNUP_COINS} koin gratis.`);
        Router.go('/dashboard');
      });
      root.querySelector('#name').focus();
    }
  });

  /* ---------- 404 ---------- */
  Router.register('/404', {
    title: 'Tidak ditemukan', auth: 'public',
    render() {
      return `<section class="card text-center"><h1>404</h1>
        <p>Halaman tidak ditemukan.</p><a class="btn btn--primary" href="#/">Kembali ke Beranda</a></section>`;
    }
  });
})();
