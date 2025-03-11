import { ServiceItem, ServiceFeature, WorkStep, FAQ, ThemeConfig, Testimonial } from '@/types';

export const siteConfig = {
    name: 'suruhsuruh.id',
    description: 'Platform jasa pengerjaan tugas akademik dan perbaikan elektronik. Deadline ketat atau gadget rusak? Suruhsuruh aja!',
    url: 'https://suruhsuruh.id',
    ogImage: '/images/og-image.jpg',
    links: {
        twitter: 'https://twitter.com/suruhsuruhid',
        instagram: 'https://instagram.com/suruhsuruhid',
        facebook: 'https://facebook.com/suruhsuruhid',
        whatsapp: 'https://wa.me/6281234567890',
    },
};

export const themeConfig: ThemeConfig = {
    mainNav: [
        {
            title: 'Beranda',
            href: '/',
        },
        {
            title: 'Layanan',
            href: '#layanan',
        },
        {
            title: 'Cara Kerja',
            href: '#cara-kerja',
        },
        {
            title: 'FAQ',
            href: '#faq',
        },
    ],
    footerNav: [
        {
            section: 'Layanan',
            items: [
                {
                    title: 'Jasa Akademik',
                    href: '/#layanan',
                },
                {
                    title: 'Jasa Elektronik',
                    href: '/#layanan',
                },
                {
                    title: 'Semua Layanan',
                    href: '/layanan',
                },
            ],
        },
        {
            section: 'Perusahaan',
            items: [
                {
                    title: 'Tentang Kami',
                    href: '/tentang',
                },
                {
                    title: 'Blog',
                    href: '/blog',
                },
                {
                    title: 'Karir',
                    href: '/karir',
                },
            ],
        },
        {
            section: 'Bantuan',
            items: [
                {
                    title: 'FAQ',
                    href: '/#faq',
                },
                {
                    title: 'Hubungi Kami',
                    href: '/kontak',
                },
                {
                    title: 'Kebijakan Privasi',
                    href: '/kebijakan-privasi',
                },
            ],
        },
    ],
};

