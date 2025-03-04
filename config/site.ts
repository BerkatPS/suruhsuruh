import { ServiceItem, ServiceFeature, Testimonial, FAQ, WorkStep, ThemeConfig } from "@/types";

export const siteConfig = {
    name: "suruhsuruh",
    url: "https://suruhsuruh.com",
    description: "Layanan jasa pengerjaan tugas akademik dan perbaikan elektronik terpercaya",
    ogImage: "https://suruhsuruh.com/og-image.jpg",
    links: {
        twitter: "https://twitter.com/suruhsuruh",
        instagram: "https://instagram.com/suruhsuruh",
        facebook: "https://facebook.com/suruhsuruh",
        whatsapp: "https://wa.me/6281234567890",
    },
    contact: {
        email: "info@suruhsuruh.com",
        phone: "+6281234567890",
        whatsapp: "+6281234567890",
    },
};

export const themeConfig: ThemeConfig = {
    mainNav: [
        {
            title: "Beranda",
            href: "/",
        },
        {
            title: "Layanan",
            href: "/#layanan",
        },
        {
            title: "Cara Kerja",
            href: "/#cara-kerja",
        },
        {
            title: "Testimoni",
            href: "/#testimoni",
        },
        {
            title: "FAQ",
            href: "/#faq",
        },
    ],
    footerNav: [
        {
            section: "Layanan",
            items: [
                {
                    title: "Jasa Akademik",
                    href: "/layanan/akademik",
                },
                {
                    title: "Jasa Elektronik",
                    href: "/layanan/elektronik",
                },
                {
                    title: "Harga",
                    href: "/harga",
                },
            ],
        },
        {
            section: "Perusahaan",
            items: [
                {
                    title: "Tentang Kami",
                    href: "/tentang",
                },
                {
                    title: "Kontak",
                    href: "/kontak",
                },
                {
                    title: "Karir",
                    href: "/karir",
                },
            ],
        },
        {
            section: "Legal",
            items: [
                {
                    title: "Syarat & Ketentuan",
                    href: "/syarat-ketentuan",
                },
                {
                    title: "Kebijakan Privasi",
                    href: "/kebijakan-privasi",
                },
                {
                    title: "Disclaimer",
                    href: "/disclaimer",
                },
            ],
        },
    ],
};

export const services: ServiceItem[] = [
    {
        id: "skripsi",
        title: "Pengerjaan Skripsi & Tugas Akhir",
        description: "Bantuan penulisan skripsi, tesis, disertasi, dan tugas akhir dengan kualitas terbaik sesuai standar akademik.",
        icon: "graduation-cap",
        category: "academic",
    },
    {
        id: "coding",
        title: "Pemrograman & Informatika",
        description: "Layanan pembuatan aplikasi, website, dan solusi IT sesuai kebutuhan Anda.",
        icon: "computer",
        category: "academic",
    },
    {
        id: "tugas-kuliah",
        title: "Tugas Kuliah & Makalah",
        description: "Pengerjaan tugas kuliah, makalah, esai, review jurnal dan berbagai bentuk tugas akademik lainnya.",
        icon: "document-text",
        category: "academic",
    },
    {
        id: "laporan",
        title: "Laporan Praktikum & Penelitian",
        description: "Penulisan laporan praktikum, laporan kerja lapangan, dan laporan penelitian dengan format standar.",
        icon: "clipboard-document-list",
        category: "academic",
    },
    {
        id: "presentasi",
        title: "Presentasi & Media Pembelajaran",
        description: "Pembuatan slide presentasi, media pembelajaran interaktif, dan material pendukung perkuliahan.",
        icon: "presentation-chart-bar",
        category: "academic",
    },
    {
        id: "perbaikan-gadget",
        title: "Perbaikan Smartphone & Laptop",
        description: "Layanan service profesional untuk perbaikan smartphone, laptop, dan berbagai perangkat digital lainnya.",
        icon: "device-phone-mobile",
        category: "electronic",
    },
    {
        id: "perangkat-rumah",
        title: "Service Peralatan Rumah Tangga",
        description: "Perbaikan elektronik rumah tangga seperti TV, AC, kulkas, mesin cuci, dan perangkat lainnya.",
        icon: "home-modern",
        category: "electronic",
    },
    {
        id: "instalasi-jaringan",
        title: "Instalasi & Perbaikan Jaringan",
        description: "Pemasangan, perbaikan, dan optimasi jaringan internet dan sistem keamanan untuk rumah atau kantor.",
        icon: "signal",
        category: "electronic",
    },
    {
        id: "maintenance",
        title: "Upgrade & Maintenance Perangkat",
        description: "Layanan upgrade komponen, maintenance rutin, dan optimasi performa perangkat elektronik Anda.",
        icon: "wrench-screwdriver",
        category: "electronic",
    },
];

