import { WorkStep as WorkStepType } from '@/types';
import Icon from './Icon';

interface WorkStepProps {
    step: WorkStepType;
    isLast?: boolean;
}

const WorkStep: React.FC<WorkStepProps> = ({ step, isLast = false }) => {
    return (
        <div className="flex flex-col items-center text-center relative">
            {/* Step Number Circle */}
            <div className="w-16 h-16 rounded-full bg-primary text-dark-text flex items-center justify-center text-xl font-bold mb-6 relative z-10">
                {step.step}
            </div>

            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Icon name={step.icon} className="h-7 w-7" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold mb-2 text-dark-text">{step.title}</h3>
            <p className="text-dark-textSecondary">{step.description}</p>

            {/* Connector Line */}
            {!isLast && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+4rem)] w-full h-0.5 bg-dark-border">
                    <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: '0%' }}></div>
                </div>
            )}
        </div>
    );
};

export default WorkStep;