import { useState } from 'react';
import { ContactFormData } from '@/types';

interface Step3ContactProps {
    onSubmit: (data: ContactFormData) => void;
    onBack: () => void;
    isSkipped?: boolean; // Parameter baru untuk mengetahui apakah langkah sebelumnya dilewati
}

const Step3Contact: React.FC<Step3ContactProps> = ({ onSubmit, onBack, isSkipped = false }) => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        whatsapp: '',
        preferredContact: 'whatsapp',
        termsAccepted: false,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when field is edited
        if (errors[name as keyof ContactFormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));

        // Clear error when field is edited
        if (errors[name as keyof ContactFormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const validateWhatsapp = (whatsapp: string): boolean => {
        // Validate Indonesian phone number
        const regex = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/;
        return regex.test(whatsapp);
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

        if (!formData.name) {
            newErrors.name = 'Nama lengkap harus diisi';
        }

        if (!formData.email) {
            newErrors.email = 'Email harus diisi';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!formData.whatsapp) {
            newErrors.whatsapp = 'Nomor WhatsApp harus diisi';
        } else if (!validateWhatsapp(formData.whatsapp)) {
            newErrors.whatsapp = 'Format nomor WhatsApp tidak valid';
        }

        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'Anda harus menyetujui syarat dan ketentuan';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2 text-center text-dark-text">Informasi Kontak</h2>
            <p className="text-dark-textSecondary text-center mb-8">
                {isSkipped
                    ? "Berikan informasi kontak Anda agar tim kami dapat menghubungi Anda untuk mendiskusikan kebutuhan Anda secara detail."
                    : "Berikan informasi kontak Anda agar kami dapat menghubungi Anda."
                }
            </p>

            {isSkipped && (
                <div className="bg-primary/10 rounded-lg p-4 mb-6 border border-primary/30">
                    <p className="text-dark-text text-sm">
                        <span className="font-medium text-primary">Catatan:</span> Anda telah melewati langkah detail layanan. Tim kami akan menghubungi Anda untuk mendiskusikan kebutuhan spesifik Anda setelah formulir ini disubmit.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="form-label">
                        Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Masukkan nama lengkap Anda"
                        required
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="form-label">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="contoh@email.com"
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* WhatsApp */}
                    <div>
                        <label htmlFor="whatsapp" className="form-label">
                            Nomor WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="whatsapp"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className={`form-input ${errors.whatsapp ? 'border-red-500' : ''}`}
                            placeholder="08123456789"
                            required
                        />
                        {errors.whatsapp && (
                            <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
                        )}
                    </div>
                </div>

                {/* Preferred Contact Method */}
                <div>
                    <label className="form-label">Metode Kontak Prioritas</label>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="whatsapp-preferred"
                                name="preferredContact"
                                value="whatsapp"
                                checked={formData.preferredContact === 'whatsapp'}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary border-gray-600  bg-dark-card focus:bg-primary focus:ring-1 focus:ring-offset-2 focus:ring-primary"
                            />
                            <label htmlFor="whatsapp-preferred" className="ml-2 block text-sm text-gray-300">
                                WhatsApp
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="whatsapp-preferred"
                                name="preferredContact"
                                value="whatsapp"
                                checked={formData.preferredContact === 'whatsapp'}
                                onChange={handleChange}
                                className="w-4 h-4 text-primary bg-primary border-gray-600   focus:bg-primary focus:ring-1 focus:ring-offset-2 focus:ring-primary"
                            />
                            <label htmlFor="email-preferred" className="ml-2 block text-sm text-gray-300">
                                Email
                            </label>
                        </div>
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mt-6">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                type="checkbox"
                                id="termsAccepted"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleCheckboxChange}
                                className={`w-4 h-4 bg-primary border-gray-600 rounded focus:ring-primary bg-dark-card ${
                                    errors.termsAccepted ? 'border-red-500' : ''
                                }`}
                                required
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="termsAccepted" className="text-dark-textSecondary">
                                Saya menyetujui <a href="/syarat-ketentuan" target="_blank" className="text-primary hover:underline">syarat dan ketentuan</a> yang berlaku.
                            </label>
                            {errors.termsAccepted && (
                                <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="btn-outline"
                    >
                        Kembali
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Lanjutkan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step3Contact;