import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import WorkerSelector from "@/components/admin/WorkerSelector";
// Interface untuk data pesanan
interface OrderDetail {
    id: string;
    customer: {
        id: number;
        name: string;
        email: string;
        phone: string;
    };
    service: string;
    category: string;
    description: string;
    attachments?: string[];
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    amount: number;
    assignedWorker?: {
        id: number;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
    deadlineAt?: string;
    notes?: string;
    paymentStatus: 'unpaid' | 'partially_paid' | 'paid';
    paymentMethod?: string;
    timeline: {
        id: number;
        status: string;
        note?: string;
        createdAt: string;
        createdBy: string;
    }[];
}

// Data worker untuk selector
const dummyWorkers = [
    { id: 1, name: 'Dimas Prayoga', specialty: 'Skripsi', status: 'active', workload: 3 },
    { id: 2, name: 'Andi Firmansyah', specialty: 'Makalah', status: 'active', workload: 2 },
    { id: 3, name: 'Ratna Dewi', specialty: 'Presentasi', status: 'active', workload: 1 },
    { id: 4, name: 'Surya Aditya', specialty: 'Perbaikan Laptop', status: 'busy', workload: 4 },
    { id: 5, name: 'Putri Wulandari', specialty: 'Perbaikan Smartphone', status: 'active', workload: 2 }
];

// Data dummy pesanan detail
const dummyOrderDetail: OrderDetail = {
    id: 'ORD-2023120001',
    customer: {
        id: 101,
        name: 'Budi Santoso',
        email: 'budi.santoso@example.com',
        phone: '081234567890'
    },
    service: 'Jasa Akademik',
    category: 'Skripsi',
    description: 'Skripsi dengan judul "Analisis Pengaruh Media Sosial Terhadap Perilaku Konsumtif Mahasiswa". Dibutuhkan untuk sidang akhir semester ini.',
    attachments: ['proposal-skripsi.pdf', 'referensi-jurnal.zip'],
    status: 'pending',
    amount: 1200000,
    createdAt: '2023-12-01T10:30:00',
    updatedAt: '2023-12-01T10:30:00',
    deadlineAt: '2023-12-20T23:59:59',
    paymentStatus: 'partially_paid',
    paymentMethod: 'Transfer Bank',
    timeline: [
        {
            id: 1,
            status: 'created',
            note: 'Pesanan dibuat',
            createdAt: '2023-12-01T10:30:00',
            createdBy: 'system'
        },
        {
            id: 2,
            status: 'payment_partial',
            note: 'Pembayaran DP diterima',
            createdAt: '2023-12-01T14:45:00',
            createdBy: 'admin'
        }
    ]
};

const OrderDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [note, setNote] = useState('');
    const [showWorkerSelector, setShowWorkerSelector] = useState(false);
    const [availableWorkers, setAvailableWorkers] = useState(dummyWorkers);

    // Fetch order detail ketika ID tersedia
    useEffect(() => {
        if (id) {
            fetchOrderDetail(id as string);
        }
    }, [id]);

