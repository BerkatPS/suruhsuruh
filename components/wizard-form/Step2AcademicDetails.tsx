import { useState } from 'react';
import { AcademicFormData } from '@/types';

interface Step2AcademicDetailsProps {
    onSubmit: (data: AcademicFormData) => void;
    onBack: () => void;
}

const Step2AcademicDetails: React.FC<Step2AcademicDetailsProps> = ({
                                                                       onSubmit,
                                                                       onBack
                                                                   }) => {
    const [formData, setFormData] = useState<AcademicFormData>({
        projectType: '',
        educationLevel: '',
        subject: '',
        deadline: '',
        description: '',
        additionalInfo: '',
        hasAttachment: false,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof AcademicFormData, string>>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when field is edited
        if (errors[name as keyof AcademicFormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof AcademicFormData, string>> = {};

        if (!formData.projectType) {
            newErrors.projectType = 'Jenis tugas harus dipilih';
        }

        if (!formData.educationLevel) {
            newErrors.educationLevel = 'Tingkat pendidikan harus dipilih';
        }

        if (!formData.subject) {
            newErrors.subject = 'Mata kuliah/pelajaran harus diisi';
        }

        if (!formData.deadline) {
            newErrors.deadline = 'Deadline harus diisi';
        }

        if (!formData.description) {
            newErrors.description = 'Deskripsi tugas harus diisi';
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
            <h2 className="text-2xl font-bold mb-2 text-center text-dark-text">Detail Tugas Akademik</h2>
            <p className="text-dark-textSecondary text-center mb-8">
                Berikan informasi detail tentang tugas akademik yang Anda butuhkan
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div>
                        <label htmlFor="projectType" className="form-label">
                            Jenis Tugas <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className={`form-input ${errors.projectType ? 'border-red-500' : ''}`}
                            required
                        >
                            <option value="">-- Pilih Jenis Tugas --</option>
                            <option value="laporan">Laporan</option>
                            <option value="makalah">Makalah</option>
                            <option value="skripsi">Skripsi/Tugas Akhir</option>
                            <option value="presentasi">Presentasi</option>
                            <option value="essay">Essay</option>
                            <option value="soal">Soal/Kuis</option>
                            <option value="lainnya">Lainnya</option>
                        </select>
                        {errors.projectType && (
                            <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>
                        )}
                    </div>

                    {/* Education Level */}
                    <div>
                        <label htmlFor="educationLevel" className="form-label">
                            Tingkat Pendidikan <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="educationLevel"
                            name="educationLevel"
                            value={formData.educationLevel}
                            onChange={handleChange}
                            className={`form-input ${errors.educationLevel ? 'border-red-500' : ''}`}
                            required
                        >
                            <option value="">-- Pilih Tingkat Pendidikan --</option>
                            <option value="sma">SMA/SMK</option>
                            <option value="d3">D3</option>
                            <option value="s1">S1</option>
                            <option value="s2">S2</option>
                            <option value="s3">S3</option>
                        </select>
                        {errors.educationLevel && (
                            <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>
                        )}
                    </div>
                </div>

                {/* Subject */}
                <div>
                    <label htmlFor="subject" className="form-label">
                        Mata Kuliah/Pelajaran <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                        placeholder="Contoh: Manajemen Pemasaran, Fisika Dasar, dll."
                        required
                    />
                    {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                </div>

                {/* Deadline */}
                <div>
                    <label htmlFor="deadline" className="form-label">
                        Deadline <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className={`form-input ${errors.deadline ? 'border-red-500' : ''}`}
                        min={new Date().toISOString().split('T')[0]}
                        required
                    />
                    {errors.deadline && (
                        <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="form-label">
                        Deskripsi Tugas <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`form-input h-32 ${errors.description ? 'border-red-500' : ''}`}
                        placeholder="Jelaskan secara detail tugas yang Anda butuhkan, termasuk ketentuan khusus atau pedoman yang harus diikuti."
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
                        Saya akan mengirimkan file tambahan via WhatsApp/Email
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

export default Step2AcademicDetails;