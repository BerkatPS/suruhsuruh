"use client";

import React, { useState, useEffect } from 'react';
import {
    FileText,
    MessageCircle,
    ShoppingBag,
    CreditCard,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

// Contoh data statis
const mockStats = [
    {
        title: 'Total Pesanan',
        value: 8,
        change: '+14%',
        changeType: 'increase' as const,
        icon: <ShoppingBag size={20} />,
        color: 'blue'
    },
    {
        title: 'Dalam Pengerjaan',
        value: 3,
        change: '+5%',
        changeType: 'increase' as const,
        icon: <Clock size={20} />,
        color: 'amber'
    },
    {
        title: 'Menunggu Pembayaran',
        value: 2,
        change: '-10%',
        changeType: 'decrease' as const,
        icon: <CreditCard size={20} />,
        color: 'purple'
    },
    {
        title: 'Selesai Bulan Ini',
        value: 5,
        change: '0%',
        changeType: 'neutral' as const,
        icon: <CheckCircle2 size={20} />,
        color: 'green'
    }
];

const mockActiveOrders = [
    {
        id: 'ORD-123456',
        title: 'Pengerjaan Skripsi - Manajemen Bisnis',
        status: 'in-progress',
        progress: 65,
        dueDate: '2025-03-15',
        createDate: '2025-02-10',
        worker: {
            name: 'Budi Santoso',
            avatar: '/api/placeholder/32/32',
            rating: 4.8
        },
        category: 'academic',
        price: 2500000,
        paidAmount: 1250000,
        nextPayment: 1250000,
        nextPaymentDue: '2025-03-10'
    },
    {
        id: 'ORD-123457',
        title: 'Perbaikan Laptop Asus ROG',
        status: 'waiting-approval',
        progress: 25,
        dueDate: '2025-03-08',
        createDate: '2025-03-03',
        worker: {
            name: 'Arif Rahman',
            avatar: '/api/placeholder/32/32',
            rating: 4.9
        },
        category: 'electronic',
        price: 850000,
        paidAmount: 425000,
        nextPayment: 425000,
        nextPaymentDue: '2025-03-07'
    },
    {
        id: 'ORD-123458',
        title: 'Pembuatan Presentasi Seminar',
        status: 'waiting-payment',
        progress: 0,
        dueDate: '2025-03-14',
        createDate: '2025-03-05',
        category: 'academic',
        price: 450000,
        paidAmount: 0,
        nextPayment: 225000,
        nextPaymentDue: '2025-03-07'
    }
];

const mockNotifications = [
    {
        id: 'notif-1',
        title: 'Pembayaran Diterima',
        message: 'Pembayaran DP untuk Pengerjaan Skripsi telah diterima',
        date: '2025-03-05T14:30:00',
        read: false,
        type: 'payment',
        orderId: 'ORD-123456'
    },
    {
        id: 'notif-2',
        title: 'Update Progress',
        message: 'Arif telah menambahkan update progres terbaru untuk perbaikan laptop Anda',
        date: '2025-03-04T10:15:00',
        read: true,
        type: 'progress',
        orderId: 'ORD-123457'
    },
    {
        id: 'notif-3',
        title: 'Pesan Baru',
        message: 'Anda memiliki pesan baru dari Budi terkait pengerjaan skripsi',
        date: '2025-03-03T16:45:00',
        read: false,
        type: 'message',
        orderId: 'ORD-123456'
    },
    {
        id: 'notif-4',
        title: 'Pembayaran Jatuh Tempo',
        message: 'Pembayaran akhir untuk Pembuatan Presentasi Seminar akan jatuh tempo besok',
        date: '2025-03-05T09:00:00',
        read: false,
        type: 'payment-due',
        orderId: 'ORD-123458'
    }
];

// Stats Card Component
function StatsCard({ stat }: { stat: any }) {
    const getColorClass = (color: string) => {
        switch (color) {
            case 'blue':
                return 'bg-blue-900/30 text-blue-400';
            case 'green':
                return 'bg-green-900/30 text-green-400';
            case 'amber':
                return 'bg-amber-900/30 text-amber-400';
            case 'purple':
                return 'bg-purple-900/30 text-purple-400';
            case 'red':
                return 'bg-red-900/30 text-red-400';
            default:
                return 'bg-dark-card text-dark-text';
        }
    };

    const getChangeColorClass = (changeType: string) => {
        switch (changeType) {
            case 'increase':
                return 'text-green-400';
            case 'decrease':
                return 'text-red-400';
            default:
                return 'text-dark-textSecondary';
        }
    };

    return (
        <div className="bg-dark-card rounded-lg shadow p-6 border border-dark-border">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-dark-textSecondary text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1 text-dark-text">{stat.value}</p>
                </div>
                <div className={`rounded-full p-3 ${getColorClass(stat.color)}`}>
                    {stat.icon}
                </div>
            </div>

            <div className="mt-4 flex items-center">
                <span className={`text-sm font-medium ${getChangeColorClass(stat.changeType)}`}>
                    {stat.change}
                </span>
                <span className="text-dark-textSecondary text-sm ml-1">vs. bulan lalu</span>
            </div>
        </div>
    );
}

// Order Card Component
function OrderCard({ order }: { order: any }) {
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
                    <div className="flex items-center gap-1 text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full text-xs">
                        <Clock className="h-3 w-3" />
                        <span>Dalam Pengerjaan</span>
                    </div>
                );
            case 'waiting-payment':
                return (
                    <div className="flex items-center gap-1 text-amber-400 bg-amber-900/30 px-2 py-1 rounded-full text-xs">
                        <CreditCard className="h-3 w-3" />
                        <span>Menunggu Pembayaran</span>
                    </div>
                );
            case 'waiting-approval':
                return (
                    <div className="flex items-center gap-1 text-purple-400 bg-purple-900/30 px-2 py-1 rounded-full text-xs">
                        <AlertCircle className="h-3 w-3" />
                        <span>Perlu Review</span>
                    </div>
                );
            case 'completed':
                return (
                    <div className="flex items-center gap-1 text-green-400 bg-green-900/30 px-2 py-1 rounded-full text-xs">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Selesai</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-1 text-dark-textSecondary bg-dark-card px-2 py-1 rounded-full text-xs">
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

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden hover:shadow-md transition-all">
            <a href={`/dashboard/orders/${order.id}`} className="block">
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
                        <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary"
                                style={{ width: `${order.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Worker Info and Due Date */}
                    <div className="flex justify-between items-center">
                        {order.worker ? (
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full overflow-hidden bg-dark-bg">
                                    <img
                                        src={order.worker.avatar}
                                        alt={order.worker.name}
                                        width={32}
                                        height={32}
                                    />
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
                <div className="bg-dark-bg px-4 py-3 border-t border-dark-border">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs text-dark-textSecondary">Total Harga</p>
                            <p className="font-semibold text-dark-text">Rp {order.price.toLocaleString('id-ID')}</p>
                        </div>

                        {order.status === 'waiting-payment' ? (
                            <button className="bg-primary text-dark-text px-3 py-1.5 rounded-lg text-sm hover:bg-primary-dark transition-colors">
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
            </a>
        </div>
    );
}

// Notification List Component
function NotificationList({ notifications }: { notifications: any[] }) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            const hours = Math.floor(diffTime / (1000 * 60 * 60));
            if (hours === 0) {
                const minutes = Math.floor(diffTime / (1000 * 60));
                return `${minutes} menit yang lalu`;
            }
            return `${hours} jam yang lalu`;
        } else if (diffDays === 1) {
            return 'Kemarin';
        } else {
            return new Date(dateString).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    return (
        <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
                <a
                    key={notification.id}
                    href={notification.orderId ? `/dashboard/orders/${notification.orderId}` : '#'}
                    className={`block p-3 rounded-lg hover:bg-dark-bg transition-colors ${!notification.read ? 'bg-blue-900/10' : ''}`}
                >
                    <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getNotificationTypeClass(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-dark-text">{notification.title}</h4>
                            <p className="text-xs text-dark-textSecondary mt-1">{notification.message}</p>
                            <p className="text-xs text-dark-textSecondary mt-1">{formatDate(notification.date)}</p>
                        </div>
                        {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                        )}
                    </div>
                </a>
            ))}
        </div>
    );
}

// Helper functions for notification styling
function getNotificationTypeClass(type: string) {
    switch (type) {
        case 'payment':
            return 'bg-green-900/30 text-green-400';
        case 'progress':
            return 'bg-blue-900/30 text-blue-400';
        case 'message':
            return 'bg-purple-900/30 text-purple-400';
        case 'payment-due':
            return 'bg-amber-900/30 text-amber-400';
        default:
            return 'bg-dark-bg text-dark-textSecondary';
    }
}

function getNotificationIcon(type: string) {
    switch (type) {
        case 'payment':
            return <CreditCard className="h-4 w-4" />;
        case 'progress':
            return <Clock className="h-4 w-4" />;
        case 'message':
            return <MessageCircle className="h-4 w-4" />;
        case 'payment-due':
            return <AlertCircle className="h-4 w-4" />;
        default:
            return <AlertCircle className="h-4 w-4" />;
    }
}

// Empty State Component
function EmptyState({
                        icon,
                        title,
                        description,
                        actionLabel,
                        actionHref,
                        compact = false
                    }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    compact?: boolean;
}) {
    return (
        <div className={`flex flex-col items-center justify-center ${compact ? 'py-6' : 'py-12'}`}>
            <div className="bg-dark-bg rounded-full p-4 mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-medium text-dark-text mb-1">{title}</h3>
            <p className="text-sm text-dark-textSecondary mb-4 text-center">{description}</p>
            {actionLabel && actionHref && (
                <a
                    href={actionHref}
                    className="px-4 py-2 bg-primary text-dark-text rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                    {actionLabel}
                </a>
            )}
        </div>
    );
}

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeOrders, setActiveOrders] = useState<any[]>([]);
    const [stats, setStats] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);

    // Simulasi loading data
    useEffect(() => {
        const timer = setTimeout(() => {
            setStats(mockStats);
            setActiveOrders(mockActiveOrders);
            setNotifications(mockNotifications);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <div className="w-10 h-10 border-4 border-dark-border border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 bg-dark-bg text-dark-text">
            <div>
                <h1 className="text-2xl font-bold text-dark-text">Dashboard</h1>
                <p className="text-dark-textSecondary">Selamat datang kembali, lihat ringkasan aktivitas Anda</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={index} stat={stat} />
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Orders Section */}
                <div className="col-span-1 lg:col-span-2">
                    <div className="bg-dark-card p-6 rounded-lg shadow border border-dark-border">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-dark-text">Pesanan Aktif</h2>
                            <a href="/dashboard/orders" className="text-primary text-sm font-medium hover:text-primary-light">
                                Lihat Semua
                            </a>
                        </div>

                        {activeOrders.length > 0 ? (
                            <div className="space-y-4">
                                {activeOrders.map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                icon={<FileText className="h-12 w-12 text-dark-textSecondary" />}
                                title="Belum ada pesanan aktif"
                                description="Anda belum memiliki pesanan aktif saat ini. Mulai dengan memesan layanan kami."
                                actionLabel="Pesan Sekarang"
                                actionHref="/services"
                            />
                        )}
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="col-span-1">
                    <div className="bg-dark-card p-6 rounded-lg shadow border border-dark-border">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-dark-text">Notifikasi</h2>
                            <button className="text-primary text-sm font-medium hover:text-primary-light">
                                Tandai Semua Dibaca
                            </button>
                        </div>

                        {notifications.length > 0 ? (
                            <NotificationList notifications={notifications} />
                        ) : (
                            <EmptyState
                                icon={<AlertCircle className="h-12 w-12 text-dark-textSecondary" />}
                                title="Tidak ada notifikasi"
                                description="Anda tidak memiliki notifikasi baru saat ini."
                                compact
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-card p-6 rounded-lg shadow border border-dark-border flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-dark-text">Butuh Bantuan?</h3>
                        <p className="text-sm text-dark-textSecondary">Chat dengan customer support kami</p>
                    </div>
                    <button className="bg-primary text-dark-text px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                        Hubungi CS
                    </button>
                </div>

                <div className="bg-dark-card p-6 rounded-lg shadow border border-dark-border flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-dark-text">Pesan Layanan</h3>
                        <p className="text-sm text-dark-textSecondary">Lihat layanan yang tersedia</p>
                    </div>
                    <a href="/dashboard/orders" className="bg-primary text-dark-text px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                        Pesan Sekarang
                    </a>
                </div>

                <div className="bg-dark-card p-6 rounded-lg shadow border border-dark-border flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-dark-text">Undang Teman</h3>
                        <p className="text-sm text-dark-textSecondary">Dapatkan bonus dari referral</p>
                    </div>
                    <button className="bg-primary text-dark-text px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                        Bagikan
                    </button>
                </div>
            </div>
        </div>
    );
}