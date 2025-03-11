// src/app/dashboard/settings/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    User,
    Bell,
    Shield,
    CreditCard,
    LogOut,
    Lock,
    Eye,
    EyeOff,
    Smartphone,
    Globe,
    MessageSquare,
    Mail
} from 'lucide-react';

// Mock user settings
const mockUserSettings = {
    notifications: {
        email: {
            orderUpdates: true,
            promotions: false,
            newServices: true,
            newsletter: false
        },
        pushNotifications: {
            orderUpdates: true,
            messages: true,
            paymentReminders: true,
            promotions: false
        }
    },
    privacy: {
        profileVisibility: 'public',
        shareOrderHistory: false,
        allowMarketingTracking: true
    },
    security: {
        twoFactorAuth: false,
        loginNotifications: true,
        recentDevices: [
            {
                device: 'Chrome on Windows',
                ip: '114.122.xxx.xxx',
                location: 'Jakarta, Indonesia',
                lastActive: '2025-03-06T14:30:00'
            },
            {
                device: 'Safari on iPhone',
                ip: '114.122.xxx.xxx',
                location: 'Jakarta, Indonesia',
                lastActive: '2025-03-05T09:15:00'
            }
        ]
    },
    preferences: {
        language: 'id',
        currency: 'IDR',
        theme: 'dark'
    }
};

