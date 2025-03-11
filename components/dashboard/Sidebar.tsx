// src/components/dashboard/Sidebar.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    MessageCircle,
    CreditCard,
    Settings,
    LogOut,
    User,
    ChevronDown,
    ShoppingBag,
} from 'lucide-react';

interface SidebarProps {
    isCollapsed?: boolean;
}

export default function Sidebar({ isCollapsed = false }: SidebarProps) {
    const pathname = usePathname();
    const [isOrdersOpen, setIsOrdersOpen] = useState(true);

    // Reset dropdown state when sidebar is collapsed
    useEffect(() => {
        if (isCollapsed) {
            setIsOrdersOpen(false);
        }
    }, [isCollapsed]);

    // Nav items configuration
    const navItems = [
        {
            title: 'Dashboard',
            icon: <LayoutDashboard size={20} />,
            href: '/dashboard',
            badge: null
        },
        {
            title: 'Services',
            icon: <FileText size={20} />,
            href: '/dashboard/services',
            badge: null
        },
        {
            title: 'Orders',
            icon: <ShoppingBag size={20} />,
            href: '/dashboard/orders',
            badge: 3,
            subItems: [
                { title: 'All Orders', href: '/dashboard/orders' },
                { title: 'Active Orders', href: '/dashboard/orders/active' },
                { title: 'Completed Orders', href: '/dashboard/orders/completed' },
            ]
        },
        {
            title: 'Messages',
            icon: <MessageCircle size={20} />,
            href: '/dashboard/messages',
            badge: 5
        },
        {
            title: 'Payments',
            icon: <CreditCard size={20} />,
            href: '/dashboard/payments',
            badge: null
        },
        {
            title: 'Profile',
            icon: <User size={20} />,
            href: '/dashboard/profile',
            badge: null
        },
        {
            title: 'Settings',
            icon: <Settings size={20} />,
            href: '/dashboard/settings',
            badge: null
        },
    ];

    // Check if path is active
    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return pathname === path;
        }
        return pathname?.startsWith(path);
    };

    return (
        <div className="h-full flex flex-col bg-dark-card">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 px-6 border-b border-dark-border">
                <Link href="/" className="flex items-center">
                    {isCollapsed ? (
                        <span className="text-2xl font-bold font-display text-primary">S</span>
                    ) : (
                        <span className="text-2xl font-bold font-display">
              suruh<span className="text-primary">suruh.id</span>
            </span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="space-y-1">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            {!item.subItems ? (
                                <Link
                                    href={item.href}
                                    className={`
                    flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                    ${isActive(item.href)
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-dark-textSecondary hover:bg-dark-bg hover:text-dark-text'
                                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                                    title={isCollapsed ? item.title : ''}
                                >
                                    <span className={`${isCollapsed ? '' : 'mr-3'}`}>{item.icon}</span>
                                    {!isCollapsed && <span>{item.title}</span>}

                                    {/* Badge */}
                                    {!isCollapsed && item.badge && (
                                        <span className="ml-auto bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                                    )}

                                    {/* Collapsed badge shows on hover */}
                                    {isCollapsed && item.badge && (
                                        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                      {item.badge}
                    </span>
                                    )}
                                </Link>
                            ) : (
                                <div>
                                    <button
                                        onClick={() => !isCollapsed && setIsOrdersOpen(!isOrdersOpen)}
                                        className={`
                      flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                      ${isActive(item.href)
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-dark-textSecondary hover:bg-dark-bg hover:text-dark-text'
                                        }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                                        title={isCollapsed ? item.title : ''}
                                    >
                                        <div className="flex items-center">
                                            <span className={`${isCollapsed ? '' : 'mr-3'}`}>{item.icon}</span>
                                            {!isCollapsed && <span>{item.title}</span>}
                                        </div>

                                        {/* Badge */}
                                        {!isCollapsed && item.badge && (
                                            <span className="bg-red-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                                        )}

                                        {/* Collapsed badge shows on hover */}
                                        {isCollapsed && item.badge && (
                                            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                        {item.badge}
                      </span>
                                        )}

                                        {!isCollapsed && (
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform duration-200 ${isOrdersOpen ? 'rotate-180' : ''}`}
                                            />
                                        )}
                                    </button>

                                    {!isCollapsed && isOrdersOpen && (
                                        <ul className="mt-1 ml-6 space-y-1 border-l border-dark-border pl-3">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        href={subItem.href}
                                                        className={`
                              flex items-center px-4 py-2 text-sm font-medium rounded-lg 
                              ${pathname === subItem.href
                                                            ? 'text-primary'
                                                            : 'text-dark-textSecondary hover:text-dark-text'
                                                        }
                            `}
                                                    >
                                                        {subItem.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* User Profile & Logout */}
            <div className={`p-4 border-t border-dark-border ${isCollapsed ? 'text-center' : ''}`}>
                {!isCollapsed ? (
                    <div className="flex items-center">
                        <div className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <span className="font-medium">AP</span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-dark-text">Ananda Putra</p>
                            <p className="text-xs text-dark-textSecondary">ananda@example.com</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="relative w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <span className="font-medium">AP</span>
                        </div>
                    </div>
                )}

                <button className={`mt-4 flex items-center ${isCollapsed ? 'justify-center mx-auto' : 'w-full'} px-4 py-2 text-sm font-medium rounded-lg text-dark-textSecondary hover:bg-dark-bg hover:text-red-500 transition-colors`}>
                    <LogOut size={18} className={isCollapsed ? '' : 'mr-2'} />
                    {!isCollapsed && <span>Sign Out</span>}
                </button>
            </div>
        </div>
    );
}