    // Simulasi fetch order detail
    const fetchOrderDetail = async (orderId: string) => {
        setIsLoading(true);
        try {
            // Dalam implementasi sebenarnya, ganti dengan API call
            // const response = await fetch(`/api/admin/orders/${orderId}`);
            // const data = await response.json();

            // Simulasi network request
            await new Promise(resolve => setTimeout(resolve, 1000));

            setOrderDetail(dummyOrderDetail);
        } catch (error) {
            console.error('Error fetching order detail:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk update status pesanan
    const updateOrderStatus = async (newStatus: string) => {
        if (!orderDetail) return;

        setIsUpdating(true);
        try {
            // Dalam implementasi sebenarnya, ganti dengan API call
            // await fetch(`/api/admin/orders/${orderDetail.id}/status`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ status: newStatus, note })
            // });

            // Simulasi network request
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update state lokal
            const updatedTimeline = [
                ...orderDetail.timeline,
                {
                    id: orderDetail.timeline.length + 1,
                    status: newStatus,
                    note: note || undefined,
                    createdAt: new Date().toISOString(),
                    createdBy: 'admin'
                }
            ];

            setOrderDetail({
                ...orderDetail,
                status: newStatus as any,
                timeline: updatedTimeline,
                updatedAt: new Date().toISOString()
            });

            setNote('');
        } catch (error) {
            console.error('Error updating order status:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    // Fungsi untuk assign worker
    const assignWorker = async (workerId: number) => {
        if (!orderDetail) return;

        setIsUpdating(true);
        try {
            // Get worker info
            const worker = availableWorkers.find(w => w.id === workerId);
            if (!worker) throw new Error('Worker not found');

            // Dalam implementasi sebenarnya, ganti dengan API call
            // await fetch(`/api/admin/orders/${orderDetail.id}/assign`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ workerId, note })
            // });

            // Simulasi network request
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update state lokal
            const updatedTimeline = [
                ...orderDetail.timeline,
                {
                    id: orderDetail.timeline.length + 1,
                    status: 'assigned',
                    note: `Assigned to ${worker.name}${note ? ': ' + note : ''}`,
                    createdAt: new Date().toISOString(),
                    createdBy: 'admin'
                }
            ];

            setOrderDetail({
                ...orderDetail,
                assignedWorker: {
                    id: worker.id,
                    name: worker.name
                },
                status: 'processing',
                timeline: updatedTimeline,
                updatedAt: new Date().toISOString()
            });

            setNote('');
            setShowWorkerSelector(false);
        } catch (error) {
            console.error('Error assigning worker:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    // Format tanggal dengan format yang lebih mudah dibaca
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Format angka ke format Rupiah
    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Render status badge
    const renderStatusBadge = (status: string) => {
        let classes = 'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ';
        let label = '';

        switch (status) {
            case 'pending':
                classes += 'bg-amber-500/10 text-amber-500 ring-amber-500/20';
                label = 'Menunggu';
                break;
            case 'processing':
                classes += 'bg-blue-500/10 text-blue-500 ring-blue-500/20';
                label = 'Diproses';
                break;
            case 'completed':
                classes += 'bg-green-500/10 text-green-500 ring-green-500/20';
                label = 'Selesai';
                break;
            case 'cancelled':
                classes += 'bg-red-500/10 text-red-500 ring-red-500/20';
                label = 'Dibatalkan';
                break;
            default:
                classes += 'bg-gray-500/10 text-gray-500 ring-gray-500/20';
                label = status;
        }

        return <span className={classes}>{label}</span>;
    };

    // Render payment status badge
    const renderPaymentBadge = (status: string) => {
        let classes = 'px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ';
        let label = '';

        switch (status) {
            case 'unpaid':
                classes += 'bg-red-500/10 text-red-500 ring-red-500/20';
                label = 'Belum Dibayar';
                break;
            case 'partially_paid':
                classes += 'bg-amber-500/10 text-amber-500 ring-amber-500/20';
                label = 'DP Terbayar';
                break;
            case 'paid':
                classes += 'bg-green-500/10 text-green-500 ring-green-500/20';
                label = 'Lunas';
                break;
            default:
                classes += 'bg-gray-500/10 text-gray-500 ring-gray-500/20';
                label = status;
        }

        return <span className={classes}>{label}</span>;
    };

    // @ts-ignore
    let workers;
    return (
        <AdminLayout title={`Detail Pesanan ${id}`}>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : orderDetail ? (
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-dark-text">{orderDetail.id}</h1>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {renderStatusBadge(orderDetail.status)}
                                {renderPaymentBadge(orderDetail.paymentStatus)}
                            </div>
                        </div>

                        <div className="mt-4 md:mt-0">
                            <div className="flex flex-wrap gap-3">
                                {orderDetail.status === 'pending' && (
                                    <>
                                        <button
                                            className="px-4 py-2 bg-primary text-dark-text rounded-lg hover:bg-primary-dark transition-colors"
                                            onClick={() => setShowWorkerSelector(true)}
                                            disabled={isUpdating}
                                        >
                                            Assign Worker
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                            onClick={() => updateOrderStatus('cancelled')}
                                            disabled={isUpdating}
                                        >
                                            Batalkan
                                        </button>
                                    </>
                                )}

                                {orderDetail.status === 'processing' && (
                                    <button
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        onClick={() => updateOrderStatus('completed')}
                                        disabled={isUpdating}
                                    >
                                        Tandai Selesai
                                    </button>
                                )}

                                {orderDetail.status === 'completed' && (
                                    <button
                                        className="px-4 py-2 bg-primary text-dark-text rounded-lg hover:bg-primary-dark transition-colors"
                                        onClick={() => alert('Print Invoice')}
                                        disabled={isUpdating}
                                    >
                                        Cetak Invoice
                                    </button>
                                )}

                                <button
                                    className="px-4 py-2 border border-dark-border text-dark-text rounded-lg hover:bg-dark-border/50 transition-colors"
                                    onClick={() => router.push('/admin/pesanan')}
                                >
                                    Kembali
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-dark-text mb-4">Informasi Pesanan</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Layanan</p>
                                        <p className="text-dark-text">{orderDetail.service}</p>
                                    </div>

                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Kategori</p>
                                        <p className="text-dark-text">{orderDetail.category}</p>
                                    </div>

                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Tanggal Dibuat</p>
                                        <p className="text-dark-text">{formatDate(orderDetail.createdAt)}</p>
                                    </div>

                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Deadline</p>
                                        <p className="text-dark-text">{orderDetail.deadlineAt ? formatDate(orderDetail.deadlineAt) : '-'}</p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <p className="text-dark-textSecondary text-sm">Deskripsi</p>
                                        <p className="text-dark-text whitespace-pre-line">{orderDetail.description}</p>
                                    </div>

                                    {orderDetail.attachments && orderDetail.attachments.length > 0 && (
                                        <div className="md:col-span-2">
                                            <p className="text-dark-textSecondary text-sm mb-2">Lampiran</p>
                                            <div className="flex flex-wrap gap-2">
                                                {orderDetail.attachments.map((attachment, index) => (
                                                    <a
                                                        key={index}
                                                        href="#"
                                                        className="bg-dark-bg px-3 py-1 rounded-lg text-sm text-primary hover:bg-dark-border/50 transition-colors flex items-center gap-1"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                        </svg>
                                                        {attachment}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Assigned Worker */}
                            <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-dark-text mb-4">
                                    {orderDetail.assignedWorker ? 'Worker yang Ditugaskan' : 'Worker belum ditugaskan'}
                                </h2>

                                {orderDetail.assignedWorker ? (
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-primary font-medium">{orderDetail.assignedWorker.name.charAt(0)}</span>
                                        </div>

                                        <div className="ml-4">
                                            <h3 className="text-dark-text font-medium">{orderDetail.assignedWorker.name}</h3>
                                            <p className="text-dark-textSecondary text-sm">ID: {orderDetail.assignedWorker.id}</p>
                                        </div>

                                        <div className="ml-auto">
                                            <button
                                                className="px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                                                onClick={() => alert(`Lihat profil ${orderDetail.assignedWorker?.name}`)}
                                            >
                                                Lihat Profil
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <button
                                            className="px-4 py-2 bg-primary text-dark-text rounded-lg hover:bg-primary-dark transition-colors"
                                            onClick={() => setShowWorkerSelector(true)}
                                            disabled={isUpdating || orderDetail.status === 'cancelled' || orderDetail.status === 'completed'}
                                        >
                                            Assign Worker
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Timeline */}
                            <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-dark-text mb-4">Timeline</h2>

                                <div className="space-y-4">
                                    {orderDetail.timeline.map((event, index) => (
                                        <div key={event.id} className="flex">
                                            <div className="flex-shrink-0 mr-3">
                                                <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                                                {index < orderDetail.timeline.length - 1 && (
                                                    <div className="w-0.5 h-full ml-0.75 bg-dark-border"></div>
                                                )}
                                            </div>

                                            <div className="flex-1 pb-4">
                                                <div className="flex items-baseline">
                                                    <p className="text-sm font-medium text-dark-text">
                                                        {event.status === 'created' && 'Pesanan dibuat'}
                                                        {event.status === 'payment_partial' && 'Pembayaran DP diterima'}
                                                        {event.status === 'payment_complete' && 'Pembayaran lunas diterima'}
                                                        {event.status === 'assigned' && 'Worker ditugaskan'}
                                                        {event.status === 'processing' && 'Pesanan diproses'}
                                                        {event.status === 'completed' && 'Pesanan selesai'}
                                                        {event.status === 'cancelled' && 'Pesanan dibatalkan'}
                                                    </p>
                                                    <p className="ml-auto text-xs text-dark-textSecondary">
                                                        {formatDate(event.createdAt)}
                                                    </p>
                                                </div>

                                                {event.note && (
                                                    <p className="mt-1 text-sm text-dark-textSecondary">
                                                        {event.note}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="border-t border-dark-border pt-4">
                                        <label htmlFor="note" className="block text-sm font-medium text-dark-text mb-2">
                                            Tambahkan Catatan
                                        </label>
                                        <textarea
                                            id="note"
                                            rows={3}
                                            className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-primary/40"
                                            placeholder="Tambahkan catatan untuk timeline..."
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-6">
                            {/* Customer Info */}
                            <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-dark-text mb-4">Informasi Pelanggan</h2>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Nama</p>
                                        <p className="text-dark-text">{orderDetail.customer.name}</p>
                                    </div>

                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Email</p>
                                        <p className="text-dark-text">{orderDetail.customer.email}</p>
                                    </div>

                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Telepon</p>
                                        <p className="text-dark-text">{orderDetail.customer.phone}</p>
                                    </div>

                                    <div className="pt-2 flex gap-2">
                                        <button
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                                            onClick={() => alert(`Hubungi ${orderDetail.customer.name}`)}
                                        >
                                            Hubungi
                                        </button>

                                        <button
                                            className="px-3 py-1 bg-dark-bg text-dark-text rounded-lg hover:bg-dark-border/50 transition-colors text-sm"
                                            onClick={() => alert(`Lihat profil ${orderDetail.customer.name}`)}
                                        >
                                            Lihat Profil
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-dark-text mb-4">Informasi Pembayaran</h2>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Total Harga</p>
                                        <p className="text-dark-text text-xl font-medium">{formatRupiah(orderDetail.amount)}</p>
                                    </div>

                                    <div>
                                        <p className="text-dark-textSecondary text-sm">Status Pembayaran</p>
                                        <p className="text-dark-text">{renderPaymentBadge(orderDetail.paymentStatus)}</p>
                                    </div>

                                    {orderDetail.paymentMethod && (
                                        <div>
                                            <p className="text-dark-textSecondary text-sm">Metode Pembayaran</p>
                                            <p className="text-dark-text">{orderDetail.paymentMethod}</p>
                                        </div>
                                    )}

                                    {orderDetail.paymentStatus !== 'paid' && (
                                        <div className="pt-2">
                                            <button
                                                className="w-full px-4 py-2 bg-primary text-dark-text rounded-lg hover:bg-primary-dark transition-colors"
                                                onClick={() => alert('Update pembayaran')}
                                            >
                                                Update Pembayaran
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-dark-text mb-4">Tindakan</h2>

                                <div className="space-y-3">
                                    <button
                                        className="w-full px-4 py-2 bg-dark-bg text-dark-text rounded-lg hover:bg-dark-border/50 transition-colors flex items-center justify-center gap-2"
                                        onClick={() => alert('Edit pesanan')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Pesanan
                                    </button>

                                    <button
                                        className="w-full px-4 py-2 bg-dark-bg text-dark-text rounded-lg hover:bg-dark-border/50 transition-colors flex items-center justify-center gap-2"
                                        onClick={() => alert('Kirim pesan')}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                        Kirim Pesan
                                    </button>

                                    {orderDetail.status === 'completed' && (
                                        <button
                                            className="w-full px-4 py-2 bg-dark-bg text-dark-text rounded-lg hover:bg-dark-border/50 transition-colors flex items-center justify-center gap-2"
                                            onClick={() => alert('Download hasil')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download Hasil
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-dark-card border border-dark-border rounded-xl shadow-sm p-6 text-center">
                    <p className="text-dark-text">Order tidak ditemukan</p>
                    <button
                        className="mt-4 px-4 py-2 bg-primary text-dark-text rounded-lg hover:bg-primary-dark transition-colors"
                        onClick={() => router.push('/admin/pesanan')}
                    >
                        Kembali ke Daftar Pesanan
                    </button>
                </div>
            )}

            {/* Worker Selector Modal */}
            {showWorkerSelector && (
                <WorkerSelector
                    /* @ts-ignore */
                    workers={workers}
                    onAssign={assignWorker}
                    onCancel={() => setShowWorkerSelector(false)}
                    isProcessing={isUpdating}
                />
            )}
        </AdminLayout>
    );
};