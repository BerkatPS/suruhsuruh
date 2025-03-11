// src/app/worker-portal/availability/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    Check,
    ChevronDown,
    Clock,
    Edit2,
    Plus,
    Save,
    Settings,
    Trash2,
    X,
    ArrowUpRight
} from 'lucide-react';
import WorkerLayout from '@/components/layout/WorkerLayout';

// Interfaces for type-safety
interface CalendarDay {
    date: Date | null;
    isCurrentMonth: boolean;
    isToday?: boolean;
    hasTimeSlots?: boolean;
    dateString?: string;
}

interface TimeSlot {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    isAllDay: boolean;
    isAvailable: boolean;
    notes?: string;
}

interface ScheduledJob {
    id: string;
    title: string;
    customer?: string;
    date: string;
    startTime?: string;
    endTime?: string;
    allDay?: boolean;
    type: 'job' | 'unavailable';
}

const AvailabilityPage: React.FC = () => {
    const router = useRouter();
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [showTimeModal, setShowTimeModal] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<CalendarDay | null>(null);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [editSlot, setEditSlot] = useState<TimeSlot | null>(null);

    // Data dummy untuk halaman availability
    const daysOfWeek: string[] = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const months: string[] = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    // Generate data kalender
    const generateCalendarDays = (): CalendarDay[] => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        // Hari pertama dalam bulan
        const firstDay = new Date(year, month, 1);
        // Hari terakhir dalam bulan
        const lastDay = new Date(year, month + 1, 0);

        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: CalendarDay[] = [];

        // Tambahkan hari kosong dari bulan sebelumnya
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push({ date: null, isCurrentMonth: false });
        }

        // Tambahkan hari-hari dalam bulan
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const dateString = date.toISOString().split('T')[0];

            // Cek apakah hari ini sudah memiliki time slot
            const hasTimeSlots = timeSlots.some(slot => slot.date === dateString);

            days.push({
                date,
                isCurrentMonth: true,
                isToday: isToday(date),
                hasTimeSlots,
                dateString
            });
        }

        // Tambahkan hari dari bulan berikutnya untuk mengisi sisa grid
        const remainingDays = 7 - (days.length % 7);
        if (remainingDays < 7) {
            for (let i = 1; i <= remainingDays; i++) {
                days.push({ date: null, isCurrentMonth: false });
            }
        }

        return days;
    };

    // Cek apakah tanggal adalah hari ini
    const isToday = (date: Date): boolean => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    // Navigasi bulan
    const prevMonth = (): void => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = (): void => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    // Reset ke bulan saat ini
    const goToCurrentMonth = (): void => {
        const today = new Date();
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    };

    // Handle klik pada tanggal
    const handleDateClick = (day: CalendarDay): void => {
        if (!day.date) return;

        setSelectedDate(day);
        setShowTimeModal(true);
    };

    // Data dummy untuk jadwal yang sudah ada
    const scheduledJobs: ScheduledJob[] = [
        {
            id: 'job-001',
            title: 'Perbaikan Laptop Acer',
            customer: 'Rudi Hartono',
            date: '2025-03-12',
            startTime: '10:00',
            endTime: '12:00',
            type: 'job'
        },
        {
            id: 'job-002',
            title: 'Konsultasi Thesis Ekonomi',
            customer: 'Siti Nurhayati',
            date: '2025-03-15',
            startTime: '13:00',
            endTime: '14:30',
            type: 'job'
        },
        {
            id: 'off-001',
            title: 'Tidak Tersedia',
            date: '2025-03-18',
            allDay: true,
            type: 'unavailable'
        },
        {
            id: 'job-003',
            title: 'Pengantaran Monitor Samsung',
            customer: 'Budi Santoso',
            date: '2025-03-20',
            startTime: '15:00',
            endTime: '16:00',
            type: 'job'
        }
    ];

    // Tambah slot waktu
    const addTimeSlot = (): void => {
        if (!selectedDate || !selectedDate.dateString) return;

        if (!editSlot) {
            // Tambah slot baru
            const newSlot: TimeSlot = {
                id: `slot-${Date.now()}`,
                date: selectedDate.dateString,
                startTime: '09:00',
                endTime: '17:00',
                isAllDay: false,
                isAvailable: true
            };

            setTimeSlots([...timeSlots, newSlot]);
        } else {
            // Update slot yang sudah ada
            const updatedSlots = timeSlots.map(slot =>
                slot.id === editSlot.id ? {...editSlot} : slot
            );

            setTimeSlots(updatedSlots);
            setEditSlot(null);
        }

        setShowTimeModal(false);
    };

    // Hapus slot waktu
    const deleteTimeSlot = (id: string): void => {
        setTimeSlots(timeSlots.filter(slot => slot.id !== id));
    };

    // Format tanggal
    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    // Fungsi untuk memperbarui checkbox di modal
    const handleCheckboxChange = (field: keyof TimeSlot, value: boolean): void => {
        if (editSlot) {
            setEditSlot({...editSlot, [field]: value});
        } else {
            // Jika tidak ada slot yang diedit, buat slot baru
            setEditSlot({
                id: `slot-${Date.now()}`,
                date: selectedDate?.dateString || '',
                startTime: '09:00',
                endTime: '17:00',
                isAllDay: field === 'isAllDay' ? value : false,
                isAvailable: field === 'isAvailable' ? value : true
            });
        }
    };

    // Fungsi untuk memperbarui catatan
    const handleNotesChange = (notes: string): void => {
        if (editSlot) {
            setEditSlot({...editSlot, notes});
        } else {
            setEditSlot({
                id: `slot-${Date.now()}`,
                date: selectedDate?.dateString || '',
                startTime: '09:00',
                endTime: '17:00',
                isAllDay: false,
                isAvailable: true,
                notes
            });
        }
    };

    // Generate calendar
    const calendarDays = generateCalendarDays();

    // Handle back button
    const handleBack = (): void => {
        router.back();
    };

    // Function to format date for display
    const formatDisplayDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // Save availability settings
    const saveSettings = (): void => {
        // Implement API call to save settings
        alert('Pengaturan ketersediaan berhasil disimpan');
    };

    return (
        <WorkerLayout>
            <div className="min-h-screen bg-dark-bg text-dark-text">
                {/* Header */}
                <header className="bg-lightGray sticky top-0 z-10 border-b border-dark-border p-4">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="text-dark-textSecondary hover:text-white transition-colors"
                                aria-label="Kembali"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-lg font-display font-bold">Ketersediaan</h1>
                                <p className="text-dark-textSecondary text-sm">Atur jadwal dan ketersediaan Anda</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto p-4 md:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Calendar */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-display font-bold text-lg">{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={prevMonth}
                                                className="bg-lightGray p-1.5 rounded-md border border-dark-border hover:border-primary transition-colors"
                                                aria-label="Bulan sebelumnya"
                                            >
                                                <ArrowLeft className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={nextMonth}
                                                className="bg-lightGray p-1.5 rounded-md border border-dark-border hover:border-primary transition-colors"
                                                aria-label="Bulan berikutnya"
                                            >
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={goToCurrentMonth}
                                        className="text-primary hover:text-primary-light flex items-center gap-1 text-sm transition-colors"
                                        aria-label="Ke hari ini"
                                    >
                                        <Calendar className="h-4 w-4" />
                                        <span>Hari Ini</span>
                                    </button>
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-2">
                                    {/* Nama-nama hari */}
                                    {daysOfWeek.map((day, index) => (
                                        <div key={index} className="text-center text-dark-textSecondary font-medium py-2">
                                            {day}
                                        </div>
                                    ))}

                                    {/* Hari-hari dalam kalender */}
                                    {calendarDays.map((day, index) => (
                                        <div
                                            key={index}
                                            onClick={() => day.isCurrentMonth && handleDateClick(day)}
                                            className={`h-24 p-1.5 rounded-lg border ${
                                                !day.isCurrentMonth
                                                    ? 'bg-transparent border-transparent'
                                                    : day.isToday
                                                        ? 'bg-primary/10 border-primary'
                                                        : 'bg-lightGray border-dark-border hover:border-primary'
                                            } transition-colors ${day.isCurrentMonth ? 'cursor-pointer' : ''}`}
                                            role={day.isCurrentMonth ? "button" : undefined}
                                            aria-label={day.date ? `${day.date.getDate()} ${months[day.date.getMonth()]}` : undefined}
                                        >
                                            {day.date && (
                                                <>
                          <span className={`text-sm font-medium ${
                              day.isToday ? 'text-primary' : 'text-dark-text'
                          }`}>
                            {day.date.getDate()}
                          </span>

                                                    {/* Indikator Ketersediaan */}
                                                    {day.hasTimeSlots && (
                                                        <div className="mt-1 bg-green-900/30 text-green-400 text-xs px-1.5 py-0.5 rounded text-center">
                                                            Tersedia
                                                        </div>
                                                    )}

                                                    {/* Jadwal */}
                                                    <div className="mt-1 space-y-1">
                                                        {scheduledJobs
                                                            .filter(job => job.date === day.dateString)
                                                            .slice(0, 2)
                                                            .map(job => (
                                                                <div
                                                                    key={job.id}
                                                                    className={`text-xs px-1.5 py-0.5 rounded truncate ${
                                                                        job.type === 'job'
                                                                            ? 'bg-primary/20 text-primary'
                                                                            : 'bg-red-900/30 text-red-400'
                                                                    }`}
                                                                >
                                                                    {job.type === 'job'
                                                                        ? `${job.startTime} ${job.title.substring(0, 8)}...`
                                                                        : 'Tidak Tersedia'}
                                                                </div>
                                                            ))}

                                                        {day.dateString && scheduledJobs.filter(job => job.date === day.dateString).length > 2 && (
                                                            <div className="text-xs text-dark-textSecondary px-1.5">
                                                                +{scheduledJobs.filter(job => job.date === day.dateString).length - 2} lagi
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <h3 className="font-display font-bold text-lg mb-4">Keterangan</h3>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                                        <span className="text-sm">Hari Ini</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-green-900/30"></div>
                                        <span className="text-sm">Tersedia</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-primary/20"></div>
                                        <span className="text-sm">Jadwal Pekerjaan</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-red-900/30"></div>
                                        <span className="text-sm">Tidak Tersedia</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-dark-border">
                                    <p className="text-dark-textSecondary text-sm">
                                        Klik pada tanggal untuk mengatur ketersediaan Anda. Anda dapat menandai tanggal sebagai tersedia atau tidak tersedia.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Schedule List & Settings */}
                        <div className="space-y-6">
                            {/* Upcoming Schedule */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-display font-bold text-lg">Jadwal Mendatang</h3>
                                    <button
                                        className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-1 transition-colors"
                                        aria-label="Lihat semua jadwal"
                                    >
                                        Lihat Semua <ArrowUpRight className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {scheduledJobs
                                        .filter(job => new Date(job.date) >= new Date())
                                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                                        .slice(0, 5)
                                        .map(job => (
                                            <div key={job.id} className="bg-lightGray rounded-lg p-3 border border-dark-border">
                                                <div className="flex justify-between">
                                                    <h4 className="font-medium text-sm">{job.title}</h4>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                        job.type === 'job'
                                                            ? 'bg-blue-900/30 text-blue-400'
                                                            : 'bg-red-900/30 text-red-400'
                                                    }`}>
                            {job.type === 'job' ? 'Pekerjaan' : 'Cuti'}
                          </span>
                                                </div>

                                                {job.type === 'job' && job.customer && (
                                                    <p className="text-dark-textSecondary text-xs mt-1">
                                                        {job.customer}
                                                    </p>
                                                )}

                                                <div className="flex mt-2 text-xs text-dark-textSecondary">
                                                    <div className="flex items-center gap-1 mr-4">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{formatDisplayDate(job.date)}</span>
                                                    </div>

                                                    {!job.allDay && job.startTime && job.endTime && (
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            <span>{job.startTime} - {job.endTime}</span>
                                                        </div>
                                                    )}

                                                    {job.allDay && (
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            <span>Seharian</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                    {scheduledJobs.filter(job => new Date(job.date) >= new Date()).length === 0 && (
                                        <div className="bg-lightGray rounded-lg p-4 border border-dashed border-dark-border text-center">
                                            <Calendar className="h-8 w-8 mx-auto text-dark-textSecondary" />
                                            <p className="text-dark-textSecondary mt-2">Tidak ada jadwal mendatang</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Availability Settings */}
                            <div className="bg-dark-card rounded-xl shadow-card border border-dark-border p-5">
                                <h3 className="font-display font-bold text-lg mb-4">Pengaturan Ketersediaan</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Hari Kerja Default</label>
                                        <div className="grid grid-cols-7 gap-1">
                                            {daysOfWeek.map((day, index) => (
                                                <button
                                                    key={day}
                                                    className={`text-xs py-2 rounded ${
                                                        index === 0 || index === 6
                                                            ? 'bg-dark-bg border border-dark-border text-dark-textSecondary'
                                                            : 'bg-primary/10 border border-primary text-primary'
                                                    }`}
                                                    aria-label={`Hari kerja ${day}`}
                                                    aria-pressed={!(index === 0 || index === 6)}
                                                >
                                                    {day}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="startTime" className="block text-sm font-medium mb-2">Jam Kerja Default</label>
                                        <div className="flex items-center gap-3">
                                            <div className="relative flex-1">
                                                <select
                                                    id="startTime"
                                                    className="bg-lightGray border border-dark-border rounded-lg py-2 px-3 w-full appearance-none focus:border-primary outline-none"
                                                    aria-label="Jam mulai"
                                                >
                                                    <option value="09:00">09:00</option>
                                                    <option value="10:00">10:00</option>
                                                    <option value="08:00">08:00</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-dark-textSecondary pointer-events-none" />
                                            </div>
                                            <span className="text-dark-textSecondary">-</span>
                                            <div className="relative flex-1">
                                                <select
                                                    id="endTime"
                                                    className="bg-lightGray border border-dark-border rounded-lg py-2 px-3 w-full appearance-none focus:border-primary outline-none"
                                                    aria-label="Jam selesai"
                                                >
                                                    <option value="17:00">17:00</option>
                                                    <option value="16:00">16:00</option>
                                                    <option value="18:00">18:00</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-dark-textSecondary pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="bookingInterval" className="block text-sm font-medium mb-2">Interval Booking</label>
                                        <div className="relative">
                                            <select
                                                id="bookingInterval"
                                                className="bg-lightGray border border-dark-border rounded-lg py-2 px-3 w-full appearance-none focus:border-primary outline-none"
                                                aria-label="Interval booking"
                                            >
                                                <option value="60">1 jam</option>
                                                <option value="30">30 menit</option>
                                                <option value="120">2 jam</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-dark-textSecondary pointer-events-none" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Atur Setelan Lanjutan</label>
                                        <button
                                            className="w-full bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                                            aria-label="Pengaturan lanjutan"
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>Pengaturan Lanjutan</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-dark-border">
                                    <button
                                        onClick={saveSettings}
                                        className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg transition-colors shadow-button flex items-center justify-center gap-2"
                                        aria-label="Simpan pengaturan"
                                    >
                                        <Save className="h-4 w-4" />
                                        <span>Simpan Pengaturan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Time Slot Modal */}
                {showTimeModal && selectedDate && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        role="dialog"
                        aria-labelledby="timeSlotModalTitle"
                    >
                        <div className="bg-dark-card rounded-xl shadow-card border border-dark-border w-full max-w-md p-6 m-4">
                            <div className="flex justify-between items-center mb-6">
                                <h3 id="timeSlotModalTitle" className="font-display font-bold text-lg">
                                    {editSlot ? 'Edit Ketersediaan' : 'Tambah Ketersediaan'}
                                </h3>
                                <button
                                    onClick={() => {
                                        setShowTimeModal(false);
                                        setEditSlot(null);
                                    }}
                                    className="text-dark-textSecondary hover:text-white"
                                    aria-label="Tutup"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block font-medium mb-2">Tanggal</label>
                                    <div className="bg-lightGray border border-dark-border rounded-lg px-4 py-3">
                                        {formatDate(selectedDate.date)}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isAvailable"
                                            className="w-4 h-4"
                                            checked={editSlot ? editSlot.isAvailable : true}
                                            onChange={(e) => handleCheckboxChange('isAvailable', e.target.checked)}
                                        />
                                        <label htmlFor="isAvailable" className="ml-2">Tersedia</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isAllDay"
                                            className="w-4 h-4"
                                            checked={editSlot ? editSlot.isAllDay : false}
                                            onChange={(e) => handleCheckboxChange('isAllDay', e.target.checked)}
                                        />
                                        <label htmlFor="isAllDay" className="ml-2">Seharian</label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-medium mb-2">Jam Ketersediaan</label>
                                    {!(editSlot && editSlot.isAllDay) && (
                                        <div className="flex items-center gap-3">
                                            <div className="relative flex-1">
                                                <select
                                                    className="bg-lightGray border border-dark-border rounded-lg py-2 px-3 w-full appearance-none focus:border-primary outline-none"
                                                    value={editSlot ? editSlot.startTime : "09:00"}
                                                    onChange={(e) => setEditSlot(prev => prev ? {...prev, startTime: e.target.value} : {
                                                        id: `slot-${Date.now()}`,
                                                        date: selectedDate?.dateString || '',
                                                        startTime: e.target.value,
                                                        endTime: "17:00",
                                                        isAllDay: false,
                                                        isAvailable: true
                                                    })}
                                                    aria-label="Jam mulai"
                                                >
                                                    {Array.from({length: 12}, (_, i) => i + 8).map(hour => (
                                                        <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                                            {hour.toString().padStart(2, '0')}:00
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-dark-textSecondary pointer-events-none" />
                                            </div>
                                            <span className="text-dark-textSecondary">-</span>
                                            <div className="relative flex-1">
                                                <select
                                                    className="bg-lightGray border border-dark-border rounded-lg py-2 px-3 w-full appearance-none focus:border-primary outline-none"
                                                    value={editSlot ? editSlot.endTime : "17:00"}
                                                    onChange={(e) => setEditSlot(prev => prev ? {...prev, endTime: e.target.value} : {
                                                        id: `slot-${Date.now()}`,
                                                        date: selectedDate?.dateString || '',
                                                        startTime: "09:00",
                                                        endTime: e.target.value,
                                                        isAllDay: false,
                                                        isAvailable: true
                                                    })}
                                                    aria-label="Jam selesai"
                                                >
                                                    {Array.from({length: 12}, (_, i) => i + 9).map(hour => (
                                                        <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                                            {hour.toString().padStart(2, '0')}:00
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-dark-textSecondary pointer-events-none" />
                                            </div>
                                        </div>
                                    )}
                                    {(editSlot && editSlot.isAllDay) && (
                                        <div className="bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-dark-textSecondary">
                                            Seharian (00:00 - 23:59)
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="notes" className="block font-medium mb-2">Catatan (Opsional)</label>
                                    <textarea
                                        id="notes"
                                        className="bg-lightGray border border-dark-border rounded-lg px-4 py-3 w-full focus:border-primary outline-none resize-none h-20"
                                        placeholder="Tambahkan catatan atau keterangan tambahan..."
                                        value={editSlot?.notes || ""}
                                        onChange={(e) => handleNotesChange(e.target.value)}
                                        aria-label="Catatan tambahan"
                                    ></textarea>
                                </div>

                                <div className="pt-4 border-t border-dark-border flex justify-between">
                                    {editSlot && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (editSlot?.id) {
                                                    deleteTimeSlot(editSlot.id);
                                                    setShowTimeModal(false);
                                                    setEditSlot(null);
                                                }
                                            }}
                                            className="bg-dark-bg border border-dark-border hover:border-red-500 text-dark-textSecondary hover:text-red-500 px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                                            aria-label="Hapus ketersediaan"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span>Hapus</span>
                                        </button>
                                    )}

                                    <div className="flex gap-3 ml-auto">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowTimeModal(false);
                                                setEditSlot(null);
                                            }}
                                            className="bg-dark-bg border border-dark-border hover:border-primary text-dark-textSecondary hover:text-primary px-4 py-2.5 rounded-lg transition-colors"
                                            aria-label="Batal"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={addTimeSlot}
                                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg transition-colors shadow-button flex items-center gap-2"
                                            aria-label={editSlot ? "Perbarui ketersediaan" : "Simpan ketersediaan"}
                                        >
                                            <Save className="h-4 w-4" />
                                            <span>{editSlot ? 'Perbarui' : 'Simpan'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Add Button (Floating) */}
                <button
                    onClick={() => {
                        const today = new Date();
                        const todayString = today.toISOString().split('T')[0];
                        setSelectedDate({
                            date: today,
                            isCurrentMonth: true,
                            isToday: true,
                            dateString: todayString,
                            hasTimeSlots: timeSlots.some(slot => slot.date === todayString)
                        });
                        setShowTimeModal(true);
                    }}
                    className="fixed bottom-6 right-6 bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-button transition-colors"
                    aria-label="Tambah ketersediaan baru"
                >
                    <Plus className="h-6 w-6" />
                </button>
            </div>
        </WorkerLayout>
    );
};

export default AvailabilityPage;