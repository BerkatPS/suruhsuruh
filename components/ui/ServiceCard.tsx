import React from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '@/types';
import Icon from './Icon';

interface ServiceCardProps {
    service: ServiceItem;
    onClick: (service: ServiceItem) => void;
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, index }) => {
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1
            }
        }
    };

    return (
        <motion.div
            className="bg-dark-card rounded-xl shadow-card p-6 transition-all duration-300 border border-dark-border/30 group cursor-pointer hover:shadow-lg hover:-translate-y-1"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            onClick={() => onClick(service)}
        >
            <div className="flex flex-col h-full relative">
                <div className="mb-6 relative">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark-text transition-colors">
                        <Icon name={service.icon} className="h-8 w-8" />
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-dark-text group-hover:text-primary transition-colors">
                    {service.title}
                </h3>

                <p className="text-dark-textSecondary mb-6 flex-grow">
                    {service.description}
                </p>

                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent double triggering
                        onClick(service);
                    }}
                    className="inline-flex items-center text-primary font-medium"
                >
                    Selengkapnya
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
};

export default ServiceCard;