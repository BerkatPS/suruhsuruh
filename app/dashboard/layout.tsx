// src/app/dashboard/layout.tsx
"use client";

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopNav from '@/components/dashboard/TopNav';

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Handle responsive behavior
    useEffect(() => {
        const checkScreenSize = () => {
            const isMobileView = window.innerWidth < 1024;
            setIsMobile(isMobileView);

            if (isMobileView) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        // Initial check
        checkScreenSize();

        // Add event listener
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleSidebar = () => {
        if (isMobile) {
            setSidebarOpen(!isSidebarOpen);
        } else {
            setIsSidebarCollapsed(!isSidebarCollapsed);
        }
    };

    return (
        <div className="flex h-screen bg-dark-bg overflow-hidden">
            {/* Sidebar - Collapsed on desktop, Hidden on mobile */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out
          ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          ${isSidebarCollapsed && !isMobile ? 'w-20' : 'w-64'}
          lg:relative`}
            >
                <Sidebar isCollapsed={isSidebarCollapsed && !isMobile} />
            </aside>

            {/* Overlay for mobile */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300
        ${isMobile ? 'w-full' : (isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64')}`}
            >
                <TopNav
                    toggleSidebar={toggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed && !isMobile}
                />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="container mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}