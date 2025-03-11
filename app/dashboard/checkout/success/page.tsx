'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface OrderDetails {
    id: string;
    serviceName: string;
    amount: number;
    dpAmount: number;
    paymentMethod: string;
    accountNumber: string;
    accountName: string;
    bank: string;
    date: string;
    expiry: string;
}

const CheckoutSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams?.get('order');

    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState({ hours: 24, minutes: 0, seconds: 0 });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [confirmationNote, setConfirmationNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Simulate fetching order details
    useEffect(() => {
        if (orderId) {
            // Mock API call to get order details
            setTimeout(() => {
                const now = new Date();
                const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

                setOrderDetails({
                    id: orderId,
                    serviceName: 'Pengerjaan Skripsi & Tugas Akhir - Paket Premium',
                    amount: 3500000,
                    dpAmount: 1750000, // 50% DP
                    paymentMethod: 'BCA Transfer',
                    accountNumber: '1234567890',
                    accountName: 'PT Suruhsuruh Indonesia',
                    bank: 'BCA',
                    date: now.toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    expiry: expiry.toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                });
                setLoading(false);
            }, 1000);
        }
    }, [orderId]);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
                    clearInterval(timer);
                    return prev;
                }

                let newSeconds = prev.seconds - 1;
                let newMinutes = prev.minutes;
                let newHours = prev.hours;

                if (newSeconds < 0) {
                    newSeconds = 59;
                    newMinutes -= 1;
                }

                if (newMinutes < 0) {
                    newMinutes = 59;
                    newHours -= 1;
                }

                return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];

            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('File terlalu besar. Maksimal ukuran file adalah 5MB.');
                return;
            }

            setUploadedFile(file);
            setUploadedFileUrl(URL.createObjectURL(file));

            // Simulate upload progress
            setIsUploading(true);
            setUploadProgress(0);

            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsUploading(false);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
        }
    };

    // Handle drag and drop
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];

            // Check file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('File terlalu besar. Maksimal ukuran file adalah 5MB.');
                return;
            }

            setUploadedFile(file);
            setUploadedFileUrl(URL.createObjectURL(file));

            // Simulate upload progress
            setIsUploading(true);
            setUploadProgress(0);

            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsUploading(false);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
        }
    };

    // Submit payment confirmation
    const handleSubmitConfirmation = () => {
        if (!uploadedFile) {
            alert('Silakan unggah bukti pembayaran terlebih dahulu.');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call to submit payment confirmation
        setTimeout(() => {
            setIsSubmitting(false);
            setShowConfirmation(false);

            // Show success message
            alert('Konfirmasi pembayaran berhasil dikirim. Tim kami akan segera memverifikasi pembayaran Anda.');

            // Redirect to orders page
            router.push('/dashboard/orders');
        }, 2000);
    };

    // Format timer
    const formatTime = (value: number) => {
        return value.toString().padStart(2, '0');
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-dark-bg flex items-center justify-center">
                <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col">
            {/* Header */}
            <header className="bg-secondary py-4 border-b border-dark-border">
                <div className="container-custom">
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold font-display text-dark-text">
                          suruh<span className="text-primary">suruh.id</span>
                        </span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <motion.main
                className="container-custom py-8 md:py-12 flex-grow"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Success Message */}
                <motion.div
                    className="max-w-3xl mx-auto mb-12 text-center"
                    variants={itemVariants}
                >
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-dark-text mb-3">Pesanan Berhasil Dibuat!</h1>
                    <p className="text-dark-textSecondary text-lg max-w-2xl mx-auto">
                        Terima kasih atas pesanan Anda. Silakan lakukan pembayaran sesuai instruksi di bawah untuk memulai proses pengerjaan.
                    </p>
                </motion.div>

                {/* Order Information */}
                <motion.div
                    className="max-w-3xl mx-auto"
                    variants={itemVariants}
                >
                    <div className="bg-dark-card rounded-xl border border-dark-border/30 shadow-card overflow-hidden">
                        {/* Order Header */}
                        <div className="bg-dark-bg p-6 border-b border-dark-border/30">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-dark-text">Detail Pesanan</h2>
                                    <p className="text-dark-textSecondary">ID Pesanan: {orderDetails?.id}</p>
                                </div>
                                <div className="mt-3 md:mt-0">
                                    <span className="inline-block bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">
                                        Menunggu Pembayaran
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm text-dark-textSecondary mb-2">Layanan</h3>
                                    <p className="text-dark-text font-medium">{orderDetails?.serviceName}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm text-dark-textSecondary mb-2">Tanggal Pemesanan</h3>
                                    <p className="text-dark-text">{orderDetails?.date}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm text-dark-textSecondary mb-2">Total Pembayaran</h3>
                                    <p className="text-dark-text font-medium">Rp {orderDetails?.amount.toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm text-dark-textSecondary mb-2">Down Payment (50%)</h3>
                                    <p className="text-primary font-medium">Rp {orderDetails?.dpAmount.toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm text-dark-textSecondary mb-2">Metode Pembayaran</h3>
                                    <p className="text-dark-text font-medium">{orderDetails?.paymentMethod}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm text-dark-textSecondary mb-2">Batas Waktu Pembayaran</h3>
                                    <p className="text-dark-text">{orderDetails?.expiry}</p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-dark-border/30 my-6"></div>

                            {/* Payment Instructions */}
                            <div>
                                <h3 className="text-lg font-semibold text-dark-text mb-4">Instruksi Pembayaran</h3>

                                <div className="bg-dark-bg p-6 rounded-lg mb-6">
                                    <div className="mb-4">
                                        <h4 className="text-dark-textSecondary text-sm">Transfer ke Rekening:</h4>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-white rounded flex items-center justify-center mr-3">
                                                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                                                </div>
                                                <div>
                                                    <p className="text-dark-text font-medium">{orderDetails?.bank}</p>
                                                    <p className="text-dark-textSecondary text-sm">{orderDetails?.accountName}</p>
                                                </div>
                                            </div>
                                            <div className="bg-dark-card px-4 py-2 rounded border border-dark-border/30 flex items-center">
                                                <span className="font-mono text-dark-text mr-3">{orderDetails?.accountNumber}</span>
                                                <button
                                                    className="text-primary hover:text-primary-dark"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(orderDetails?.accountNumber || '');
                                                        alert('Nomor rekening disalin ke clipboard');
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-dark-textSecondary text-sm mb-2">Jumlah yang Harus Dibayar:</h4>
                                        <div className="flex items-center justify-between bg-dark-card p-4 rounded border border-dark-border/30">
                                            <span className="text-dark-text font-medium">Rp {orderDetails?.dpAmount.toLocaleString('id-ID')}</span>
                                            <button
                                                className="text-primary hover:text-primary-dark text-sm flex items-center"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`${orderDetails?.dpAmount}`);
                                                    alert('Jumlah pembayaran disalin ke clipboard');
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                </svg>
                                                Salin
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-dark-textSecondary font-medium">Batas Waktu Pembayaran:</h4>
                                            <span className="text-primary font-semibold">
                                                {formatTime(countdown.hours)}:{formatTime(countdown.minutes)}:{formatTime(countdown.seconds)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-dark-border/30 rounded-full h-2.5 mb-1">
                                            <div
                                                className="bg-primary h-2.5 rounded-full transition-all duration-1000"
                                                style={{ width: `${((countdown.hours * 3600 + countdown.minutes * 60 + countdown.seconds) / (24 * 3600)) * 100}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-dark-textSecondary text-sm">
                                            Selesaikan pembayaran sebelum <span className="text-primary font-medium">{orderDetails?.expiry}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Payment Steps */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-dark-text mb-4">Langkah-langkah Pembayaran</h3>
                                    <ol className="space-y-4">
                                        <li className="flex">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-dark-text text-sm mr-3 mt-0.5">1</div>
                                            <div>
                                                <p className="text-dark-text">
                                                    Transfer tepat <span className="text-primary font-medium">Rp {orderDetails?.dpAmount.toLocaleString('id-ID')}</span> ke rekening {orderDetails?.bank} yang tertera di atas.
                                                </p>
                                                <p className="text-dark-textSecondary text-sm mt-1">
                                                    Catatan: Pastikan transfer tepat sesuai jumlah untuk memudahkan verifikasi.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-dark-text text-sm mr-3 mt-0.5">2</div>
                                            <div>
                                                <p className="text-dark-text">Simpan bukti transfer untuk konfirmasi pembayaran.</p>
                                                <p className="text-dark-textSecondary text-sm mt-1">
                                                    Konfirmasi pembayaran diperlukan untuk memproses pesanan Anda lebih cepat.
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-dark-text text-sm mr-3 mt-0.5">3</div>
                                            <div>
                                                <p className="text-dark-text">Klik tombol "Konfirmasi Pembayaran" di bawah dan unggah bukti transfer Anda.</p>
                                                <p className="text-dark-textSecondary text-sm mt-1">
                                                    Format gambar yang didukung: JPG, PNG, atau PDF (maks. 5MB).
                                                </p>
                                            </div>
                                        </li>
                                        <li className="flex">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-dark-text text-sm mr-3 mt-0.5">4</div>
                                            <div>
                                                <p className="text-dark-text">Tim kami akan memverifikasi pembayaran Anda dan mulai mengerjakan pesanan Anda.</p>
                                                <p className="text-dark-textSecondary text-sm mt-1">
                                                    Proses verifikasi biasanya membutuhkan waktu 1-2 jam pada jam kerja.
                                                </p>
                                            </div>
                                        </li>
                                    </ol>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={() => setShowConfirmation(true)}
                                        className="bg-primary hover:bg-primary-dark text-dark-text font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Konfirmasi Pembayaran
                                    </button>
                                    <Link
                                        href="/dashboard/orders"
                                        className="bg-dark-card hover:bg-dark-border text-dark-text font-medium py-3 px-6 rounded-lg transition-colors border border-dark-border/30 flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                        </svg>
                                        Lihat Detail Pesanan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Help Section */}
                    <div className="mt-8 bg-dark-card rounded-xl p-6 border border-dark-border/30 shadow-card">
                        <h3 className="text-lg font-semibold text-dark-text mb-4">Butuh Bantuan?</h3>
                        <p className="text-dark-textSecondary mb-4">
                            Jika Anda memiliki pertanyaan atau membutuhkan bantuan terkait pembayaran atau pesanan, jangan ragu untuk menghubungi tim dukungan kami.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                Chat WhatsApp
                            </a>
                            <Link
                                href="/kontak"
                                className="bg-dark-bg hover:bg-dark-border/50 text-dark-text font-medium py-3 px-6 rounded-lg transition-colors border border-dark-border/30 flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                Kontak Kami
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </motion.main>

            {/* Payment Confirmation Modal - PENTING: Harus di dalam return statement utama */}
            {showConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-dark-card rounded-xl shadow-lg max-w-xl w-full p-6 animate-fadeIn max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-dark-text">Konfirmasi Pembayaran</h3>
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="text-dark-textSecondary hover:text-dark-text transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 024 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-dark-textSecondary mb-4">
                                Silakan unggah bukti transfer Anda untuk verifikasi pembayaran. Pastikan gambar jelas dan menunjukkan jumlah, tanggal, serta rekening tujuan transfer.
                            </p>

                            {/* Order info summary */}
                            <div className="bg-dark-bg rounded-lg p-4 mb-4 border border-dark-border/30">
                                <div className="flex justify-between mb-2">
                                    <span className="text-dark-textSecondary text-sm">ID Pesanan:</span>
                                    <span className="text-dark-text font-medium">{orderDetails?.id}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-dark-textSecondary text-sm">Layanan:</span>
                                    <span className="text-dark-text">{orderDetails?.serviceName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-dark-textSecondary text-sm">Jumlah Pembayaran (DP):</span>
                                    <span className="text-primary font-medium">Rp {orderDetails?.dpAmount.toLocaleString('id-ID')}</span>
                                </div>
                            </div>

                            {/* File upload area */}
                            <div
                                className={`border-2 border-dashed ${uploadedFile ? 'border-primary/50 bg-primary/5' : 'border-dark-border/50 bg-dark-bg'} rounded-lg p-6 text-center mb-4 transition-all duration-300`}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                {!uploadedFile ? (
                                    <div>
                                        <div className="mx-auto w-16 h-16 mb-4 text-dark-textSecondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-dark-textSecondary mb-2">Seret & letakkan gambar di sini atau</p>
                                        <label className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg transition-colors cursor-pointer inline-block">
                                            Pilih Gambar
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/jpeg,image/png,application/pdf"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        <p className="text-dark-textSecondary text-sm mt-2">PNG, JPG, atau PDF (Max 5MB)</p>
                                    </div>
                                ) : (
                                    <div>
                                        {isUploading ? (
                                            <div className="py-4">
                                                <p className="text-dark-text mb-2">Mengupload file...</p>
                                                <div className="w-full bg-dark-border/30 rounded-full h-2.5 mb-2">
                                                    <div
                                                        className="bg-primary h-2.5 rounded-full transition-all duration-300"
                                                        style={{ width: `${uploadProgress}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-dark-textSecondary text-sm">{uploadProgress}%</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                {uploadedFileUrl && uploadedFile.type.startsWith('image/') ? (
                                                    <div className="relative w-32 h-32 mb-3">
                                                        <div className="absolute inset-0 bg-cover bg-center rounded" style={{ backgroundImage: `url(${uploadedFileUrl})` }}></div>
                                                    </div>
                                                ) : (
                                                    <div className="w-16 h-16 mb-3 text-primary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <p className="text-dark-text font-medium mb-1">{uploadedFile.name}</p>
                                                <p className="text-dark-textSecondary text-sm mb-3">
                                                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                                <div className="flex space-x-2">
                                                    <label className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded transition-colors cursor-pointer text-sm">
                                                        Ganti
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/jpeg,image/png,application/pdf"
                                                            onChange={handleFileChange}
                                                        />
                                                    </label>
                                                    <button
                                                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3 py-1 rounded transition-colors text-sm"
                                                        onClick={() => {
                                                            setUploadedFile(null);
                                                            setUploadedFileUrl(null);
                                                        }}
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Catatan (opsional) */}
                        <div className="mb-6">
                            <label className="block text-dark-text font-medium mb-2">Catatan (opsional)</label>
                            <textarea 
                                className="w-full bg-dark-bg border border-dark-border/50 rounded-lg p-3 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/50"
                                rows={3}
                                placeholder="Tambahkan catatan untuk admin jika diperlukan"
                                value={confirmationNote}
                                onChange={(e) => setConfirmationNote(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Transfer verification info */}
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mb-6">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <p className="text-dark-textSecondary text-sm">
                                    <span className="text-primary font-medium">Penting:</span> Pastikan bukti transfer Anda menunjukkan informasi penting seperti tanggal transaksi, nomor rekening tujuan, jumlah transfer, dan status transaksi berhasil. Hal ini akan mempercepat proses verifikasi pembayaran Anda.
                                </p>
                            </div>
                        </div>

                        {/* Terms checkbox */}
                        <div className="mb-6">
                            <label className="flex items-start cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="mt-1 mr-3"
                                />
                                <span className="text-dark-textSecondary text-sm">
                                    Saya menyatakan bahwa informasi dan bukti pembayaran yang saya kirimkan adalah benar dan sah. Saya memahami bahwa pengerjaan pesanan akan dimulai setelah pembayaran terverifikasi.
                                </span>
                            </label>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                className={`bg-primary hover:bg-primary-dark text-dark-text font-medium py-3 px-6 rounded-lg transition-colors flex-1 flex items-center justify-center ${isSubmitting || !uploadedFile ? 'opacity-70 cursor-not-allowed' : ''}`}
                                onClick={handleSubmitConfirmation}
                                disabled={isSubmitting || !uploadedFile}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Kirim Konfirmasi
                                    </>
                                )}
                            </button>
                            <button
                                className="bg-dark-bg hover:bg-dark-border/50 text-dark-textSecondary font-medium py-3 px-6 rounded-lg transition-colors"
                                onClick={() => setShowConfirmation(false)}
                                disabled={isSubmitting}
                            >
                                Batalkan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-secondary py-6 border-t border-dark-border mt-auto">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-dark-textSecondary text-sm mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()} suruhsuruh.id. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="/kebijakan-privasi" className="text-dark-textSecondary hover:text-primary text-sm">
                                Kebijakan Privasi
                            </Link>
                            <Link href="/syarat-ketentuan" className="text-dark-textSecondary hover:text-primary text-sm">
                                Syarat & Ketentuan
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CheckoutSuccessPage;