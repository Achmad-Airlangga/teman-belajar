/* ===== TEMAN BELAJAR — data/content.js (materi bacaan) =====
   Soal latihan ada di data/quizzes.js dan digabung di bagian bawah file ini. */
(function () {
  'use strict';

  const QUESTIONS_PER_MODULE = 10;

  /*
    Struktur tiap modul:
    {
      theme: 'mono' | null,       // 'mono' = paksa tema monokrom saat modul dibuka
      type: 'bisindo' (opsional), // tampilan khusus grid abjad
      intro: string,
      sections: [{ h, p: [..], list: [..], demo: 'colors' }]
      // quiz diisi otomatis dari TB.QuizBank[idModul]
    }
  */
  const byId = {

    /* ---------------- BUTA WARNA ---------------- */
    'buta-warna-dasar': {
      theme: 'mono',
      intro: 'Halaman ini otomatis tampil monokrom agar kamu merasakan bagaimana warna bisa sulit dibedakan.',
      sections: [
        {
          h: 'Apa itu buta warna?',
          p: [
            'Buta warna terjadi ketika sel kerucut di mata, yang peka terhadap warna, tidak bekerja seperti biasanya. Jenis yang paling umum adalah sulit membedakan merah dan hijau, dan kondisi ini lebih sering dialami laki-laki.',
            'Sebagian besar penderita masih bisa melihat warna, hanya saja beberapa warna tampak serupa. Buta warna total, yaitu hanya melihat hitam, putih, dan abu-abu, sangat jarang.'
          ]
        },
        {
          h: 'Rasakan sendiri',
          p: [
            'Perhatikan dua kotak berikut. Warna aslinya merah dan hijau, tetapi pada tampilan monokrom keduanya tampak hampir sama. Seperti inilah warna bisa kehilangan perbedaannya.',
            'Catatan: kebanyakan penderita buta warna tidak melihat dunia sepenuhnya abu-abu. Simulasi ini hanya gambaran kasar tentang hilangnya perbedaan warna.'
          ],
          demo: 'colors'
        },
        {
          h: 'Cara kita membantu',
          list: [
            'Jangan hanya mengandalkan warna. Tambahkan label teks, pola, atau ikon.',
            'Gunakan kontras terang dan gelap yang jelas pada desain, grafik, dan slide.',
            'Tanyakan apa yang membantu, jangan menebak-nebak.'
          ]
        }
      ]
    },

    /* ---------------- TUNANETRA ---------------- */
    'tunanetra-dasar': {
      theme: null,
      intro: 'Pelajari cara berinteraksi yang nyaman dan menghargai dengan teman tunanetra.',
      sections: [
        {
          h: 'Apa itu tunanetra?',
          p: [
            'Tunanetra adalah orang dengan hambatan penglihatan, mulai dari low vision (masih memiliki sisa penglihatan) sampai tidak dapat melihat sama sekali.',
            'Mereka tetap mandiri dengan bantuan tongkat putih, huruf Braille, dan pembaca layar (screen reader) pada komputer dan ponsel.'
          ]
        },
        {
          h: 'Cara berinteraksi dengan baik',
          list: [
            'Sapa lebih dulu dan sebutkan namamu, karena mereka mengenali orang lewat suara.',
            'Tanyakan "Boleh saya bantu?" dan tunggu jawabannya sebelum bertindak.',
            'Tawarkan lenganmu untuk dipegang. Jangan menarik atau mendorong mereka.',
            'Beri arah yang jelas, misalnya "kursi di sebelah kananmu, dua langkah", bukan "di sana".',
            'Beri tahu saat kamu pergi supaya mereka tidak berbicara sendirian.'
          ]
        },
        {
          h: 'Rasakan seperti pembaca layar',
          p: [
            'Tekan tombol "Bacakan" untuk mendengarkan halaman ini dibacakan berurutan, seperti cara pembaca layar bekerja. Tekan Esc atau tombol Berhenti untuk menghentikan suara.'
          ]
        }
      ]
    },

    /* ---------------- TUNARUNGU ---------------- */
    'tunarungu-dasar': {
      theme: null,
      intro: 'Kenali cara berkomunikasi yang nyaman dengan Teman Tuli.',
      sections: [
        {
          h: 'Tunarungu dan Tuli',
          p: [
            'Tunarungu adalah hambatan pendengaran dari ringan sampai berat. Banyak komunitas lebih memilih sebutan Tuli (Teman Tuli).',
            'Mereka berkomunikasi lewat bahasa isyarat (di Indonesia ada BISINDO), tulisan, gambar, dan sebagian membaca gerak bibir.'
          ]
        },
        {
          h: 'Tips berkomunikasi',
          list: [
            'Hadap langsung dan pastikan wajahmu terlihat jelas.',
            'Bicara jelas dengan kecepatan normal. Tidak perlu berteriak atau melebih-lebihkan gerak mulut.',
            'Gunakan tulisan, gambar, atau gestur bila perlu.',
            'Panggil dengan melambai atau menyentuh bahu dengan lembut.',
            'Jika ada juru bahasa isyarat, bicaralah langsung kepada lawan bicaramu, bukan kepada juru bahasa.'
          ]
        },
        {
          h: 'Belajar BISINDO',
          p: ['Buka modul lanjutan "Kamus BISINDO Lengkap" di Dashboard untuk mengenal abjad isyarat A sampai Z.']
        }
      ]
    },

    'tunarungu-lanjut': {
      theme: null,
      type: 'bisindo',
      intro: 'BISINDO (Bahasa Isyarat Indonesia) adalah bahasa isyarat yang tumbuh dari komunitas Tuli di Indonesia. Pelajari abjadnya satu per satu.'
    },

    /* ---------------- NONVERBAL ---------------- */
    'nonverbal-dasar': {
      theme: null,
      intro: 'Komunikasi tidak selalu memakai suara.',
      sections: [
        {
          h: 'Apa itu nonverbal?',
          p: ['Orang nonverbal tidak berbicara secara lisan atau sulit melakukannya. Mereka tetap berkomunikasi lewat gestur, ekspresi wajah, gambar, tulisan, atau alat bantu komunikasi (AAC).']
        },
        {
          h: 'Cara berinteraksi',
          list: [
            'Beri waktu untuk menjawab dan jangan terburu-buru menyela.',
            'Tawarkan pilihan, misalnya ya atau tidak, atau gambar.',
            'Hargai cara komunikasinya, apa pun bentuknya.',
            'Bicara langsung kepadanya, bukan kepada pendampingnya.'
          ]
        }
      ]
    },

    /* ---------------- DOWN SYNDROME ---------------- */
    'down-syndrome-dasar': {
      theme: null,
      intro: 'Setiap orang punya kemampuan dan cara belajar yang berbeda.',
      sections: [
        {
          h: 'Apa itu Down syndrome?',
          p: ['Down syndrome adalah kondisi genetik akibat kelebihan salinan kromosom 21. Kondisi ini memengaruhi perkembangan fisik dan belajar dengan tingkat yang berbeda pada tiap orang. Mereka bisa belajar, bekerja, berteman, dan punya minat sendiri.']
        },
        {
          h: 'Cara berteman',
          list: [
            'Gunakan kalimat sederhana dan jelas.',
            'Beri waktu untuk memahami dan sabar menjelaskan ulang.',
            'Perlakukan sesuai usianya, jangan seperti anak kecil.',
            'Puji usahanya dan ajak ikut kegiatan bersama.'
          ]
        }
      ]
    },

    /* ---------------- AUTISME (NEURODIVERGEN) ---------------- */
    'autisme-dasar': {
      theme: null,
      intro: 'Otak setiap orang bekerja dengan cara yang berbeda. Kenali dunia teman neurodivergen.',
      sections: [
        {
          h: 'Apa itu autisme?',
          p: [
            'Autisme (spektrum autisme) adalah perbedaan perkembangan saraf yang memengaruhi cara seseorang berkomunikasi, berinteraksi, dan memproses dunia di sekitarnya.',
            'Disebut spektrum karena tiap orang berbeda: ada yang membutuhkan banyak dukungan, ada yang hidup mandiri. Istilah "neurodivergen" dipakai untuk cara kerja otak yang berbeda dari kebanyakan orang (neurotipikal). Autisme bukan penyakit dan tidak disebabkan oleh pola asuh maupun vaksin.'
          ]
        },
        {
          h: 'Hal yang sering dialami',
          list: [
            'Sangat peka terhadap suara, cahaya, sentuhan, atau tekstur tertentu.',
            'Nyaman dengan rutinitas dan bisa cemas bila ada perubahan mendadak.',
            'Gerakan berulang (stimming) untuk menenangkan diri.',
            'Memahami bahasa secara harfiah, sehingga kiasan bisa membingungkan.',
            'Kontak mata bisa terasa tidak nyaman, tetapi mereka tetap menyimak.',
            'Memiliki minat yang sangat mendalam pada topik tertentu.'
          ]
        },
        {
          h: 'Cara kita mendukung',
          list: [
            'Kurangi rangsangan berlebihan dan sediakan tempat yang tenang.',
            'Gunakan bahasa jelas dan spesifik, hindari kiasan.',
            'Beri tahu perubahan jadwal lebih awal, dan pakai jadwal visual bila perlu.',
            'Terima stimming dan hargai minat mereka.',
            'Tanyakan dukungan apa yang dibutuhkan, jangan berasumsi.'
          ]
        }
      ]
    },

    /* ---------------- DISABILITAS FISIK (DAKSA) ---------------- */
    'daksa-dasar': {
      theme: null,
      intro: 'Disabilitas fisik bukan akhir dari kemandirian. Lingkungan yang aksesibel membuat semua orang bisa berpartisipasi.',
      sections: [
        {
          h: 'Apa itu disabilitas fisik (daksa)?',
          p: [
            'Disabilitas fisik atau daksa adalah hambatan pada fungsi gerak tubuh, misalnya karena kelumpuhan, amputasi, cerebral palsy, atau kondisi lain. Banyak penyandangnya memakai kursi roda, kruk, tongkat, atau anggota tubuh prostetik.',
            'Hambatan terbesar sering bukan dari tubuhnya, melainkan dari lingkungan yang tidak aksesibel, seperti tangga tanpa ramp, pintu sempit, atau toilet yang tidak ramah kursi roda.'
          ]
        },
        {
          h: 'Etika berinteraksi',
          list: [
            'Tanyakan dulu sebelum membantu, dan ikuti arahannya.',
            'Anggap kursi roda dan alat bantu sebagai bagian dari ruang pribadi. Jangan didorong, disandari, atau dipindahkan tanpa izin.',
            'Sejajarkan pandangan saat mengobrol lama, dan bicara langsung kepada orangnya.',
            'Gunakan istilah yang menghargai, seperti "pengguna kursi roda" atau "penyandang disabilitas".',
            'Sesuaikan kecepatan langkah dan pilih rute yang aksesibel.'
          ]
        },
        {
          h: 'Lingkungan yang ramah akses',
          list: [
            'Ramp dengan kemiringan landai, permukaan tidak licin, dan pegangan.',
            'Lift atau jalur alternatif untuk lantai atas.',
            'Pintu dan lorong cukup lebar (sekitar 90 cm atau lebih) dan bebas hambatan.',
            'Tempat parkir dan toilet khusus yang tidak dipakai untuk keperluan lain.'
          ]
        }
      ]
    }
  };

  /* ---------- Gabungkan bank soal & validasi jumlah soal ---------- */
  const bank = TB.QuizBank || {};
  Object.keys(bank).forEach(id => {
    if (!byId[id]) { console.warn('[content] Soal untuk modul yang tidak ada:', id); return; }
    byId[id].quiz = bank[id];
  });

  Object.keys(byId).forEach(id => {
    const quiz = byId[id].quiz;
    if (!quiz) return;
    if (quiz.length !== QUESTIONS_PER_MODULE) {
      console.warn(`[content] Modul "${id}" punya ${quiz.length} soal, seharusnya ${QUESTIONS_PER_MODULE}.`);
    }
    quiz.forEach((q, i) => {
      const bad = !q.q || !Array.isArray(q.options) || q.options.length < 2 || q.options.length > 4 ||
        !Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length || !q.explain;
      if (bad) console.warn(`[content] Soal ${i + 1} pada "${id}" tidak valid.`);
    });
  });

  TB.Content = { byId, QUESTIONS_PER_MODULE };
})();
