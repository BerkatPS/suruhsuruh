// // src/app/worker-portal/messages/page.tsx
// "use client";
//
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//     ArrowLeft,
//     ArrowUpDown,
//     ChevronDown,
//     Clock,
//     FileText,
//     Image as ImageIcon,
//     MessageCircle,
//     MoreVertical,
//     Paperclip,
//     Search,
//     Send,
//     SlidersHorizontal,
//     Star,
//     Trash2,
//     User,
//     X
// } from 'lucide-react';
// import WorkerLayout from '@/components/layout/WorkerLayout';
//
// // Interfaces for type-safety
// interface Message {
//     id: string;
//     text: string;
//     sender: 'worker' | 'customer';
//     timestamp: string;
//     read: boolean;
//     attachments?: {
//         id: string;
//         name: string;
//         type: string;
//         url: string;
//         size: string;
//     }[];
// }
//
// interface Conversation {
//     id: string;
//     jobId: string;
//     jobTitle: string;
//     category: 'elektronik' | 'akademik';
//     customer: {
//         id: string;
//         name: string;
//         avatar: string;
//         isOnline: boolean;
//     };
//     lastMessage: {
//         text: string;
//         sender: 'worker' | 'customer';
//         timestamp: string;
//         read: boolean;
//     };
//     unreadCount: number;
//     isStarred: boolean;
//     isWarranty?: boolean;
// }
//
// const MessagesPage: React.FC = () => {
//     const router = useRouter();
//     const [conversations, setConversations] = useState<Conversation[]>([]);
//     const [filteredConversations, setFilteredConversations] = useState<Conversation[]>([]);
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [sortBy, setSortBy] = useState<string>('newest');
//     const [filterCategory, setFilterCategory] = useState<string>('all');
//     const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
//
//     // Data dummy untuk halaman pesan
//     const dummyConversations: Conversation[] = [
//         {
//             id: 'conv-001',
//             jobId: 'JOB-2023-11-005',
//             jobTitle: 'Perbaikan Monitor Samsung',
//             category: 'elektronik',
//             customer: {
//                 id: 'cust-001',
//                 name: 'Budi Santoso',
//                 avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
//                 isOnline: true
//             },
//             lastMessage: {
//                 text: 'Apakah sudah ada perkembangan dengan monitor saya?',
//                 sender: 'customer',
//                 timestamp: '2025-03-07T10:35:00',
//                 read: false
//             },
//             unreadCount: 2,
//             isStarred: true
//         },
//         {
//             id: 'conv-002',
//             jobId: 'JOB-2023-11-008',
//             jobTitle: 'Pembuatan Laporan Thesis Manajemen',
//             category: 'akademik',
//             customer: {
//                 id: 'cust-002',
//                 name: 'Siti Nurhaliza',
//                 avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
//                 isOnline: false
//             },
//             lastMessage: {
//                 text: 'Saya sudah mengirimkan revisi untuk bab 3 dan 4, mohon dicek kembali.',
//                 sender: 'worker',
//                 timestamp: '2025-03-07T09:20:00',
//                 read: true
//             },
//             unreadCount: 0,
//             isStarred: false
//         },
//         {
//             id: 'conv-003',
//             jobId: 'JOB-2023-11-010',
//             jobTitle: 'Perbaikan AC Panasonic',
//             category: 'elektronik',
//             customer: {
//                 id: 'cust-003',
//                 name: 'Tono Widodo',
//                 avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
//                 isOnline: false
//             },
//             lastMessage: {
//                 text: 'Baik, saya akan menunggu teknisi datang besok pagi.',
//                 sender: 'customer',
//                 timestamp: '2025-03-06T16:45:00',
//                 read: true
//             },
//             unreadCount: 0,
//             isStarred: false
//         },
//         {
//             id: 'conv-004',
//             jobId: 'JOB-2023-09-015',
//             jobTitle: 'Perbaikan Smartphone Xiaomi',
//             category: 'elektronik',
//             customer: {
//                 id: 'cust-004',
//                 name: 'Dian Permata',
//                 avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
//                 isOnline: true
//             },
//             lastMessage: {
//                 text: 'Layar smartphone kembali berkedip setelah perbaikan, bisa minta garansi?',
//                 sender: 'customer',
//                 timestamp: '2025-03-05T11:30:00',
//                 read: false
//             },
//             unreadCount: 1,
//             isStarred: false,
//             isWarranty: true
//         },
//         {
//             id: 'conv-005',
//             jobId: 'JOB-2023-10-002',
//             jobTitle: 'Pembuatan Makalah Ekonomi Makro',
//             category: 'akademik',
//             customer: {
//                 id: 'cust-005',
//                 name: 'Rini Susanti',
//                 avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random&size=128holder/40/40',
//                 isOnline: false
//             },
//             lastMessage: {
//                 text: 'Terima kasih atas perbaikan makalahnya, hasilnya sangat bagus!',
//                 sender: 'customer',
//                 timestamp: '2025-02-25T13:15:00',
//                 read: true
//             },
//             unreadCount: 0,
//             isStarred: true
//         }
//     ];
//
//     // Load conversations on component mount
//     useEffect(() => {
//         setConversations(dummyConversations);
//         filterAndSortConversations(dummyConversations);
//     }, []);
//
//     // Filter and sort conversations based on search, filter and sort criteria
//     const filterAndSortConversations = (convs: Conversation[]): void => {
//         let filtered = [...convs];
//
//         // Apply search filter
//         if (searchQuery) {
//             filtered = filtered.filter(conv =>
//                 conv.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 conv.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//         }
//
//         // Apply category filter
//         if (filterCategory !== 'all') {
//             filtered = filtered.filter(conv => {
//                 if (filterCategory === 'elektronik' || filterCategory === 'akademik') {
//                     return conv.category === filterCategory;
//                 } else if (filterCategory === 'starred') {
//                     return conv.isStarred;
//                 } else if (filterCategory === 'unread') {
//                     return conv.unreadCount > 0;
//                 } else if (filterCategory === 'warranty') {
//                     return conv.isWarranty;
//                 }
//                 return true;
//             });
//         }
//
//         // Apply sorting
//         filtered.sort((a, b) => {
//             const dateA = new Date(a.lastMessage.timestamp);
//             const dateB = new Date(b.lastMessage.timestamp);
//
//             if (sortBy === 'newest') {
//                 return dateB.getTime() - dateA.getTime();
//             } else if (sortBy === 'oldest') {
//                 return dateA.getTime() - dateB.getTime();
//             } else if (sortBy === 'unread') {
//                 return b.unreadCount - a.unreadCount;
//             }
//
//             return 0;
//         });
//
//         setFilteredConversations(filtered);
//     };
//
//     // Apply filters when search, sort or filter criteria change
//     useEffect(() => {
//         filterAndSortConversations(conversations);
//     }, [searchQuery, sortBy, filterCategory]);
//
//     // Handle conversation click
//     const handleConversationClick = (conversationId: string): void => {
//         router.push(`/worker-portal/messages/${conversationId}`);
//     };
//
//     // Format timestamp for display
//     const formatTimestamp = (timestamp: string): string => {
//         const date = new Date(timestamp);
//         const now = new Date();
//
//         // If today, show time only
//         if (date.toDateString() === now.toDateString()) {
//             return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
//         }
//
//         // If within the last 7 days, show day name
//         const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
//         if (diff < 7) {
//             return date.toLocaleDateString('id-ID', { weekday: 'short' });
//         }
//
//         // Otherwise show date
//         return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
//     };
//
//     // Toggle star status
//     const toggleStar = (id: string, e: React.MouseEvent): void => {
//         e.stopPropagation();
//         const updatedConversations = conversations.map(conv => {
//             if (conv.id === id) {
//                 return { ...conv, isStarred: !conv.isStarred };
//             }
//             return conv;
//         });
//
//         setConversations(updatedConversations);
//         filterAndSortConversations(updatedConversations);
//     };
//
//     return (
//         <WorkerLayout>
//             <div className="min-h-screen bg-dark-bg text-dark-text">
//                 {/* Main Content */}
//                 <main className="container mx-auto">
//                     <div className="grid grid-cols-1 h-[calc(100vh-64px)]">
//                         {/* Messages Interface */}
//                         <div className="flex flex-col h-full">
//                             {/* Messages Header */}
//                             <div className="p-4 border-b border-dark-border bg-dark-card">
//                                 <div className="flex justify-between items-center">
//                                     <h1 className="text-xl font-display font-bold flex items-center gap-2">
//                                         <MessageCircle className="h-6 w-6 text-primary" />
//                                         Pesan
//                                     </h1>
//                                     <div className="flex items-center gap-3">
//                                         <div className="relative">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Cari pesan..."
//                                                 value={searchQuery}
//                                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                                 className="bg-lightGray rounded-xl py-2 px-4 pl-10 w-64 border border-dark-border focus:border-primary outline-none text-sm"
//                                             />
//                                             <Search className="absolute left-3 top-2.5 h-4 w-4 text-dark-textSecondary" />
//                                         </div>
//
//                                         <div className="relative">
//                                             <button
//                                                 onClick={() => setShowFilterMenu(!showFilterMenu)}
//                                                 className="bg-lightGray p-2 rounded-lg border border-dark-border hover:border-primary transition-colors"
//                                                 aria-label="Filter"
//                                             >
//                                                 <SlidersHorizontal className="h-5 w-5 text-dark-textSecondary" />
//                                             </button>
//
//                                             {/* Filter Menu */}
//                                             {showFilterMenu && (
//                                                 <div className="absolute right-0 mt-2 w-64 bg-dark-card rounded-xl shadow-card border border-dark-border z-10">
//                                                     <div className="p-3 border-b border-dark-border">
//                                                         <h4 className="font-medium text-sm">Urutkan berdasarkan</h4>
//                                                         <div className="mt-2 space-y-1">
//                                                             <button
//                                                                 onClick={() => {
//                                                                     setSortBy('newest');
//                                                                     setShowFilterMenu(false);
//                                                                 }}
//                                                                 className={`w-full text-left px-3 py-1.5 text-sm rounded-lg ${
//                                                                     sortBy === 'newest' ? 'bg-primary/10 text-primary' : 'hover:bg-lightGray'
//                                                                 }`}
//                                                             >
//                                                                 Terbaru
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => {
//                                                                     setSortBy('oldest');
//                                                                     setShowFilterMenu(false);
//                                                                 }}
//                                                                 className={`w-full text-left px-3 py-1.5 text-sm rounded-lg ${
//                                                                     sortBy === 'oldest' ? 'bg-primary/10 text-primary' : 'hover:bg-lightGray'
//                                                                 }`}
//                                                             >
//                                                                 Terlama
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => {
//                                                                     setSortBy('unread');
//                                                                     setShowFilterMenu(false);
//                                                                 }}
//                                                                 className={`w-full text-left px-3 py-1.5 text-sm rounded-lg ${
//                                                                     sortBy === 'unread' ? 'bg-primary/10 text-primary' : 'hover:bg-lightGray'
//                                                                 }`}
//                                                             >
//                                                                 Belum Dibaca
//                                                             </button>
//                                                         </div>
//                                                     </div>
//
//                                                     <div className="p-3 border-b border-dark-border">
//                                                         <h4 className="font-medium text-sm">Filter</h4>
//                                                         <div className="mt-2 space-y-1">
//                                                             <button
//                                                                 onClick={() => {
//                                                                     setFilterCategory('all');
//                                                                     setShowFilterMenu(false);
//                                                                 }}
//                                                                 className={`w-full text-left px-3 py-1.5 text-sm rounded-lg ${
//                                                                     filterCategory === 'all' ? 'bg-primary/10 text-primary' : 'hover:bg-lightGray'
//                                                                 }`}
//                                                             >
//                                                                 Semua Pesan
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => {
//                                                                     setFilterCategory('unread');
//                                                                     setShowFilterMenu(false);
//                                                                 }}
//                                                                 className={`w-full text-left px-3 py-1.5 text-sm rounded-lg ${
//                                                                     filterCategory === 'unread' ? 'bg-primary/10 text-primary' : 'hover:bg-lightGray'
//                                                                 }`}
//                                                             >
//                                                                 Belum Dibaca
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => {
//                                                                     setFilterCategory('starred');
//                                                                     setShowFilterMenu(false);
//                                                                 }}
//                                                                 className={`w-full text-left px-3 py-1.5 text-sm rounded-lg ${
//                                                                     filterCategory === 'starred' ? 'bg-primary/10 text-primary' : 'hover:bg-lightGray'
//                                                                 }`}
//                                                             >
//                                                                 Berbintang
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => {
//                                                                     setFilterCategory('warranty');
//                                                                     setShowFilterMenu(false);
//                                                                 }}
//                                                                 className={`w-full text-left px-3 py-1.5 text-sm rounded-lg ${
//                                                                     filterCategory === 'warranty' ? 'bg-primary/10 text-primary' : 'hover:bg-lightGray'
//                                                                 }`}
//                                                             >
//                                                                 Terkait Garansi
//                                                             </button>
//                                                         </div>
//                                                     </div>
//
//                                                     <div className="p-3 border-b border-dark-border">
//                                                         <h4 className="font-medium text-sm">Kategori</h4>
//                                                         <div className="mt-2 space-y-1">
//                                                             <button
//                                                                 onClick={() => {
//                                                                     setFilterCategory('elektronik');
//                                                                     setShowFilterMenu(false);
//                                                                 }}
//                                                                 className={`w-full text-left px-3 py-1.5 text-sm rounded-lg ${
//                                                                     filterCategory === 'elektronik' ? 'bg-primary/10 text-primary' : 'hover:bg-lightGray'
//                                                                 }`}
//                                                             >
//                                                                 Elektronik
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => {
//                                                                     setFilterCategory('akademik');
//                                                                     setShowFilterMenu(false);
//                                                                 }}
//                                                                 className={`w-full text-left px-3 py-1.5 text-sm rounded-lg ${
//                                                                     filterCategory === 'akademik' ? 'bg-primary/10 text-primary' : 'hover:bg-lightGray'
//                                                                 }`}
//                                                             >
//                                                                 Akademik
//                                                             </button>
//                                                         </div>
//                                                     </div>
//
//                                                     <div className="p-3">
//                                                         <button
//                                                             onClick={() => {
//                                                                 setFilterCategory('all');
//                                                                 setSortBy('newest');
//                                                                 setShowFilterMenu(false);
//                                                             }}
//                                                             className="w-full text-center text-primary hover:text-primary-light text-sm"
//                                                         >
//                                                             Reset Filter
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//
//                                 {/* Filter Pills */}
//                                 {(filterCategory !== 'all' || sortBy !== 'newest') && (
//                                     <div className="flex flex-wrap gap-2 mt-3">
//                                         {filterCategory !== 'all' && (
//                                             <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                         <span>
//                           {filterCategory === 'elektronik' ? 'Elektronik' :
//                               filterCategory === 'akademik' ? 'Akademik' :
//                                   filterCategory === 'starred' ? 'Berbintang' :
//                                       filterCategory === 'unread' ? 'Belum Dibaca' :
//                                           filterCategory === 'warranty' ? 'Terkait Garansi' : ''}
//                         </span>
//                                                 <button
//                                                     onClick={() => setFilterCategory('all')}
//                                                     className="ml-1"
//                                                 >
//                                                     <X className="h-3 w-3" />
//                                                 </button>
//                                             </div>
//                                         )}
//
//                                         {sortBy !== 'newest' && (
//                                             <div className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full flex items-center gap-1">
//                         <span>
//                           {sortBy === 'oldest' ? 'Terlama' :
//                               sortBy === 'unread' ? 'Belum Dibaca' : ''}
//                         </span>
//                                                 <button
//                                                     onClick={() => setSortBy('newest')}
//                                                     className="ml-1"
//                                                 >
//                                                     <X className="h-3 w-3" />
//                                                 </button>
//                                             </div>
//                                         )}
//
//                                         <button
//                                             onClick={() => {
//                                                 setFilterCategory('all');
//                                                 setSortBy('newest');
//                                             }}
//                                             className="text-dark-textSecondary hover:text-primary text-xs underline"
//                                         >
//                                             Reset Filter
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//
//                             {/* Conversations List */}
//                             <div className="flex-1 overflow-y-auto">
//                                 {filteredConversations.length > 0 ? (
//                                     filteredConversations.map(conversation => (
//                                         <div
//                                             key={conversation.id}
//                                             onClick={() => handleConversationClick(conversation.id)}
//                                             className={`p-4 border-b border-dark-border hover:bg-lightGray cursor-pointer transition-colors ${
//                                                 conversation.unreadCount > 0 ? 'bg-dark-bg' : ''
//                                             }`}
//                                         >
//                                             <div className="flex items-center gap-3">
//                                                 {/* Avatar with online indicator */}
//                                                 <div className="relative">
//                                                     <img
//                                                         src={conversation.customer.avatar}
//                                                         alt={conversation.customer.name}
//                                                         className="h-12 w-12 rounded-full"
//                                                     />
//                                                     {conversation.customer.isOnline && (
//                                                         <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-dark-bg"></span>
//                                                     )}
//                                                 </div>
//
//                                                 {/* Message Preview */}
//                                                 <div className="flex-1 min-w-0">
//                                                     <div className="flex justify-between items-start">
//                                                         <h3 className={`font-medium truncate ${
//                                                             conversation.unreadCount > 0 ? 'text-white' : ''
//                                                         }`}>
//                                                             {conversation.customer.name}
//                                                         </h3>
//                                                         <div className="flex items-center gap-2">
//                                                             <button
//                                                                 onClick={(e) => toggleStar(conversation.id, e)}
//                                                                 className={`${conversation.isStarred ? 'text-amber-400' : 'text-dark-textSecondary hover:text-amber-400'}`}
//                                                                 aria-label={conversation.isStarred ? "Hapus bintang" : "Tandai berbintang"}
//                                                             >
//                                                                 <Star className="h-4 w-4 fill-current" />
//                                                             </button>
//                                                             <span className="text-dark-textSecondary text-xs">
//                                 {formatTimestamp(conversation.lastMessage.timestamp)}
//                               </span>
//                                                         </div>
//                                                     </div>
//
//                                                     <div className="mt-1 flex justify-between items-center">
//                                                         <p className={`text-sm truncate ${
//                                                             conversation.unreadCount > 0 ? 'text-white' : 'text-dark-textSecondary'
//                                                         }`}>
//                                                             {conversation.jobTitle}
//                                                         </p>
//                                                         <span className={`text-xs px-2 py-0.5 rounded-full ${
//                                                             conversation.category === 'elektronik'
//                                                                 ? 'bg-blue-900/30 text-blue-400'
//                                                                 : 'bg-purple-900/30 text-purple-400'
//                                                         }`}>
//                               {conversation.category === 'elektronik' ? 'Elektronik' : 'Akademik'}
//                             </span>
//                                                     </div>
//
//                                                     <div className="mt-1 flex justify-between">
//                                                         <p className={`text-sm truncate ${
//                                                             conversation.unreadCount > 0 ? 'font-medium text-white' : 'text-dark-textSecondary'
//                                                         }`}>
//                                                             {conversation.lastMessage.sender === 'worker' ? 'Anda: ' : ''}
//                                                             {conversation.lastMessage.text}
//                                                         </p>
//
//                                                         {conversation.unreadCount > 0 && (
//                                                             <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
//                                 {conversation.unreadCount}
//                               </span>
//                                                         )}
//
//                                                         {conversation.isWarranty && (
//                                                             <span className="bg-amber-900/30 text-amber-400 text-xs px-2 py-0.5 rounded-full">
//                                 Garansi
//                               </span>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="flex flex-col items-center justify-center h-full">
//                                         <div className="bg-lightGray h-16 w-16 rounded-full flex items-center justify-center">
//                                             <MessageCircle className="h-8 w-8 text-dark-textSecondary" />
//                                         </div>
//                                         <h3 className="font-medium mt-4">Tidak ada pesan</h3>
//                                         <p className="text-dark-textSecondary text-sm mt-2">
//                                             {searchQuery ? 'Tidak ada pesan yang cocok dengan pencarian Anda.' : 'Belum ada percakapan yang dimulai.'}
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </WorkerLayout>
//     );
// };
//
// export default MessagesPage;