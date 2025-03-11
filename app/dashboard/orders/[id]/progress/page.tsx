// src/app/dashboard/orders/[id]/progress/page.tsx
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import ProgressGallery from '@/components/orders/ProgressGallery';

export default function OrderProgressPage() {
    const params = useParams();
    const orderId = params?.id as string;

    // Mock progress data
    const progressUpdates = [
        {
            id: 1,
            date: '2023-11-10',
            title: 'Draft Proposal',
            description: 'First draft of the proposal covering the introduction, problem statement, and research objectives.',
            attachments: [
                { name: 'proposal-draft-v1.pdf', url: '#', type: 'pdf', size: '1.2 MB' },
                { name: 'outline.docx', url: '#', type: 'docx', size: '320 KB' },
            ],
            images: [
                { url: '/images/progress/proposal-1.jpg', alt: 'Proposal Page 1' },
                { url: '/images/progress/proposal-2.jpg', alt: 'Proposal Page 2' },
            ]
        },
        {
            id: 2,
            date: '2023-11-20',
            title: 'Revised Proposal',
            description: 'Revised proposal with updates to the introduction and literature review based on your feedback.',
            attachments: [
                { name: 'proposal-draft-v2.pdf', url: '#', type: 'pdf', size: '1.4 MB' },
            ],
            images: [
                { url: '/images/progress/proposal-revised-1.jpg', alt: 'Revised Proposal Page 1' },
                { url: '/images/progress/proposal-revised-2.jpg', alt: 'Revised Proposal Page 2' },
            ]
        },
        {
            id: 3,
            date: '2023-11-29',
            title: 'Research Methodology',
            description: 'Draft of Chapter 3 - Research Methodology, including research design, data collection methods, and analysis techniques.',
            attachments: [
                { name: 'chapter-3-draft.pdf', url: '#', type: 'pdf', size: '1.8 MB' },
                { name: 'methodology-notes.docx', url: '#', type: 'docx', size: '450 KB' },
            ],
            images: [
                { url: '/images/progress/methodology-1.jpg', alt: 'Methodology Page 1' },
                { url: '/images/progress/methodology-2.jpg', alt: 'Methodology Page 2' },
                { url: '/images/progress/methodology-3.jpg', alt: 'Methodology Page 3' },
            ]
        }
    ];

    // In a real app, you would fetch progress updates from an API

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

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h1 className="text-xl font-bold text-gray-900">Progress Updates</h1>
                    <p className="text-gray-600">Track the progress of your order</p>
                </div>

                <div className="p-6">
                    <ProgressGallery progressUpdates={progressUpdates} />
                </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-medium text-blue-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Progress Information
                </h3>
                <div className="mt-2 text-sm text-blue-800">
                    <p>• Workers update progress regularly to keep you informed about the status of your order.</p>
                    <p>• You can provide feedback on the progress by chatting with the worker.</p>
                    <p>• If you have any questions about the progress, please contact the worker directly.</p>
                </div>
            </div>
        </div>
    );
}