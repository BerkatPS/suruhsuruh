import React from 'react';
import { motion } from 'framer-motion';

// Komponen untuk menambahkan efek latar belakang animasi
export const AnimatedBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative overflow-hidden">
            {/* Background shapes */}
            <div className="bg-shapes">
                <div className="bg-shape bg-shape-1"></div>
                <div className="bg-shape bg-shape-2"></div>
            </div>

            {/* Glow orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="glow-orb glow-orb-1"></div>
                <div className="glow-orb glow-orb-2"></div>
                <div className="glow-orb glow-orb-3"></div>
            </div>

            {/* Animated grid background */}
            <div className="absolute inset-0 animated-grid opacity-[0.03] pointer-events-none"></div>

            {/* Actual content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

// Komponen untuk text yang muncul berurutan (letter by letter)
export const AnimatedLetters: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
    return (
        <span className={className}>
      {text.split('').map((char, index) => (
          <motion.span
              key={index}
              className="letter-pop-in inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
          >
              {char === ' ' ? '\u00A0' : char}
          </motion.span>
      ))}
    </span>
    );
};

// Komponen untuk elemen yang muncul dengan fade dan berurutan
export const StaggerChildren: React.FC<{
    children: React.ReactNode;
    className?: string;
    delay?: number;
    staggerDelay?: number;
}> = ({ children, className = "", delay = 0, staggerDelay = 0.1 }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: staggerDelay,
                delayChildren: delay
            }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return (
                        <motion.div key={index} variants={childVariants}>
                            {child}
                        </motion.div>
                    );
                }
                return child;
            })}
        </motion.div>
    );
};

// Komponen untuk elemen dengan efek hover 3D
export const TiltCard: React.FC<{
    children: React.ReactNode;
    className?: string;
    tiltAmount?: number;
}> = ({ children, className = "", tiltAmount = 10 }) => {
    return (
        <motion.div
            className={`tilt-card ${className}`}
            whileHover={{
                rotateX: tiltAmount / 2,
                rotateY: -tiltAmount,
                scale: 1.05,
                transition: { duration: 0.3 }
            }}
        >
            <div className="tilt-card-content">
                {children}
            </div>
        </motion.div>
    );
};

// Komponen untuk floating icon
export const FloatingIcon: React.FC<{
    children: React.ReactNode;
    duration?: number;
    distance?: number;
}> = ({ children, duration = 3, distance = 5 }) => {
    return (
        <motion.div
            animate={{
                y: [-distance, distance, -distance],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {children}
        </motion.div>
    );
};

// Komponen untuk efek highlight yang bergetar
export const PulseHighlight: React.FC<{
    children: React.ReactNode;
    isActive?: boolean;
}> = ({ children, isActive = true }) => {
    return (
        <motion.div
            className={isActive ? "pulse-highlight" : ""}
            animate={isActive ? {
                boxShadow: [
                    "0 0 0 0 rgba(250, 128, 41, 0.4)",
                    "0 0 0 10px rgba(250, 128, 41, 0)",
                    "0 0 0 0 rgba(250, 128, 41, 0)"
                ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
        >
            {children}
        </motion.div>
    );
};

// Komponen untuk animasi underline wave
export const WaveUnderline: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <span className="wave-underline">
      {children}
    </span>
    );
};

// Komponen untuk shimmer effect
export const Shimmer: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <div className="shimmer">
            {children}
        </div>
    );
};