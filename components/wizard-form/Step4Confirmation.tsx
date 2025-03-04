import { CompleteFormData } from '@/types';

interface Step4ConfirmationProps {
    formData: CompleteFormData;
    onSubmit: () => void;
    onBack: () => void;
    isSubmitting: boolean;
    isSkipped?: boolean; // Parameter baru untuk mengetahui apakah langkah detail dilewati
}

const Step4Confirmation: React.FC<Step4ConfirmationProps> = ({
                                                                 formData,
                                                                 onSubmit,
                                                                 onBack,
                                                                 isSubmitting,
                                                                 isSkipped = false
                                                             }) => {
    const { step1, step2, step3 } = formData || {};

    // Jika data belum tersedia, tampilkan loading atau pesan
    if (!step1 || !step2 || !step3) {
        return (
            <div className="text-center p-8 text-dark-text">
                <p>Memuat data...</p>
            </div>
        );
    }

    const formatDate = (dateString: string): string => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    const getProjectTypeName = (type: string): string => {
        if (!type) return '-';
        const types: Record<string, string> = {
            laporan: 'Laporan',
            makalah: 'Makalah',
            skripsi: 'Skripsi/Tugas Akhir',
            presentasi: 'Presentasi',
            essay: 'Essay',
            soal: 'Soal/Kuis',
            lainnya: 'Lainnya'
        };
        return types[type] || type;
    };

    const getEducationLevelName = (level: string): string => {
        if (!level) return '-';
        const levels: Record<string, string> = {
            sma: 'SMA/SMK',
            d3: 'D3',
            s1: 'S1',
            s2: 'S2',
            s3: 'S3'
        };
        return levels[level] || level;
    };

    const getDeviceTypeName = (type: string): string => {
        if (!type) return '-';
        const types: Record<string, string> = {
            smartphone: 'Smartphone',
            laptop: 'Laptop/Komputer',
            tv: 'Televisi',
            ac: 'AC',
            kulkas: 'Kulkas',
            'mesin-cuci': 'Mesin Cuci',
            network: 'Perangkat Jaringan',
            lainnya: 'Lainnya'
        };
        return types[type] || type;
    };

    const getIssueTypeName = (type: string): string => {
        if (!type) return '-';
        const types: Record<string, string> = {
            'tidak-menyala': 'Tidak Menyala',
            'kerusakan-fisik': 'Kerusakan Fisik',
            software: 'Masalah Software/OS',
            konektivitas: 'Masalah Konektivitas',
            performa: 'Performa Lambat',
            baterai: 'Masalah Baterai',
            instalasi: 'Instalasi/Setup',
            lainnya: 'Lainnya'
        };
        return types[type] || type;
    };

    const getUrgencyName = (urgency: string): string => {
        if (!urgency) return '-';
        const urgencies: Record<string, string> = {
            tinggi: 'Tinggi (butuh segera dalam 24 jam)',
            sedang: 'Sedang (1-3 hari)',
            rendah: 'Rendah (3-7 hari)'
        };
        return urgencies[urgency] || urgency;
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2 text-center text-dark-text">Konfirmasi Pemesanan</h2>
            <p className="text-dark-textSecondary text-center mb-8">
                Silakan periksa kembali informasi yang Anda berikan sebelum mengirim
            </p>

            {isSkipped && (
                <div className="bg-primary/10 rounded-lg p-4 mb-6 border border-primary/30">
                    <p className="text-dark-text text-sm">
                        <span className="font-medium text-primary">Catatan:</span> Anda telah melewati langkah detail layanan. Tim kami akan menghubungi Anda untuk mendiskusikan kebutuhan spesifik Anda setelah formulir ini disubmit.
                    </p>
                </div>
            )}

            <div className="space-y-8">
                {/* Service Category */}
                <div className="bg-dark-bg rounded-lg p-4 border border-dark-border">
                    <h3 className="font-semibold mb-2 text-dark-text">Kategori Layanan</h3>
                    <p className="text-dark-textSecondary">
                        {step1.category === 'academic' ? 'Jasa Akademik' : 'Jasa Elektronik'}
                    </p>
                </div>

                {/* Service Details */}
                {!isSkipped && (
                    <div className="bg-dark-bg rounded-lg p-4 border border-dark-border">
                        <h3 className="font-semibold mb-3 text-dark-text">Detail Layanan</h3>

                        {step1.category === 'academic' ? (
                            // Academic Details
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-sm text-dark-textSecondary">Jenis Tugas</p>
                                        <p className="text-dark-text">{getProjectTypeName((step2 as any).projectType)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-dark-textSecondary">Tingkat Pendidikan</p>
                                        <p className="text-dark-text">{getEducationLevelName((step2 as any).educationLevel)}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-dark-textSecondary">Mata Kuliah/Pelajaran</p>
                                    <p className="text-dark-text">{(step2 as any).subject}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-dark-textSecondary">Deadline</p>
                                    <p className="text-dark-text">{formatDate((step2 as any).deadline)}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-dark-textSecondary">Deskripsi Tugas</p>
                                    <p className="whitespace-pre-line text-dark-text">{(step2 as any).description}</p>
                                </div>

                                {(step2 as any).additionalInfo && (
                                    <div>
                                        <p className="text-sm text-dark-textSecondary">Informasi Tambahan</p>
                                        <p className="whitespace-pre-line text-dark-text">{(step2 as any).additionalInfo}</p>
                                    </div>
                                )}

                                {(step2 as any).hasAttachment && (
                                    <div className="mt-2 text-sm text-primary">
                                        <p>Akan mengirimkan file tambahan via WhatsApp/Email</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Electronic Details
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-sm text-dark-textSecondary">Jenis Perangkat</p>
                                        <p className="text-dark-text">{getDeviceTypeName((step2 as any).deviceType)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-dark-textSecondary">Merek</p>
                                        <p className="text-dark-text">{(step2 as any).brand}</p>
                                    </div>
                                </div>

                                {(step2 as any).model && (
                                    <div>
                                        <p className="text-sm text-dark-textSecondary">Model/Tipe</p>
                                        <p className="text-dark-text">{(step2 as any).model}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-sm text-dark-textSecondary">Jenis Masalah</p>
                                        <p className="text-dark-text">{getIssueTypeName((step2 as any).issueType)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-dark-textSecondary">Tingkat Urgensi</p>
                                        <p className="text-dark-text">{getUrgencyName((step2 as any).urgency)}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-dark-textSecondary">Deskripsi Masalah</p>
                                    <p className="whitespace-pre-line text-dark-text">{(step2 as any).description}</p>
                                </div>

                                {(step2 as any).additionalInfo && (
                                    <div>
                                        <p className="text-sm text-dark-textSecondary">Informasi Tambahan</p>
                                        <p className="whitespace-pre-line text-dark-text">{(step2 as any).additionalInfo}</p>
                                    </div>
                                )}

                                {(step2 as any).hasAttachment && (
                                    <div className="mt-2 text-sm text-primary">
                                        <p>Akan mengirimkan foto/video perangkat via WhatsApp/Email</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Contact Information */}
                <div className="bg-dark-bg rounded-lg p-4 border border-dark-border">
                    <h3 className="font-semibold mb-3 text-dark-text">Informasi Kontak</h3>

                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-dark-textSecondary">Nama Lengkap</p>
                            <p className="text-dark-text">{step3.name}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <p className="text-sm text-dark-textSecondary">Email</p>
                                <p className="text-dark-text">{step3.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-dark-textSecondary">WhatsApp</p>
                                <p className="text-dark-text">{step3.whatsapp}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-dark-textSecondary">Metode Kontak Prioritas</p>
                            <p className="text-dark-text">{step3.preferredContact === 'whatsapp' ? 'WhatsApp' : 'Email'}</p>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="btn-outline"
                        disabled={isSubmitting}
                    >
                        Kembali
                    </button>
                    <button
                        type="button"
                        onClick={onSubmit}
                        className="btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Mengirim...
                            </div>
                        ) : (
                            'Kirim Permintaan'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step4Confirmation;