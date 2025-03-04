import { useState } from 'react';
import FAQItem from '@/components/ui/FAQItem';
import { faqs } from '@/config/site';
import { ServiceCategory } from '@/types';

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

    const filteredFAQs = activeCategory === 'all'
        ? faqs
        : faqs.filter(faq => faq.category === activeCategory);

    return (
        <section id="faq" className="section bg-dark-card">
            <div className="container-custom">
                <div className="section-title">
                    <h2>Pertanyaan Umum</h2>
                    <p>
                        Jawaban untuk pertanyaan yang sering ditanyakan
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === 'all'
                                ? 'bg-primary text-dark-text'
                                : 'bg-dark-bg text-gray-300 hover:bg-primary/20'
                        }`}
                    >
                        Semua
                    </button>
                    <button
                        onClick={() => setActiveCategory('academic')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === 'academic'
                                ? 'bg-primary text-dark-text'
                                : 'bg-dark-bg text-gray-300 hover:bg-primary/20'
                        }`}
                    >
                        Jasa Akademik
                    </button>
                    <button
                        onClick={() => setActiveCategory('electronic')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === 'electronic'
                                ? 'bg-primary text-dark-text'
                                : 'bg-dark-bg text-gray-300 hover:bg-primary/20'
                        }`}
                    >
                        Jasa Elektronik
                    </button>
                </div>

                {/* FAQs List */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {filteredFAQs.map((faq) => (
                        <FAQItem key={faq.id} faq={faq} />
                    ))}
                </div>

                {/* Extra help */}
                <div className="mt-12 text-center">
                    <p className="mb-4 text-gray-400">
                        Belum menemukan jawaban yang Anda cari?
                    </p>
                    <a href="#pesan" className="btn-primary">
                        Hubungi Kami
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;