// Enhanced service data with packages
export const services: ServiceItem[] = [
    {
        id: 'skripsi',
        title: 'Pengerjaan Skripsi & Tugas Akhir',
        description: 'Bantuan penulisan skripsi, tesis, disertasi, dan tugas akhir dengan kualitas terbaik sesuai standar akademik.',
        fullDescription: 'Kami membantu Anda menyelesaikan tugas akhir perkuliahan dengan kualitas terbaik. Tim kami terdiri dari profesional berpengalaman di berbagai bidang yang siap membantu Anda menyelesaikan skripsi, tesis, disertasi, atau tugas akhir lainnya dengan standar akademik yang tinggi. Kami menjamin karya original, anti-plagiarisme, dan sesuai dengan pedoman institusi Anda.',
        icon: 'graduation-cap',
        category: 'academic',
        features: [
            'Konsultasi dan bimbingan penulisan',
            'Penentuan topik dan metodologi penelitian',
            'Penyusunan proposal penelitian',
            'Penulisan BAB 1-5 lengkap',
            'Analisis data kuantitatif/kualitatif',
            'Pembuatan slide presentasi',
            'Revisi tanpa batas selama masa kontrak',
            'Cek plagiarisme dengan software terkini'
        ],
        documents: [
            'Skripsi (S1)',
            'Tesis (S2)',
            'Disertasi (S3)',
            'Laporan tugas akhir',
            'Proposal penelitian',
            'Jurnal ilmiah',
            'Paper akademik'
        ],
        subjects: [
            'Manajemen & Bisnis',
            'Teknologi Informasi',
            'Psikologi',
            'Ilmu Pendidikan',
            'Ekonomi',
            'Hukum',
            'Kesehatan',
            'Teknik',
            'Pertanian',
            'Ilmu Sosial & Politik'
        ],
        educationLevels: ['S1', 'S2', 'S3', 'D3', 'D4'],
        packages: [
            {
                name: 'Paket Basic',
                description: 'Untuk kebutuhan dasar skripsi dan tugas akhir',
                monthlyPrice: 2500000,
                yearlyPrice: 2000000,
                regularPrice: 2500000,
                billingNote: 'Dikerjakan dalam 1-2 bulan',
                features: [
                    'Penulisan BAB 1-5 (Max 100 halaman)',
                    'Penggunaan 20-30 referensi',
                    'Analisis data sederhana',
                    'Revisi 2x',
                    'Tidak termasuk bimbingan',
                    'Format sesuai pedoman institusi',
                    'Cek plagiarisme',
                    'Tidak termasuk slide presentasi'
                ]
            },
            {
                name: 'Paket Premium',
                description: 'Solusi lengkap untuk tugas akhir berkualitas',
                monthlyPrice: 3500000,
                yearlyPrice: 2800000,
                regularPrice: 3500000,
                billingNote: 'Dikerjakan dalam 1-2 bulan',
                highlighted: true,
                features: [
                    'Penulisan BAB 1-5 (Max 150 halaman)',
                    'Penggunaan 30-50 referensi',
                    'Analisis data kompleks',
                    'Revisi tanpa batas selama kontrak',
                    'Bimbingan via WhatsApp',
                    'Format sesuai pedoman institusi',
                    'Cek plagiarisme',
                    'Termasuk slide presentasi',
                    'Pendampingan persiapan sidang'
                ]
            },
            {
                name: 'Paket Ultimate',
                description: 'Layanan eksklusif untuk hasil maksimal',
                monthlyPrice: 5000000,
                yearlyPrice: 4000000,
                regularPrice: 5000000,
                billingNote: 'Dikerjakan dalam 1-3 bulan',
                features: [
                    'Penulisan BAB 1-5 (Tanpa batas halaman)',
                    'Penggunaan 50+ referensi termasuk jurnal internasional',
                    'Analisis data advanced dengan software khusus',
                    'Revisi tanpa batas selama kontrak',
                    'Bimbingan via WhatsApp & Video Call',
                    'Format sesuai pedoman institusi',
                    'Cek plagiarisme dengan software premium',
                    'Slide presentasi profesional',
                    'Pendampingan persiapan & simulasi sidang',
                    'Publikasi jurnal (optional dengan biaya tambahan)'
                ]
            }
        ],
        pricingNote: 'Semua paket dapat disesuaikan dengan kebutuhan spesifik Anda. Harga dapat bervariasi tergantung pada tingkat pendidikan (S1/S2/S3) dan kompleksitas penelitian.',
        terms: [
            'Pembayaran dilakukan secara bertahap (DP dan pelunasan)',
            'Pengerjaan dimulai setelah DP dan data diterima',
            'Jaminan revisi sesuai paket yang dipilih',
            'Kerahasiaan data klien dijamin 100%',
            'Hasil kerja dijamin lolos cek plagiarisme'
        ]
    },
    {
        id: 'pemrograman',
        title: 'Pemrograman & Informatika',
        description: 'Layanan pembuatan aplikasi, website, dan solusi IT sesuai kebutuhan Anda.',
        fullDescription: 'Kami menawarkan jasa pembuatan dan pengembangan aplikasi, website, dan berbagai solusi IT yang disesuaikan dengan kebutuhan Anda. Tim programmer dan developer kami berpengalaman dalam berbagai bahasa pemrograman dan teknologi terkini. Kami mengutamakan kualitas code, performa, dan user experience pada setiap proyek yang kami kerjakan.',
        icon: 'computer',
        category: 'academic',
        features: [
            'Pengembangan website responsive',
            'Pembuatan aplikasi mobile Android/iOS',
            'Pembuatan aplikasi desktop',
            'Sistem informasi dan database',
            'Integrasi API dan webservice',
            'Pembuatan game sederhana',
            'Pemrograman IoT',
            'Konsultasi dan troubleshooting IT'
        ],
        documents: [
            'Tugas pemrograman',
            'Proyek akhir mata kuliah',
            'Skripsi bidang IT',
            'Laporan praktikum',
            'Dokumentasi teknis',
            'Tutorial dan modul pembelajaran'
        ],
        subjects: [
            'Pemrograman Web',
            'Pemrograman Mobile',
            'Pemrograman Desktop',
            'Database Management',
            'Jaringan Komputer',
            'Kecerdasan Buatan',
            'Machine Learning',
            'Data Science',
            'Cloud Computing',
            'Cybersecurity',
            'Game Development',
            'UI/UX Design'
        ],
        educationLevels: ['SMA/SMK', 'D3', 'S1', 'S2', 'S3'],
        packages: [
            {
                name: 'Paket Basic',
                description: 'Untuk tugas dan proyek sederhana',
                monthlyPrice: 500000,
                yearlyPrice: 400000,
                regularPrice: 500000,
                billingNote: 'Pengerjaan 3-7 hari',
                features: [
                    'Pengerjaan tugas pemrograman sederhana',
                    '1 bahasa pemrograman',
                    'Aplikasi dengan maksimal 3 fitur',
                    'Website statis (1-5 halaman)',
                    'Database sederhana (max 5 tabel)',
                    'Dokumentasi basic',
                    'Revisi 1x',
                    'Source code lengkap',
                    'Tidak termasuk deployment/hosting'
                ]
            },
            {
                name: 'Paket Standard',
                description: 'Untuk proyek menengah dengan fitur lebih kompleks',
                monthlyPrice: 1500000,
                yearlyPrice: 1200000,
                regularPrice: 1500000,
                billingNote: 'Pengerjaan 1-2 minggu',
                highlighted: true,
                features: [
                    'Pengerjaan proyek menengah',
                    'Hingga 2 bahasa pemrograman',
                    'Website dinamis atau aplikasi interaktif',
                    'Aplikasi dengan 4-8 fitur',
                    'Integrasi database kompleks',
                    'API integration',
                    'Dokumentasi lengkap',
                    'Revisi 2x',
                    'Source code lengkap + penjelasan',
                    'Bantuan deployment/hosting',
                    'Support teknis 2 minggu'
                ]
            },
            {
                name: 'Paket Professional',
                description: 'Solusi lengkap untuk proyek kompleks dan skripsi IT',
                monthlyPrice: 3500000,
                yearlyPrice: 2800000,
                regularPrice: 3500000,
                billingNote: 'Pengerjaan 2-4 minggu',
                features: [
                    'Pengerjaan proyek kompleks atau skripsi IT',
                    'Multi-platform (web, mobile, desktop)',
                    'Aplikasi dengan fitur unlimited',
                    'Sistem terintegrasi',
                    'Database design & optimization',
                    'Advanced security implementation',
                    'UI/UX design profesional',
                    'Testing & debugging menyeluruh',
                    'Dokumentasi teknis lengkap',
                    'Revisi unlimited selama kontrak',
                    'Deployment ke server/cloud',
                    'Bantuan presentasi/demo',
                    'Support teknis 1 bulan',
                    'Maintenance support'
                ]
            }
        ],
        pricingNote: 'Harga dapat disesuaikan berdasarkan kompleksitas proyek, teknologi yang digunakan, dan tenggat waktu pengerjaan. Konsultasikan kebutuhan spesifik Anda untuk mendapatkan penawaran yang sesuai.',
        terms: [
            'Pembayaran bertahap: 50% di awal, 50% setelah selesai',
            'Spesifikasi dan kebutuhan harus dijelaskan secara detail di awal',
            'Perubahan requirement mayor di tengah proses dapat dikenakan biaya tambahan',
            'Hak cipta dan source code menjadi milik klien setelah pelunasan',
            'Kerahasiaan data dan proyek dijamin',
            'Garansi bug fixing 1 bulan setelah pengerjaan selesai'
        ]
    },
    {
        id: 'tugas-kuliah',
        title: 'Tugas Kuliah & Makalah',
        description: 'Pengerjaan tugas kuliah, makalah, esai, review jurnal dan berbagai bentuk tugas akademik lainnya.',
        fullDescription: 'Kami menyediakan layanan pengerjaan berbagai jenis tugas kuliah dan makalah dengan kualitas premium dan ketepatan waktu yang terjamin. Tim penulis kami memiliki keahlian di berbagai disiplin ilmu dan mampu mengerjakan tugas dengan deadline yang ketat tanpa mengorbankan kualitas.',
        icon: 'document-text',
        category: 'academic',
        features: [
            'Pengerjaan cepat dan tepat waktu',
            'Penulis berpengalaman sesuai bidang studi',
            'Format sesuai ketentuan kampus',
            'Kajian literatur komprehensif',
            'Referensi dan sitasi lengkap',
            'Bebas plagiarisme',
            'Revisi gratis'
        ],
        documents: [
            'Makalah',
            'Essay',
            'Review jurnal',
            'Laporan praktikum',
            'Tugas individu/kelompok',
            'Resume/ringkasan',
            'Presentasi'
        ],
        subjects: [
            'Manajemen & Bisnis',
            'Teknologi Informasi',
            'Ilmu Komunikasi',
            'Sosiologi',
            'Psikologi',
            'Ilmu Pendidikan',
            'Ekonomi',
            'Hukum',
            'Kedokteran & Kesehatan',
            'Teknik'
        ],
        educationLevels: ['SMA/SMK', 'D3', 'S1', 'S2'],
        packages: [
            {
                name: 'Paket Singkat',
                description: 'Untuk tugas-tugas sederhana dan deadline cepat',
                monthlyPrice: 150000,
                features: [
                    'Makalah/essay 5-10 halaman',
                    'Pengerjaan 1-3 hari',
                    'Penggunaan 5-10 referensi',
                    'Format standar',
                    'Revisi 1x',
                    'Pengecekan plagiarisme',
                    'Tidak termasuk slide presentasi'
                ]
            },
            {
                name: 'Paket Standar',
                description: 'Solusi optimal untuk mayoritas tugas akademik',
                monthlyPrice: 300000,
                highlighted: true,
                features: [
                    'Makalah/essay 10-20 halaman',
                    'Pengerjaan 3-5 hari',
                    'Penggunaan 10-20 referensi',
                    'Format sesuai ketentuan kampus',
                    'Revisi 2x',
                    'Pengecekan plagiarisme',
                    'Termasuk slide presentasi sederhana'
                ]
            },
            {
                name: 'Paket Lengkap',
                description: 'Untuk tugas-tugas kompleks yang memerlukan penelitian mendalam',
                monthlyPrice: 500000,
                features: [
                    'Makalah/essay 20-30+ halaman',
                    'Pengerjaan 5-7 hari',
                    'Penggunaan 20+ referensi termasuk jurnal',
                    'Format sesuai ketentuan kampus',
                    'Revisi tanpa batas selama 7 hari',
                    'Pengecekan plagiarisme',
                    'Termasuk slide presentasi profesional',
                    'Termasuk penelitian pendukung'
                ]
            }
        ],
        pricingNote: 'Harga dapat bervariasi berdasarkan kompleksitas tugas, tenggat waktu, dan kebutuhan khusus. Untuk tugas dengan deadline kurang dari 24 jam dikenakan biaya tambahan.',
        terms: [
            'Harga final ditentukan setelah diskusi detail tugas',
            'DP minimal 50% untuk memulai pengerjaan',
            'Revisi gratis sesuai paket yang dipilih',
            'Pengerjaan dimulai setelah pembayaran DP dan data lengkap',
            'Jaminan pengembalian DP jika deadline tidak terpenuhi'
        ]
    },
    {
        id: 'praktikum',
        title: 'Laporan Praktikum & Penelitian',
        description: 'Penulisan laporan praktikum, laporan kerja lapangan, dan laporan penelitian dengan format standar.',
        fullDescription: 'Layanan pembuatan laporan praktikum, laporan kerja lapangan (KKL/KKN/Magang), dan laporan penelitian dengan struktur dan format yang sesuai standar. Kami membantu menyusun laporan yang sistematis, informatif, dan memenuhi kriteria penilaian institusi Anda.',
        icon: 'clipboard-document-list',
        category: 'academic',
        features: [
            'Format sesuai pedoman institusi',
            'Analisis data yang komprehensif',
            'Interpretasi hasil yang akurat',
            'Visualisasi data (grafik, tabel, diagram)',
            'Pembahasan mendalam',
            'Kajian literatur pendukung',
            'Dokumentasi lengkap'
        ],
        documents: [
            'Laporan praktikum laboratorium',
            'Laporan kerja lapangan',
            'Laporan KKN/KKL',
            'Laporan magang/internship',
            'Laporan penelitian',
            'Laporan observasi',
            'Laporan studi kasus'
        ],
        subjects: [
            'Teknik',
            'Ilmu Komputer',
            'Sains (Kimia, Fisika, Biologi)',
            'Kedokteran & Kesehatan',
            'Pertanian',
            'Ekonomi & Bisnis',
            'Sosial Humaniora',
            'Pendidikan'
        ],
        educationLevels: ['SMA/SMK', 'D3', 'S1', 'S2'],
        packages: [
            {
                name: 'Paket Basic',
                description: 'Untuk laporan praktikum sederhana',
                monthlyPrice: 300000,
                features: [
                    'Laporan 15-25 halaman',
                    'Format dasar sesuai pedoman',
                    'Analisis data sederhana',
                    'Visualisasi data (5-10 grafik/tabel)',
                    'Interpretasi hasil',
                    'Kesimpulan dan pembahasan',
                    'Revisi 1x',
                    'Pengerjaan 3-5 hari'
                ]
            },
            {
                name: 'Paket Standard',
                description: 'Untuk laporan praktikum dan penelitian menengah',
                monthlyPrice: 500000,
                highlighted: true,
                features: [
                    'Laporan 25-40 halaman',
                    'Format lengkap sesuai pedoman institusi',
                    'Analisis data menengah',
                    'Visualisasi data (10-15 grafik/tabel)',
                    'Interpretasi hasil yang detail',
                    'Kajian literatur pendukung',
                    'Kesimpulan dan pembahasan mendalam',
                    'Revisi 2x',
                    'Pengerjaan 5-7 hari'
                ]
            },
            {
                name: 'Paket Premium',
                description: 'Untuk laporan penelitian kompleks dan kerja lapangan',
                monthlyPrice: 750000,
                features: [
                    'Laporan 40-60+ halaman',
                    'Format lengkap sesuai pedoman institusi',
                    'Analisis data kompleks',
                    'Visualisasi data profesional (15+ grafik/tabel)',
                    'Interpretasi hasil yang mendalam',
                    'Kajian literatur komprehensif',
                    'Kesimpulan, pembahasan, dan rekomendasi',
                    'Revisi tanpa batas selama 14 hari',
                    'Pengerjaan 7-10 hari',
                    'Termasuk presentasi'
                ]
            }
        ],
        pricingNote: 'Harga bergantung pada kompleksitas laporan, kelengkapan data mentah yang diberikan, dan tingkat analisis yang dibutuhkan.',
        terms: [
            'Klien menyediakan data mentah atau hasil observasi',
            'Diperlukan informasi detail tentang format laporan institusi',
            'Revisi gratis untuk kesalahan dari pihak kami',
            'Pengerjaan paling cepat 3-5 hari kerja',
            'Harga belum termasuk analisis data kompleks menggunakan software khusus'
        ]
    },
    {
        id: 'presentasi',
        title: 'Presentasi & Media Pembelajaran',
        description: 'Pembuatan slide presentasi, media pembelajaran interaktif, dan material pendukung perkuliahan.',
        fullDescription: 'Layanan pembuatan berbagai media pembelajaran dan presentasi yang menarik dan efektif untuk kebutuhan akademik maupun profesional. Kami mendesain slide presentasi yang informatif, visual, dan sesuai dengan tujuan pembelajaran. Media pembelajaran interaktif yang kami buat dirancang untuk meningkatkan engagement dan pemahaman audience.',
        icon: 'presentation-chart-bar',
        category: 'academic',
        features: [
            'Desain visual profesional',
            'Konten informatif dan terstruktur',
            'Presentasi yang menarik dan tidak monoton',
            'Infografis dan visualisasi data',
            'Animasi dan transisi yang tepat',
            'Kompatibel dengan berbagai platform',
            'Speaker notes untuk memudahkan presentasi'
        ],
        documents: [
            'Slide presentasi PowerPoint/Google Slides',
            'Infografis dan poster',
            'Mind map dan diagram',
            'E-book dan modul digital',
            'Video pembelajaran',
            'Kuis interaktif',
            'Material pendukung perkuliahan'
        ],
        subjects: [
            'Semua bidang studi akademik',
            'Presentasi proposal penelitian',
            'Presentasi tugas akhir/sidang',
            'Presentasi seminar',
            'Presentasi bisnis',
            'Media pembelajaran'
        ],
        educationLevels: ['SMA/SMK', 'D3', 'S1', 'S2', 'S3', 'Umum'],
        packages: [
            {
                name: 'Paket Basic',
                description: 'Presentasi dasar untuk tugas dan keperluan sederhana',
                monthlyPrice: 250000,
                features: [
                    '10-15 slide',
                    'Template standar dengan penyesuaian warna',
                    'Konten dasar sesuai materi yang diberikan',
                    'Visualisasi data sederhana (5-8 grafik/diagram)',
                    'Animasi dasar',
                    'Revisi 1x',
                    'Pengerjaan 2-3 hari'
                ]
            },
            {
                name: 'Paket Pro',
                description: 'Presentasi profesional untuk sidang dan seminar',
                monthlyPrice: 450000,
                highlighted: true,
                features: [
                    '15-25 slide',
                    'Template custom dengan branding sesuai kebutuhan',
                    'Konten terstruktur dengan pengembangan dari materi',
                    'Visualisasi data profesional (8-12 grafik/diagram)',
                    'Animasi dan transisi modern',
                    'Speaker notes lengkap',
                    'Revisi 2x',
                    'Pengerjaan 3-5 hari'
                ]
            },
            {
                name: 'Paket Premium',
                description: 'Media pembelajaran komprehensif',
                monthlyPrice: 750000,
                features: [
                    '25-40+ slide',
                    'Template premium dengan desain eksklusif',
                    'Konten komprehensif dengan riset tambahan',
                    'Visualisasi data advanced (12+ grafik/diagram)',
                    'Animasi dan interaktivitas tingkat lanjut',
                    'Speaker notes detail dengan script presentasi',
                    'Infografis dan ilustrasi custom',
                    'Revisi tanpa batas selama 7 hari',
                    'Pengerjaan 5-7 hari',
                    'Termasuk versi cetak (PDF high-res)'
                ]
            }
        ],
        pricingNote: 'Harga tergantung jumlah slide, kompleksitas desain, dan konten yang perlu disusun. Untuk media interaktif seperti video animasi atau kuis interaktif berlaku tarif terpisah.',
        terms: [
            'Konten/materi dapat disediakan klien atau disusun oleh tim kami (dengan biaya tambahan untuk riset)',
            'File dikirim dalam format yang diinginkan (.pptx, .pdf, dll)',
            'Pengerjaan dimulai setelah konsep dan kebutuhan disetujui',
            'Revisi major yang mengubah konsep awal dikenakan biaya tambahan',
            'Harga termasuk 1x konsultasi desain',
            'Untuk presentasi sidang/seminar tersedia paket bimbingan presentasi (biaya terpisah)'
        ]
    },
    {
        id: 'smartphone',
        title: 'Perbaikan Smartphone & Laptop',
        description: 'Layanan service profesional untuk perbaikan smartphone, laptop, dan berbagai perangkat digital.',
        fullDescription: 'Kami menyediakan layanan perbaikan profesional untuk berbagai jenis perangkat elektronik seperti smartphone, laptop, tablet, dan gadget lainnya. Tim teknisi kami berpengalaman dalam mengatasi berbagai masalah hardware maupun software dengan pendekatan diagnostik yang sistematis untuk memastikan perbaikan yang tepat dan efisien.',
        icon: 'device-phone-mobile',
        category: 'electronic',
        features: [
            'Diagnosa gratis',
            'Perbaikan hardware & software',
            'Penggantian komponen original',
            'Recovery data (jika memungkinkan)',
            'Upgrade komponen',
            'Instalasi sistem operasi & aplikasi',
            'Garansi perbaikan',
            'Konsultasi teknis'
        ],
        devices: [
            'Smartphone & Tablet',
            'Laptop & Notebook',
            'Komputer PC',
            'Monitor & Proyektor',
            'Printer & Scanner',
            'Perangkat audio',
            'Konsol game'
        ],
        issueTypes: [
            'Kerusakan fisik (layar, casing)',
            'Masalah baterai',
            'Masalah charging',
            'Tidak bisa menyala',
            'Performa lambat',
            'Software error/crash',
            'Virus & malware',
            'Masalah konektivitas (WiFi, Bluetooth)',
            'Kerusakan hardware internal',
            'Recovery data'
        ],
        brands: [
            'Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo',
            'Asus', 'Acer', 'HP', 'Lenovo', 'Dell',
            'MSI', 'Toshiba', 'Huawei', 'Realme'
        ],
        packages: [
            {
                name: 'Paket Check-Up',
                description: 'Diagnosa dan perbaikan minor',
                monthlyPrice: 150000,
                features: [
                    'Diagnosa menyeluruh perangkat',
                    'Pembersihan hardware',
                    'Optimasi software',
                    'Pembaruan sistem operasi',
                    'Antivirus scan & clean',
                    'Perbaikan minor (tanpa ganti sparepart)',
                    'Garansi 7 hari',
                    'Laporan diagnostik'
                ]
            },
            {
                name: 'Paket Service',
                description: 'Perbaikan standar untuk masalah umum',
                monthlyPrice: 300000,
                highlighted: true,
                features: [
                    'Semua fitur Paket Check-Up',
                    'Perbaikan masalah tingkat menengah',
                    'Penggantian komponen (biaya terpisah)',
                    'Instalasi ulang OS & software',
                    'Backup & restore data',
                    'Pengaturan perangkat',
                    'Konsultasi penggunaan',
                    'Garansi 30 hari'
                ]
            },
            {
                name: 'Paket Premium',
                description: 'Perbaikan kompleks dan upgrade',
                monthlyPrice: 500000,
                features: [
                    'Semua fitur Paket Service',
                    'Perbaikan masalah kompleks',
                    'Upgrade hardware (RAM/SSD, biaya terpisah)',
                    'Recovery data khusus',
                    'Perbaikan motherboard',
                    'Reparasi liquid damage',
                    'Pengaturan khusus sesuai kebutuhan',
                    'Prioritas pengerjaan',
                    'Garansi 90 hari'
                ]
            }
        ],
        pricingNote: 'Harga belum termasuk sparepart. Biaya final ditentukan setelah diagnosa. Untuk beberapa kerusakan parah seperti logicboard mungkin dikenakan biaya tambahan.',
        terms: [
            'Diagnosa awal gratis tanpa biaya',
            'Biaya service ditentukan setelah diagnosa',
            'Sparepart ditagihkan terpisah dengan harga transparan',
            'Garansi perbaikan sesuai paket yang dipilih',
            'Waktu perbaikan bervariasi dari 1-7 hari kerja tergantung ketersediaan sparepart',
            'Pembayaran 100% setelah perbaikan selesai dan disetujui'
        ]
    },
    {
        id: 'rumah-tangga',
        title: 'Service Peralatan Rumah Tangga',
        description: 'Perbaikan elektronik rumah tangga seperti TV, AC, kulkas, mesin cuci, dan perangkat lainnya.',
        fullDescription: 'Layanan perbaikan profesional untuk berbagai peralatan elektronik rumah tangga seperti TV, AC, kulkas, mesin cuci, dan perangkat lainnya. Tim teknisi kami berpengalaman dalam mendiagnosa dan memperbaiki berbagai jenis kerusakan untuk memastikan peralatan rumah tangga Anda berfungsi dengan baik kembali.',
        icon: 'home-modern',
        category: 'electronic',
        features: [
            'Kunjungan teknisi ke lokasi',
            'Diagnosa kerusakan akurat',
            'Perbaikan cepat dan profesional',
            'Penggantian komponen berkualitas',
            'Layanan preventive maintenance',
            'Konsultasi efisiensi energi',
            'Garansi perbaikan',
            'Tersedia layanan darurat'
        ],
        devices: [
            'Televisi & Smart TV',
            'AC (Air Conditioner)',
            'Kulkas & Freezer',
            'Mesin Cuci & Pengering',
            'Microwave & Oven',
            'Dispenser & Water Purifier',
            'Rice Cooker & Kompor Listrik',
            'Kipas Angin & Air Cooler',
            'Water Heater',
            'Perangkat dapur lainnya'
        ],
        issueTypes: [
            'Tidak menyala/tidak berfungsi',
            'Performa tidak optimal',
            'Kerusakan komponen',
            'Suara tidak normal',
            'Kebocoran/drainase',
            'Masalah pendinginan',
            'Masalah kontrol/panel',
            'Korsleting listrik',
            'Perawatan berkala',
            'Instalasi & setting perangkat'
        ],
        brands: [
            'Samsung', 'LG', 'Sharp', 'Panasonic', 'Toshiba',
            'Daikin', 'Polytron', 'Sanken', 'Electrolux',
            'Modena', 'Philips', 'Mitsubishi', 'Sony', 'Sanyo'
        ],
        packages: [
            {
                name: 'Paket Standar',
                description: 'Perbaikan dasar untuk masalah umum',
                monthlyPrice: 200000,
                features: [
                    'Kunjungan teknisi',
                    'Diagnosa perangkat',
                    'Perbaikan dasar (tanpa ganti sparepart)',
                    'Pembersihan komponen',
                    'Tips perawatan',
                    'Garansi 30 hari',
                    'Pengerjaan 1-2 jam',
                    'Jadwal normal (1-3 hari)'
                ]
            },
            {
                name: 'Paket Pro',
                description: 'Perbaikan menyeluruh dan perawatan',
                monthlyPrice: 350000,
                highlighted: true,
                features: [
                    'Kunjungan teknisi prioritas',
                    'Diagnosa komprehensif',
                    'Perbaikan menyeluruh',
                    'Penggantian komponen (biaya terpisah)',
                    'Pembersihan dan perawatan lengkap',
                    'Pengaturan optimal perangkat',
                    'Konsultasi penggunaan efisien',
                    'Garansi 60 hari',
                    'Pengerjaan 2-3 jam',
                    'Jadwal fleksibel (1-2 hari)'
                ]
            },
            {
                name: 'Paket Darurat',
                description: 'Layanan perbaikan cepat untuk kasus mendesak',
                monthlyPrice: 500000,
                features: [
                    'Kunjungan teknisi dalam 2-6 jam',
                    'Diagnosa dan perbaikan express',
                    'Perbaikan menyeluruh',
                    'Penggantian komponen (biaya terpisah)',
                    'Stok komponen ready (untuk perangkat umum)',
                    'Pembersihan dan perawatan lengkap',
                    'Pengaturan optimal perangkat',
                    'Garansi 30 hari',
                    'Pengerjaan prioritas',
                    'Layanan 24/7 termasuk weekend & hari libur'
                ]
            }
        ],
        pricingNote: 'Biaya kunjungan dan diagnosa akan dibebaskan jika dilanjutkan dengan perbaikan. Harga belum termasuk sparepart.',
        terms: [
            'Biaya kunjungan teknisi mulai dari Rp 50.000 (gratis jika dilanjutkan perbaikan)',
            'Estimasi biaya diberikan setelah diagnosa dan sebelum perbaikan',
            'Sparepart ditagihkan terpisah dengan harga transparan',
            'Garansi perbaikan berlaku 30-90 hari tergantung jenis perangkat',
            'Layanan tersedia setiap hari termasuk akhir pekan (dengan perjanjian)',
            'Waktu respon 24-48 jam untuk permintaan reguler'
        ]
    },
    {
        id: 'jaringan',
        title: 'Instalasi & Perbaikan Jaringan',
        description: 'Pemasangan, perbaikan, dan optimasi jaringan internet dan sistem keamanan untuk rumah atau kantor.',
        fullDescription: 'Layanan instalasi, perbaikan, dan optimasi jaringan internet dan sistem keamanan untuk rumah atau kantor. Kami menyediakan solusi jaringan yang handal dan aman untuk memastikan konektivitas yang stabil dan performa optimal sesuai kebutuhan Anda.',
        icon: 'signal',
        category: 'electronic',
        features: [
            'Instalasi jaringan komprehensif',
            'Set up WiFi & internet',
            'Konfigurasi router & modem',
            'Pengkabelan terstruktur',
            'Optimasi kecepatan internet',
            'Pengamanan jaringan (firewall, VPN)',
            'Troubleshooting koneksi',
            'Implementasi sistem backup',
            'Instalasi CCTV & sistem keamanan'
        ],
        devices: [
            'Router & Modem',
            'Access Point & WiFi Extender',
            'Switch & Hub',
            'Server & NAS',
            'CCTV & IP Camera',
            'Intercom & Video Doorbell',
            'Smart Home Devices',
            'Sistem Alarm & Keamanan',
            'UPS & Power Management'
        ],
        issueTypes: [
            'Koneksi lambat/tidak stabil',
            'Jangkauan WiFi terbatas',
            'Konfigurasi router',
            'Instalasi jaringan baru',
            'Upgrading infrastruktur',
            'Masalah keamanan jaringan',
            'Integrasi sistem smart home',
            'Troubleshooting perangkat jaringan',
            'Pemeliharaan & monitoring'
        ],
        brands: [
            'TP-Link', 'Cisco', 'Huawei', 'Mikrotik', 'Ubiquiti',
            'D-Link', 'ASUS', 'Linksys', 'Netgear', 'Tenda',
            'Hikvision', 'Dahua', 'ZTE', 'Aruba'
        ],
        packages: [
            {
                name: 'Paket Home Wi-Fi',
                description: 'Setup dan optimasi Wi-Fi rumah',
                monthlyPrice: 350000,
                features: [
                    'Konfigurasi 1-2 router/access point',
                    'Optimasi jangkauan Wi-Fi',
                    'Pengaturan keamanan dasar',
                    'Konfigurasi perangkat (hingga 5 device)',
                    'Pengujian kecepatan',
                    'Troubleshooting dasar',
                    'Pelatihan penggunaan dasar',
                    'Garansi layanan 30 hari'
                ]
            },
            {
                name: 'Paket Home Network',
                description: 'Solusi jaringan lengkap untuk rumah',
                monthlyPrice: 750000,
                highlighted: true,
                features: [
                    'Instalasi & konfigurasi sistem mesh WiFi',
                    'Pengkabelan struktural (hingga 5 titik)',
                    'Pengaturan keamanan menengah',
                    'Setup firewall & parental controls',
                    'Konfigurasi perangkat (hingga 10 device)',
                    'Setup backup internet',
                    'Integrasi perangkat smart home dasar',
                    'Pelatihan penggunaan menengah',
                    'Garansi layanan 60 hari',
                    'Free troubleshooting 3x'
                ]
            },
            {
                name: 'Paket Office Network',
                description: 'Solusi jaringan profesional untuk bisnis',
                monthlyPrice: 1500000,
                features: [
                    'Instalasi sistem jaringan terstruktur',
                    'Pengkabelan struktural (hingga 15 titik)',
                    'Konfigurasi router enterprise',
                    'Setup VLAN & network segmentation',
                    'Pengaturan keamanan tingkat lanjut',
                    'Setup firewall & VPN',
                    'Monitoring sistem',
                    'Backup & disaster recovery',
                    'Konfigurasi server (file/print/NAS)',
                    'Instalasi CCTV & akses kontrol',
                    'Pelatihan staff IT',
                    'Garansi layanan 90 hari',
                    'Free troubleshooting 12x'
                ]
            }
        ],
        pricingNote: 'Harga bervariasi berdasarkan kompleksitas proyek, luas area, dan spesifikasi perangkat yang dibutuhkan. Perangkat dan material ditagihkan terpisah.',
        terms: [
            'Survei lokasi gratis untuk area tertentu',
            'Konsultasi awal dan penawaran biaya tanpa kewajiban',
            'Biaya perangkat dan material ditagihkan terpisah',
            'Garansi instalasi 3-6 bulan untuk masalah teknis',
            'Tersedia paket maintenance bulanan/tahunan',
            'Support teknis tersedia 7 hari seminggu'
        ]
    },
    {
        id: 'maintenance',
        title: 'Upgrade & Maintenance Perangkat',
        description: 'Layanan upgrade komponen, maintenance rutin, dan optimasi performa perangkat elektronik Anda.',
        fullDescription: 'Layanan peningkatan performa perangkat elektronik Anda melalui upgrade komponen, maintenance rutin, dan optimasi sistem. Kami membantu memaksimalkan kinerja dan memperpanjang masa pakai perangkat Anda dengan perawatan yang tepat dan upgrade yang sesuai kebutuhan.',
        icon: 'wrench-screwdriver',
        category: 'electronic',
        features: [
            'Upgrade hardware (RAM, SSD, GPU)',
            'Pembersihan internal komprehensif',
            'Maintenance preventif',
            'Optimasi sistem operasi',
            'Update software & driver',
            'Thermal management',
            'Backup & restore data',
            'Diagnostik performa',
            'Assessment kebutuhan upgrade'
        ],
        devices: [
            'Komputer PC & Workstation',
            'Laptop & Notebook',
            'Server & NAS',
            'Perangkat gaming',
            'Smartphone & Tablet',
            'Elektronik rumah tangga',
            'Perangkat audio visual',
            'Sistem pendingin & cooling',
            'UPS & power supply'
        ],
        issueTypes: [
            'Performa lambat',
            'Overheating',
            'Storage penuh',
            'Noise berlebihan',
            'Baterai cepat habis',
            'Software outdated',
            'Kebutuhan upgrade kapasitas',
            'Stabilitas sistem',
            'Pemeliharaan berkala'
        ],
        brands: [
            'Semua brand perangkat elektronik',
            'HP', 'Dell', 'Lenovo', 'Asus', 'Acer',
            'Apple', 'Samsung', 'MSI', 'Gigabyte',
            'Intel', 'AMD', 'Nvidia', 'Western Digital', 'Seagate'
        ],
        packages: [
            {
                name: 'Paket Tune-Up',
                description: 'Pembersihan dan optimasi dasar',
                monthlyPrice: 250000,
                features: [
                    'Pembersihan fisik perangkat',
                    'Pembersihan debu internal',
                    'Penggantian thermal paste',
                    'Scan & clean malware',
                    'Pembersihan file temporary',
                    'Defragmentasi storage',
                    'Update OS & driver dasar',
                    'Optimasi startup',
                    'Troubleshooting dasar',
                    'Pengerjaan 1-2 jam'
                ]
            },
            {
                name: 'Paket Upgrade',
                description: 'Peningkatan performa untuk kebutuhan umum',
                monthlyPrice: 400000,
                highlighted: true,
                features: [
                    'Semua fitur Paket Tune-Up',
                    'Instalasi RAM tambahan (biaya terpisah)',
                    'Upgrade ke SSD (biaya terpisah)',
                    'Instalasi ulang OS',
                    'Setup dual-boot (opsional)',
                    'Optimasi sistem menyeluruh',
                    'Konfigurasi BIOS optimal',
                    'Backup data lengkap',
                    'Setup software esensial',
                    'Konsultasi rekomendasi upgrade',
                    'Pengerjaan 3-5 jam'
                ]
            },
            {
                name: 'Paket Overhaul',
                description: 'Upgrade komprehensif untuk performa maksimal',
                monthlyPrice: 750000,
                features: [
                    'Semua fitur Paket Upgrade',
                    'Upgrade komponen high-end (biaya terpisah)',
                    'GPU upgrade & optimization',
                    'Liquid cooling setup (opsional)',
                    'Optimasi gaming/workstation',
                    'Overclocking aman (opsional)',
                    'Setup raid/redundancy',
                    'Advanced thermal management',
                    'Cable management profesional',
                    'Custom OS setup & optimization',
                    'Performance monitoring setup',
                    'Konsultasi intensif',
                    'Pengerjaan 5-8 jam'
                ]
            }
        ],
        pricingNote: 'Harga maintenance dasar. Biaya tambahan untuk upgrade komponen hardware tergantung spesifikasi yang dibutuhkan.',
        terms: [
            'Diagnosa awal gratis untuk assessment kebutuhan',
            'Estimasi biaya diberikan sebelum pengerjaan',
            'Komponen upgrade dijamin baru dan original',
            'Data backup direkomendasikan sebelum maintenance (opsional berbayar)',
            'Waktu pengerjaan 1-3 hari tergantung kompleksitas',
            'Garansi pengerjaan 30 hari & garansi komponen sesuai vendor'
        ]
    }
];