export default function SettingsPage() {
    const [settings, setSettings] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('account');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setSettings(mockUserSettings);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const toggleNotification = (category: string, name: string) => {
        setSettings({
            ...settings,
            notifications: {
                ...settings.notifications,
                [category]: {
                    ...settings.notifications[category],
                    [name]: !settings.notifications[category][name]
                }
            }
        });
    };

    const handlePrivacyChange = (name: string, value: any) => {
        setSettings({
            ...settings,
            privacy: {
                ...settings.privacy,
                [name]: value
            }
        });
    };

    const handleSecurityChange = (name: string, value: any) => {
        setSettings({
            ...settings,
            security: {
                ...settings.security,
                [name]: value
            }
        });
    };

    const handlePreferenceChange = (name: string, value: any) => {
        setSettings({
            ...settings,
            preferences: {
                ...settings.preferences,
                [name]: value
            }
        });
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');

        if (!currentPassword) {
            setPasswordError('Current password is required');
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError('New password must be at least 8 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        // Success - would normally send to server
        alert('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-dark-text mb-6">Account Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Settings Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
                        <nav className="p-1">
                            <button
                                onClick={() => setActiveTab('account')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                                    activeTab === 'account'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-dark-text hover:bg-dark-bg'
                                }`}
                            >
                                <User className="h-5 w-5 mr-3" />
                                <span>Account</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                                    activeTab === 'notifications'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-dark-text hover:bg-dark-bg'
                                }`}
                            >
                                <Bell className="h-5 w-5 mr-3" />
                                <span>Notifications</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('privacy')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                                    activeTab === 'privacy'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-dark-text hover:bg-dark-bg'
                                }`}
                            >
                                <Shield className="h-5 w-5 mr-3" />
                                <span>Privacy & Security</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('preferences')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                                    activeTab === 'preferences'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-dark-text hover:bg-dark-bg'
                                }`}
                            >
                                <Globe className="h-5 w-5 mr-3" />
                                <span>Preferences</span>
                            </button>

                            <button
                                onClick={() => setActiveTab('payment')}
                                className={`flex items-center w-full px-4 py-3 rounded-lg text-left ${
                                    activeTab === 'payment'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-dark-text hover:bg-dark-bg'
                                }`}
                            >
                                <CreditCard className="h-5 w-5 mr-3" />
                                <span>Payment Methods</span>
                            </button>
                        </nav>

                        <div className="p-4 border-t border-dark-border">
                            <button className="flex items-center w-full px-4 py-2 rounded-lg text-red-400 hover:bg-dark-bg">
                                <LogOut className="h-5 w-5 mr-3" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                    <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
                        {/* Account Tab */}
                        {activeTab === 'account' && (
                            <div>
                                <div className="p-6 border-b border-dark-border">
                                    <h2 className="text-lg font-semibold text-dark-text">Account Information</h2>
                                    <p className="text-dark-textSecondary mt-1">
                                        Manage your account details and password
                                    </p>
                                </div>

                                <div className="p-6 border-b border-dark-border">
                                    <h3 className="text-md font-semibold text-dark-text mb-4">Change Password</h3>

                                    <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                                        {passwordError && (
                                            <div className="bg-red-900/20 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg">
                                                {passwordError}
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-dark-textSecondary text-sm mb-2">
                                                Current Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5 pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-5 w-5 text-dark-textSecondary" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-dark-textSecondary" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-dark-textSecondary text-sm mb-2">
                                                New Password
                                            </label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-dark-textSecondary text-sm mb-2">
                                                Confirm New Password
                                            </label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                                        >
                                            Update Password
                                        </button>
                                    </form>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-md font-semibold text-dark-text mb-4">Danger Zone</h3>
                                    <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-4">
                                        <h4 className="text-red-400 font-medium mb-2">Delete Account</h4>
                                        <p className="text-dark-textSecondary mb-4">
                                            Once you delete your account, there is no going back. All your data will be permanently removed.
                                        </p>
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div>
                                <div className="p-6 border-b border-dark-border">
                                    <h2 className="text-lg font-semibold text-dark-text">Notification Settings</h2>
                                    <p className="text-dark-textSecondary mt-1">
                                        Manage how and when you receive notifications
                                    </p>
                                </div>

                                <div className="p-6 border-b border-dark-border">
                                    <div className="flex items-center mb-4">
                                        <Mail className="h-5 w-5 text-dark-textSecondary mr-2" />
                                        <h3 className="text-md font-semibold text-dark-text">Email Notifications</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-dark-text">Order Updates</label>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={settings.notifications.email.orderUpdates}
                                                    onChange={() => toggleNotification('email', 'orderUpdates')}
                                                />
                                                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-dark-text">Promotions and Offers</label>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={settings.notifications.email.promotions}
                                                    onChange={() => toggleNotification('email', 'promotions')}
                                                />
                                                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-dark-text">New Services</label>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={settings.notifications.email.newServices}
                                                    onChange={() => toggleNotification('email', 'newServices')}
                                                />
                                                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-dark-text">Newsletter</label>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={settings.notifications.email.newsletter}
                                                    onChange={() => toggleNotification('email', 'newsletter')}
                                                />
                                                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <Smartphone className="h-5 w-5 text-dark-textSecondary mr-2" />
                                        <h3 className="text-md font-semibold text-dark-text">Push Notifications</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-dark-text">Order Updates</label>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={settings.notifications.pushNotifications.orderUpdates}
                                                    onChange={() => toggleNotification('pushNotifications', 'orderUpdates')}
                                                />
                                                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-dark-text">Messages</label>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={settings.notifications.pushNotifications.messages}
                                                    onChange={() => toggleNotification('pushNotifications', 'messages')}
                                                />
                                                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-dark-text">Payment Reminders</label>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={settings.notifications.pushNotifications.paymentReminders}
                                                    onChange={() => toggleNotification('pushNotifications', 'paymentReminders')}
                                                />
                                                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="text-dark-text">Promotions</label>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={settings.notifications.pushNotifications.promotions}
                                                    onChange={() => toggleNotification('pushNotifications', 'promotions')}
                                                />
                                                <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy & Security Tab */}
                        {activeTab === 'privacy' && (
                            <div>
                                <div className="p-6 border-b border-dark-border">
                                    <h2 className="text-lg font-semibold text-dark-text">Privacy & Security</h2>
                                    <p className="text-dark-textSecondary mt-1">
                                        Manage your privacy settings and account security
                                    </p>
                                </div>

                                <div className="p-6 border-b border-dark-border">
                                    <h3 className="text-md font-semibold text-dark-text mb-4">Privacy Settings</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-dark-text mb-2">Profile Visibility</label>
                                            <select
                                                className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                                value={settings.privacy.profileVisibility}
                                                onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                            >
                                                <option value="public">Public - Anyone can view my profile</option>
                                                <option value="limited">Limited - Only registered users can view my profile</option>
                                                <option value="private">Private - Only me and admins can view my profile</option>
                                            </select>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label className="text-dark-text">Share Order History</label>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={settings.privacy.shareOrderHistory}
                                                        onChange={(e) => handlePrivacyChange('shareOrderHistory', e.target.checked)}
                                                    />
                                                    <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                            <p className="text-dark-textSecondary text-sm mt-1">
                                                Allow us to use your order history to improve service recommendations
                                            </p>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <label className="text-dark-text">Allow Marketing Tracking</label>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={settings.privacy.allowMarketingTracking}
                                                        onChange={(e) => handlePrivacyChange('allowMarketingTracking', e.target.checked)}
                                                    />
                                                    <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                            <p className="text-dark-textSecondary text-sm mt-1">
                                                Allow tracking for marketing purposes and better ads targeting
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 border-b border-dark-border">
                                    <h3 className="text-md font-semibold text-dark-text mb-4">Security Settings</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <label className="text-dark-text">Two-Factor Authentication</label>
                                                    <p className="text-dark-textSecondary text-sm mt-1">
                                                        Add an extra layer of security to your account
                                                    </p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={settings.security.twoFactorAuth}
                                                        onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                                                    />
                                                    <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <label className="text-dark-text">Login Notifications</label>
                                                    <p className="text-dark-textSecondary text-sm mt-1">
                                                        Get notified when someone logs into your account
                                                    </p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={settings.security.loginNotifications}
                                                        onChange={(e) => handleSecurityChange('loginNotifications', e.target.checked)}
                                                    />
                                                    <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-dark-card after:border-dark-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-md font-semibold text-dark-text mb-4">Recent Devices</h3>

                                    <div className="space-y-4">
                                        {settings.security.recentDevices.map((device: any, index: number) => (
                                            <div key={index} className="bg-dark-bg p-4 rounded-lg border border-dark-border/50">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="text-dark-text font-medium">{device.device}</p>
                                                        <p className="text-dark-textSecondary text-sm mt-1">
                                                            {device.location} • IP: {device.ip}
                                                        </p>
                                                        <p className="text-dark-textSecondary text-xs mt-1">
                                                            Last active: {formatDate(device.lastActive)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-green-900/20 text-green-400 px-2 py-1 rounded text-xs">
                                                        Current
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Preferences Tab */}
                        {activeTab === 'preferences' && (
                            <div>
                                <div className="p-6 border-b border-dark-border">
                                    <h2 className="text-lg font-semibold text-dark-text">Preferences</h2>
                                    <p className="text-dark-textSecondary mt-1">
                                        Set your language, currency and display preferences
                                    </p>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div>
                                        <label className="block text-dark-text mb-2">Language</label>
                                        <select
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                            value={settings.preferences.language}
                                            onChange={(e) => handlePreferenceChange('language', e.target.value)}
                                        >
                                            <option value="id">Bahasa Indonesia</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-dark-text mb-2">Currency</label>
                                        <select
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                            value={settings.preferences.currency}
                                            onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                                        >
                                            <option value="IDR">Indonesian Rupiah (IDR)</option>
                                            <option value="USD">US Dollar (USD)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-dark-text mb-2">Theme</label>
                                        <select
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                            value={settings.preferences.theme}
                                            onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                                        >
                                            <option value="dark">Dark Theme</option>
                                            <option value="light">Light Theme</option>
                                            <option value="system">System Default</option>
                                        </select>
                                    </div>

                                    <div className="pt-4">
                                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                                            Save Preferences
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment Methods Tab */}
                        {activeTab === 'payment' && (
                            <div>
                                <div className="p-6 border-b border-dark-border">
                                    <h2 className="text-lg font-semibold text-dark-text">Payment Methods</h2>
                                    <p className="text-dark-textSecondary mt-1">
                                        Manage your payment methods and billing information
                                    </p>
                                </div>

                                <div className="p-6">
                                    <div className="flex flex-col items-center justify-center p-8 text-center">
                                        <CreditCard className="h-16 w-16 text-dark-textSecondary mb-4" />
                                        <h3 className="text-lg font-medium text-dark-text mb-2">No Payment Methods Added</h3>
                                        <p className="text-dark-textSecondary mb-6 max-w-md">
                                            You haven't added any payment methods yet. Add a payment method to make checkout faster.
                                        </p>
                                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                                            Add Payment Method
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}