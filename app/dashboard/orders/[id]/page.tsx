// src/app/dashboard/orders/[id]/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import OrderTimeline from '@/components/orders/OrderTimeline';
import ProgressGallery from '@/components/orders/ProgressGallery';

export default function OrderDetailPage() {
    const params = useParams();
    const orderId = params?.id as string;

    // Active tab state
    const [activeTab, setActiveTab] = useState<'details' | 'progress' | 'chat' | 'payment'>('details');

    // Mock order data - in a real application, you would fetch this based on the orderId
    const order = {
        id: orderId || 'ORD-2023-1234',
        title: 'Skripsi S1 - Manajemen',
        description: 'Pengerjaan skripsi bidang manajemen dengan tema "Pengaruh Kualitas Pelayanan Terhadap Kepuasan Pelanggan"',
        category: 'academic',
        worker: {
            id: 'WRK-001',
            name: 'Budi S., M.Ed',
            rating: 4.8,
            completedOrders: 124,
            responseTime: '1 hour',
            avatar: '/images/avatars/worker-1.jpg'
        },
        status: 'in_progress',
        progress: 65,
        created: '2023-11-01',
        deadline: '2023-12-15',
        lastUpdate: '2023-11-29',
        hasUnreadMessages: true,
        hasPendingPayment: false,
        timeline: [
            { date: '2023-11-01', title: 'Order Created', description: 'Your order has been received and is being reviewed.' },
            { date: '2023-11-02', title: 'Worker Assigned', description: 'Budi S., M.Ed has been assigned to your order.' },
            { date: '2023-11-03', title: 'Initial Discussion', description: 'Initial discussion about the requirements and scope of work.' },
            { date: '2023-11-05', title: 'Down Payment Received', description: 'Down payment of Rp 1.200.000 has been received.' },
            { date: '2023-11-10', title: 'Draft Proposal Submitted', description: 'First draft of the proposal has been submitted.' },
            { date: '2023-11-15', title: 'Revision Request', description: 'You requested revisions to the introduction and literature review sections.' },
            { date: '2023-11-20', title: 'Revised Proposal Submitted', description: 'Revised version of the proposal has been submitted.' },
            { date: '2023-11-25', title: 'Progress Update', description: 'Work on Chapter 3 - Research Methodology has begun.' },
            { date: '2023-11-29', title: 'Progress Update', description: 'Draft of Chapter 3 has been completed and shared for review.' },
        ],
        progressUpdates: [
            {
                id: 1,
                date: '2023-11-10',
                title: 'Draft Proposal',
                description: 'First draft of the proposal covering the introduction, problem statement, and research objectives.',
                attachments: [
                    { name: 'proposal-draft-v1.pdf', url: '#', type: 'pdf', size: '1.2 MB' },
                    { name: 'outline.docx', url: '#', type: 'docx', size: '320 KB' },
                ],
                images: [
                    { url: '/images/progress/proposal-1.jpg', alt: 'Proposal Page 1' },
                    { url: '/images/progress/proposal-2.jpg', alt: 'Proposal Page 2' },
                ]
            },
            {
                id: 2,
                date: '2023-11-20',
                title: 'Revised Proposal',
                description: 'Revised proposal with updates to the introduction and literature review based on your feedback.',
                attachments: [
                    { name: 'proposal-draft-v2.pdf', url: '#', type: 'pdf', size: '1.4 MB' },
                ],
                images: [
                    { url: '/images/progress/proposal-revised-1.jpg', alt: 'Revised Proposal Page 1' },
                    { url: '/images/progress/proposal-revised-2.jpg', alt: 'Revised Proposal Page 2' },
                ]
            },
            {
                id: 3,
                date: '2023-11-29',
                title: 'Research Methodology',
                description: 'Draft of Chapter 3 - Research Methodology, including research design, data collection methods, and analysis techniques.',
                attachments: [
                    { name: 'chapter-3-draft.pdf', url: '#', type: 'pdf', size: '1.8 MB' },
                    { name: 'methodology-notes.docx', url: '#', type: 'docx', size: '450 KB' },
                ],
                images: [
                    { url: '/images/progress/methodology-1.jpg', alt: 'Methodology Page 1' },
                    { url: '/images/progress/methodology-2.jpg', alt: 'Methodology Page 2' },
                    { url: '/images/progress/methodology-3.jpg', alt: 'Methodology Page 3' },
                ]
            }
        ],
        payment: {
            total: 3000000,
            downPayment: {
                amount: 1200000,
                status: 'paid',
                date: '2023-11-05',
                method: 'Bank Transfer'
            },
            finalPayment: {
                amount: 1800000,
                status: 'pending',
                dueDate: '2023-12-15',
            }
        }
    };

    // Get status badge color
    const getStatusBadgeClass = () => {
        switch (order.status) {
            case 'in_progress':
                return 'bg-blue-900/30 text-blue-400';
            case 'pending_payment':
                return 'bg-amber-900/30 text-amber-400';
            case 'waiting_review':
                return 'bg-purple-900/30 text-purple-400';
            case 'completed':
                return 'bg-green-900/30 text-green-400';
            case 'cancelled':
                return 'bg-red-900/30 text-red-400';
            default:
                return 'bg-gray-800/30 text-gray-400';
        }
    };

    // Format status text
    const formatStatus = (status: string) => {
        return status.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    return (
        <div className="space-y-6">
            {/* Back button and title */}
            <div className="flex items-center space-x-4">
                <Link
                    href="/dashboard/orders"
                    className="flex items-center text-dark-textSecondary hover:text-dark-text"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Orders
                </Link>
            </div>

            {/* Order header */}
            <div className="bg-dark-card rounded-lg shadow p-6 border border-dark-border">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <div className="flex items-center">
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusBadgeClass()}`}>
                                {formatStatus(order.status)}
                            </span>
                            {order.hasUnreadMessages && (
                                <span className="ml-2 bg-blue-900/30 text-blue-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    New Message
                                </span>
                            )}
                            {order.hasPendingPayment && (
                                <span className="ml-2 bg-amber-900/30 text-amber-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    Payment Due
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-dark-text mt-2">{order.title}</h1>
                        <div className="text-dark-textSecondary mt-1">Order ID: {order.id}</div>
                    </div>

                    <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                        {order.status === 'pending_payment' && (
                            <Link
                                href={`/dashboard/orders/${order.id}/payment`}
                                className="px-4 py-2 bg-amber-500 text-dark-text font-medium rounded-lg hover:bg-amber-600 transition-colors"
                            >
                                Make Payment
                            </Link>
                        )}

                        <Link
                            href={`/dashboard/orders/${order.id}/chat`}
                            className="px-4 py-2 bg-primary text-dark-text font-medium rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            {order.hasUnreadMessages ? 'Reply to Messages' : 'Chat with Worker'}
                        </Link>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-dark-text">Progress: {order.progress}%</span>
                        <span className="text-sm font-medium text-dark-text">
                            Deadline: {formatDate(order.deadline)}
                        </span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-2.5">
                        <div
                            className={`h-2.5 rounded-full ${
                                order.progress < 30
                                    ? 'bg-blue-500'
                                    : order.progress < 70
                                        ? 'bg-amber-500'
                                        : 'bg-green-500'
                            }`}
                            style={{ width: `${order.progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-dark-card rounded-lg shadow border border-dark-border">
                <div className="border-b border-dark-border">
                    <nav className="flex">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`px-4 py-3 text-sm font-medium border-b-2 ${
                                activeTab === 'details'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-dark-textSecondary hover:text-dark-text hover:border-dark-border'
                            }`}
                        >
                            Order Details
                        </button>
                        <button
                            onClick={() => setActiveTab('progress')}
                            className={`px-4 py-3 text-sm font-medium border-b-2 ${
                                activeTab === 'progress'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-dark-textSecondary hover:text-dark-text hover:border-dark-border'
                            }`}
                        >
                            Progress Updates
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`px-4 py-3 text-sm font-medium border-b-2 ${
                                activeTab === 'chat'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-dark-textSecondary hover:text-dark-text hover:border-dark-border'
                            }`}
                        >
                            Chat
                            {order.hasUnreadMessages && (
                                <span className="ml-2 bg-blue-900/30 text-blue-400 text-xs font-medium px-2 py-0.5 rounded-full">
                                    New
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('payment')}
                            className={`px-4 py-3 text-sm font-medium border-b-2 ${
                                activeTab === 'payment'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-dark-textSecondary hover:text-dark-text hover:border-dark-border'
                            }`}
                        >
                            Payment
                            {order.hasPendingPayment && (
                                <span className="ml-2 bg-amber-900/30 text-amber-400 text-xs font-medium px-2 py-0.5 rounded-full">
                                    Due
                                </span>
                            )}
                        </button>
                    </nav>
                </div>

                {/* Tab content */}
                <div className="p-6">
                    {activeTab === 'details' && (
                        <div className="space-y-6">
                            {/* Order details */}
                            <div>
                                <h2 className="text-lg font-medium text-dark-text mb-4">Order Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-dark-textSecondary">Description</h3>
                                        <p className="mt-1 text-sm text-dark-text">{order.description}</p>

                                        <h3 className="text-sm font-medium text-dark-textSecondary mt-4">Category</h3>
                                        <p className="mt-1 text-sm text-dark-text">{order.category === 'academic' ? 'Academic' : 'Electronic'}</p>

                                        <h3 className="text-sm font-medium text-dark-textSecondary mt-4">Created</h3>
                                        <p className="mt-1 text-sm text-dark-text">{formatDate(order.created)}</p>

                                        <h3 className="text-sm font-medium text-dark-textSecondary mt-4">Deadline</h3>
                                        <p className="mt-1 text-sm text-dark-text">{formatDate(order.deadline)}</p>

                                        <h3 className="text-sm font-medium text-dark-textSecondary mt-4">Last Update</h3>
                                        <p className="mt-1 text-sm text-dark-text">{formatDate(order.lastUpdate)}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-dark-textSecondary">Assigned Worker</h3>
                                        <div className="mt-2 flex items-start">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-dark-bg flex items-center justify-center text-dark-textSecondary">
                                                    {order.worker.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-dark-text">{order.worker.name}</p>
                                                <div className="flex items-center mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="ml-1 text-sm text-dark-textSecondary">{order.worker.rating}</span>
                                                    <span className="mx-2 text-dark-border">•</span>
                                                    <span className="text-sm text-dark-textSecondary">{order.worker.completedOrders} orders completed</span>
                                                </div>
                                                <p className="text-sm text-dark-textSecondary mt-1">
                                                    Avg. Response Time: {order.worker.responseTime}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h3 className="text-sm font-medium text-dark-textSecondary">Payment Summary</h3>
                                            <div className="mt-2 bg-dark-bg p-4 rounded-lg border border-dark-border/50">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-dark-textSecondary">Total Amount:</span>
                                                    <span className="font-medium text-dark-text">Rp {order.payment.total.toLocaleString('id-ID')}</span>
                                                </div>
                                                <div className="flex justify-between text-sm mt-2">
                                                    <span className="text-dark-textSecondary">Down Payment:</span>
                                                    <span className="font-medium text-dark-text">Rp {order.payment.downPayment.amount.toLocaleString('id-ID')}</span>
                                                </div>
                                                <div className="flex justify-between text-sm mt-2">
                                                    <span className="text-dark-textSecondary">Final Payment:</span>
                                                    <span className="font-medium text-dark-text">Rp {order.payment.finalPayment.amount.toLocaleString('id-ID')}</span>
                                                </div>
                                                <div className="mt-4 pt-3 border-t border-dark-border">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="font-medium text-dark-text">Payment Status:</span>
                                                        <span className={`${
                                                            order.payment.finalPayment.status === 'paid'
                                                                ? 'text-green-500'
                                                                : 'text-amber-500'
                                                        }`}>
                                                            {order.payment.finalPayment.status === 'paid'
                                                                ? 'Fully Paid'
                                                                : 'Partial Payment (Down Payment)'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h2 className="text-lg font-medium text-dark-text mb-4">Order Timeline</h2>
                                <OrderTimeline timeline={order.timeline} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'progress' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-dark-text mb-4">Progress Updates</h2>
                            <ProgressGallery progressUpdates={order.progressUpdates} />
                        </div>
                    )}

                    {activeTab === 'chat' && (
                        <div className="text-center py-20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-dark-textSecondary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-dark-textSecondary">The chat interface is available on a separate page for better experience.</p>
                            <Link
                                href={`/dashboard/orders/${order.id}/chat`}
                                className="mt-4 inline-flex items-center px-4 py-2 bg-primary text-dark-text font-medium rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                Go to Chat
                            </Link>
                        </div>
                    )}

                    {activeTab === 'payment' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-medium text-dark-text mb-4">Payment Details</h2>

                            <div className="bg-dark-bg p-6 rounded-lg border border-dark-border/50">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold text-dark-text">Total: Rp {order.payment.total.toLocaleString('id-ID')}</h3>
                                        <p className="text-dark-textSecondary mt-1">Order ID: {order.id}</p>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            order.payment.finalPayment.status === 'paid'
                                                ? 'bg-green-900/30 text-green-400'
                                                : 'bg-amber-900/30 text-amber-400'
                                        }`}>
                                            {order.payment.finalPayment.status === 'paid'
                                                ? 'Fully Paid'
                                                : 'Partial Payment'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-6">
                                    {/* Down Payment */}
                                    <div className="border-b border-dark-border pb-6">
                                        <div className="flex justify-between">
                                            <div>
                                                <h4 className="font-medium text-dark-text">Down Payment</h4>
                                                <p className="text-dark-textSecondary text-sm mt-1">Paid on {formatDate(order.payment.downPayment.date)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-dark-text">Rp {order.payment.downPayment.amount.toLocaleString('id-ID')}</p>
                                                <p className="text-sm text-green-500">Paid</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 bg-green-900/10 border border-green-900/20 rounded-lg p-3">
                                            <div className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                <div>
                                                    <p className="text-sm text-dark-text">Payment received via {order.payment.downPayment.method}</p>
                                                    <p className="text-xs text-dark-textSecondary mt-1">Transaction ID: TRXDP-{order.id}-001</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Final Payment */}
                                    <div>
                                        <div className="flex justify-between">
                                            <div>
                                                <h4 className="font-medium text-dark-text">Final Payment</h4>
                                                <p className="text-dark-textSecondary text-sm mt-1">
                                                    {order.payment.finalPayment.status === 'paid'
                                                        ? 'Paid on ' + formatDate(order.payment.finalPayment.dueDate)
                                                        : 'Due on ' + formatDate(order.payment.finalPayment.dueDate)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-dark-text">Rp {order.payment.finalPayment.amount.toLocaleString('id-ID')}</p>
                                                <p className={`text-sm ${
                                                    order.payment.finalPayment.status === 'paid'
                                                        ? 'text-green-500'
                                                        : 'text-amber-500'
                                                }`}>
                                                    {order.payment.finalPayment.status === 'paid' ? 'Paid' : 'Pending'}
                                                </p>
                                            </div>
                                        </div>

                                        {order.payment.finalPayment.status === 'pending' && (
                                            <div className="mt-4">
                                                <Link
                                                    href={`/dashboard/orders/${order.id}/payment`}
                                                    className="w-full block text-center py-2 bg-amber-500 text-dark-text font-medium rounded-lg hover:bg-amber-600 transition-colors"
                                                >
                                                    Make Final Payment
                                                </Link>
                                                <p className="text-center text-xs text-dark-textSecondary mt-2">
                                                    Note: Final payment is only due after the work is completed
                                                </p>
                                            </div>
                                        )}

                                        {order.payment.finalPayment.status === 'paid' && (
                                            <div className="mt-4 bg-green-900/10 border border-green-900/20 rounded-lg p-3">
                                                <div className="flex items-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <div>
                                                        <p className="text-sm text-dark-text">Payment received via Bank Transfer</p>
                                                        <p className="text-xs text-dark-textSecondary mt-1">Transaction ID: TRXFP-{order.id}-001</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 bg-blue-900/10 rounded-lg p-4 border border-blue-900/20">
                                <h3 className="font-medium text-blue-400 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Payment Information
                                </h3>
                                <div className="mt-2 text-sm text-dark-text">
                                    <p>• Down payment is required to start the work.</p>
                                    <p>• Final payment is only due after the work is completed and you are satisfied.</p>
                                    <p>• All payments are secure and protected by our guarantee policy.</p>
                                    <p>• If you have any questions about payments, please contact our support team.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}