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

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Kamu <span className="text-primary">Suruh</span>, Kami <span className="text-primary">Kerjain</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
                            Platform jasa pengerjaan tugas akademik dan perbaikan elektronik. Deadline ketat atau gadget rusak? Suruhsuruh aja!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="#pesan" className="btn-primary">
                                Pesan Sekarang
                            </Link>
                            <Link href="#cara-kerja" className="bg-dark-bg/30 text-dark-text px-8 py-3 rounded-md font-semibold hover:bg-dark-bg/50 transition-colors">
                                Cara Kerja
                            </Link>
                        </div>

                    </div>

                    {/* Hero Image */}
                    <div className="relative lg:block hidden">
                        <div className="relative h-[400px] md:h-[500px] w-full animate-fade-in">
                            <div className="absolute inset-0 bg-primary/10 rounded-2xl -rotate-6 transform"></div>
                            <div className="absolute inset-0 bg-dark-card/30 backdrop-blur-sm rounded-2xl rotate-3 transform"></div>
                            <div className="absolute inset-0 flex items-center justify-center">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;