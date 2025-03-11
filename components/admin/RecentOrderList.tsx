// components/admin/RecentOrderList.tsx
import React from 'react';
import Link from 'next/link';

interface Order {
    id: string;
    customer: string;
    service: string;
    category: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    amount: number;
    date: string;
}

interface RecentOrderListProps {
    orders: Order[];
}

const RecentOrderList: React.FC<RecentOrderListProps> = ({ orders }) => {
    // Format tanggal dengan format yang lebih mudah dibaca
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

    // Format angka ke format Rupiah
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Fungsi untuk mendapatkan class status
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-amber-500/10 text-amber-500 ring-amber-500/20';
            case 'processing':
                return 'bg-blue-500/10 text-blue-500 ring-blue-500/20';
            case 'completed':
                return 'bg-green-500/10 text-green-500 ring-green-500/20';
            case 'cancelled':
                return 'bg-red-500/10 text-red-500 ring-red-500/20';
            default:
                return 'bg-gray-500/10 text-gray-500 ring-gray-500/20';
        }
    };

    // Fungsi untuk mendapatkan label status
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Menunggu';
            case 'processing':
                return 'Diproses';
            case 'completed':
                return 'Selesai';
            case 'cancelled':
                return 'Dibatalkan';
            default:
                return status;
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-dark-border">
                <thead>
                <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">ID</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Pelanggan</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Layanan</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Jumlah</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Tanggal</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Aksi</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-dark-border bg-dark-card">
                {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-dark-bg/30 transition-colors">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-dark-text">
                            {order.id}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-dark-text">
                            {order.customer}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-dark-text">
                            <div>{order.service}</div>
                            <div className="text-dark-textSecondary text-xs">{order.category}</div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-dark-text">
                            {formatRupiah(order.amount)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ${getStatusClass(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-dark-textSecondary">
                            {formatDate(order.date)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-right">
                            <Link
                                href={`/app/admin/pesanan/${order.id}`}
                                className="text-primary hover:text-primary-light font-medium"
                            >
                                Detail
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {orders.length === 0 && (
                <div className="py-8 text-center text-dark-textSecondary">
                    Tidak ada pesanan terbaru.
                </div>
            )}
        </div>
    );
};

export default RecentOrderList;