import { useState } from 'react';
import { FAQ } from '@/types';

interface FAQItemProps {
    faq: FAQ;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
            >
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <span className="flex-shrink-0 ml-2">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="p-5 pt-0 text-secondary/70">
                    {faq.answer}
                </div>
            </div>
        </div>
    );
};

export default FAQItem;