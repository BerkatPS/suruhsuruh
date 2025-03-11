// src/components/dashboard/OrderCard.tsx
import Link from 'next/link';
import { Clock, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

interface OrderCardProps {
    order: {
        id: string;
        title: string;
        status: string;
        progress: number;
        dueDate: string;
        createDate: string;
        worker?: {
            name: string;
            avatar: string;
            rating: number;
        };
        category: string;
        price: number;
        paidAmount: number;
        nextPayment: number;
        nextPaymentDue: string;
    };
}

export default function OrderCard({ order }: OrderCardProps) {
    // Format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Status badges
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'in-progress':
                return (
                    <div className="flex items-center gap-1 text-blue-400 bg-blue-900/20 px-2 py-1 rounded-full text-xs">
                        <Clock className="h-3 w-3" />
                        <span>Dalam Pengerjaan</span>
                    </div>
                );
            case 'waiting-payment':
                return (
                    <div className="flex items-center gap-1 text-amber-400 bg-amber-900/20 px-2 py-1 rounded-full text-xs">
                        <CreditCard className="h-3 w-3" />
                        <span>Menunggu Pembayaran</span>
                    </div>
                );
            case 'waiting-approval':
                return (
                    <div className="flex items-center gap-1 text-purple-400 bg-purple-900/20 px-2 py-1 rounded-full text-xs">
                        <AlertCircle className="h-3 w-3" />
                        <span>Perlu Review</span>
                    </div>
                );
            case 'completed':
                return (
                    <div className="flex items-center gap-1 text-green-400 bg-green-900/20 px-2 py-1 rounded-full text-xs">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Selesai</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-1 text-gray-400 bg-gray-900/20 px-2 py-1 rounded-full text-xs">
                        <span>Unknown</span>
                    </div>
                );
        }
    };

    // Category badge
    const getCategoryBadge = (category: string) => {
        return category === 'academic'
            ? <span className="bg-blue-900/20 text-blue-400 text-xs px-2 py-1 rounded">Akademik</span>
            : <span className="bg-green-900/20 text-green-400 text-xs px-2 py-1 rounded">Elektronik</span>;
    };

    // Get progress bar color
    const getProgressBarColor = (progress: number) => {
        if (progress < 30) return 'bg-blue-500';
        if (progress < 70) return 'bg-amber-500';
        return 'bg-green-500';
    };

    return (
        <div className="bg-dark-card border border-dark-border/30 rounded-lg overflow-hidden hover:shadow-card hover:border-dark-border/60 transition-all">
            <Link href={`/dashboard/orders/${order.id}`} className="block">
                <div className="p-4">
                    {/* Header with ID and Status */}
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs text-dark-textSecondary">{order.id}</span>
                        {getStatusBadge(order.status)}
                    </div>

                    {/* Title and Category */}
                    <div className="mb-3">
                        <h3 className="font-semibold text-dark-text">{order.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            {getCategoryBadge(order.category)}
                            <span className="text-xs text-dark-textSecondary">
                Dibuat: {formatDate(order.createDate)}
              </span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-dark-textSecondary">Progress</span>
                            <span className="text-dark-textSecondary">{order.progress}%</span>
                        </div>
                        <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                            <div
                                className={`h-full ${getProgressBarColor(order.progress)}`}
                                style={{ width: `${order.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Worker Info and Due Date */}
                    <div className="flex justify-between items-center">
                        {order.worker ? (
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full overflow-hidden bg-dark-bg flex items-center justify-center text-dark-textSecondary">
                                    {order.worker.avatar ? (
                                        <img
                                            src={order.worker.avatar}
                                            alt={order.worker.name}
                                            width={32}
                                            height={32}
                                        />
                                    ) : (
                                        <span>{order.worker.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-dark-text">{order.worker.name}</p>
                                    <div className="flex items-center">
                                        <span className="text-xs text-amber-400">★</span>
                                        <span className="text-xs text-dark-textSecondary ml-1">{order.worker.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-xs text-dark-textSecondary">Belum ada worker</div>
                        )}

                        <div className="text-right">
                            <p className="text-xs text-dark-textSecondary">Deadline</p>
                            <p className="text-sm font-medium text-dark-text">{formatDate(order.dueDate)}</p>
                        </div>
                    </div>
                </div>

                {/* Footer with Price */}
                <div className="bg-dark-bg/50 px-4 py-3 border-t border-dark-border">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-dark-textSecondary">Total Harga</p>
                            <p className="font-semibold text-dark-text">Rp {order.price.toLocaleString('id-ID')}</p>
                        </div>

                        {order.status === 'waiting-payment' ? (
                            <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm hover:bg-primary-dark">
                                Bayar Sekarang
                            </button>
                        ) : (
                            <div className="text-right">
                                <p className="text-xs text-dark-textSecondary">
                                    {order.paidAmount === 0 ? 'DP' : 'Sisa Pembayaran'}
                                </p>
                                <p className="font-medium text-sm text-dark-text">
                                    Rp {order.nextPayment.toLocaleString('id-ID')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}