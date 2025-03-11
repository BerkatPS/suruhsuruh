"use client";

import {useState, ChangeEvent, FormEvent, JSX} from 'react';
import { useRouter } from 'next/navigation';
import {
    FileText,
    Laptop,
    ChevronRight,
    BookOpen,
    Smartphone,
    Tv,
    Headphones,
    Printer,
    Calendar,
    Upload,
    X,
    Clock,
    AlertCircle,
    HelpCircle,
    CheckCircle
} from 'lucide-react';

// Interface Definitions
interface ServiceOption {
    id: string;
    name: string;
    icon: JSX.Element;
}

interface SelectOption {
    value: string;
    label: string;
}

interface OrderDetails {
    title: string;
    description: string;
    educationLevel: string;
    subject: string;
    deviceType: string;
    deviceBrand: string;
    deviceModel: string;
    issueType: string;
    deadline: string;
    urgency: string;
    budget: string;
    additionalNotes: string;
    attachments: File[];
    termsAccepted: boolean;
}

interface Errors {
    title?: string;
    description?: string;
    educationLevel?: string;
    subject?: string;
    deviceType?: string;
    deviceBrand?: string;
    deviceModel?: string;
    issueType?: string;
    deadline?: string;
    budget?: string;
    termsAccepted?: string;
    submit?: string;
}

