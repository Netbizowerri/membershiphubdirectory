export interface Location {
  city: string;
  state: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: number;
  image?: string;
}

export interface Member {
  id: string;
  slug: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  category: string;
  location: Location;
  description: string;
  profilePhoto: string;
  coverPhoto: string;
  gallery: string[];
  services: ServiceItem[];
  socialLinks: SocialLinks;
  tier: 'free' | 'verified' | 'premium' | 'featured';
  isApproved: boolean;
  isFeatured: boolean;
  featuredOrder?: number;
  joinedAt: string;
  stats: {
    profileViews: number;
    whatsappClicks: number;
    messageCount: number;
  };
}

export interface Category {
  slug: string;
  label: string;
  icon: string;
  accent: string;
  count: number;
}

export interface Plan {
  id: string;
  tier: string;
  name: string;
  price: string;
  priceNum: number;
  interval: string;
  features: string[];
  cta: string;
  popular?: boolean;
  recommended?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  avatar: string;
  quote: string;
  rating: number;
  category: string;
}

export interface FilterState {
  search: string;
  categories: string[];
  locations: string[];
  tiers: string[];
}

export type Tier = 'free' | 'verified' | 'premium' | 'featured';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}
