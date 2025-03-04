// Common Types
export type ServiceCategory = 'academic' | 'electronic';

// Form Types
export interface FormDataStep1 {
    category: ServiceCategory;
}

export interface AcademicFormData {
    projectType: string;
    educationLevel: string;
    subject: string;
    deadline: string;
    description: string;
    additionalInfo?: string;
    hasAttachment: boolean;
}

export interface ElectronicFormData {
    deviceType: string;
    brand: string;
    model?: string;
    issueType: string;
    urgency: string;
    description: string;
    additionalInfo?: string;
    hasAttachment: boolean;
}

export interface ContactFormData {
    name: string;
    email: string;
    whatsapp: string;
    preferredContact: 'email' | 'whatsapp';
    termsAccepted: boolean;
}

export interface CompleteFormData {
    step1: FormDataStep1;
    step2: AcademicFormData | ElectronicFormData;
    step3: ContactFormData;
}

// Services
export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: ServiceCategory;
}

export interface ServiceFeature {
    id: string;
    title: string;
    description: string;
    icon: string;
}

// Testimonials
export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    category: ServiceCategory;
    image?: string;
}

// FAQ
export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: ServiceCategory;
}

// How It Works
export interface WorkStep {
    id: string;
    title: string;
    description: string;
    icon: string;
    step: number;
}

// Navigation
export interface NavItem {
    title: string;
    href: string;
    isExternal?: boolean;
}

// Theme Configuration
export interface ThemeConfig {
    mainNav: NavItem[];
    footerNav: {
        section: string;
        items: NavItem[];
    }[];
}