export const features: ServiceFeature[] = [
    {
        id: 'quality',
        title: 'Kualitas Terjamin',
        description: 'Semua pekerjaan ditangani oleh profesional berpengalaman dengan standar kualitas tinggi.',
        icon: 'shield-check'
    },
    {
        id: 'ontime',
        title: 'Tepat Waktu',
        description: 'Kami berkomitmen menyelesaikan pekerjaan sesuai deadline yang telah disepakati.',
        icon: 'clock'
    },
    {
        id: 'affordable',
        title: 'Harga Bersaing',
        description: 'Dapatkan layanan berkualitas dengan harga transparan dan dapat dinegosiasikan.',
        icon: 'currency-dollar'
    },
    {
        id: 'satisfaction',
        title: 'Kepuasan Pelanggan',
        description: 'Layanan after-sales dan garansi untuk memastikan kepuasan Anda dengan hasil pekerjaan kami.',
        icon: 'check-badge'
    }
];

export const workSteps: WorkStep[] = [
    {
        id: 'step1',
        step: 1,
        title: 'Konsultasi',
        description: 'Diskusikan kebutuhan Anda dengan tim kami untuk mendapatkan solusi terbaik.',
        icon: 'chat-bubble-left-right'
    },
    {
        id: 'step2',
        step: 2,
        title: 'Penawaran',
        description: 'Dapatkan penawaran harga transparan berdasarkan spesifikasi kebutuhan Anda.',
        icon: 'banknotes'
    },
    {
        id: 'step3',
        step: 3,
        title: 'Pengerjaan',
        description: 'Tim kami akan mengerjakan permintaan Anda dengan standar kualitas tinggi.',
        icon: 'wrench-screwdriver'
    },
    {
        id: 'step4',
        step: 4,
        title: 'Selesai',
        description: 'Terima hasil pekerjaan yang sudah selesai dan nikmati kepuasan dari layanan kami.',
        icon: 'check-circle'
    }
];

