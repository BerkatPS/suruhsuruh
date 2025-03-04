import { useState } from 'react';
import Link from 'next/link';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        general?: string;
    }>({});

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when field is edited
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = () => {
        const newErrors: {
            email?: string;
            password?: string;
        } = {};

        if (!formData.email) {
            newErrors.email = 'Email harus diisi';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!formData.password) {
            newErrors.password = 'Password harus diisi';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password minimal 6 karakter';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulasi API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // TODO: Implement actual login API call
            console.log('Form submitted:', formData);

            // Redirect to dashboard or home page after successful login
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Login error:', error);
            setErrors({
                general: 'Login gagal. Silakan periksa email dan password Anda.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // <Layout title="Login" description="Login ke akun Anda di SuruhSuruh">
            <section className="min-h-screen py-20 flex items-center justify-center">
                <div className="container-custom">
                    <div className="max-w-md mx-auto">
                        <div className="bg-dark-card rounded-xl shadow-lg p-8 border border-dark-border">
                            <div className="text-center mb-8">
                                <Link href="/" className="inline-block mb-6">
                                    <span className="text-3xl font-bold font-display">
                                        suruh<span className="text-primary">suruh</span>
                                    </span>
                                </Link>
                                <h1 className="text-2xl font-bold text-dark-text mb-2">Masuk ke Akun Anda</h1>
                                <p className="text-dark-textSecondary">
                                    Masukkan kredensial Anda untuk mengakses akun
                                </p>
                            </div>

                            {errors.general && (
                                <div className="bg-red-900/20 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6">
                                    {errors.general}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                                        placeholder="••••••••"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="btn-primary w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Masuk...
                                        </div>
                                    ) : 'Masuk'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        // </Layout>
    );
};

export default LoginPage;