// components/admin/StatCard.tsx
import React, { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon: ReactNode;
    color: 'blue' | 'green' | 'amber' | 'purple' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
    const getColorClasses = (color: string) => {
        switch (color) {
            case 'blue':
                return 'bg-blue-500/10 text-blue-500 ring-blue-500/20';
            case 'green':
                return 'bg-green-500/10 text-green-500 ring-green-500/20';
            case 'amber':
                return 'bg-amber-500/10 text-amber-500 ring-amber-500/20';
            case 'purple':
                return 'bg-purple-500/10 text-purple-500 ring-purple-500/20';
            case 'red':
                return 'bg-red-500/10 text-red-500 ring-red-500/20';
            default:
                return 'bg-primary/10 text-primary ring-primary/20';
        }
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
            <div className="flex items-center">
                <div className={`w-12 h-12 rounded-lg ${getColorClasses(color)} flex items-center justify-center ring-1`}>
                    {icon}
                </div>
                <div className="ml-4">
                    <h3 className="text-dark-textSecondary text-sm font-medium">{title}</h3>
                    <p className="text-dark-text text-2xl font-semibold mt-1">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;