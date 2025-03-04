import { useState } from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import { services } from '@/config/site';
import { ServiceCategory } from '@/types';

const Services = () => {
    const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');

    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(service => service.category === activeCategory);

    return (
        <section id="layanan" className="section bg-dark-card">
            <div className="container-custom">
                <div className="section-title">
                    <h2 className="text-dark-text">Layanan Kami</h2>
                    <p className="text-dark-textSecondary">
                        Kami menyediakan berbagai layanan untuk memenuhi kebutuhan akademik dan elektronik Anda
                        dengan harga yang dapat dinegosiasikan.
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

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;