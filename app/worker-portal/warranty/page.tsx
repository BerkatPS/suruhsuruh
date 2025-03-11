// src/app/worker-portal/warranty/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    AlertCircle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    Clock,
    Eye,
    Filter,
    MessageCircle,
    MoreVertical,
    RefreshCw,
    Search,
    Shield,
    ThumbsDown,
    ThumbsUp,

    X
} from 'lucide-react';
import WorkerLayout from '@/components/layout/WorkerLayout';

// Interfaces for type-safety
interface Customer {
    name: string;
    avatar: string;
    phone: string;
    email: string;
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
}

interface WarrantyHistory {
    id: string;
    jobId: string;
    jobTitle: string;
    originalJobDate: string;
    requestDate: string;
    resolvedDate: string;
    customer: Customer;
    issue: string;
    resolution: string;
    status: 'completed' | 'rejected';
    category: 'elektronik' | 'akademik';
}

interface WarrantyPolicyItem {
    id: string;
    title: string;
    description: string;
    category: 'elektronik' | 'akademik' | 'all';
}

const WarrantyPage: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'active' | 'history' | 'policy'>('active');
    const [activeRequest, setActiveRequest] = useState<WarrantyRequest | null>(null);
    const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Data dummy untuk halaman garansi
    const activeWarrantyRequests: WarrantyRequest[] = [
        {
            id: 'WR-2023-001',
            jobId: 'JOB-2023-09-015',
            jobTitle: 'Perbaikan Smartphone Xiaomi',
            originalJobDate: '2025-02-20',
            requestDate: '2025-03-05',
            dueDate: '2025-03-10',
            customer: {
                name: 'Dian Permata',
                avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
                phone: '08123456789',
                email: 'dian.permata@email.com'
            },
            issue: 'Layar smartphone kembali berkedip setelah perbaikan dan kadang-kadang tidak merespon sentuhan.',
            status: 'pending',
            priority: 'high',
            photos: ['https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200', 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200'],
            responseRequired: true,
            warrantyPeriod: '30 hari',
            category: 'elektronik'
        },
        {
            id: 'WR-2023-002',
            jobId: 'JOB-2023-10-001',
            jobTitle: 'Perbaikan TV LG 43"',
            originalJobDate: '2025-02-28',
            requestDate: '2025-03-06',
            dueDate: '2025-03-11',
            customer: {
                name: 'Hendra Gunawan',
                avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
                phone: '08234567890',
                email: 'hendra.gunawan@email.com'
            },
            issue: 'TV mengeluarkan suara berdengung yang tidak normal, padahal sebelumnya sudah diperbaiki.',
            status: 'approved',
            priority: 'medium',
            responseRequired: false,
            warrantyPeriod: '30 hari',
            category: 'elektronik'
        },
        {
            id: 'WR-2023-003',
            jobId: 'JOB-2023-11-005',
            jobTitle: 'Perbaikan Monitor Samsung',
            originalJobDate: '2025-03-02',
            requestDate: '2025-03-07',
            dueDate: '2025-03-12',
            customer: {
                name: 'Budi Santoso',
                avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
                phone: '08345678901',
                email: 'budi.santoso@email.com'
            },
            issue: 'Monitor kembali mengalami flickering yang lebih parah dari sebelumnya.',
            status: 'pending',
            priority: 'high',
            responseRequired: true,
            warrantyPeriod: '30 hari',
            category: 'elektronik'
        },
    ];

    const warrantyHistory: WarrantyHistory[] = [
        {
            id: 'WR-2023-001',
            jobId: 'JOB-2023-08-010',
            jobTitle: 'Perbaikan Laptop HP',
            originalJobDate: '2025-01-15',
            requestDate: '2025-01-25',
            resolvedDate: '2025-01-28',
            customer: {
                name: 'Wati Suryadi',
                avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
                phone: '08567890123',
                email: 'wati.suryadi@email.com'
            },
            issue: 'Laptop kembali mengalami overheating setelah perbaikan.',
            resolution: 'Penggantian kipas dan thermal paste, serta pembersihan saluran ventilasi.',
            status: 'completed',
            category: 'elektronik'
        },
        {
            id: 'WR-2023-002',
            jobId: 'JOB-2023-09-012',
            jobTitle: 'Pembuatan Makalah Ekonomi',
            originalJobDate: '2025-02-05',
            requestDate: '2025-02-10',
            resolvedDate: '2025-02-12',
            customer: {
                name: 'Rini Susanti',
                avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
                phone: '08678901234',
                email: 'rini.susanti@email.com'
            },
            issue: 'Ada beberapa kesalahan dalam analisis data yang perlu diperbaiki.',
            resolution: 'Revisi analisis data dan perbaikan beberapa referensi yang kurang tepat.',
            status: 'completed',
            category: 'akademik'
        },
        {
            id: 'WR-2023-003',
            jobId: 'JOB-2023-08-005',
            jobTitle: 'Perbaikan Mesin Cuci Sharp',
            originalJobDate: '2025-01-10',
            requestDate: '2025-01-20',
            resolvedDate: '2025-01-22',
            customer: {
                name: 'Bambang Wijaya',
                avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
                phone: '08789012345',
                email: 'bambang.wijaya@email.com'
            },
            issue: 'Mesin cuci kembali bocor setelah perbaikan.',
            resolution: 'Klaim garansi ditolak karena kerusakan disebabkan oleh penggunaan yang tidak sesuai prosedur.',
            status: 'rejected',
            category: 'elektronik'
        },
    ];

    const warrantyPolicies: WarrantyPolicyItem[] = [
        {
            id: 'POL-001',
            title: 'Kebijakan Garansi Umum',
            description: 'Semua jasa perbaikan mendapatkan garansi 30 hari untuk komponen yang sama yang telah diperbaiki. Garansi tidak berlaku jika segel perbaikan rusak/dibuka atau jika kerusakan disebabkan oleh penggunaan yang tidak sesuai prosedur.',
            category: 'all'
        },
        {
            id: 'POL-002',
            title: 'Garansi Perbaikan Elektronik',
            description: 'Untuk perbaikan elektronik, garansi hanya berlaku untuk komponen yang diganti/diperbaiki, bukan untuk keseluruhan alat. Garansi tidak termasuk kerusakan akibat tegangan listrik yang tidak stabil, cairan, atau kerusakan fisik lainnya.',
            category: 'elektronik'
        },
        {
            id: 'POL-003',
            title: 'Garansi Jasa Akademik',
            description: 'Untuk jasa akademik, garansi berupa revisi minor dalam jangka waktu 7 hari setelah pengerjaan. Revisi yang termasuk adalah koreksi tata bahasa, format penulisan, dan referensi. Perubahan substansial pada konten atau penambahan bagian baru tidak termasuk dalam garansi.',
            category: 'akademik'
        },
        {
            id: 'POL-004',
            title: 'Prosedur Klaim Garansi',
            description: 'Customer harus menghubungi via fitur chat dengan menyertakan bukti kerusakan, lalu teknisi akan melakukan validasi klaim. Jika valid, perbaikan akan dilakukan sesuai cakupan garansi dan barang diperbaiki harus dikembalikan kepada customer sesuai tenggat waktu yang ditentukan.',
            category: 'all'
        },
    ];

    // Filter warranty requests based on search and filters
    const filteredActiveRequests = activeWarrantyRequests.filter(request => {
        const matchesSearch = searchQuery === '' ||
            request.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.issue.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || request.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const filteredHistory = warrantyHistory.filter(item => {
        const matchesSearch = searchQuery === '' ||
            item.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.customer.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Handler for viewing request details
    const handleViewRequest = (request: WarrantyRequest): void => {
        setActiveRequest(request);
        setShowDetailModal(true);
    };

    // Format date for display
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Handler for responding to warranty request
    const handleRespondRequest = (requestId: string) => {
        router.push(`/worker-portal/warranty/${requestId}`);
    };

    // Getting remaining days until due date
    const getDaysRemaining = (dueDate: string): number => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // Function to get status label component
    const getStatusLabel = (status: string) => {
        let bgColor = '';
        let textColor = '';
        let label = '';

        switch (status) {
            case 'pending':
                bgColor = 'bg-amber-900/30';
                textColor = 'text-amber-400';
                label = 'Menunggu Tanggapan';
                break;
            case 'approved':
                bgColor = 'bg-blue-900/30';
                textColor = 'text-blue-400';
                label = 'Disetujui';
                break;
            case 'rejected':
                bgColor = 'bg-red-900/30';
                textColor = 'text-red-400';
                label = 'Ditolak';
                break;
            case 'completed':
                bgColor = 'bg-green-900/30';
                textColor = 'text-green-400';
                label = 'Selesai';
                break;
            default:
                bgColor = 'bg-dark-border';
                textColor = 'text-dark-textSecondary';
                label = status;
        }

        return (
            <span className={`text-xs px-2 py-1 rounded-full ${bgColor} ${textColor}`}>
        {label}
      </span>
        );
    };

    // Priority Label
    const getPriorityLabel = (priority: string) => {
        switch (priority) {
            case 'high':
                return (
                    <span className="bg-red-900/30 text-red-400 text-xs px-2 py-1 rounded-full">
            Prioritas Tinggi
          </span>
                );
            case 'medium':
                return (
                    <span className="bg-amber-900/30 text-amber-400 text-xs px-2 py-1 rounded-full">
            Prioritas Menengah
          </span>
                );
            case 'low':
                return (
                    <span className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded-full">
            Prioritas Rendah
          </span>
                );
            default:
                return null;
        }
    };

    return (
        <WorkerLayout>
            <div className="min-h-screen bg-dark-bg text-dark-text">
                {/* Main Content */}
                <main className="container mx-auto p-4 md:p-6">
                    <div className="flex flex-col gap-6">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-xl md:text-2xl font-display font-bold flex items-center gap-2">
                                    <Shield className="h-6 w-6 text-primary" />
                                    Manajemen Garansi
                                </h1>
                                <p className="text-dark-textSecondary mt-1">
                                    Kelola dan tanggapi permintaan garansi dari pelanggan
                                </p>
                            </div>

                            <div className="w-full md:w-auto flex items-center gap-3">
                                <div className="relative flex-1 md:flex-initial">
                                    <input
                                        type="text"
                                        placeholder="Cari garansi..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-lightGray border border-dark-border rounded-lg py-2 px-4 pl-10 w-full md:w-64 focus:border-primary outline-none"
                                    />
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-textSecondary" />
                                </div>
                                <div className="relative">
                                    <button
                                        className="bg-lightGray border border-dark-border rounded-lg p-2"
                                        aria-label="Filter"
                                    >
                                        <Filter className="h-5 w-5 text-dark-textSecondary" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="border-b border-dark-border">
                            <div className="flex overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab('active')}
                                    className={`flex items-center gap-1 px-4 py-3 text-sm font-medium whitespace-nowrap ${
                                        activeTab === 'active'
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                                    }`}
                                >
                                    <span>Permintaan Aktif</span>
                                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                    {activeWarrantyRequests.length}
                  </span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('history')}
                                    className={`flex items-center gap-1 px-4 py-3 text-sm font-medium whitespace-nowrap ${
                                        activeTab === 'history'
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                                    }`}
                                >
                                    <span>Riwayat</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('policy')}
                                    className={`flex items-center gap-1 px-4 py-3 text-sm font-medium whitespace-nowrap ${
                                        activeTab === 'policy'
                                            ? 'text-primary border-b-2 border-primary'
                                            : 'text-dark-textSecondary hover:text-dark-text border-b-2 border-transparent'
                                    }`}
                                >
                                    <span>Kebijakan Garansi</span>
                                </button>
                            </div>
                        </div>

                        {/* Active Requests Tab Content */}
                        {activeTab === 'active' && (
                            <div className="space-y-6">
                                {/* Filter options */}
                                <div className="flex flex-wrap gap-3">
                                    <div className="space-x-2">
                                        <span className="text-xs text-dark-textSecondary">Status:</span>
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="bg-lightGray border border-dark-border rounded-lg px-2 py-1 text-xs focus:border-primary outline-none"
                                        >
                                            <option value="all">Semua</option>
                                            <option value="pending">Menunggu</option>
                                            <option value="approved">Disetujui</option>
                                        </select>
                                    </div>
                                    <div className="space-x-2">
                                        <span className="text-xs text-dark-textSecondary">Kategori:</span>
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="bg-lightGray border border-dark-border rounded-lg px-2 py-1 text-xs focus:border-primary outline-none"
                                        >
                                            <option value="all">Semua</option>
                                            <option value="elektronik">Elektronik</option>
                                            <option value="akademik">Akademik</option>
                                        </select>
                                    </div>
                                </div>

                                {/* List of active requests */}
                                {filteredActiveRequests.length > 0 ? (
                                    <div className="space-y-4">
                                        {filteredActiveRequests.map(request => (
                                            <div key={request.id} className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4 hover:border-primary transition-colors">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <h3 className="font-medium">{request.jobTitle}</h3>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="text-dark-textSecondary text-sm">{request.jobId}</span>
                                                                    <span className="text-dark-textSecondary text-xs">•</span>
                                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                                        request.category === 'elektronik'
                                                                            ? 'bg-blue-900/30 text-blue-400'
                                                                            : 'bg-purple-900/30 text-purple-400'
                                                                    }`}>
                                    {request.category === 'elektronik' ? 'Elektronik' : 'Akademik'}
                                  </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex gap-2">
                                                                {getStatusLabel(request.status)}
                                                                {getPriorityLabel(request.priority)}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3 mt-3">
                                                            <img
                                                                src={request.customer.avatar}
                                                                alt={request.customer.name}
                                                                className="h-8 w-8 rounded-full"
                                                            />
                                                            <span className="text-sm">{request.customer.name}</span>
                                                        </div>

                                                        <div className="mt-3">
                                                            <p className="text-dark-textSecondary text-sm line-clamp-2">
                                                                {request.issue}
                                                            </p>
                                                        </div>

                                                        {request.photos && request.photos.length > 0 && (
                                                            <div className="mt-3 flex gap-2">
                                                                {request.photos.slice(0, 3).map((photo, idx) => (
                                                                    <div key={idx} className="h-16 w-16 bg-lightGray rounded-md overflow-hidden border border-dark-border">
                                                                        <img
                                                                            src={photo}
                                                                            alt={`Issue photo ${idx + 1}`}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                ))}
                                                                {request.photos.length > 3 && (
                                                                    <div className="h-16 w-16 bg-lightGray/50 rounded-md flex items-center justify-center border border-dark-border">
                                    <span className="text-dark-textSecondary text-xs">
                                      +{request.photos.length - 3}
                                    </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-row md:flex-col justify-between md:justify-start gap-4 md:gap-2 md:min-w-36 md:text-right">
                                                        <div>
                                                            <div className="text-xs text-dark-textSecondary">Permintaan:</div>
                                                            <div className="text-sm">{formatDate(request.requestDate)}</div>

                                                            <div className="text-xs text-dark-textSecondary mt-2">Tenggat:</div>
                                                            <div className={`text-sm ${
                                                                getDaysRemaining(request.dueDate) < 0
                                                                    ? 'text-red-400'
                                                                    : getDaysRemaining(request.dueDate) <= 2
                                                                        ? 'text-amber-400'
                                                                        : 'text-dark-text'
                                                            }`}>
                                                                {formatDate(request.dueDate)}
                                                                <span className="text-xs block">
                                  {getDaysRemaining(request.dueDate) < 0
                                      ? `Terlambat ${Math.abs(getDaysRemaining(request.dueDate))} hari`
                                      : getDaysRemaining(request.dueDate) === 0
                                          ? 'Hari ini'
                                          : `${getDaysRemaining(request.dueDate)} hari lagi`}
                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <button
                                                                onClick={() => handleViewRequest(request)}
                                                                className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                <span>Detail</span>
                                                            </button>

                                                            {request.responseRequired && (
                                                                <button
                                                                    onClick={() => handleRespondRequest(request.id)}
                                                                    className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg text-sm transition-colors shadow-button flex items-center justify-center gap-1"
                                                                >
                                                                    <MessageCircle className="h-4 w-4" />
                                                                    <span>Tanggapi</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-dark-card rounded-xl shadow-card border border-dashed border-dark-border p-8 text-center">
                                        <div className="bg-lightGray h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                                            <Shield className="h-8 w-8 text-dark-textSecondary" />
                                        </div>
                                        <h3 className="font-medium mt-4">Tidak ada permintaan garansi aktif</h3>
                                        <p className="text-dark-textSecondary text-sm mt-2">
                                            Semua permintaan garansi telah ditangani.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* History Tab Content */}
                        {activeTab === 'history' && (
                            <div className="space-y-6">
                                {/* Filter options */}
                                <div className="flex flex-wrap gap-3">
                                    <div className="space-x-2">
                                        <span className="text-xs text-dark-textSecondary">Status:</span>
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="bg-lightGray border border-dark-border rounded-lg px-2 py-1 text-xs focus:border-primary outline-none"
                                        >
                                            <option value="all">Semua</option>
                                            <option value="completed">Selesai</option>
                                            <option value="rejected">Ditolak</option>
                                        </select>
                                    </div>
                                    <div className="space-x-2">
                                        <span className="text-xs text-dark-textSecondary">Kategori:</span>
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="bg-lightGray border border-dark-border rounded-lg px-2 py-1 text-xs focus:border-primary outline-none"
                                        >
                                            <option value="all">Semua</option>
                                            <option value="elektronik">Elektronik</option>
                                            <option value="akademik">Akademik</option>
                                        </select>
                                    </div>
                                </div>

                                {/* List of warranty history */}
                                {filteredHistory.length > 0 ? (
                                    <div className="space-y-4">
                                        {filteredHistory.map(item => (
                                            <div key={item.id} className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4 hover:border-primary transition-colors">
                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <h3 className="font-medium">{item.jobTitle}</h3>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="text-dark-textSecondary text-sm">{item.jobId}</span>
                                                                    <span className="text-dark-textSecondary text-xs">•</span>
                                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                                        item.category === 'elektronik'
                                                                            ? 'bg-blue-900/30 text-blue-400'
                                                                            : 'bg-purple-900/30 text-purple-400'
                                                                    }`}>
                                    {item.category === 'elektronik' ? 'Elektronik' : 'Akademik'}
                                  </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex gap-2">
                                                                {getStatusLabel(item.status)}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3 mt-3">
                                                            <img
                                                                src={item.customer.avatar}
                                                                alt={item.customer.name}
                                                                className="h-8 w-8 rounded-full"
                                                            />
                                                            <span className="text-sm">{item.customer.name}</span>
                                                        </div>

                                                        <div className="mt-3">
                                                            <p className="text-dark-textSecondary text-sm">
                                                                <span className="text-dark-text font-medium">Masalah: </span>
                                                                {item.issue}
                                                            </p>
                                                            <p className="text-dark-textSecondary text-sm mt-2">
                                                                <span className="text-dark-text font-medium">Penyelesaian: </span>
                                                                {item.resolution}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row md:flex-col justify-between md:justify-start gap-4 md:gap-2 md:min-w-36 md:text-right">
                                                        <div>
                                                            <div className="text-xs text-dark-textSecondary">Permintaan:</div>
                                                            <div className="text-sm">{formatDate(item.requestDate)}</div>

                                                            <div className="text-xs text-dark-textSecondary mt-2">Penyelesaian:</div>
                                                            <div className="text-sm">{formatDate(item.resolvedDate)}</div>
                                                        </div>

                                                        <button
                                                            onClick={() => {/* View history details */}}
                                                            className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-1"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            <span>Detail</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-dark-card rounded-xl shadow-card border border-dashed border-dark-border p-8 text-center">
                                        <div className="bg-lightGray h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                                            <RefreshCw className="h-8 w-8 text-dark-textSecondary" />
                                        </div>
                                        <h3 className="font-medium mt-4">Tidak ada riwayat garansi</h3>
                                        <p className="text-dark-textSecondary text-sm mt-2">
                                            Riwayat permintaan garansi yang telah diselesaikan akan muncul di sini.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Policy Tab Content */}
                        {activeTab === 'policy' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {warrantyPolicies.map(policy => (
                                        <div key={policy.id} className="bg-dark-card rounded-xl shadow-card border border-dark-border p-4">
                                            <h3 className="font-medium flex items-center gap-2">
                                                <Shield className="h-4 w-4 text-primary" />
                                                {policy.title}
                                            </h3>
                                            <div className="mt-2 flex gap-2">
                                                {policy.category === 'all' && (
                                                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                            Semua Kategori
                          </span>
                                                )}
                                                {policy.category === 'elektronik' && (
                                                    <span className="bg-blue-900/30 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                            Elektronik
                          </span>
                                                )}
                                                {policy.category === 'akademik' && (
                                                    <span className="bg-purple-900/30 text-purple-400 text-xs px-2 py-0.5 rounded-full">
                            Akademik
                          </span>
                                                )}
                                            </div>
                                            <p className="text-dark-textSecondary text-sm mt-3">
                                                {policy.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                    <h3 className="font-medium text-lg">Alur Proses Klaim Garansi</h3>

                                    <div className="mt-5">
                                        <div className="relative">
                                            {/* Timeline line */}
                                            <div className="absolute left-7 top-0 bottom-0 w-px bg-dark-border"></div>

                                            <div className="space-y-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="bg-primary/20 text-primary h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                                                        <span className="text-xl font-bold">1</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">Permintaan dari Pelanggan</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            Pelanggan mengajukan permintaan garansi melalui aplikasi dengan menyertakan bukti kerusakan dan penjelasan masalah.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="bg-primary/20 text-primary h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                                                        <span className="text-xl font-bold">2</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">Validasi Klaim</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            Teknisi melakukan validasi klaim dengan memeriksa apakah kerusakan termasuk dalam cakupan garansi dan masih dalam periode garansi.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="bg-primary/20 text-primary h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                                                        <span className="text-xl font-bold">3</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">Persetujuan atau Penolakan</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            Berdasarkan hasil validasi, klaim akan disetujui atau ditolak. Jika ditolak, alasan penolakan akan dijelaskan kepada pelanggan.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="bg-primary/20 text-primary h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                                                        <span className="text-xl font-bold">4</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">Perbaikan Garansi</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            Jika disetujui, perbaikan dilakukan sesuai dengan cakupan garansi tanpa biaya tambahan.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="bg-primary/20 text-primary h-14 w-14 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                                                        <span className="text-xl font-bold">5</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">Penyelesaian</h4>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            Barang yang sudah diperbaiki dikembalikan kepada pelanggan dan status klaim diselesaikan.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Warranty Request Detail Modal */}
                {showDetailModal && activeRequest && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-dark-card rounded-xl shadow-card border border-dark-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-5 border-b border-dark-border flex justify-between items-center sticky top-0 bg-dark-card z-10">
                                <h3 className="font-display font-bold text-lg">Detail Permintaan Garansi</h3>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="text-dark-textSecondary hover:text-white transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-lg">{activeRequest.jobTitle}</h4>
                                    <div className="flex gap-2">
                                        {getStatusLabel(activeRequest.status)}
                                        {getPriorityLabel(activeRequest.priority)}
                                    </div>
                                </div>

                                <p className="text-dark-textSecondary text-sm mt-1">{activeRequest.jobId}</p>

                                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                        <h5 className="text-xs text-dark-textSecondary">Pelanggan</h5>
                                        <div className="flex items-center gap-3 mt-2">
                                            <img
                                                src={activeRequest.customer.avatar}
                                                alt={activeRequest.customer.name}
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <div>
                                                <p className="font-medium">{activeRequest.customer.name}</p>
                                                <p className="text-dark-textSecondary text-xs">{activeRequest.customer.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                        <h5 className="text-xs text-dark-textSecondary">Periode Garansi</h5>
                                        <p className="font-medium mt-2">{activeRequest.warrantyPeriod}</p>
                                        <div className="flex items-center gap-2 text-xs text-dark-textSecondary mt-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>Pekerjaan awal: {formatDate(activeRequest.originalJobDate)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 space-y-5">
                                    <div>
                                        <h5 className="font-medium mb-2">Deskripsi Masalah</h5>
                                        <div className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                            <p className="text-dark-textSecondary">
                                                {activeRequest.issue}
                                            </p>
                                        </div>
                                    </div>

                                    {activeRequest.photos && activeRequest.photos.length > 0 && (
                                        <div>
                                            <h5 className="font-medium mb-2">Foto Bukti</h5>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {activeRequest.photos.map((photo, idx) => (
                                                    <div key={idx} className="aspect-square bg-lightGray rounded-lg overflow-hidden border border-dark-border">
                                                        <img
                                                            src={photo}
                                                            alt={`Issue photo ${idx + 1}`}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h5 className="font-medium mb-2">Tenggat Waktu</h5>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-lightGray rounded-lg p-3 border border-dark-border flex-1">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Calendar className="h-4 w-4 text-dark-textSecondary" />
                                                    <span>Permintaan: {formatDate(activeRequest.requestDate)}</span>
                                                </div>
                                            </div>
                                            <div className="bg-lightGray rounded-lg p-3 border border-dark-border flex-1">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Clock className="h-4 w-4 text-dark-textSecondary" />
                                                    <span className={`${
                                                        getDaysRemaining(activeRequest.dueDate) < 0
                                                            ? 'text-red-400'
                                                            : getDaysRemaining(activeRequest.dueDate) <= 2
                                                                ? 'text-amber-400'
                                                                : 'text-dark-text'
                                                    }`}>
                            Tenggat: {formatDate(activeRequest.dueDate)}
                                                        {getDaysRemaining(activeRequest.dueDate) < 0
                                                            ? ` (Terlambat ${Math.abs(getDaysRemaining(activeRequest.dueDate))} hari)`
                                                            : getDaysRemaining(activeRequest.dueDate) === 0
                                                                ? ' (Hari ini)'
                                                                : ` (${getDaysRemaining(activeRequest.dueDate)} hari lagi)`}
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col md:flex-row gap-3 justify-end">
                                    <button
                                        onClick={() => setShowDetailModal(false)}
                                        className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <X className="h-4 w-4" />
                                        <span>Tutup</span>
                                    </button>

                                    {activeRequest.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => {/* Handle reject */}}
                                                className="bg-dark-bg border border-dark-border hover:border-red-500 text-dark-textSecondary hover:text-red-500 px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ThumbsDown className="h-4 w-4" />
                                                <span>Tolak</span>
                                            </button>

                                            <button
                                                onClick={() => {/* Handle approve */}}
                                                className="bg-dark-bg border border-dark-border hover:border-green-500 text-dark-textSecondary hover:text-green-500 px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ThumbsUp className="h-4 w-4" />
                                                <span>Setujui</span>
                                            </button>
                                        </>
                                    )}

                                    {activeRequest.responseRequired && (
                                        <button
                                            onClick={() => handleRespondRequest(activeRequest.id)}
                                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg transition-colors shadow-button flex items-center justify-center gap-2"
                                        >
                                            <MessageCircle className="h-4 w-4" />
                                            <span>Tanggapi</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </WorkerLayout>
    );
};

export default WarrantyPage;