import WizardForm from '@/components/wizard-form/WizardForm';

const Contact = () => {
    return (
        <section id="pesan" className="section bg-dark-bg">
            <div className="container-custom">
                <div className="section-title">
                    <h2>Pesan Sekarang</h2>
                    <p>
                        Isi formulir di bawah dan tim kami akan segera menghubungi Anda
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <WizardForm />
                </div>
            </div>
        </section>
    );
};

export default Contact;