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

    // Fungsi untuk mendapatkan inisial dari nama
    const getInitials = (name: string) => {
        return name.charAt(0);
    };

    // Fungsi untuk mendapatkan warna avatar berdasarkan actor
    const getAvatarColor = (actor: string) => {
        switch (actor.toLowerCase()) {
            case 'admin':
                return 'bg-purple-500/10 text-purple-500';
            case 'sistem':
                return 'bg-blue-500/10 text-blue-500';
            default:
                return 'bg-amber-500/10 text-amber-500';
        }
    };

    return (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getAvatarColor(activity.actor)} flex items-center justify-center`}>
                        <span className="font-medium">{getInitials(activity.actor)}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-sm text-white">
                            <span className="font-medium">{activity.actor}</span>
                            {' '}{activity.action}
                            {activity.target && (
                                <span className="font-medium"> {activity.target}</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-400">{formatDate(activity.timestamp)}</p>
                    </div>
                </div>
            ))}

            {activities.length === 0 && (
                <div className="py-6 text-center text-gray-400">
                    Tidak ada aktivitas terbaru.
                </div>
            )}
        </div>
    );
};

export default ActivityLog;