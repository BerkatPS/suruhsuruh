// app/admin/statistik/page.tsx
"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';

// RevenueChart Component (Placeholder)
const RevenueChart = () => {
    return (
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-dark-text mb-4">Pendapatan Bulanan</h2>
            <div className="h-64 flex items-center justify-center">
                <p className="text-dark-textSecondary">Grafik pendapatan bulanan akan ditampilkan di sini</p>
            </div>
        </div>
    );
};

// OrdersChart Component (Placeholder)
const OrdersChart = () => {
    return (
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-dark-text mb-4">Pesanan Bulanan</h2>
            <div className="h-64 flex items-center justify-center">
                <p className="text-dark-textSecondary">Grafik pesanan bulanan akan ditampilkan di sini</p>
            </div>
        </div>
    );
};

// TopCategories Component
const TopCategories = ({ categories }: { categories: any[] }) => {
    // Format angka ke format Rupiah
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark-text mb-4">Kategori Terpopuler</h2>
            <div className="space-y-4">
                {categories.map((category, index) => (
                    <div key={index} className="flex items-center">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${
                            category.category === 'akademik'
                                ? 'bg-blue-500/10 text-blue-500'
                                : 'bg-green-500/10 text-green-500'
                        } flex items-center justify-center`}>
                            {category.category === 'akademik' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-4 flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-medium text-dark-text">{category.name}</h3>
                                    <p className="text-xs text-dark-textSecondary">{category.category === 'akademik' ? 'Akademik' : 'Elektronik'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-dark-text">{formatRupiah(category.revenue)}</p>
                                    <p className="text-xs text-dark-textSecondary">{category.orders} pesanan</p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="w-full bg-dark-bg rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${
                                            category.category === 'akademik' ? 'bg-blue-500' : 'bg-green-500'
                                        }`}
                                        style={{ width: `${category.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// TopWorkers Component
const TopWorkers = ({ workers }: { workers: any[] }) => {
    return (
        <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark-text mb-4">Worker Top</h2>
            <div className="space-y-4">
                {workers.map((worker, index) => (
                    <div key={index} className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-medium">{worker.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4 flex-1">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-medium text-dark-text">{worker.name}</h3>
                                    <p className="text-xs text-dark-textSecondary">{worker.specialty}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center text-sm text-dark-text">
                                        <span className="font-medium">{worker.rating}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs text-dark-textSecondary">{worker.completedTasks} tugas selesai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// CustomerGrowth Component (Placeholder)
const CustomerGrowth = () => {
    return (
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-dark-text mb-4">Pertumbuhan Pelanggan</h2>
            <div className="h-64 flex items-center justify-center">
                <p className="text-dark-textSecondary">Grafik pertumbuhan pelanggan akan ditampilkan di sini</p>
            </div>
        </div>
    );
};

// ReportExport Component
const ReportExport = () => {
    const [reportType, setReportType] = useState('revenue');
    const [dateRange, setDateRange] = useState('month');
    const [format, setFormat] = useState('excel');

    return (
        <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-dark-text mb-4">Export Laporan</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="reportType" className="block text-sm font-medium text-dark-text mb-2">
                        Jenis Laporan
                    </label>
                    <select
                        id="reportType"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                        <option value="revenue">Laporan Pendapatan</option>
                        <option value="orders">Laporan Pesanan</option>
                        <option value="customers">Laporan Pelanggan</option>
                        <option value="workers">Laporan Worker</option>
                        <option value="services">Laporan Layanan</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="dateRange" className="block text-sm font-medium text-dark-text mb-2">
                        Periode
                    </label>
                    <select
                        id="dateRange"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                        <option value="today">Hari Ini</option>
                        <option value="week">Minggu Ini</option>
                        <option value="month">Bulan Ini</option>
                        <option value="quarter">Kuartal Ini</option>
                        <option value="year">Tahun Ini</option>
                        <option value="custom">Kustom</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="format" className="block text-sm font-medium text-dark-text mb-2">
                        Format File
                    </label>
                    <select
                        id="format"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                        <option value="excel">Excel (.xlsx)</option>
                        <option value="csv">CSV (.csv)</option>
                        <option value="pdf">PDF (.pdf)</option>
                    </select>
                </div>

                <button className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Generate & Download</span>
                </button>
            </div>
        </div>
    );
};

export default function StatisticsPage() {
    const [dateRange, setDateRange] = useState// Lanjutan kode untuk app/admin/statistik/page.tsx
        ('month');

    // Format angka ke format Rupiah
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Data dummy statistik
    const stats = [
        {
            title: 'Total Pendapatan',
            value: formatRupiah(245000000),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'green',
        },
        {
            title: 'Total Pesanan',
            value: '1,248',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            color: 'blue',
        },
        {
            title: 'Total Pelanggan',
            value: '756',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            color: 'purple',
        },
        {
            title: 'Worker Aktif',
            value: '58',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'amber',
        },
    ];

    // Data dummy kategori terpopuler
    const topCategories = [
        {
            name: 'Penulisan Skripsi',
            category: 'akademik',
            revenue: 87500000,
            orders: 48,
            percentage: 75,
        },
        {
            name: 'Perbaikan Laptop',
            category: 'elektronik',
            revenue: 62300000,
            orders: 108,
            percentage: 65,
        },
        {
            name: 'Penulisan Tesis',
            category: 'akademik',
            revenue: 42900000,
            orders: 22,
            percentage: 45,
        },
        {
            name: 'Perbaikan Smartphone',
            category: 'elektronik',
            revenue: 39600000,
            orders: 142,
            percentage: 40,
        },
        {
            name: 'Penulisan Makalah',
            category: 'akademik',
            revenue: 12700000,
            orders: 89,
            percentage: 20,
        },
    ];

    // Data dummy worker top
    const topWorkers = [
        {
            name: 'Rudi Hartono',
            specialty: 'Skripsi - Teknik',
            rating: 4.8,
            completedTasks: 24,
        },
        {
            name: 'Fajar Pratama',
            specialty: 'Skripsi - Ekonomi',
            rating: 4.9,
            completedTasks: 31,
        },
        {
            name: 'Dina Maulida',
            specialty: 'Elektronik - Laptop',
            rating: 4.6,
            completedTasks: 18,
        },
        {
            name: 'Laras Ayu',
            specialty: 'Elektronik - Smartphone',
            rating: 4.7,
            completedTasks: 15,
        },
        {
            name: 'Bima Sakti',
            specialty: 'Skripsi - Hukum',
            rating: 4.5,
            completedTasks: 12,
        },
    ];

    return (
        <AdminLayout title="Statistik & Laporan">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-dark-text">Statistik & Laporan</h1>
                        <p className="text-dark-textSecondary">Analisis performa platform dan buat laporan</p>
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                        >
                            <option value="today">Hari Ini</option>
                            <option value="week">Minggu Ini</option>
                            <option value="month">Bulan Ini</option>
                            <option value="year">Tahun Ini</option>
                        </select>
                        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            <span>Refresh Data</span>
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            color={"green"}
                        />
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RevenueChart />
                    <OrdersChart />
                </div>

                {/* Categories and Workers */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TopCategories categories={topCategories} />
                    <TopWorkers workers={topWorkers} />
                </div>

                {/* Customer Growth and Export */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CustomerGrowth />
                    <ReportExport />
                </div>
            </div>
        </AdminLayout>
    );
}