export default function CreateOrderPage(): JSX.Element {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [category, setCategory] = useState<string>('');
    const [serviceType, setServiceType] = useState<string>('');
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({
        title: '',
        description: '',
        educationLevel: '',
        subject: '',
        deviceType: '',
        deviceBrand: '',
        deviceModel: '',
        issueType: '',
        deadline: '',
        urgency: 'normal',
        budget: '',
        additionalNotes: '',
        attachments: [],
        termsAccepted: false
    });
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleCategorySelect = (selectedCategory: string): void => {
        setCategory(selectedCategory);
        setStep(2);
    };

    const handleServiceSelect = (selectedService: string): void => {
        setServiceType(selectedService);
        setStep(3);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setOrderDetails({
            ...orderDetails,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAttachmentChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setOrderDetails({
                ...orderDetails,
                attachments: [...orderDetails.attachments, ...files]
            });
        }
    };

    const removeAttachment = (index: number): void => {
        const updatedAttachments = [...orderDetails.attachments];
        updatedAttachments.splice(index, 1);
        setOrderDetails({
            ...orderDetails,
            attachments: updatedAttachments
        });
    };

    const validateForm = (): boolean => {
        const newErrors: Errors = {};

        // Common validations
        if (!orderDetails.title.trim()) newErrors.title = 'Judul pesanan wajib diisi';
        if (!orderDetails.description.trim()) newErrors.description = 'Deskripsi permasalahan wajib diisi';
        if (!orderDetails.deadline) newErrors.deadline = 'Deadline wajib diisi';

        // Category-specific validations
        if (category === 'academic') {
            if (!orderDetails.educationLevel) newErrors.educationLevel = 'Jenjang pendidikan wajib dipilih';
            if (!orderDetails.subject.trim()) newErrors.subject = 'Mata pelajaran/kuliah wajib diisi';
        } else if (category === 'electronic') {
            if (!orderDetails.deviceType) newErrors.deviceType = 'Jenis perangkat wajib dipilih';
            if (!orderDetails.deviceBrand.trim()) newErrors.deviceBrand = 'Merek perangkat wajib diisi';
            if (!orderDetails.issueType.trim()) newErrors.issueType = 'Jenis masalah wajib diisi';
        }

        // Budget validation
        if (!orderDetails.budget.trim()) {
            newErrors.budget = 'Budget wajib diisi';
        } else if (isNaN(parseFloat(orderDetails.budget)) || parseFloat(orderDetails.budget) <= 0) {
            newErrors.budget = 'Budget harus berupa angka positif';
        }

        // Terms validation
        if (!orderDetails.termsAccepted) {
            newErrors.termsAccepted = 'Anda harus menyetujui syarat dan ketentuan';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) {
            // Scroll to first error
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        setIsSubmitting(true);

        try {
            // For demo purposes, we'll simulate an API request with a timeout
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In a real app, you would send the data to your backend
            // const response = await fetch('/api/orders', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         category,
            //         serviceType,
            //         ...orderDetails
            //     })
            // });

            // if (!response.ok) throw new Error('Failed to create order');

            // Redirect to success page or order details page
            router.push('/dashboard/orders/confirmation');
        } catch (error) {
            console.error('Error creating order:', error);
            // Handle submission errors
            setErrors({
                ...errors,
                submit: 'Terjadi kesalahan saat membuat pesanan. Silakan coba lagi.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const goBack = (): void => {
        if (step > 1) {
            setStep(step - 1);
            if (step === 3) setServiceType('');
            if (step === 2) setCategory('');
        }
    };

    // Academic service options
    const academicServices: ServiceOption[] = [
        { id: 'thesis', name: 'Skripsi / Tugas Akhir', icon: <FileText className="h-8 w-8" /> },
        { id: 'paper', name: 'Makalah / Essay', icon: <BookOpen className="h-8 w-8" /> },
        { id: 'programming', name: 'Tugas Pemrograman', icon: <Laptop className="h-8 w-8" /> },
        { id: 'presentation', name: 'Presentasi', icon: <FileText className="h-8 w-8" /> },
        { id: 'report', name: 'Laporan Praktikum', icon: <FileText className="h-8 w-8" /> },
        { id: 'other-academic', name: 'Lainnya', icon: <HelpCircle className="h-8 w-8" /> }
    ];

    // Electronic service options
    const electronicServices: ServiceOption[] = [
        { id: 'smartphone', name: 'Smartphone & Tablet', icon: <Smartphone className="h-8 w-8" /> },
        { id: 'laptop', name: 'Laptop & Komputer', icon: <Laptop className="h-8 w-8" /> },
        { id: 'tv', name: 'TV & Audio', icon: <Tv className="h-8 w-8" /> },
        { id: 'headphone', name: 'Headphone & Earphone', icon: <Headphones className="h-8 w-8" /> },
        { id: 'printer', name: 'Printer & Scanner', icon: <Printer className="h-8 w-8" /> },
        { id: 'other-electronic', name: 'Perangkat Lainnya', icon: <HelpCircle className="h-8 w-8" /> }
    ];

    // Education levels
    const educationLevels: SelectOption[] = [
        { value: 'sma', label: 'SMA/SMK' },
        { value: 'd3', label: 'D3' },
        { value: 's1', label: 'S1' },
        { value: 's2', label: 'S2' },
        { value: 's3', label: 'S3' }
    ];

    // Device types for electronics
    const deviceTypes: SelectOption[] = [
        { value: 'smartphone', label: 'Smartphone' },
        { value: 'tablet', label: 'Tablet' },
        { value: 'laptop', label: 'Laptop' },
        { value: 'desktop', label: 'Desktop PC' },
        { value: 'tv', label: 'TV' },
        { value: 'audio', label: 'Audio System' },
        { value: 'printer', label: 'Printer' },
        { value: 'other', label: 'Lainnya' }
    ];

    // Urgency options
    const urgencyOptions: SelectOption[] = [
        { value: 'low', label: 'Rendah (1-2 minggu)' },
        { value: 'normal', label: 'Normal (3-7 hari)' },
        { value: 'high', label: 'Tinggi (1-2 hari)' },
        { value: 'urgent', label: 'Urgent (24 jam)' }
    ];

    return (
        <div className="min-h-screen bg-dark-bg text-dark-text pb-16">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Buat Pesanan Baru</h1>
                    <p className="text-dark-textSecondary mt-2">
                        Isi formulir di bawah untuk membuat pesanan baru. Tim kami akan menghubungi Anda sesegera mungkin.
                    </p>
                </div>

                {/* Order Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-dark-text' : 'bg-dark-card text-dark-textSecondary'}`}>
                                1
                            </div>
                            <div className={`h-1 w-12 sm:w-20 ${step >= 2 ? 'bg-primary' : 'bg-dark-border'}`}></div>
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-dark-text' : 'bg-dark-card text-dark-textSecondary'}`}>
                                2
                            </div>
                            <div className={`h-1 w-12 sm:w-20 ${step >= 3 ? 'bg-primary' : 'bg-dark-border'}`}></div>
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-dark-text' : 'bg-dark-card text-dark-textSecondary'}`}>
                                3
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-sm font-medium">
                                {step === 1 && 'Pilih Kategori'}
                                {step === 2 && 'Pilih Layanan'}
                                {step === 3 && 'Detail Pesanan'}
                            </div>
                            <div className="text-xs text-dark-textSecondary">
                                {step === 1 && 'Akademik atau Elektronik'}
                                {step === 2 && 'Jenis layanan spesifik'}
                                {step === 3 && 'Informasi dan kebutuhan pesanan'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 1: Category Selection */}
                {step === 1 && (
                    <div className="bg-dark-card p-6 rounded-xl shadow-md border border-dark-border">
                        <h2 className="text-xl font-semibold mb-4">Pilih Kategori Layanan</h2>
                        <p className="text-dark-textSecondary mb-6">
                            Kami menyediakan dua kategori layanan utama. Pilih sesuai kebutuhan Anda.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Academic Services Card */}
                            <div
                                className="border border-dark-border rounded-lg p-6 hover:border-primary cursor-pointer transition-all hover:shadow-lg"
                                onClick={() => handleCategorySelect('academic')}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="bg-blue-900/30 text-blue-400 p-3 rounded-full">
                                            <FileText className="h-8 w-8" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-medium text-lg">Jasa Akademik</h3>
                                            <p className="text-dark-textSecondary text-sm">Skripsi, makalah, tugas, dll.</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-dark-textSecondary" />
                                </div>
                            </div>

                            {/* Electronic Services Card */}
                            <div
                                className="border border-dark-border rounded-lg p-6 hover:border-primary cursor-pointer transition-all hover:shadow-lg"
                                onClick={() => handleCategorySelect('electronic')}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="bg-green-900/30 text-green-400 p-3 rounded-full">
                                            <Laptop className="h-8 w-8" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-medium text-lg">Jasa Elektronik</h3>
                                            <p className="text-dark-textSecondary text-sm">Perbaikan gadget, instalasi, dll.</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-dark-textSecondary" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Service Selection */}
                {step === 2 && (
                    <div className="bg-dark-card p-6 rounded-xl shadow-md border border-dark-border">
                        <div className="flex items-center mb-6">
                            <button
                                onClick={goBack}
                                className="text-dark-textSecondary hover:text-dark-text mr-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <h2 className="text-xl font-semibold">
                                Pilih Jenis Layanan {category === 'academic' ? 'Akademik' : 'Elektronik'}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(category === 'academic' ? academicServices : electronicServices).map((service) => (
                                <div
                                    key={service.id}
                                    className="border border-dark-border rounded-lg p-4 hover:border-primary cursor-pointer transition-all hover:shadow-lg"
                                    onClick={() => handleServiceSelect(service.id)}
                                >
                                    <div className="bg-dark-bg/50 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-3 mx-auto">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-center font-medium">{service.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Order Details Form */}
                {step === 3 && (
                    <div className="bg-dark-card p-6 rounded-xl shadow-md border border-dark-border">
                        <div className="flex items-center mb-6">
                            <button
                                onClick={goBack}
                                className="text-dark-textSecondary hover:text-dark-text mr-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <h2 className="text-xl font-semibold">Detail Pesanan</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Common Fields */}
                            <div className="mb-6">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium">
                                    Judul Pesanan
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={orderDetails.title}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 rounded-lg bg-dark-bg border ${errors.title ? 'border-red-500' : 'border-dark-border'} focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors`}
                                    placeholder={category === 'academic' ? "Contoh: Skripsi Manajemen Bisnis" : "Contoh: Perbaikan Layar iPhone 12"}
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1 error-message">{errors.title}</p>}
                            </div>

                            {/* Category-specific fields */}
                            {category === 'academic' && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="educationLevel" className="block mb-2 text-sm font-medium">
                                                Jenjang Pendidikan
                                            </label>
                                            <select
                                                id="educationLevel"
                                                name="educationLevel"
                                                value={orderDetails.educationLevel}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-lg bg-dark-bg border ${errors.educationLevel ? 'border-red-500' : 'border-dark-border'} focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors`}
                                            >
                                                <option value="">Pilih Jenjang Pendidikan</option>
                                                {educationLevels.map(level => (
                                                    <option key={level.value} value={level.value}>{level.label}</option>
                                                ))}
                                            </select>
                                            {errors.educationLevel && <p className="text-red-500 text-sm mt-1 error-message">{errors.educationLevel}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                                                Mata Pelajaran/Kuliah
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={orderDetails.subject}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-lg bg-dark-bg border ${errors.subject ? 'border-red-500' : 'border-dark-border'} focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors`}
                                                placeholder="Contoh: Manajemen Pemasaran"
                                            />
                                            {errors.subject && <p className="text-red-500 text-sm mt-1 error-message">{errors.subject}</p>}
                                        </div>
                                    </div>
                                </>
                            )}

                            {category === 'electronic' && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="deviceType" className="block mb-2 text-sm font-medium">
                                                Jenis Perangkat
                                            </label>
                                            <select
                                                id="deviceType"
                                                name="deviceType"
                                                value={orderDetails.deviceType}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-lg bg-dark-bg border ${errors.deviceType ? 'border-red-500' : 'border-dark-border'} focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors`}
                                            >
                                                <option value="">Pilih Jenis Perangkat</option>
                                                {deviceTypes.map(device => (
                                                    <option key={device.value} value={device.value}>{device.label}</option>
                                                ))}
                                            </select>
                                            {errors.deviceType && <p className="text-red-500 text-sm mt-1 error-message">{errors.deviceType}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="deviceBrand" className="block mb-2 text-sm font-medium">
                                                Merek Perangkat
                                            </label>
                                            <input
                                                type="text"
                                                id="deviceBrand"
                                                name="deviceBrand"
                                                value={orderDetails.deviceBrand}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-lg bg-dark-bg border ${errors.deviceBrand ? 'border-red-500' : 'border-dark-border'} focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors`}
                                                placeholder="Contoh: Samsung, Apple, Asus"
                                            />
                                            {errors.deviceBrand && <p className="text-red-500 text-sm mt-1 error-message">{errors.deviceBrand}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="deviceModel" className="block mb-2 text-sm font-medium">
                                            Model Perangkat (Opsional)
                                        </label>
                                        <input
                                            type="text"
                                            id="deviceModel"
                                            name="deviceModel"
                                            value={orderDetails.deviceModel}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-lg bg-dark-bg border border-dark-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                                            placeholder="Contoh: iPhone 12 Pro, ROG Strix G15"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="issueType" className="block mb-2 text-sm font-medium">
                                            Jenis Masalah
                                        </label>
                                        <input
                                            type="text"
                                            id="issueType"
                                            name="issueType"
                                            value={orderDetails.issueType}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-lg bg-dark-bg border ${errors.issueType ? 'border-red-500' : 'border-dark-border'} focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors`}
                                            placeholder="Contoh: Layar retak, Baterai cepat habis"
                                        />
                                        {errors.issueType && <p className="text-red-500 text-sm mt-1 error-message">{errors.issueType}</p>}
                                    </div>
                                </>
                            )}

                            <div className="mb-6">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium">
                                    Deskripsi Permasalahan
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={orderDetails.description}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className={`w-full px-4 py-3 rounded-lg bg-dark-bg border ${errors.description ? 'border-red-500' : 'border-dark-border'} focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors`}
                                    placeholder="Jelaskan detail permasalahan atau tugas yang perlu dikerjakan"
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm mt-1 error-message">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="deadline" className="block mb-2 text-sm font-medium">
                                        Deadline
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Calendar className="h-5 w-5 text-dark-textSecondary" />
                                        </div>
                                        <input
                                            type="date"
                                            id="deadline"
                                            name="deadline"
                                            value={orderDetails.deadline}
                                            onChange={handleInputChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className={`w-full pl-10 pr-4 py-3 rounded-lg bg-dark-bg border ${errors.deadline ? 'border-red-500' : 'border-dark-border'} focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors`}
                                        />
                                    </div>
                                    {errors.deadline && <p className="text-red-500 text-sm mt-1 error-message">{errors.deadline}</p>}
                                </div>
                                <div>
                                    <label htmlFor="urgency" className="block mb-2 text-sm font-medium">
                                        Tingkat Urgensi
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Clock className="h-5 w-5 text-dark-textSecondary" />
                                        </div>
                                        <select
                                            id="urgency"
                                            name="urgency"
                                            value={orderDetails.urgency}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-dark-bg border border-dark-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                                        >
                                            {urgencyOptions.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="budget" className="block mb-2 text-sm font-medium">
                                    Budget (Rp)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <span className="text-dark-textSecondary font-medium">Rp</span>
                                    </div>
                                    <input
                                        type="text"
                                        id="budget"
                                        name="budget"
                                        value={orderDetails.budget}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg bg-dark-bg border ${errors.budget ? 'border-red-500' : 'border-dark-border'} focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors`}
                                        placeholder="Masukkan budget Anda (dapat dinegosiasikan)"
                                    />
                                </div>
                                {errors.budget && <p className="text-red-500 text-sm mt-1 error-message">{errors.budget}</p>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="additionalNotes" className="block mb-2 text-sm font-medium">
                                    Catatan Tambahan (Opsional)
                                </label>
                                <textarea
                                    id="additionalNotes"
                                    name="additionalNotes"
                                    value={orderDetails.additionalNotes}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-lg bg-dark-bg border border-dark-border focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                                    placeholder="Informasi tambahan yang perlu diketahui oleh worker"
                                ></textarea>
                            </div>

                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-medium">
                                    Lampiran (Opsional)
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="attachment" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-dark-border hover:border-primary bg-dark-bg transition-colors">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="h-8 w-8 text-dark-textSecondary mb-2" />
                                            <p className="mb-2 text-sm text-dark-textSecondary">
                                                <span className="font-medium">Klik untuk upload</span> atau drag & drop
                                            </p>
                                            <p className="text-xs text-dark-textSecondary">PDF, DOC, JPG, PNG (Max 5MB/file)</p>
                                        </div>
                                        <input
                                            id="attachment"
                                            type="file"
                                            multiple
                                            className="hidden"
                                            onChange={handleAttachmentChange}
                                        />
                                    </label>
                                </div>

                                {/* File Attachment List */}
                                {orderDetails.attachments.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm font-medium mb-2">File terlampir:</p>
                                        <div className="space-y-2">
                                            {orderDetails.attachments.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-2 bg-dark-bg border border-dark-border rounded-lg"
                                                >
                                                    <div className="flex items-center">
                                                        <FileText className="h-5 w-5 text-dark-textSecondary mr-2" />
                                                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAttachment(index)}
                                                        className="p-1 rounded-full hover:bg-dark-bg/70 text-dark-textSecondary"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-8">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="termsAccepted"
                                            name="termsAccepted"
                                            type="checkbox"
                                            checked={orderDetails.termsAccepted}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 bg-dark-bg border-dark-border rounded focus:ring-2 focus:ring-primary accent-primary"
                                        />
                                    </div>
                                    <label htmlFor="termsAccepted" className="ml-2 text-sm text-dark-textSecondary">
                                        Saya menyetujui <a href="#" className="text-primary hover:underline">syarat dan ketentuan</a> layanan suruhsuruh.id
                                    </label>
                                </div>
                                {errors.termsAccepted && (
                                    <p className="text-red-500 text-sm mt-1 error-message">{errors.termsAccepted}</p>
                                )}
                            </div>

                            {/* Error message */}
                            {errors.submit && (
                                <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-center">
                                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                    <p className="text-red-500 text-sm">{errors.submit}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={goBack}
                                    className="px-6 py-3 border border-dark-border rounded-lg text-dark-text font-medium hover:bg-dark-bg/70 transition-colors"
                                >
                                    Kembali
                                </button>
                                <button
                                    type="submit"
                                    // onClick={router.push('/dashboard/checkout?service=skripsi&package=premium')}
                                    className="px-8 py-3 bg-primary text-dark-text rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            Buat Pesanan
                                            <ChevronRight className="h-5 w-5 ml-1" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Order Info Card */}
                {step === 3 && (
                    <div className="mt-6 bg-dark-card p-6 rounded-xl shadow-md border border-dark-border">
                        <div className="flex items-center mb-4">
                            <InfoCard className="h-5 w-5 text-primary mr-2" />
                            <h3 className="font-medium">Alur Proses Pesanan</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center mr-3">
                                    1
                                </div>
                                <div>
                                    <h4 className="font-medium">Pemesanan & Negosiasi</h4>
                                    <p className="text-sm text-dark-textSecondary">
                                        Kami akan meninjau pesanan Anda dan menghubungi untuk negosiasi harga jika diperlukan.
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center mr-3">
                                    2
                                </div>
                                <div>
                                    <h4 className="font-medium">Pembayaran DP</h4>
                                    <p className="text-sm text-dark-textSecondary">
                                        Lakukan pembayaran DP (50%) untuk memulai pengerjaan pesanan.
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center mr-3">
                                    3
                                </div>
                                <div>
                                    <h4 className="font-medium">Proses Pengerjaan</h4>
                                    <p className="text-sm text-dark-textSecondary">
                                        Worker akan mengerjakan pesanan Anda dan memberikan update progres secara berkala.
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center mr-3">
                                    4
                                </div>
                                <div>
                                    <h4 className="font-medium">Revisi & Penyerahan</h4>
                                    <p className="text-sm text-dark-textSecondary">
                                        Periksa hasil pekerjaan, ajukan revisi jika diperlukan, dan lakukan pelunasan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Info Card Icon component
function InfoCard(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    );
}