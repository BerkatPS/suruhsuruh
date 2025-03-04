import { useState } from 'react';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { testimonials } from '@/config/site';
import { ServiceCategory } from '@/types';

const Testimonials = () => {
    const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

    const filteredTestimonials = activeCategory === 'all'
        ? testimonials
        : testimonials.filter(testimonial => testimonial.category === activeCategory);

    return (
        <section id="testimoni" className="section bg-dark-bg">
            <div className="container-custom">
                <div className="section-title">
                    <h2>Apa Kata Klien Kami</h2>
                    <p>
                        Ribuan klien telah mempercayakan pekerjaan mereka pada kami
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === 'all'
                                ? 'bg-primary text-dark-text'
                                : 'bg-dark-card text-gray-300 hover:bg-primary/20'
                        }`}
                    >
                        Semua
                    </button>
                    <button
                        onClick={() => setActiveCategory('academic')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === 'academic'
                                ? 'bg-primary text-dark-text'
                                : 'bg-dark-card text-gray-300 hover:bg-primary/20'
                        }`}
                    >
                        Jasa Akademik
                    </button>
                    <button
                        onClick={() => setActiveCategory('electronic')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === 'electronic'
                                ? 'bg-primary text-dark-text'
                                : 'bg-dark-card text-gray-300 hover:bg-primary/20'
                        }`}
                    >
                        Jasa Elektronik
                    </button>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTestimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;