// components/ui/TestimonialCard.tsx
import React from 'react';

interface TestimonialCardProps {
    name: string;
    role: string;
    image: string;
    testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, image, testimonial }) => {
    return (
        <div className="bg-gray-900 rounded-xl p-6 shadow-md border border-gray-800 hover:border-amber-500/30 transition-all duration-300">
            <div className="flex items-start mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-amber-500/10 flex items-center justify-center">
                    {image ? (
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-amber-500 font-semibold text-lg">{name.charAt(0)}</span>
                    )}
                </div>
                <div className="ml-4">
                    <h3 className="text-white font-semibold">{name}</h3>
                    <p className="text-gray-400 text-sm">{role}</p>
                </div>
            </div>
            <div className="relative">
                <svg className="absolute top-0 left-0 w-8 h-8 text-amber-500/20 transform -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-300 relative pl-6">
                    {testimonial.replace(/"/g, '&quot;')}
                </p>
            </div>
        </div>
    );
};

export default TestimonialCard;