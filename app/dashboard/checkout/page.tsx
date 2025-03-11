'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Types for our checkout data
interface CheckoutItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: 'academic' | 'electronic';
    description: string;
}

interface PaymentMethod {
    id: string;
    name: string;
    accountNumber?: string;
    accountName?: string;
    logo: string;
}

const CheckoutPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const serviceId = searchParams?.get('service');
    const packageId = searchParams?.get('package');

    // State for checkout data
    const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string>('');
    const [promoCode, setPromoCode] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);
    const [notes, setNotes] = useState<string>('');
    const [processingPayment, setProcessingPayment] = useState(false);
    const [agreeDp, setAgreeDp] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    // Mock payment methods
    const paymentMethods: PaymentMethod[] = [
        {
            id: 'bca',
            name: 'BCA Transfer',
            accountNumber: '1234567890',
            accountName: 'PT Suruhsuruh Indonesia',
            logo: '/images/payments/bca.png'
        },
        {
            id: 'mandiri',
            name: 'Mandiri Transfer',
            accountNumber: '2345678901',
            accountName: 'PT Suruhsuruh Indonesia',
            logo: '/images/payments/mandiri.png'
        },
        {
            id: 'gopay',
            name: 'GoPay',
            logo: '/images/payments/gopay.png'
        },
        {
            id: 'ovo',
            name: 'OVO',
            logo: '/images/payments/ovo.png'
        },
        {
            id: 'dana',
            name: 'DANA',
            logo: '/images/payments/dana.png'
        },
    ];

    // Mock checkout data - in a real app, this would come from your API
    useEffect(() => {
        // Simulate API call to get service and package details
        setTimeout(() => {
            if (serviceId && packageId) {
                // Mock data based on the service and package IDs
                setCheckoutItem({
                    id: `${serviceId}-${packageId}`,
                    name: serviceId === 'skripsi'
                        ? 'Pengerjaan Skripsi & Tugas Akhir - Paket Premium'
                        : 'Perbaikan Smartphone - Paket Service',
                    price: serviceId === 'skripsi' ? 3500000 : 300000,
                    quantity: 1,
                    category: serviceId === 'skripsi' ? 'academic' : 'electronic',
                    description: serviceId === 'skripsi'
                        ? 'Penulisan skripsi lengkap dengan revisi tanpa batas dan bimbingan via WhatsApp'
                        : 'Diagnosa dan perbaikan smartphone, termasuk penggantian komponen (biaya terpisah)'
                });
                setLoading(false);
            } else {
                setError('Informasi layanan tidak lengkap');
                setLoading(false);
            }
        }, 1000);
    }, [serviceId, packageId]);

    // Function to apply promo code
    const applyPromoCode = () => {
        // Mock promo code logic
        if (promoCode.toLowerCase() === 'diskon10') {
            if (checkoutItem) {
                setDiscount(Math.round(checkoutItem.price * 0.1));
            }
        } else {
            // Show error for invalid promo
            setError('Kode promo tidak valid');
            setTimeout(() => setError(null), 3000);
        }
    };

    // Function to handle checkout
    const handleCheckout = () => {
        if (!selectedPayment) {
            setError('Silakan pilih metode pembayaran');
            setTimeout(() => setError(null), 3000);
            return;
        }

        if (!agreeDp || !agreeTerms) {
            setError('Anda harus menyetujui semua ketentuan untuk melanjutkan');
            setTimeout(() => setError(null), 3000);
            return;
        }

        setProcessingPayment(true);

        // Simulate payment processing
        setTimeout(() => {
            router.push('/dashboard/checkout/success?order=ORD' + Math.floor(Math.random() * 1000000));
        }, 2000);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-dark-bg flex items-center justify-center">
                <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (error && !checkoutItem) {
        return (
            <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4">
                <div className="text-red-500 text-xl mb-4">{error}</div>
                <Link href="/" className="bg-primary hover:bg-primary-dark text-dark-text px-6 py-3 rounded-lg transition-colors">
                    Kembali ke Beranda
                </Link>
            </div>
        );
    }

    // Calculate total
    const subtotal = checkoutItem ? checkoutItem.price : 0;
    const dpAmount = Math.round(subtotal * 0.5); // 50% down payment
    const total = subtotal - discount;

    return (
        <div className="min-h-screen bg-dark-bg">
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
                className="container-custom py-8 md:py-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-dark-text mb-2">Checkout</h1>
                    <p className="text-dark-textSecondary">Selesaikan pembayaran Anda untuk melanjutkan</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <motion.div
                        className="lg:col-span-2 space-y-6"
                        variants={itemVariants}
                    >
                        <div className="bg-dark-card rounded-xl p-6 border border-dark-border/30 shadow-card">
                            <h2 className="text-xl font-semibold text-dark-text mb-4">Ringkasan Pesanan</h2>

                            {checkoutItem && (
                                <div className="border-b border-dark-border/30 pb-4 mb-4">
                                    <div className="flex flex-col md:flex-row items-start gap-4">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                                                {checkoutItem.category === 'academic' ? (
                                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                ) : (
                                                    <path d="M13 2v10.06A5.94 5.94 0 0 0 12 12a6 6 0 1 0 6 6V8h4V2h-9zm-1 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                                                )}
                                            </svg>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-dark-text">{checkoutItem.name}</h3>
                                            <p className="text-dark-textSecondary text-sm mb-2">{checkoutItem.description}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-primary font-semibold">Rp {checkoutItem.price.toLocaleString('id-ID')}</span>
                                                <span className="text-dark-textSecondary text-sm">Qty: {checkoutItem.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <div className="flex justify-between text-dark-textSecondary">
                                    <span>Subtotal</span>
                                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-500">
                                        <span>Diskon</span>
                                        <span>-Rp {discount.toLocaleString('id-ID')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between pt-2 border-t border-dark-border/30 text-dark-text font-semibold">
                                    <span>Total</span>
                                    <span>Rp {total.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-primary font-medium pt-2 border-t border-dark-border/30">
                                    <span>Down Payment (50%)</span>
                                    <span>Rp {dpAmount.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="bg-dark-card rounded-xl p-6 border border-dark-border/30 shadow-card">
                            <h2 className="text-xl font-semibold text-dark-text mb-4">Kode Promo</h2>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    placeholder="Masukkan kode promo"
                                    className="bg-dark-bg border border-dark-border/50 rounded-lg px-4 py-2 text-dark-text w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <button
                                    onClick={applyPromoCode}
                                    className="bg-primary hover:bg-primary-dark text-dark-text px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                                >
                                    Terapkan
                                </button>
                            </div>
                            <p className="text-dark-textSecondary text-sm mt-2">Kode promo contoh: DISKON10</p>
                        </div>

                        {/* Additional Notes */}
                        <div className="bg-dark-card rounded-xl p-6 border border-dark-border/30 shadow-card">
                            <h2 className="text-xl font-semibold text-dark-text mb-4">Catatan Tambahan</h2>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Tambahkan catatan atau instruksi khusus untuk pesanan Anda"
                                className="bg-dark-bg border border-dark-border/50 rounded-lg p-4 text-dark-text w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                    </motion.div>

                    {/* Payment Methods */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <div className="bg-dark-card rounded-xl p-6 border border-dark-border/30 shadow-card">
                            <h2 className="text-xl font-semibold text-dark-text mb-4">Metode Pembayaran</h2>

                            <div className="space-y-3">
                                {paymentMethods.map(method => (
                                    <div
                                        key={method.id}
                                        onClick={() => setSelectedPayment(method.id)}
                                        className={`border ${selectedPayment === method.id ? 'border-primary' : 'border-dark-border/30'} 
                      rounded-lg p-4 cursor-pointer transition-all hover:border-primary/70 
                      ${selectedPayment === method.id ? 'bg-primary/5' : 'bg-dark-bg'}`}
                                    >
                                        <div className="flex items-center">
                                            <div className="w-6 h-6 rounded-full border flex-shrink-0 border-dark-border/50 flex items-center justify-center mr-3">
                                                {selectedPayment === method.id && (
                                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                                )}
                                            </div>
                                            <div className="flex items-center flex-grow">
                                                <span className="font-medium text-dark-text">{method.name}</span>
                                                <div className="ml-auto w-8 h-8 bg-white rounded flex items-center justify-center">
                                                    {/* Placeholder for payment logo */}
                                                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {selectedPayment === method.id && method.accountNumber && (
                                            <div className="mt-3 p-3 bg-dark-bg rounded-lg">
                                                <p className="text-dark-textSecondary text-sm">No. Rekening:</p>
                                                <p className="text-dark-text font-mono font-semibold">{method.accountNumber}</p>
                                                <p className="text-dark-textSecondary text-sm mt-1">Atas Nama:</p>
                                                <p className="text-dark-text">{method.accountName}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="bg-dark-card rounded-xl p-6 border border-dark-border/30 shadow-card">
                            <h2 className="text-xl font-semibold text-dark-text mb-4">Syarat & Ketentuan</h2>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        id="dp-agreement"
                                        checked={agreeDp}
                                        onChange={() => setAgreeDp(!agreeDp)}
                                        className="mt-1 mr-3"
                                    />
                                    <label htmlFor="dp-agreement" className="text-dark-textSecondary text-sm">
                                        Saya setuju untuk membayar Down Payment (DP) sebesar 50% dari total biaya. Sisa pembayaran akan dilunasi setelah pekerjaan selesai.
                                    </label>
                                </div>

                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        id="terms-agreement"
                                        checked={agreeTerms}
                                        onChange={() => setAgreeTerms(!agreeTerms)}
                                        className="mt-1 mr-3"
                                    />
                                    <label htmlFor="terms-agreement" className="text-dark-textSecondary text-sm">
                                        Saya telah membaca dan menyetujui <Link href="/syarat-ketentuan" className="text-primary hover:underline">Syarat & Ketentuan</Link> serta <Link href="/kebijakan-privasi" className="text-primary hover:underline">Kebijakan Privasi</Link> yang berlaku.
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            disabled={processingPayment}
                            className={`w-full bg-primary hover:bg-primary-dark text-dark-text font-semibold py-4 rounded-xl transition-colors 
                ${processingPayment ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {processingPayment ? (
                                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses Pembayaran...
                </span>
                            ) : (
                                'Bayar Sekarang'
                            )}
                        </button>

                        <p className="text-center text-dark-textSecondary text-sm">
                            Butuh bantuan? <Link href="/kontak" className="text-primary hover:underline">Hubungi Kami</Link>
                        </p>
                    </motion.div>
                </div>
            </motion.main>

            {/* Footer */}
            <footer className="bg-secondary py-6 border-t border-dark-border">
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

export default CheckoutPage;