"use client";
import { ReactNode, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { siteConfig } from '@/config/site';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

const AdminLayout = ({ children, title = 'Dashboard Admin' }: AdminLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const pageTitle = `${title} | ${siteConfig.name}`;

    // Menu items with icons
    const menuItems = [
        {
            title: 'Dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
            ),
            href: '/admin',
        },
        {
            title: 'Pesanan',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
            ),
            href: '/admin/pesanan',
        },
        {
            title: 'Worker',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
            ),
            href: '/admin/worker',
        },
        {
            title: 'Keuangan',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
            ),
            href: '/admin/keuangan',
        },
        {
            title: 'Pengguna',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
            ),
            href: '/admin/pengguna',
        },
        {
            title: 'Pengaturan',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
            ),
            href: '/admin/pengaturan',
        }
    ];

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content="Admin Dashboard SuruhSuruh" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen bg-dark-bg flex">
                {/* Sidebar - Fixed position for mobile */}
                <aside
                    className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark-bg transform transition-transform duration-300 lg:translate-x-0 ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:w-64 lg:flex-shrink-0 overflow-y-auto`}
                >
                    <div className="h-full flex flex-col">
                        {/* Sidebar Header */}
                        <div className="h-16 flex items-center justify-between px-4 border-b ">
                            <Link href="/admin" className="flex items-center">
                                <span className="text-xl font-bold font-display text-white">
                                    suruh<span className="text-amber-500">suruh</span>
                                </span>
                            </Link>

                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="lg:hidden text-gray-400 hover:text-amber-500 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Sidebar Navigation */}
                        <nav className="flex-1 py-4 px-2">
                            <ul className="space-y-1">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="flex items-center space-x-3 py-2 px-4 rounded-md text-gray-200 hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
                                        >
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Sidebar Footer */}
                        <div className="border-t border-dark-bg p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                                    <span className="text-amber-500 font-medium">A</span>
                                </div>
                                <div>
                                    <p className="text-gray-200 font-medium">Admin SuruhSuruh</p>
                                    <p className="text-gray-400 text-sm">admin@suruhsuruh.id</p>
                                </div>
                            </div>
                            <div className="mt-4">

                            </div>
                        </div>
                    </div>
                </aside>

                {/* Mobile menu button - Fixed at the top */}
                <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-dark-bg border-b  py-3 px-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-300 hover:text-amber-500 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <Link href="/admin" className="flex items-center">
                            <span className="text-xl font-bold font-display text-white">
                                suruh<span className="text-amber-500">suruh</span>
                            </span>
                        </Link>

                        <div className="relative">
                            <button className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                                <span className="text-amber-500 font-medium text-sm">A</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="hidden lg:flex h-16 items-center justify-between px-6 border-b border-gray-800 bg-dark-bg">
                        <h1 className="text-xl font-bold text-white">{title}</h1>

                        <div className="flex items-center space-x-6">
                            {/* Notifications */}
                            <button className="text-gray-400 hover:text-amber-500 relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-500"></span>
                            </button>

                            {/* Profile */}
                            <div className="relative">
                                <button className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                                        <span className="text-amber-500 font-medium text-sm">A</span>
                                    </div>
                                    <span className="text-white font-medium">Admin</span>
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <main className="flex-1 p-6 lg:pt-6 pt-20 bg-dark-bg">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;