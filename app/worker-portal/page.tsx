// src/app/worker-portal/page.tsx
"use client";

import React, { useState } from 'react';
import {
    ArrowUpRight,
    BarChart3,
    Bell,
    Calendar,
    CheckCircle2,
    Clock,
    DollarSign,
    FileText,
    HelpCircle,
    MoreVertical,
    Search,
    Settings,
    Star,
    User,
    MessageCircle,
    ClipboardList
} from 'lucide-react';
import { div } from 'framer-motion/client';
import WorkerLayout from "@/components/layout/WorkerLayout";

const WorkerDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Data dummy untuk dashboard
    const pendingJobs = [
        {
            id: 'JOB-2023-12-001',
            title: 'Perbaikan Laptop Dell XPS 13',
            customer: 'Ahmad Rizki',
            deadline: '2025-03-12',
            payment: 'DP 50% Diterima',
            priority: 'Tinggi',
            category: 'Elektronik',
            status: 'Menunggu Konfirmasi'
        },
        {
            id: 'JOB-2023-12-002',
            title: 'Laporan Keuangan Semester 1',
            customer: 'PT Maju Bersama',
            deadline: '2025-03-15',
            payment: 'DP 30% Diterima',
            priority: 'Menengah',
            category: 'Akademik',
            status: 'Menunggu Konfirmasi'
        },
    ];

    const activeJobs = [
        {
            id: 'JOB-2023-11-005',
            title: 'Perbaikan Monitor Samsung',
            customer: 'Budi Santoso',
            deadline: '2025-03-10',
            progress: 70,
            category: 'Elektronik',
            lastUpdated: '2 jam yang lalu'
        },
        {
            id: 'JOB-2023-11-008',
            title: 'Pembuatan Laporan Thesis Manajemen',
            customer: 'Siti Nurhaliza',
            deadline: '2025-03-20',
            progress: 45,
            category: 'Akademik',
            lastUpdated: '5 jam yang lalu'
        },
        {
            id: 'JOB-2023-11-010',
            title: 'Perbaikan AC Panasonic',
            customer: 'Tono Widodo',
            deadline: '2025-03-11',
            progress: 20,
            category: 'Elektronik',
            lastUpdated: '1 hari yang lalu'
        },
    ];

    const recentMessages = [
        {
            id: 'MSG-001',
            sender: 'Budi Santoso',
            preview: 'Apakah sudah ada perkembangan dengan monitor saya?',
            time: '10:35',
            unread: true,
            jobId: 'JOB-2023-11-005'
        },
        {
            id: 'MSG-002',
            sender: 'Siti Nurhaliza',
            preview: 'Tolong dikerjakan sesuai format yang saya kirim kemarin ya',
            time: '09:20',
            unread: false,
            jobId: 'JOB-2023-11-008'
        },
    ];

    const upcomingSchedule = [
        {
            id: 'SCH-001',
            title: 'Konsultasi Perbaikan Laptop',
            customer: 'Ahmad Rizki',
            time: '14:00 - 15:00',
            date: 'Hari ini'
        },
        {
            id: 'SCH-002',
            title: 'Tenggat Laporan Thesis',
            customer: 'Siti Nurhaliza',
            time: '23:59',
            date: '20 Mar 2025'
        },
    ];

    const earningsData = {
        thisMonth: 'Rp 4.500.000',
        pending: 'Rp 2.750.000',
        lastMonth: 'Rp 5.200.000',
        completedJobs: 8,
        cancelledJobs: 1,
        rating: 4.8
    };

    const warrantyRequests = [
        {
            id: 'WR-001',
            jobTitle: 'Perbaikan HP iPhone 11',
            customer: 'Diana Putri',
            requestDate: '05 Mar 2025',
            status: 'Perlu Ditanggapi',
            issue: 'HP kembali restart sendiri setelah perbaikan'
        }
    ];

    return (
        <WorkerLayout>
            {/* Main Content - Beranda/Overview */}
            <main className="container mx-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-secondary to-secondary-light rounded-xl p-6 shadow-card">
                        <div className="flex flex-col md:flex-row justify-between">
                            <div>
                                <h2 className="text-xl md:text-2xl font-display font-bold">Selamat Datang, Budi!</h2>
                                <p className="text-dark-textSecondary mt-2">
                                    Anda memiliki <span className="text-primary font-medium">{activeJobs.length}</span> pekerjaan aktif dan <span className="text-primary font-medium">{pendingJobs.length}</span> pekerjaan menunggu konfirmasi
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-button">
                                    Lihat Pekerjaan
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Pekerjaan Aktif */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-display font-bold text-lg">Pekerjaan Aktif</h3>
                                    <button className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1 transition-colors">
                                        Lihat Semua <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {activeJobs.map(job => (
                                        <div key={job.id} className="bg-lightGray rounded-lg p-4 border border-dark-border flex flex-col md:flex-row gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-base">{job.title}</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            Pelanggan: {job.customer}
                                                        </p>
                                                    </div>
                                                    <span className={`text-xs rounded-full px-2 py-1 ${
                                                        job.category === 'Elektronik'
                                                            ? 'bg-blue-900/30 text-blue-400'
                                                            : 'bg-purple-900/30 text-purple-400'
                                                    }`}>
                            {job.category}
                          </span>
                                                </div>

                                                <div className="mt-3">
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

                                            <div className="flex flex-row md:flex-col items-center justify-between md:justify-start gap-4 md:gap-2 text-sm">
                                                {/*<div className="flex items-center gap-1 text-amber-400">*/}
                                                {/*    <Clock className="h-4 w-4" />*/}
                                                {/*    <span>*/}
                                                {/*        {new Date(job.deadline) < new Date()*/}
                                                {/*            ? 'Terlambat'*/}
                                                {/*            : `${Math.ceil((new Date(job.deadline) - new Date()) / (1000 * 60 * 60 * 24))} hari`}*/}
                                                {/*      </span>*/}
                                                {/*</div>*/}
                                                <button className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-lg transition-colors">
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Permintaan Pekerjaan Baru */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-display font-bold text-lg">Permintaan Pekerjaan</h3>
                                    <button className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1 transition-colors">
                                        Lihat Semua <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {pendingJobs.map(job => (
                                        <div key={job.id} className="bg-lightGray rounded-lg p-4 border border-dark-border">
                                            <div className="flex flex-col md:flex-row justify-between">
                                                <div>
                                                    <h4 className="font-medium text-base">{job.title}</h4>
                                                    <p className="text-dark-textSecondary text-sm mt-1">
                                                        {job.customer} • {job.payment}
                                                    </p>
                                                    <div className="flex items-center gap-3 mt-3">
                            <span className={`text-xs rounded-full px-2 py-1 ${
                                job.category === 'Elektronik'
                                    ? 'bg-blue-900/30 text-blue-400'
                                    : 'bg-purple-900/30 text-purple-400'
                            }`}>
                              {job.category}
                            </span>
                                                        <span className={`text-xs rounded-full px-2 py-1 ${
                                                            job.priority === 'Tinggi'
                                                                ? 'bg-red-900/30 text-red-400'
                                                                : 'bg-amber-900/30 text-amber-400'
                                                        }`}>
                              Prioritas {job.priority}
                            </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mt-4 md:mt-0">
                                                    <button className="bg-dark-bg border border-dark-border hover:border-red-500 text-dark-textSecondary hover:text-red-500 px-4 py-2 rounded-lg transition-colors">
                                                        Tolak
                                                    </button>
                                                    <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors shadow-button">
                                                        Terima
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-dark-border">
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4 text-dark-textSecondary" />
                                                        <span>Tenggat: {new Date(job.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                    </div>
                                                    <button className="text-primary hover:text-primary-light flex items-center gap-1 transition-colors">
                                                        <FileText className="h-4 w-4" />
                                                        <span>Detail</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Status & Statistik */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4">
                                <h3 className="font-display font-bold text-lg mb-4">Statistik Bulan Ini</h3>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                        <p className="text-dark-textSecondary text-xs">Penghasilan</p>
                                        <p className="font-display font-bold text-lg mt-1">{earningsData.thisMonth}</p>
                                    </div>
                                    <div className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                        <p className="text-dark-textSecondary text-xs">Menunggu Pembayaran</p>
                                        <p className="font-display font-bold text-lg mt-1">{earningsData.pending}</p>
                                    </div>
                                    <div className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                        <p className="text-dark-textSecondary text-xs">Pekerjaan Selesai</p>
                                        <p className="font-display font-bold text-lg mt-1">{earningsData.completedJobs}</p>
                                    </div>
                                    <div className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                        <p className="text-dark-textSecondary text-xs">Rating</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <p className="font-display font-bold text-lg">{earningsData.rating}</p>
                                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pesan Terbaru */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-display font-bold text-lg">Pesan Terbaru</h3>
                                    <button className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1 transition-colors">
                                        Lihat Semua <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {recentMessages.map(message => (
                                        <div key={message.id} className="bg-lightGray rounded-lg p-3 border border-dark-border hover:border-primary flex items-start gap-3 cursor-pointer transition-colors">
                                            <div className="relative">
                                                <img
                                                    alt={message.sender}
                                                    className="h-10 w-10 rounded-full"
                                                />
                                                {message.unread && (
                                                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full border border-dark-card"></span>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between">
                                                    <h4 className="font-medium text-sm truncate">{message.sender}</h4>
                                                    <span className="text-dark-textSecondary text-xs">{message.time}</span>
                                                </div>
                                                <p className="text-dark-textSecondary text-xs mt-1 truncate">{message.preview}</p>
                                                <p className="text-primary text-xs mt-1">{
                                                    activeJobs.find(job => job.id === message.jobId)?.title ||
                                                    pendingJobs.find(job => job.id === message.jobId)?.title
                                                }</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Jadwal Mendatang */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-display font-bold text-lg">Jadwal Mendatang</h3>
                                    <button className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1 transition-colors">
                                        Kalender <Calendar className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {upcomingSchedule.map(schedule => (
                                        <div key={schedule.id} className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium text-sm">{schedule.title}</h4>
                                                <span className="text-primary text-xs font-medium">{schedule.date}</span>
                                            </div>
                                            <div className="flex justify-between mt-2 text-xs">
                                                <span className="text-dark-textSecondary">{schedule.customer}</span>
                                                <span className="text-dark-textSecondary">{schedule.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Permintaan Garansi */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-display font-bold text-lg">Permintaan Garansi</h3>
                                    <button className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1 transition-colors">
                                        Lihat Semua <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                </div>

                                {warrantyRequests.length > 0 ? (
                                    <div className="space-y-3">
                                        {warrantyRequests.map(warranty => (
                                            <div key={warranty.id} className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                                <div className="flex justify-between">
                                                    <h4 className="font-medium text-sm">{warranty.jobTitle}</h4>
                                                    <span className="text-red-400 text-xs bg-red-900/30 px-2 py-0.5 rounded-full">
                            {warranty.status}
                          </span>
                                                </div>
                                                <p className="text-dark-textSecondary text-xs mt-2">
                                                    {warranty.customer} • {warranty.requestDate}
                                                </p>
                                                <p className="text-xs mt-2 border-t border-dark-border pt-2">
                                                    "{warranty.issue}"
                                                </p>
                                                <div className="mt-3 flex justify-end gap-2">
                                                    <button className="bg-primary hover:bg-primary-dark text-white px-3 py-1 text-xs rounded-lg transition-colors">
                                                        Tanggapi
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-lightGray rounded-lg p-4 border border-dashed border-dark-border text-center">
                                        <CheckCircle2 className="h-8 w-8 mx-auto text-green-500" />
                                        <p className="text-dark-textSecondary mt-2">Tidak ada permintaan garansi saat ini</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </WorkerLayout>
    );
};

export default WorkerDashboard;