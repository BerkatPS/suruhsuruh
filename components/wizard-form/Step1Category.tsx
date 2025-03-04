import { useState } from 'react';
import { FormDataStep1 } from '@/types';
import Icon from '../ui/Icon';

interface Step1CategoryProps {
    onSubmit: (data: FormDataStep1) => void;
    onSkip: () => void; // Fungsi baru untuk menangani aksi skip
}

const Step1Category: React.FC<Step1CategoryProps> = ({ onSubmit, onSkip }) => {
    const [category, setCategory] = useState<'academic' | 'electronic' | null>(null);
    const [showSkipModal, setShowSkipModal] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (category) {
            onSubmit({ category });
        }
    };

    const handleSkipClick = () => {
        setShowSkipModal(true);
    };

    const handleConfirmSkip = () => {
        setShowSkipModal(false);
        onSkip(); // Panggil fungsi onSkip untuk melanjutkan ke form kontak
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2 text-center text-dark-text">Pilih Kategori Layanan</h2>
            <p className="text-dark-textSecondary text-center mb-8">
                Apa jenis layanan yang Anda butuhkan saat ini?
            </p>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Academic Option */}
                    <div
                        onClick={() => setCategory('academic')}
                        className={`p-6 rounded-xl cursor-pointer transition-all hover:shadow-md border-2 ${
                            category === 'academic'
                                ? 'border-primary bg-primary/10'
                                : 'border-dark-border hover:border-primary/30'
                        }`}
                    >
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    category === 'academic' ? 'bg-primary text-dark-text' : 'bg-primary/10 text-primary'
                                }`}>
                                    <Icon name="graduation-cap" className="h-6 w-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-dark-text">Jasa Akademik</h3>
                                <p className="text-dark-textSecondary">
                                    Bantuan pengerjaan tugas, skripsi, laporan, dan kebutuhan akademik lainnya.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Electronic Option */}
                    <div
                        onClick={() => setCategory('electronic')}
                        className={`p-6 rounded-xl cursor-pointer transition-all hover:shadow-md border-2 ${
                            category === 'electronic'
                                ? 'border-primary bg-primary/10'
                                : 'border-dark-border hover:border-primary/30'
                        }`}
                    >
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    category === 'electronic' ? 'bg-primary text-dark-text' : 'bg-primary/10 text-primary'
                                }`}>
                                    <Icon name="device-phone-mobile" className="h-6 w-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-dark-text">Jasa Elektronik</h3>
                                <p className="text-dark-textSecondary">
                                    Perbaikan gadget, perangkat rumah tangga, instalasi jaringan, dan jasa elektronik lainnya.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
                    <button
                        type="submit"
                        disabled={!category}
                        className="btn-primary w-full md:w-auto md:min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Lanjutkan
                    </button>
                    <button
                        type="button"
                        onClick={handleSkipClick}
                        className="btn-outline w-full md:w-auto md:min-w-[100px]"
                    >
                        Lewati
                    </button>
                </div>
            </form>

            {/* Skip Confirmation Modal */}
            {showSkipModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-dark-card p-6 rounded-xl shadow-lg max-w-md mx-4 border border-dark-border">
                        <h3 className="text-xl font-semibold mb-4 text-dark-text">Lewati Detail Layanan?</h3>
                        <p className="mb-6 text-dark-textSecondary">
                            Jika Anda lewati langkah ini, Anda akan langsung mengisi data kontak dan tim kami akan menghubungi Anda untuk mendiskusikan kebutuhan Anda lebih lanjut.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-end">
                            <button
                                onClick={() => setShowSkipModal(false)}
                                className="btn-outline"
                            >
                                Kembali
                            </button>
                            <button
                                onClick={handleConfirmSkip}
                                className="btn-primary"
                            >
                                Ya, Lewati
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step1Category;