import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-b from-secondary via-secondary to-secondary/95 pt-32 pb-20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-[40%] -right-[60%] w-[100%] h-[100%] rounded-full bg-primary/30 blur-3xl"></div>
                <div className="absolute -bottom-[40%] -left-[60%] w-[100%] h-[100%] rounded-full bg-primary/30 blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="text-dark-text animate-fade-in">
                        <div className="mb-6 inline-block px-4 py-1 bg-primary/20 rounded-full text-primary text-sm font-medium">
                            🚀 Solusi Praktis untuk Akademik dan Elektronik
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Kamu <span className="text-primary">Suruh</span>, Kami <span className="text-primary">Kerjain</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
                            Platform jasa pengerjaan tugas akademik dan perbaikan elektronik terpercaya. Deadline ketat atau gadget rusak? Suruhsuruh aja!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="#pesan" className="btn-primary">
                                Pesan Sekarang
                            </Link>
                            <Link href="#cara-kerja" className="bg-dark-bg/30 text-dark-text px-8 py-3 rounded-md font-semibold hover:bg-dark-bg/50 transition-colors">
                                Cara Kerja
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
                            <div className="animate-fade-in-delay-1">
                                <p className="text-3xl font-bold text-primary">1,500+</p>
                                <p className="text-gray-300 text-sm mt-1">Tugas Diselesaikan</p>
                            </div>
                            <div className="animate-fade-in-delay-2">
                                <p className="text-3xl font-bold text-primary">98%</p>
                                <p className="text-gray-300 text-sm mt-1">Klien Puas</p>
                            </div>
                            <div className="animate-fade-in-delay-3">
                                <p className="text-3xl font-bold text-primary">24/7</p>
                                <p className="text-gray-300 text-sm mt-1">Layanan Support</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative lg:block">
                        <div className="relative h-[400px] md:h-[500px] w-full animate-fade-in">
                            <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-6 transform"></div>
                            <div className="absolute inset-0 bg-dark-card/30 backdrop-blur-sm rounded-2xl rotate-3 transform"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/*<Image*/}
                                {/*    src="/images/hero-image.png"*/}
                                {/*    alt="Suruhsuruh - Jasa Pengerjaan Tugas dan Perbaikan Elektronik"*/}
                                {/*    width={500}*/}
                                {/*    height={400}*/}
                                {/*    className="rounded-xl object-cover"*/}
                                {/*    priority*/}
                                {/*/>*/}
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-dark-card rounded-lg shadow-lg p-4 flex items-center space-x-3 animate-bounce-slow">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-dark-text">Cepat & Terpercaya</p>
                                    <p className="text-xs text-dark-textSecondary">Garansi Hasil Terbaik</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
                    <span className="text-gray-400 text-sm mb-2">Scroll</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Hero;