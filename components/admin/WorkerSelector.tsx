// components/admin/WorkerSelector.tsx
import React, { useState } from 'react';

interface Worker {
    id: number;
    name: string;
    specialty: string;
    status: 'active' | 'busy' | 'offline';
    workload: number;
}

interface WorkerSelectorProps {
    workers: Worker[];
    onAssign: (workerId: number, note?: string) => void;
    onCancel: () => void;
    isProcessing?: boolean;
}

const WorkerSelector: React.FC<WorkerSelectorProps> = ({
                                                           workers,
                                                           onAssign,
                                                           onCancel,
                                                           isProcessing = false
                                                       }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWorkerId, setSelectedWorkerId] = useState<number | null>(null);
    const [note, setNote] = useState('');

    // Filter workers berdasarkan kriteria pencarian
    const filteredWorkers = workers.filter(worker => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            worker.name.toLowerCase().includes(searchTermLower) ||
            worker.specialty.toLowerCase().includes(searchTermLower)
        );
    });

    // Handler untuk memilih worker
    const handleSelectWorker = (workerId: number) => {
        setSelectedWorkerId(workerId);
    };

    // Handler untuk konfirmasi assignment
    const handleAssign = () => {
        if (selectedWorkerId !== null) {
            onAssign(selectedWorkerId, note || undefined);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-dark-bg opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-dark-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-dark-border">
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 sm:mx-0 sm:h-10 sm:w-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-dark-text">
                                    Pilih Worker untuk Pesanan
                                </h3>
                                <div className="mt-4">
                                    <p className="text-sm text-dark-textSecondary">
                                        Pilih worker yang akan menangani pesanan ini.
                                    </p>

                                    {/* Search Field */}
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            placeholder="Cari worker berdasarkan nama atau spesialisasi..."
                                            className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Worker List */}
                                    <div className="mt-4 max-h-60 overflow-y-auto">
                                        {filteredWorkers.length > 0 ? (
                                            filteredWorkers.map((worker) => (
                                                <div
                                                    key={worker.id}
                                                    className={`flex items-center p-3 hover:bg-dark-bg/50 rounded-lg cursor-pointer transition-colors ${
                                                        selectedWorkerId === worker.id ? 'bg-dark-bg/70 ring-1 ring-primary' : ''
                                                    }`}
                                                    onClick={() => handleSelectWorker(worker.id)}
                                                >
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <span className="text-primary font-medium">{worker.name.charAt(0)}</span>
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-dark-text">{worker.name}</p>
                                                        <p className="text-xs text-dark-textSecondary">Spesialisasi: {worker.specialty}</p>
                                                    </div>
                                                    <div className="ml-auto flex items-center">
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                                worker.status === 'active'
                                    ? 'bg-green-500/10 text-green-500'
                                    : worker.status === 'busy'
                                        ? 'bg-amber-500/10 text-amber-500'
                                        : 'bg-gray-500/10 text-gray-500'
                            }`}>
                              {worker.status === 'active' ? 'Tersedia' : worker.status === 'busy' ? 'Sibuk' : 'Offline'}
                            </span>
                                                        <span className="ml-2 text-xs text-dark-textSecondary">{worker.workload} tugas</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-dark-textSecondary">
                                                Tidak ada worker yang sesuai dengan pencarian
                                            </div>
                                        )}
                                    </div>

                                    {/* Note Textarea */}
                                    <div className="mt-4">
                                        <label htmlFor="assignNote" className="block text-sm font-medium text-dark-text mb-1">
                                            Catatan Penugasan (opsional)
                                        </label>
                                        <textarea
                                            id="assignNote"
                                            rows={3}
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                                            placeholder="Tambahkan catatan untuk worker..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-dark-border">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-dark-text hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleAssign}
                            disabled={isProcessing || selectedWorkerId === null}
                        >
                            {isProcessing ? 'Memproses...' : 'Assign Worker'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-dark-border shadow-sm px-4 py-2 bg-dark-card text-base font-medium text-dark-text hover:bg-dark-border/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-border sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerSelector;