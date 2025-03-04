// components/wizard-form/WizardForm.tsx
import { useState, ReactElement } from 'react';

interface WizardFormProps {
    children: ReactElement[];
    onComplete?: (data: any) => void;
    initialStep?: number;
}

// interface StepProps {
//     title?: string;
//     children: ReactNode;
//     onNext?: (data: any) => void;
//     onBack?: () => void;
// }

const WizardForm: React.FC<WizardFormProps> = ({ children, onComplete, initialStep = 0 }) => {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isCompleted, setIsCompleted] = useState(false);

    const goToNextStep = (stepData: any) => {
        const newFormData = { ...formData, [`step${currentStep + 1}`]: stepData };
        setFormData(newFormData);

        if (currentStep < children.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsCompleted(true);
            if (onComplete) {
                onComplete(newFormData);
            }
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const currentChild = children[currentStep];

    const stepWithProps = {
        ...currentChild,
        props: {
            // @ts-expect-error
            ...currentChild.props,
            onNext: goToNextStep,
            onBack: goToPreviousStep,
            formData: formData,
            currentStep: currentStep,
            totalSteps: children.length
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {!isCompleted ? (
                <div>
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            {children.map((_, index) => (
                                <div key={index} className="flex items-center">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                            index < currentStep
                                                ? 'bg-primary text-dark-bg'
                                                : index === currentStep
                                                    ? 'bg-primary/20 text-primary border border-primary'
                                                    : 'bg-dark-bg text-dark-textSecondary border border-dark-border'
                                        }`}
                                    >
                                        {index < currentStep ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            index + 1
                                        )}
                                    </div>
                                    {index < children.length - 1 && (
                                        <div
                                            className={`w-full h-1 ${
                                                index < currentStep ? 'bg-primary' : 'bg-dark-border'
                                            }`}
                                            style={{ minWidth: '2rem' }}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {stepWithProps}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-dark-text">Formulir Berhasil Dikirim!</h2>
                    <p className="text-dark-textSecondary mb-6">Tim kami akan segera menghubungi Anda untuk informasi lebih lanjut.</p>
                    <button
                        className="btn-primary"
                        onClick={() => window.location.href = '/'}
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            )}
        </div>
    );
};

export default WizardForm;