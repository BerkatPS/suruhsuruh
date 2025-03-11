// components/admin/WorkerAvailability.tsx
"use client"
import React, { useState } from 'react';

interface Worker {
    id: number;
    name: string;
    specialty: string;
    status: 'active' | 'busy' | 'offline';
    assignedTasks: number;
    completionRate: number;
}

interface WorkerAvailabilityProps {
    workers: Worker[];
}

const WorkerAvailability: React.FC<WorkerAvailabilityProps> = ({ workers }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');

    // Mendapatkan daftar spesialisasi unik
    const specialties = [...new Set(workers.map(worker => worker.specialty))];

    // Filter workers berdasarkan kriteria
    const filteredWorkers = workers.filter(worker => {
        // Filter berdasarkan nama
        const nameMatch = worker.name.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter berdasarkan status
        const statusMatch = statusFilter === 'all' || worker.status === statusFilter;

        // Filter berdasarkan spesialisasi
        const specialtyMatch = specialtyFilter === 'all' || worker.specialty === specialtyFilter;

        return nameMatch && statusMatch && specialtyMatch;
    });

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
        <div>
            {/* Filter Bar */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Cari worker..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                </div>
                <div className="flex gap-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                        <option value="all">Semua Status</option>
                        <option value="active">Tersedia</option>
                        <option value="busy">Sibuk</option>
                        <option value="offline">Offline</option>
                    </select>
                    <select
                        value={specialtyFilter}
                        onChange={(e) => setSpecialtyFilter(e.target.value)}
                        className="bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                        <option value="all">Semua Spesialisasi</option>
                        {specialties.map((specialty, index) => (
                            <option key={index} value={specialty}>{specialty}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Workers Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-dark-border">
                    <thead>
                    <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Worker</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Spesialisasi</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Status</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Tugas</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Tingkat Penyelesaian</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-dark-textSecondary uppercase tracking-wider">Aksi</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-border bg-dark-card">
                    {filteredWorkers.map((worker) => (
                        <tr key={worker.id} className="hover:bg-dark-bg/30 transition-colors">
                            <td className="px-3 py-4 whitespace-nowrap">
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
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-dark-text">
                                {worker.specialty}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ${getStatusColor(worker.status)}`}>
                    {getStatusLabel(worker.status)}
                  </span>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-dark-text">
                                {worker.assignedTasks} tugas
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="w-full bg-dark-bg rounded-full h-2.5">
                                        <div
                                            className="bg-primary h-2.5 rounded-full"
                                            style={{ width: `${worker.completionRate}%` }}
                                        ></div>
                                    </div>
                                    <span className="ml-2 text-sm text-dark-textSecondary">{worker.completionRate}%</span>
                                </div>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-right">
                                <a
                                    href={`/admin/worker/${worker.id}`}
                                    className="text-primary hover:text-primary-light font-medium mr-3"
                                >
                                    Detail
                                </a>
                                <button
                                    className="text-primary hover:text-primary-light font-medium"
                                    onClick={() => alert(`Assign task to ${worker.name}`)}
                                >
                                    Assign
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {filteredWorkers.length === 0 && (
                    <div className="py-8 text-center text-dark-textSecondary">
                        Tidak ada worker yang sesuai dengan kriteria pencarian.
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkerAvailability;