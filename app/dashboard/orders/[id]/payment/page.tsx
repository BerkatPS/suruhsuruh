// src/app/dashboard/orders/[id]/payment/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import PaymentMethod from '@/components/payments/PaymentMethod';
import PaymentSummary from '@/components/payments/PaymentSummary';

export default function OrderPaymentPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params?.id as string;

    const [selectedMethod, setSelectedMethod] = useState<string>('bank_transfer');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStep, setPaymentStep] = useState<'select_method' | 'confirm' | 'success'>('select_method');

    // Mock order data - in a real application, you would fetch this based on the orderId
    const order = {
        id: orderId || 'ORD-2023-1234',
        title: 'Skripsi S1 - Manajemen',
        status: 'pending_payment',
        payment: {
            total: 3000000,
            downPayment: {
                amount: 1200000,
                status: 'paid',
                date: '2023-11-05',
            },
            finalPayment: {
                amount: 1800000,
                status: 'pending',
                dueDate: '2023-12-15',
            }
        }
    };

    // Payment methods
    const paymentMethods = [
        {
            id: 'bank_transfer',
            name: 'Bank Transfer',
            description: 'Manual transfer to our bank account',
            processingTime: 'Manual verification (1-24 hours)',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
            ),
        },
        {
            id: 'virtual_account',
            name: 'Virtual Account',
            description: 'Automatic verification via virtual account',
            processingTime: 'Automatic verification (instant)',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            id: 'e_wallet',
            name: 'E-Wallet',
            description: 'Pay using OVO, GoPay, DANA, or LinkAja',
            processingTime: 'Automatic verification (instant)',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
        },
        {
            id: 'credit_card',
            name: 'Credit/Debit Card',
            description: 'Pay using Visa, Mastercard, or JCB',
            processingTime: 'Automatic verification (instant)',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            ),
        },
    ];

    // Handle payment method selection
    const handleMethodSelect = (methodId: string) => {
        setSelectedMethod(methodId);
    };

    // Handle continue to confirmation
    const handleContinue = () => {
        setPaymentStep('confirm');
    };

    // Handle payment processing
    const handleProcessPayment = () => {
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setPaymentStep('success');
        }, 2000);
    };

    // Handle back to order page
    const handleBackToOrder = () => {
        router.push(`/dashboard/orders/${orderId}`);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back button and title */}
            <div className="flex items-center mb-6">
                <Link
                    href={`/dashboard/orders/${orderId}`}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Order
                </Link>
            </div>

            {/* Payment steps progress indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            paymentStep === 'select_method'
                                ? 'bg-primary text-white'
                                : 'bg-green-500 text-white'
                        }`}>
                            {paymentStep === 'select_method' ? (
                                <span>1</span>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <span className="mt-2 text-sm font-medium">Payment Method</span>
                    </div>

                    <div className={`h-1 flex-1 mx-4 ${
                        paymentStep === 'select_method' ? 'bg-gray-300' : 'bg-green-500'
                    }`} />

                    <div className="flex flex-col items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            paymentStep === 'confirm'
                                ? 'bg-primary text-white'
                                : paymentStep === 'success'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-300 text-gray-600'
                        }`}>
                            {paymentStep === 'success' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <span>2</span>
                            )}
                        </div>
                        <span className="mt-2 text-sm font-medium">Confirmation</span>
                    </div>

                    <div className={`h-1 flex-1 mx-4 ${
                        paymentStep === 'success' ? 'bg-green-500' : 'bg-gray-300'
                    }`} />

                    <div className="flex flex-col items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            paymentStep === 'success'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-300 text-gray-600'
                        }`}>
                            {paymentStep === 'success' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <span>3</span>
                            )}
                        </div>
                        <span className="mt-2 text-sm font-medium">Success</span>
                    </div>
                </div>
            </div>

            {/* Page content based on current step */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {paymentStep === 'select_method' && (
                    <div>
                        <div className="px-6 py-4 border-b">
                            <h1 className="text-xl font-bold text-gray-900">Select Payment Method</h1>
                            <p className="text-gray-600">Choose how you want to pay for your order</p>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-4">
                                {paymentMethods.map((method) => (
                                    <PaymentMethod
                                        key={method.id}
                                        method={method}
                                        isSelected={selectedMethod === method.id}
                                        onSelect={handleMethodSelect}
                                    />
                                ))}
                            </div>

                            <div className="mt-8 flex justify-between">
                                <Link
                                    href={`/dashboard/orders/${orderId}`}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    onClick={handleContinue}
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {paymentStep === 'confirm' && (
                    <div>
                        <div className="px-6 py-4 border-b">
                            <h1 className="text-xl font-bold text-gray-900">Confirm Payment</h1>
                            <p className="text-gray-600">Review and confirm your payment details</p>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-2">Order Details</h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Order ID:</span>
                                        <span className="font-medium">{order.id}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Order Title:</span>
                                        <span className="font-medium">{order.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Payment Type:</span>
                                        <span className="font-medium">Final Payment</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-2">Payment Method</h2>
                                <div className="bg-gray-50 p-4 rounded-lg flex items-center">
                                    {paymentMethods.find(m => m.id === selectedMethod)?.icon}
                                    <div className="ml-4">
                                        <p className="font-medium">{paymentMethods.find(m => m.id === selectedMethod)?.name}</p>
                                        <p className="text-sm text-gray-600">{paymentMethods.find(m => m.id === selectedMethod)?.description}</p>
                                    </div>
                                </div>
                            </div>

                            <PaymentSummary
                                totalAmount={order.payment.total}
                                paidAmount={order.payment.downPayment.amount}
                                remainingAmount={order.payment.finalPayment.amount}
                            />

                            {selectedMethod === 'bank_transfer' && (
                                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-medium text-blue-800 mb-2">Bank Transfer Instructions</h3>
                                    <p className="text-sm text-blue-800 mb-4">Please transfer the exact amount to the following account:</p>
                                    <div className="bg-white rounded-lg p-3 mb-4">
                                        <p className="text-sm"><span className="font-medium">Bank:</span> BCA (Bank Central Asia)</p>
                                        <p className="text-sm"><span className="font-medium">Account Number:</span> 1234567890</p>
                                        <p className="text-sm"><span className="font-medium">Account Name:</span> PT SuruhSuruh Indonesia</p>
                                    </div>
                                    <div className="text-sm text-blue-800">
                                        <p>• Include your Order ID ({order.id}) in the transfer description</p>
                                        <p>• Upload your transfer receipt for faster verification</p>
                                        <p>• Payment will be verified within 24 hours</p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex justify-between">
                                <button
                                    onClick={() => setPaymentStep('select_method')}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleProcessPayment}
                                    disabled={isProcessing}
                                    className={`px-6 py-2 rounded-lg ${
                                        isProcessing
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : 'bg-primary text-white hover:bg-primary-dark'
                                    }`}
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </div>
                                    ) : (
                                        'Confirm Payment'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {paymentStep === 'success' && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
                        <p className="text-gray-600 mb-6">
                            Thank you for your payment. Your order has been updated.
                            {selectedMethod === 'bank_transfer' && ' We will verify your payment shortly.'}
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4 max-w-sm mx-auto mb-8">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Order ID:</span>
                                <span className="font-medium">{order.id}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Amount Paid:</span>
                                <span className="font-medium">Rp {order.payment.finalPayment.amount.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Status:</span>
                                <span className="text-green-600 font-medium">
                  {selectedMethod === 'bank_transfer' ? 'Pending Verification' : 'Success'}
                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleBackToOrder}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                        >
                            Back to Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}