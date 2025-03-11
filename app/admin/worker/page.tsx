// app/admin/worker/page.tsx
"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

// WorkerFilter Component
const WorkerFilter = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Cari worker berdasarkan nama, spesialisasi..."
                    className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-4">
                <select className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40">
                    <option value="">Semua Status</option>
                    <option value="active">Aktif</option>
                    <option value="busy">Sibuk</option>
                    <option value="offline">Offline</option>
                </select>
                <select className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40">
                    <option value="">Semua Spesialisasi</option>
                    <option value="akademik">Akademik</option>
                    <option value="elektronik">Elektronik</option>
                </select>
                <select className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40">
                    <option value="">Urutkan</option>
                    <option value="name-asc">Nama (A-Z)</option>
                    <option value="name-desc">Nama (Z-A)</option>
                    <option value="rating-desc">Rating (Tertinggi)</option>
                    <option value="tasks-desc">Tugas (Terbanyak)</option>
                </select>
            </div>
        </div>
    );
};

export default function WorkerManagementPage() {
    const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);

    // Data dummy untuk daftar worker
    const workers = [
        {
            id: 1,
            name: 'Rudi Hartono',
            email: 'rudi.hartono@email.com',
            phone: '+6281234567890',
            specialty: 'Skripsi - Teknik',
            status: 'active',
            rating: 4.8,
            completedTasks: 24,
            activeTasks: 1,
            joinDate: '2024-05-15',
        },
        {
            id: 2,
            name: 'Dina Maulida',
            email: 'dina.maulida@email.com',
            phone: '+6281234567891',
            specialty: 'Elektronik - Laptop',
            status: 'busy',
            rating: 4.6,
            completedTasks: 18,
            activeTasks: 3,
            joinDate: '2024-06-22',
        },
        {
            id: 3,
            name: 'Fajar Pratama',
            email: 'fajar.pratama@email.com',
            phone: '+6281234567892',
            specialty: 'Skripsi - Ekonomi',
            status: 'active',
            rating: 4.9,
            completedTasks: 31,
            activeTasks: 2,
            joinDate: '2024-04-10',
        },
        {
            id: 4,
            name: 'Laras Ayu',
            email: 'laras.ayu@email.com',
            phone: '+6281234567893',
            specialty: 'Elektronik - Smartphone',
            status: 'offline',
            rating: 4.7,
            completedTasks: 15,
            activeTasks: 0,
            joinDate: '2024-07-05',
        },
        {
            id: 5,
            name: 'Bima Sakti',
            email: 'bima.sakti@email.com',
            phone: '+6281234567894',
            specialty: 'Skripsi - Hukum',
            status: 'active',
            rating: 4.5,
            completedTasks: 12,
            activeTasks: 2,
            joinDate: '2024-08-15',
        },
        {
            id: 6,
            name: 'Indah Permata',
            email: 'indah.permata@email.com',
            phone: '+6281234567895',
            specialty: 'Elektronik - Audio Visual',
            status: 'busy',
            rating: 4.4,
            completedTasks: 9,
            activeTasks: 1,
            joinDate: '2024-09-20',
        },
        {
            id: 7,
            name: 'Agus Wirawan',
            email: 'agus.wirawan@email.com',
            phone: '+6281234567896',
            specialty: 'Skripsi - Pendidikan',
            status: 'active',
            rating: 4.7,
            completedTasks: 22,
            activeTasks: 2,
            joinDate: '2024-07-12',
        },
        {
            id: 8,
            name: 'Maya Sari',
            email: 'maya.sari@email.com',
            phone: '+6281234567897',
            specialty: 'Elektronik - Komputer',
            status: 'offline',
            rating: 4.6,
            completedTasks: 14,
            activeTasks: 0,
            joinDate: '2024-08-30',
        },
    ];

    // Format tanggal
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    // Fungsi untuk mendapatkan warna status
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-500/10 text-green-500 ring-green-500/20';
            case 'busy':
                return 'bg-amber-500/10 text-amber-500 ring-amber-500/20';
            case 'offline':
                return 'bg-gray-500/10 text-gray-500 ring-gray-500/20';
            default:
                return 'bg-gray-500/10 text-gray-500 ring-gray-500/20';
        }
    };

    // Fungsi untuk mendapatkan label status
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active':
                return 'Tersedia';
            case 'busy':
                return 'Sibuk';
            case 'offline':
                return 'Offline';
            default:
                return status;
        }
    };

    return (
        <AdminLayout title="Manajemen Worker">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-dark-text">Manajemen Worker</h1>
                        <p className="text-dark-textSecondary">Kelola semua worker dalam platform</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowAddWorkerModal(true)}
                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            <span>Tambah Worker</span>
                        </button>
                        <button className="bg-dark-bg border border-dark-border hover:bg-dark-bg/70 text-dark-text px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <WorkerFilter />

                {/* Workers Table */}
                <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-dark-border">
                            <thead className="bg-dark-bg">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Worker</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Kontak</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Spesialisasi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Tugas</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Bergabung</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Aksi</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-border">
                            {workers.map((worker) => (
                                <tr key={worker.id} className="hover:bg-dark-bg/30 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <span className="text-primary font-medium">{worker.name.charAt(0)}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-dark-text">{worker.name}</div>
                                                <div className="text-sm text-dark-textSecondary">ID: {worker.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-dark-text">{worker.email}</div>
                                        <div className="text-sm text-dark-textSecondary">{worker.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-text">
                                        {worker.specialty}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ${getStatusColor(worker.status)}`}>
                        {getStatusLabel(worker.status)}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm">
                                            <span className="text-dark-text font-medium">{worker.rating}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="text-dark-text">{worker.completedTasks} selesai</div>
                                        <div className="text-dark-textSecondary">{worker.activeTasks} aktif</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-dark-textSecondary">
                                        {formatDate(worker.joinDate)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/worker/${worker.id}`} className="text-primary hover:text-primary-light mr-4">
                                            Detail
                                        </Link>
                                        <button
                                            onClick={() => alert(`Assign task to ${worker.name}`)}
                                            className="text-primary hover:text-primary-light"
                                        >
                                            Assign
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 flex items-center justify-between border-t border-dark-border">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button className="relative inline-flex items-center px-4 py-2 border border-dark-border text-sm font-medium rounded-md text-dark-text bg-dark-bg hover:bg-dark-bg/50">
                                Previous
                            </button>
                            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-dark-border text-sm font-medium rounded-md text-dark-text bg-dark-bg hover:bg-dark-bg/50">
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-dark-textSecondary">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">24</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-dark-border bg-dark-bg text-sm font-medium text-dark-text hover:bg-dark-bg/50">
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button className="relative inline-flex items-center px-4 py-2 border border-dark-border bg-primary text-sm font-medium text-white hover:bg-primary-dark">
                                        1
                                    </button>
                                    <button className="relative inline-flex items-center px-4 py-2 border border-dark-border bg-dark-bg text-sm font-medium text-dark-text hover:bg-dark-bg/50">
                                        2
                                    </button>
                                    <button className="relative inline-flex items-center px-4 py-2 border border-dark-border bg-dark-bg text-sm font-medium text-dark-text hover:bg-dark-bg/50">
                                        3
                                    </button>
                                    <span className="relative inline-flex items-center px-4 py-2 border border-dark-border bg-dark-bg text-sm font-medium text-dark-textSecondary">
                    ...
                  </span>
                                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-dark-border bg-dark-bg text-sm font-medium text-dark-text hover:bg-dark-bg/50">
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Worker Modal - Placeholder */}
            {showAddWorkerModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-dark-bg opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-dark-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-dark-card px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-dark-text">Tambah Worker Baru</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-dark-textSecondary">
                                                Form untuk menambahkan worker baru akan ditampilkan di sini.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Simpan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddWorkerModal(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-dark-border shadow-sm px-4 py-2 bg-dark-card text-base font-medium text-dark-text hover:bg-dark-bg/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-border sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}