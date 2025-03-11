// src/app/dashboard/messages/[id]/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, PaperclipIcon, ImageIcon, FileIcon, MoreVertical, InfoIcon } from 'lucide-react';
import Link from 'next/link';

// Mock message data
const mockMessages = {
    '1': [
        {
            id: 'm1',
            text: 'Halo, saya Budi Santoso yang akan membantu pengerjaan skripsi Anda.',
            timestamp: '2025-03-03T09:00:00',
            sender: 'worker',
            read: true,
        },
        {
            id: 'm2',
            text: 'Terima kasih telah memilih layanan kami. Saya sudah membaca kebutuhan Anda dan saya ingin bertanya beberapa hal terkait dengan skripsi yang akan dikerjakan.',
            timestamp: '2025-03-03T09:01:30',
            sender: 'worker',
            read: true,
        },
        {
            id: 'm3',
            text: 'Halo Pak Budi, terima kasih. Silakan tanyakan apa yang perlu bapak ketahui.',
            timestamp: '2025-03-03T09:10:00',
            sender: 'customer',
            read: true,
        },
        {
            id: 'm4',
            text: 'Baik, apakah Anda sudah memiliki judul yang spesifik atau masih membutuhkan bantuan untuk menentukan judul?',
            timestamp: '2025-03-03T09:15:00',
            sender: 'worker',
            read: true,
        },
        {
            id: 'm5',
            text: 'Saya belum memiliki judul yang spesifik, tapi saya tertarik dengan topik manajemen pemasaran digital.',
            timestamp: '2025-03-03T09:20:00',
            sender: 'customer',
            read: true,
        },
        {
            id: 'm6',
            text: 'Baik, untuk topik manajemen pemasaran digital, saya bisa membantu Anda menentukan judul yang relevan dan menarik. Saya akan mengirimkan beberapa rekomendasi judul beserta outlinenya besok.',
            timestamp: '2025-03-03T09:25:00',
            sender: 'worker',
            read: true,
        },
        {
            id: 'm7',
            text: 'Terima kasih, saya akan menunggu rekomendasinya.',
            timestamp: '2025-03-03T09:30:00',
            sender: 'customer',
            read: true,
        },
        {
            id: 'm8',
            text: 'Bagaimana progress pengerjaan skripsi Anda?',
            timestamp: '2025-03-05T14:30:00',
            sender: 'worker',
            read: false,
        },
    ],
    '2': [
        {
            id: 'm1',
            text: 'Halo, saya Arif dari tim teknisi. Saya yang akan menangani perbaikan laptop Asus ROG Anda.',
            timestamp: '2025-03-01T10:15:00',
            sender: 'worker',
            read: true,
        },
        {
            id: 'm2',
            text: 'Halo Pak Arif, terima kasih. Laptop saya sering blue screen dan kadang tidak mau menyala.',
            timestamp: '2025-03-01T10:20:00',
            sender: 'customer',
            read: true,
        },
        {
            id: 'm3',
            text: 'Saya sudah menyelesaikan perbaikan pada motherboard laptop Anda. Ada beberapa kapasitor yang perlu diganti dan sudah berhasil diperbaiki.',
            timestamp: '2025-03-04T09:45:00',
            sender: 'worker',
            read: true,
            attachments: [
                {
                    type: 'image',
                    url: '/images/repair-1.jpg',
                    name: 'motherboard-repair.jpg'
                }
            ]
        }
    ]
};

// Mock conversation info
const mockConversationInfo = {
    '1': {
        id: '1',
        name: 'Budi Santoso',
        avatar: '/avatars/worker-1.jpg',
        orderId: 'ORD-123456',
        orderTitle: 'Pengerjaan Skripsi - Manajemen Bisnis',
        isWorker: true
    },
    '2': {
        id: '2',
        name: 'Arif Rahman',
        avatar: '/avatars/worker-2.jpg',
        orderId: 'ORD-123457',
        orderTitle: 'Perbaikan Laptop Asus ROG',
        isWorker: true
    }
};

