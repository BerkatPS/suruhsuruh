// src/components/dashboard/OrderStatus.tsx
import Link from 'next/link';
import { MessageSquare, Check, Clock, AlertCircle, CreditCard, X } from 'lucide-react';

interface OrderStatusProps {
    order: {
        id: string;
        title: string;
        category: 'academic' | 'electronic';
        worker: string;
        status: 'in_progress' | 'pending_payment' | 'waiting_review' | 'completed' | 'cancelled';
        progress: number;
        deadline: string;
        lastUpdate: string;
        hasUnreadMessages: boolean;
        hasPendingPayment: boolean;
    };
}

export default function OrderStatus({ order }: OrderStatusProps) {
    // Format date to readable format
    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(date).toLocaleDateString('id-ID', options);
    };

    // Get status icon and color
    const getStatusDetails = (status: string) => {
        switch (status) {
            case 'in_progress':
                return {
                    icon: <Clock className="h-5 w-5" />,
                    label: 'In Progress',
                    bgColor: 'bg-blue-900/20',
                    textColor: 'text-blue-400'
                };
            case 'pending_payment':
                return {
                    icon: <CreditCard className="h-5 w-5" />,
                    label: 'Pending Payment',
                    bgColor: 'bg-amber-900/20',
                    textColor: 'text-amber-400'
                };
            case 'waiting_review':
                return {
                    icon: <AlertCircle className="h-5 w-5" />,
                    label: 'Waiting Review',
                    bgColor: 'bg-purple-900/20',
                    textColor: 'text-purple-400'
                };
            case 'completed':
                return {
                    icon: <Check className="h-5 w-5" />,
                    label: 'Completed',
                    bgColor: 'bg-green-900/20',
                    textColor: 'text-green-400'
                };
            case 'cancelled':
                return {
                    icon: <X className="h-5 w-5" />,
                    label: 'Cancelled',
                    bgColor: 'bg-red-900/20',
                    textColor: 'text-red-400'
                };
            default:
                return {
                    icon: <AlertCircle className="h-5 w-5" />,
                    label: 'Unknown',
                    bgColor: 'bg-gray-900/20',
                    textColor: 'text-gray-400'
                };
        }
    };

    const status = getStatusDetails(order.status);

    // Get progress color class
    const getProgressColorClass = (progress: number) => {
        if (progress < 30) return 'bg-blue-500';
        if (progress < 70) return 'bg-amber-500';
        return 'bg-green-500';
    };

    // Get category class
    const getCategoryClass = (category: string) => {
        switch (category) {
            case 'academic':
                return 'bg-blue-900/20 text-blue-400';
            case 'electronic':
                return 'bg-green-900/20 text-green-400';
            default:
                return 'bg-gray-900/20 text-gray-400';
        }
    };

    return (
        <div className="bg-dark-card border border-dark-border/30 rounded-lg overflow-hidden hover:shadow-card hover:border-dark-border/60 transition-all">
            <Link href={`/dashboard/orders/${order.id}`} className="block">
                <div className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        {/* Order basic info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-dark-textSecondary">{order.id}</span>
                                <span className={`px-2 py-0.5 rounded text-xs ${getCategoryClass(order.category)}`}>
                  {order.category === 'academic' ? 'Academic' : 'Electronic'}
                </span>
                                {order.hasUnreadMessages && (
                                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    New Message
                  </span>
                                )}
                            </div>
                            <h3 className="text-lg font-medium text-dark-text">{order.title}</h3>
                            <p className="text-dark-textSecondary text-sm mt-1">Worker: {order.worker}</p>
                        </div>

                        {/* Status and date */}
                        <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${status.bgColor} ${status.textColor} mb-1.5`}>
                                {status.icon}
                                <span className="text-sm font-medium">{status.label}</span>
                            </div>
                            <div className="text-sm text-dark-textSecondary flex flex-col items-start md:items-end">
                                <span>Deadline: {formatDate(order.deadline)}</span>
                                <span>Updated: {formatDate(order.lastUpdate)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-dark-textSecondary">Progress</span>
                            <span className="text-dark-textSecondary">{order.progress}%</span>
                        </div>
                        <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                            <div
                                className={`h-full ${getProgressColorClass(order.progress)}`}
                                style={{ width: `${order.progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                        {order.hasPendingPayment && (
                            <div className="px-3 py-1.5 bg-amber-900/20 text-amber-400 rounded-lg text-sm font-medium cursor-pointer hover:bg-amber-900/30 transition-colors">
                                Make Payment
                            </div>
                        )}
                        <div className="px-3 py-1.5 bg-dark-bg text-dark-text rounded-lg text-sm font-medium cursor-pointer hover:bg-dark-border/40 transition-colors">
                            View Details
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}