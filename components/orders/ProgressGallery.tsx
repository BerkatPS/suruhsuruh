// src/components/orders/ProgressGallery.tsx
import { useState } from 'react';
import {
    FileText,
    FileCode,
    FileImage,
    FileSpreadsheet,
    File,
    Download,
    X
} from 'lucide-react';

interface ProgressGalleryProps {
    progressUpdates: Array<{
        id: number;
        date: string;
        title: string;
        description: string;
        attachments?: Array<{
            name: string;
            url: string;
            type?: string;
            size?: string;
        }>;
        images?: Array<{
            url: string;
            alt: string;
        }>;
    }>;
}

export default function ProgressGallery({ progressUpdates }: ProgressGalleryProps) {
    const [activeImage, setActiveImage] = useState<string | null>(null);

    // Format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Get file icon based on extension
    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase();

        switch(extension) {
            case 'pdf':
                return <FileText className="h-5 w-5 text-red-400" />;
            case 'doc':
            case 'docx':
                return <FileText className="h-5 w-5 text-blue-400" />;
            case 'xls':
            case 'xlsx':
                return <FileSpreadsheet className="h-5 w-5 text-green-400" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <FileImage className="h-5 w-5 text-purple-400" />;
            case 'js':
            case 'ts':
            case 'html':
            case 'css':
            case 'py':
            case 'java':
                return <FileCode className="h-5 w-5 text-yellow-400" />;
            default:
                return <File className="h-5 w-5 text-gray-400" />;
        }
    };

    // Open image in lightbox
    const openLightbox = (imageUrl: string) => {
        setActiveImage(imageUrl);
    };

    // Close lightbox
    const closeLightbox = () => {
        setActiveImage(null);
    };

    return (
        <div className="space-y-8">
            {progressUpdates.map((update) => (
                <div key={update.id} className="bg-dark-card border border-dark-border/30 rounded-lg overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-dark-border">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                            <h3 className="font-medium text-dark-text">{update.title}</h3>
                            <span className="text-sm text-dark-textSecondary">{formatDate(update.date)}</span>
                        </div>
                        <p className="mt-2 text-dark-textSecondary">{update.description}</p>
                    </div>

                    {/* Attachments */}
                    {update.attachments && update.attachments.length > 0 && (
                        <div className="px-4 py-3 border-b border-dark-border bg-dark-bg/30">
                            <h4 className="text-sm font-medium text-dark-text mb-2">Attachments</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {update.attachments.map((attachment, index) => (
                                    <a
                                        key={index}
                                        href={attachment.url}
                                        className="flex items-center p-2 rounded-lg bg-dark-bg hover:bg-dark-bg/80 border border-dark-border/50 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {getFileIcon(attachment.name)}
                                        <div className="ml-3 flex-1 min-w-0">
                                            <p className="text-sm font-medium text-dark-text truncate">{attachment.name}</p>
                                            {attachment.size && (
                                                <p className="text-xs text-dark-textSecondary">{attachment.size}</p>
                                            )}
                                        </div>
                                        <Download className="h-4 w-4 text-dark-textSecondary hover:text-primary" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Image Gallery */}
                    {update.images && update.images.length > 0 && (
                        <div className="p-4">
                            <h4 className="text-sm font-medium text-dark-text mb-2">Progress Images</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                {update.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square bg-dark-bg overflow-hidden rounded-lg border border-dark-border/50 cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => openLightbox(image.url)}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center text-dark-textSecondary">
                                            <FileImage className="h-6 w-6" />
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Lightbox */}
            {activeImage && (
                <div
                    className="fixed inset-0 z-50 bg-dark-bg/90 flex items-center justify-center p-4"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-4 right-4 bg-dark-card p-2 rounded-full text-dark-textSecondary hover:text-dark-text"
                        onClick={closeLightbox}
                    >
                        <X className="h-6 w-6" />
                    </button>

                </div>
            )}
        </div>
    );
}