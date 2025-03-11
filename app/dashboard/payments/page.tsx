// src/app/dashboard/payments/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    CreditCard,
    Download,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';

// Mock payment data
const mockPayments = [
    {
        id: 'PAY-001',
        orderId: 'ORD-123456',
        orderTitle: 'Pengerjaan Skripsi - Manajemen Bisnis',
        amount: 1250000,
        status: 'completed',
        method: 'bank_transfer',
        date: '2025-02-10T14:30:00',
        type: 'down_payment'
    },
    {
        id: 'PAY-002',
        orderId: 'ORD-123457',
        orderTitle: 'Perbaikan Laptop Asus ROG',
        amount: 425000,
        status: 'completed',
        method: 'e_wallet',
        date: '2025-03-03T09:15:00',
        type: 'down_payment'
    },
    {
        id: 'PAY-003',
        orderId: 'ORD-123458',
        orderTitle: 'Pembuatan Presentasi Seminar',
        amount: 225000,
        status: 'pending',
        method: 'virtual_account',
        date: '2025-03-06T11:45:00',
        type: 'down_payment'
    },
    {
        id: 'PAY-004',
        orderId: 'ORD-123459',
        orderTitle: 'Perbaikan Smartphone Samsung S21',
        amount: 350000,
        status: 'failed',
        method: 'credit_card',
        date: '2025-03-05T16:20:00',
        type: 'full_payment'
    },
    {
        id: 'PAY-005',
        orderId: 'ORD-123456',
        orderTitle: 'Pengerjaan Skripsi - Manajemen Bisnis',
        amount: 1250000,
        status: 'pending',
        method: 'bank_transfer',
        date: '2025-03-07T10:00:00',
        type: 'final_payment'
    }
];

export default function PaymentsPage() {
    const [payments, setPayments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setPayments(mockPayments);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <span className="flex items-center text-green-400 bg-green-900/20 px-2 py-1 rounded-full text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </span>
                );
            case 'pending':
                return (
                    <span className="flex items-center text-amber-400 bg-amber-900/20 px-2 py-1 rounded-full text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
                );
            case 'failed':
                return (
                    <span className="flex items-center text-red-400 bg-red-900/20 px-2 py-1 rounded-full text-xs">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </span>
                );
            default:
                return (
                    <span className="flex items-center text-gray-400 bg-gray-900/20 px-2 py-1 rounded-full text-xs">
            {status}
          </span>
                );
        }
    };

    // Get payment method info
    const getPaymentMethodInfo = (method: string) => {
        switch (method) {
            case 'bank_transfer':
                return { name: 'Bank Transfer', icon: 'bank' };
            case 'e_wallet':
                return { name: 'E-Wallet', icon: 'wallet' };
            case 'virtual_account':
                return { name: 'Virtual Account', icon: 'bank' };
            case 'credit_card':
                return { name: 'Credit Card', icon: 'credit-card' };
            default:
                return { name: method, icon: 'money' };
        }
    };

    // Get payment type label
    const getPaymentTypeLabel = (type: string) => {
        switch (type) {
            case 'down_payment':
                return 'Down Payment';
            case 'final_payment':
                return 'Final Payment';
            case 'full_payment':
                return 'Full Payment';
            default:
                return type;
        }
    };

    // Filter payments
    const filteredPayments = payments.filter(payment => {
        const matchesSearch =
            payment.orderTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter ? payment.status === statusFilter : true;

        return matchesSearch && matchesStatus;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-dark-text">Payment History</h1>
                <Link
                    href="/dashboard/orders?pending_payment=true"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    Pending Payments
                </Link>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-dark-border bg-dark-card rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Search by order ID or title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setStatusFilter(null)}
                        className={`px-3 py-2 rounded-lg border ${!statusFilter ? 'border-primary bg-primary/10 text-primary' : 'border-dark-border bg-dark-card text-dark-textSecondary'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setStatusFilter('completed')}
                        className={`px-3 py-2 rounded-lg border ${statusFilter === 'completed' ? 'border-green-500 bg-green-900/10 text-green-400' : 'border-dark-border bg-dark-card text-dark-textSecondary'}`}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => setStatusFilter('pending')}
                        className={`px-3 py-2 rounded-lg border ${statusFilter === 'pending' ? 'border-amber-500 bg-amber-900/10 text-amber-400' : 'border-dark-border bg-dark-card text-dark-textSecondary'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setStatusFilter('failed')}
                        className={`px-3 py-2 rounded-lg border ${statusFilter === 'failed' ? 'border-red-500 bg-red-900/10 text-red-400' : 'border-dark-border bg-dark-card text-dark-textSecondary'}`}
                    >
                        Failed
                    </button>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-dark-bg border-b border-dark-border">
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">
                                Transaction ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">
                                Order
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">
                                Payment Method
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-border">
                        {filteredPayments.length > 0 ? (
                            filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-dark-bg/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                        {payment.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-dark-text">
                                        <div className="flex flex-col">
                                            <Link href={`/dashboard/orders/${payment.orderId}`} className="font-medium hover:text-primary">
                                                {payment.orderTitle}
                                            </Link>
                                            <div className="flex items-center mt-1">
                                                <span className="text-xs text-dark-textSecondary">{payment.orderId}</span>
                                                <span className="mx-2 text-dark-border">•</span>
                                                <span className="text-xs bg-dark-bg px-2 py-0.5 rounded">
                            {getPaymentTypeLabel(payment.type)}
                          </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                        {formatDate(payment.date)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark-text">
                                        {formatCurrency(payment.amount)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                        <div className="flex items-center">
                                            <CreditCard className="h-4 w-4 mr-2" />
                                            {getPaymentMethodInfo(payment.method).name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(payment.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/dashboard/payments/${payment.id}`}
                                                className="px-2 py-1 border border-dark-border rounded hover:bg-dark-bg transition-colors"
                                            >
                                                View
                                            </Link>
                                            {payment.status === 'completed' && (
                                                <button className="px-2 py-1 border border-dark-border rounded flex items-center hover:bg-dark-bg transition-colors">
                                                    <Download className="h-3 w-3 mr-1" />
                                                    Receipt
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center">
                                        <CreditCard className="h-12 w-12 text-dark-textSecondary mb-4" />
                                        <h3 className="text-lg font-medium text-dark-text">No payments found</h3>
                                        <p className="text-dark-textSecondary mt-1">
                                            {searchQuery || statusFilter ? 'Try with different filters' : 'You haven\'t made any payments yet'}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredPayments.length > 0 && (
                    <div className="px-6 py-4 border-t border-dark-border flex items-center justify-between">
                        <div className="text-sm text-dark-textSecondary">
                            Showing <span className="font-medium text-dark-text">1</span> to <span className="font-medium text-dark-text">{filteredPayments.length}</span> of <span className="font-medium text-dark-text">{filteredPayments.length}</span> results
                        </div>
                        <div className="flex space-x-2">
                            <button className="p-2 border border-dark-border rounded-lg text-dark-textSecondary hover:bg-dark-bg disabled:opacity-50" disabled>
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button className="p-2 border border-dark-border rounded-lg text-dark-textSecondary hover:bg-dark-bg disabled:opacity-50" disabled>
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}