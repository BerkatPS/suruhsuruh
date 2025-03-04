import { ServiceFeature } from '@/types';
import Icon from './Icon';

interface FeatureItemProps {
    feature: ServiceFeature;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ feature }) => {
    return (
        <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-card hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Icon name={feature.icon} className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-secondary/70">{feature.description}</p>
        </div>
    );
};

export default FeatureItem;