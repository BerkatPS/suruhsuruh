// // pages/admin/pesanan/[id].tsx
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import AdminLayout from '@/components/admin/AdminLayout';
//
// // Tipe untuk data order
// interface Order {
//     id: string;
//     customer: {
//         name: string;
//         email: string;
//         phone: string;
//     };
//     service: string;
//     category: string;
//     status: 'pending' | 'processing' | 'completed' | 'cancelled';
//     amount: number;
//     date: string;
//     description: string;
//     assignedWorker?: Worker;
//     timeline: TimelineItem[];
//     // Tambahkan properti lain sesuai kebutuhan
// }
//
// // Tipe untuk worker
// interface Worker {
//     id: number;
//     name: string;
//     specialty: string;
//     status: 'active' | 'busy' | 'offline';
//     completionRate: number;
// }
//
// // Tipe untuk timeline item
// interface TimelineItem {
//     id: number;
//     actor: string;
//     action: string;
//     timestamp: string;
//     notes?: string;
// }
//
// // Dummy data untuk order detail
// const dummyOrderDetail: Order = {
//     id: 'ORD-2023120001',
//     customer: {
//         name: 'Budi Santoso',
//         email: 'budi.santoso@example.com',
//         phone: '+6281234567890'
//     },
//     service: 'Jasa Akademik',
//     category: 'Skripsi',
//     status: 'pending',
//     amount: 1200000,
//     date: '2023-12-01T10:30:00',
//     description: 'Penulisan skripsi tentang pengaruh media sosial terhadap perilaku konsumen. Membutuhkan minimal 80 halaman dengan 3 bab penelitian dan metodologi riset kuantitatif.',
//     timeline: [
//         {
//             id: 1,
//             actor: 'Sistem',
//             action: 'Order dibuat',
//             timestamp: '2023-12-01T10:30:00'
//         },
//         {
//             id: 2,
//             actor: 'Admin',
//             action: 'Verifikasi pembayaran',
//             timestamp: '2023-12-01T11:15:00'
//         },
//         {
//             id: 3,
//             actor: 'Admin',
//             action: 'Menunggu assignment worker',
//             timestamp: '2023-12-01T11:20:00',
//             notes: 'Mencari worker yang tersedia untuk kategori Skripsi'
//         }
//     ]
// };
//
// // Dummy data untuk available workers
// const dummyAvailableWorkers: Worker[] = [
//     { id: 1, name: 'Dimas Prayoga', specialty: 'Skripsi', status: 'active', completionRate: 95 },
//     { id: 2, name: 'Andi Firmansyah', specialty: 'Skripsi', status: 'active', completionRate: 98 },
//     { id: 3, name: 'Ratna Dewi', specialty: 'Skripsi', status: 'busy', completionRate: 90 }
// ];
//
// export default function OrderDetail() {
//     const router = useRouter();
//     const { id } = router.query;
//
//     const [order, setOrder] = useState<Order | null>(null);
//     const [availableWorkers] = useState<Worker[]>(dummyAvailableWorkers);
//     const [isLoading, setIsLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('details');
//     const [showAssignModal, setShowAssignModal] = useState(false);
//     const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
//
//     useEffect(() => {
//         const fetchOrderDetail = async () => {
//             setIsLoading(true);
//             try {
//                 // Di implementasi nyata, ini akan memanggil API
//                 // const response = await fetch(`/api/orders/${id}`);
//                 // const data = await response.json();
//
//                 // Simulasi loading
//                 await new Promise(resolve => setTimeout(resolve, 1000));
//
//                 // Gunakan dummy data
//                 setOrder(dummyOrderDetail);
//             } catch (error) {
//                 console.error('Error fetching order details:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//
//         if (id) {
//             fetchOrderDetail();
//         }
//     }, [id]);
//
//     // Format tanggal
//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         return new Intl.DateTimeFormat('id-ID', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         }).format(date);
//     };
//
//     // Format angka ke format Rupiah
//     const formatRupiah = (amount: number) => {
//         return new Intl.NumberFormat('id-ID', {
//             style: 'currency',
//             currency: 'IDR',
//             minimumFractionDigits: 0
//         }).format(amount);
//     };
//
//     // Mendapatkan warna status
//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'pending':
//                 return 'bg-amber-500/10 text-amber-500 ring-amber-500/20';
//             case 'processing':
//                 return 'bg-blue-500/10 text-blue-500 ring-blue-500/20';
//             case 'completed':
//                 return 'bg-green-500/10 text-green-500 ring-green-500/20';
//             case 'cancelled':
//                 return 'bg-red-500/10 text-red-500 ring-red-500/20';
//             default:
//                 return 'bg-gray-500/10 text-gray-500 ring-gray-500/20';
//         }
//     };
//
//     // Mendapatkan label status
//     const getStatusLabel = (status: string) => {
//         switch (status) {
//             case 'pending':
//                 return 'Menunggu';
//             case 'processing':
//                 return 'Diproses';
//             case 'completed':
//                 return 'Selesai';
//             case 'cancelled':
//                 return 'Dibatalkan';
//             default:
//                 return status;
//         }
//     };
//
//     // Assign worker
//     const handleAssignWorker = () => {
//         if (selectedWorker && order) {
//             // Di implementasi nyata, ini akan memanggil API
//             // const response = await fetch(`/api/orders/${order.id}/assign`, {
//             //   method: 'POST',
//             //   body: JSON.stringify({ workerId: selectedWorker.id })
//             // });
//
//             // Update order state dengan assigned worker
//             setOrder({
//                 ...order,
//                 assignedWorker: selectedWorker,
//                 status: 'processing',
//                 timeline: [
//                     ...order.timeline,
//                     {
//                         id: order.timeline.length + 1,
//                         actor: 'Admin',
//                         action: `Assigned to worker ${selectedWorker.name}`,
//                         timestamp: new Date().toISOString()
//                     }
//                 ]
//             });
//
//             setShowAssignModal(false);
//             setSelectedWorker(null);
//         }
//     };
//
//     // Mengubah status order
//     const handleChangeStatus = (newStatus: Order['status']) => {
//         if (order) {
//             // Di implementasi nyata, ini akan memanggil API
//             // const response = await fetch(`/api/orders/${order.id}/status`, {
//             //   method: 'PUT',
//             //   body: JSON.stringify({ status: newStatus })
//             // });
//
//             // Update order state dengan status baru
//             setOrder({
//                 ...order,
//                 status: newStatus,
//                 timeline: [
//                     ...order.timeline,
//                     {
//                         id: order.timeline.length + 1,
//                         actor: 'Admin',
//                         action: `Changed status to ${getStatusLabel(newStatus)}`,
//                         timestamp: new Date().toISOString()
//                     }
//                 ]
//             });
//         }
//     };
//
//     if (isLoading) {
//         return (
//             <AdminLayout title="Detail Pesanan">
//                 <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
//                 </div>
//             </AdminLayout>
//         );
//     }
//
//     if (!order) {
//         return (
//             <AdminLayout title="Detail Pesanan">
//                 <div className="bg-gray-900 rounded-lg p-8 text-center">
//                     <h2 className="text-xl font-semibold text-red-500">Order tidak ditemukan</h2>
//                     <p className="text-gray-400 mt-2">Pesanan dengan ID tersebut tidak ada dalam sistem.</p>
//                     <button
//                         onClick={() => router.push('/admin/pesanan')}
//                         className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
//                     >
//                         Kembali ke Daftar Pesanan
//                     </button>
//                 </div>
//             </AdminLayout>
//         );
//     }
//
//     return (
//         <AdminLayout title="Detail Pesanan">
//             {/* Header */}
//             <div className="bg-gray-900 rounded-lg p-6 mb-6">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between">
//                     <div>
//                         <div className="flex items-center">
//                             <h2 className="text-xl font-semibold text-white">{order.id}</h2>
//                             <span className={`ml-3 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ${getStatusColor(order.status)}`}>
//                 {getStatusLabel(order.status)}
//               </span>
//                         </div>
//                         <p className="text-gray-400 mt-1">Dibuat pada {formatDate(order.date)}</p>
//                     </div>
//                     <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
//                         {order.status === 'pending' && (
//                             <button
//                                 onClick={() => setShowAssignModal(true)}
//                                 className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
//                             >
//                                 Assign Worker
//                             </button>
//                         )}
//                         {order.status === 'pending' && (
//                             <button
//                                 onClick={() => handleChangeStatus('processing')}
//                                 className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
//                             >
//                                 Proses Pesanan
//                             </button>
//                         )}
//                         {order.status === 'processing' && (
//                             <button
//                                 onClick={() => handleChangeStatus('completed')}
//                                 className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
//                             >
//                                 Selesaikan
//                             </button>
//                         )}
//                         {(order.status === 'pending' || order.status === 'processing') && (
//                             <button
//                                 onClick={() => handleChangeStatus('cancelled')}
//                                 className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
//                             >
//                                 Batalkan
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//
//             {/* Tabs */}
//             <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
//                 <div className="border-b border-gray-800">
//                     <nav className="flex">
//                         <button
//                             className={`px-6 py-3 font-medium text-sm ${activeTab === 'details' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400 hover:text-white'}`}
//                             onClick={() => setActiveTab('details')}
//                         >
//                             Detail Pesanan
//                         </button>
//                         <button
//                             className={`px-6 py-3 font-medium text-sm ${activeTab === 'timeline' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400 hover:text-white'}`}
//                             onClick={() => setActiveTab('timeline')}
//                         >
//                             Timeline
//                         </button>
//                     </nav>
//                 </div>
//
//                 {/* Tab Content */}
//                 <div className="p-6">
//                     {activeTab === 'details' && (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                             {/* Customer Info */}
//                             <div>
//                                 <h3 className="text-lg font-medium text-white mb-4">Informasi Pelanggan</h3>
//                                 <div className="bg-gray-800 rounded-lg p-4">
//                                     <p className="text-white font-medium">{order.customer.name}</p>
//                                     <p className="text-gray-400 mt-1">{order.customer.email}</p>
//                                     <p className="text-gray-400 mt-1">{order.customer.phone}</p>
//                                 </div>
//
//                                 {/* Assigned Worker (if any) */}
//                                 <h3 className="text-lg font-medium text-white mt-6 mb-4">Worker</h3>
//                                 <div className="bg-gray-800 rounded-lg p-4">
//                                     {order.assignedWorker ? (
//                                         <div className="flex items-center">
//                                             <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
//                                                 <span className="text-amber-500 font-medium">{order.assignedWorker.name.charAt(0)}</span>
//                                             </div>
//                                             <div className="ml-4">
//                                                 <p className="text-white font-medium">{order.assignedWorker.name}</p>
//                                                 <p className="text-gray-400 text-sm">Spesialisasi: {order.assignedWorker.specialty}</p>
//                                                 <p className="text-gray-400 text-sm">Completion Rate: {order.assignedWorker.completionRate}%</p>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <p className="text-gray-400">Belum ada worker yang ditugaskan</p>
//                                     )}
//                                 </div>
//                             </div>
//
//                             {/* Order Details */}
//                             <div>
//                                 <h3 className="text-lg font-medium text-white mb-4">Detail Pesanan</h3>
//                                 <div className="bg-gray-800 rounded-lg p-4">
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <div>
//                                             <p className="text-gray-400 text-sm">Layanan</p>
//                                             <p className="text-white">{order.service}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-gray-400 text-sm">Kategori</p>
//                                             <p className="text-white">{order.category}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-gray-400 text-sm">Jumlah</p>
//                                             <p className="text-white font-medium">{formatRupiah(order.amount)}</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-gray-400 text-sm">Status</p>
//                                             <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ring-1 ${getStatusColor(order.status)}`}>
//                         {getStatusLabel(order.status)}
//                       </span>
//                                         </div>
//                                     </div>
//
//                                     <div className="mt-4">
//                                         <p className="text-gray-400 text-sm">Deskripsi</p>
//                                         <p className="text-white mt-1">{order.description}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//
//                     {activeTab === 'timeline' && (
//                         <div>
//                             <h3 className="text-lg font-medium text-white mb-4">Timeline Pesanan</h3>
//                             <div className="space-y-4">
//                                 {order.timeline.map((item, index) => (
//                                     <div key={item.id} className="relative pl-8 pb-4">
//                                         {/* Line connecting timeline items */}
//                                         {index < order.timeline.length - 1 && (
//                                             <div className="absolute top-2 left-2 bottom-0 w-0.5 bg-gray-700"></div>
//                                         )}
//
//                                         {/* Timeline dot */}
//                                         <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-amber-500"></div>
//
//                                         {/* Content */}
//                                         <div className="bg-gray-800 rounded-lg p-4">
//                                             <div className="flex justify-between items-start">
//                                                 <div>
//                                                     <p className="text-white font-medium">{item.action}</p>
//                                                     <p className="text-amber-500 text-sm">Oleh: {item.actor}</p>
//                                                 </div>
//                                                 <p className="text-gray-400 text-sm">{formatDate(item.timestamp)}</p>
//                                             </div>
//                                             {item.notes && (
//                                                 <p className="text-gray-400 mt-2 text-sm">{item.notes}</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//
//             {/* Modal for assigning worker */}
//             {showAssignModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-gray-900 rounded-lg w-full max-w-md p-6">
//                         <h3 className="text-lg font-medium text-white mb-4">Pilih Worker untuk Pesanan</h3>
//
//                         <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
//                             {availableWorkers.map((worker) => (
//                                 <div
//                                     key={worker.id}
//                                     className={`p-3 rounded-lg cursor-pointer transition-colors ${
//                                         selectedWorker?.id === worker.id
//                                             ? 'bg-amber-500/20 border border-amber-500'
//                                             : 'bg-gray-800 hover:bg-gray-700 border border-transparent'
//                                     }`}
//                                     onClick={() => setSelectedWorker(worker)}
//                                 >
//                                     <div className="flex items-center">
//                                         <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
//                                             <span className="text-amber-500 font-medium">{worker.name.charAt(0)}</span>
//                                         </div>
//                                         <div className="ml-3">
//                                             <p className="text-white font-medium">{worker.name}</p>
//                                             <div className="flex items-center mt-1">
//                         <span className={`inline-block w-2 h-2 rounded-full ${
//                             worker.status === 'active' ? 'bg-green-500' :
//                                 worker.status === 'busy' ? 'bg-amber-500' : 'bg-gray-500'
//                         }`}></span>
//                                                 <span className="text-gray-400 text-xs ml-1">
//                           {worker.status === 'active' ? 'Tersedia' :
//                               worker.status === 'busy' ? 'Sibuk' : 'Offline'}
//                         </span>
//                                                 <span className="text-gray-400 text-xs ml-2">•</span>
//                                                 <span className="text-gray-400 text-xs ml-2">{worker.completionRate}% Completion</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//
//                         <div className="flex justify-end space-x-3">
//                             <button
//                                 className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
//                                 onClick={() => {
//                                     setShowAssignModal(false);
//                                     setSelectedWorker(null);
//                                 }}
//                             >
//                                 Batal
//                             </button>
//                             <button
//                                 className={`px-4 py-2 rounded-lg ${
//                                     selectedWorker
//                                         ? 'bg-amber-500 hover:bg-amber-600 text-white'
//                                         : 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                                 }`}
//                                 onClick={handleAssignWorker}
//                                 disabled={!selectedWorker}
//                             >
//                                 Assign Worker
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </AdminLayout>
//     );
// }