"use client";

import { useState, useEffect } from 'react';
import {
    Shield,
    CheckCircle2,
    AlertCircle,
    Calendar,
    Clock,
    ArrowLeft,
    HelpCircle,
    FileText,
    RefreshCw,
    ChevronRight, X
} from 'lucide-react';
import Link from 'next/link';

// Types
interface WarrantyDetails {
    id: string;
    status: 'active' | 'expired' | 'claimed' | 'processing';
    startDate: string;
    endDate: string;
    daysLeft: number;
    serviceName: string;
    orderNumber: string;
    description: string;
    terms: string[];
    claims: WarrantyClaim[];
}

interface WarrantyClaim {
    id: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    description: string;
    response?: string;
}

export default function WarrantyPage({ params }: { params: { id: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [warrantyDetails, setWarrantyDetails] = useState<WarrantyDetails | null>(null);
    const [activeTab, setActiveTab] = useState<'details' | 'claims' | 'terms'>('details');
    const [showClaimForm, setShowClaimForm] = useState(false);
    const [claimDescription, setClaimDescription] = useState('');
    const [claimSubmitting, setClaimSubmitting] = useState(false);

    // Simulasi loading data
    useEffect(() => {
        const timer = setTimeout(() => {
            // Mock data
            const mockWarranty: WarrantyDetails = {
                id: 'WRN-' + params.id.slice(4),
                status: 'active',
                startDate: '2025-03-01',
                endDate: '2025-06-01',
                daysLeft: 85,
                serviceName: params.id.includes('123457')
                    ? 'Perbaikan Laptop Asus ROG'
                    : 'Pengerjaan Skripsi - Manajemen Bisnis',
                orderNumber: params.id,
                description: 'Garansi standar untuk hasil pengerjaan. Berlaku 3 bulan sejak tanggal penyelesaian.',
                terms: [
                    'Garansi hanya berlaku untuk kesalahan dalam pengerjaan atau materi yang telah diselesaikan.',
                    'Garansi tidak berlaku jika terjadi kerusakan akibat penggunaan yang tidak sesuai petunjuk.',
                    'Klaim garansi harus dilaporkan maksimal 2 minggu sejak ditemukannya masalah.',
                    'Perbaikan dalam masa garansi akan dilakukan tanpa biaya tambahan.',
                    'Waktu penyelesaian klaim garansi maksimal 7 hari kerja.',
                    'Keputusan tim teknis bersifat final dan mengikat.'
                ],
                claims: [
                    {
                        id: 'CLM-001',
                        date: '2025-03-10',
                        status: 'completed',
                        description: 'Beberapa bagian laporan memerlukan revisi minor sesuai dengan format terbaru.',
                        response: 'Revisi telah dilakukan dan dokumen telah diperbaiki sesuai dengan format terbaru.'
                    }
                ]
            };

            setWarrantyDetails(mockWarranty);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [params.id]);

    // Fungsi untuk format tanggal
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Handle submit klaim garansi
    const handleSubmitClaim = (e: React.FormEvent) => {
        e.preventDefault();
        setClaimSubmitting(true);

        // Simulasi API call
        setTimeout(() => {
            if (warrantyDetails) {
                const newClaim: WarrantyClaim = {
                    id: `CLM-00${warrantyDetails.claims.length + 1}`,
                    date: new Date().toISOString().split('T')[0],
                    status: 'pending',
                    description: claimDescription
                };

                setWarrantyDetails({
                    ...warrantyDetails,
                    claims: [...warrantyDetails.claims, newClaim]
                });

                setClaimDescription('');
                setShowClaimForm(false);
                setClaimSubmitting(false);
                setActiveTab('claims');
            }
        }, 1500);
    };

    // Render status badge
    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return (
                    <div className="flex items-center gap-1 text-green-400 bg-green-900/30 px-3 py-1.5 rounded-full text-xs font-medium">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Garansi Aktif</span>
                    </div>
                );
            case 'expired':
                return (
                    <div className="flex items-center gap-1 text-red-400 bg-red-900/30 px-3 py-1.5 rounded-full text-xs font-medium">
                        <AlertCircle className="h-3 w-3" />
                        <span>Garansi Berakhir</span>
                    </div>
                );
            case 'claimed':
                return (
                    <div className="flex items-center gap-1 text-blue-400 bg-blue-900/30 px-3 py-1.5 rounded-full text-xs font-medium">
                        <RefreshCw className="h-3 w-3" />
                        <span>Klaim Diproses</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-1 text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full text-xs font-medium">
                        <HelpCircle className="h-3 w-3" />
                        <span>Status Tidak Diketahui</span>
                    </div>
                );
        }
    };

    // Render claim status badge
    const renderClaimStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <div className="flex items-center gap-1 text-amber-400 bg-amber-900/30 px-2 py-1 rounded-full text-xs">
                        <Clock className="h-3 w-3" />
                        <span>Menunggu Review</span>
                    </div>
                );
            case 'approved':
                return (
                    <div className="flex items-center gap-1 text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full text-xs">
                        <RefreshCw className="h-3 w-3" />
                        <span>Disetujui - Diproses</span>
                    </div>
                );
            case 'rejected':
                return (
                    <div className="flex items-center gap-1 text-red-400 bg-red-900/30 px-2 py-1 rounded-full text-xs">
                        <AlertCircle className="h-3 w-3" />
                        <span>Ditolak</span>
                    </div>
                );
            case 'completed':
                return (
                    <div className="flex items-center gap-1 text-green-400 bg-green-900/30 px-2 py-1 rounded-full text-xs">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Selesai</span>
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-1 text-gray-400 bg-gray-800 px-2 py-1 rounded-full text-xs">
                        <HelpCircle className="h-3 w-3" />
                        <span>Status Tidak Diketahui</span>
                    </div>
                );
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
                <div className="w-10 h-10 border-4 border-dark-border border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!warrantyDetails) {
        return (
            <div className="py-12 text-center">
                <div className="bg-dark-bg rounded-full p-4 mb-4 inline-block">
                    <AlertCircle className="h-8 w-8 text-red-400" />
                </div>
                <h2 className="text-xl font-medium text-dark-text mb-2">Garansi Tidak Ditemukan</h2>
                <p className="text-dark-textSecondary mb-6">
                    Informasi garansi untuk pesanan ini tidak ditemukan.
                </p>
                <Link
                    href={`/dashboard/orders/${params.id}`}
                    className="inline-flex items-center text-primary hover:text-primary-light"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Kembali ke Detail Pesanan
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Back button */}
            <div className="mb-6">
                <Link
                    href={`/dashboard/orders/${params.id}`}
                    className="inline-flex items-center text-dark-textSecondary hover:text-dark-text transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Kembali ke Detail Pesanan
                </Link>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-dark-text">Informasi Garansi</h1>
                    <p className="text-dark-textSecondary">
                        Detail garansi untuk pesanan {warrantyDetails.orderNumber}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    {warrantyDetails.status === 'active' && (
                        <button
                            onClick={() => setShowClaimForm(true)}
                            className="bg-primary text-dark-text px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            Ajukan Klaim Garansi
                        </button>
                    )}
                    <a
                        href="#"
                        target="_blank"
                        className="bg-dark-card border border-dark-border text-dark-text px-4 py-2 rounded-lg hover:bg-dark-bg transition-colors flex items-center justify-center"
                    >
                        <FileText className="h-4 w-4 mr-2" /> Sertifikat Garansi
                    </a>
                </div>
            </div>

            {/* Warranty Summary Card */}
            <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center">
                            <div className="bg-primary/10 text-primary p-3 rounded-full mr-4">
                                <Shield className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-dark-text">{warrantyDetails.serviceName}</h2>
                                <div className="mt-1">
                                    {renderStatusBadge(warrantyDetails.status)}
                                </div>
                            </div>
                        </div>
                        {warrantyDetails.status === 'active' && (
                            <div className="bg-dark-bg p-3 rounded-lg text-center min-w-36">
                                <p className="text-dark-textSecondary text-sm">Sisa Masa Garansi</p>
                                <p className="text-xl font-bold text-primary">{warrantyDetails.daysLeft} hari</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                            <p className="text-dark-textSecondary text-sm mb-1">ID Garansi</p>
                            <p className="text-dark-text font-medium">{warrantyDetails.id}</p>
                        </div>
                        <div>
                            <p className="text-dark-textSecondary text-sm mb-1">Tanggal Mulai</p>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-dark-textSecondary mr-1" />
                                <p className="text-dark-text font-medium">{formatDate(warrantyDetails.startDate)}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-dark-textSecondary text-sm mb-1">Tanggal Berakhir</p>
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-dark-textSecondary mr-1" />
                                <p className="text-dark-text font-medium">{formatDate(warrantyDetails.endDate)}</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-dark-textSecondary text-sm mt-4">{warrantyDetails.description}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-dark-border mb-6">
                <div className="flex overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                            activeTab === 'details'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-dark-textSecondary hover:text-dark-text hover:border-b-2 hover:border-dark-border'
                        }`}
                    >
                        Detail Garansi
                    </button>
                    <button
                        onClick={() => setActiveTab('claims')}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                            activeTab === 'claims'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-dark-textSecondary hover:text-dark-text hover:border-b-2 hover:border-dark-border'
                        }`}
                    >
                        Riwayat Klaim
                        {warrantyDetails.claims.length > 0 && (
                            <span className="ml-2 bg-dark-bg px-2 py-0.5 rounded-full text-xs">
                {warrantyDetails.claims.length}
              </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('terms')}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                            activeTab === 'terms'
                                ? 'border-b-2 border-primary text-primary'
                                : 'text-dark-textSecondary hover:text-dark-text hover:border-b-2 hover:border-dark-border'
                        }`}
                    >
                        Syarat & Ketentuan
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div>
                {/* Details Tab */}
                {activeTab === 'details' && (
                    <div className="space-y-6">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-dark-text mb-4">Cakupan Garansi</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-dark-text">Kesalahan dalam hasil pengerjaan</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-dark-text">Revisi minor sesuai dengan permintaan awal</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-dark-text">Perbaikan dan koreksi tanpa biaya tambahan</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-dark-text">Dukungan teknis selama masa garansi</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-dark-text mb-4">Cara Menggunakan Garansi</h3>
                            <ol className="space-y-4">
                                <li className="flex">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-dark-bg flex items-center justify-center mr-3 text-primary font-medium">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-dark-text">Laporkan Masalah</h4>
                                        <p className="text-dark-textSecondary text-sm mt-1">
                                            Klik tombol "Ajukan Klaim Garansi" dan jelaskan masalah yang Anda temui dengan detail.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-dark-bg flex items-center justify-center mr-3 text-primary font-medium">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-dark-text">Verifikasi Klaim</h4>
                                        <p className="text-dark-textSecondary text-sm mt-1">
                                            Tim kami akan meninjau klaim Anda dalam waktu 1-2 hari kerja dan menghubungi Anda jika diperlukan informasi tambahan.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-dark-bg flex items-center justify-center mr-3 text-primary font-medium">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-dark-text">Proses Perbaikan</h4>
                                        <p className="text-dark-textSecondary text-sm mt-1">
                                            Setelah klaim disetujui, tim kami akan segera melakukan perbaikan sesuai dengan masalah yang dilaporkan.
                                        </p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-dark-bg flex items-center justify-center mr-3 text-primary font-medium">
                                        4
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-dark-text">Konfirmasi Penyelesaian</h4>
                                        <p className="text-dark-textSecondary text-sm mt-1">
                                            Setelah perbaikan selesai, Anda akan diminta untuk mengkonfirmasi bahwa masalah telah teratasi dengan baik.
                                        </p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className="bg-amber-900/20 border border-amber-900/30 rounded-lg p-5">
                            <div className="flex items-start">
                                <AlertCircle className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-dark-text">Penting</h4>
                                    <p className="text-dark-textSecondary text-sm mt-1">
                                        Klaim garansi harus diajukan dalam masa periode garansi aktif. Pastikan untuk mengajukan klaim segera setelah menemukan masalah.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Claims Tab */}
                {activeTab === 'claims' && (
                    <div className="space-y-6">
                        {warrantyDetails.claims.length > 0 ? (
                            <div className="bg-dark-card border border-dark-border rounded-lg divide-y divide-dark-border">
                                {warrantyDetails.claims.map((claim) => (
                                    <div key={claim.id} className="p-5">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                            <div>
                                                <div className="flex items-center">
                                                    <h4 className="font-medium text-dark-text">{claim.id}</h4>
                                                    <span className="mx-2 text-dark-textSecondary">•</span>
                                                    <p className="text-dark-textSecondary text-sm">{formatDate(claim.date)}</p>
                                                </div>
                                                <div className="mt-2">
                                                    {renderClaimStatusBadge(claim.status)}
                                                </div>
                                            </div>
                                            <Link
                                                href="#"
                                                className="text-primary hover:text-primary-light text-sm flex items-center"
                                            >
                                                Detail <ChevronRight className="h-4 w-4 ml-1" />
                                            </Link>
                                        </div>
                                        <div className="mt-3">
                                            <p className="text-dark-text text-sm">{claim.description}</p>
                                            {claim.response && (
                                                <div className="mt-3 bg-dark-bg p-3 rounded-lg">
                                                    <p className="text-dark-textSecondary text-xs mb-1">Tanggapan:</p>
                                                    <p className="text-dark-text text-sm">{claim.response}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-dark-card border border-dark-border rounded-lg p-8 text-center">
                                <div className="bg-dark-bg rounded-full p-4 mb-4 inline-block">
                                    <FileText className="h-8 w-8 text-dark-textSecondary" />
                                </div>
                                <h3 className="text-lg font-medium text-dark-text mb-1">Belum Ada Klaim</h3>
                                <p className="text-dark-textSecondary mb-4">
                                    Anda belum mengajukan klaim garansi untuk pesanan ini.
                                </p>
                                {warrantyDetails.status === 'active' && (
                                    <button
                                        onClick={() => setShowClaimForm(true)}
                                        className="px-4 py-2 bg-primary text-dark-text rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                                    >
                                        Ajukan Klaim Garansi
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Terms Tab */}
                {activeTab === 'terms' && (
                    <div className="space-y-6">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-dark-text mb-4">Syarat & Ketentuan Garansi</h3>
                            <ul className="space-y-3">
                                {warrantyDetails.terms.map((term, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-dark-bg flex items-center justify-center mr-2 text-primary text-xs font-medium mt-0.5">
                                            {index + 1}
                                        </div>
                                        <span className="text-dark-text text-sm">{term}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-dark-text mb-4">Pengecualian Garansi</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-dark-text text-sm">
                    Kerusakan yang disebabkan oleh penggunaan yang tidak sesuai petunjuk
                  </span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-dark-text text-sm">
                    Permintaan perubahan atau fitur baru yang tidak termasuk dalam kesepakatan awal
                  </span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-dark-text text-sm">
                    Kerusakan yang terjadi setelah masa garansi berakhir
                  </span>
                                </li>
                                <li className="flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-dark-text text-sm">
                    Modifikasi atau perbaikan yang dilakukan oleh pihak ketiga selain tim kami
                  </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Claim Warranty Modal */}
            {showClaimForm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-dark-card rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-dark-border">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-dark-text">Ajukan Klaim Garansi</h3>
                                <button
                                    onClick={() => setShowClaimForm(false)}
                                    className="text-dark-textSecondary hover:text-dark-text"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmitClaim}>
                            <div className="p-6">
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Shield className="h-5 w-5 text-primary" />
                                        <p className="text-dark-text font-medium">{warrantyDetails.id}</p>
                                    </div>
                                    <div className="bg-dark-bg rounded-lg p-3 mb-6">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-dark-textSecondary">Status Garansi:</span>
                                            <span className="text-green-400">Aktif</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm mt-2">
                                            <span className="text-dark-textSecondary">Berlaku Hingga:</span>
                                            <span className="text-dark-text">{formatDate(warrantyDetails.endDate)}</span>
                                        </div>
                                    </div>
                                    <label className="block text-dark-text font-medium mb-2">
                                        Deskripsi Masalah <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={claimDescription}
                                        onChange={(e) => setClaimDescription(e.target.value)}
                                        placeholder="Jelaskan masalah yang Anda temui secara detail..."
                                        className="w-full bg-dark-bg border border-dark-border text-dark-text rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    ></textarea>
                                </div>
                                <div className="bg-blue-900/10 border border-blue-900/20 rounded-lg p-4 mb-4">
                                    <div className="flex">
                                        <HelpCircle className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-blue-400 font-medium">Tips mengajukan klaim:</p>
                                            <ul className="text-xs text-dark-textSecondary mt-1 space-y-1">
                                                <li>• Jelaskan masalah secara spesifik dan detail</li>
                                                <li>• Sertakan langkah-langkah yang menyebabkan masalah terjadi</li>
                                                <li>• Jika memungkinkan, lampirkan bukti visual (screenshot atau foto)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-dark-bg border-t border-dark-border flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowClaimForm(false)}
                                    className="px-4 py-2 border border-dark-border text-dark-textSecondary rounded-lg hover:bg-dark-card transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={claimSubmitting || !claimDescription.trim()}
                                    className={`px-4 py-2 bg-primary text-dark-text rounded-lg transition-colors flex items-center ${
                                        claimSubmitting || !claimDescription.trim()
                                            ? 'opacity-70 cursor-not-allowed'
                                            : 'hover:bg-primary-dark'
                                    }`}
                                >
                                    {claimSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-dark-border border-t-dark-text rounded-full animate-spin mr-2"></div>
                                            Mengirim...
                                        </>
                                    ) : (
                                        'Kirim Klaim'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}