export const faqs: FAQ[] = [
    {
        id: 'faq-1',
        question: 'Bagaimana cara memesan layanan di suruhsuruh.id?',
        answer: 'Untuk memesan layanan, silakan isi formulir pemesanan di website kami atau hubungi tim kami melalui WhatsApp. Kami akan segera merespon untuk mendiskusikan kebutuhan dan memberikan penawaran sesuai permintaan Anda.',
        category: 'academic'
    },
    {
        id: 'faq-2',
        question: 'Berapa lama waktu pengerjaan untuk skripsi atau tugas akhir?',
        answer: 'Waktu pengerjaan bervariasi tergantung kompleksitas, panjang, dan tenggat waktu yang diinginkan. Untuk skripsi, umumnya membutuhkan waktu 1-3 bulan, sedangkan tugas seperti makalah dapat diselesaikan dalam hitungan hari hingga minggu. Kami selalu berusaha menyesuaikan dengan deadline yang Anda butuhkan.',
        category: 'academic'
    },
    {
        id: 'faq-3',
        question: 'Apakah layanan akademik yang ditawarkan bebas plagiarisme?',
        answer: 'Ya, kami menjamin hasil pekerjaan bebas dari plagiarisme. Semua karya ditulis secara original dan kami selalu melakukan pengecekan plagiarisme menggunakan software terkini sebelum mengirimkan hasil akhir kepada klien.',
        category: 'academic'
    },
    {
        id: 'faq-4',
        question: 'Bagaimana sistem pembayaran untuk layanan akademik?',
        answer: 'Kami menerapkan sistem pembayaran bertahap: Down Payment (DP) sebesar 50% untuk memulai pengerjaan dan pelunasan setelah pekerjaan selesai dan sebelum pengiriman hasil final. Pembayaran dapat dilakukan melalui transfer bank atau e-wallet.',
        category: 'academic'
    },
    {
        id: 'faq-5',
        question: 'Apakah bisa melakukan revisi jika ada yang kurang sesuai?',
        answer: 'Tentu, kami menyediakan layanan revisi tanpa batas selama permintaan revisi masih sesuai dengan kesepakatan awal dan dalam periode kontrak. Kami berkomitmen untuk memberikan hasil yang sesuai dengan harapan Anda.',
        category: 'academic'
    },
    {
        id: 'faq-6',
        question: 'Bagaimana garansi untuk perbaikan elektronik?',
        answer: 'Kami memberikan garansi perbaikan 30 hari untuk sebagian besar layanan elektronik. Jika terjadi masalah yang sama dalam periode garansi, kami akan memperbaikinya tanpa biaya tambahan. Ketentuan garansi dapat berbeda untuk setiap jenis perangkat dan reparasi.',
        category: 'electronic'
    },
    {
        id: 'faq-7',
        question: 'Berapa lama proses perbaikan smartphone atau laptop?',
        answer: 'Sebagian besar perbaikan smartphone atau laptop dapat diselesaikan dalam waktu 1-3 hari kerja, tergantung pada jenis kerusakan dan ketersediaan suku cadang. Untuk kasus tertentu yang membutuhkan komponen khusus, mungkin diperlukan waktu tambahan.',
        category: 'electronic'
    },
    {
        id: 'faq-8',
        question: 'Apakah suku cadang yang digunakan adalah yang original?',
        answer: 'Kami mengutamakan penggunaan suku cadang original untuk menjamin kualitas dan daya tahan. Namun, kami juga menyediakan opsi suku cadang alternatif berkualitas tinggi dengan harga lebih terjangkau. Kami akan selalu mendiskusikan opsi yang tersedia dengan Anda sebelum melakukan penggantian.',
        category: 'electronic'
    },
    {
        id: 'faq-9',
        question: 'Apakah bisa melakukan perbaikan di lokasi untuk perangkat elektronik?',
        answer: 'Ya, kami menyediakan layanan perbaikan di lokasi (on-site) untuk peralatan elektronik tertentu seperti AC, TV ukuran besar, kulkas, dan sebagainya. Untuk perangkat kecil seperti smartphone dan laptop, sebaiknya dibawa ke tempat service kami untuk penanganan yang lebih optimal.',
        category: 'electronic'
    },
    {
        id: 'faq-10',
        question: 'Apa yang terjadi jika perangkat tidak bisa diperbaiki?',
        answer: 'Jika setelah diagnosa ditemukan bahwa perangkat tidak dapat diperbaiki atau biaya perbaikan melebihi nilai perangkat, kami akan menginformasikan kondisi ini kepada Anda. Dalam hal ini, kami hanya akan mengenakan biaya diagnosa jika ada, atau menawarkan solusi alternatif seperti trade-in atau rekomendasi produk pengganti.',
        category: 'electronic'
    }
];

