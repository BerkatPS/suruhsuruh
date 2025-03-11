// src/components/payments/PaymentMethod.tsx
import React from 'react';

interface PaymentMethodProps {
    method: {
        id: string;
        name: string;
        description: string;
        processingTime: string;
        icon: React.ReactNode;
    };
    isSelected: boolean;
    onSelect: (methodId: string) => void;
}

export default function PaymentMethod({ method, isSelected, onSelect }: PaymentMethodProps) {
    return (
        <div
            onClick={() => onSelect(method.id)}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
        >
            <div className="flex items-start">
                <div className="flex-shrink-0">{method.icon}</div>
                <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{method.name}</h3>
                        <div className="flex items-center">
                            <div className={`h-5 w-5 rounded-full border ${
                                isSelected
                                    ? 'border-primary'
                                    : 'border-gray-300'
                            }`}>
                                {isSelected && (
                                    <div className="h-full w-full rounded-full bg-primary flex items-center justify-center">
                                        <div className="h-2 w-2 rounded-full bg-white"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{method.description}</p>
                    <p className="mt-1 text-xs text-gray-500">Processing: {method.processingTime}</p>
                </div>
            </div>
        </div>
    );
}