// src/app/dashboard/orders/[id]/chat/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';

export default function OrderChatPage() {
    const params = useParams<{ id: string }>();
    const orderId = params?.id;

    if (!orderId) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center p-8 bg-dark-card rounded-lg shadow">
                    <h2 className="text-xl font-semibold text-red-600">Order ID tidak ditemukan</h2>
                    <p className="mt-2 text-gray-600">Silakan kembali ke halaman pesanan</p>
                    <Link href="/dashboard/orders" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded">
                        Kembali ke Daftar Pesanan
                    </Link>
                </div>
            </div>
        );
    }

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // In a real app, you would fetch messages from an API
    useEffect(() => {
        // Simulate loading messages from API
        const timer = setTimeout(() => {
            // Mock messages data
            const mockMessages = [
                {
                    id: 1,
                    sender: 'worker',
                    text: 'Hello! Thank you for your order. I will be working on your skripsi. Do you have any specific requirements or guidelines that you would like me to follow?',
                    timestamp: '2023-11-02T09:30:00',
                    read: true,
                },
                {
                    id: 2,
                    sender: 'user',
                    text: 'Hi, thank you for accepting my order. Yes, I have some specific requirements. I need the skripsi to follow the latest APA format, and it should include at least 30 references. The main focus should be on customer satisfaction in service industries.',
                    timestamp: '2023-11-02T10:15:00',
                    read: true,
                },
                {
                    id: 3,
                    sender: 'worker',
                    text: 'I understand. APA format and 30+ references with a focus on customer satisfaction in service industries. Do you have any specific industries or companies in mind that you would like me to focus on?',
                    timestamp: '2023-11-02T10:20:00',
                    read: true,
                },
                {
                    id: 4,
                    sender: 'user',
                    text: 'Yes, I would like to focus on the banking and telecommunication industries in Indonesia. If possible, include some case studies from BCA, Mandiri, Telkomsel, and Indosat.',
                    timestamp: '2023-11-02T10:45:00',
                    read: true,
                },
                {
                    id: 5,
                    sender: 'worker',
                    text: 'Perfect! I will focus on banking and telecommunication industries in Indonesia with case studies from those companies. I will start working on the introduction and literature review. I will share a draft with you in a few days. Is there anything else you would like me to know?',
                    timestamp: '2023-11-02T11:00:00',
                    read: true,
                    attachments: [
                        {
                            name: 'initial_outline.pdf',
                            url: '#',
                            size: '245 KB'
                        }
                    ]
                },
                {
                    id: 6,
                    sender: 'user',
                    text: 'That sounds good. I would also like to include some information about digital transformation in these industries and how it affects customer satisfaction. Please make sure to include this aspect as well.',
                    timestamp: '2023-11-02T11:30:00',
                    read: true,
                },
                {
                    id: 7,
                    sender: 'worker',
                    text: 'I will definitely include digital transformation and its impact on customer satisfaction in these industries. It is a very relevant topic. I will update you with the progress soon.',
                    timestamp: '2023-11-02T11:45:00',
                    read: true,
                },
                {
                    id: 8,
                    sender: 'worker',
                    text: 'Hello! I have completed the initial draft of the introduction and literature review chapters. Please take a look and let me know if you would like any changes or additions.',
                    timestamp: '2023-11-10T14:20:00',
                    read: false,
                    attachments: [
                        {
                            name: 'introduction_draft.pdf',
                            url: '#',
                            size: '756 KB'
                        },
                        {
                            name: 'literature_review_draft.pdf',
                            url: '#',
                            size: '1.2 MB'
                        }
                    ]
                }
            ];

            setMessages(mockMessages);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Send a new message
    const sendMessage = (text: string, attachments: File[] = []) => {
        // In a real app, you would send this to an API
        const newMessage = {
            id: messages.length + 1,
            sender: 'user',
            text,
            timestamp: new Date().toISOString(),
            read: false,
            attachments: attachments.length > 0 ? attachments.map(file => ({
                name: file.name,
                url: '#',
                size: `${Math.round(file.size / 1024)} KB`
            })) : undefined
        };

        setMessages([...messages, newMessage]);

        // Simulate worker response after a delay
        if (messages.length > 0) {
            setTimeout(() => {
                const workerResponse = {
                    id: messages.length + 2,
                    sender: 'worker',
                    text: 'Thank you for your message. I will get back to you as soon as possible.',
                    timestamp: new Date().toISOString(),
                    read: false,
                };

                setMessages(prev => [...prev, workerResponse]);
            }, 3000);
        }
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: 'short',
        }).format(date);
    };

    // Group messages by date
    const groupMessagesByDate = () => {
        const groups: { [key: string]: typeof messages } = {};

        messages.forEach(message => {
            const date = new Date(message.timestamp).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });

        return groups;
    };

    // Get worker info
    const workerInfo = {
        name: 'Budi S., M.Ed',
        avatar: '/images/avatars/worker-1.jpg',
        rating: 4.8,
        responseTime: '1 hour',
        status: 'online',
    };

    return (
        <div className="h-[calc(100vh-10rem)] flex flex-col bg-dark-bg rounded-lg shadow overflow-hidden">
            {/* Chat header */}
            <div className="bg-dark-card border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Link
                        href={`/dashboard/orders/${orderId}`}
                        className="mr-4 text-gray-600 hover:text-gray-900"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-primary/10">
                            {workerInfo.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <div className="flex items-center">
                                <h3 className="text-lg font-medium text-primary/10">{workerInfo.name}</h3>
                                <span className={`ml-2 h-2 w-2 rounded-full ${workerInfo.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                            </div>
                            <p className="text-sm text-gray-500">
                                Response time: {workerInfo.responseTime}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <Link
                        href={`/dashboard/orders/${orderId}`}
                        className="text-primary hover:text-primary-dark text-sm font-medium"
                    >
                        View Order Details
                    </Link>
                </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-dark-card">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        <p className="mt-4 text-gray-500">Loading messages...</p>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No messages yet</h3>
                        <p className="mt-1 text-gray-500">Start the conversation by sending a message.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {Object.entries(groupMessagesByDate()).map(([date, msgs]) => (
                            <div key={date}>
                                <div className="relative flex items-center my-5">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink-0 mx-4 text-xs text-gray-500">{new Date(date).toLocaleDateString('id-ID', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>
                                <div className="space-y-4">
                                    {msgs.map(message => (
                                        <ChatMessage
                                            key={message.id}
                                            message={message}
                                            formatDate={formatDate}
                                            isUser={message.sender === 'user'}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Chat input */}
            <div className="p-4 border-t bg-primary/100">
                <ChatInput onSendMessage={sendMessage} />
            </div>
        </div>
    );
}