// src/components/dashboard/TopNav.tsx
import { useState } from 'react';
import Link from 'next/link';
import {
    Bell,
    Menu,
    Search,
    MessageCircle,
    User,
    LogOut,
    Settings,
    X,
    ChevronDown,
    Calendar,
    LayoutGrid
} from 'lucide-react';

interface TopNavProps {
    toggleSidebar: () => void;
    isSidebarCollapsed?: boolean;
}

export default function TopNav({ toggleSidebar, isSidebarCollapsed = false }: TopNavProps) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
        if (showNotifications) setShowNotifications(false);
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (showUserMenu) setShowUserMenu(false);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    // Current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="bg-dark-card border-b border-dark-border sticky top-0 z-10 shadow-sm">
            <div className="flex items-center justify-between p-4">
                {/* Left: Menu button and page title */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 rounded-md hover:bg-dark-bg transition-colors text-gray-400 hover:text-dark-text"
                        title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <div className="hidden md:block">
                        <h1 className="text-lg font-semibold text-dark-text">Dashboard</h1>
                        <p className="text-sm text-gray-400">{formattedDate}</p>
                    </div>
                </div>

                {/* Center: Search Bar (tablet and up) */}
                <div className="hidden md:flex relative mx-4 flex-1 max-w-md">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="bg-dark-bg border border-dark-border text-dark-text text-sm rounded-lg w-full pl-10 p-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            placeholder="Cari pesanan, pesan, atau pembayaran..."
                        />
                    </div>
                </div>

                {/* Right: Actions and User Profile */}
                <div className="flex items-center space-x-3">
                    {/* Create Order Button (desktop only) */}
                    <Link
                        href="/services"
                        className="hidden lg:flex items-center px-4 py-2 bg-primary text-dark-text rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        <span className="text-sm font-medium">Pesan Baru</span>
                    </Link>

                    {/* Quick actions button (desktop only) */}
                    <div className="hidden md:block relative">
                        <button className="p-2 rounded-lg bg-dark-bg hover:bg-dark-border transition-colors text-gray-400 hover:text-dark-text">
                            <LayoutGrid className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Calendar/Schedule button (desktop only) */}
                    <div className="hidden lg:block relative">
                        <button className="p-2 rounded-lg bg-dark-bg hover:bg-dark-border transition-colors text-gray-400 hover:text-dark-text">
                            <Calendar className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={toggleNotifications}
                            className="p-2 rounded-lg bg-dark-bg hover:bg-dark-border transition-colors text-gray-400 hover:text-dark-text relative"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-dark-card">
                3
              </span>
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-dark-card rounded-lg shadow-lg border border-dark-border overflow-hidden z-20">
                                <div className="p-3 border-b border-dark-border flex justify-between items-center">
                                    <h3 className="font-semibold text-dark-text">Notifikasi</h3>
                                    <button className="text-xs text-primary">Tandai semua dibaca</button>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    <div className="p-3 border-b border-dark-border/50 hover:bg-dark-bg cursor-pointer bg-dark-bg/80">
                                        <div className="flex">
                                            <div className="flex-shrink-0 bg-blue-500/20 text-blue-500 rounded-full p-2 mr-3">
                                                <Bell className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-dark-text">Pembayaran Diterima</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Pembayaran DP untuk Pengerjaan Skripsi telah diterima
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">2 jam yang lalu</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 border-b border-dark-border/50 hover:bg-dark-bg cursor-pointer">
                                        <div className="flex">
                                            <div className="flex-shrink-0 bg-green-500/20 text-green-500 rounded-full p-2 mr-3">
                                                <MessageCircle className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-dark-text">Update Progress</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Arif telah menambahkan update progres terbaru untuk perbaikan laptop Anda
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">5 jam yang lalu</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 hover:bg-dark-bg cursor-pointer">
                                        <div className="flex">
                                            <div className="flex-shrink-0 bg-purple-500/20 text-purple-500 rounded-full p-2 mr-3">
                                                <MessageCircle className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-dark-text">Pesan Baru</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Anda memiliki pesan baru dari Budi terkait pengerjaan skripsi
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">Kemarin</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 border-t border-dark-border text-center">
                                    <Link href="/dashboard/notifications" className="text-sm text-primary">
                                        Lihat semua notifikasi
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Messages */}
                    <Link
                        href="/dashboard/messages"
                        className="p-2 rounded-lg bg-dark-bg hover:bg-dark-border transition-colors text-gray-400 hover:text-dark-text relative"
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-dark-card">
              5
            </span>
                    </Link>

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={toggleUserMenu}
                            className="flex items-center space-x-1 focus:outline-none p-1 rounded-lg hover:bg-dark-bg transition-colors"
                        >
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <span className="text-sm font-medium">AP</span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400 hidden md:block" />
                        </button>

                        {/* User Dropdown Menu */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-dark-card rounded-lg shadow-lg overflow-hidden z-20 border border-dark-border">
                                <div className="p-4 border-b border-dark-border">
                                    <p className="font-medium text-dark-text">Ananda Putra</p>
                                    <p className="text-xs text-gray-400 mt-1">ananda@example.com</p>
                                    <div className="mt-2 pt-2 border-t border-dark-border/50">
                                        <p className="text-xs text-gray-400">Account ID: #US25789</p>
                                    </div>
                                </div>
                                <div>
                                    <Link
                                        href="/dashboard/profile"
                                        className="flex items-center gap-2 p-3 hover:bg-dark-bg text-sm text-gray-300 hover:text-dark-text"
                                    >
                                        <User className="h-4 w-4" />
                                        Profil Saya
                                    </Link>
                                    <Link
                                        href="/dashboard/settings"
                                        className="flex items-center gap-2 p-3 hover:bg-dark-bg text-sm text-gray-300 hover:text-dark-text"
                                    >
                                        <Settings className="h-4 w-4" />
                                        Pengaturan
                                    </Link>
                                    <div className="p-3 border-t border-dark-border/50">
                                        <button className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 w-full text-left">
                                            <LogOut className="h-4 w-4" />
                                            Keluar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-lg bg-dark-bg hover:bg-dark-border transition-colors text-gray-400 hover:text-dark-text"
                        onClick={toggleMobileMenu}
                    >
                        {showMobileMenu ? <X className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {showMobileMenu && (
                <div className="md:hidden bg-dark-bg border-t border-dark-border p-4 space-y-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="bg-dark-card border border-dark-border text-dark-text text-sm rounded-lg w-full pl-10 p-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            placeholder="Cari..."
                        />
                    </div>
                    <Link
                        href="/services"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary text-dark-text rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        <span className="text-sm font-medium">Pesan Layanan Baru</span>
                    </Link>
                </div>
            )}
        </header>
    );
}