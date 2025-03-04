import { Testimonial } from '@/types';
import Image from 'next/image';

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <div className="bg-dark-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow border border-dark-border/30">
            {/* Star Rating */}
            <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={i < testimonial.rating ? 'currentColor' : 'none'}
                        stroke={i < testimonial.rating ? 'none' : 'currentColor'}
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-primary' : 'text-gray-600'}`}
                    >
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                ))}
            </div>

            {/* Quote */}
            <p className="text-dark-text mb-6">"{testimonial.content}"</p>

            {/* Person */}
            <div className="flex items-center">
                {testimonial.image ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
                        <span className="text-lg font-semibold">{testimonial.name.charAt(0)}</span>
                    </div>
                )}
                <div>
                    <h4 className="font-semibold text-dark-text">{testimonial.name}</h4>
                    <p className="text-sm text-dark-textSecondary">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;