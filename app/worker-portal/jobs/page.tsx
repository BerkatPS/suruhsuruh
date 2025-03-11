// src/app/worker-portal/jobs/page.tsx
"use client";

import React, { useState } from 'react';
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Calendar,
    CheckCircle,
    ChevronDown,
    Clock,
    ClipboardList,
    Filter,
    MessageCircle,
    MoreHorizontal,
    Search,
    Sliders,
    Upload,
    XCircle
} from 'lucide-react';
import WorkerLayout from "@/components/layout/WorkerLayout";
import {router} from "next/client";

const JobsPage = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('deadline');
    const [filterModalOpen, setFilterModalOpen] = useState(false);

    // Data dummy untuk halaman pekerjaan
    const jobs = {
        active: [
            {
                id: 'JOB-2023-11-005',
                title: 'Perbaikan Monitor Samsung',
                customer: 'Budi Santoso',
                deadline: '2025-03-10',
                progress: 70,
                category: 'elektronik',
                lastUpdated: '2 jam yang lalu',
                price: 'Rp 750.000',
                description: 'Monitor Samsung 24" yang mengalami masalah display flickering dan terkadang mati sendiri. Sudah dilakukan diagnosis awal, kemungkinan masalah pada power supply unit.',
                messages: 3,
                priority: 'tinggi'
            },
            {
                id: 'JOB-2023-11-008',
                title: 'Pembuatan Laporan Thesis Manajemen',
                customer: 'Siti Nurhaliza',
                deadline: '2025-03-20',
                progress: 45,
                category: 'akademik',
                lastUpdated: '5 jam yang lalu',
                price: 'Rp 2.500.000',
                description: 'Penulisan thesis untuk jurusan Manajemen Bisnis dengan topik "Pengaruh Digitalisasi Terhadap UMKM di Masa Pandemi". Termasuk analisis data dan pembuatan grafik.',
                messages: 1,
                priority: 'menengah'
            },
            {
                id: 'JOB-2023-11-010',
                title: 'Perbaikan AC Panasonic',
                customer: 'Tono Widodo',
                deadline: '2025-03-11',
                progress: 20,
                category: 'elektronik',
                lastUpdated: '1 hari yang lalu',
                price: 'Rp 650.000',
                description: 'AC Panasonic 1PK yang tidak dingin dan mengeluarkan bunyi berisik. Kemungkinan perlu pembersihan dan penggantian freon.',
                messages: 0,
                priority: 'menengah'
            },
            {
                id: 'JOB-2023-11-012',
                title: 'Pembuatan Presentasi Marketing',
                customer: 'Dewi Anggraini',
                deadline: '2025-03-15',
                progress: 60,
                category: 'akademik',
                lastUpdated: '1 jam yang lalu',
                price: 'Rp 850.000',
                description: 'Pembuatan slide presentasi untuk rapat marketing perusahaan. Termasuk pembuatan grafik penjualan, analisis kompetitor, dan strategi marketing untuk Q2 2023.',
                messages: 2,
                priority: 'menengah'
            },
        ],
        pending: [
            {
                id: 'JOB-2023-12-001',
                title: 'Perbaikan Laptop Dell XPS 13',
                customer: 'Ahmad Rizki',
                deadline: '2025-03-12',
                payment: 'DP 50% Diterima',
                priority: 'tinggi',
                category: 'elektronik',
                status: 'Menunggu Konfirmasi',
                price: 'Rp 1.200.000',
                description: 'Laptop Dell XPS 13 yang mengalami blue screen dan restart terus menerus. Perlu diagnosa dan kemungkinan reinstall sistem operasi serta pengecekan hardware.'
            },
            {
                id: 'JOB-2023-12-002',
                title: 'Laporan Keuangan Semester 1',
                customer: 'PT Maju Bersama',
                deadline: '2025-03-15',
                payment: 'DP 30% Diterima',
                priority: 'menengah',
                category: 'akademik',
                status: 'Menunggu Konfirmasi',
                price: 'Rp 3.000.000',
                description: 'Pembuatan laporan keuangan semester 1 untuk PT Maju Bersama. Termasuk laporan laba rugi, neraca, dan arus kas dengan analisis kinerja keuangan perusahaan.'
            },
        ],
        completed: [
            {
                id: 'JOB-2023-10-001',
                title: 'Perbaikan TV LG 43"',
                customer: 'Hendra Gunawan',
                completedDate: '28 Feb 2025',
                category: 'elektronik',
                price: 'Rp 850.000',
                rating: 5,
                review: 'Sangat puas dengan hasilnya. TV kembali normal dan service cepat.'
            },
            {
                id: 'JOB-2023-10-002',
                title: 'Pembuatan Makalah Ekonomi Makro',
                customer: 'Rini Susanti',
                completedDate: '25 Feb 2025',
                category: 'akademik',
                price: 'Rp 650.000',
                rating: 4,
                review: 'Hasil baik, tetapi ada beberapa revisi kecil. Overall saya puas.'
            },
            {
                id: 'JOB-2023-09-015',
                title: 'Perbaikan Smartphone Xiaomi',
                customer: 'Dian Permata',
                completedDate: '20 Feb 2025',
                category: 'elektronik',
                price: 'Rp 550.000',
                rating: 5,
                review: 'Sangat profesional, cepat, dan hasil memuaskan. Terima kasih!'
            },
        ],
        cancelled: [
            {
                id: 'JOB-2023-09-010',
                title: 'Perbaikan Mesin Cuci Sharp',
                customer: 'Bambang Wijaya',
                cancelledDate: '15 Feb 2025',
                category: 'elektronik',
                price: 'Rp 700.000',
                reason: 'Pelanggan memutuskan untuk membeli mesin cuci baru'
            },
        ]
    };

    // Filter jobs berdasarkan kategori yang dipilih
    // @ts-ignore
    const filteredJobs = selectedCategory === 'all' ? jobs[activeTab] : jobs[activeTab].filter(job => job.category === selectedCategory);

    // Urutkan jobs berdasarkan pilihan
    const sortedJobs = [...filteredJobs].sort((a, b) => {
        if (sortBy === 'deadline') {
            // @ts-ignore
            return new Date(a.deadline || a.completedDate || a.cancelledDate) - new Date(b.deadline || b.completedDate || b.cancelledDate);
        } else if (sortBy === 'price') {
            return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
        } else if (sortBy === 'progress') {
            return (b.progress || 0) - (a.progress || 0);
        }
        return 0;
    });

    return (
        <WorkerLayout>
            {/* Header */}
            <header className="bg-secondary sticky top-0 z-10 border-b border-dark-border p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-display font-bold">Daftar Pekerjaan</h1>
                    <div className="flex items-center gap-3">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Cari pekerjaan..."
                                className="bg-lightGray rounded-xl py-2 px-4 pl-10 w-64 border border-dark-border focus:border-primary outline-none"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-textSecondary" />
                        </div>
                        <button
                            onClick={() => setFilterModalOpen(true)}
                            className="bg-lightGray p-2 rounded-lg border border-dark-border hover:border-primary transition-colors"
                        >
                            <Sliders className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex overflow-x-auto mt-4 -mb-0.5">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                            activeTab === 'active'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                        }`}
                    >
                        <span>Aktif</span>
                        <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">{jobs.active.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                            activeTab === 'pending'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                        }`}
                    >
                        <span>Menunggu</span>
                        <span className="bg-amber-900/30 text-amber-400 text-xs px-2 py-0.5 rounded-full">{jobs.pending.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                            activeTab === 'completed'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                        }`}
                    >
                        <span>Selesai</span>
                        <span className="bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded-full">{jobs.completed.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('cancelled')}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                            activeTab === 'cancelled'
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                        }`}
                    >
                        <span>Dibatalkan</span>
                        <span className="bg-red-900/30 text-red-400 text-xs px-2 py-0.5 rounded-full">{jobs.cancelled.length}</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4 md:p-6">
                {/* Filter dan Sort */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Filter className="h-4 w-4 text-dark-textSecondary" />
                            <span className="text-dark-textSecondary text-sm">Filter:</span>
                        </div>
                        <div className="flex">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-3 py-1 text-xs rounded-l-lg border ${
                                    selectedCategory === 'all'
                                        ? 'bg-primary/10 border-primary text-primary'
                                        : 'border-dark-border text-dark-textSecondary hover:text-white'
                                }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => setSelectedCategory('elektronik')}
                                className={`px-3 py-1 text-xs border-t border-b ${
                                    selectedCategory === 'elektronik'
                                        ? 'bg-primary/10 border-primary text-primary'
                                        : 'border-dark-border text-dark-textSecondary hover:text-white'
                                }`}
                            >
                                Elektronik
                            </button>
                            <button
                                onClick={() => setSelectedCategory('akademik')}
                                className={`px-3 py-1 text-xs rounded-r-lg border ${
                                    selectedCategory === 'akademik'
                                        ? 'bg-primary/10 border-primary text-primary'
                                        : 'border-dark-border text-dark-textSecondary hover:text-white'
                                }`}
                            >
                                Akademik
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-dark-textSecondary text-sm">Urutkan:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-lightGray border border-dark-border rounded-lg px-3 py-1.5 text-sm focus:border-primary outline-none"
                        >
                            <option value="deadline">Tenggat Waktu</option>
                            <option value="price">Harga</option>
                            <option value="progress">Progress</option>
                        </select>
                    </div>
                </div>

                {/* Job Cards */}
                <div className="space-y-4">
                    {sortedJobs.length > 0 ? (
                        sortedJobs.map(job => (
                            <div key={job.id} className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4 hover:border-primary transition-colors">
                                {/* Job Header - Active Jobs */}
                                {activeTab === 'active' && (
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-medium">{job.title}</h3>
                                                    <p className="text-dark-textSecondary text-sm mt-1">
                                                        {job.customer} • {job.id}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                          <span className={`text-xs rounded-full px-2 py-1 ${
                              job.category === 'elektronik'
                                  ? 'bg-blue-900/30 text-blue-400'
                                  : 'bg-purple-900/30 text-purple-400'
                          }`}>
                            {job.category === 'elektronik' ? 'Elektronik' : 'Akademik'}
                          </span>
                                                    <span className={`text-xs rounded-full px-2 py-1 ${
                                                        job.priority === 'tinggi'
                                                            ? 'bg-red-900/30 text-red-400'
                                                            : 'bg-amber-900/30 text-amber-400'
                                                    }`}>
                            Prioritas {job.priority === 'tinggi' ? 'Tinggi' : 'Menengah'}
                          </span>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-sm text-dark-textSecondary line-clamp-2">
                                                    {job.description}
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <div className="flex justify-between text-xs text-dark-textSecondary mb-1">
                                                    <span>Progress</span>
                                                    <span>{job.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary"
                                                        style={{ width: `${job.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row md:flex-col justify-between md:justify-start md:ml-6 mt-4 md:mt-0 gap-4 md:gap-2 md:min-w-36 md:text-right">
                                            <div>
                                                <p className="text-primary font-display font-bold">{job.price}</p>
                                                <div className="flex items-center gap-1 text-dark-textSecondary text-xs mt-1 justify-end">
                                                    <Clock className="h-3 w-3" />
                                                    <span>Update: {job.lastUpdated}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-1 text-xs md:justify-end">
                                                    <Calendar className="h-3 w-3" />
                                                    <span className={`${
                                                        new Date(job.deadline) < new Date()
                                                            ? 'text-red-500'
                                                            : 'text-dark-textSecondary'
                                                    }`}>
                            {new Date(job.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                                                </div>

                                                <div className="flex gap-2 md:justify-end">
                                                    {job.messages > 0 && (
                                                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                                                            {job.messages}
                            </span>
                                                    )}
                                                    <button onClick={() => router.push('/worker-portal/jobs/JOB-2023-11-010/progress')} className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded-lg text-xs transition-colors">
                                                        Update Progress
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Job Header - Pending Jobs */}
                                {activeTab === 'pending' && (
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-medium">{job.title}</h3>
                                                    <p className="text-dark-textSecondary text-sm mt-1">
                                                        {job.customer} • {job.id}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                          <span className={`text-xs rounded-full px-2 py-1 ${
                              job.category === 'elektronik'
                                  ? 'bg-blue-900/30 text-blue-400'
                                  : 'bg-purple-900/30 text-purple-400'
                          }`}>
                            {job.category === 'elektronik' ? 'Elektronik' : 'Akademik'}
                          </span>
                                                    <span className={`text-xs rounded-full px-2 py-1 ${
                                                        job.priority === 'tinggi'
                                                            ? 'bg-red-900/30 text-red-400'
                                                            : 'bg-amber-900/30 text-amber-400'
                                                    }`}>
                            Prioritas {job.priority === 'tinggi' ? 'Tinggi' : 'Menengah'}
                          </span>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-sm text-dark-textSecondary line-clamp-2">
                                                    {job.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3 mt-4">
                                                <div className="text-xs bg-amber-900/30 text-amber-400 px-2 py-1 rounded-lg">
                                                    {job.status}
                                                </div>
                                                <div className="text-xs text-dark-textSecondary">
                                                    {job.payment}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-row md:flex-col justify-between md:justify-start md:ml-6 mt-4 md:mt-0 gap-4 md:gap-2 md:min-w-36 md:text-right">
                                            <div>
                                                <p className="text-primary font-display font-bold">{job.price}</p>
                                                <div className="flex items-center gap-1 text-xs text-dark-textSecondary mt-1 justify-end">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>
                            {new Date(job.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 md:justify-end">
                                                <button className="bg-dark-bg border border-dark-border hover:border-red-500 text-dark-textSecondary hover:text-red-500 px-3 py-1 rounded-lg text-xs transition-colors">
                                                    Tolak
                                                </button>
                                                <button className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded-lg text-xs transition-colors">
                                                    Terima
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Job Header - Completed Jobs */}
                                {activeTab === 'completed' && (
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-medium">{job.title}</h3>
                                                    <p className="text-dark-textSecondary text-sm mt-1">
                                                        {job.customer} • {job.id}
                                                    </p>
                                                </div>
                                                <span className={`text-xs rounded-full px-2 py-1 ${
                                                    job.category === 'elektronik'
                                                        ? 'bg-blue-900/30 text-blue-400'
                                                        : 'bg-purple-900/30 text-purple-400'
                                                }`}>
                          {job.category === 'elektronik' ? 'Elektronik' : 'Akademik'}
                        </span>
                                            </div>

                                            <div className="mt-4 flex items-center gap-2">
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-lg flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Selesai
                        </span>
                                                <span className="text-xs text-dark-textSecondary">
                          {job.completedDate}
                        </span>
                                            </div>

                                            {job.review && (
                                                <div className="mt-3 text-sm text-dark-textSecondary border-t border-dark-border pt-3">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg
                                                                    key={i}
                                                                    className={`w-4 h-4 ${i < job.rating ? 'text-amber-400 fill-amber-400' : 'text-dark-border'}`}
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <span className="font-medium text-dark-text">{job.rating}.0</span>
                                                    </div>
                                                    <p className="italic">"{job.review}"</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-row md:flex-col justify-between md:justify-start md:ml-6 mt-4 md:mt-0 gap-4 md:gap-2 md:min-w-36 md:text-right">
                                            <div>
                                                <p className="text-primary font-display font-bold">{job.price}</p>
                                            </div>

                                            <button className="bg-secondary hover:bg-secondary-light text-white px-3 py-1 rounded-lg text-xs transition-colors md:self-end">
                                                Lihat Detail
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Job Header - Cancelled Jobs */}
                                {activeTab === 'cancelled' && (
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-medium">{job.title}</h3>
                                                    <p className="text-dark-textSecondary text-sm mt-1">
                                                        {job.customer} • {job.id}
                                                    </p>
                                                </div>
                                                <span className={`text-xs rounded-full px-2 py-1 ${
                                                    job.category === 'elektronik'
                                                        ? 'bg-blue-900/30 text-blue-400'
                                                        : 'bg-purple-900/30 text-purple-400'
                                                }`}>
                          {job.category === 'elektronik' ? 'Elektronik' : 'Akademik'}
                        </span>
                                            </div>

                                            <div className="mt-4 flex items-center gap-2">
                        <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded-lg flex items-center gap-1">
                          <XCircle className="h-3 w-3" />
                          Dibatalkan
                        </span>
                                                <span className="text-xs text-dark-textSecondary">
                          {job.cancelledDate}
                        </span>
                                            </div>

                                            {job.reason && (
                                                <div className="mt-3 text-sm text-dark-textSecondary border-t border-dark-border pt-3">
                                                    <p className="flex items-start gap-1">
                                                        <AlertCircle className="h-4 w-4 text-red-400 mt-0.5" />
                                                        <span>{job.reason}</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-row md:flex-col justify-between md:justify-start md:ml-6 mt-4 md:mt-0 gap-4 md:gap-2 md:min-w-36 md:text-right">
                                            <div>
                                                <p className="text-primary font-display font-bold">{job.price}</p>
                                            </div>

                                            <button className="bg-secondary hover:bg-secondary-light text-white px-3 py-1 rounded-lg text-xs transition-colors md:self-end">
                                                Lihat Detail
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bg-dark-card rounded-xl border border-dashed border-dark-border p-8 text-center">
                            <div className="bg-lightGray h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                                <ClipboardList className="h-8 w-8 text-dark-textSecondary" />
                            </div>
                            <h3 className="font-medium mt-4">Tidak ada pekerjaan ditemukan</h3>
                            <p className="text-dark-textSecondary text-sm mt-2">
                                {activeTab === 'active' && 'Anda belum memiliki pekerjaan aktif saat ini.'}
                                {activeTab === 'pending' && 'Tidak ada permintaan pekerjaan yang menunggu konfirmasi.'}
                                {activeTab === 'completed' && 'Anda belum memiliki pekerjaan yang telah diselesaikan.'}
                                {activeTab === 'cancelled' && 'Tidak ada pekerjaan yang dibatalkan.'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {sortedJobs.length > 0 && (
                    <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-1">
                            <button className="bg-dark-card border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-3 py-2 rounded-lg transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                            </button>
                            <button className="bg-primary text-white px-4 py-2 rounded-lg">
                                1
                            </button>
                            <button className="bg-dark-card border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-4 py-2 rounded-lg transition-colors">
                                2
                            </button>
                            <button className="bg-dark-card border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-4 py-2 rounded-lg transition-colors">
                                3
                            </button>
                            <span className="px-2 text-dark-textSecondary">...</span>
                            <button className="bg-dark-card border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-4 py-2 rounded-lg transition-colors">
                                10
                            </button>
                            <button className="bg-dark-card border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-3 py-2 rounded-lg transition-colors">
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Filter Modal */}
            {filterModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-dark-card rounded-xl shadow-card border border-dark-border w-full max-w-md p-6 m-4">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-display font-bold text-lg">Filter Pekerjaan</h3>
                            <button
                                onClick={() => setFilterModalOpen(false)}
                                className="text-dark-textSecondary hover:text-white"
                            >
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="text-sm font-medium mb-2 block">Kategori</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button className="bg-primary/10 border border-primary text-primary px-3 py-2 rounded-lg text-sm">
                                        Semua
                                    </button>
                                    <button className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-white px-3 py-2 rounded-lg text-sm transition-colors">
                                        Elektronik
                                    </button>
                                    <button className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-white px-3 py-2 rounded-lg text-sm transition-colors">
                                        Akademik
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Status</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="bg-primary/10 border border-primary text-primary px-3 py-2 rounded-lg text-sm">
                                        Semua Status
                                    </button>
                                    <button className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-white px-3 py-2 rounded-lg text-sm transition-colors">
                                        Mendesak
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Prioritas</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button className="bg-primary/10 border border-primary text-primary px-3 py-2 rounded-lg text-sm">
                                        Semua
                                    </button>
                                    <button className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-white px-3 py-2 rounded-lg text-sm transition-colors">
                                        Tinggi
                                    </button>
                                    <button className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-white px-3 py-2 rounded-lg text-sm transition-colors">
                                        Menengah
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Rentang Harga</label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder="Min"
                                            className="bg-dark-bg border border-dark-border rounded-lg py-2 px-3 w-full focus:border-primary outline-none"
                                        />
                                        <span className="absolute left-3 top-2.5 text-dark-textSecondary">Rp</span>
                                    </div>
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder="Max"
                                            className="bg-dark-bg border border-dark-border rounded-lg py-2 px-3 w-full focus:border-primary outline-none"
                                        />
                                        <span className="absolute left-3 top-2.5 text-dark-textSecondary">Rp</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Rentang Tanggal</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="date"
                                        className="bg-dark-bg border border-dark-border rounded-lg py-2 px-3 w-full focus:border-primary outline-none"
                                    />
                                    <input
                                        type="date"
                                        className="bg-dark-bg border border-dark-border rounded-lg py-2 px-3 w-full focus:border-primary outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setFilterModalOpen(false)}
                                className="flex-1 bg-dark-bg border border-dark-border hover:border-red-500 text-dark-textSecondary hover:text-red-500 px-4 py-2.5 rounded-lg transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => setFilterModalOpen(false)}
                                className="flex-1 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg transition-colors shadow-button"
                            >
                                Terapkan Filter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </WorkerLayout>
    );
};

export default JobsPage;