export const testimonials: Testimonial[] = [
    {
        id: 'testimonial-1',
        name: 'Anita Wijaya',
        role: 'Mahasiswa S1 Manajemen',
        content: 'Terima kasih suruhsuruh.id untuk bantuan skripsinya! Alhamdulillah skripsi saya disetujui dosen pembimbing dengan revisi minimal. Layanan konsultasi dan revisinya sangat membantu.',
        rating: 5,
        category: 'academic'
    },
    {
        id: 'testimonial-2',
        name: 'Budi Santoso',
        role: 'Mahasiswa S2 Teknik Informatika',
        content: 'Awalnya ragu menggunakan jasa pembuatan tesis, tapi ternyata hasilnya memuaskan. Metodologi penelitian yang digunakan tepat dan analisis datanya mendalam. Worth it!',
        rating: 5,
        category: 'academic'
    },
    {
        id: 'testimonial-3',
        name: 'Citra Purnama',
        role: 'Mahasiswa S1 Hukum',
        content: 'Slide presentasi yang dibuatkan sangat menarik dan informatif. Berkat ini, sidang skripsi saya berjalan lancar dan mendapat banyak pujian dari dosen penguji.',
        rating: 4,
        category: 'academic'
    },
    {
        id: 'testimonial-4',
        name: 'Deni Firmansyah',
        role: 'Fresh Graduate Ekonomi',
        content: 'Saya pakai jasa pembuatan CV dan portfolio untuk melamar kerja. Hasilnya profesional dan membuat CV saya menonjol. Berkat ini, saya berhasil dapat panggilan interview dari perusahaan impian.',
        rating: 5,
        category: 'academic'
    },
    {
        id: 'testimonial-5',
        name: 'Eka Pratiwi',
        role: 'Dosen',
        content: 'Menggunakan jasa pembuatan modul pembelajaran digital. Hasilnya sangat baik dan interaktif. Mahasiswa saya jadi lebih tertarik mengikuti materi perkuliahan.',
        rating: 5,
        category: 'academic'
    },
    {
        id: 'testimonial-6',
        name: 'Fajar Ramadhan',
        role: 'Karyawan Swasta',
        content: 'Laptop saya tiba-tiba mati total dan berisi data penting untuk pekerjaan. Berkat teknisi suruhsuruh.id, laptop bisa hidup kembali dan data-data penting berhasil diselamatkan.',
        rating: 5,
        category: 'electronic'
    },
    {
        id: 'testimonial-7',
        name: 'Gita Lestari',
        role: 'Ibu Rumah Tangga',
        content: 'AC di rumah sering mati sendiri dan tidak dingin. Setelah diperbaiki oleh teknisi suruhsuruh.id, AC kembali dingin dan hemat listrik. Pelayanannya juga ramah dan profesional.',
        rating: 4,
        category: 'electronic'
    },
    {
        id: 'testimonial-8',
        name: 'Hendra Gunawan',
        role: 'Pengusaha UMKM',
        content: 'Menggunakan jasa instalasi CCTV dan jaringan internet untuk toko. Sekarang pemantauan toko jadi lebih mudah dan koneksi internet stabil untuk transaksi online.',
        rating: 5,
        category: 'electronic'
    },
    {
        id: 'testimonial-9',
        name: 'Indah Permata',
        role: 'Content Creator',
        content: 'iPhone saya rusak parah karena jatuh. Banyak tempat service menolak untuk memperbaiki, tapi teknisi di suruhsuruh.id mampu memperbaikinya dengan harga yang masuk akal.',
        rating: 5,
        category: 'electronic'
    },
    {
        id: 'testimonial-10',
        name: 'Joko Widodo',
        role: 'Guru Sekolah',
        content: 'Upgrade PC lama jadi lebih kencang untuk mengajar online. Tim suruhsuruh.id memberikan rekomendasi upgrade yang tepat sesuai budget dan kebutuhan. Sangat puas dengan hasilnya!',
        rating: 4,
        category: 'electronic'
    }
];