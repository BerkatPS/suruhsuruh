// src/app/worker-portal/warranty/[id]/page.tsx
"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Calendar,
    Camera,
    CheckCircle,
    ChevronDown,
    Clock,
    FileText,
    HelpCircle,
    Image as ImageIcon,
    Link2,
    MessageCircle,
    Paperclip,
    Phone,
    Send,
    Shield,
    ThumbsDown,
    ThumbsUp,
    Upload,
    User,
    X
} from 'lucide-react';
import WorkerLayout from '@/components/layout/WorkerLayout';

// Interfaces for type-safety
interface Customer {
    name: string;
    avatar: string;
    phone: string;
    email: string;
    isOnline?: boolean;
}

interface Message {
    id: string;
    text: string;
    sender: 'worker' | 'customer' | 'system';
    timestamp: string;
    read: boolean;
    attachments?: Attachment[];
}

interface Attachment {
    id: string;
    name: string;
    type: string;
    url: string;
    size: string;
    thumbnail?: string;
}

interface WarrantyRequest {
    id: string;
    jobId: string;
    jobTitle: string;
    originalJobDate: string;
    requestDate: string;
    dueDate: string;
    customer: Customer;
    issue: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    priority: 'high' | 'medium' | 'low';
    photos?: string[];
    responseRequired: boolean;
    warrantyPeriod: string;
    category: 'elektronik' | 'akademik';
    messages: Message[];
}

interface WarrantyPolicyItem {
    id: string;
    title: string;
    description: string;
    category: 'elektronik' | 'akademik' | 'all';
}

