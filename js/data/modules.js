/* ===== TEMAN BELAJAR — data/modules.js (katalog modul & paket koin) ===== */
(function () {
  'use strict';
  const { Store } = TB;

  const ADVANCED_COST = 5;

  // Tiap topik punya 1 modul dasar (gratis) dan 1 modul lanjutan (5 koin)
  const topics = [
    {
      id: 'buta-warna', title: 'Buta Warna', icon: 'fa-eye-low-vision',
      desc: 'Pahami bagaimana penderita buta warna melihat dunia.',
      modules: [
        { id: 'buta-warna-dasar', title: 'Mengenal Buta Warna', cost: 0 },
        { id: 'buta-warna-lanjut', title: 'Simulasi Jenis Buta Warna', cost: ADVANCED_COST }
      ]
    },
    {
      id: 'tunanetra', title: 'Tunanetra', icon: 'fa-person-walking-with-cane',
      desc: 'Belajar mengandalkan suara dan sentuhan.',
      modules: [
        { id: 'tunanetra-dasar', title: 'Mengenal Tunanetra', cost: 0 },
        { id: 'tunanetra-lanjut', title: 'Mode Navigasi Suara', cost: ADVANCED_COST }
      ]
    },
    {
      id: 'tunarungu', title: 'Tunarungu', icon: 'fa-ear-deaf',
      desc: 'Berkomunikasi lewat bahasa isyarat BISINDO.',
      modules: [
        { id: 'tunarungu-dasar', title: 'Mengenal Tunarungu', cost: 0 },
        { id: 'tunarungu-lanjut', title: 'Kamus BISINDO Lengkap', cost: ADVANCED_COST }
      ]
    },
    {
      id: 'nonverbal', title: 'Komunikasi Nonverbal', icon: 'fa-comment-slash',
      desc: 'Memahami komunikasi tanpa kata-kata.',
      modules: [
        { id: 'nonverbal-dasar', title: 'Mengenal Komunikasi Nonverbal', cost: 0 },
        { id: 'nonverbal-lanjut', title: 'Papan Komunikasi (AAC)', cost: ADVANCED_COST }
      ]
    },
    {
      id: 'down-syndrome', title: 'Down Syndrome', icon: 'fa-puzzle-piece',
      desc: 'Berinteraksi dengan empati dan percaya diri.',
      modules: [
        { id: 'down-syndrome-dasar', title: 'Mengenal Down Syndrome', cost: 0 },
        { id: 'down-syndrome-lanjut', title: 'Berteman dan Berkegiatan Bersama', cost: ADVANCED_COST }
      ]
    },
    {
      id: 'autisme', title: 'Memahami Autisme (Neurodivergen)', icon: 'fa-brain',
      desc: 'Mengenal cara otak neurodivergen bekerja dan cara mendukungnya.',
      modules: [
        { id: 'autisme-dasar', title: 'Mengenal Autisme', cost: 0 },
        { id: 'autisme-lanjut', title: 'Berteman dengan Teman Neurodivergen', cost: ADVANCED_COST }
      ]
    },
    {
      id: 'daksa', title: 'Disabilitas Fisik (Daksa)', icon: 'fa-wheelchair',
      desc: 'Etika berinteraksi dan lingkungan yang ramah akses.',
      modules: [
        { id: 'daksa-dasar', title: 'Mengenal Disabilitas Fisik', cost: 0 },
        { id: 'daksa-lanjut', title: 'Lingkungan Ramah Akses', cost: ADVANCED_COST }
      ]
    }
  ];

  const packages = [
    { id: 'p10', coins: 10, price: 6000 },
    { id: 'p25', coins: 25, price: 14000, badge: 'Populer' },
    { id: 'p50', coins: 50, price: 26000, badge: 'Hemat' },
    { id: 'p100', coins: 100, price: 49000 }
  ];

  const allModules = topics.flatMap(t => t.modules.map(m => Object.assign({ topicId: t.id, topicTitle: t.title }, m)));

  const rupiah = n => 'Rp' + new Intl.NumberFormat('id-ID').format(n);

  TB.Modules = {
    ADVANCED_COST, topics, packages, rupiah,
    find: id => allModules.find(m => m.id === id) || null,
    isFree: m => m.cost === 0,
    // Terbuka bila gratis atau sudah dibuka user
    isUnlocked(m) {
      const u = Store.user;
      return m.cost === 0 || !!(u && u.unlocked.includes(m.id));
    },
    progressOf(id) {
      const u = Store.user;
      return (u && u.progress && u.progress[id]) || 0;
    }
  };
})();
