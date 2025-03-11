// src/components/layout/WorkerLayout.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Bell,
    Calendar,
    ChevronDown,
    ClipboardList,
    DollarSign,
    HelpCircle,
    LogOut,
    Menu,
    MessageCircle,
    Moon,
    Search,
    Settings,
    User,
    X
} from 'lucide-react';

interface WorkerLayoutProps {
    children: React.ReactNode;
}

const WorkerLayout: React.FC<WorkerLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const isActive = (path: string) => {
        return pathname?.startsWith(path);
    };

    // Data dummy untuk notifikasi
    const notifications = [
        {
            id: 'notif-001',
            title: 'Pekerjaan baru tersedia',
            message: 'Ada permintaan pekerjaan baru yang cocok dengan keahlian Anda',
            time: '10 menit yang lalu',
            read: false,
            type: 'job'
        },
        {
            id: 'notif-002',
            title: 'Pesan baru dari Budi Santoso',
            message: 'Apakah sudah ada perkembangan dengan monitor saya?',
            time: '1 jam yang lalu',
            read: false,
            type: 'message'
        },
        {
            id: 'notif-003',
            title: 'Pembayaran diterima',
            message: 'Pembayaran DP sebesar Rp 375.000 telah diterima',
            time: '3 jam yang lalu',
            read: true,
            type: 'payment'
        },
        {
            id: 'notif-004',
            title: 'Tenggat waktu besok',
            message: 'Pekerjaan "Perbaikan AC Panasonic" jatuh tempo besok',
            time: '5 jam yang lalu',
            read: true,
            type: 'deadline'
        }
    ];

    // Navigasi sidebar untuk worker portal
    const navigation = [
        {
            name: 'Beranda',
            href: '/worker-portal',
            icon: BarChart3
        },
        {
            name: 'Pekerjaan',
            href: '/worker-portal/jobs',
            icon: ClipboardList
        },
        {
            name: 'Pesan',
            href: '/worker-portal/messages',
            icon: MessageCircle,
            badge: 3
        },
        {
            name: 'Penghasilan',
            href: '/worker-portal/earnings',
            icon: DollarSign
        },
        {
            name: 'Ketersediaan',
            href: '/worker-portal/availability',
            icon: Calendar
        },
        {
            name: 'Garansi',
            href: '/worker-portal/warranty',
            icon: Calendar,
            badge: 1
        },
        {
            name: 'Profil',
            href: '/worker-portal/profile',
            icon: User
        },
        {
            name: 'Pengaturan',
            href: '/worker-portal/settings',
            icon: Settings
        }
    ];

    return (
        <div className="min-h-screen bg-dark-bg text-dark-text">
            {/* Header */}
            <header className="bg-lightGray sticky top-0 z-20 border-b border-dark-border">
                <div className="px-4 flex h-16 items-center justify-between">
                    {/* Logo dan Toggle Mobile Menu */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 text-dark-textSecondary hover:text-white"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <Link href="/worker-portal" className="flex items-center gap-2">
                            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                                <span className="font-bold text-white">SS</span>
                            </div>
                            <h1 className="text-xl font-display font-bold hidden md:block">SuruhSuruh</h1>
                        </Link>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:block flex-1 max-w-lg mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari pekerjaan, pelanggan..."
                                className="bg-lightGray rounded-xl py-2 px-4 pl-10 w-full border border-dark-border focus:border-primary outline-none"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-textSecondary" />
                        </div>
                    </div>

                    {/* Header Actions */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                className="relative"
                                onClick={() => {
                                    setNotificationsOpen(!notificationsOpen);
                                    setUserMenuOpen(false);
                                }}
                            >
                                <Bell className="h-6 w-6" />
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white rounded-full text-xs flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
                            </button>

                            {/* Notifications Dropdown */}
                            {notificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-dark-card rounded-xl shadow-card border border-dark-border overflow-hidden">
                                    <div className="p-4 border-b border-dark-border flex justify-between items-center">
                                        <h3 className="font-display font-bold">Notifikasi</h3>
                                        <button className="text-primary hover:text-primary-light text-sm">
                                            Tandai semua dibaca
                                        </button>
                                    </div>

                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map(notification => (
                                            <div
                                                key={notification.id}
                                                className={`p-3 border-b border-dark-border hover:bg-lightGray transition-colors cursor-pointer ${
                                                    !notification.read ? 'bg-secondary/30' : ''
                                                }`}
                                            >
                                                <div className="flex gap-3">
                                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                        notification.type === 'job'
                                                            ? 'bg-blue-900/30 text-blue-400'
                                                            : notification.type === 'message'
                                                                ? 'bg-primary/20 text-primary'
                                                                : notification.type === 'payment'
                                                                    ? 'bg-green-900/30 text-green-400'
                                                                    : 'bg-amber-900/30 text-amber-400'
                                                    }`}>
                                                        {notification.type === 'job' && <ClipboardList className="h-4 w-4" />}
                                                        {notification.type === 'message' && <MessageCircle className="h-4 w-4" />}
                                                        {notification.type === 'payment' && <DollarSign className="h-4 w-4" />}
                                                        {notification.type === 'deadline' && <Calendar className="h-4 w-4" />}
                                                    </div>

                                                    <div>
                                                        <h4 className="font-medium text-sm">{notification.title}</h4>
                                                        <p className="text-dark-textSecondary text-xs mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-dark-textSecondary text-xs mt-1">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-3 text-center">
                                        <button className="text-primary hover:text-primary-light text-sm">
                                            Lihat semua notifikasi
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                className="flex items-center gap-2"
                                onClick={() => {
                                    setUserMenuOpen(!userMenuOpen);
                                    setNotificationsOpen(false);
                                }}
                            >
                                <div className="relative">
                                    <img
                                        alt="User"
                                        className="h-10 w-10 rounded-full border-2 border-primary"
                                    />
                                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-secondary"></span>
                                </div>
                                <div className="hidden md:block">
                                    <span className="text-sm font-medium">Budi Setiawan</span>
                                    <div className="flex items-center text-dark-textSecondary text-xs">
                                        <span>Teknisi</span>
                                        <ChevronDown className="h-3 w-3 ml-1" />
                                    </div>
                                </div>
                            </button>

                            {/* User Dropdown */}
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-dark-card rounded-xl shadow-card border border-dark-border overflow-hidden">
                                    <div className="p-4 border-b border-dark-border text-center">
                                        <div className="flex justify-center">
                                            <img
                                                alt="User"
                                                className="h-16 w-16 rounded-full border-2 border-primary"
                                            />
                                        </div>
                                        <h3 className="font-medium mt-2">Budi Setiawan</h3>
                                        <p className="text-dark-textSecondary text-xs">budi.setiawan@email.com</p>
                                    </div>

                                    <div className="py-2">
                                        <Link
                                            href="/worker-portal/profile"
                                            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-lightGray transition-colors"
                                        >
                                            <User className="h-4 w-4" />
                                            <span>Profil Saya</span>
                                        </Link>
                                        <Link
                                            href="/worker-portal/settings"
                                            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-lightGray transition-colors"
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>Pengaturan</span>
                                        </Link>
                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-lightGray transition-colors">
                                            <Moon className="h-4 w-4" />
                                            <span>Dark Mode</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-lightGray transition-colors">
                                            <HelpCircle className="h-4 w-4" />
                                            <span>Bantuan</span>
                                        </button>
                                        <div className="border-t border-dark-border mt-2 pt-2">
                                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-red-500 hover:bg-lightGray transition-colors">
                                                <LogOut className="h-4 w-4" />
                                                <span>Keluar</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Search Bar - Mobile */}
                <div className="p-3 md:hidden">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari..."
                            className="bg-lightGray rounded-xl py-2 px-4 pl-10 w-full border border-dark-border focus:border-primary outline-none"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-textSecondary" />
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${
                    mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setMobileMenuOpen(false)}
            ></div>

            <div className={`fixed top-0 left-0 h-full w-64 bg-lightGray border-r border-dark-border z-40 transform transition-transform duration-300 md:hidden ${
                mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex justify-between items-center p-4 border-b border-dark-border">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                            <span className="font-bold text-white">SS</span>
                        </div>
                        <h1 className="text-xl font-display font-bold">SuruhSuruh</h1>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-dark-textSecondary"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-4">
                    <div className="flex items-center gap-3 p-3 bg-lightGray rounded-lg">
                        <img
                            alt="User"
                            className="h-10 w-10 rounded-full border-2 border-primary"
                        />
                        <div>
                            <h3 className="font-medium">Budi Setiawan</h3>
                            <p className="text-dark-textSecondary text-xs">Teknisi</p>
                        </div>
                    </div>
                </div>

                <nav className="p-3 ">
                    <ul className="space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                                        isActive(item.href)
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-dark-textSecondary hover:text-dark-text hover:bg-lightGray'
                                    } transition-colors`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                    {item.badge && (
                                        <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                                            isActive(item.href)
                                                ? 'bg-primary/20 text-primary'
                                                : 'bg-dark-border text-dark-textSecondary'
                                        }`}>
                      {item.badge}
                    </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 pt-6 border-t border-dark-border">
                        <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-lightGray w-full">
                            <LogOut className="h-5 w-5" />
                            <span>Keluar</span>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main Layout */}
            <div className="flex">
                {/* Desktop Sidebar */}
                <div className="hidden md:block w-64 min-h-[calc(100vh-4rem)] bg-lightGray border-r border-dark-border">
                    <nav className="p-3 sticky top-16">
                        <ul className="space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                                            isActive(item.href)
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-dark-textSecondary hover:text-dark-text hover:bg-lightGray'
                                        } transition-colors`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                        {item.badge && (
                                            <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                                                isActive(item.href)
                                                    ? 'bg-primary/20 text-primary'
                                                    : 'bg-dark-border text-dark-textSecondary'
                                            }`}>
                        {item.badge}
                      </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 pt-6 border-t border-dark-border">
                            <div className="px-3 py-4 bg-lightGray rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <HelpCircle className="h-5 w-5 text-primary" />
                                    <h3 className="font-medium text-sm">Butuh Bantuan?</h3>
                                </div>
                                <p className="text-dark-textSecondary text-xs">
                                    Jika Anda memiliki pertanyaan atau masalah, tim kami siap membantu Anda.
                                </p>
                                <button className="w-full bg-primary/10 text-primary text-sm px-3 py-1.5 rounded-lg mt-3 hover:bg-primary/20 transition-colors">
                                    Hubungi Support
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <main className="flex-1 min-h-[calc(100vh-4rem)]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default WorkerLayout;