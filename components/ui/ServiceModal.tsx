import React, { useState, useEffect } from 'react';
import { ServiceItem } from '@/types';
import Icon from './Icon';

interface ServiceModalProps {
    service: ServiceItem | null;
    isOpen: boolean;
    onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose }) => {
    // Added billing period state to toggle between monthly/yearly prices
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
    const [activeSection, setActiveSection] = useState<'overview' | 'packages'>('overview');

    // Reset state when modal opens or service changes
    useEffect(() => {
        if (isOpen && service) {
            setBillingPeriod('monthly');
            setActiveSection('overview');
        }
    }, [isOpen, service]);

    if (!isOpen || !service) return null;

    // Function to render service-specific details based on service category
    const renderServiceDetails = () => {
        if (service.category === 'academic') {
            return (
                <div className="space-y-6 animate-fadeIn">
                    <div>
                        <h3 className="text-lg font-medium text-dark-text mb-3">Dokumen Yang Kami Tangani</h3>
                        <ul className="space-y-2">
                            {service.documents?.map((item, index) => (
                                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                                    <span className="text-dark-textSecondary">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-dark-text mb-3">Bidang Studi</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {service.subjects?.map((item, index) => (
                                <div key={index} className="flex items-center bg-dark-bg/50 rounded-lg p-2 hover:bg-dark-bg/70 transition-colors">
                  <span className="text-primary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a9.006 9.006 0 00-5 1.5 9.006 9.006 0 00-5-1.5 9.006 9.006 0 00-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32a.75.75 0 00.5 0z" />
                    </svg>
                  </span>
                                    <span className="text-dark-textSecondary text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-dark-text mb-3">Tingkat Pendidikan</h3>
                        <div className="flex flex-wrap gap-2">
                            {service.educationLevels?.map((level, index) => (
                                <span key={index} className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full hover:bg-primary/20 transition-colors">
                  {level}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else if (service.category === 'electronic') {
            return (
                <div className="space-y-6 animate-fadeIn">
                    <div>
                        <h3 className="text-lg font-medium text-dark-text mb-3">Perangkat Yang Kami Tangani</h3>
                        <ul className="space-y-2">
                            {service.devices?.map((item, index) => (
                                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                                    <span className="text-dark-textSecondary">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-dark-text mb-3">Jenis Masalah</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {service.issueTypes?.map((item, index) => (
                                <div key={index} className="flex items-center bg-dark-bg/50 rounded-lg p-2 hover:bg-dark-bg/70 transition-colors">
                  <span className="text-primary mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M11 5a3 3 0 11-6 0 3 3 0 016 0zm-9 8c0 1 1 1 1 1h10s1 0 1-1v-1a2 2 0 00-2-2H4a2 2 0 00-2 2v1z" clipRule="evenodd" />
                    </svg>
                  </span>
                                    <span className="text-dark-textSecondary text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pb-5">
                        <h3 className="text-lg font-medium text-dark-text mb-3">Brand Populer</h3>
                        <div className="flex flex-wrap gap-2 ">
                            {service.brands?.map((brand, index) => (
                                <span key={index} className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full hover:bg-primary/20 transition-colors">
                                  {brand}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    // Function to render pricing packages
    const renderPricingPackages = () => {
        if (!service.packages || service.packages.length === 0) {
            return (
                <div className="bg-dark-bg/50 rounded-lg p-4 animate-fadeIn">
                    <div className="flex flex-col md:flex-row md:items-center mb-2">
                        <div className="flex items-baseline">
              <span className="text-primary font-medium text-2xl">
                {service.pricing?.startingFrom ? "Mulai dari " : ""}
                  Rp {service.pricing?.value.toLocaleString('id-ID')}
              </span>
                            {service.pricing?.unit && (
                                <span className="text-dark-textSecondary ml-1">/{service.pricing?.unit}</span>
                            )}
                        </div>
                        {service.pricing?.negotiable && (
                            <span className="bg-primary/10 text-primary text-xs font-medium rounded-full px-3 py-1 md:ml-4 mt-2 md:mt-0 inline-block">
                Dapat Dinegosiasikan
              </span>
                        )}
                    </div>
                    <p className="text-dark-textSecondary text-sm">
                        {service.pricing?.note || "Harga dapat bervariasi berdasarkan kompleksitas dan urgensi pekerjaan."}
                    </p>
                </div>
            );
        }

        return (
            <div className="space-y-6 animate-fadeIn">

                {/* Pricing packages grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.packages.map((pkg, index) => {
                        const price = billingPeriod === 'monthly' ? pkg.monthlyPrice : (pkg.yearlyPrice || pkg.monthlyPrice);
                        // const regularPrice = pkg.regularPrice && billingPeriod === 'yearly' ? pkg.regularPrice : null;

                        return (
                            <div
                                key={index}
                                className={`rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                                    pkg.highlighted
                                        ? 'border-primary bg-primary/5'
                                        : 'border-dark-border bg-dark-bg/60'
                                }`}
                            >
                                {/* Package header */}
                                <div className={`p-5 ${pkg.highlighted ? 'bg-primary/10' : 'bg-dark-bg/80'}`}>
                                    <h3 className="text-xl font-bold text-dark-text">{pkg.name}</h3>
                                    <p className="text-dark-textSecondary text-sm mt-1">{pkg.description}</p>
                                </div>

                                {/* Package price */}
                                <div className="p-5">
                                    <div className="flex items-baseline">

                                        <span className="text-primary text-3xl font-bold">
                      Rp {price.toLocaleString('id-ID')}
                    </span>
                                        <span className="text-dark-textSecondary ml-1 text-sm">
                      {/*/{billingPeriod === 'monthly' ? 'bulan' : 'tahun'}*/}
                    </span>
                                    </div>

                                    {pkg.billingNote && (
                                        <p className="text-dark-textSecondary text-xs mt-1">{pkg.billingNote}</p>
                                    )}

                                    {/* Package features */}
                                    <ul className="mt-5 space-y-3">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                        <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </span>
                                                <span className="text-dark-text text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Select button */}
                                    <a
                                        href="#pesan"
                                        onClick={onClose}
                                        className={`mt-6 w-full block text-center py-2 rounded-lg transition hover:opacity-90 ${
                                            pkg.highlighted
                                                ? 'bg-primary hover:bg-primary-dark text-dark-text'
                                                : 'bg-dark-bg hover:bg-dark-border text-dark-text border border-dark-border'
                                        }`}
                                    >
                                        {pkg.highlighted ? 'Pilih Paket' : 'Pilih Paket'}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional notes */}
                {service.pricingNote && (
                    <div className="bg-dark-bg/30 p-4 rounded-lg border border-dark-border/50 mt-4">
                        <p className="text-dark-textSecondary text-sm">{service.pricingNote}</p>
                    </div>
                )}
            </div>
        );
    };

    // Tab navigation
    const renderTabs = () => (
        <div className="flex border-b border-dark-border mb-6">
            <button
                className={`px-4 py-2 font-medium transition-colors relative ${
                    activeSection === 'overview' ? 'text-primary' : 'text-dark-textSecondary'
                }`}
                onClick={() => setActiveSection('overview')}
            >
                Overview
                {activeSection === 'overview' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                )}
            </button>
            <button
                className={`px-4 py-2 font-medium transition-colors relative ${
                    activeSection === 'packages' ? 'text-primary' : 'text-dark-textSecondary'
                }`}
                onClick={() => setActiveSection('packages')}
            >
                Paket & Harga
                {activeSection === 'packages' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
                )}
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-6xl mx-auto bg-dark-card rounded-xl shadow-lg border border-dark-border/50 max-h-[90vh] overflow-hidden">
                {/* Header with close button */}
                <div className="flex items-center justify-between p-6 border-b border-dark-border sticky top-0 bg-dark-card z-10">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Icon name={service.icon} className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-semibold text-dark-text">{service.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-dark-textSecondary hover:text-dark-text transition-colors"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                    <div className="prose prose-dark max-w-none mb-8">
                        <p className="text-dark-textSecondary text-lg mb-6 animate-fadeIn">
                            {service.fullDescription || service.description}
                        </p>

                        {/* Tab Navigation */}
                        {renderTabs()}

                        {/* Content based on active section */}
                        <div className="min-h-[200px]">
                            {activeSection === 'overview' ? (
                                <div>
                                    {/* Service Features */}
                                    {service.features && service.features.length > 0 && (
                                        <div className="mb-8 animate-fadeIn">
                                            <h3 className="text-xl font-semibold text-dark-text mb-4">Fitur Layanan</h3>
                                            <ul className="space-y-3">
                                                {service.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start">
                            <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                            </span>
                                                        <span className="text-dark-text">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Service-specific details section */}
                                    {renderServiceDetails()}
                                </div>
                            ) : (
                                <div>
                                    {/* Pricing & Packages Section */}
                                    {renderPricingPackages()}

                                    {service.terms && (
                                        <div className="mt-6 animate-fadeIn">
                                            <h4 className="text-lg font-medium text-dark-text mb-2">Ketentuan Layanan</h4>
                                            <ul className="space-y-2">
                                                {service.terms.map((term, index) => (
                                                    <li key={index} className="flex items-start">
                            <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                            </span>
                                                        <span className="text-dark-textSecondary text-sm">{term}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer with action button */}
                <div className="p-6 border-t border-dark-border flex justify-between items-center sticky bottom-0 bg-dark-card">
                    <p className="text-dark-textSecondary text-sm max-w-md">
                        Konsultasikan kebutuhan spesifik Anda dengan tim kami untuk mendapatkan penawaran terbaik
                    </p>
                    <a
                        href="#pesan"
                        onClick={onClose}
                        className="btn-primary hover:brightness-110 transition-all"
                    >
                        Pesan Sekarang
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;