// src/components/payments/PaymentSummary.tsx
import React from 'react';

interface PaymentSummaryProps {
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
}

export default function PaymentSummary({
                                           totalAmount,
                                           paidAmount,
                                           remainingAmount
                                       }: PaymentSummaryProps) {
    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-dark-bg border border-dark-border/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-dark-text mb-4">Payment Summary</h3>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-dark-textSecondary">Total Order Value</span>
                    <span className="font-medium text-dark-text">{formatCurrency(totalAmount)}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-dark-textSecondary">Paid Amount (Down Payment)</span>
                    <span className="font-medium text-green-400">{formatCurrency(paidAmount)}</span>
                </div>

                <div className="border-t border-dark-border my-2 pt-2">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-dark-text">Amount to Pay</span>
                        <span className="text-lg font-bold text-primary">{formatCurrency(remainingAmount)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-dark-card/50 rounded-lg p-3 border border-dark-border/50">
                <div className="flex items-start">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary mr-2 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <div className="text-xs text-dark-textSecondary">
                        <p className="mb-1">This payment will complete your order. After successful payment, the worker will finalize and deliver your completed order.</p>
                        <p>All payments are secure and protected by our buyer protection policy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}