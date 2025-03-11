import { useState, useEffect } from 'react';
import Link from 'next/link';
import { themeConfig } from '@/config/site';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-dark-bg shadow-md py-3' : 'bg-transparent py-5'
            }`}
        >
            <div className="container-custom flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center z-10">
          <span className="text-2xl font-bold font-display text-dark-text transition-colors duration-300">
            suruh<span className="text-primary">suruh.id</span>
          </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {themeConfig.mainNav.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`font-medium transition-colors ${
                                isScrolled ? 'text-dark-text hover:text-primary' : 'text-dark-text hover:text-primary-light'
                            }`}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>

                {/* CTA Button */}
                <Link
                    href="#pesan"
                    className={`hidden md:flex btn ${
                        isScrolled ? 'bg-primary hover:bg-primary-dark text-dark-text' : 'bg-dark-card hover:bg-dark-border text-dark-text'
                    } shadow-button px-6 py-2 rounded-lg font-medium transition-colors`}
                >
                    Pesan Sekarang
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-10 text-dark-text"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-dark-bg z-40 transform transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="container-custom pt-24 pb-8">
                    <nav className="flex flex-col space-y-6">
                        {themeConfig.mainNav.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="text-dark-text hover:text-primary text-lg font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                        <Link
                            href="#pesan"
                            className="btn-primary w-full text-center mt-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Pesan Sekarang
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;