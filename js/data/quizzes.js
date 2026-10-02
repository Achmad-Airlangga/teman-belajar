/* ===== TEMAN BELAJAR — data/quizzes.js (bank soal latihan) =====

  Setiap topik/kelas WAJIB punya tepat 10 soal (divalidasi otomatis di content.js).
  Kunci = id modul yang memuat latihan tersebut.

  TEMPLATE untuk menambah topik baru:

  'id-modul-dasar': [
    {
      q: 'Situasi / studi kasus sehari-hari ... Apa yang sebaiknya dilakukan?',
      options: ['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D'], // 3-4 pilihan
      answer: 0,                                                       // indeks jawaban benar (mulai dari 0)
      explain: 'Penjelasan singkat mengapa jawaban itu benar.'
    },
    // ... total 10 soal
  ]
*/
(function () {
  'use strict';

  const bank = {

    /* ================= 1. BUTA WARNA ================= */
    'buta-warna-dasar': [
      {
        q: 'Rani membuat grafik kelompok dengan garis berwarna merah dan hijau. Temannya, Dimas, kesulitan membedakan merah dan hijau. Apa yang paling tepat dilakukan Rani?',
        options: [
          'Menambahkan label teks atau pola berbeda pada tiap garis',
          'Membuat warna garis lebih terang saja',
          'Meminta Dimas berusaha lebih keras melihatnya',
          'Mengganti semua garis dengan merah muda dan oranye'
        ],
        answer: 0,
        explain: 'Label dan pola membuat informasi tidak bergantung pada warna saja, sehingga semua orang bisa membacanya.'
      },
      {
        q: 'Budi kesulitan membedakan lampu merah dan hijau saat menyeberang. Petunjuk apa yang bisa membantunya?',
        options: [
          'Menebak berdasarkan suasana jalan',
          'Mengikuti orang lain tanpa melihat lampu',
          'Memperhatikan posisi lampu: merah di atas, hijau di bawah',
          'Menunggu sampai semua kendaraan berhenti total'
        ],
        answer: 2,
        explain: 'Posisi lampu lalu lintas selalu sama, sehingga bisa menjadi petunjuk selain warna.'
      },
      {
        q: 'Bu Sari meminta siswa mewarnai apel merah dan daun hijau. Kirana, yang buta warna merah-hijau, ragu memilih krayon. Bagaimana cara membantunya?',
        options: [
          'Menyuruh Kirana mengambil krayon sembarang',
          'Menuliskan nama warna pada tiap krayon atau menempelkan label',
          'Membebaskan Kirana dari semua tugas mewarnai',
          'Menegurnya karena dianggap tidak teliti'
        ],
        answer: 1,
        explain: 'Label nama warna membuat Kirana tetap bisa ikut mengerjakan tugas tanpa harus menebak.'
      },
      {
        q: 'Temanmu berkata, "Orang buta warna pasti hanya melihat hitam putih." Bagaimana tanggapan yang benar?',
        options: [
          'Benar, semua penderita hanya melihat abu-abu',
          'Benar, tetapi hanya pada anak-anak',
          'Salah, buta warna hanya terjadi pada orang tua',
          'Kurang tepat. Sebagian besar penderita masih melihat warna, tetapi sulit membedakan warna tertentu seperti merah dan hijau'
        ],
        answer: 3,
        explain: 'Buta warna total (hanya melihat abu-abu) sangat jarang. Kebanyakan penderita hanya sulit membedakan pasangan warna tertentu.'
      },
      {
        q: 'Kamu membuat aplikasi yang menandai "berhasil" dengan warna hijau dan "gagal" dengan warna merah. Agar pengguna buta warna tetap paham, apa yang perlu ditambahkan?',
        options: [
          'Warna yang lebih mengkilap',
          'Ukuran huruf yang lebih kecil',
          'Ikon dan teks, misalnya centang "Berhasil" dan silang "Gagal"',
          'Musik latar yang berbeda'
        ],
        answer: 2,
        explain: 'Jangan mengandalkan warna saja. Ikon dan teks menyampaikan makna yang sama kepada semua orang.'
      },
      {
        q: 'Tegar sulit menilai kematangan daging dari perubahan warna merah ke cokelat karena buta warna. Cara apa yang lebih andal?',
        options: [
          'Memakai termometer makanan dan mengikuti waktu memasak',
          'Mencicipi daging yang masih mentah',
          'Menebak dari bau saja',
          'Memasak sampai gosong agar aman'
        ],
        answer: 0,
        explain: 'Termometer dan timer memberi ukuran objektif sehingga tidak bergantung pada warna.'
      },
      {
        q: 'Lisa buta warna dan ingin tampil serasi di sebuah acara. Apa bantuan paling baik dari temannya?',
        options: [
          'Menertawakan pilihan bajunya',
          'Memilihkan semua pakaian tanpa bertanya',
          'Berkata "Pakai apa saja, tidak ada yang peduli"',
          'Menyebutkan warna pakaian dan membantu memberi label atau menata pakaian per kelompok warna'
        ],
        answer: 3,
        explain: 'Bantuan yang menghargai kemandirian: beri informasi warna dan sistem penataan, bukan mengambil alih pilihannya.'
      },
      {
        q: 'Dokter menunjukkan lingkaran dari titik-titik warna dengan angka tersembunyi untuk memeriksa penglihatan warna. Apa nama tes tersebut?',
        options: [
          'Tes Snellen',
          'Tes Ishihara',
          'Tes Braille',
          'Tes Audiometri'
        ],
        answer: 1,
        explain: 'Tes Ishihara adalah alat skrining umum untuk buta warna merah-hijau. Tes Snellen untuk ketajaman penglihatan.'
      },
      {
        q: 'Peta di kelas memakai legenda merah, oranye, dan hijau yang sulit dibedakan oleh siswa buta warna. Perbaikan terbaik?',
        options: [
          'Menambahkan arsiran atau pola berbeda dan label langsung pada tiap wilayah',
          'Memperbesar legenda saja',
          'Menambah lebih banyak warna lagi',
          'Mencetak dengan tinta lebih pekat'
        ],
        answer: 0,
        explain: 'Pola, arsiran, dan label langsung membuat peta terbaca tanpa harus membedakan warna.'
      },
      {
        q: 'Dika buta warna salah menyebut warna baju temannya dan beberapa anak tertawa. Sikap yang tepat?',
        options: [
          'Ikut tertawa agar suasana cair',
          'Mengabaikan dan membiarkan Dika malu',
          'Menegur dengan sopan agar tidak mengejek, lalu memberi tahu warna yang benar dengan ramah',
          'Meminta Dika tidak ikut bermain lagi'
        ],
        answer: 2,
        explain: 'Buta warna bukan kesalahan. Bantu dengan ramah dan hentikan ejekan agar Dika merasa aman.'
      }
    ],

    /* ================= 2. TUNANETRA ================= */
    'tunanetra-dasar': [
      {
        q: 'Kamu melihat seorang tunanetra dengan tongkat putih berdiri ragu di tepi trotoar. Apa langkah pertama yang paling tepat?',
        options: [
          'Langsung memegang tangannya dan menyeberangkannya',
          'Diam saja karena takut salah',
          'Menyapa, menyebut namamu, lalu menawarkan bantuan',
          'Berteriak "Awas!" agar ia berhati-hati'
        ],
        answer: 2,
        explain: 'Menyapa dan bertanya lebih dulu menghargai keputusannya, dan ia tahu siapa yang mendekat.'
      },
      {
        q: 'Kamu menjelaskan letak kursi kepada temanmu yang tunanetra. Kalimat mana yang paling membantu?',
        options: [
          'Kursinya di sebelah kananmu, sekitar dua langkah.',
          'Kursinya di sana.',
          'Itu, lihat saja sendiri.',
          'Pokoknya cari sendiri ya.'
        ],
        answer: 0,
        explain: 'Arah dan jarak yang spesifik bisa dipahami tanpa melihat. Kata seperti "di sana" tidak memberi informasi.'
      },
      {
        q: 'Temanmu yang tunanetra menerima bantuan berjalan melewati keramaian. Bagaimana cara menuntun yang tepat?',
        options: [
          'Mendorong bahunya dari belakang',
          'Menarik tangannya dengan cepat',
          'Berjalan jauh di depan sambil memberi aba-aba',
          'Menawarkan lenganmu untuk dipegang, berjalan setengah langkah di depan, dan memberi tahu saat ada tangga atau belokan'
        ],
        answer: 3,
        explain: 'Dengan memegang lenganmu, ia bisa merasakan gerak tubuhmu dan tetap mengendalikan langkahnya sendiri.'
      },
      {
        q: 'Seorang tunanetra masuk kafe bersama anjing pemandu berompi. Kamu gemas ingin mengelusnya. Apa yang sebaiknya dilakukan?',
        options: [
          'Memberi makanan agar anjing mendekat',
          'Tidak mengganggu karena anjing sedang bekerja; bila ingin berinteraksi, minta izin pemiliknya dulu',
          'Memanggil nama anjing dengan keras',
          'Mengelusnya diam-diam dari belakang'
        ],
        answer: 1,
        explain: 'Anjing pemandu harus fokus menjaga pemiliknya. Mengganggunya bisa membahayakan.'
      },
      {
        q: 'Di restoran, pelayan bertanya kepadamu, "Dia mau pesan apa?" padahal temanmu yang tunanetra duduk di sebelahmu. Tindakan terbaik?',
        options: [
          'Memesankan makanan berdasarkan tebakanmu',
          'Menjawab sambil bercanda tentang temanmu',
          'Meminta pelayan bertanya langsung kepada temanmu, dan membantu membacakan menu bila ia minta',
          'Meminta pelayan mengabaikan temanmu'
        ],
        answer: 2,
        explain: 'Ia lawan bicara yang berhak memilih sendiri. Kamu hanya membantu sesuai permintaannya.'
      },
      {
        q: 'Temanmu yang tunanetra sering berkunjung ke rumahmu. Kamu baru memindahkan sofa dan meja. Apa yang sebaiknya dilakukan?',
        options: [
          'Memberi tahu perubahan tata letak dan memastikan jalur bebas dari benda yang bisa menghalangi',
          'Tidak memberi tahu agar ia belajar menyesuaikan diri',
          'Meletakkan barang kecil di lantai sebagai penanda',
          'Membiarkan semua pintu setengah terbuka'
        ],
        answer: 0,
        explain: 'Tata letak yang berubah tanpa pemberitahuan berbahaya. Pintu sebaiknya terbuka penuh atau tertutup, bukan setengah terbuka.'
      },
      {
        q: 'Di perpustakaan ada buku dengan deretan titik timbul. Bagaimana tunanetra membacanya?',
        options: [
          'Dengan mendengarkan bunyi titik saat digesek',
          'Dengan meraba titik-titik tersebut memakai ujung jari (huruf Braille)',
          'Dengan menekan titik sampai berbunyi',
          'Dengan mencium aroma tinta'
        ],
        answer: 1,
        explain: 'Braille adalah sistem tulisan titik timbul yang dibaca lewat perabaan.'
      },
      {
        q: 'Rina membuat materi digital berisi banyak gambar. Agar pembaca layar bisa menjelaskan gambar itu kepada tunanetra, apa yang perlu ditambahkan?',
        options: [
          'Menghapus semua gambar',
          'Memperbesar ukuran gambar',
          'Menambahkan efek animasi',
          'Menambahkan teks alternatif (alt text) yang menggambarkan isi gambar'
        ],
        answer: 3,
        explain: 'Pembaca layar membacakan alt text sehingga makna gambar tetap tersampaikan.'
      },
      {
        q: 'Kamu mengobrol dengan teman tunanetra di tempat ramai dan harus pergi sebentar. Apa yang kamu lakukan?',
        options: [
          'Berpamitan, menyebut bahwa kamu pergi, dan kapan akan kembali bila bisa',
          'Pergi diam-diam agar tidak mengganggu',
          'Meminta orang lain menggantikanmu tanpa memberi tahu',
          'Menunggu sampai ia menyadari sendiri'
        ],
        answer: 0,
        explain: 'Ia tidak bisa melihatmu pergi. Berpamitan mencegah ia berbicara sendirian dan merasa canggung.'
      },
      {
        q: 'Seorang kenalan berbicara kepada tunanetra dengan suara sangat keras seolah ia kurang mendengar. Apa tanggapan yang tepat?',
        options: [
          'Itu wajar karena tunanetra pasti sulit mendengar',
          'Ikut berbicara keras agar kompak',
          'Tidak perlu: hambatan penglihatan tidak berarti pendengaran bermasalah, jadi bicara dengan volume normal',
          'Berbicara sangat pelan agar ia fokus'
        ],
        answer: 2,
        explain: 'Tunanetra umumnya mendengar seperti orang lain. Bicaralah dengan wajar.'
      }
    ],

    /* ================= 3. TUNARUNGU ================= */
    'tunarungu-dasar': [
      {
        q: 'Temanmu seorang Tuli yang membaca gerak bibir. Bagaimana cara berbicara yang paling baik?',
        options: [
          'Berteriak agar lebih terdengar',
          'Menghadap langsung dan bicara jelas dengan kecepatan normal',
          'Membelakangi sambil bicara cepat',
          'Berbicara sambil menutupi mulut'
        ],
        answer: 1,
        explain: 'Gerak bibir hanya bisa dibaca jika wajahmu terlihat. Berteriak tidak membantu dan mengubah bentuk gerak bibir.'
      },
      {
        q: 'Dalam rapat ada juru bahasa isyarat yang menerjemahkan untuk rekan Tuli. Kepada siapa kamu berbicara?',
        options: [
          'Kepada juru bahasa saja',
          'Sambil membelakangi rekan Tuli',
          'Tidak perlu berbicara',
          'Langsung kepada rekan Tuli sebagai lawan bicara'
        ],
        answer: 3,
        explain: 'Juru bahasa hanya penghubung. Lawan bicaramu tetap rekan Tuli tersebut.'
      },
      {
        q: 'Kamu ingin menarik perhatian temanmu yang Tuli. Cara paling tepat?',
        options: [
          'Melambaikan tangan, atau menyentuh bahunya dengan lembut bila berdekatan',
          'Melempar benda ke arahnya',
          'Berteriak memanggil namanya berulang-ulang',
          'Menepuk punggungnya keras-keras'
        ],
        answer: 0,
        explain: 'Isyarat visual atau sentuhan ringan adalah cara wajar menarik perhatian Teman Tuli.'
      },
      {
        q: 'Alarm kebakaran berbunyi di kantor. Bagaimana memastikan rekanmu yang Tuli tahu ada bahaya?',
        options: [
          'Percaya ia pasti mendengar bunyi alarm',
          'Menunggu ia melihat orang lain berlari',
          'Memberi tahu langsung lewat isyarat atau pesan tertulis, lalu mengajaknya keluar bersama',
          'Menyuruhnya bertanya kepada satpam'
        ],
        answer: 2,
        explain: 'Bunyi alarm tidak sampai kepadanya. Informasi visual dan ajakan langsung bisa menyelamatkan.'
      },
      {
        q: 'Kamu belum bisa bahasa isyarat dan ingin bertanya sesuatu kepada Teman Tuli. Apa yang bisa dilakukan?',
        options: [
          'Menyerah dan pergi',
          'Berbicara semakin keras dan cepat',
          'Menirukan gerakan acak agar terlihat bisa isyarat',
          'Menulis di ponsel atau kertas dengan kalimat singkat dan jelas, atau memakai gestur sederhana'
        ],
        answer: 3,
        explain: 'Tulisan dan gestur adalah jembatan komunikasi yang efektif.'
      },
      {
        q: 'Seseorang menyebut temannya "tuli bisu". Mengapa istilah ini kurang tepat?',
        options: [
          'Karena semua Tuli masih bisa mendengar sedikit',
          'Karena banyak Tuli sebenarnya bisa bersuara, tetapi memilih berkomunikasi dengan isyarat; sebutan yang lebih diterima adalah "Tuli" atau "Teman Tuli"',
          'Karena kata "tuli" tidak boleh diucapkan sama sekali',
          'Karena semua Tuli berbicara dengan fasih'
        ],
        answer: 1,
        explain: 'Istilah "bisu" menyiratkan ketidakmampuan. Komunitas Tuli umumnya lebih memilih sebutan "Tuli".'
      },
      {
        q: 'Kamu membuat video edukasi untuk sekolah, dan ada siswa Tuli di kelas. Apa yang perlu disediakan?',
        options: [
          'Teks (subtitle) yang akurat dan, bila memungkinkan, juru bahasa isyarat',
          'Musik latar yang lebih keras',
          'Narasi yang lebih cepat',
          'Hanya gambar tanpa penjelasan'
        ],
        answer: 0,
        explain: 'Subtitle membuat isi video bisa diakses oleh Teman Tuli.'
      },
      {
        q: 'Temanmu Tuli dari Indonesia bertemu turis Tuli dari Amerika. Apakah isyarat mereka pasti sama?',
        options: [
          'Ya, bahasa isyarat itu universal',
          'Ya, asalkan mereka seumuran',
          'Tidak, tiap negara punya bahasa isyarat sendiri, misalnya BISINDO di Indonesia dan ASL di Amerika',
          'Tidak, karena bahasa isyarat hanya ada di Indonesia'
        ],
        answer: 2,
        explain: 'Bahasa isyarat adalah bahasa alami yang berbeda-beda di tiap komunitas dan negara.'
      },
      {
        q: 'Kamu ingin mengobrol dengan temanmu yang Tuli di kafe yang remang-remang. Apa yang sebaiknya dilakukan?',
        options: [
          'Tetap mengobrol; gelap tidak berpengaruh',
          'Pindah ke tempat yang cukup terang agar wajah dan isyarat terlihat jelas',
          'Mengobrol sambil memunggungi',
          'Berbisik lebih pelan'
        ],
        answer: 1,
        explain: 'Komunikasi Tuli bersifat visual. Cahaya yang cukup sangat penting.'
      },
      {
        q: 'Temanmu memakai alat bantu dengar. Apakah kamu boleh berbicara sembarangan karena ia pasti mendengar normal?',
        options: [
          'Ya, alat itu mengembalikan pendengaran seperti normal',
          'Ya, asalkan berbicara sangat cepat',
          'Ya, tidak perlu memperhatikan apa pun',
          'Tidak. Alat bantu membantu tetapi tidak membuat pendengaran normal; tetap bicara jelas, menghadap langsung, dan kurangi kebisingan'
        ],
        answer: 3,
        explain: 'Alat bantu dengar memperkuat suara, tetapi tidak menjernihkan seluruh percakapan, terutama di tempat bising.'
      }
    ],

    /* ================= 4. NONVERBAL ================= */
    'nonverbal-dasar': [
      {
        q: 'Temanmu yang nonverbal sedang menunjuk gambar di papan komunikasi untuk menjawabmu. Apa yang kamu lakukan?',
        options: [
          'Menjawab menggantikannya',
          'Sabar menunggu dan membaca jawaban yang ia tunjuk',
          'Pergi karena terlalu lama',
          'Menarik papannya agar cepat selesai'
        ],
        answer: 1,
        explain: 'Papan komunikasi adalah suaranya. Memberi waktu menunjukkan bahwa kamu menghargainya.'
      },
      {
        q: 'Kamu ingin bertanya kepada teman nonverbal yang datang bersama pendamping. Kepada siapa kamu bertanya?',
        options: [
          'Langsung kepada temanmu',
          'Kepada pendampingnya saja',
          'Tidak jadi bertanya',
          'Kepada orang lain di sekitar'
        ],
        answer: 0,
        explain: 'Ia lawan bicaramu. Pendamping boleh membantu bila ia meminta.'
      },
      {
        q: 'Kamu bertanya, "Mau ikut main?" dan temanmu yang nonverbal menggeleng sambil tersenyum kecil. Apa tindakanmu?',
        options: [
          'Menganggap gelengan itu tidak bermakna dan mengulang pertanyaan',
          'Menganggap ia setuju karena tersenyum',
          'Memahami gelengan sebagai jawaban "tidak", menghormatinya, lalu menawarkan pilihan lain seperti menonton',
          'Memaksa ikut agar tidak sendirian'
        ],
        answer: 2,
        explain: 'Gestur adalah bentuk komunikasi yang sah. Hormati jawabannya dan tawarkan alternatif.'
      },
      {
        q: 'Temanmu menyusun kalimat lewat aplikasi AAC dan butuh waktu lama. Kamu sudah menebak kalimat berikutnya. Apa yang sebaiknya dilakukan?',
        options: [
          'Menyelesaikan kalimatnya dengan cepat',
          'Memotong dan mengganti topik',
          'Mengambil perangkatnya agar lebih cepat',
          'Menunggu sampai ia selesai; menawarkan bantuan menebak hanya jika ia menginginkannya'
        ],
        answer: 3,
        explain: 'Menyela bisa membuat ia kehilangan maksudnya. Beri waktu dan kendali penuh kepadanya.'
      },
      {
        q: 'Dalam kerja kelompok ada siswa nonverbal. Cara melibatkannya yang paling adil?',
        options: [
          'Memberinya tugas yang sama sekali tidak butuh komunikasi',
          'Memberi ruang menyampaikan ide lewat tulisan, kartu gambar, atau perangkat AAC, dengan waktu yang cukup',
          'Memutuskan semua hal untuknya',
          'Mengeluarkannya dari kelompok'
        ],
        answer: 1,
        explain: 'Ide siswa nonverbal sama berharganya. Sediakan jalur komunikasi yang cocok untuknya.'
      },
      {
        q: 'Adikmu bertanya, "Kak Dino tidak bicara, berarti tidak mengerti ya?" Jawaban yang tepat?',
        options: [
          'Benar, ia tidak mengerti apa-apa',
          'Benar, jadi bicara dengan kata sangat sederhana seperti kepada anak kecil',
          'Tidak. Dino bisa memahami; ia berkomunikasi dengan cara lain, jadi kita berbicara wajar dan menghargainya',
          'Tidak tahu, jangan ditanyakan'
        ],
        answer: 2,
        explain: 'Tidak berbicara bukan berarti tidak memahami. Banyak orang nonverbal memahami pembicaraan dengan baik.'
      },
      {
        q: 'Temanmu yang nonverbal menunjuk ke arah botol minum di rak. Apa yang kamu lakukan?',
        options: [
          'Mengonfirmasi, "Kamu mau minum yang ini?" lalu memberi pilihan bila ada lebih dari satu',
          'Mengabaikan karena tidak jelas',
          'Memberinya benda lain yang kamu tebak',
          'Menyuruhnya mengambil sendiri tanpa bertanya'
        ],
        answer: 0,
        explain: 'Konfirmasi dan pilihan membantu memastikan kamu benar-benar memahami keinginannya.'
      },
      {
        q: 'Dino membawa tablet berisi gambar dan tombol suara untuk berkomunikasi. Alat apa itu dan bagaimana sikapmu?',
        options: [
          'Itu mainan; boleh dipinjam kapan saja',
          'Itu hanya hiasan kelas',
          'Itu alat ujian khusus guru',
          'Itu alat AAC yang menjadi "suara" Dino; jangan disentuh atau dipindahkan tanpa izinnya'
        ],
        answer: 3,
        explain: 'AAC (komunikasi tambahan dan alternatif) adalah sarana komunikasi utama bagi sebagian orang nonverbal.'
      },
      {
        q: 'Dalam rapat tim, rekan nonverbal ingin menyampaikan ide tetapi diskusi berjalan cepat. Apa yang bisa kamu lakukan?',
        options: [
          'Melanjutkan diskusi tanpa jeda',
          'Menyuruhnya mengirim ide besok setelah rapat selesai',
          'Membagikan agenda lebih awal, memberi jeda, dan membuka jalur lewat chat atau tulisan agar ia ikut berkontribusi',
          'Menyimpulkan idenya sendiri untuknya'
        ],
        answer: 2,
        explain: 'Menyediakan jalur berpartisipasi yang setara membuat kontribusinya benar-benar terdengar.'
      },
      {
        q: 'Temanmu yang nonverbal tampak frustrasi karena tidak dipahami. Apa respons terbaik?',
        options: [
          'Tetap tenang, tanyakan dengan pilihan atau minta ia menunjukkan/menulis, dan sampaikan bahwa kamu ingin memahaminya',
          'Berkata "Sudahlah, tidak penting"',
          'Mengabaikannya sampai tenang sendiri',
          'Meminta orang lain menggantikanmu tanpa menjelaskan'
        ],
        answer: 0,
        explain: 'Kesabaran dan cara komunikasi alternatif mengurangi frustrasi dan membangun rasa percaya.'
      }
    ],

    /* ================= 5. DOWN SYNDROME ================= */
    'down-syndrome-dasar': [
      {
        q: 'Teman barumu yang Down syndrome butuh waktu lebih lama memahami aturan permainan. Apa yang kamu lakukan?',
        options: [
          'Mengeluarkannya dari permainan',
          'Mengerjakan semuanya untuknya',
          'Menjelaskan langkah demi langkah dengan bahasa sederhana dan sabar',
          'Mengulang aturan dengan sangat cepat'
        ],
        answer: 2,
        explain: 'Penjelasan bertahap membantunya ikut serta dengan percaya diri.'
      },
      {
        q: 'Kamu mengobrol dengan remaja Down syndrome. Cara yang paling tepat?',
        options: [
          'Berbicara seperti kepada balita',
          'Berbicara wajar sesuai usianya dengan kalimat jelas',
          'Mengabaikannya',
          'Hanya berbicara lewat orang tuanya'
        ],
        answer: 1,
        explain: 'Menghormati usianya membuat ia merasa dihargai sebagai teman.'
      },
      {
        q: 'Seorang tetangga takut anaknya tertular saat bermain dengan Raka yang Down syndrome. Apa penjelasan yang benar?',
        options: [
          'Down syndrome menular lewat sentuhan',
          'Down syndrome menular lewat udara',
          'Down syndrome menular lewat makanan bersama',
          'Down syndrome bukan penyakit menular; ini kondisi genetik akibat kelebihan salinan kromosom 21'
        ],
        answer: 3,
        explain: 'Down syndrome sudah ada sejak lahir dan tidak bisa ditularkan.'
      },
      {
        q: 'Sebuah kafe ragu mempekerjakan Maya yang Down syndrome. Pendekatan yang paling tepat?',
        options: [
          'Memberi pelatihan bertahap dan tugas yang sesuai minat serta kemampuannya, dengan pendampingan awal',
          'Menolak karena pasti tidak mampu',
          'Menggaji jauh lebih rendah tanpa alasan',
          'Memberi tugas tanpa penjelasan'
        ],
        answer: 0,
        explain: 'Dengan dukungan yang tepat, banyak orang dengan Down syndrome dapat bekerja dan berkontribusi.'
      },
      {
        q: 'Kamu mendengar kata "mongol" dipakai untuk memanggil orang Down syndrome. Apa yang sebaiknya kamu lakukan?',
        options: [
          'Ikut memakainya agar akrab',
          'Menganggapnya biasa saja',
          'Menjelaskan bahwa itu ejekan yang tidak pantas, lalu memakai "orang dengan Down syndrome" atau memanggil namanya',
          'Memakai julukan yang lebih lucu'
        ],
        answer: 2,
        explain: 'Bahasa yang merendahkan menyakiti. Panggil namanya atau gunakan istilah yang menghargai.'
      },
      {
        q: 'Temanmu yang Down syndrome ingin memilih sendiri film yang akan ditonton bersama. Kamu...',
        options: [
          'Memilihkan film tanpa bertanya',
          'Memberi kesempatan memilih, bila perlu dengan 2–3 pilihan agar mudah',
          'Mengatakan pilihannya pasti tidak seru',
          'Menyuruh orang tuanya memilihkan'
        ],
        answer: 1,
        explain: 'Memberi pilihan melatih kemandirian dan menunjukkan bahwa pendapatnya penting.'
      },
      {
        q: 'Guru memberi tugas dengan instruksi panjang dan siswa Down syndrome kebingungan. Apa yang membantu?',
        options: [
          'Memecah instruksi menjadi langkah pendek dan memakai gambar atau contoh',
          'Mengulang instruksi lebih cepat',
          'Memberi tugas yang sama tanpa dukungan',
          'Meminta ia mengerjakan sendiri tanpa bertanya'
        ],
        answer: 0,
        explain: 'Langkah pendek dan bantuan visual memudahkan pemahaman dan mengingat urutan.'
      },
      {
        q: 'Rina yang Down syndrome berhasil mengikat tali sepatu setelah berkali-kali mencoba. Respons terbaikmu?',
        options: [
          'Berkata "Gitu aja lama banget"',
          'Diam saja',
          'Langsung memberi tugas yang jauh lebih sulit',
          'Memuji usaha dan kemajuannya dengan tulus, misalnya "Kamu hebat, tidak menyerah!"'
        ],
        answer: 3,
        explain: 'Pujian atas usaha membangun kepercayaan diri dan semangat belajar.'
      },
      {
        q: 'Cara bicara temanmu yang Down syndrome kadang kurang jelas. Apa yang kamu lakukan?',
        options: [
          'Pura-pura paham lalu pergi',
          'Memintanya diam',
          'Mendengarkan dengan sabar, meminta ia mengulang atau menunjukkan, dan mengonfirmasi artinya',
          'Menebak lalu menyela'
        ],
        answer: 2,
        explain: 'Mendengarkan dengan sabar dan mengonfirmasi menunjukkan bahwa kamu menghargai ucapannya.'
      },
      {
        q: 'Temanmu yang Down syndrome suka memelukmu setiap bertemu, tetapi kamu kurang nyaman. Apa yang tepat?',
        options: [
          'Memarahinya di depan umum',
          'Menyampaikan dengan ramah batasan yang nyaman bagimu dan menawarkan alternatif seperti tos atau salam tangan',
          'Menjauhinya tanpa penjelasan',
          'Membiarkannya terus meski tidak nyaman'
        ],
        answer: 1,
        explain: 'Batasan bisa disampaikan dengan lembut. Alternatif salam menjaga hubungan tetap hangat.'
      }
    ],

    /* ================= 6. AUTISME (NEURODIVERGEN) ================= */
    'autisme-dasar': [
      {
        q: 'Kantin sedang ramai dan bising. Temanmu yang autis menutup telinga dan tampak gelisah. Apa yang sebaiknya kamu lakukan?',
        options: [
          'Menawarkan pindah ke tempat yang lebih tenang atau memakai penutup telinga/earphone peredam',
          'Menyuruhnya menahan diri karena semua orang juga bising',
          'Menarik tangannya dari telinga',
          'Menertawakan reaksinya'
        ],
        answer: 0,
        explain: 'Banyak orang autis sangat sensitif terhadap suara. Mengurangi rangsangan membantunya merasa aman.'
      },
      {
        q: 'Temanmu menggoyangkan tangan berulang-ulang saat bersemangat atau cemas (stimming). Sikap yang tepat?',
        options: [
          'Menegurnya agar berhenti',
          'Menirukannya sambil tertawa',
          'Memberitahunya bahwa itu memalukan',
          'Membiarkannya; stimming membantu menenangkan diri selama tidak membahayakan'
        ],
        answer: 3,
        explain: 'Stimming adalah cara mengatur emosi dan sensasi. Melarangnya justru bisa menambah tekanan.'
      },
      {
        q: 'Saat berbicara, Dani jarang menatap mata. Seorang teman menganggapnya tidak sopan. Bagaimana tanggapan yang benar?',
        options: [
          'Benar, itu tanda tidak peduli',
          'Belum tentu; bagi sebagian orang autis kontak mata tidak nyaman, dan mereka tetap bisa menyimak',
          'Itu tanda ia berbohong',
          'Ia harus dipaksa menatap mata'
        ],
        answer: 1,
        explain: 'Menghindari kontak mata bukan tanda tidak sopan. Ia tetap bisa mendengarkan dengan baik.'
      },
      {
        q: 'Kamu berkata "Sebentar lagi ya" dan Sinta, yang memahami bahasa secara harfiah, bingung berapa lama. Apa yang lebih membantu?',
        options: [
          'Mengatakan "Nanti juga tahu"',
          'Mengulang "sebentar lagi" dengan lebih keras',
          'Memberi waktu yang jelas, misalnya "Sekitar 5 menit lagi"',
          'Menghindari pertanyaannya'
        ],
        answer: 2,
        explain: 'Bahasa yang jelas dan spesifik mengurangi kebingungan dan kecemasan.'
      },
      {
        q: 'Jadwal belajar mendadak berubah dan Raka panik. Apa yang dapat mencegahnya?',
        options: [
          'Memberi tahu perubahan lebih awal, menjelaskannya, dan memakai jadwal visual',
          'Merahasiakan perubahan sampai hari-H',
          'Menyuruhnya cepat beradaptasi',
          'Mengubah jadwal lebih sering agar terbiasa'
        ],
        answer: 0,
        explain: 'Banyak orang autis nyaman dengan rutinitas. Pemberitahuan dini dan jadwal visual membantu mereka bersiap.'
      },
      {
        q: 'Tetangga berkata, "Anaknya autis karena ibunya salah mengasuh atau karena vaksin." Tanggapanmu?',
        options: [
          'Setuju, itu penyebab utamanya',
          'Setuju jika ibunya sering sibuk',
          'Setuju asalkan anaknya laki-laki',
          'Meluruskan dengan sopan: autisme bukan disebabkan pola asuh maupun vaksin, melainkan perbedaan perkembangan saraf'
        ],
        answer: 3,
        explain: 'Autisme tidak disebabkan pola asuh atau vaksin. Mitos ini membuat keluarga disalahkan secara tidak adil.'
      },
      {
        q: 'Di tengah keramaian, Bima menangis keras dan tampak kewalahan (meltdown). Apa yang sebaiknya dilakukan?',
        options: [
          'Memarahinya agar berhenti',
          'Tetap tenang, kurangi rangsangan, beri ruang dan waktu, lalu bantu bila ia siap',
          'Merekam videonya',
          'Menarik paksa ke luar tanpa berbicara'
        ],
        answer: 1,
        explain: 'Meltdown adalah reaksi atas beban sensorik atau emosi, bukan tantrum untuk mencari perhatian.'
      },
      {
        q: 'Teman autismu bercerita panjang tentang kereta api, minat utamanya. Kamu...',
        options: [
          'Memotongnya karena membosankan',
          'Pura-pura mendengarkan sambil memainkan ponsel',
          'Menyimak, menghargai minatnya, lalu mengarahkan percakapan dengan lembut bila perlu',
          'Melarangnya membahas kereta lagi'
        ],
        answer: 2,
        explain: 'Minat mendalam adalah kekuatan dan sumber kebahagiaan. Menghargainya mempererat pertemanan.'
      },
      {
        q: 'Temanmu berkata, "Semoga cepat sembuh dari autisnya ya." Apa yang lebih tepat disampaikan?',
        options: [
          'Autisme bukan penyakit yang perlu disembuhkan; lebih baik tanyakan dukungan apa yang ia butuhkan',
          'Setuju, autisme hilang dengan obat',
          'Autisme hanya ada pada anak kecil',
          'Autisme sebenarnya tidak ada'
        ],
        answer: 0,
        explain: 'Autisme adalah kondisi seumur hidup, bukan penyakit. Dukungan dan penerimaan lebih bermanfaat.'
      },
      {
        q: 'Kamu memberi tugas kepada rekan yang autis. Cara menyampaikan yang paling efektif?',
        options: [
          'Memberi banyak instruksi lisan sekaligus dengan bahasa kiasan',
          'Memberi langkah jelas satu per satu, secara tertulis atau visual, dengan bahasa langsung',
          'Menyuruhnya menebak sendiri maksudnya',
          'Memberi tenggat tanpa rincian'
        ],
        answer: 1,
        explain: 'Instruksi yang jelas, bertahap, dan visual membantu rekan neurodivergen bekerja dengan percaya diri.'
      }
    ],

    /* ================= 7. DISABILITAS FISIK (DAKSA) ================= */
    'daksa-dasar': [
      {
        q: 'Seorang pengguna kursi roda tampak kesulitan menaiki trotoar yang tinggi. Apa langkah pertamamu?',
        options: [
          'Langsung mendorong kursi rodanya',
          'Memandangi dari jauh',
          'Bertanya, "Apakah Anda butuh bantuan?" lalu menunggu jawabannya',
          'Memotretnya'
        ],
        answer: 2,
        explain: 'Bertanya dulu menghargai kemandiriannya. Bantuan baru diberikan bila ia menginginkannya.'
      },
      {
        q: 'Temanmu duduk di kursi roda di tengah keramaian dan kamu ingin cepat. Kamu ingin mendorongnya. Apa yang tepat?',
        options: [
          'Bertanya dulu dan mengikuti arahannya, karena kursi roda adalah bagian dari ruang pribadinya',
          'Langsung mendorong agar lebih cepat',
          'Bersandar di kursinya sambil mengobrol',
          'Memindahkan kursi rodanya tanpa memberi tahu'
        ],
        answer: 0,
        explain: 'Kursi roda adalah perpanjangan tubuh penggunanya. Sentuh atau dorong hanya dengan izin.'
      },
      {
        q: 'Kamu akan mengobrol cukup lama dengan pengguna kursi roda. Posisi yang paling nyaman?',
        options: [
          'Berdiri menjulang di dekatnya',
          'Berdiri jauh di belakangnya',
          'Berbicara sambil berjalan menjauh',
          'Duduk atau mundur sedikit agar pandangan mata sejajar dan ia tidak terus mendongak'
        ],
        answer: 3,
        explain: 'Pandangan sejajar membuat percakapan lebih nyaman dan setara.'
      },
      {
        q: 'Tempat parkir khusus disabilitas sedang kosong dan kamu terburu-buru. Apa yang tepat?',
        options: [
          'Parkir sebentar saja, tidak masalah',
          'Tidak parkir di sana, karena tempat itu diperuntukkan bagi yang membutuhkan akses lebih dekat dan lebih luas',
          'Parkir di sana jika hujan',
          'Meminta orang lain menjaga mobilmu'
        ],
        answer: 1,
        explain: 'Slot khusus lebih lebar agar kursi roda bisa turun dan naik dengan aman. Jika terisi, penyandang disabilitas tidak punya pilihan lain.'
      },
      {
        q: 'Panitia akan mengadakan lomba di ruang lantai 2 tanpa lift, padahal ada peserta pengguna kursi roda. Solusi terbaik?',
        options: [
          'Meminta peserta itu tidak ikut',
          'Menggotong kursi roda berikut penumpangnya tanpa izin',
          'Memindahkan acara ke ruang lantai 1 atau tempat yang punya ramp atau lift',
          'Menyuruhnya menonton dari luar'
        ],
        answer: 2,
        explain: 'Lingkungan yang menyesuaikan diri adalah inti aksesibilitas, bukan peserta yang harus menyesuaikan diri.'
      },
      {
        q: 'Kamu meletakkan kardus di lorong sekolah. Bagaimana dampaknya bagi pengguna kursi roda atau kruk?',
        options: [
          'Bisa menghalangi jalur; sebaiknya jaga lorong tetap lapang (lebar jalur dan pintu sekitar 90 cm atau lebih)',
          'Tidak berdampak apa pun',
          'Justru membantu sebagai pegangan',
          'Hanya menjadi masalah bagi anak kecil'
        ],
        answer: 0,
        explain: 'Jalur yang sempit atau terhalang bisa membuat pengguna kursi roda terjebak.'
      },
      {
        q: 'Istilah mana yang lebih menghargai?',
        options: [
          '"Dia orang cacat yang terikat pada kursi roda."',
          '"Dia korban kursi roda."',
          '"Dia penderita lumpuh yang kasihan."',
          '"Dia pengguna kursi roda" atau "penyandang disabilitas fisik."'
        ],
        answer: 3,
        explain: 'Kursi roda memberi kebebasan bergerak, bukan membelenggu. Gunakan bahasa yang netral dan hormat.'
      },
      {
        q: 'Kamu melihat temanmu memakai kaki palsu (prostetik) dan penasaran. Sikap yang sopan?',
        options: [
          'Menyentuhnya tanpa izin',
          'Menghormati privasinya; bila ingin bertanya, lakukan dengan sopan dan terima jika ia tidak ingin menjawab',
          'Menatapnya terus-menerus',
          'Memotretnya diam-diam'
        ],
        answer: 1,
        explain: 'Rasa penasaran boleh, tetapi privasi dan kenyamanan orang lain lebih penting.'
      },
      {
        q: 'Kamu berjalan bersama temanmu yang memakai kruk menuju kelas. Apa yang tepat?',
        options: [
          'Berjalan cepat agar tidak terlambat dan meninggalkannya',
          'Menyuruhnya berlari',
          'Menyesuaikan kecepatan langkah dan memilih rute yang aksesibel',
          'Berjalan jauh di depan sambil memanggil-manggil'
        ],
        answer: 2,
        explain: 'Menyesuaikan langkah dan rute menunjukkan kepedulian tanpa membuatnya merasa menjadi beban.'
      },
      {
        q: 'Panitia membuat ramp dari papan dengan kemiringan sangat curam dan permukaan licin. Apa perbaikannya?',
        options: [
          'Membuat ramp lebih landai, permukaan tidak licin, dan memasang pegangan di sisinya',
          'Menambah anak tangga di sampingnya',
          'Menggantinya dengan tangga sempit',
          'Membiarkannya karena yang penting ada ramp'
        ],
        answer: 0,
        explain: 'Ramp yang curam dan licin justru berbahaya. Kemiringan landai dan pegangan membuatnya benar-benar aksesibel.'
      }
    ]
  };

  TB.QuizBank = bank;
})();
