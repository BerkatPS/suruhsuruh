// "use client";
//
// import { useState, useEffect } from 'react';
// import { Search, Filter, ChevronDown, SlidersHorizontal, Star, BadgeCheck, TrendingUp } from 'lucide-react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
//
// // Mock services data
// const mockServices = [
//     {
//         id: 'skripsi',
//         title: 'Pengerjaan Skripsi & Tugas Akhir',
//         description: 'Bantuan penulisan skripsi, tesis, disertasi, dan tugas akhir dengan kualitas terbaik sesuai standar akademik.',
//         category: 'academic',
//         icon: 'graduation-cap',
//         pricing: {
//             startingPrice: 2500000,
//             negotiable: true
//         },
//         rating: 4.8,
//         reviewCount: 124,
//         popular: true,
//         features: ['Konsultasi gratis', 'Revisi tanpa batas', 'Anti-plagiarisme', 'Bimbingan hingga lulus']
//     },
//     {
//         id: 'pemrograman',
//         title: 'Pemrograman & Informatika',
//         description: 'Layanan pembuatan aplikasi, website, dan solusi IT sesuai kebutuhan Anda.',
//         category: 'academic',
//         icon: 'computer',
//         pricing: {
//             startingPrice: 500000,
//             negotiable: true
//         },
//         rating: 4.7,
//         reviewCount: 98,
//         popular: true,
//         features: ['Source code lengkap', 'Dokumentasi', 'Testing', 'Support 30 hari']
//     },
//     {
//         id: 'tugas-kuliah',
//         title: 'Tugas Kuliah & Makalah',
//         description: 'Pengerjaan tugas kuliah, makalah, esai, review jurnal dan berbagai bentuk tugas akademik lainnya.',
//         category: 'academic',
//         icon: 'document-text',
//         pricing: {
//             startingPrice: 150000,
//             negotiable: true
//         },
//         rating: 4.9,
//         reviewCount: 215,
//         popular: true,
//         features: ['Deadline cepat', 'Semua mata kuliah', 'Format sesuai ketentuan', 'Revisi gratis']
//     },
//     {
//         id: 'praktikum',
//         title: 'Laporan Praktikum & Penelitian',
//         description: 'Penulisan laporan praktikum, laporan kerja lapangan, dan laporan penelitian dengan format standar.',
//         category: 'academic',
//         icon: 'clipboard-document-list',
//         pricing: {
//             startingPrice: 300000,
//             negotiable: true
//         },
//         rating: 4.6,
//         reviewCount: 87,
//         popular: false,
//         features: ['Analisis data', 'Tabel & grafik', 'Format standard', 'Dokumentasi lengkap']
//     },
//     {
//         id: 'presentasi',
//         title: 'Presentasi & Media Pembelajaran',
//         description: 'Pembuatan slide presentasi, media pembelajaran interaktif, dan material pendukung perkuliahan.',
//         category: 'academic',
//         icon: 'presentation-chart-bar',
//         pricing: {
//             startingPrice: 250000,
//             negotiable: true
//         },
//         rating: 4.7,
//         reviewCount: 62,
//         popular: false,
//         features: ['Desain profesional', 'Animasi menarik', 'Konten terstruktur', 'Revisi cepat']
//     },
//     {
//         id: 'smartphone',
//         title: 'Perbaikan Smartphone & Laptop',
//         description: 'Layanan service profesional untuk perbaikan smartphone, laptop, dan berbagai perangkat digital.',
//         category: 'electronic',
//         icon: 'device-phone-mobile',
//         pricing: {
//             startingPrice: 150000,
//             negotiable: true
//         },
//         rating: 4.8,
//         reviewCount: 143,
//         popular: true,
//         features: ['Diagnosa gratis', 'Garansi 30 hari', 'Sparepart original', 'Service cepat']
//     },
//     {
//         id: 'rumah-tangga',
//         title: 'Service Peralatan Rumah Tangga',
//         description: 'Perbaikan elektronik rumah tangga seperti TV, AC, kulkas, mesin cuci, dan perangkat lainnya.',
//         category: 'electronic',
//         icon: 'home-modern',
//         pricing: {
//             startingPrice: 200000,
//             negotiable: true
//         },
//         rating: 4.5,
//         reviewCount: 76,
//         popular: false,
//         features: ['Kunjungan ke rumah', 'Teknisi berpengalaman', 'Garansi perbaikan', 'Service berkala']
//     },
//     {
//         id: 'jaringan',
//         title: 'Instalasi & Perbaikan Jaringan',
//         description: 'Pemasangan, perbaikan, dan optimasi jaringan internet dan sistem keamanan untuk rumah atau kantor.',
//         category: 'electronic',
//         icon: 'signal',
//         pricing: {
//             startingPrice: 350000,
//             negotiable: true
//         },
//         rating: 4.6,
//         reviewCount: 54,
//         popular: false,
//         features: ['Instalasi profesional', 'Optimasi kecepatan', 'Monitoring jaringan', 'Support teknis']
//     }
// ];
//
// // Icon component
// const IconComponent = ({ name, className }) => {
//     const iconMap = {
//         'graduation-cap': (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
//                 <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
//                 <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
//                 <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
//             </svg>
//         ),
//         'computer': (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
//                 <path fillRule="evenodd" d="M2.25 5.25a3 3 0 013-3h13.5a3 3 0 013 3V15a3 3 0 01-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 01-.53 1.28h-9a.75.75 0 01-.53-1.28l.621-.622a2.25 2.25 0 00.659-1.59V18h-3a3 3 0 01-3-3V5.25zm1.5 0v9.75c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V5.25c0-.83-.67-1.5-1.5-1.5H5.25c-.83 0-1.5.67-1.5 1.5z" clipRule="evenodd" />
//             </svg>
//         ),
//         'document-text': (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
//                 <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
//                 <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
//             </svg>
//         ),
//         'clipboard-document-list': (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
//                 <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
//                 <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
//             </svg>
//         ),
//         'presentation-chart-bar': (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
//                 <path fillRule="evenodd" d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z" clipRule="evenodd" />
//             </svg>
//         ),
//         'device-phone-mobile': (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
//                 <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
//                 <path fillRule="evenodd" d="M8.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h6.75c1.035 0 1.875-.84 1.875-1.875V3.375c0-1.036-.84-1.875-1.875-1.875h-6.75zM7.5 3.375c0-.207.168-.375.375-.375h8.25c.207 0 .375.168.375.375v17.25c0 .207-.168.375-.375.375h-8.25a.375.375 0 01-.375-.375V3.375z" clipRule="evenodd" />
//             </svg>
//         ),
//         'home-modern': (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
//                 <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
//                 <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
//             </svg>
//         ),
//         'signal': (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
//                 <path fillRule="evenodd" d="M5.636 4.575a.75.75 0 010 1.06 9 9 0 000 12.729.75.75 0 01-1.06 1.06c-4.101-4.1-4.101-10.748 0-14.849a.75.75 0 011.06 0zm12.728 0a.75.75 0 011.06 0c4.101 4.1 4.101 10.749 0 14.85a.75.75 0 11-1.06-1.061 9 9 0 000-12.728.75.75 0 010-1.06zM7.757 6.696a.75.75 0 010 1.061 6 6 0 000 8.485.75.75 0 01-1.06 1.061 7.5 7.5 0 010-10.607.75.75 0 011.06 0zm8.486 0a.75.75 0 011.06 0 7.5 7.5 0 010 10.607.75.75 0 01-1.06-1.06 6 6 0 000-8.486.75.75 0 010-1.06zM9.879 8.818a.75.75 0 010 1.06 3 3 0 000 4.243.75.75 0 11-1.061 1.06 4.5 4.5 0 010-6.363.75.75 0 011.06 0zm4.242 0a.75.75 0 011.061 0 4.5 4.5 0 010 6.364.75.75 0 01-1.06-1.06 3 3 0 000-4.244.75.75 0 010-1.06z" clipRule="evenodd" />
//             </svg>
//         ),
//         'default': (
//             <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//             </svg>
//         )
//     };
//
//     return iconMap[name] || iconMap.default;
// };
//
// export default function ServicesPage() {
//     const [services, setServices] = useState<any[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
//     const [sortBy, setSortBy] = useState('popular');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [showFilters, setShowFilters] = useState(false);
//     const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//
//     useEffect(() => {
//         // Simulate loading data
//         const timer = setTimeout(() => {
//             setServices(mockServices);
//             setIsLoading(false);
//         }, 1000);
//
//         return () => clearTimeout(timer);
//     }, []);
//
//     // Close dropdowns when clicking outside
//     useEffect(() => {
//         const handleClickOutside = () => {
//             setShowFilters(false);
//             setShowCategoryDropdown(false);
//         };
//
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);
//
//     // Filter and sort services
//     const getFilteredServices = () => {
//         return services
//             .filter((service) => {
//                 const matchesCategory = categoryFilter ? service.category === categoryFilter : true;
//                 const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                     service.description.toLowerCase().includes(searchQuery.toLowerCase());
//                 return matchesCategory && matchesSearch;
//             })
//             .sort((a, b) => {
//                 switch (sortBy) {
//                     case 'popular':
//                         return a.popular === b.popular ? 0 : a.popular ? -1 : 1;
//                     case 'rating':
//                         return b.rating - a.rating;
//                     case 'price_low':
//                         return a.pricing.startingPrice - b.pricing.startingPrice;
//                     case 'price_high':
//                         return b.pricing.startingPrice - a.pricing.startingPrice;
//                     default:
//                         return 0;
//                 }
//             });
//     };
//
//     const filteredServices = getFilteredServices();
//
//     const formatPrice = (price: number) => {
//         return new Intl.NumberFormat('id-ID', {
//             style: 'currency',
//             currency: 'IDR',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 0
//         }).format(price);
//     };
//
//     const handleCategoryClick = (event: React.MouseEvent) => {
//         event.stopPropagation();
//         setShowCategoryDropdown(!showCategoryDropdown);
//     };
//
//     const handleFiltersClick = (event: React.MouseEvent) => {
//         event.stopPropagation();
//         setShowFilters(!showFilters);
//     };
//
//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-dark-bg py-20">
//                 <div className="container mx-auto px-4">
//                     <div className="flex flex-col items-center justify-center h-96 space-y-6">
//                         <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
//                         <p className="text-dark-text text-lg">Memuat layanan...</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//
//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };
//
//     const cardVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.4 }
//         }
//     };
//
//     return (
//         <div className="min-h-screen bg-dark-bg py-20">
//             <div className="container mx-auto px-4">
//                 <div className="max-w-6xl mx-auto">
//                     {/* Page Header */}
//                     <motion.div
//                         className="text-center mb-12"
//                         initial={{ opacity: 0, y: -20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                     >
//                         <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-4">Layanan Kami</h1>
//                         <p className="text-xl text-dark-textSecondary max-w-3xl mx-auto">
//                             Pilih dari berbagai layanan akademik dan elektronik yang dirancang untuk memenuhi kebutuhan Anda
//                         </p>
//                     </motion.div>
//
//                     {/* Search and Filters */}
//                     <motion.div
//                         className="mb-10"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.3 }}
//                     >
//                         <div className="flex flex-col md:flex-row gap-4">
//                             <div className="flex-1 relative group">
//                                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                                     <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
//                                 </div>
//                                 <input
//                                     type="text"
//                                     className="w-full pl-12 pr-4 py-3.5 bg-dark-card border border-dark-border rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
//                                     placeholder="Cari layanan..."
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                 />
//                             </div>
//
//                             <div className="flex gap-3">
//                                 <div className="relative">
//                                     <button
//                                         className="px-4 py-3.5 bg-dark-card border border-dark-border rounded-xl flex items-center justify-between min-w-44 transition-all hover:border-primary/50 hover:bg-dark-card/80"
//                                         onClick={handleCategoryClick}
//                                     >
//                                         <span className="flex items-center">
//                                             <Filter className="h-5 w-5 mr-2 text-gray-400" />
//                                             {categoryFilter === null
//                                                 ? 'Semua Kategori'
//                                                 : categoryFilter === 'academic'
//                                                     ? 'Akademik'
//                                                     : 'Elektronik'}
//                                         </span>
//                                         <ChevronDown className={`h-5 w-5 ml-2 text-gray-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
//                                     </button>
//
//                                     <AnimatePresence>
//                                         {showCategoryDropdown && (
//                                             <motion.div
//                                                 className="absolute right-0 mt-2 w-44 bg-dark-card rounded-xl shadow-lg border border-dark-border z-10"
//                                                 initial={{ opacity: 0, y: -10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: -10 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 onClick={(e) => e.stopPropagation()}
//                                             >
//                                                 <div className="p-2">
//                                                     <button
//                                                         className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${categoryFilter === null ? 'bg-primary/10 text-primary' : 'hover:bg-dark-bg text-dark-text'}`}
//                                                         onClick={() => {
//                                                             setCategoryFilter(null);
//                                                             setShowCategoryDropdown(false);
//                                                         }}
//                                                     >
//                                                         <span className="w-4 h-4 mr-2 flex-shrink-0">
//                                                             {categoryFilter === null && <BadgeCheck className="w-4 h-4" />}
//                                                         </span>
//                                                         Semua Kategori
//                                                     </button>
//                                                     <button
//                                                         className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${categoryFilter === 'academic' ? 'bg-primary/10 text-primary' : 'hover:bg-dark-bg text-dark-text'}`}
//                                                         onClick={() => {
//                                                             setCategoryFilter('academic');
//                                                             setShowCategoryDropdown(false);
//                                                         }}
//                                                     >
//                                                         <span className="w-4 h-4 mr-2 flex-shrink-0">
//                                                             {categoryFilter === 'academic' && <BadgeCheck className="w-4 h-4" />}
//                                                         </span>
//                                                         Akademik
//                                                     </button>
//                                                     <button
//                                                         className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${categoryFilter === 'electronic' ? 'bg-primary/10 text-primary' : 'hover:bg-dark-bg text-dark-text'}`}
//                                                         onClick={() => {
//                                                             setCategoryFilter('electronic');
//                                                             setShowCategoryDropdown(false);
//                                                         }}
//                                                     >
//                                                         <span className="w-4 h-4 mr-2 flex-shrink-0">
//                                                             {categoryFilter === 'electronic' && <BadgeCheck className="w-4 h-4" />}
//                                                         </span>
//                                                         Elektronik
//                                                     </button>
//                                                 </div>
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//
//                                 <div className="relative">
//                                     <button
//                                         className="px-4 py-3.5 bg-dark-card border border-dark-border rounded-xl flex items-center transition-all hover:border-primary/50 hover:bg-dark-card/80"
//                                         onClick={handleFiltersClick}
//                                     >
//                                         <SlidersHorizontal className="h-5 w-5 mr-2 text-gray-400" />
//                                         <span className="hidden sm:inline">Urutkan</span>
//                                         <ChevronDown className={`h-5 w-5 ml-2 text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
//                                     </button>
//
//                                     <AnimatePresence>
//                                         {showFilters && (
//                                             <motion.div
//                                                 className="absolute right-0 mt-2 w-64 bg-dark-card rounded-xl shadow-lg border border-dark-border z-10"
//                                                 initial={{ opacity: 0, y: -10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 exit={{ opacity: 0, y: -10 }}
//                                                 transition={{ duration: 0.2 }}
//                                                 onClick={(e) => e.stopPropagation()}
//                                             >
//                                                 <div className="p-3">
//                                                     <h3 className="font-medium text-dark-text mb-3 flex items-center">
//                                                         <TrendingUp className="h-4 w-4 mr-2 text-primary" />
//                                                         Urutkan Berdasarkan
//                                                     </h3>
//                                                     <div className="space-y-2">
//                                                         <button
//                                                             className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${sortBy === 'popular' ? 'bg-primary/10 text-primary' : 'hover:bg-dark-bg text-dark-text'}`}
//                                                             onClick={() => setSortBy('popular')}
//                                                         >
//                                                             <span className="w-4 h-4 mr-2 flex-shrink-0">
//                                                                 {sortBy === 'popular' && <BadgeCheck className="w-4 h-4" />}
//                                                             </span>
//                                                             Paling Populer
//                                                         </button>
//                                                         <button
//                                                             className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${sortBy === 'rating' ? 'bg-primary/10 text-primary' : 'hover:bg-dark-bg text-dark-text'}`}
//                                                             onClick={() => setSortBy('rating')}
//                                                         >
//                                                             <span className="w-4 h-4 mr-2 flex-shrink-0">
//                                                                 {sortBy === 'rating' && <BadgeCheck className="w-4 h-4" />}
//                                                             </span>
//                                                             Rating Tertinggi
//                                                         </button>
//                                                         <button
//                                                             className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${sortBy === 'price_low' ? 'bg-primary/10 text-primary' : 'hover:bg-dark-bg text-dark-text'}`}
//                                                             onClick={() => setSortBy('price_low')}
//                                                         >
//                                                             <span className="w-4 h-4 mr-2 flex-shrink-0">
//                                                                 {sortBy === 'price_low' && <BadgeCheck className="w-4 h-4" />}
//                                                             </span>
//                                                             Harga: Rendah ke Tinggi
//                                                         </button>
//                                                         <button
//                                                             className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${sortBy === 'price_high' ? 'bg-primary/10 text-primary' : 'hover:bg-dark-bg text-dark-text'}`}
//                                                             onClick={() => setSortBy('price_high')}
//                                                         >
//                                                             <span className="w-4 h-4 mr-2 flex-shrink-0">
//                                                                 {sortBy === 'price_high' && <BadgeCheck className="w-4 h-4" />}
//                                                             </span>
//                                                             Harga: Tinggi ke Rendah
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 <div className="border-t border-dark-border p-3 flex justify-end">
//                                                     <button
//                                                         className="px-4 py-2 bg-primary text-dark-text rounded-lg hover:bg-primary-dark transition-colors"
//                                                         onClick={() => setShowFilters(false)}
//                                                     >
//                                                         Terapkan
//                                                     </button>
//                                                 </div>
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//
//                     {/* Service Listing */}
//                     {filteredServices.length > 0 ? (
//                         <motion.div
//                             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                             variants={containerVariants}
//                             initial="hidden"
//                             animate="visible"
//                         >
//                             {filteredServices.map((service) => (
//                                 <motion.div key={service.id} variants={cardVariants}>
//                                     <Link href={`/services/${service.id}`} className="block h-full">
//                                         <div className="bg-dark-card border border-dark-border/30 rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
//                                             <div className="p-6 flex-grow">
//                                                 <div className="flex justify-between items-start mb-4">
//                                                     <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
//                                                         <IconComponent name={service.icon} className="h-6 w-6" />
//                                                     </div>
//                                                     <div className="flex items-center bg-dark-bg px-2 py-1 rounded-full">
//                                                         <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
//                                                         <span className="text-dark-text font-medium">{service.rating}</span>
//                                                         <span className="text-dark-textSecondary text-sm ml-1">({service.reviewCount})</span>
//                                                     </div>
//                                                 </div>
//
//                                                 <h3 className="font-semibold text-lg text-dark-text mb-2 line-clamp-1">{service.title}</h3>
//                                                 <p className="text-dark-textSecondary mb-4 line-clamp-2 text-sm">{service.description}</p>
//
//                                                 {/* Feature Pills */}
//                                                 <div className="flex flex-wrap gap-2 mb-4">
//                                                     {service.features.slice(0, 2).map((feature, index) => (
//                                                         <span key={index} className="bg-dark-bg text-dark-textSecondary text-xs px-2 py-1 rounded-full">
//                                                             {feature}
//                                                         </span>
//                                                     ))}
//                                                     {service.features.length > 2 && (
//                                                         <span className="bg-dark-bg text-dark-textSecondary text-xs px-2 py-1 rounded-full">
//                                                             +{service.features.length - 2}
//                                                         </span>
//                                                     )}
//                                                 </div>
//
//                                                 <div className="flex justify-between items-center mt-auto">
//                                                     <div>
//                                                         <p className="text-dark-textSecondary text-xs">Mulai dari</p>
//                                                         <p className="text-primary font-semibold">{formatPrice(service.pricing.startingPrice)}</p>
//                                                     </div>
//                                                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                                                         service.category === 'academic'
//                                                             ? 'bg-blue-900/20 text-blue-400'
//                                                             : 'bg-green-900/20 text-green-400'
//                                                     }`}>
//                                                         {service.category === 'academic' ? 'Akademik' : 'Elektronik'}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                             {service.popular && (
//                                                 <div className="bg-primary/80 text-dark-text text-xs font-medium py-1 text-center">
//                                                     Populer
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </Link>
//                                 </motion.div>
//                             ))}
//                         </motion.div>
//                     ) : (
//                         <motion.div
//                             className="bg-dark-card border border-dark-border rounded-xl p-12 text-center"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.4 }}
//                         >
//                             <Search className="h-12 w-12 mx-auto text-dark-textSecondary mb-4" />
//                             <h3 className="text-xl font-semibold text-dark-text mb-2">Layanan Tidak Ditemukan</h3>
//                             <p className="text-dark-textSecondary mb-6">
//                                 Kami tidak dapat menemukan layanan yang sesuai dengan kriteria pencarian Anda.
//                             </p>
//                             <button
//                                 onClick={() => {
//                                     setSearchQuery('');
//                                     setCategoryFilter(null);
//                                     setSortBy('popular');
//                                 }}
//                                 className="bg-primary text-dark-text px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
//                             >
//                                 Hapus Filter
//                             </button>
//                         </motion.div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }