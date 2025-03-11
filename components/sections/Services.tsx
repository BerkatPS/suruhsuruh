import React, { useState } from 'react';
import ServiceCard from '@/components/ui/ServiceCard';
import ServiceModal from '@/components/ui/ServiceModal';
import { services } from '@/config/site';
import { ServiceCategory, ServiceItem } from '@/types';

const Services: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'all'>('all');
    const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(service => service.category === activeCategory);

    const handleServiceClick = (service: ServiceItem) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Berikan waktu untuk modal menutup sebelum menghapus service yang dipilih
        setTimeout(() => {
            setSelectedService(null);
        }, 300);
    };

    return (
        <section id="layanan" className="section bg-dark-card relative overflow-hidden">
            {/* Simple background effect */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
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
                    {filteredServices.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onClick={handleServiceClick}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Service Details Modal */}
            {selectedService && (
                <ServiceModal
                    service={selectedService}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </section>
    );
};

export default Services;