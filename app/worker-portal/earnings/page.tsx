// src/app/worker-portal/earnings/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowDownToLine,
    ArrowUpRight,
    CheckCircle,
    ChevronDown,
    Clock,
    CreditCard,
    DollarSign,
    Download, Edit2,
    HelpCircle,
    Info,
    MoreVertical, Plus,
    Search,
    SlidersHorizontal, Trash2,
    Wallet
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import WorkerLayout from '@/components/layout/WorkerLayout';

// Interfaces for type-safety
interface Transaction {
    id: string;
    date: string;
    amount: number;
    type: 'in' | 'out';
    category: 'job_payment' | 'withdrawal' | 'refund' | 'fee';
    description: string;
    status: 'completed' | 'pending' | 'failed';
    jobId?: string;
    jobTitle?: string;
    customer?: string;
}

interface EarningPeriod {
    period: string;
    total: number;
    count: number;
    data: {
        date: string;
        amount: number;
    }[];
}

interface BankAccount {
    id: string;
    bank: string;
    accountNumber: string;
    accountName: string;
    isDefault: boolean;
}

interface PaymentStats {
    totalEarnings: number;
    pendingPayments: number;
    withdrawnAmount: number;
    completedJobs: number;
    averageRating: number;
}

const EarningsPage: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'payout'>('overview');
    const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [transactionTypeFilter, setTransactionTypeFilter] = useState<string>('all');
    const [filteredTransactions] = useState<Transaction[]>([]);

    // Data dummy untuk halaman earnings
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    // const getThisMonthRange = () => {
    //     const now = new Date();
    //     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    //     const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    //     return {
    //         start: startOfMonth.toISOString().split('T')[0],
    //         end: endOfMonth.toISOString().split('T')[0]
    //     };
    // };
    //
    // const getLastMonthRange = () => {
    //     const now = new Date();
    //     const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    //     const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    //     return {
    //         start: startOfLastMonth.toISOString().split('T')[0],
    //         end: endOfLastMonth.toISOString().split('T')[0]
    //     };
    // };


    // Data statistik pendapatan
    const paymentStats: PaymentStats = {
        totalEarnings: 12450000, // dalam rupiah
        pendingPayments: 2750000,
        withdrawnAmount: 9200000, // dalam rupiah
        completedJobs: 28,
        averageRating: 4.8
    };

    // Data transaksi (pendapatan dan penarikan)
    const transactions: Transaction[] = [
        {
            id: 'trx-001',
            date: '2025-03-05',
            amount: 750000,
            type: 'in',
            category: 'job_payment',
            description: 'Pembayaran pekerjaan - Perbaikan Monitor Samsung',
            status: 'completed',
            jobId: 'JOB-2023-11-005',
            jobTitle: 'Perbaikan Monitor Samsung',
            customer: 'Budi Santoso'
        },
        {
            id: 'trx-002',
            date: '2025-03-04',
            amount: 2500000,
            type: 'in',
            category: 'job_payment',
            description: 'Pembayaran pekerjaan - Pembuatan Laporan Thesis Manajemen',
            status: 'completed',
            jobId: 'JOB-2023-11-008',
            jobTitle: 'Pembuatan Laporan Thesis Manajemen',
            customer: 'Siti Nurhaliza'
        },
        {
            id: 'trx-003',
            date: '2025-03-03',
            amount: 3000000,
            type: 'out',
            category: 'withdrawal',
            description: 'Penarikan ke BCA ****1234',
            status: 'completed'
        },
        {
            id: 'trx-004',
            date: '2025-03-02',
            amount: 650000,
            type: 'in',
            category: 'job_payment',
            description: 'Pembayaran pekerjaan - Perbaikan AC Panasonic',
            status: 'completed',
            jobId: 'JOB-2023-11-010',
            jobTitle: 'Perbaikan AC Panasonic',
            customer: 'Tono Widodo'
        },
        {
            id: 'trx-005',
            date: '2025-03-01',
            amount: 850000,
            type: 'in',
            category: 'job_payment',
            description: 'Pembayaran pekerjaan - Pembuatan Presentasi Marketing',
            status: 'completed',
            jobId: 'JOB-2023-11-012',
            jobTitle: 'Pembuatan Presentasi Marketing',
            customer: 'Dewi Anggraini'
        },
        {
            id: 'trx-006',
            date: '2025-02-28',
            amount: 850000,
            type: 'in',
            category: 'job_payment',
            description: 'Pembayaran pekerjaan - Perbaikan TV LG 43"',
            status: 'completed',
            jobId: 'JOB-2023-10-001',
            jobTitle: 'Perbaikan TV LG 43"',
            customer: 'Hendra Gunawan'
        },
        {
            id: 'trx-007',
            date: '2025-02-25',
            amount: 650000,
            type: 'in',
            category: 'job_payment',
            description: 'Pembayaran pekerjaan - Pembuatan Makalah Ekonomi Makro',
            status: 'completed',
            jobId: 'JOB-2023-10-002',
            jobTitle: 'Pembuatan Makalah Ekonomi Makro',
            customer: 'Rini Susanti'
        },
        {
            id: 'trx-008',
            date: '2025-02-20',
            amount: 550000,
            type: 'in',
            category: 'job_payment',
            description: 'Pembayaran pekerjaan - Perbaikan Smartphone Xiaomi',
            status: 'completed',
            jobId: 'JOB-2023-09-015',
            jobTitle: 'Perbaikan Smartphone Xiaomi',
            customer: 'Dian Permata'
        },
        {
            id: 'trx-009',
            date: '2025-02-15',
            amount: 4500000,
            type: 'out',
            category: 'withdrawal',
            description: 'Penarikan ke Mandiri ****5678',
            status: 'completed'
        },
        {
            id: 'trx-010',
            date: '2025-03-07',
            amount: 1200000,
            type: 'in',
            category: 'job_payment',
            description: 'Pembayaran pekerjaan - Perbaikan Laptop Dell XPS 13',
            status: 'pending',
            jobId: 'JOB-2023-12-001',
            jobTitle: 'Perbaikan Laptop Dell XPS 13',
            customer: 'Ahmad Rizki'
        }
    ];

    // Data bank account
    const bankAccounts: BankAccount[] = [
        {
            id: 'bank-001',
            bank: 'BCA',
            accountNumber: '1234567890',
            accountName: 'Budi Setiawan',
            isDefault: true
        },
        {
            id: 'bank-002',
            bank: 'Mandiri',
            accountNumber: '9876543210',
            accountName: 'Budi Setiawan',
            isDefault: false
        }
    ];

    // Filter transactions based on search and type filter
    // useEffect(() => {
    //     let filtered = [...transactions];
    //
    //     // Apply search filter
    //     if (searchQuery) {
    //         filtered = filtered.filter(transaction =>
    //             transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             (transaction.jobTitle && transaction.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //             (transaction.customer && transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()))
    //         );
    //     }
    //
    //     // Apply type filter
    //     if (transactionTypeFilter !== 'all') {
    //         if (transactionTypeFilter === 'in' || transactionTypeFilter === 'out') {
    //             filtered = filtered.filter(transaction => transaction.type === transactionTypeFilter);
    //         } else if (transactionTypeFilter === 'pending') {
    //             filtered = filtered.filter(transaction => transaction.status === 'pending');
    //         }
    //     }
    //
    //     setFilteredTransactions(filtered);
    // }, [searchQuery, transactionTypeFilter, transactions]);
    //
    // // Initialize filtered transactions
    // useEffect(() => {
    //     setFilteredTransactions(transactions);
    // }, [transactions]);

    // Format currency for display
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Format date for display
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Generate data for monthly earnings chart
    const generateMonthlyEarningsData = (): EarningPeriod => {
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();

        const daysInMonth = new Date(thisYear, thisMonth + 1, 0).getDate();

        const data = [];
        let total = 0;
        let count = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(thisYear, thisMonth, day);
            const dateString = date.toISOString().split('T')[0];

            // Get transactions for this day
            const dayTransactions = transactions.filter(t => {
                const transactionDate = t.date.split('T')[0];
                return (
                    transactionDate === dateString &&
                    t.type === 'in' &&
                    t.status === 'completed'
                );
            });

            const dayTotal = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
            total += dayTotal;

            if (dayTransactions.length > 0) {
                count += dayTransactions.length;
            }

            data.push({
                date: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
                amount: dayTotal || Math.floor(Math.random() * 300000) + 50000 // Ensure we have some data for demonstration
            });
        }

        return {
            period: `${months[thisMonth]} ${thisYear}`,
            total,
            count,
            data
        };
    };

    // Generate data for earnings by category chart
    const generateEarningsByCategoryData = () => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];

        return monthNames.map(month => {
            return {
                name: month,
                Elektronik: Math.floor(Math.random() * 5000000) + 1000000,
                Akademik: Math.floor(Math.random() * 4000000) + 1000000
            };
        });
    };

    // Monthly earnings data
    const monthlyEarnings = generateMonthlyEarningsData();

    // Earnings by category data
    const earningsByCategoryData = generateEarningsByCategoryData();

    // Monthly summary data
    const monthlySummaryData = [
        {
            month: 'Januari',
            total: 5800000,
            jobs: 7
        },
        {
            month: 'Februari',
            total: 7600000,
            jobs: 9
        },
        {
            month: 'Maret',
            total: 4750000,
            jobs: 5
        }
    ];

    // Custom tooltip formatter for the area chart
    // const areaChartTooltipFormatter = (value: number) => {
    //     return [formatCurrency(value), 'Penghasilan'];
    // };

    // Custom YAxis formatter for the area chart
    // const areaChartYAxisFormatter = (value: number) => {
    //     if (value >= 1000000) {
    //         return `Rp${(value / 1000000).toFixed(1)}Jt`;
    //     } else if (value >= 1000) {
    //         return `Rp${(value / 1000).toFixed(0)}Rb`;
    //     }
    //     return `Rp${value}`;
    // };

    return (
        <WorkerLayout>
            <div className="min-h-screen bg-dark-bg text-dark-text">
                {/* Main Content */}
                <main className="container mx-auto p-4 md:p-6">
                    <div className="flex flex-col gap-6">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-xl md:text-2xl font-display font-bold flex items-center gap-2">
                                    <DollarSign className="h-6 w-6 text-primary" />
                                    Penghasilan
                                </h1>
                                <p className="text-dark-textSecondary mt-1">
                                    Pantau penghasilan dan kelola penarikan dana Anda
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <select
                                        value={period}
                                        onChange={(e) => setPeriod(e.target.value as 'week' | 'month' | 'year')}
                                        className="bg-lightGray border border-dark-border rounded-lg py-2 px-3 pr-10 appearance-none focus:border-primary outline-none"
                                    >
                                        <option value="week">Minggu Ini</option>
                                        <option value="month">Bulan Ini</option>
                                        <option value="year">Tahun Ini</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-dark-textSecondary pointer-events-none" />
                                </div>

                                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-button flex items-center gap-2">
                                    <ArrowDownToLine className="h-4 w-4" />
                                    <span>Tarik Dana</span>
                                </button>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Total Penghasilan</p>
                                        <h3 className="font-display font-bold text-2xl mt-1">
                                            {formatCurrency(paymentStats.totalEarnings)}
                                        </h3>
                                    </div>
                                    <div className="bg-primary/10 p-3 rounded-lg">
                                        <Wallet className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-dark-textSecondary">
                                    <span className="text-green-400">↑ 12%</span> dari bulan lalu
                                </div>
                            </div>

                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Menunggu Pembayaran</p>
                                        <h3 className="font-display font-bold text-2xl mt-1">
                                            {formatCurrency(paymentStats.pendingPayments)}
                                        </h3>
                                    </div>
                                    <div className="bg-amber-900/30 p-3 rounded-lg">
                                        <Clock className="h-6 w-6 text-amber-400" />
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-dark-textSecondary">
                                    <span>Dari</span> <span className="text-white">3</span> pekerjaan
                                </div>
                            </div>

                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Pekerjaan Selesai</p>
                                        <h3 className="font-display font-bold text-2xl mt-1">
                                            {paymentStats.completedJobs}
                                        </h3>
                                    </div>
                                    <div className="bg-green-900/30 p-3 rounded-lg">
                                        <CheckCircle className="h-6 w-6 text-green-400" />
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-dark-textSecondary">
                                    <span className="text-green-400">↑ 8%</span> dari bulan lalu
                                </div>
                            </div>

                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Dana Ditarik</p>
                                        <h3 className="font-display font-bold text-2xl mt-1">
                                            {formatCurrency(paymentStats.withdrawnAmount)}
                                        </h3>
                                    </div>
                                    <div className="bg-blue-900/30 p-3 rounded-lg">
                                        <CreditCard className="h-6 w-6 text-blue-400" />
                                    </div>
                                </div>
                                <div className="mt-4 text-xs text-dark-textSecondary">
                                    <span>Terakhir:</span> <span className="text-white">3 Mar 2025</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="border-b border-dark-border">
                            <div className="flex overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`flex items-center gap-1 px-4 py-3 text-sm font-medium whitespace-nowrap ${
                                        activeTab === 'overview'
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                                    }`}
                                >
                                    <span>Ringkasan</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('transactions')}
                                    className={`flex items-center gap-1 px-4 py-3 text-sm font-medium whitespace-nowrap ${
                                        activeTab === 'transactions'
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                                    }`}
                                >
                                    <span>Riwayat Transaksi</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('payout')}
                                    className={`flex items-center gap-1 px-4 py-3 text-sm font-medium whitespace-nowrap ${
                                        activeTab === 'payout'
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                                    }`}
                                >
                                    <span>Penarikan Dana</span>
                                </button>
                            </div>
                        </div>

                        {/* Overview Tab Content */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Monthly Earnings Chart */}
                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-display font-bold text-lg">Penghasilan {monthlyEarnings.period}</h3>
                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <p className="text-dark-textSecondary text-xs">Total</p>
                                                <p className="font-medium">{formatCurrency(monthlyEarnings.total)}</p>
                                            </div>
                                            <button className="text-primary hover:text-primary-light flex items-center gap-1 text-sm transition-colors">
                                                <Download className="h-4 w-4" />
                                                <span className="hidden sm:inline">Unduh Laporan</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                data={monthlyEarnings.data}
                                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#fa8029" stopOpacity={0.8}/>
                                                        <stop offset="95%" stopColor="#fa8029" stopOpacity={0}/>
                                                    </linearGradient>
                                                </defs>
                                                <XAxis
                                                    dataKey="date"
                                                    tick={{ fill: '#9e9e9e' }}
                                                    axisLine={{ stroke: '#2a2a2a' }}
                                                    tickLine={{ stroke: '#2a2a2a' }}
                                                />
                                                <YAxis
                                                    tickFormatter={(value) => `Rp${value/1000}K`}
                                                    tick={{ fill: '#9e9e9e' }}
                                                    axisLine={{ stroke: '#2a2a2a' }}
                                                    tickLine={{ stroke: '#2a2a2a' }}
                                                />
                                                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#2a2a2a' }}
                                                    formatter={(value) => [formatCurrency(value as number), 'Penghasilan']}
                                                    labelStyle={{ color: '#e0e0e0' }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="amount"
                                                    stroke="#fa8029"
                                                    fillOpacity={1}
                                                    fill="url(#colorAmount)"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Earnings by Category */}
                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-display font-bold text-lg">Penghasilan per Kategori</h3>
                                        <div className="relative">
                                            <select
                                                value={selectedYear}
                                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                                className="bg-lightGray border border-dark-border rounded-lg py-1.5 px-3 pr-8 text-sm appearance-none focus:border-primary outline-none"
                                            >
                                                <option value="2025">2025</option>
                                                <option value="2024">2024</option>
                                            </select>
                                            <ChevronDown className="absolute right-2 top-2 h-4 w-4 text-dark-textSecondary pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={earningsByCategoryData}
                                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                                                <XAxis
                                                    dataKey="name"
                                                    tick={{ fill: '#9e9e9e' }}
                                                    axisLine={{ stroke: '#2a2a2a' }}
                                                    tickLine={{ stroke: '#2a2a2a' }}
                                                />
                                                <YAxis
                                                    tickFormatter={(value) => `Rp${value/1000000}Jt`}
                                                    tick={{ fill: '#9e9e9e' }}
                                                    axisLine={{ stroke: '#2a2a2a' }}
                                                    tickLine={{ stroke: '#2a2a2a' }}
                                                />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#2a2a2a' }}
                                                    formatter={(value) => [formatCurrency(value as number), 'Penghasilan']}
                                                    labelStyle={{ color: '#e0e0e0' }}
                                                />
                                                <Legend />
                                                <Bar dataKey="Elektronik" fill="#4682B4" />
                                                <Bar dataKey="Akademik" fill="#9370DB" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Monthly Summary */}
                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                    <h3 className="font-display font-bold text-lg mb-4">Ringkasan Bulanan</h3>

                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                            <tr>
                                                <th className="py-3 text-left text-dark-textSecondary font-medium">Bulan</th>
                                                <th className="py-3 text-left text-dark-textSecondary font-medium">Total Penghasilan</th>
                                                <th className="py-3 text-left text-dark-textSecondary font-medium">Pekerjaan</th>
                                                <th className="py-3 text-left text-dark-textSecondary font-medium">Rata-rata</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {monthlySummaryData.map((item, index) => (
                                                <tr key={index} className="border-t border-dark-border">
                                                    <td className="py-3">{item.month} 2025</td>
                                                    <td className="py-3 font-medium">{formatCurrency(item.total)}</td>
                                                    <td className="py-3">{item.jobs} pekerjaan</td>
                                                    <td className="py-3">{formatCurrency(Math.round(item.total / item.jobs))}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Transactions Tab Content */}
                        {activeTab === 'transactions' && (
                            <div className="space-y-6">
                                {/* Filters */}
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Cari transaksi..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="bg-lightGray rounded-lg py-2 px-4 pl-10 w-60 border border-dark-border focus:border-primary outline-none"
                                            />
                                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-textSecondary" />
                                        </div>

                                        <div className="relative">
                                            <select
                                                value={transactionTypeFilter}
                                                onChange={(e) => setTransactionTypeFilter(e.target.value)}
                                                className="bg-lightGray border border-dark-border rounded-lg py-2 px-3 pr-10 appearance-none focus:border-primary outline-none"
                                            >
                                                <option value="all">Semua Transaksi</option>
                                                <option value="in">Pendapatan</option>
                                                <option value="out">Penarikan</option>
                                                <option value="pending">Menunggu</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-dark-textSecondary pointer-events-none" />
                                        </div>

                                        <div className="relative">
                                            <button className="bg-lightGray p-2 rounded-lg border border-dark-border hover:border-primary transition-colors flex items-center gap-2">
                                                <SlidersHorizontal className="h-5 w-5 text-dark-textSecondary" />
                                                <span className="text-sm hidden sm:inline">Filter Lanjutan</span>
                                            </button>
                                        </div>
                                    </div>

                                    <button className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-3 py-2 rounded-lg transition-colors flex items-center gap-2">
                                        <Download className="h-4 w-4" />
                                        <span>Unduh CSV</span>
                                    </button>
                                </div>

                                {/* Transactions List */}
                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead className="bg-lightGray">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-dark-textSecondary font-medium">Tanggal</th>
                                                <th className="px-4 py-3 text-left text-dark-textSecondary font-medium">Deskripsi</th>
                                                <th className="px-4 py-3 text-right text-dark-textSecondary font-medium">Jumlah</th>
                                                <th className="px-4 py-3 text-center text-dark-textSecondary font-medium">Status</th>
                                                <th className="px-4 py-3 text-right text-dark-textSecondary font-medium"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {filteredTransactions.map((transaction) => (
                                                <tr key={transaction.id} className="border-t border-dark-border">
                                                    <td className="px-4 py-4">
                                                        <div className="text-sm">{formatDate(transaction.date)}</div>
                                                        <div className="text-xs text-dark-textSecondary">{transaction.id}</div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="text-sm">{transaction.description}</div>
                                                        {transaction.jobId && (
                                                            <div className="text-xs text-dark-textSecondary flex items-center gap-1 mt-1">
                                                                {transaction.jobId}
                                                                <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                                                                    transaction.jobTitle?.toLowerCase().includes('elektronik') ||
                                                                    transaction.jobTitle?.toLowerCase().includes('monitor') ||
                                                                    transaction.jobTitle?.toLowerCase().includes('laptop') ||
                                                                    transaction.jobTitle?.toLowerCase().includes('smartphone') ||
                                                                    transaction.jobTitle?.toLowerCase().includes('tv') ||
                                                                    transaction.jobTitle?.toLowerCase().includes('ac')
                                                                        ? 'bg-blue-900/30 text-blue-400'
                                                                        : 'bg-purple-900/30 text-purple-400'
                                                                }`}>
                                    {transaction.jobTitle?.toLowerCase().includes('elektronik') ||
                                    transaction.jobTitle?.toLowerCase().includes('monitor') ||
                                    transaction.jobTitle?.toLowerCase().includes('laptop') ||
                                    transaction.jobTitle?.toLowerCase().includes('smartphone') ||
                                    transaction.jobTitle?.toLowerCase().includes('tv') ||
                                    transaction.jobTitle?.toLowerCase().includes('ac')
                                        ? 'Elektronik'
                                        : 'Akademik'}
                                  </span>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-4 text-right">
                                                        <div className={`font-medium ${
                                                            transaction.type === 'in' ? 'text-green-400' : 'text-amber-400'
                                                        }`}>
                                                            {transaction.type === 'in' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex justify-center">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    transaction.status === 'completed'
                                        ? 'bg-green-900/30 text-green-400'
                                        : transaction.status === 'pending'
                                            ? 'bg-amber-900/30 text-amber-400'
                                            : 'bg-red-900/30 text-red-400'
                                }`}>
                                  {transaction.status === 'completed' ? 'Selesai' :
                                      transaction.status === 'pending' ? 'Pending' : 'Gagal'}
                                </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-right">
                                                        <button className="p-1 text-dark-textSecondary hover:text-primary transition-colors">
                                                            <MoreVertical className="h-5 w-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {filteredTransactions.length === 0 && (
                                        <div className="py-8 text-center">
                                            <p className="text-dark-textSecondary">Tidak ada transaksi yang ditemukan</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Payout Tab Content */}
                        {activeTab === 'payout' && (
                            <div className="space-y-6">
                                {/* Current Balance */}
                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <p className="text-dark-textSecondary">Saldo yang Tersedia</p>
                                            <h3 className="font-display font-bold text-2xl mt-1">
                                                {formatCurrency(paymentStats.totalEarnings - paymentStats.withdrawnAmount)}
                                            </h3>
                                        </div>

                                        <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-button flex items-center gap-2">
                                            <ArrowDownToLine className="h-4 w-4" />
                                            <span>Tarik Dana</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Banks Accounts */}
                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-display font-bold text-lg">Rekening Bank</h3>
                                        <button className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1">
                                            <Plus className="h-4 w-4" />
                                            <span>Tambah Rekening</span>
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {bankAccounts.map(account => (
                                            <div key={account.id} className={`p-4 rounded-lg border ${
                                                account.isDefault ? 'border-primary' : 'border-dark-border'
                                            }`}>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium">{account.bank}</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            {account.accountNumber}
                                                        </p>
                                                        <p className="text-sm mt-1">
                                                            {account.accountName}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-col items-end">
                                                        {account.isDefault && (
                                                            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mb-2">
                                Default
                              </span>
                                                        )}
                                                        <div className="flex gap-2">
                                                            <button className="p-1 text-dark-textSecondary hover:text-primary transition-colors">
                                                                <Edit2 className="h-4 w-4" />
                                                            </button>
                                                            <button className="p-1 text-dark-textSecondary hover:text-red-500 transition-colors">
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Withdrawals */}
                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                    <h3 className="font-display font-bold text-lg mb-4">Riwayat Penarikan Terakhir</h3>

                                    <div className="space-y-3">
                                        {transactions
                                            .filter(t => t.type === 'out')
                                            .slice(0, 5)
                                            .map(transaction => (
                                                <div key={transaction.id} className="p-3 border border-dark-border rounded-lg">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-medium">{transaction.description}</p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-dark-textSecondary text-xs">{transaction.id}</span>
                                                                <span className="text-dark-textSecondary text-xs">•</span>
                                                                <span className="text-dark-textSecondary text-xs">{formatDate(transaction.date)}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium text-amber-400">-{formatCurrency(transaction.amount)}</p>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                                                                transaction.status === 'completed'
                                                                    ? 'bg-green-900/30 text-green-400'
                                                                    : transaction.status === 'pending'
                                                                        ? 'bg-amber-900/30 text-amber-400'
                                                                        : 'bg-red-900/30 text-red-400'
                                                            }`}>
                                {transaction.status === 'completed' ? 'Selesai' :
                                    transaction.status === 'pending' ? 'Pending' : 'Gagal'}
                              </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        {transactions.filter(t => t.type === 'out').length === 0 && (
                                            <div className="py-4 text-center">
                                                <p className="text-dark-textSecondary">Belum ada riwayat penarikan</p>
                                            </div>
                                        )}
                                    </div>

                                    <button className="w-full mt-4 text-center text-primary hover:text-primary-light text-sm transition-colors flex items-center justify-center gap-1">
                                        <span>Lihat Semua Riwayat</span>
                                        <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* How to Withdraw Guide */}
                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <HelpCircle className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-display font-bold text-lg">Cara Penarikan Dana</h3>
                                            <p className="text-dark-textSecondary text-sm mt-1">
                                                Ikuti panduan di bawah ini untuk melakukan penarikan dana ke rekening bank Anda
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <div className="relative">
                                            {/* Timeline line */}
                                            <div className="absolute left-7 top-0 bottom-0 w-px bg-dark-border"></div>

                                            <div className="space-y-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-primary/20 text-primary h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                                                        <span className="text-xl font-bold">1</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">Pastikan Saldo Mencukupi</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            Minimal penarikan adalah Rp 100.000. Penarikan hanya dapat dilakukan untuk saldo yang sudah tersedia.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="bg-primary/20 text-primary h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                                                        <span className="text-xl font-bold">2</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">Pilih Rekening Tujuan</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            Pilih rekening bank yang sudah terdaftar atau tambahkan rekening baru jika belum ada.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="bg-primary/20 text-primary h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                                                        <span className="text-xl font-bold">3</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">Input Jumlah Penarikan</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            Masukkan jumlah yang ingin ditarik. Pastikan tidak melebihi saldo yang tersedia.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="bg-primary/20 text-primary h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                                                        <span className="text-xl font-bold">4</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">Konfirmasi Penarikan</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            Periksa kembali informasi penarikan dan konfirmasi. Dana akan ditransfer dalam 1-2 hari kerja.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-dark-border">
                                        <div className="bg-lightGray rounded-lg p-4 border border-dark-border">
                                            <div className="flex items-start gap-3">
                                                <Info className="h-5 w-5 text-primary mt-0.5" />
                                                <p className="text-dark-textSecondary text-sm">
                                                    Biaya admin penarikan sebesar <span className="text-white">Rp 5.000</span> akan dikenakan untuk setiap transaksi penarikan. Penarikan hanya dapat dilakukan ke rekening atas nama yang sama dengan akun Anda.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </WorkerLayout>
    );
};

export default EarningsPage;