export default function ChatPage({ params }: { params: { id: string } }) {
    const [messages, setMessages] = useState<any[]>([]);
    const [conversation, setConversation] = useState<any>(null);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setMessages(mockMessages[params.id as keyof typeof mockMessages] || []);
            setConversation(mockConversationInfo[params.id as keyof typeof mockConversationInfo] || null);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [params.id]);

    useEffect(() => {
        // Scroll to bottom when messages change
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newMsg = {
            id: `new-${Date.now()}`,
            text: newMessage.trim(),
            timestamp: new Date().toISOString(),
            sender: 'customer',
            read: false,
        };

        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
    };

    // Format timestamp
    const formatMessageTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    };

    // Group messages by date
    const groupMessagesByDate = (msgs: any[]) => {
        const groups: { [key: string]: any[] } = {};

        msgs.forEach(msg => {
            const date = new Date(msg.timestamp).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            if (!groups[date]) {
                groups[date] = [];
            }

            groups[date].push(msg);
        });

        return groups;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!conversation) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-xl font-semibold mb-2">Conversation not found</h2>
                <p className="text-dark-textSecondary mb-4">The conversation you're looking for doesn't exist or you don't have access to it.</p>
                <Link
                    href="/dashboard/messages"
                    className="flex items-center text-primary hover:underline"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to all messages
                </Link>
            </div>
        );
    }

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <div className="h-[calc(100vh-10rem)] flex flex-col bg-dark-card rounded-lg border border-dark-border overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-dark-border">
                <div className="flex items-center">
                    <Link href="/dashboard/messages" className="mr-2 text-dark-textSecondary hover:text-dark-text">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div className="h-10 w-10 rounded-full bg-dark-bg overflow-hidden mr-3">
                        {conversation.avatar ? (
                            <img src={conversation.avatar} alt={conversation.name} className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center bg-primary/20 text-primary font-medium">
                                {conversation.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-medium text-dark-text">{conversation.name}</h3>
                        {conversation.orderTitle && (
                            <p className="text-xs text-dark-textSecondary">
                                {conversation.orderTitle}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center">
                    <Link
                        href={`/dashboard/orders/${conversation.orderId}`}
                        className="text-sm bg-dark-bg px-3 py-1 rounded-md text-dark-textSecondary hover:text-dark-text mr-2"
                    >
                        View Order
                    </Link>
                    <button className="p-2 text-dark-textSecondary hover:text-dark-text">
                        <InfoIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-dark-textSecondary hover:text-dark-text">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {Object.entries(groupedMessages).map(([date, msgs]) => (
                    <div key={date}>
                        <div className="flex justify-center mb-4">
              <span className="text-xs bg-dark-bg px-3 py-1 rounded-full text-dark-textSecondary">
                {date}
              </span>
                        </div>
                        <div className="space-y-4">
                            {msgs.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] ${msg.sender === 'customer' ? 'bg-primary/10 text-dark-text' : 'bg-dark-bg text-dark-text'} rounded-lg px-4 py-2`}>
                                        {msg.text}
                                        {msg.attachments && msg.attachments.length > 0 && (
                                            <div className="mt-2 space-y-2">
                                                {msg.attachments.map((attachment: any, index: number) => (
                                                    <div key={index} className="flex items-center bg-dark-card/50 p-2 rounded">
                                                        {attachment.type === 'image' ? (
                                                            <div className="relative w-full">
                                                                <img
                                                                    src={attachment.url}
                                                                    alt={attachment.name}
                                                                    className="w-full h-32 object-cover rounded cursor-pointer"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center">
                                                                <FileIcon className="h-5 w-5 mr-2" />
                                                                <span className="text-sm">{attachment.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="text-right mt-1">
                      <span className="text-xs text-dark-textSecondary">
                        {formatMessageTime(msg.timestamp)}
                          {msg.sender === 'customer' && (
                              <span className="ml-1">{msg.read ? '✓✓' : '✓'}</span>
                          )}
                      </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-dark-border">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <button
                        type="button"
                        className="p-2 text-dark-textSecondary hover:text-dark-text rounded-lg hover:bg-dark-bg"
                    >
                        <PaperclipIcon className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        className="p-2 text-dark-textSecondary hover:text-dark-text rounded-lg hover:bg-dark-bg"
                    >
                        <ImageIcon className="h-5 w-5" />
                    </button>
                    <input
                        type="text"
                        className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className={`p-2 rounded-lg ${newMessage.trim() ? 'bg-primary text-white' : 'bg-dark-bg text-dark-textSecondary'}`}
                        disabled={!newMessage.trim()}
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}