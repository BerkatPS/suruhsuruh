"use client"


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import { AnimatedBackground } from '@/components/ui/AnimationSection';
import { NextPage } from 'next';

const Home: NextPage = () => {
    const [mounted, setMounted] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    // Wait until after client-side hydration to show
    useEffect(() => {
        setMounted(true);

        // Simulate page load animation
        setTimeout(() => {
            setIsPageLoaded(true);
        }, 300);
    }, []);

    // Page load animation variants
    const pageVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2,
                duration: 0.6
            }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, 0.05, 0.01, 0.9]
            }
        }
    };

    if (!mounted) {
        // Use this to avoid hydration issues
        return null;
    }

    return (
        <Layout>
            <AnimatedBackground>
                <motion.div
                    initial="hidden"
                    animate={isPageLoaded ? "visible" : "hidden"}
                    variants={pageVariants}
                >
                    {/* Initial page loading animation */}
                    <AnimatePresence>
                        {!isPageLoaded && (
                            <motion.div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg"
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 180, 360],
                                        opacity: [1, 0.8, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1]
                                    }}
                                >
                                    <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main content sections with staggered animations */}
                    <motion.div variants={sectionVariants}>
                        <Hero />
                    </motion.div>

                    <motion.div
                        variants={sectionVariants}
                        viewport={{ once: true }}
                    >
                        <Services />
                    </motion.div>

                    <motion.div
                        variants={sectionVariants}
                        viewport={{ once: true }}
                    >
                        <Features />
                    </motion.div>

                    <motion.div
                        variants={sectionVariants}
                        viewport={{ once: true }}
                    >
                        <HowItWorks />
                    </motion.div>

                    <motion.div
                        variants={sectionVariants}
                        viewport={{ once: true }}
                    >
                        <Testimonials />
                    </motion.div>

                    <motion.div
                        variants={sectionVariants}
                        viewport={{ once: true }}
                    >
                        <FAQ />
                    </motion.div>

                    <motion.div
                        variants={sectionVariants}
                        viewport={{ once: true }}
                    >
                        <Contact />
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="fixed bottom-8 right-8 z-40 hidden md:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <motion.div
                        className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(250, 128, 41, 0.2)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </motion.div>
                </motion.div>
            </AnimatedBackground>
        </Layout>
    );
};

export default Home;