import { useState } from 'react';
import { ElectronicFormData } from '@/types';

interface Step2ElectronicDetailsProps {
    onSubmit: (data: ElectronicFormData) => void;
    onBack: () => void;
}

const Step2ElectronicDetails: React.FC<Step2ElectronicDetailsProps> = ({
                                                                           onSubmit,
                                                                           onBack
                                                                       }) => {
    const [formData, setFormData] = useState<ElectronicFormData>({
        deviceType: '',
        brand: '',
        model: '',
        issueType: '',
        urgency: '',
        description: '',
        additionalInfo: '',
        hasAttachment: false,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ElectronicFormData, string>>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when field is edited
        if (errors[name as keyof ElectronicFormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof ElectronicFormData, string>> = {};

        if (!formData.deviceType) {
            newErrors.deviceType = 'Jenis perangkat harus dipilih';
        }

        if (!formData.brand) {
            newErrors.brand = 'Merek perangkat harus diisi';
        }

        if (!formData.issueType) {
            newErrors.issueType = 'Jenis masalah harus dipilih';
        }

        if (!formData.urgency) {
            newErrors.urgency = 'Tingkat urgensi harus dipilih';
        }

        if (!formData.description) {
            newErrors.description = 'Deskripsi masalah harus diisi';
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
            <h2 className="text-2xl font-bold mb-2 text-center text-dark-text">Detail Masalah Elektronik</h2>
            <p className="text-dark-textSecondary text-center mb-8">
                Berikan informasi detail tentang perangkat dan masalah yang Anda alami
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Device Type */}
                    <div>
                        <label htmlFor="deviceType" className="form-label">
                            Jenis Perangkat <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="deviceType"
                            name="deviceType"
                            value={formData.deviceType}
                            onChange={handleChange}
                            className={`form-input ${errors.deviceType ? 'border-red-500' : ''}`}
                            required
                        >
                            <option value="">-- Pilih Jenis Perangkat --</option>
                            <option value="smartphone">Smartphone</option>
                            <option value="laptop">Laptop/Komputer</option>
                            <option value="tv">Televisi</option>
                            <option value="ac">AC</option>
                            <option value="kulkas">Kulkas</option>
                            <option value="mesin-cuci">Mesin Cuci</option>
                            <option value="network">Perangkat Jaringan</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                        {errors.deviceType && (
                            <p className="text-red-500 text-sm mt-1">{errors.deviceType}</p>
                        )}
                    </div>

                    {/* Brand */}
                    <div>
                        <label htmlFor="brand" className="form-label">
                            Merek <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className={`form-input ${errors.brand ? 'border-red-500' : ''}`}
                            placeholder="Contoh: Samsung, Apple, Asus, dll."
                            required
                        />
                        {errors.brand && (
                            <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                        )}
                    </div>
                </div>

                {/* Model */}
                <div>
                    <label htmlFor="model" className="form-label">
                        Model/Tipe
                    </label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Contoh: Galaxy S21, MacBook Pro 2020, dll. (opsional)"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Issue Type */}
                    <div>
                        <label htmlFor="issueType" className="form-label">
                            Jenis Masalah <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="issueType"
                            name="issueType"
                            value={formData.issueType}
                            onChange={handleChange}
                            className={`form-input ${errors.issueType ? 'border-red-500' : ''}`}
                            required
                        >
                            <option value="">-- Pilih Jenis Masalah --</option>
                            <option value="tidak-menyala">Tidak Menyala</option>
                            <option value="kerusakan-fisik">Kerusakan Fisik</option>
                            <option value="software">Masalah Software/OS</option>
                            <option value="konektivitas">Masalah Konektivitas</option>
                            <option value="performa">Performa Lambat</option>
                            <option value="baterai">Masalah Baterai</option>
                            <option value="instalasi">Instalasi/Setup</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                        {errors.issueType && (
                            <p className="text-red-500 text-sm mt-1">{errors.issueType}</p>
                        )}
                    </div>

                    {/* Urgency */}
                    <div>
                        <label htmlFor="urgency" className="form-label">
                            Tingkat Urgensi <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="urgency"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className={`form-input ${errors.urgency ? 'border-red-500' : ''}`}
                            required
                        >
                            <option value="">-- Pilih Urgensi --</option>
                            <option value="tinggi">Tinggi (butuh segera dalam 24 jam)</option>
                            <option value="sedang">Sedang (1-3 hari)</option>
                            <option value="rendah">Rendah (3-7 hari)</option>
                        </select>
                        {errors.urgency && (
                            <p className="text-red-500 text-sm mt-1">{errors.urgency}</p>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="form-label">
                        Deskripsi Masalah <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`form-input h-32 ${errors.description ? 'border-red-500' : ''}`}
                        placeholder="Jelaskan secara detail masalah yang Anda alami, termasuk gejala, sejak kapan terjadi, dan apa yang sudah Anda coba untuk memperbaikinya."
                        required
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                </div>

                {/* Additional Info */}
                <div>
                    <label htmlFor="additionalInfo" className="form-label">
                        Informasi Tambahan
                    </label>
                    <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="form-input h-24"
                        placeholder="Tambahkan informasi lain yang perlu kami ketahui (opsional)."
                    />
                </div>

                {/* Has Attachment */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="hasAttachment"
                        name="hasAttachment"
                        checked={formData.hasAttachment}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-primary border-gray-600 rounded focus:ring-primary bg-dark-card"
                    />
                    <label htmlFor="hasAttachment" className="ml-2 block text-sm text-gray-300">
                        Saya akan mengirimkan foto/video perangkat via WhatsApp/Email
                    </label>
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

export default Step2ElectronicDetails;