// components/admin/ActivityLog.tsx
import React from 'react';

interface Activity {
    id: number;
    actor: string;
    action: string;
    target: string;
    timestamp: string;
}

interface ActivityLogProps {
    activities: Activity[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
    // Format tanggal dengan format yang lebih mudah dibaca
    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'baru saja';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} menit yang lalu`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} jam yang lalu`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} hari yang lalu`;
        }
    };

    return (
        <div className="space-y-4">
            {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 py-3 border-b border-dark-border last:border-0">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-xs font-medium">{activity.actor.charAt(0)}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-dark-text">
                            <span className="font-medium">{activity.actor}</span>{' '}
                            {activity.action}{' '}
                            <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-dark-textSecondary mt-1">
                            {formatTimeAgo(activity.timestamp)}
                        </p>
                    </div>
                </div>
            ))}

            {activities.length === 0 && (
                <div className="py-6 text-center text-dark-textSecondary">
                    Tidak ada aktivitas terbaru.
                </div>
            )}

            {activities.length > 0 && (
                <div className="pt-2 text-center">
                    <a href="/admin/aktivitas" className="text-primary hover:underline text-sm">
                        Lihat semua aktivitas
                    </a>
                </div>
            )}
        </div>
    );
};

export default ActivityLog;