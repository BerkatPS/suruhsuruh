import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import RecentOrderList from '@/components/admin/RecentOrderList';
import ActivityLog from '@/components/admin/ActivityLog';
import WorkerAvailability from '@/components/admin/WorkerAvailability';

// Fake data untuk demo
const dummyStats = {
    totalOrders: 248,
    pendingOrders: 36,
    activeWorkers: 18,
    monthlyRevenue: 12500000
};

const dummyRecentOrders = [
    {
        id: 'ORD-2023120001',
        customer: 'Budi Santoso',
        service: 'Jasa Akademik',
        category: 'Skripsi',
        status: 'pending',
        amount: 1200000,
        date: '2023-12-01T10:30:00'
    },
    {
        id: 'ORD-2023120002',
        customer: 'Dewi Lestari',
        service: 'Jasa Elektronik',
        category: 'Perbaikan Laptop',
        status: 'processing',
        amount: 350000,
        date: '2023-12-01T14:45:00'
    },
    {
        id: 'ORD-2023120003',
        customer: 'Ahmad Fauzi',
        service: 'Jasa Akademik',
        category: 'Makalah',
        status: 'completed',
        amount: 500000,
        date: '2023-12-01T09:15:00'
    },
    {
        id: 'ORD-2023120004',
        customer: 'Siti Nurhaliza',
        service: 'Jasa Akademik',
        category: 'Presentasi',
        status: 'processing',
        amount: 750000,
        date: '2023-12-01T16:20:00'
    },
    {
        id: 'ORD-2023120005',
        customer: 'Reza Rahadian',
        service: 'Jasa Elektronik',
        category: 'Perbaikan Smartphone',
        status: 'pending',
        amount: 450000,
        date: '2023-12-01T11:05:00'
    }
];

const dummyActivities = [
    {
        id: 1,
        actor: 'Admin',
        action: 'assigned order ORD-2023120002 to worker',
        target: 'Dimas Prayoga',
        timestamp: '2023-12-01T15:30:00'
    },
    {
        id: 2,
        actor: 'Dimas Prayoga',
        action: 'changed order status to processing',
        target: 'ORD-2023120002',
        timestamp: '2023-12-01T15:45:00'
    },
    {
        id: 3,
        actor: 'Admin',
        action: 'created new worker account',
        target: 'Ratna Dewi',
        timestamp: '2023-12-01T14:20:00'
    },
    {
        id: 4,
        actor: 'Andi Firmansyah',
        action: 'completed order',
        target: 'ORD-2023120003',
        timestamp: '2023-12-01T13:15:00'
    },
    {
        id: 5,
        actor: 'Admin',
        action: 'updated price for service',
        target: 'Perbaikan Smartphone',
        timestamp: '2023-12-01T11:45:00'
    }
];

const dummyWorkers = [
    { id: 1, name: 'Dimas Prayoga', specialty: 'Skripsi', status: 'active', assignedTasks: 3, completionRate: 95 },
    { id: 2, name: 'Andi Firmansyah', specialty: 'Makalah', status: 'active', assignedTasks: 2, completionRate: 98 },
    { id: 3, name: 'Ratna Dewi', specialty: 'Presentasi', status: 'active', assignedTasks: 1, completionRate: 90 },
    { id: 4, name: 'Surya Aditya', specialty: 'Perbaikan Laptop', status: 'busy', assignedTasks: 4, completionRate: 92 },
    { id: 5, name: 'Putri Wulandari', specialty: 'Perbaikan Smartphone', status: 'offline', assignedTasks: 0, completionRate: 94 }
];

const AdminDashboardPage = () => {
    // State untuk menyimpan stats
    const [stats, setStats] = useState(dummyStats);
    const [recentOrders, setRecentOrders] = useState(dummyRecentOrders);
    const [activities, setActivities] = useState(dummyActivities);
    const [workers, setWorkers] = useState(dummyWorkers);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data saat component mount
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // Di sini bisa panggil API untuk ambil data
                // const response = await fetch('/api/admin/dashboard');
                // const data = await response.json();

                // Simulasi loading
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Gunakan dummy data
                setStats(dummyStats);
                setRecentOrders(dummyRecentOrders);
                setActivities(dummyActivities);
                setWorkers(dummyWorkers);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Format angka ke format Rupiah
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AdminLayout title="Dashboard">
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <>
                    {/* Status Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Pesanan"
                            value={stats.totalOrders.toString()}
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            )}
                            color="blue"
                        />
                        <StatCard
                            title="Pesanan Pending"
                            value={stats.pendingOrders.toString()}
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            color="amber"
                        />
                        <StatCard
                            title="Worker Aktif"
                            value={stats.activeWorkers.toString()}
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            )}
                            color="green"
                        />
                        <StatCard
                            title="Pendapatan Bulan Ini"
                            value={formatRupiah(stats.monthlyRevenue)}
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            color="purple"
                        />
                    </div>

                    {/* Content Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Orders */}
                        <div className="lg:col-span-2">
                            <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-dark-text">Pesanan Terbaru</h2>
                                    <a href="/admin/pesanan" className="text-primary hover:underline text-sm">Lihat Semua</a>
                                </div>
                                {/* // @ts-expect-error */}
                                <RecentOrderList orders={recentOrders} />
                            </div>
                        </div>

                        {/* Activity Log */}
                        <div>
                            <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-dark-text">Aktivitas Terbaru</h2>
                                </div>
                                <ActivityLog activities={activities} />
                            </div>
                        </div>

                        {/* Worker Availability */}
                        <div className="lg:col-span-3">
                            <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-dark-text">Status Worker</h2>
                                    <a href="/admin/worker" className="text-primary hover:underline text-sm">Kelola Worker</a>
                                </div>
                                {/* // @ts-expect-error */}
                                <WorkerAvailability workers={workers} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

export default AdminDashboardPage;