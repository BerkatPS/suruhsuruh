import WorkStep from '@/components/ui/WorkStep';
import { workSteps } from '@/config/site';

const HowItWorks = () => {
    return (
        <section id="cara-kerja" className="section bg-dark-card">
            <div className="container-custom">
                <div className="section-title">
                    <h2>Bagaimana Cara Kerjanya?</h2>
                    <p>
                        Proses sederhana dalam 4 langkah untuk mendapatkan solusi dari kami
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {workSteps.map((step, index) => (
                        <WorkStep
                            key={step.id}
                            step={step}
                            isLast={index === workSteps.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;