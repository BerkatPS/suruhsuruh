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

// Service Pricing Structure
export interface ServicePricing {
    value: number;
    unit?: string;
    startingFrom?: boolean;
    negotiable?: boolean;
    note?: string;
}

// Package Structure
export interface ServicePackage {
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice?: number;
    regularPrice?: number; // For showing discounted price comparisons
    billingNote?: string;
    features: string[];
    highlighted?: boolean; // For highlighting the recommended package
}

// Service Structure for Modal
export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    fullDescription?: string; // Detailed description for modal
    icon: string;
    category: ServiceCategory;
    features?: string[]; // List of service features
    pricing?: ServicePricing; // Basic pricing information (used if packages are not defined)
    packages?: ServicePackage[]; // Different service tiers/packages
    pricingNote?: string; // Additional pricing notes
    terms?: string[]; // Service terms and conditions

    // Academic-specific fields
    documents?: string[]; // Types of documents handled
    subjects?: string[]; // Academic subjects covered
    educationLevels?: string[]; // Education levels supported

    // Electronic-specific fields
    devices?: string[]; // Types of devices repaired
    issueTypes?: string[]; // Types of issues handled
    brands?: string[]; // Brands supported
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