import { useState } from 'react';
import Step1Category from './Step1Category';
import Step2AcademicDetails from './Step2AcademicDetails';
import Step2ElectronicDetails from './Step2ElectronicDetails';
import Step3Contact from './Step3Contact';
import Step4Confirmation from './Step4Confirmation';
import { CompleteFormData, FormDataStep1, AcademicFormData, ElectronicFormData, ContactFormData } from '@/types';

const WizardForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<CompleteFormData>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [skippedToContact, setSkippedToContact] = useState(false);

    const handleStep1Submit = (data: FormDataStep1) => {
        setFormData(prev => ({ ...prev, step1: data }));
        setCurrentStep(2);
    };

    const handleStep1Skip = () => {
        // Set default value for step1 and step2
        // @ts-expect-error - Tipe data step2 belum terdefinisi sepenuhnya dalam CompleteFormData
        setFormData(prev => ({
            ...prev,
            step1: { category: 'academic' }, // Default category when skipped
            step2: {
                description: 'Detail akan didiskusikan lebih lanjut via kontak',
                hasAttachment: false
            }
        }));
        setSkippedToContact(true);
        setCurrentStep(3); // Skip to contact form
    };

    const handleStep2Submit = (data: AcademicFormData | ElectronicFormData) => {
        setFormData(prev => ({ ...prev, step2: data }));
        setCurrentStep(3);
    };

    const handleStep3Submit = (data: ContactFormData) => {
        setFormData(prev => ({ ...prev, step3: data }));
        setCurrentStep(4);
    };

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);

        // Here you would send the data to your backend
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Form submitted:', formData);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const goBack = () => {
        if (currentStep > 1) {
            // If we skipped to contact and going back, go back to step 1
            if (skippedToContact && currentStep === 3) {
                setSkippedToContact(false);
                setCurrentStep(1);
            } else {
                setCurrentStep(currentStep - 1);
            }
        }
    };

    const startOver = () => {
        setFormData({});
        setCurrentStep(1);
        setIsSubmitted(false);
        setSkippedToContact(false);
    };

    // Track progress percentage
    // const progressPercentage = ((currentStep - 1) / 3) * 100;

    return (
        <div className="bg-dark-card/80 rounded-xl shadow-lg p-8 border border-dark-border">
            {!isSubmitted ? (
                <>
                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="progress-indicator">
                            {[1, 2, 3, 4].map((step) => (
                                <div key={step} className="flex items-center">
                                    <div
                                        className={`progress-step ${
                                            step === currentStep
                                                ? 'active'
                                                : step < currentStep
                                                    ? 'completed'
                                                    : 'incomplete'
                                        }`}
                                    >
                                        {step < currentStep ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            step
                                        )}
                                    </div>
                                    {step < 4 && (
                                        <div
                                            className={`progress-line ${
                                                step < currentStep ? 'active' : ''
                                            }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Steps */}
                    <div className="relative">
                        <div className={`wizard-step ${currentStep === 1 ? 'active' : ''}`}>
                            <Step1Category
                                onSubmit={handleStep1Submit}
                                onSkip={handleStep1Skip}
                            />
                        </div>

                        <div className={`wizard-step ${currentStep === 2 ? 'active' : ''}`}>
                            {formData.step1?.category === 'academic' ? (
                                <Step2AcademicDetails onSubmit={handleStep2Submit} onBack={goBack} />
                            ) : (
                                <Step2ElectronicDetails onSubmit={handleStep2Submit} onBack={goBack} />
                            )}
                        </div>

                        <div className={`wizard-step ${currentStep === 3 ? 'active' : ''}`}>
                            <Step3Contact
                                onSubmit={handleStep3Submit}
                                onBack={goBack}
                                isSkipped={skippedToContact}
                            />
                        </div>

                        <div className={`wizard-step ${currentStep === 4 ? 'active' : ''}`}>
                            <Step4Confirmation
                                formData={formData as CompleteFormData}
                                onSubmit={handleFinalSubmit}
                                onBack={goBack}
                                isSubmitting={isSubmitting}
                                isSkipped={skippedToContact}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-10">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-primary"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-dark-text">Terima Kasih!</h2>
                    <p className="text-dark-textSecondary mb-8">
                        {skippedToContact
                            ? "Permintaan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda untuk mendiskusikan kebutuhan Anda secara detail."
                            : "Permintaan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda melalui " + (formData.step3?.preferredContact === 'whatsapp' ? 'WhatsApp' : 'Email') + "."
                        }
                    </p>
                    <button
                        onClick={startOver}
                        className="btn-primary"
                    >
                        Kirim Permintaan Lainnya
                    </button>
                </div>
            )}
        </div>
    );
};

export default WizardForm;