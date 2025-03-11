// src/app/dashboard/messages/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { MessageCircle, Search, Filter, MoreVertical } from 'lucide-react';
import Link from 'next/link';

// Mock data for conversations
const mockConversations = [
    {
        id: '1',
        name: 'Budi Santoso',
        avatar: '/avatars/worker-1.jpg',
        lastMessage: 'Bagaimana progress pengerjaan skripsi Anda?',
        timestamp: '2025-03-05T14:30:00',
        unread: 2,
        orderId: 'ORD-123456',
        orderTitle: 'Pengerjaan Skripsi - Manajemen Bisnis',
        isWorker: true
    },
    {
        id: '2',
        name: 'Arif Rahman',
        avatar: '/avatars/worker-2.jpg',
        lastMessage: 'Saya sudah menyelesaikan perbaikan pada motherboard laptop Anda',
        timestamp: '2025-03-04T09:45:00',
        unread: 0,
        orderId: 'ORD-123457',
        orderTitle: 'Perbaikan Laptop Asus ROG',
        isWorker: true
    },
    {
        id: '3',
        name: 'Customer Support',
        avatar: '/avatars/support.jpg',
        lastMessage: 'Terima kasih telah menghubungi kami. Ada yang bisa kami bantu?',
        timestamp: '2025-03-03T11:20:00',
        unread: 0,
        orderId: null,
        orderTitle: null,
        isWorker: false
    }
];

export default function MessagesPage() {
    const [conversations, setConversations] = useState(mockConversations);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Format date to relative time
    const formatRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return diffInHours === 0 ? 'Just now' : `${diffInHours}h ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays === 1) return 'Yesterday';
            if (diffInDays < 7) return `${diffInDays}d ago`;
            return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        }
    };

    // Filter conversations based on search query
    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (conv.orderTitle && conv.orderTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-dark-text">Messages</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                    New Message
                </button>
            </div>

            {/* Search and Filter */}
            <div className="flex mb-6 gap-2">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-dark-border bg-dark-card rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="Search by name or order..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="p-2 bg-dark-card border border-dark-border rounded-lg hover:bg-dark-bg transition-colors">
                    <Filter className="h-5 w-5 text-gray-400" />
                </button>
            </div>

            {/* Conversations List */}
            <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
                {filteredConversations.length > 0 ? (
                    <div className="divide-y divide-dark-border">
                        {filteredConversations.map((conversation) => (
                            <Link
                                key={conversation.id}
                                href={`/dashboard/messages/${conversation.id}`}
                                className="block hover:bg-dark-bg transition-colors"
                            >
                                <div className="p-4 flex items-center">
                                    <div className="relative mr-4">
                                        <div className="h-12 w-12 rounded-full bg-dark-bg overflow-hidden">
                                            {conversation.avatar ? (
                                                <img src={conversation.avatar} alt={conversation.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-primary/20 text-primary font-medium">
                                                    {conversation.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        {conversation.unread > 0 && (
                                            <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white rounded-full flex items-center justify-center text-xs">
                                                {conversation.unread}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-dark-text font-medium truncate">{conversation.name}</h3>
                                            <span className="text-xs text-dark-textSecondary">
                        {formatRelativeTime(conversation.timestamp)}
                      </span>
                                        </div>
                                        <p className={`text-sm mt-1 truncate ${conversation.unread > 0 ? 'text-dark-text font-medium' : 'text-dark-textSecondary'}`}>
                                            {conversation.lastMessage}
                                        </p>
                                        {conversation.orderTitle && (
                                            <div className="mt-1 flex items-center">
                        <span className="text-xs px-2 py-1 bg-dark-bg rounded text-dark-textSecondary">
                          {conversation.orderTitle}
                        </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 flex flex-col items-center justify-center">
                        <MessageCircle className="h-12 w-12 text-dark-textSecondary mb-4" />
                        <h3 className="text-lg font-medium text-dark-text">No conversations found</h3>
                        <p className="text-dark-textSecondary mt-1">Try with a different search term</p>
                    </div>
                )}
            </div>
        </div>
    );
}