export const features: ServiceFeature[] = [
    {
        id: "terpercaya",
        title: "Terpercaya",
        description: "Tim ahli yang terpercaya dengan pengalaman bertahun-tahun di bidangnya.",
        icon: "shield-check",
    },
    {
        id: "tepat-waktu",
        title: "Tepat Waktu",
        description: "Kami berkomitmen menyelesaikan setiap pekerjaan sesuai deadline yang disepakati.",
        icon: "clock",
    },
    {
        id: "harga-terjangkau",
        title: "Harga Terjangkau",
        description: "Harga yang dapat dinegosiasikan dan sesuai dengan kualitas yang diberikan.",
        icon: "currency-dollar",
    },
    {
        id: "garansi",
        title: "Garansi Revisi",
        description: "Kami memberikan garansi revisi untuk memastikan Anda puas dengan hasil pekerjaan.",
        icon: "check-badge",
    },
];

export const testimonials: Testimonial[] = [
    {
        id: "testimonial-1",
        name: "Andi Prasetyo",
        role: "Mahasiswa S1",
        content: "Saya sangat terbantu dengan jasa suruhsuruh. Tugas akhir saya diselesaikan tepat waktu dengan kualitas yang sangat baik.",
        rating: 5,
        category: "academic",
        // image: "/testimonials/person-1.jpg",
    },
    {
        id: "testimonial-2",
        name: "Budi Santoso",
        role: "Karyawan Swasta",
        content: "Laptop saya yang rusak berat berhasil diperbaiki dengan cepat dan biaya yang terjangkau. Teknisinya sangat profesional.",
        rating: 5,
        category: "electronic",
        // image: "/testimonials/person-2.jpg",
    },
    {
        id: "testimonial-3",
        name: "Citra Wulandari",
        role: "Mahasiswa S2",
        content: "Laporan praktikum saya diselesaikan dengan sangat baik. Komunikasi dengan tim sangat lancar dan proses revisi sangat cepat.",
        rating: 5,
        category: "academic",
        // image: "/testimonials/person-3.jpg",
    },
    {
        id: "testimonial-4",
        name: "Deni Kurniawan",
        role: "Pengusaha",
        content: "Instalasi jaringan di kantor saya berjalan lancar dan hasilnya sangat memuaskan. Koneksi internet menjadi lebih stabil.",
        rating: 5,
        category: "electronic",
        // image: "/testimonials/person-4.jpg",
    },
];

export const faqs: FAQ[] = [
    {
        id: "faq-1",
        question: "Berapa lama waktu pengerjaan tugas akademik?",
        answer: "Waktu pengerjaan bervariasi tergantung kompleksitas tugas. Untuk tugas sederhana, biasanya 1-3 hari. Untuk skripsi atau tugas akhir, bisa 1-4 minggu. Kami akan memberikan estimasi waktu setelah mendiskusikan detail pekerjaan.",
        category: "academic",
    },
    {
        id: "faq-2",
        question: "Bagaimana sistem pembayaran untuk jasa akademik?",
        answer: "Kami menggunakan sistem Down Payment (DP) sebesar 50% di awal sebagai komitmen, kemudian pelunasan setelah pekerjaan selesai dan Anda puas dengan hasilnya.",
        category: "academic",
    },
    {
        id: "faq-3",
        question: "Berapa kali revisi yang diberikan untuk jasa akademik?",
        answer: "Kami menyediakan revisi hingga 3 kali atau sampai klien puas dengan hasil pekerjaan, dengan batasan wajar yang akan didiskusikan saat negosiasi.",
        category: "academic",
    },
    {
        id: "faq-4",
        question: "Apakah ada garansi untuk jasa perbaikan elektronik?",
        answer: "Ya, kami memberikan garansi untuk perbaikan elektronik selama 30 hari. Jika dalam masa garansi terjadi masalah yang sama, kami akan memperbaikinya tanpa biaya tambahan.",
        category: "electronic",
    },
    {
        id: "faq-5",
        question: "Bagaimana jika barang elektronik tidak bisa diperbaiki?",
        answer: "Jika barang tidak dapat diperbaiki, kami hanya akan mengenakan biaya diagnosa sesuai kesepakatan awal. Kami juga akan memberikan rekomendasi tentang langkah selanjutnya yang bisa diambil.",
        category: "electronic",
    },
    {
        id: "faq-6",
        question: "Berapa lama waktu perbaikan elektronik?",
        answer: "Waktu perbaikan bervariasi tergantung jenis kerusakan. Perbaikan ringan biasanya membutuhkan waktu 1-2 hari, sedangkan kerusakan berat bisa memakan waktu 3-7 hari atau lebih.",
        category: "electronic",
    },
];

export const workSteps: WorkStep[] = [
    {
        id: "step-1",
        title: "Pesan Layanan",
        description: "Isi formulir pemesanan dengan detail masalah dan informasi kontak Anda.",
        icon: "clipboard-document-list",
        step: 1,
    },
    {
        id: "step-2",
        title: "Diskusi & Negosiasi",
        description: "Tim kami akan menghubungi Anda untuk membahas detail pekerjaan dan negosiasi harga.",
        icon: "chat-bubble-left-right",
        step: 2,
    },
    {
        id: "step-3",
        title: "Pembayaran DP",
        description: "Lakukan pembayaran Down Payment untuk memulai proses pengerjaan.",
        icon: "banknotes",
        step: 3,
    },
    {
        id: "step-4",
        title: "Terima Hasil",
        description: "Terima hasil pekerjaan, berikan feedback, dan lakukan pelunasan pembayaran.",
        icon: "check-circle",
        step: 4,
    },
];