const WarrantyDetailPage: React.FC = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messageInput, setMessageInput] = useState<string>('');
    const [attachments, setAttachments] = useState<File[]>([]);
    const [showCustomerInfo, setShowCustomerInfo] = useState<boolean>(true);
    const [isRejecting, setIsRejecting] = useState<boolean>(false);
    const [isApproving, setIsApproving] = useState<boolean>(false);
    const [rejectReason, setRejectReason] = useState<string>('');
    const [approveDetails, setApproveDetails] = useState<string>('');

    // Data dummy untuk detail warranty
    const warrantyData: WarrantyRequest = {
        id: 'WR-2023-001',
        jobId: 'JOB-2023-09-015',
        jobTitle: 'Perbaikan Smartphone Xiaomi',
        originalJobDate: '2025-02-20',
        requestDate: '2025-03-05',
        dueDate: '2025-03-10',
        customer: {
            name: 'Dian Permata',
            avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/60/60',
            phone: '08123456789',
            email: 'dian.permata@email.com',
            isOnline: true
        },
        issue: 'Layar smartphone kembali berkedip setelah perbaikan dan kadang-kadang tidak merespon sentuhan.',
        status: 'pending',
        priority: 'high',
        photos: ['https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200', 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200'],
        responseRequired: true,
        warrantyPeriod: '30 hari',
        category: 'elektronik',
        messages: [
            {
                id: 'msg-001',
                text: 'Saya ingin mengajukan klaim garansi untuk perbaikan smartphone Xiaomi saya yang sudah diperbaiki tanggal 20 Februari.',
                sender: 'customer',
                timestamp: '2025-03-05T10:15:00',
                read: true
            },
            {
                id: 'msg-002',
                text: 'Layar smartphone kembali berkedip setelah perbaikan dan kadang-kadang tidak merespon sentuhan.',
                sender: 'customer',
                timestamp: '2025-03-05T10:16:00',
                read: true
            },
            {
                id: 'msg-003',
                text: 'Saya lampirkan foto masalahnya.',
                sender: 'customer',
                timestamp: '2025-03-05T10:17:00',
                read: true,
                attachments: [
                    {
                        id: 'att-001',
                        name: 'masalah_layar_1.jpg',
                        type: 'image',
                        url: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200',
                        size: '2.3 MB',
                        thumbnail: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200'
                    },
                    {
                        id: 'att-002',
                        name: 'masalah_layar_2.jpg',
                        type: 'image',
                        url: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200',
                        size: '1.8 MB',
                        thumbnail: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200'
                    }
                ]
            },
            {
                id: 'msg-004',
                text: 'Permintaan klaim garansi Anda telah diterima. Tim kami akan segera menanggapi dalam waktu 24 jam.',
                sender: 'system',
                timestamp: '2025-03-05T10:20:00',
                read: true
            }
        ]
    };

    // Data kebijakan garansi
    const warrantyPolicies: WarrantyPolicyItem[] = [
        {
            id: 'POL-002',
            title: 'Garansi Perbaikan Elektronik',
            description: 'Untuk perbaikan elektronik, garansi hanya berlaku untuk komponen yang diganti/diperbaiki, bukan untuk keseluruhan alat. Garansi tidak termasuk kerusakan akibat tegangan listrik yang tidak stabil, cairan, atau kerusakan fisik lainnya.',
            category: 'elektronik'
        },
        {
            id: 'POL-004',
            title: 'Prosedur Klaim Garansi',
            description: 'Customer harus menghubungi via fitur chat dengan menyertakan bukti kerusakan, lalu teknisi akan melakukan validasi klaim. Jika valid, perbaikan akan dilakukan sesuai cakupan garansi dan barang diperbaiki harus dikembalikan kepada customer sesuai tenggat waktu yang ditentukan.',
            category: 'all'
        }
    ];

    // Auto-scroll to bottom when messages change
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [warrantyData.messages]);

    // Handle sending a message
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!messageInput.trim() && attachments.length === 0) return;

        // Here you would typically send the message to the API
        console.log('Sending message:', messageInput);
        console.log('Attachments:', attachments);

        // For demo purposes, let's simulate sending a message
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            text: messageInput,
            sender: 'worker',
            timestamp: new Date().toISOString(),
            read: true,
            attachments: attachments.length > 0 ? attachments.map(file => ({
                id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                name: file.name,
                type: file.type.split('/')[0],
                url: '#',
                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
            })) : undefined
        };

        // Reset form
        setMessageInput('');
        setAttachments([]);

        // In a real app, the API would handle adding the message to the database
        // For demo, we're not modifying the warrantyData directly
    };

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setAttachments([...attachments, ...newFiles]);
        }
    };

    // Remove an attachment
    const removeAttachment = (index: number): void => {
        const newAttachments = [...attachments];
        newAttachments.splice(index, 1);
        setAttachments(newAttachments);
    };

    // Format timestamp for display
    const formatTimestamp = (timestamp: string): string => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    };

    // Format date for display
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Format date for message groups
    const formatMessageDate = (timestamp: string): string => {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Hari Ini';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Kemarin';
        } else {
            return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        }
    };

    // Group messages by date
    const groupMessagesByDate = (messages: Message[]): { date: string; messages: Message[] }[] => {
        const groups: { [key: string]: Message[] } = {};

        messages.forEach(message => {
            const date = new Date(message.timestamp).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });

        return Object.keys(groups).map(date => ({
            date,
            messages: groups[date]
        }));
    };

    // Getting remaining days until due date
    const getDaysRemaining = (dueDate: string): number => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // Handle approve button
    const handleApprove = (): void => {
        setIsApproving(true);
    };

    // Handle reject button
    const handleReject = (): void => {
        setIsRejecting(true);
    };

    // Submit approval
    const submitApproval = (): void => {
        // Handle approval submission to API
        console.log('Approval details:', approveDetails);
        setIsApproving(false);

        // In a real app, this would update the state and redirect
        // router.push('/worker-portal/warranty');
    };

    // Submit rejection
    const submitRejection = (): void => {
        // Handle rejection submission to API
        console.log('Rejection reason:', rejectReason);
        setIsRejecting(false);

        // In a real app, this would update the state and redirect
        // router.push('/worker-portal/warranty');
    };

    // Handle back navigation
    const handleBack = (): void => {
        router.push('/worker-portal/warranty');
    };

    // Check if attachment is an image
    const isImageAttachment = (type: string): boolean => {
        return type === 'image';
    };

    return (
        <WorkerLayout>
            <div className="min-h-screen bg-dark-bg text-dark-text">
                {/* Main Content */}
                <div className="flex flex-col h-[calc(100vh-64px)]">
                    {/* Header */}
                    <header className="bg-dark-card border-b border-dark-border p-4">
                        <div className="container mx-auto">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleBack}
                                        className="text-dark-textSecondary hover:text-white transition-colors"
                                        aria-label="Kembali"
                                    >
                                        <ArrowLeft className="h-5 w-5" />
                                    </button>
                                    <div>
                                        <h1 className="text-lg font-display font-bold">Detail Permintaan Garansi</h1>
                                        <p className="text-dark-textSecondary text-sm">#{warrantyData.id} • {warrantyData.jobTitle}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="bg-amber-900/30 text-amber-400 px-2 py-1 rounded-full text-xs">
                                        Menunggu Tanggapan
                                    </div>
                                    <div className="bg-red-900/30 text-red-400 px-2 py-1 rounded-full text-xs">
                                        Prioritas Tinggi
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => handleReject()}
                                    className="bg-dark-bg border border-dark-border hover:border-red-500 text-dark-textSecondary hover:text-red-500 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <ThumbsDown className="h-4 w-4" />
                                    <span>Tolak Klaim</span>
                                </button>

                                <button
                                    onClick={() => handleApprove()}
                                    className="bg-dark-bg border border-dark-border hover:border-green-500 text-dark-textSecondary hover:text-green-500 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <ThumbsUp className="h-4 w-4" />
                                    <span>Setujui Klaim</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="flex flex-1 overflow-hidden">
                        {/* Messages Area */}
                        <div className="flex-1 flex flex-col">
                            {/* Job Info Banner */}
                            <div className="bg-lightGray p-3 border-b border-dark-border">
                                <div className="container mx-auto">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-sm font-medium">
                                                Klaim Garansi: {warrantyData.jobTitle}
                                            </h2>
                                            <p className="text-dark-textSecondary text-xs mt-0.5">
                                                {warrantyData.jobId} • Pekerjaan Asal: {formatDate(warrantyData.originalJobDate)}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5 text-xs text-dark-textSecondary">
                                                <Clock className="h-3.5 w-3.5" />
                                                <span className={getDaysRemaining(warrantyData.dueDate) <= 1 ? 'text-red-400' : ''}>
                          Tenggat: {formatDate(warrantyData.dueDate)}
                                                    {getDaysRemaining(warrantyData.dueDate) <= 0
                                                        ? ` (Terlambat ${Math.abs(getDaysRemaining(warrantyData.dueDate))} hari)`
                                                        : getDaysRemaining(warrantyData.dueDate) === 1
                                                            ? ' (Besok)'
                                                            : ` (${getDaysRemaining(warrantyData.dueDate)} hari lagi)`
                                                    }
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="container mx-auto max-w-4xl">
                                    {/* Issue Description Card */}
                                    <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4 mb-6">
                                        <h3 className="font-medium flex items-center gap-2">
                                            <Shield className="h-5 w-5 text-primary" />
                                            Detail Masalah
                                        </h3>
                                        <p className="text-dark-textSecondary mt-2">
                                            {warrantyData.issue}
                                        </p>

                                        {warrantyData.photos && warrantyData.photos.length > 0 && (
                                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {warrantyData.photos.map((photo, idx) => (
                                                    <div key={idx} className="aspect-video bg-lightGray rounded-lg overflow-hidden border border-dark-border">
                                                        <img
                                                            src={photo}
                                                            alt={`Issue photo ${idx + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Messages */}
                                    {groupMessagesByDate(warrantyData.messages).map(group => (
                                        <div key={group.date} className="mb-6">
                                            <div className="flex justify-center mb-4">
                        <span className="bg-lightGray text-dark-textSecondary text-xs px-3 py-1 rounded-full">
                          {formatMessageDate(group.messages[0].timestamp)}
                        </span>
                                            </div>

                                            {group.messages.map(message => (
                                                <div
                                                    key={message.id}
                                                    className={`mb-4 flex ${
                                                        message.sender === 'worker'
                                                            ? 'justify-end'
                                                            : message.sender === 'system'
                                                                ? 'justify-center'
                                                                : 'justify-start'
                                                    }`}
                                                >
                                                    {message.sender === 'system' ? (
                                                        <div className="bg-secondary/50 rounded-lg px-4 py-2 max-w-[80%]">
                                                            <p className="text-dark-textSecondary text-xs">
                                                                {message.text}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className={`max-w-[75%] ${
                                                            message.sender === 'worker'
                                                                ? 'bg-primary/20 rounded-tl-xl rounded-tr-xl rounded-bl-xl'
                                                                : 'bg-lightGray rounded-tl-xl rounded-tr-xl rounded-br-xl'
                                                        } p-3`}>
                                                            {/* Message content */}
                                                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>

                                                            {/* Attachments */}
                                                            {message.attachments && message.attachments.length > 0 && (
                                                                <div className="mt-2 space-y-2">
                                                                    {message.attachments.map(attachment => (
                                                                        <div
                                                                            key={attachment.id}
                                                                            className="bg-dark-bg border border-dark-border rounded-lg overflow-hidden"
                                                                        >
                                                                            {isImageAttachment(attachment.type) && attachment.thumbnail && (
                                                                                <div className="relative">
                                                                                    <img
                                                                                        src={attachment.thumbnail}
                                                                                        alt={attachment.name}
                                                                                        className="w-full h-auto max-h-48 object-cover"
                                                                                    />
                                                                                    <div className="absolute inset-0 flex items-center justify-center hover:bg-black/40 transition-colors">
                                                                                        <button className="bg-black/60 p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                                                                                            <ImageIcon className="h-5 w-5 text-white" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            )}

                                                                            <div className="p-2 flex justify-between items-center">
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className="bg-dark-card p-1.5 rounded">
                                                                                        {attachment.type === 'image' && <ImageIcon className="h-4 w-4 text-blue-400" />}
                                                                                        {attachment.type === 'pdf' && <FileText className="h-4 w-4 text-primary" />}
                                                                                        {!['image', 'pdf'].includes(attachment.type) && <Link2 className="h-4 w-4 text-gray-400" />}
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="text-xs font-medium truncate max-w-[150px]">{attachment.name}</p>
                                                                                        <p className="text-xs text-dark-textSecondary">{attachment.size}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* Timestamp */}
                                                            <div className="text-xs text-dark-textSecondary mt-1 text-right">
                                                                {formatTimestamp(message.timestamp)}
                                                                {message.sender === 'worker' && (
                                                                    <span className="ml-1">
                                    {message.read ? '✓✓' : '✓'}
                                  </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="border-t border-dark-border p-4">
                                <div className="container mx-auto max-w-4xl">
                                    {/* Attachment Preview */}
                                    {attachments.length > 0 && (
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            {attachments.map((file, index) => (
                                                <div key={index} className="bg-lightGray border border-dark-border rounded-lg p-2 flex items-center gap-2">
                                                    <div className="bg-dark-card p-1.5 rounded">
                                                        {file.type.startsWith('image/') && <ImageIcon className="h-4 w-4 text-blue-400" />}
                                                        {file.type === 'application/pdf' && <FileText className="h-4 w-4 text-primary" />}
                                                        {!file.type.startsWith('image/') && file.type !== 'application/pdf' && <Link2 className="h-4 w-4 text-gray-400" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-medium truncate max-w-[100px]">{file.name}</p>
                                                        <p className="text-xs text-dark-textSecondary">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeAttachment(index)}
                                                        className="text-dark-textSecondary hover:text-red-500 transition-colors"
                                                        aria-label="Hapus lampiran"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="text-dark-textSecondary hover:text-primary p-2 rounded-full transition-colors"
                                            aria-label="Lampirkan file"
                                        >
                                            <Paperclip className="h-5 w-5" />
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />

                                        <div className="flex-1 relative">
                      <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          placeholder="Ketik pesan tanggapan..."
                          className="bg-lightGray rounded-xl py-3 px-4 w-full border border-dark-border focus:border-primary outline-none resize-none min-h-[44px] max-h-32"
                          style={{ height: `${Math.min(Math.max(44, messageInput.split('\n').length * 24), 128)}px` }}
                          onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  if (messageInput.trim() || attachments.length > 0) {
                                      handleSendMessage(e as any);
                                  }
                              }
                          }}
                      ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className={`bg-primary text-white p-3 rounded-full transition-colors ${
                                                !messageInput.trim() && attachments.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
                                            }`}
                                            disabled={!messageInput.trim() && attachments.length === 0}
                                            aria-label="Kirim pesan"
                                        >
                                            <Send className="h-5 w-5" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        {showCustomerInfo && (
                            <div className="w-80 border-l border-dark-border bg-dark-card overflow-y-auto hidden md:block">
                                <div className="p-4 border-b border-dark-border">
                                    <h3 className="font-medium text-lg mb-4">Informasi Pelanggan</h3>

                                    <div className="flex flex-col items-center">
                                        <div className="relative mb-3">
                                            <img
                                                src={warrantyData.customer.avatar}
                                                alt={warrantyData.customer.name}
                                                className="h-20 w-20 rounded-full"
                                            />
                                            {warrantyData.customer.isOnline && (
                                                <span className="absolute bottom-1 right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-dark-card"></span>
                                            )}
                                        </div>

                                        <h4 className="font-medium text-lg">{warrantyData.customer.name}</h4>
                                        <p className="text-dark-textSecondary text-sm">
                                            {warrantyData.customer.isOnline ? 'Online' : 'Offline'}
                                        </p>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <label className="text-xs text-dark-textSecondary">Email</label>
                                            <p className="text-sm">{warrantyData.customer.email}</p>
                                        </div>

                                        <div>
                                            <label className="text-xs text-dark-textSecondary">Telepon</label>
                                            <p className="text-sm">{warrantyData.customer.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-4">
                                        <button className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>Chat</span>
                                        </button>
                                        <button className="flex-1 bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1">
                                            <Phone className="h-4 w-4" />
                                            <span>Telepon</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 border-b border-dark-border">
                                    <h3 className="font-medium mb-3">Detail Garansi</h3>

                                    <div className="bg-lightGray rounded-lg p-3 border border-dark-border mb-3">
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-4 w-4 text-primary" />
                                            <span className="text-sm font-medium">Garansi {warrantyData.warrantyPeriod}</span>
                                        </div>
                                        <p className="text-dark-textSecondary text-xs mt-1">
                                            Pekerjaan asli: {formatDate(warrantyData.originalJobDate)}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-dark-textSecondary">Kategori:</span>
                                            <span className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded text-xs">
                        {warrantyData.category === 'elektronik' ? 'Elektronik' : 'Akademik'}
                      </span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-dark-textSecondary">Tanggal Permintaan:</span>
                                            <span>{formatDate(warrantyData.requestDate)}</span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-dark-textSecondary">Tenggat Tanggapan:</span>
                                            <span className={getDaysRemaining(warrantyData.dueDate) <= 1 ? 'text-red-400' : ''}>
                        {formatDate(warrantyData.dueDate)}
                      </span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-dark-textSecondary">Prioritas:</span>
                                            <span
                                                className={`px-2 py-0.5 rounded text-xs ${
                                                    warrantyData.priority === 'high'
                                                        ? 'bg-red-900/30 text-red-400'
                                                        : warrantyData.priority === 'medium'
                                                            ? 'bg-yellow-900/30 text-yellow-400'
                                                            : 'bg-green-900/30 text-green-400'
                                                }`}
                                            >
                        {warrantyData.priority === 'high'
                            ? 'Tinggi'
                            : warrantyData.priority === 'medium'
                                ? 'Sedang'
                                : 'Rendah'
                        }
                      </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 border-b border-dark-border">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-medium">Kebijakan Garansi</h3>
                                        <button className="text-primary hover:text-primary-dark text-xs flex items-center gap-1 transition-colors">
                                            <HelpCircle className="h-3.5 w-3.5" />
                                            <span>Bantuan</span>
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {warrantyPolicies
                                            .filter(policy => policy.category === 'all' || policy.category === warrantyData.category)
                                            .map(policy => (
                                                <div key={policy.id} className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                                    <h4 className="text-sm font-medium">{policy.title}</h4>
                                                    <p className="text-dark-textSecondary text-xs mt-1">{policy.description}</p>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <button className="mt-3 text-primary hover:text-primary-dark text-xs flex items-center gap-1 transition-colors">
                                        <ChevronDown className="h-3.5 w-3.5" />
                                        <span>Lihat Semua Kebijakan</span>
                                    </button>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-medium mb-3">Tindakan</h3>

                                    <div className="space-y-2">
                                        <button className="w-full bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1">
                                            <CheckCircle className="h-4 w-4" />
                                            <span>Tandai Selesai</span>
                                        </button>

                                        <button className="w-full bg-dark-bg border border-dark-border hover:bg-lightGray text-dark-textSecondary px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>Jadwalkan Kunjungan</span>
                                        </button>

                                        <button className="w-full bg-dark-bg border border-dark-border hover:bg-lightGray text-dark-textSecondary px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1">
                                            <User className="h-4 w-4" />
                                            <span>Tetapkan ke Teknisi Lain</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mobile Actions Button */}
                        <button
                            className="fixed bottom-20 right-4 md:hidden bg-primary text-white p-3 rounded-full shadow-lg"
                            onClick={() => setShowCustomerInfo(!showCustomerInfo)}
                        >
                            <User className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Approve Modal */}
                {isApproving && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5 w-full max-w-md">
                            <h3 className="text-lg font-medium mb-4">Setujui Klaim Garansi</h3>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Detail Persetujuan
                                </label>
                                <textarea
                                    value={approveDetails}
                                    onChange={(e) => setApproveDetails(e.target.value)}
                                    placeholder="Tambahkan detail persetujuan klaim garansi..."
                                    className="bg-lightGray rounded-lg py-2 px-3 w-full border border-dark-border focus:border-primary outline-none resize-none h-32"
                                ></textarea>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsApproving(false)}
                                    className="flex-1 bg-dark-bg border border-dark-border hover:bg-lightGray text-dark-textSecondary px-3 py-2 rounded-lg text-sm transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={submitApproval}
                                    disabled={!approveDetails.trim()}
                                    className={`flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors ${
                                        !approveDetails.trim() ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    Setujui Klaim
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reject Modal */}
                {isRejecting && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5 w-full max-w-md">
                            <h3 className="text-lg font-medium mb-4">Tolak Klaim Garansi</h3>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Alasan Penolakan
                                </label>
                                <textarea
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Berikan alasan penolakan klaim garansi..."
                                    className="bg-lightGray rounded-lg py-2 px-3 w-full border border-dark-border focus:border-primary outline-none resize-none h-32"
                                ></textarea>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsRejecting(false)}
                                    className="flex-1 bg-dark-bg border border-dark-border hover:bg-lightGray text-dark-textSecondary px-3 py-2 rounded-lg text-sm transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={submitRejection}
                                    disabled={!rejectReason.trim()}
                                    className={`flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors ${
                                        !rejectReason.trim() ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    Tolak Klaim
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </WorkerLayout>
    );
};

export default WarrantyDetailPage;