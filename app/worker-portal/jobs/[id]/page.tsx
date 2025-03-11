// src/app/worker-portal/jobs/[id]/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    CalendarClock,
    CheckCircle2,
    ChevronRight,
    Clock,
    DollarSign,
    Download,
    FileText,
    Image as ImageIcon,
    Link2,
    MessageCircle,
    MoreVertical,
    Paperclip,
    Phone,
    Share2,
    Shield,
    Upload,
    User
} from 'lucide-react';
import WorkerLayout from '@/components/layout/WorkerLayout';

// Interfaces for type-safety
interface Customer {
    name: string;
    phone: string;
    email: string;
    avatar: string;
}

interface Message {
    id: string;
    sender: 'customer' | 'worker';
    text: string;
    time: string;
    date: string;
}

interface ProgressUpdate {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    images: string[];
}

interface Warranty {
    period: string;
    coverage: string;
    startDate: string;
    endDate: string;
}

interface Attachment {
    id: string;
    name: string;
    type: string;
    size: string;
}

interface TimelineItem {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
}

interface JobDetail {
    id: string;
    title: string;
    customer: Customer;
    deadline: string;
    createdAt: string;
    progress: number;
    category: string;
    lastUpdated: string;
    price: string;
    deposit: string;
    finalPayment: string;
    description: string;
    details: string;
    messages: Message[];
    progressUpdates: ProgressUpdate[];
    warranty: Warranty;
    attachments: Attachment[];
    timeline: TimelineItem[];
}

type TabType = 'overview' | 'progress' | 'chat' | 'warranty';

