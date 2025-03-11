// src/app/dashboard/profile/page.tsx
"use client";

import { useState, useEffect } from 'react';
import {
    User,
    Mail,
    Phone,
    Calendar,
    Home,
    Bookmark,
    ShieldCheck,
    Edit,
    Settings,
    Save,
    X
} from 'lucide-react';

// Mock user data
const mockUserProfile = {
    id: 'USR-12345',
    name: 'Ananda Putra',
    email: 'ananda@example.com',
    phone: '+62 812-3456-7890',
    dateJoined: '2024-12-15T00:00:00',
    avatar: '/avatars/profile.jpg',
    address: {
        street: 'Jl. Sudirman No. 123',
        city: 'Jakarta',
        province: 'DKI Jakarta',
        postalCode: '12345',
        country: 'Indonesia'
    },
    stats: {
        totalOrders: 5,
        activeOrders: 2,
        completedOrders: 3,
        totalSpent: 5250000
    }
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<any>(null);

    useEffect(() => {
        // Simulate loading data
        const timer = setTimeout(() => {
            setProfile(mockUserProfile);
            setEditedProfile(mockUserProfile);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedProfile(profile);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditedProfile({
                ...editedProfile,
                [parent]: {
                    ...editedProfile[parent],
                    [child]: value
                }
            });
        } else {
            setEditedProfile({
                ...editedProfile,
                [name]: value
            });
        }
    };

    const handleSave = () => {
        // Here you would typically send the updated profile to your backend
        setProfile(editedProfile);
        setIsEditing(false);
    };

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
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
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-dark-text">My Profile</h1>
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleCancel}
                            className="flex items-center border border-dark-border text-dark-textSecondary px-4 py-2 rounded-lg hover:bg-dark-bg transition-colors"
                        >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Left Column - Profile Summary */}
                <div className="md:col-span-1">
                    <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
                        <div className="p-6 text-center">
                            <div className="relative w-24 h-24 mx-auto mb-4">
                                {profile.avatar ? (
                                    <img
                                        src={profile.avatar}
                                        alt={profile.name}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-semibold">
                                        {profile.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl font-semibold text-dark-text">{profile.name}</h2>
                            <p className="text-dark-textSecondary text-sm mt-1">Member since {formatDate(profile.dateJoined)}</p>
                        </div>

                        <div className="p-4 bg-dark-bg border-t border-dark-border">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p className="text-dark-textSecondary text-xs">Active Orders</p>
                                    <p className="text-dark-text font-semibold text-lg">{profile.stats.activeOrders}</p>
                                </div>
                                <div>
                                    <p className="text-dark-textSecondary text-xs">Completed</p>
                                    <p className="text-dark-text font-semibold text-lg">{profile.stats.completedOrders}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-dark-border">
                            <p className="text-dark-textSecondary text-xs mb-2">Total Spent</p>
                            <p className="text-dark-text font-semibold text-lg">{formatCurrency(profile.stats.totalSpent)}</p>
                        </div>

                        <div className="p-4 border-t border-dark-border">
                            <div className="flex justify-between items-center">
                                <a href="/dashboard/settings" className="text-primary hover:text-primary-dark flex items-center">
                                    <Settings className="h-4 w-4 mr-1" />
                                    Account Settings
                                </a>
                                <a href="/dashboard/orders/bookmarks" className="text-primary hover:text-primary-dark flex items-center">
                                    <Bookmark className="h-4 w-4 mr-1" />
                                    Saved Services
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Profile Details */}
                <div className="md:col-span-3">
                    <div className="bg-dark-card rounded-lg border border-dark-border">
                        <div className="p-6 border-b border-dark-border">
                            <h2 className="text-lg font-semibold text-dark-text">Personal Information</h2>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-dark-textSecondary text-sm mb-2 flex items-center">
                                        <User className="h-4 w-4 mr-2" />
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedProfile.name}
                                            onChange={handleChange}
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                        />
                                    ) : (
                                        <p className="text-dark-text">{profile.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-dark-textSecondary text-sm mb-2 flex items-center">
                                        <Mail className="h-4 w-4 mr-2" />
                                        Email
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedProfile.email}
                                            onChange={handleChange}
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                        />
                                    ) : (
                                        <p className="text-dark-text">{profile.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-dark-textSecondary text-sm mb-2 flex items-center">
                                        <Phone className="h-4 w-4 mr-2" />
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={editedProfile.phone}
                                            onChange={handleChange}
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                        />
                                    ) : (
                                        <p className="text-dark-text">{profile.phone}</p>
                                    )}
                                </div>

                                {/* Join Date */}
                                <div>
                                    <label className="block text-dark-textSecondary text-sm mb-2 flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Member Since
                                    </label>
                                    <p className="text-dark-text">{formatDate(profile.dateJoined)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-dark-border">
                            <h2 className="text-lg font-semibold text-dark-text mb-4">Address Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Street */}
                                <div>
                                    <label className="block text-dark-textSecondary text-sm mb-2">Street Address</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address.street"
                                            value={editedProfile.address.street}
                                            onChange={handleChange}
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                        />
                                    ) : (
                                        <p className="text-dark-text">{profile.address.street}</p>
                                    )}
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-dark-textSecondary text-sm mb-2">City</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address.city"
                                            value={editedProfile.address.city}
                                            onChange={handleChange}
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                        />
                                    ) : (
                                        <p className="text-dark-text">{profile.address.city}</p>
                                    )}
                                </div>

                                {/* Province */}
                                <div>
                                    <label className="block text-dark-textSecondary text-sm mb-2">Province</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address.province"
                                            value={editedProfile.address.province}
                                            onChange={handleChange}
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                        />
                                    ) : (
                                        <p className="text-dark-text">{profile.address.province}</p>
                                    )}
                                </div>

                                {/* Postal Code */}
                                <div>
                                    <label className="block text-dark-textSecondary text-sm mb-2">Postal Code</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address.postalCode"
                                            value={editedProfile.address.postalCode}
                                            onChange={handleChange}
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                        />
                                    ) : (
                                        <p className="text-dark-text">{profile.address.postalCode}</p>
                                    )}
                                </div>

                                {/* Country */}
                                <div className="md:col-span-2">
                                    <label className="block text-dark-textSecondary text-sm mb-2">Country</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address.country"
                                            value={editedProfile.address.country}
                                            onChange={handleChange}
                                            className="w-full bg-dark-bg border border-dark-border rounded-lg p-2.5"
                                        />
                                    ) : (
                                        <p className="text-dark-text">{profile.address.country}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-dark-border flex items-center justify-between">
                            <div className="flex items-center text-dark-textSecondary">
                                <ShieldCheck className="h-5 w-5 mr-2 text-green-400" />
                                <span>Your information is secure and protected</span>
                            </div>

                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                                >
                                    Save Changes
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}