// src/app/worker-portal/jobs/[id]/progress/page.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Camera,
    Check,
    ClipboardList,
    Clock,
    FileText,
    Image as ImageIcon,
    Link,
    Loader2,
    MoreVertical,
    PlusCircle,
    Send,
    Trash2,
    Upload,
    X,
    Phone
} from 'lucide-react';
import WorkerLayout from '@/components/layout/WorkerLayout';

// Define interfaces
interface ProgressHistoryItem {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    images: string[];
}

interface JobDetail {
    id: string;
    title: string;
    customer: string;
    deadline: string;
    progress: number;
    category: string;
    progressHistory: ProgressHistoryItem[];
}

interface UploadedImage {
    id: string;
    name: string;
    size: string;
    url: string;
    file: File;
}

const ProgressUploadPage: React.FC = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [progressPercentage, setProgressPercentage] = useState<number>(70); // Nilai default dari pekerjaan
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');

    // Data dummy untuk halaman progress upload
    const jobDetail: JobDetail = {
        id: 'JOB-2023-11-005',
        title: 'Perbaikan Monitor Samsung',
        customer: 'Budi Santoso',
        deadline: '2025-03-10',
        progress: 70,
        category: 'elektronik',
        progressHistory: [
            {
                id: 'prog-001',
                title: 'Penerimaan Barang',
                description: 'Monitor telah diterima dan dilakukan pemeriksaan awal. Konfirmasi gejala flickering layar dan mati mendadak.',
                date: '2025-03-02',
                time: '14:30',
                images: ['https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200', 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200']
            },
            {
                id: 'prog-002',
                title: 'Diagnosis Masalah',
                description: 'Pembongkaran monitor dan diagnosis. Ditemukan kerusakan pada power supply unit - kapasitor yang mengembung dan beberapa solder yang lemah.',
                date: '2025-03-04',
                time: '10:15',
                images: ['https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200', 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200', 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200']
            },
            {
                id: 'prog-003',
                title: 'Penggantian Komponen',
                description: 'Penggantian kapasitor yang rusak dan perbaikan solder pada power supply unit. Testing awal menunjukkan flickering sudah berkurang.',
                date: '2025-03-06',
                time: '16:45',
                images: ['https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200']
            }
        ]
    };

    // Contoh upload gambar
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files || e.target.files.length === 0) return;

        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setIsUploading(true);

        // Simulasi upload progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    // Tambahkan gambar baru ke array
                    const newImages: UploadedImage[] = files.map(file => ({
                        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                        name: file.name,
                        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                        url: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/300/200', // Gunakan placeholder untuk demo
                        file
                    }));

                    setImages([...images, ...newImages]);
                    setIsUploading(false);
                    setUploadProgress(0);
                }, 500);
            }
        }, 300);
    };

    const removeImage = (id: string): void => {
        setImages(images.filter(img => img.id !== id));
    };

    const handlePreview = (url: string): void => {
        setPreviewImage(url);
        setShowPreview(true);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Simulasi submit progress
        alert(`Progress berhasil diupdate: ${title} (${progressPercentage}%)`);

        // Dalam implementasi sebenarnya, kirim data ke API
        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('description', description);
        // formData.append('progressPercentage', progressPercentage.toString());
        // images.forEach(img => formData.append('images', img.file));
        // await fetch('/api/progress', { method: 'POST', body: formData });

        // Reset form dan navigasi kembali
        // router.push(`/worker-portal/jobs/${jobDetail.id}`);
    };

    const handleBack = (): void => {
        router.back();
    };

    return (
        <WorkerLayout>
            {/* Main Content */}
            <div className="min-h-screen bg-dark-bg text-dark-text">
                {/* Header */}
                <header className="bg-lightGray sticky top-0 z-10 border-b border-dark-border p-4">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="text-dark-textSecondary hover:text-white transition-colors"
                                aria-label="Kembali"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-lg font-display font-bold">Update Progress</h1>
                                <p className="text-dark-textSecondary text-sm">{jobDetail.title}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto p-4 md:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column (2/3) - Form Upload */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="title" className="block font-medium mb-2">
                                                Judul Update
                                            </label>
                                            <input
                                                id="title"
                                                type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="contoh: Penggantian Komponen"
                                                className="bg-lightGray border border-dark-border rounded-lg px-4 py-3 w-full focus:border-primary outline-none"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block font-medium mb-2">
                                                Deskripsi Update
                                            </label>
                                            <textarea
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Jelaskan secara detail apa yang telah dikerjakan, komponen yang diganti/diperbaiki, atau progress yang sudah dicapai."
                                                className="bg-lightGray border border-dark-border rounded-lg px-4 py-3 w-full focus:border-primary outline-none resize-none h-32"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label htmlFor="progressPercentage" className="block font-medium">
                                                    Progress Pekerjaan
                                                </label>
                                                <span className="text-primary font-bold">{progressPercentage}%</span>
                                            </div>
                                            <input
                                                id="progressPercentage"
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="5"
                                                value={progressPercentage}
                                                onChange={(e) => setProgressPercentage(parseInt(e.target.value))}
                                                className="w-full h-2 bg-dark-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                                            />
                                            <div className="flex justify-between text-xs text-dark-textSecondary mt-1">
                                                <span>0%</span>
                                                <span>25%</span>
                                                <span>50%</span>
                                                <span>75%</span>
                                                <span>100%</span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label className="block font-medium">
                                                    Unggah Foto/Gambar
                                                </label>
                                                <span className="text-dark-textSecondary text-sm">
                          {images.length} Gambar
                        </span>
                                            </div>

                                            <div className="border-2 border-dashed border-dark-border rounded-lg p-6 text-center">
                                                {isUploading ? (
                                                    <div className="space-y-3">
                                                        <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
                                                        <p className="text-dark-textSecondary">Mengunggah gambar...</p>
                                                        <div className="w-full bg-dark-border rounded-full h-2.5">
                                                            <div
                                                                className="bg-primary h-2.5 rounded-full"
                                                                style={{ width: `${uploadProgress}%` }}
                                                            ></div>
                                                        </div>
                                                        <p className="text-sm text-dark-textSecondary">{uploadProgress}%</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        <div className="bg-dark-border rounded-full h-14 w-14 flex items-center justify-center mx-auto">
                                                            <Upload className="h-6 w-6 text-dark-textSecondary" />
                                                        </div>
                                                        <p className="text-dark-text">Unggah foto atau gambar progress</p>
                                                        <p className="text-dark-textSecondary text-sm">
                                                            Seret gambar ke sini atau klik untuk pilih file
                                                        </p>
                                                        <button
                                                            type="button"
                                                            onClick={() => document.getElementById('fileInput')?.click()}
                                                            className="inline-flex items-center gap-2 bg-dark-bg border border-dark-border text-dark-textSecondary hover:text-primary hover:border-primary px-4 py-2 rounded-lg transition-colors text-sm"
                                                        >
                                                            <ImageIcon className="h-4 w-4" />
                                                            <span>Pilih File</span>
                                                        </button>
                                                        <input
                                                            id="fileInput"
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            onChange={handleImageUpload}
                                                            className="hidden"
                                                        />
                                                        <p className="text-dark-textSecondary text-xs">
                                                            Format: JPG, PNG, HEIC. Ukuran max: 10MB per file
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {images.length > 0 && (
                                            <div className="space-y-3">
                                                <h4 className="font-medium">Preview Gambar</h4>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {images.map(img => (
                                                        <div key={img.id} className="relative bg-lightGray border border-dark-border rounded-lg overflow-hidden group">
                                                            <img
                                                                src={img.url}
                                                                alt={img.name}
                                                                className="w-full h-32 object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handlePreview(img.url)}
                                                                    className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
                                                                    aria-label="Preview gambar"
                                                                >
                                                                    <ImageIcon className="h-4 w-4 text-white" />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeImage(img.id)}
                                                                    className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
                                                                    aria-label="Hapus gambar"
                                                                >
                                                                    <Trash2 className="h-4 w-4 text-white" />
                                                                </button>
                                                            </div>
                                                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1">
                                                                <p className="text-white text-xs truncate">
                                                                    {img.name}
                                                                </p>
                                                                <p className="text-gray-300 text-xs">
                                                                    {img.size}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div
                                                        className="border-2 border-dashed border-dark-border rounded-lg flex flex-col items-center justify-center h-32 cursor-pointer hover:border-primary transition-colors"
                                                        onClick={() => document.getElementById('fileInput')?.click()}
                                                    >
                                                        <PlusCircle className="h-8 w-8 text-dark-textSecondary mb-2" />
                                                        <span className="text-dark-textSecondary text-sm">Tambah Gambar</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="pt-4 border-t border-dark-border flex justify-end gap-3">
                                            <button
                                                type="button"
                                                onClick={handleBack}
                                                className="bg-dark-bg border border-dark-border hover:border-red-500 text-dark-textSecondary hover:text-red-500 px-4 py-2.5 rounded-lg transition-colors"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg transition-colors shadow-button flex items-center gap-2"
                                            >
                                                <Send className="h-4 w-4" />
                                                <span>Kirim Update</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right Column (1/3) - Progress History */}
                        <div className="space-y-6">
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-display font-bold text-lg">Riwayat Progress</h3>
                                    <div className="flex items-center gap-1 text-dark-textSecondary text-sm">
                                        <Clock className="h-4 w-4" />
                                        <span>Terakhir: {jobDetail.progressHistory[0].date}</span>
                                    </div>
                                </div>

                                <div className="relative">
                                    {/* Timeline line */}
                                    <div className="absolute left-3 top-1 bottom-0 w-px bg-dark-border"></div>

                                    <div className="space-y-5">
                                        {jobDetail.progressHistory.map((item, index) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className={`h-6 w-6 rounded-full flex-shrink-0 z-10 ${
                                                    index === 0 ? 'bg-primary' : 'bg-dark-border'
                                                }`}></div>

                                                <div className="flex-1 pb-5">
                                                    <div className="flex justify-between">
                                                        <h4 className="font-medium">{item.title}</h4>
                                                        <span className="text-dark-textSecondary text-sm">
                              {item.time}
                            </span>
                                                    </div>
                                                    <p className="text-dark-textSecondary text-sm mt-1">
                                                        {item.description.length > 80
                                                            ? `${item.description.substring(0, 80)}...`
                                                            : item.description}
                                                    </p>
                                                    <p className="text-dark-textSecondary text-xs mt-2">
                                                        {item.date}
                                                    </p>

                                                    {item.images && item.images.length > 0 && (
                                                        <div className="flex mt-3 gap-2">
                                                            {item.images.slice(0, 2).map((img, idx) => (
                                                                <div key={idx} className="w-16 h-16 bg-lightGray rounded-md overflow-hidden border border-dark-border">
                                                                    <img
                                                                        src={img}
                                                                        alt={`Progress ${idx+1}`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            ))}
                                                            {item.images.length > 2 && (
                                                                <div className="w-16 h-16 bg-lightGray/50 rounded-md flex items-center justify-center border border-dark-border">
                                  <span className="text-dark-textSecondary text-xs">
                                    +{item.images.length - 2}
                                  </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <h3 className="font-display font-bold text-lg mb-4">Tips Update Progress</h3>

                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-dark-textSecondary">
                                            Berikan judul yang jelas menggambarkan tahap pengerjaan
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-dark-textSecondary">
                                            Sertakan detail komponen yang diganti/diperbaiki
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-dark-textSecondary">
                                            Tambahkan foto sebelum dan sesudah untuk perbandingan jelas
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-dark-textSecondary">
                                            Jelaskan tantangan yang dihadapi dan cara mengatasinya
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-dark-textSecondary">
                                            Perbarui persentase progress dengan realistis
                                        </p>
                                    </li>
                                </ul>

                                <div className="mt-4 pt-4 border-t border-dark-border">
                                    <button className="w-full bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
                                        <FileText className="h-4 w-4" />
                                        <span>Lihat Panduan Lengkap</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Image Preview Modal */}
                {showPreview && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <div className="relative max-w-3xl w-full mx-4">
                            <button
                                onClick={() => setShowPreview(false)}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                                aria-label="Tutup preview"
                            >
                                <X className="h-8 w-8" />
                            </button>

                            <div className="bg-dark-card rounded-lg overflow-hidden border border-dark-border">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full max-h-[80vh] object-contain"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </WorkerLayout>
    );
};

export default ProgressUploadPage;