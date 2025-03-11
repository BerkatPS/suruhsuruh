// src/app/dashboard/orders/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import OrderStatus from '@/components/dashboard/OrderStatus';

export default function OrdersPage() {
    // Filter states
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Mock orders data
    const allOrders = [
        {
            id: 'ORD-2023-1234',
            title: 'Skripsi S1 - Manajemen',
            category: 'academic' as 'academic', // Cast to specific type
            worker: 'Budi S., M.Ed',
            status: 'in_progress' as 'in_progress',
            progress: 65,
            deadline: '2023-12-15',
            lastUpdate: '2023-11-29',
            hasUnreadMessages: true,
            hasPendingPayment: false,
        },
        {
            id: 'ORD-2023-1235',
            title: 'iPhone 12 Screen Repair',
            category: 'electronic' as 'electronic', // Cast to specific type
            worker: 'Teknisi Andi',
            status: 'pending_payment' as 'pending_payment',
            progress: 30,
            deadline: '2023-12-05',
            lastUpdate: '2023-11-28',
            hasUnreadMessages: false,
            hasPendingPayment: true,
        },
        {
            id: 'ORD-2023-1236',
            title: 'Makalah Ekonomi Makro',
            category: 'academic' as 'academic', // Cast to specific type
            worker: 'Sri Wahyuni, M.Sc',
            status: 'waiting_review' as 'waiting_review',
            progress: 95,
            deadline: '2023-12-01',
            lastUpdate: '2023-11-30',
            hasUnreadMessages: true,
            hasPendingPayment: false,
        },
        {
            id: 'ORD-2023-1222',
            title: 'Laptop Dell XPS Repair',
            category: 'electronic' as 'electronic', // Cast to specific type
            worker: 'Teknisi Budi',
            status: 'completed' as 'completed',
            progress: 100,
            deadline: '2023-11-20',
            lastUpdate: '2023-11-18',
            hasUnreadMessages: false,
            hasPendingPayment: false,
        },
        {
            id: 'ORD-2023-1221',
            title: 'Presentasi PowerPoint - Marketing',
            category: 'academic' as 'academic', // Cast to specific type
            worker: 'Ahmad K., MBA',
            status: 'completed' as 'completed',
            progress: 100,
            deadline: '2023-11-15',
            lastUpdate: '2023-11-14',
            hasUnreadMessages: false,
            hasPendingPayment: false,
        },
        {
            id: 'ORD-2023-1220',
            title: 'Air Conditioner Service',
            category: 'electronic' as 'electronic', // Cast to specific type
            worker: 'Teknisi Dani',
            status: 'cancelled' as 'cancelled',
            progress: 10,
            deadline: '2023-11-10',
            lastUpdate: '2023-11-05',
            hasUnreadMessages: false,
            hasPendingPayment: false,
        },
    ];

    // Filter and search orders
    const filteredOrders = allOrders.filter(order => {
        // Status filter
        if (statusFilter !== 'all' && order.status !== statusFilter) {
            return false;
        }

        // Category filter
        if (categoryFilter !== 'all' && order.category !== categoryFilter) {
            return false;
        }

        // Search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                order.title.toLowerCase().includes(query) ||
                order.id.toLowerCase().includes(query) ||
                order.worker.toLowerCase().includes(query)
            );
        }

        return true;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
                <Link
                    href="/dashboard/orders/create"
                    className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Order
                </Link>
            </div>

            {/* Filters and search */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        >
                            <option value="all">All Statuses</option>
                            <option value="in_progress">In Progress</option>
                            <option value="pending_payment">Pending Payment</option>
                            <option value="waiting_review">Waiting Review</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            id="category-filter"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        >
                            <option value="all">All Categories</option>
                            <option value="academic">Academic</option>
                            <option value="electronic">Electronic</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                            Search
                        </label>
                        <div className="relative">
                            <input
                                id="search"
                                type="text"
                                placeholder="Search by order ID, title, or worker"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary pr-10"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders list */}
            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <OrderStatus key={order.id} order={order} />
                    ))
                ) : (
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900">No orders found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchQuery
                                ? "No orders match your search criteria"
                                : "Try changing your filters or create a new order"}
                        </p>
                        {!searchQuery && (
                            <div className="mt-6">
                                <Link
                                    href="/services"
                                    className="inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
                                >
                                    Explore Services
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredOrders.length > 0 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of{' '}
                        <span className="font-medium">{filteredOrders.length}</span> orders
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            disabled
                        >
                            Previous
                        </button>
                        <button
                            className="px-3 py-1 rounded-md bg-primary text-white font-medium hover:bg-primary-dark"
                        >
                            1
                        </button>
                        <button
                            className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            disabled
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}