// src/components/dashboard/NotificationList.tsx
import { CreditCard, Clock, MessageCircle, AlertCircle } from 'lucide-react';

interface NotificationProps {
    notifications: Array<{
        id: string;
        title: string;
        message: string;
        date: string;
        read: boolean;
        type: string;
        orderId?: string;
    }>;
}

export default function NotificationList({ notifications }: NotificationProps) {
    // Format relative time
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
        <div className="space-y-1 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
                <a
                    key={notification.id}
                    href={notification.orderId ? `/dashboard/orders/${notification.orderId}` : '#'}
                    className={`block p-3 rounded-lg transition-colors ${
                        !notification.read
                            ? 'bg-primary/5 hover:bg-primary/10'
                            : 'hover:bg-dark-bg'
                    }`}
                >
                    <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getNotificationTypeClass(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-dark-text">{notification.title}</h4>
                            <p className="text-xs text-dark-textSecondary mt-1">{notification.message}</p>
                            <p className="text-xs text-dark-textSecondary/80 mt-1">{formatDate(notification.date)}</p>
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
            return 'bg-green-900/20 text-green-400';
        case 'progress':
            return 'bg-blue-900/20 text-blue-400';
        case 'message':
            return 'bg-purple-900/20 text-purple-400';
        case 'payment-due':
            return 'bg-amber-900/20 text-amber-400';
        default:
            return 'bg-gray-900/20 text-gray-400';
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