// app/admin/keuangan/page.tsx
"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';

// TransactionFilter Component
const TransactionFilter = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Cari transaksi berdasarkan ID, pelanggan..."
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-4">
                <select className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40">
                    <option value="">Semua Status</option>
                    <option value="success">Sukses</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Gagal</option>
                    <option value="refunded">Refund</option>
                </select>
                <select className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40">
                    <option value="">Semua Metode</option>
                    <option value="bank_transfer">Transfer Bank</option>
                    <option value="virtual_account">Virtual Account</option>
                    <option value="ewallet">E-Wallet</option>
                    <option value="credit_card">Kartu Kredit</option>
                </select>
                <select className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40">
                    <option value="">Periode</option>
                    <option value="today">Hari Ini</option>
                    <option value="week">Minggu Ini</option>
                    <option value="month">Bulan Ini</option>
                    <option value="custom">Kustom</option>
                </select>
            </div>
        </div>
    );
};

// RevenueChart Component (Placeholder)
const RevenueChart = () => {
    return (
        <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-dark-text mb-4">Grafik Pendapatan</h2>
            <div className="h-64 flex items-center justify-center">
                <p className="text-dark-textSecondary">Grafik pendapatan akan ditampilkan di sini</p>
            </div>
        </div>
    );
};

// PayoutHistory Component
const PayoutHistory = ({ payouts }: { payouts: any[] }) => {
    // Format angka ke format Rupiah
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Format tanggal
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-dark-border flex justify-between items-center">
                <h2 className="text-lg font-semibold text-dark-text">Riwayat Payout ke Worker</h2>
                <button className="text-primary hover:text-primary-light text-sm font-medium">
                    Lihat Semua
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-dark-border">
                    <thead className="bg-dark-bg">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Worker</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Jumlah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Bank</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Tanggal</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-border">
                    {payouts.map((payout) => (
                        <tr key={payout.id} className="hover:bg-dark-bg/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-text">
                                {payout.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-primary font-medium">{payout.worker.charAt(0)}</span>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm text-dark-text">{payout.worker}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                {formatRupiah(payout.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                {payout.bank}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ${// Lanjutan kode untuk app/admin/keuangan/page.tsx

                                    payout.status === 'success'
                                        ? 'bg-green-500/10 text-green-500 ring-green-500/20'
                                        : payout.status === 'pending'
                                            ? 'bg-amber-500/10 text-amber-500 ring-amber-500/20'
                                            : 'bg-red-500/10 text-red-500 ring-red-500/20'
                                }`}
                                >
                  {payout.status === 'success'
                      ? 'Sukses'
                      : payout.status === 'pending'
                          ? 'Pending'
                          : 'Gagal'}
                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-textSecondary">
                                {formatDate(payout.date)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// TransactionsList Component
const TransactionsList = ({ transactions }: { transactions: any[] }) => {
    // Format angka ke format Rupiah
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Format tanggal
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Fungsi untuk mendapatkan warna status
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'success':
                return 'bg-green-500/10 text-green-500 ring-green-500/20';
            case 'pending':
                return 'bg-amber-500/10 text-amber-500 ring-amber-500/20';
            case 'failed':
                return 'bg-red-500/10 text-red-500 ring-red-500/20';
            case 'refunded':
                return 'bg-purple-500/10 text-purple-500 ring-purple-500/20';
            default:
                return 'bg-gray-500/10 text-gray-500 ring-gray-500/20';
        }
    };

    // Fungsi untuk mendapatkan label status
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'success':
                return 'Sukses';
            case 'pending':
                return 'Pending';
            case 'failed':
                return 'Gagal';
            case 'refunded':
                return 'Refund';
            default:
                return status;
        }
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-dark-border">
                <h2 className="text-lg font-semibold text-dark-text">Transaksi Terbaru</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-dark-border">
                    <thead className="bg-dark-bg">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Pelanggan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Pesanan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Jenis</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Metode</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Jumlah</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Tanggal</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Aksi</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-border">
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-dark-bg/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-text">
                                {transaction.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                {transaction.customer}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                {transaction.order}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                {transaction.type === 'deposit'
                                    ? 'Deposit (DP)'
                                    : transaction.type === 'final'
                                        ? 'Pembayaran Akhir'
                                        : transaction.type === 'refund'
                                            ? 'Refund'
                                            : transaction.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                {transaction.method}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                {formatRupiah(transaction.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ${getStatusColor(transaction.status)}`}>
                    {getStatusLabel(transaction.status)}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-textSecondary">
                                {formatDate(transaction.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button className="text-primary hover:text-primary-light">
                                    Detail
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 flex justify-center border-t border-dark-border">
                <button className="text-primary hover:text-primary-light font-medium">
                    Lihat Semua Transaksi
                </button>
            </div>
        </div>
    );
};

export default function FinanceManagementPage() {
    const [activeTab, setActiveTab] = useState('transactions');
    const [dateRange, setDateRange] = useState('month');

    // Format angka ke format Rupiah
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Data dummy statistik keuangan
    const financeStats = [
        {
            title: 'Pendapatan Bulan Ini',
            value: formatRupiah(54500000),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'green',
        },
        {
            title: 'Pembayaran ke Worker',
            value: formatRupiah(32500000),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            color: 'blue',
        },
        {
            title: 'Keuntungan Bulan Ini',
            value: formatRupiah(22000000),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            color: 'purple',
        },
        {
            title: 'Refund',
            value: formatRupiah(1500000),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
            ),
            color: 'red',
        },
    ];

    // Data dummy untuk transaksi
    const transactions = [
        {
            id: 'TRX-2025-1256',
            customer: 'Budi Santoso',
            order: 'ORD-2025-089',
            type: 'deposit',
            method: 'Transfer Bank BCA',
            amount: 1000000,
            status: 'success',
            date: '2025-03-07T15:45:00Z',
        },
        {
            id: 'TRX-2025-1255',
            customer: 'Dewi Anggraini',
            order: 'ORD-2025-088',
            type: 'final',
            method: 'QRIS',
            amount: 500000,
            status: 'success',
            date: '2025-03-07T12:30:00Z',
        },
        {
            id: 'TRX-2025-1254',
            customer: 'Ahmad Farhan',
            order: 'ORD-2025-087',
            type: 'deposit',
            method: 'Virtual Account BNI',
            amount: 225000,
            status: 'pending',
            date: '2025-03-07T09:15:00Z',
        },
        {
            id: 'TRX-2025-1253',
            customer: 'Maya Putri',
            order: 'ORD-2025-086',
            type: 'deposit',
            method: 'OVO',
            amount: 325000,
            status: 'success',
            date: '2025-03-06T16:30:00Z',
        },
        {
            id: 'TRX-2025-1252',
            customer: 'Dian Permata',
            order: 'ORD-2025-085',
            type: 'deposit',
            method: 'GoPay',
            amount: 175000,
            status: 'failed',
            date: '2025-03-06T14:45:00Z',
        },
        {
            id: 'TRX-2025-1251',
            customer: 'Dian Permata',
            order: 'ORD-2025-085',
            type: 'refund',
            method: 'Transfer Bank BCA',
            amount: 175000,
            status: 'success',
            date: '2025-03-06T15:20:00Z',
        },
    ];

    // Data dummy untuk payout ke worker
    const payouts = [
        {
            id: 'PYT-2025-056',
            worker: 'Rudi Hartono',
            amount: 2150000,
            bank: 'BCA - 1234567890',
            status: 'success',
            date: '2025-03-05T10:00:00Z',
        },
        {
            id: 'PYT-2025-055',
            worker: 'Dina Maulida',
            amount: 1650000,
            bank: 'BNI - 0987654321',
            status: 'success',
            date: '2025-03-05T10:00:00Z',
        },
        {
            id: 'PYT-2025-054',
            worker: 'Fajar Pratama',
            amount: 1950000,
            bank: 'Mandiri - 1122334455',
            status: 'pending',
            date: '2025-03-05T10:00:00Z',
        },
        {
            id: 'PYT-2025-053',
            worker: 'Laras Ayu',
            amount: 1050000,
            bank: 'BCA - 5566778899',
            status: 'failed',
            date: '2025-03-05T10:00:00Z',
        },
    ];

    return (
        <AdminLayout title="Manajemen Keuangan">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-dark-text">Manajemen Keuangan</h1>
                        <p className="text-dark-textSecondary">Kelola transaksi dan pembayaran dalam platform</p>
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
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Export Data</span>
                        </button>
                    </div>
                </div>

                {/* Finance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                </div>

                {/* Revenue Chart */}
                <RevenueChart />

                {/* Tabs for Transactions and Payouts */}
                <div className="border-b border-dark-border">
                    <div className="flex overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('transactions')}
                            className={`px-4 py-2 text-sm font-medium ${
                                activeTab === 'transactions'
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-dark-textSecondary hover:text-dark-text'
                            }`}
                        >
                            Transaksi
                        </button>
                        <button
                            onClick={() => setActiveTab('payouts')}
                            className={`px-4 py-2 text-sm font-medium ${
                                activeTab === 'payouts'
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-dark-textSecondary hover:text-dark-text'
                            }`}
                        >
                            Pembayaran Worker
                        </button>
                    </div>
                </div>

                {/* Transaction Filter */}
                {activeTab === 'transactions' && <TransactionFilter />}

                {/* Tab Content */}
                {activeTab === 'transactions' ? (
                    <TransactionsList transactions={transactions} />
                ) : (
                    <PayoutHistory payouts={payouts} />
                )}
            </div>
        </AdminLayout>
    );
}