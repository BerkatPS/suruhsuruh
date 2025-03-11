// src/components/dashboard/StatsCard.tsx
import React from 'react';

interface StatsCardProps {
    stat: {
        title: string;
        value: number;
        change: string;
        changeType: 'increase' | 'decrease' | 'neutral';
        icon: React.ReactNode;
        color: string;
    };
}

export default function StatsCard({ stat }: StatsCardProps) {
    // Get icon background color class
    const getIconBgClass = (color: string) => {
        switch (color) {
            case 'blue':
                return 'bg-blue-900/20 text-blue-400';
            case 'green':
                return 'bg-green-900/20 text-green-400';
            case 'amber':
                return 'bg-amber-900/20 text-amber-400';
            case 'purple':
                return 'bg-purple-900/20 text-purple-400';
            case 'red':
                return 'bg-red-900/20 text-red-400';
            default:
                return 'bg-gray-900/20 text-gray-400';
        }
    };

    // Get change color class
    const getChangeColorClass = (changeType: string) => {
        switch (changeType) {
            case 'increase':
                return 'text-green-400';
            case 'decrease':
                return 'text-red-400';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div className="bg-dark-card rounded-lg shadow-card border border-dark-border/30 p-6 hover:border-dark-border/60 transition-colors">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-dark-textSecondary text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-dark-text mt-1">{stat.value}</p>
                </div>
                <div className={`rounded-full p-3 ${getIconBgClass(stat.color)}`}>
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