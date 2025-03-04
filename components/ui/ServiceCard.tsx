import { ServiceItem } from '@/types';
import Icon from './Icon';
import Link from 'next/link';

interface ServiceCardProps {
    service: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    return (
        <div className="bg-dark-card rounded-xl shadow-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-dark-border/30 group">
            <div className="flex flex-col h-full">
                <div className="mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-dark-text transition-colors">
                        <Icon name={service.icon} className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-dark-text group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-dark-textSecondary mb-6 flex-grow">{service.description}</p>
                <Link href={`/layanan/${service.id}`} className="inline-flex items-center text-primary font-medium">
                    {/*Selengkapnya*/}
                    {/*<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">*/}
                    {/*    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />*/}
                    {/*</svg>*/}
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;