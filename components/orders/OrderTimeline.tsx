// src/components/orders/OrderTimeline.tsx
import React from 'react';

interface TimelineProps {
    timeline: Array<{
        date: string;
        title: string;
        description: string;
    }>;
}

export default function OrderTimeline({ timeline }: TimelineProps) {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <div className="relative pl-8 space-y-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-dark-border z-0"></div>

            {timeline.map((event, index) => (
                <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-8 mt-1.5 h-6 w-6 rounded-full bg-dark-bg border-2 border-primary z-10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>

                    {/* Event content */}
                    <div className="bg-dark-card rounded-lg p-4 border border-dark-border/30 shadow-sm">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                            <h3 className="font-medium text-dark-text">{event.title}</h3>
                            <span className="text-sm text-dark-textSecondary">{formatDate(event.date)}</span>
                        </div>
                        <p className="text-sm text-dark-textSecondary">{event.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}