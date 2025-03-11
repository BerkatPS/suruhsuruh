// app/admin/layanan/page.tsx
"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

// ServiceCard Component
const ServiceCard = ({ service, onEdit, onDelete }: { service: any; onEdit: (service: any) => void; onDelete: (id: number) => void }) => {
    // Format angka ke format Rupiah
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden shadow-sm">
            <div className="relative aspect-video bg-dark-bg">
                {/* Service Image */}
                <div className="absolute inset-0 flex items-center justify-center text-dark-textSecondary">
                    {service.category === 'akademik' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              service.category === 'akademik'
                  ? 'bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20'
                  : 'bg-green-500/10 text-green-500 ring-1 ring-green-500/20'
          }`}>
            {service.category === 'akademik' ? 'Akademik' : 'Elektronik'}
          </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              service.isActive
                  ? 'bg-green-500/10 text-green-500 ring-1 ring-green-500/20'
                  : 'bg-red-500/10 text-red-500 ring-1 ring-red-500/20'
          }`}>
            {service.isActive ? 'Aktif' : 'Nonaktif'}
          </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-dark-text">{service.name}</h3>
                <p className="mt-1 text-sm text-dark-textSecondary line-clamp-2">{service.description}</p>

                <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-dark-textSecondary text-sm">Harga Mulai</span>
                        <span className="text-dark-text font-medium">{formatRupiah(service.startPrice)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-dark-textSecondary text-sm">Total Paket</span>
                        <span className="text-dark-text font-medium">{service.packages} paket</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-dark-textSecondary text-sm">Total Pesanan</span>
                        <span className="text-dark-text font-medium">{service.orders}</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-dark-border flex justify-between">
                    <button
                        onClick={() => onEdit(service)}
                        className="text-primary hover:text-primary-light font-medium flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(service.id)}
                        className="text-red-500 hover:text-red-400 font-medium flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

// ServiceModal Component
const ServiceModal = ({ isOpen, service, onClose, onSave }: { isOpen: boolean; service: any; onClose: () => void; onSave: (service: any) => void }) => {
    const [formData, setFormData] = useState(service || {
        id: Date.now(),
        name: '',
        description: '',
        category: 'akademik',
        isActive: true,
        startPrice: 0,
        packages: 1,
        orders: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData({
            ...formData,
            [name]: type === 'number' ? Number(value) : value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-dark-bg opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-dark-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-dark-card px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="mb-4">
                                <h3 className="text-lg leading-6 font-medium text-dark-text">
                                    {service ? 'Edit Layanan' : 'Tambah Layanan Baru'}
                                </h3>
                                <p className="mt-1 text-sm text-dark-textSecondary">
                                    {service ? 'Perbarui informasi layanan' : 'Lengkapi informasi untuk layanan baru'}
                                </p>
                            </div>
                            // Lanjutan kode untuk modal layanan di app/admin/layanan/page.tsx

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-dark-text">
                                        Nama Layanan
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-dark-text">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-dark-text">
                                        Kategori
                                    </label>
                                    <select
                                        name="category"
                                        id="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                                        required
                                    >
                                        <option value="akademik">Akademik</option>
                                        <option value="elektronik">Elektronik</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="startPrice" className="block text-sm font-medium text-dark-text">
                                        Harga Mulai
                                    </label>
                                    <input
                                        type="number"
                                        name="startPrice"
                                        id="startPrice"
                                        value={formData.startPrice}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                                        min="0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="packages" className="block text-sm font-medium text-dark-text">
                                        Jumlah Paket
                                    </label>
                                    <input
                                        type="number"
                                        name="packages"
                                        id="packages"
                                        value={formData.packages}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={handleCheckboxChange}
                                        className="h-4 w-4 text-primary focus:ring-primary/40 border-dark-border rounded"
                                    />
                                    <label htmlFor="isActive" className="ml-2 block text-sm text-dark-text">
                                        Layanan Aktif
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                {service ? 'Simpan Perubahan' : 'Tambah Layanan'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-dark-border shadow-sm px-4 py-2 bg-dark-card text-base font-medium text-dark-text hover:bg-dark-bg/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-border sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// ServiceFilter Component
const ServiceFilter = ({ onFilterChange }: { onFilterChange: (filters: any) => void }) => {
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        status: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const updatedFilters = {
            ...filters,
            [name]: value,
        };

        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
                <input
                    type="text"
                    name="search"
                    placeholder="Cari layanan..."
                    value={filters.search}
                    onChange={handleChange}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-4">
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                    <option value="">Semua Kategori</option>
                    <option value="akademik">Akademik</option>
                    <option value="elektronik">Elektronik</option>
                </select>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                    <option value="">Semua Status</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Nonaktif</option>
                </select>
            </div>
        </div>
    );
};

export default function ServiceManagementPage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [services, setServices] = useState([
        {
            id: 1,
            name: 'Penulisan Skripsi',
            description: 'Layanan penulisan skripsi untuk berbagai jurusan dengan hasil berkualitas dan anti plagiarisme.',
            category: 'akademik',
            isActive: true,
            startPrice: 2500000,
            packages: 3,
            orders: 48,
        },
        {
            id: 2,
            name: 'Perbaikan Laptop',
            description: 'Layanan perbaikan laptop untuk berbagai masalah hardware dan software dengan teknisi berpengalaman.',
            category: 'elektronik',
            isActive: true,
            startPrice: 150000,
            packages: 4,
            orders: 36,
        },
        {
            id: 3,
            name: 'Penulisan Tesis',
            description: 'Layanan penulisan tesis untuk program magister dengan pendekatan riset yang mendalam dan komprehensif.',
            category: 'akademik',
            isActive: true,
            startPrice: 4500000,
            packages: 2,
            orders: 22,
        },
        {
            id: 4,
            name: 'Perbaikan Smartphone',
            description: 'Layanan perbaikan smartphone untuk berbagai merek dengan garansi servis dan suku cadang asli.',
            category: 'elektronik',
            isActive: true,
            startPrice: 200000,
            packages: 3,
            orders: 53,
        },
        {
            id: 5,
            name: 'Penulisan Makalah',
            description: 'Layanan penulisan makalah untuk tugas kuliah dengan hasil terstruktur dan sesuai ketentuan akademik.',
            category: 'akademik',
            isActive: true,
            startPrice: 300000,
            packages: 3,
            orders: 89,
        },
        {
            id: 6,
            name: 'Perbaikan Perangkat Audio',
            description: 'Layanan perbaikan perangkat audio seperti speaker, headphone, dan sistem home theater.',
            category: 'elektronik',
            isActive: false,
            startPrice: 250000,
            packages: 2,
            orders: 12,
        },
        {
            id: 7,
            name: 'Penulisan Disertasi',
            description: 'Layanan penulisan disertasi untuk program doktoral dengan pendekatan riset yang mendalam dan original.',
            category: 'akademik',
            isActive: false,
            startPrice: 8000000,
            packages: 1,
            orders: 5,
        },
        {
            id: 8,
            name: 'Perbaikan Televisi',
            description: 'Layanan perbaikan televisi berbagai merek dengan teknisi berpengalaman dan suku cadang berkualitas.',
            category: 'elektronik',
            isActive: true,
            startPrice: 350000,
            packages: 2,
            orders: 19,
        },
    ]);

    const [filteredServices, setFilteredServices] = useState(services);

    const handleAddService = () => {
        setSelectedService(null);
        setShowModal(true);
    };

    const handleEditService = (service: any) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleDeleteService = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
            setServices(services.filter(service => service.id !== id));
            setFilteredServices(filteredServices.filter(service => service.id !== id));
        }
    };

    const handleSaveService = (formData: any) => {
        if (selectedService) {
            // Edit existing service
            const updatedServices = services.map(service =>
                service.id === formData.id ? formData : service
            );
            setServices(updatedServices);
            setFilteredServices(applyFilters(updatedServices, currentFilters));
        } else {
            // Add new service
            const newServices = [...services, formData];
            setServices(newServices);
            setFilteredServices(applyFilters(newServices, currentFilters));
        }

        setShowModal(false);
    };

    // State for current filters
    const [currentFilters, setCurrentFilters] = useState({
        search: '',
        category: '',
        status: '',
    });

    // Apply filters to services
    const applyFilters = (servicesList: any[], filters: any) => {
        return servicesList.filter(service => {
            // Filter by search term
            const matchesSearch = filters.search === '' ||
                service.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                service.description.toLowerCase().includes(filters.search.toLowerCase());

            // Filter by category
            const matchesCategory = filters.category === '' || service.category === filters.category;

            // Filter by status
            const matchesStatus = filters.status === '' ||
                (filters.status === 'active' && service.isActive) ||
                (filters.status === 'inactive' && !service.isActive);

            return matchesSearch && matchesCategory && matchesStatus;
        });
    };

    // Handle filter changes
    const handleFilterChange = (filters: any) => {
        setCurrentFilters(filters);
        setFilteredServices(applyFilters(services, filters));
    };

    return (
        <AdminLayout title="Manajemen Layanan">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-dark-text">Manajemen Layanan</h1>
                        <p className="text-dark-textSecondary">Kelola semua layanan yang tersedia dalam platform</p>
                    </div>
                    <div>
                        <button
                            onClick={handleAddService}
                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            <span>Tambah Layanan</span>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <ServiceFilter onFilterChange={handleFilterChange} />

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredServices.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onEdit={handleEditService}
                            onDelete={handleDeleteService}
                        />
                    ))}

                    {filteredServices.length === 0 && (
                        <div className="col-span-full py-12 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-dark-textSecondary opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-dark-text">Tidak Ada Layanan</h3>
                            <p className="mt-2 text-dark-textSecondary">Tidak ada layanan yang sesuai dengan filter yang dipilih.</p>
                            <button
                                onClick={() => handleFilterChange({ search: '', category: '', status: '' })}
                                className="mt-4 text-primary hover:text-primary-light font-medium"
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Service Modal */}
            {showModal && (
                <ServiceModal
                    isOpen={showModal}
                    service={selectedService}
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveService}
                />
            )}
        </AdminLayout>
    );
}