const JobDetailPage: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [messageInput, setMessageInput] = useState<string>('');

    // Data dummy untuk halaman detail pekerjaan
    const jobDetail: JobDetail = {
        id: 'JOB-2023-11-005',
        title: 'Perbaikan Monitor Samsung',
        customer: {
            name: 'Budi Santoso',
            phone: '081234567890',
            email: 'budi.santoso@email.com',
            avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128'
        },
        deadline: '2025-03-10',
        createdAt: '2025-03-01',
        progress: 70,
        category: 'elektronik',
        lastUpdated: '2 jam yang lalu',
        price: 'Rp 750.000',
        deposit: 'Rp 375.000',
        finalPayment: 'Rp 375.000',
        description: 'Monitor Samsung 24" yang mengalami masalah display flickering dan terkadang mati sendiri. Sudah dilakukan diagnosis awal, kemungkinan masalah pada power supply unit.',
        details: 'Monitor mengalami flickering pada bagian atas layar secara acak. Terkadang mati sendiri setelah digunakan selama 30 menit. Customer sudah mencoba mengganti kabel power dan kabel HDMI tetapi masalah masih berlanjut. Monitor masih dalam kondisi garansi tapi customer memilih repair karena proses klaim garansi yang lama.',
        messages: [
            {
                id: 'msg-001',
                sender: 'customer',
                text: 'Apakah sudah ada perkembangan dengan monitor saya?',
                time: '10:35',
                date: '2025-03-07'
            },
            {
                id: 'msg-002',
                sender: 'worker',
                text: 'Saya sudah melakukan diagnosis dan menemukan masalah pada power supply unit. Perlu penggantian kapasitor. Saya akan update progressnya segera.',
                time: '11:20',
                date: '2025-03-07'
            },
            {
                id: 'msg-003',
                sender: 'customer',
                text: 'Baik, terima kasih infonya. Berapa lama kira-kira perbaikannya?',
                time: '11:25',
                date: '2025-03-07'
            }
        ],
        progressUpdates: [
            {
                id: 'prog-001',
                title: 'Penerimaan Barang',
                description: 'Monitor telah diterima dan dilakukan pemeriksaan awal. Konfirmasi gejala flickering layar dan mati mendadak.',
                date: '2025-03-02',
                time: '14:30',
                images: ['https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128', 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128']
            },
            {
                id: 'prog-002',
                title: 'Diagnosis Masalah',
                description: 'Pembongkaran monitor dan diagnosis. Ditemukan kerusakan pada power supply unit - kapasitor yang mengembung dan beberapa solder yang lemah.',
                date: '2025-03-04',
                time: '10:15',
                images: ['https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128/300/200', 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128/300/200', 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128/300/200']
            },
            {
                id: 'prog-003',
                title: 'Penggantian Komponen',
                description: 'Penggantian kapasitor yang rusak dan perbaikan solder pada power supply unit. Testing awal menunjukkan flickering sudah berkurang.',
                date: '2025-03-06',
                time: '16:45',
                images: ['https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128/300/200']
            }
        ],
        warranty: {
            period: '1 bulan',
            coverage: 'Perbaikan komponen yang sama (Power Supply Unit)',
            startDate: '2025-03-10', // Tanggal estimasi penyelesaian
            endDate: '2025-04-10'
        },
        attachments: [
            {
                id: 'att-001',
                name: 'Manual_Service_Samsung_S24D300.pdf',
                type: 'pdf',
                size: '4.2 MB'
            },
            {
                id: 'att-002',
                name: 'Foto_Kondisi_Awal.jpg',
                type: 'image',
                size: '1.8 MB'
            }
        ],
        timeline: [
            {
                id: 'tl-001',
                title: 'Pekerjaan Diterima',
                description: 'Anda menerima pekerjaan perbaikan monitor Samsung',
                date: '2025-03-01',
                time: '09:15'
            },
            {
                id: 'tl-002',
                title: 'Pembayaran DP Diterima',
                description: 'Pembayaran DP sebesar Rp 375.000 telah diterima',
                date: '2025-03-01',
                time: '10:30'
            },
            {
                id: 'tl-003',
                title: 'Barang Diterima',
                description: 'Monitor telah diterima dan dicek kondisi awalnya',
                date: '2025-03-02',
                time: '14:30'
            },
            {
                id: 'tl-004',
                title: 'Progress Terbaru Ditambahkan',
                description: 'Anda menambahkan update progress: Diagnosis Masalah',
                date: '2025-03-04',
                time: '10:15'
            },
            {
                id: 'tl-005',
                title: 'Progress Terbaru Ditambahkan',
                description: 'Anda menambahkan update progress: Penggantian Komponen',
                date: '2025-03-06',
                time: '16:45'
            }
        ]
    };

    // Handle ke halaman progress upload
    const handleUpdateProgress = (): void => {
        router.push(`/worker-portal/jobs/${jobDetail.id}/progress`);
    };

    // Handle kirim pesan
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        // Implementasi pengiriman pesan akan ditambahkan di sini
        console.log('Sending message:', messageInput);

        // Reset input
        setMessageInput('');
    };

    // Menghitung hari tersisa
    const calculateDaysRemaining = (deadline: string): number => {
        return Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    };

    const daysRemaining = calculateDaysRemaining(jobDetail.deadline);
    const isOverdue = daysRemaining < 0;

    // Menghitung durasi pengerjaan
    const calculateDuration = (start: string, end: string): number => {
        return Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24));
    };

    return (
        <WorkerLayout>
            <div className="min-h-screen bg-dark-bg text-dark-text">
                {/* Header */}
                <header className="bg-secondary sticky top-0 z-10 border-b border-dark-border p-4">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="text-dark-textSecondary hover:text-white transition-colors"
                                aria-label="Kembali"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-lg font-display font-bold">{jobDetail.title}</h1>
                                <p className="text-dark-textSecondary text-sm">{jobDetail.id}</p>
                            </div>
                            <div className="ml-auto flex items-center gap-3">
                                <button
                                    className="bg-dark-card hover:bg-lightGray p-2 rounded-lg border border-dark-border transition-colors"
                                    aria-label="Bagikan"
                                >
                                    <Share2 className="h-5 w-5" />
                                </button>
                                <button
                                    className="bg-dark-card hover:bg-lightGray p-2 rounded-lg border border-dark-border transition-colors"
                                    aria-label="Menu lain"
                                >
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={handleUpdateProgress}
                                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-button flex items-center gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    <span>Update Progress</span>
                                </button>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex overflow-x-auto mt-4 -mb-0.5">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                                    activeTab === 'overview'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                                }`}
                            >
                                <span>Overview</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('progress')}
                                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                                    activeTab === 'progress'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                                }`}
                            >
                                <span>Progress</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('chat')}
                                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                                    activeTab === 'chat'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                                }`}
                            >
                                <span>Chat</span>
                                <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                  {jobDetail.messages.length}
                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab('warranty')}
                                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
                                    activeTab === 'warranty'
                                        ? 'text-primary border-b-2 border-primary'
                                        : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                                }`}
                            >
                                <span>Garansi</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto p-4 md:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column (2/3) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Overview Content */}
                            {activeTab === 'overview' && (
                                <>
                                    {/* Job Status Card */}
                                    <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <h3 className="font-display font-bold text-lg">Status Pekerjaan</h3>
                                                <div className="flex items-center gap-2 mt-2">
                          <span className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded-full">
                            Elektronik
                          </span>
                                                    <span className="bg-amber-900/30 text-amber-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                                                        {isOverdue
                                                            ? 'Terlambat'
                                                            : `${daysRemaining} hari tersisa`}
                          </span>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-dark-textSecondary text-sm">Update Terakhir</p>
                                                <p className="font-medium">{jobDetail.lastUpdated}</p>
                                            </div>
                                        </div>

                                        <div className="mt-5">
                                            <div className="flex justify-between text-sm text-dark-textSecondary mb-2">
                                                <span>Progress</span>
                                                <span>{jobDetail.progress}%</span>
                                            </div>
                                            <div className="h-3 bg-dark-border rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary"
                                                    style={{ width: `${jobDetail.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Job Description */}
                                    <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                        <h3 className="font-display font-bold text-lg mb-4">Deskripsi Pekerjaan</h3>
                                        <p className="text-dark-text">{jobDetail.description}</p>

                                        <div className="mt-4 pt-4 border-t border-dark-border">
                                            <h4 className="font-medium mb-2">Detail Tambahan</h4>
                                            <p className="text-dark-textSecondary">{jobDetail.details}</p>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-dark-border">
                                            <h4 className="font-medium mb-3">Lampiran</h4>
                                            <div className="space-y-2">
                                                {jobDetail.attachments.map(attachment => (
                                                    <div key={attachment.id} className="flex justify-between items-center bg-lightGray rounded-lg p-3 border border-dark-border">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-secondary p-2 rounded-lg">
                                                                <FileText className="h-5 w-5 text-primary" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-sm">{attachment.name}</p>
                                                                <p className="text-dark-textSecondary text-xs">{attachment.size}</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="text-primary hover:text-primary-light transition-colors"
                                                            aria-label={`Download ${attachment.name}`}
                                                        >
                                                            <Download className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                        <h3 className="font-display font-bold text-lg mb-4">Timeline Pekerjaan</h3>

                                        <div className="relative">
                                            {/* Timeline line */}
                                            <div className="absolute left-3 top-1 bottom-0 w-px bg-dark-border"></div>

                                            <div className="space-y-5">
                                                {jobDetail.timeline.map((item, index) => (
                                                    <div key={item.id} className="flex gap-4">
                                                        <div className={`h-6 w-6 rounded-full flex-shrink-0 z-10 ${
                                                            index === 0 ? 'bg-primary' : 'bg-dark-border'
                                                        }`}></div>

                                                        <div className="flex-1 pb-5">
                                                            <div className="flex justify-between">
                                                                <h4 className="font-medium">{item.title}</h4>
                                                                <span className="text-dark-textSecondary text-sm">
                                  {item.time}
                                </span>
                                                            </div>
                                                            <p className="text-dark-textSecondary text-sm mt-1">
                                                                {item.description}
                                                            </p>
                                                            <p className="text-dark-textSecondary text-xs mt-2">
                                                                {item.date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Progress Content */}
                            {activeTab === 'progress' && (
                                <>
                                    <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="font-display font-bold text-lg">Update Progress</h3>
                                            <button
                                                onClick={handleUpdateProgress}
                                                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-button flex items-center gap-2"
                                            >
                                                <Upload className="h-4 w-4" />
                                                <span>Tambah Update</span>
                                            </button>
                                        </div>

                                        <div className="relative">
                                            {/* Progress line */}
                                            <div className="absolute left-3 top-1 bottom-0 w-px bg-dark-border"></div>

                                            <div className="space-y-6">
                                                {jobDetail.progressUpdates.map((update, index) => (
                                                    <div key={update.id} className="flex gap-4">
                                                        <div className={`h-6 w-6 rounded-full flex-shrink-0 z-10 ${
                                                            index === 0 ? 'bg-primary' : 'bg-dark-border'
                                                        }`}></div>

                                                        <div className="flex-1 pb-6">
                                                            <div className="flex justify-between">
                                                                <h4 className="font-medium">{update.title}</h4>
                                                                <span className="text-dark-textSecondary text-sm">
                                  {update.time}
                                </span>
                                                            </div>
                                                            <p className="text-dark-textSecondary text-sm mt-1">
                                                                {update.description}
                                                            </p>
                                                            <p className="text-dark-textSecondary text-xs mt-2 mb-3">
                                                                {update.date}
                                                            </p>

                                                            {update.images && update.images.length > 0 && (
                                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                                                                    {update.images.map((img, idx) => (
                                                                        <div key={idx} className="relative aspect-video bg-lightGray rounded-lg overflow-hidden border border-dark-border">
                                                                            <img
                                                                                src={img}
                                                                                alt={`Progress image ${idx+1}`}
                                                                                className="w-full h-full object-cover"
                                                                            />
                                                                            <button
                                                                                className="absolute bottom-2 right-2 bg-black/50 p-1.5 rounded-full hover:bg-black/80 transition-colors"
                                                                                aria-label="Lihat gambar"
                                                                            >
                                                                                <ImageIcon className="h-4 w-4 text-white" />
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Chat Content */}
                            {activeTab === 'chat' && (
                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5 flex flex-col h-[calc(100vh-220px)]">
                                    <div className="flex items-center gap-3 pb-4 border-b border-dark-border">
                                        <img
                                            src={jobDetail.customer.avatar}
                                            alt={jobDetail.customer.name}
                                            className="h-10 w-10 rounded-full"
                                        />
                                        <div>
                                            <h3 className="font-medium">{jobDetail.customer.name}</h3>
                                            <p className="text-dark-textSecondary text-xs">
                                                {jobDetail.customer.email} • {jobDetail.customer.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto py-4 space-y-4">
                                        {jobDetail.messages.map(message => (
                                            <div key={message.id} className={`flex ${message.sender === 'worker' ? 'justify-end' : ''}`}>
                                                <div className={`max-w-[80%] ${
                                                    message.sender === 'worker'
                                                        ? 'bg-primary/20 text-white'
                                                        : 'bg-lightGray text-dark-text'
                                                } rounded-xl p-3`}>
                                                    <p className="text-sm">{message.text}</p>
                                                    <p className="text-xs text-dark-textSecondary text-right mt-1">
                                                        {message.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <form onSubmit={handleSendMessage} className="pt-4 border-t border-dark-border">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Ketik pesan..."
                                                value={messageInput}
                                                onChange={(e) => setMessageInput(e.target.value)}
                                                className="bg-lightGray rounded-xl py-3 px-4 w-full border border-dark-border focus:border-primary outline-none pr-24"
                                            />
                                            <div className="absolute right-2 top-2 flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    className="text-dark-textSecondary hover:text-primary p-1 rounded-full"
                                                    aria-label="Lampirkan file"
                                                >
                                                    <Paperclip className="h-5 w-5" />
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="bg-primary hover:bg-primary-dark text-white p-1.5 rounded-full transition-colors"
                                                    aria-label="Kirim pesan"
                                                    disabled={!messageInput.trim()}
                                                >
                                                    <MessageCircle className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Warranty Content */}
                            {activeTab === 'warranty' && (
                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-display font-bold text-lg">Informasi Garansi</h3>
                                        <span className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs">Aktif</span>
                                    </div>

                                    <div className="flex items-center p-4 bg-primary/10 rounded-lg border border-primary/20 mb-6">
                                        <Shield className="h-10 w-10 text-primary mr-4" />
                                        <div>
                                            <h4 className="font-medium">Garansi {jobDetail.warranty.period}</h4>
                                            <p className="text-dark-textSecondary text-sm mt-1">
                                                {new Date(jobDetail.warranty.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(jobDetail.warranty.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium mb-2">Cakupan Garansi</h4>
                                            <p className="text-dark-textSecondary">
                                                {jobDetail.warranty.coverage}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-medium mb-2">Ketentuan dan Persyaratan</h4>
                                            <ul className="text-dark-textSecondary space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                                                    <span>Garansi berlaku untuk komponen yang sama yang diperbaiki</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                                                    <span>Kerusakan pada komponen lain tidak termasuk dalam garansi</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                                                    <span>Garansi tidak berlaku jika segel perbaikan rusak/dibuka</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                                                    <span>Kerusakan akibat kesalahan penggunaan tidak termasuk garansi</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="pt-4 border-t border-dark-border">
                                            <h4 className="font-medium mb-3">Prosedur Klaim Garansi</h4>
                                            <ol className="text-dark-textSecondary space-y-3">
                                                <li className="flex items-start gap-3">
                                                    <div className="bg-lightGray h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs">1</span>
                                                    </div>
                                                    <span>Customer menghubungi melalui fitur chat dengan menyertakan bukti kerusakan</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="bg-lightGray h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs">2</span>
                                                    </div>
                                                    <span>Validasi klaim garansi oleh teknisi yang ditugaskan</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="bg-lightGray h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs">3</span>
                                                    </div>
                                                    <span>Jika valid, lakukan perbaikan sesuai cakupan garansi</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <div className="bg-lightGray h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs">4</span>
                                                    </div>
                                                    <span>Kembalikan barang yang sudah diperbaiki kepada customer</span>
                                                </li>
                                            </ol>
                                        </div>

                                        <div className="pt-4 border-t border-dark-border">
                                            <p className="text-sm text-dark-textSecondary italic">
                                                Catatan: Customer wajib menyimpan bukti perbaikan (nota/kwitansi) untuk melakukan klaim garansi.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column (1/3) - Sidebar */}
                        <div className="space-y-6">
                            {/* Customer Info */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <h3 className="font-display font-bold text-lg mb-4">Informasi Pelanggan</h3>

                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src={jobDetail.customer.avatar}
                                        alt={jobDetail.customer.name}
                                        className="h-12 w-12 rounded-full"
                                    />
                                    <div>
                                        <h4 className="font-medium">{jobDetail.customer.name}</h4>
                                        <button
                                            className="text-primary hover:text-primary-light text-sm transition-colors"
                                            onClick={() => router.push(`/worker-portal/customers/${jobDetail.customer.name.toLowerCase().replace(/\s+/g, '-')}`)}
                                        >
                                            Lihat Profil
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="bg-lightGray h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                                            <MessageCircle className="h-4 w-4 text-dark-textSecondary" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-dark-textSecondary truncate">{jobDetail.customer.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="bg-lightGray h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="h-4 w-4 text-dark-textSecondary" />
                                        </div>
                                        <div>
                                            <p className="text-dark-textSecondary">{jobDetail.customer.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => setActiveTab('chat')}
                                        className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        <span>Chat</span>
                                    </button>
                                    <a
                                        href={`tel:${jobDetail.customer.phone}`}
                                        className="flex-1 bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                                    >
                                        <Phone className="h-4 w-4" />
                                        <span>Telepon</span>
                                    </a>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <h3 className="font-display font-bold text-lg mb-4">Informasi Pembayaran</h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-dark-textSecondary">Harga Total:</span>
                                        <span className="font-display font-bold">{jobDetail.price}</span>
                                    </div>
                                    <div className="border-t border-dark-border pt-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="text-dark-textSecondary">DP (50%):</span>
                                                <span className="bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded-full">
                          Diterima
                        </span>
                                            </div>
                                            <span>{jobDetail.deposit}</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-dark-textSecondary">Pembayaran Akhir:</span>
                                                <span className="bg-amber-900/30 text-amber-400 text-xs px-2 py-0.5 rounded-full">
                          Menunggu
                        </span>
                                            </div>
                                            <span>{jobDetail.finalPayment}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-dark-border">
                                    <button
                                        className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg transition-colors shadow-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={jobDetail.progress < 100}
                                        aria-label="Minta pelunasan pembayaran"
                                    >
                                        <DollarSign className="h-4 w-4" />
                                        <span>Minta Pelunasan</span>
                                    </button>
                                    <p className="text-xs text-dark-textSecondary text-center mt-2">
                                        Tersedia setelah progress mencapai 100%
                                    </p>
                                </div>
                            </div>

                            {/* Deadline Info */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <h3 className="font-display font-bold text-lg mb-4">Tenggat Waktu</h3>

                                <div className="flex items-center justify-center p-4 border border-dark-border rounded-lg bg-lightGray mb-4">
                                    <div className="text-center">
                                        <CalendarClock className="h-8 w-8 text-primary mx-auto mb-2" />
                                        <p className="text-sm text-dark-textSecondary">Tenggat:</p>
                                        <p className="font-display font-bold text-lg">
                                            {new Date(jobDetail.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                        <p className={`text-sm mt-1 ${
                                            isOverdue
                                                ? 'text-red-500'
                                                : 'text-dark-textSecondary'
                                        }`}>
                                            {isOverdue
                                                ? 'Terlambat!'
                                                : `${daysRemaining} hari tersisa`}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-dark-textSecondary">Tanggal Mulai:</span>
                                        <span>{new Date(jobDetail.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-dark-textSecondary">Durasi Pengerjaan:</span>
                                        <span>{calculateDuration(jobDetail.createdAt, jobDetail.deadline)} hari</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-dark-border">
                                    <button
                                        className="w-full bg-amber-900/30 hover:bg-amber-900/50 text-amber-400 px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        aria-label="Minta perpanjangan tenggat waktu"
                                    >
                                        <Clock className="h-4 w-4" />
                                        <span>Minta Perpanjangan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </WorkerLayout>
    );
};

export default JobDetailPage;