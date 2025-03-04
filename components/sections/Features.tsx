import FeatureItem from '@/components/ui/FeatureItem';
import { features } from '@/config/site';

const Features = () => {
    return (
        <section className="section bg-dark-bg">
            <div className="container-custom">
                <div className="section-title">
                    <h2>Mengapa Memilih Kami?</h2>
                    <p>
                        Kami berkomitmen memberikan pengalaman terbaik untuk setiap pelanggan
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <FeatureItem key={feature.id} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;