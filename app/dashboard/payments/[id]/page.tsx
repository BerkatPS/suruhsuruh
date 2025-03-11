// // src/app/dashboard/payments/[id]/page.tsx
// "use client";
//
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import {
//     ArrowLeft,
//     Download,
//     CheckCircle,
//     Clock,
//     XCircle,
//     CreditCard,
//     Calendar,
//     FileText,
//     ExternalLink
// } from 'lucide-react';
//
// // Mock payment data
// const mockPaymentDetails = {
//     'PAY-001': {
//         id: 'PAY-001',
//         orderId: 'ORD-123456',
//         orderTitle: 'Pengerjaan Skripsi - Manajemen Bisnis',
//         amount: 1250000,
//         status: 'completed',
//         method: 'bank_transfer',
//         bankName: 'Bank Central Asia (BCA)',
//         accountNumber: '********1234',
//         date: '2025-02-10T14:30:00',
//         confirmedDate: '2025-02-10T14:45:00',
//         type: 'down_payment',
//         description: 'Down payment for thesis writing service',
//         invoiceNumber: 'INV-20250210-001',
//         transactionId: 'TRX12345678',
//         customer: {
//             name: 'Ananda Putra',
//             email: 'ananda@example.com'
//         }
//     },
//     'PAY-003': {
//         id: 'PAY-003',
//         orderId: 'ORD-123458',
//         orderTitle: 'Pembuatan Presentasi Seminar',
//         amount: 225000,
//         status: 'pending',
//         method: 'virtual_account',
//         bankName: 'Bank Mandiri',
//         virtualAccount: '8800123456789',
//         expiryDate: '2025-03-07T23:59:59',
//         date: '2025-03-06T11:45:00',
//         type: 'down_payment',
//         description: 'Down payment for presentation design service',
//         invoiceNumber: 'INV-20250306-003',
//         customer: {
//             name: 'Ananda Putra',
//             email: 'ananda@example.com'
//         }
//     },
//     'PAY-004': {
//         id: 'PAY-004',
//         orderId: 'ORD-123459',
//         orderTitle: 'Perbaikan Smartphone Samsung S21',
//         amount: 350000,
//         status: 'failed',
//         method: 'credit_card',
//         cardDetails: '********1234 (Visa)',
//         date: '2025-03-05T16:20:00',
//         type: 'full_payment',
//         description: 'Full payment for smartphone repair service',
//         invoiceNumber: 'INV-20250305-004',
//         failureReason: 'Insufficient funds or credit limit exceeded',
//         customer: {
//             name: 'Ananda Putra',
//             email: 'ananda@example.com'
//         }
//     }
// };
//
// export default function PaymentDetailsPage({ params }: { params: { id: string } }) {
//     const [paymentDetails, setPaymentDetails] = useState<any>(null);
//     const [isLoading, setIsLoading] = useState(true);
//
//     useEffect(() => {
//         // Simulate loading data
//         const timer = setTimeout(() => {
//             const details = mockPaymentDetails[params.id as keyof typeof mockPaymentDetails];
//             setPaymentDetails(details || null);
//             setIsLoading(false);
//         }, 1000);
//
//         return () => clearTimeout(timer);
//     }, [params.id]);
//
//     // Format currency
//     const formatCurrency = (amount: number) => {
//         return new Intl.NumberFormat('id-ID', {
//             style: 'currency',
//             currency: 'IDR',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0
//         }).format(amount);
//     };
//
//     // Format date
//     const formatDate = (dateString: string, includeTime: boolean = false) => {
//         const date = new Date(dateString);
//         if (includeTime) {
//             return date.toLocaleDateString('id-ID', {
//                 day: 'numeric',
//                 month: 'long',
//                 year: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//             });
//         }
//         return date.toLocaleDateString('id-ID', {
//             day: 'numeric',
//             month: 'long',
//             year: 'numeric'
//         });
//     };
//
//     // Get status badge
//     const getStatusBadge = (status: string) => {
//         switch (status) {
//             case 'completed':
//                 return (
//                     <div className="flex items-center text-green-400 bg-green-900/20 px-3 py-1.5 rounded-full">
//                         <CheckCircle className="h-5 w-5 mr-2" />
//                         <span className="font-medium">Payment Completed</span>
//                     </div>
//                 );
//             case 'pending':
//                 return (
//                     <div className="flex items-center text-amber-400 bg-amber-900/20 px-3 py-1.5 rounded-full">
//                         <Clock className="h-5 w-5 mr-2" />
//                         <span className="font-medium">Payment Pending</span>
//                     </div>
//                 );
//             case 'failed':
//                 return (
//                     <div className="flex items-center text-red-400 bg-red-900/20 px-3 py-1.5 rounded-full">
//                         <XCircle className="h-5 w-5 mr-2" />
//                         <span className="font-medium">Payment Failed</span>
//                     </div>
//                 );
//             default:
//                 return (
//                     <div className="flex items-center text-gray-400 bg-gray-900/20 px-3 py-1.5 rounded-full">
//                         <span className="font-medium">{status}</span>
//                     </div>
//                 );
//         }
//     };
//
//     // Get payment method info
//     const getPaymentMethod = (payment: any) => {
//         if (payment.method === 'bank_transfer') {
//             return (
//                 <div>
//                     <p className="text-dark-text">{payment.bankName}</p>
//                     <p className="text-dark-textSecondary">Account: {payment.accountNumber}</p>
//                 </div>
//             );
//         } else if (payment.method === 'virtual_account') {
//             return (
//                 <div>
//                     <p className="text-dark-text">{payment.bankName}</p>
//                     <p className="text-dark-textSecondary">Virtual Account: {payment.virtualAccount}</p>
//                 </div>
//             );
//         } else if (payment.method === 'credit_card') {
//             return (
//                 <div>
//                     <p className="text-dark-text">Credit Card</p>
//                     <p className="text-dark-textSecondary">{payment.cardDetails}</p>
//                 </div>
//             );
//         } else if (payment.method === 'e_wallet') {
//             return (
//                 <div>
//                     <p className="text-dark-text">E-Wallet</p>
//                     <p className="text-dark-textSecondary">E-Wallet Payment</p>
//                 </div>
//             );
//         }
//         return (
//             <div>
//                 <p className="text-dark-text">Unknown Method</p>
//             </div>
//         );
//     };
//
//     // Get payment type label
//     const getPaymentTypeLabel = (type: string) => {
//         switch (type) {
//             case 'down_payment':
//                 return 'Down Payment';
//             case 'final_payment':
//                 return 'Final Payment';
//             case 'full_payment':
//                 return 'Full Payment';
//             default:
//                 return type;
//         }
//     };
//
//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }
//
//     if (!paymentDetails) {
//         return (
//             <div className="max-w-4xl mx-auto">
//                 <div className="mb-6">
//                     <Link href="/dashboard/payments" className="flex items-center text-dark-textSecondary hover:text-dark-text">
//                         <ArrowLeft className="h-4 w-4 mr-2" />
//                         Back to payments
//                     </Link>
//                 </div>
//
//                 <div className="bg-dark-card rounded-lg p-12 border border-dark-border">
//                     <div className="flex flex-col items-center justify-center">
//                         <XCircle className="h-16 w-16 text-red-400 mb-4" />
//                         <h2 className="text-xl font-semibold mb-2">Payment not found</h2>
//                         <p className="text-dark-textSecondary mb-6">The payment details you're looking for do not exist or you don't have permission to view them.</p>
//                         <Link
//                             href="/dashboard/payments"
//                             className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
//                         >
//                             View all payments
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="max-w-4xl mx-auto">
//             <div className="mb-6">
//                 <Link href="/dashboard/payments" className="flex items-center text-dark-textSecondary hover:text-dark-text">
//                     <ArrowLeft className="h-4 w-4 mr-2" />
//                     Back to payments
//                 </Link>
//             </div>
//
//             <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
//                 {/* Header */}
//                 <div className="p-6 border-b border-dark-border">
//                     <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//                         <div>
//                             <h1 className="text-2xl font-bold text-dark-text">{paymentDetails.invoiceNumber}</h1>
//                             <p className="text-dark-textSecondary mt-1">
//                                 Transaction ID: {paymentDetails.transactionId || paymentDetails.id}
//                             </p>
//                         </div>
//                         {getStatusBadge(paymentDetails.status)}
//                     </div>
//                 </div>
//
//                 {/* Payment Information */}
//                 <div className="p-6 border-b border-dark-border">
//                     <h2 className="text-lg font-semibold mb-4 text-dark-text">Payment Information</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <div className="mb-4">
//                                 <p className="text-dark-textSecondary mb-1">Amount</p>
//                                 <p className="text-2xl font-bold text-dark-text">{formatCurrency(paymentDetails.amount)}</p>
//                             </div>
//
//                             <div className="mb-4">
//                                 <p className="text-dark-textSecondary mb-1">Payment Method</p>
//                                 <div className="flex items-center">
//                                     <CreditCard className="h-5 w-5 text-dark-textSecondary mr-2" />
//                                     {getPaymentMethod(paymentDetails)}
//                                 </div>
//                             </div>
//
//                             <div className="mb-4">
//                                 <p className="text-dark-textSecondary mb-1">Payment Type</p>
//                                 <p className="text-dark-text">{getPaymentTypeLabel(paymentDetails.type)}</p>
//                             </div>
//                         </div>
//
//                         <div>
//                             <div className="mb-4">
//                                 <p className="text-dark-textSecondary mb-1">
//                                     {paymentDetails.status === 'completed' ? 'Paid On' :
//                                         paymentDetails.status === 'pending' ? 'Created On' : 'Failed On'}
//                                 </p>
//                                 <div className="flex items-center">
//                                     <Calendar className="h-5 w-5 text-dark-textSecondary mr-2" />
//                                     <p className="text-dark-text">{formatDate(paymentDetails.date, true)}</p>
//                                 </div>
//                             </div>
//
//                             {paymentDetails.status === 'completed' && paymentDetails.confirmedDate && (
//                                 <div className="mb-4">
//                                     <p className="text-dark-textSecondary mb-1">Confirmed On</p>
//                                     <p className="text-dark-text">{formatDate(paymentDetails.confirmedDate, true)}</p>
//                                 </div>
//                             )}
//
//                             {paymentDetails.status === 'pending' && paymentDetails.expiryDate && (
//                                 <div className="mb-4">
//                                     <p className="text-dark-textSecondary mb-1">Pay Before</p>
//                                     <p className="text-dark-text">{formatDate(paymentDetails.expiryDate, true)}</p>
//                                 </div>
//                             )}
//
//                             {paymentDetails.status === 'failed' && paymentDetails.failureReason && (
//                                 <div className="mb-4">
//                                     <p className="text-dark-textSecondary mb-1">Failure Reason</p>
//                                     <p className="text-dark-text">{paymentDetails.failureReason}</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Order Information */}
//                 <div className="p-6 border-b border-dark-border">
//                     <h2 className="text-lg font-semibold mb-4 text-dark-text">Order Information</h2>
//                     <div className="bg-dark-bg p-4 rounded-lg border border-dark-border/50 mb-4">
//                         <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
//                             <div>
//                                 <p className="text-dark-textSecondary text-sm">{paymentDetails.orderId}</p>
//                                 <p className="text-dark-text font-medium">{paymentDetails.orderTitle}</p>
//                             </div>
//                             <Link
//                                 href={`/dashboard/orders/${paymentDetails.orderId}`}
//                                 className="flex items-center text-primary hover:text-primary-dark"
//                             >
//                                 View Order
//                                 <ExternalLink className="h-4 w-4 ml-1" />
//                             </Link>
//                         </div>
//                     </div>
//
//                     <div className="mb-4">
//                         <p className="text-dark-textSecondary mb-1">Payment Description</p>
//                         <p className="text-dark-text">{paymentDetails.description}</p>
//                     </div>
//                 </div>
//
//                 {/* Actions */}
//                 <div className="p-6 flex flex-wrap gap-3 justify-end">
//                     {paymentDetails.status === 'pending' && (
//                         <Link
//                             href={`/dashboard/orders/${paymentDetails.orderId}/payment`}
//                             className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
//                         >
//                             Complete Payment
//                         </Link>
//                     )}
//
//                     {paymentDetails.status === 'completed' && (
//                         <button className="flex items-center bg-dark-bg text-dark-text border border-dark-border px-4 py-2 rounded-lg hover:bg-dark-border/30 transition-colors">
//                             <Download className="h-4 w-4 mr-2" />
//                             Download Receipt
//                         </button>
//                     )}
//
//                     <Link
//                         href="/dashboard/payments"
//                         className="text-dark-textSecondary hover:text-dark-text border border-dark-border px-4 py-2 rounded-lg hover:bg-dark-bg transition-colors"
//                     >
//                         Back to Payments
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }