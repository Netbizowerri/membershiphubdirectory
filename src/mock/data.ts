import { Member, Category, Plan, Testimonial } from '../types';

export const categories: Category[] = [
  { slug: "fashion", label: "Fashion", icon: "👗", accent: "#EC4899", count: 87 },
  { slug: "electronics", label: "Electronics", icon: "💻", accent: "#2563EB", count: 124 },
  { slug: "food-vendors", label: "Food Vendors", icon: "🍔", accent: "#F97316", count: 65 },
  { slug: "logistics", label: "Logistics", icon: "🚚", accent: "#14B8A6", count: 42 },
  { slug: "services", label: "Services", icon: "🛠️", accent: "#8B5CF6", count: 156 },
  { slug: "health", label: "Health", icon: "💊", accent: "#10B981", count: 73 },
  { slug: "real-estate", label: "Real Estate", icon: "🏠", accent: "#92400E", count: 39 },
  { slug: "finance", label: "Finance", icon: "💰", accent: "#4338CA", count: 51 },
];

export const members: Member[] = [
  {
    id: "1",
    slug: "luxe-tailors",
    businessName: "Luxe Tailors",
    ownerName: "Aisha Okon",
    email: "aisha@luxe.ng",
    phone: "+234 801 234 5678",
    whatsapp: "+234 801 234 5678",
    category: "fashion",
    location: { city: "Lagos", state: "Lagos" },
    description: "Premium bespoke tailoring and fashion design studio specializing in corporate and traditional wear. 12 years of excellence serving Nigeria's elite.",
    profilePhoto: "https://picsum.photos/id/64/300/300",
    coverPhoto: "https://picsum.photos/id/1015/800/400",
    gallery: ["https://picsum.photos/id/64/600/400", "https://picsum.photos/id/201/600/400", "https://picsum.photos/id/29/600/400"],
    services: [
      { id: "s1", title: "Bespoke Suits", description: "Hand-tailored suits from premium fabrics", price: 125000 },
      { id: "s2", title: "Traditional Attire", description: "Custom Agbada and Ankara designs", price: 85000 },
    ],
    socialLinks: {
      instagram: "@luxetailors",
      website: "https://luxetailors.ng",
      facebook: "luxetailorsng"
    },
    tier: "featured",
    isApproved: true,
    isFeatured: true,
    featuredOrder: 1,
    joinedAt: "2023-11-12T10:00:00Z",
    stats: { profileViews: 1248, whatsappClicks: 87, messageCount: 34 }
  },
  {
    id: "2",
    slug: "tech-haven",
    businessName: "Tech Haven Electronics",
    ownerName: "Chinedu Eze",
    email: "info@techhaven.ng",
    phone: "+234 802 345 6789",
    whatsapp: "+234 802 345 6789",
    category: "electronics",
    location: { city: "Abuja", state: "FCT" },
    description: "Leading distributor of premium consumer electronics, smart home devices and IT solutions. Authorized dealer for global brands.",
    profilePhoto: "https://picsum.photos/id/201/300/300",
    coverPhoto: "https://picsum.photos/id/160/800/400",
    gallery: ["https://picsum.photos/id/201/600/400", "https://picsum.photos/id/29/600/400"],
    services: [
      { id: "s3", title: "Smartphones", description: "Latest flagship phones from all major brands", price: 450000 },
      { id: "s4", title: "Laptops & Accessories", description: "Business and gaming laptops", price: 320000 },
    ],
    socialLinks: {
      instagram: "@techhavenng",
      website: "https://techhaven.ng"
    },
    tier: "premium",
    isApproved: true,
    isFeatured: true,
    featuredOrder: 2,
    joinedAt: "2024-01-05T10:00:00Z",
    stats: { profileViews: 873, whatsappClicks: 124, messageCount: 52 }
  },
  {
    id: "3",
    slug: "green-bite",
    businessName: "Green Bite Catering",
    ownerName: "Fatima Yusuf",
    email: "orders@greenbite.ng",
    phone: "+234 803 456 7890",
    category: "food-vendors",
    location: { city: "Lagos", state: "Lagos" },
    description: "Corporate catering and event food services. Healthy, delicious meals with a focus on local organic ingredients.",
    profilePhoto: "https://picsum.photos/id/29/300/300",
    coverPhoto: "https://picsum.photos/id/133/800/400",
    gallery: ["https://picsum.photos/id/29/600/400"],
    services: [
      { id: "s5", title: "Corporate Lunches", description: "Healthy meal packages for offices", price: 8500 },
    ],
    socialLinks: {
      instagram: "@greenbitecatering",
    },
    tier: "verified",
    isApproved: true,
    isFeatured: false,
    joinedAt: "2023-09-20T10:00:00Z",
    stats: { profileViews: 542, whatsappClicks: 67, messageCount: 19 }
  },
  // Add 7 more to reach ~10 for demo
  {
    id: "4",
    slug: "swift-logistics",
    businessName: "Swift Logistics",
    ownerName: "Emmanuel Adebayo",
    email: "dispatch@swiftlogistics.ng",
    phone: "+234 809 123 4567",
    whatsapp: "+234 809 123 4567",
    category: "logistics",
    location: { city: "Port Harcourt", state: "Rivers" },
    description: "Reliable last-mile delivery and freight services across Nigeria. Same-day delivery in major cities.",
    profilePhoto: "https://picsum.photos/id/160/300/300",
    coverPhoto: "https://picsum.photos/id/180/800/400",
    gallery: [],
    services: [],
    socialLinks: {},
    tier: "premium",
    isApproved: true,
    isFeatured: false,
    joinedAt: "2024-02-10T10:00:00Z",
    stats: { profileViews: 312, whatsappClicks: 98, messageCount: 41 }
  },
  {
    id: "5",
    slug: "pure-health-clinic",
    businessName: "Pure Health Clinic",
    ownerName: "Dr. Ngozi Okoro",
    email: "info@purehealth.ng",
    phone: "+234 704 567 8901",
    category: "health",
    location: { city: "Abuja", state: "FCT" },
    description: "Modern wellness and primary healthcare center. Specializing in preventive medicine, corporate health checks and telehealth.",
    profilePhoto: "https://picsum.photos/id/64/300/300",
    coverPhoto: "https://picsum.photos/id/201/800/400",
    gallery: [],
    services: [],
    socialLinks: { website: "https://purehealth.ng" },
    tier: "featured",
    isApproved: true,
    isFeatured: true,
    featuredOrder: 3,
    joinedAt: "2023-08-15T10:00:00Z",
    stats: { profileViews: 671, whatsappClicks: 45, messageCount: 28 }
  },
  {
    id: "6",
    slug: "elite-estates",
    businessName: "Elite Estates Ltd",
    ownerName: "Tunde Balogun",
    email: "sales@eliteestates.ng",
    phone: "+234 805 678 9012",
    category: "real-estate",
    location: { city: "Lagos", state: "Lagos" },
    description: "Luxury real estate development and property management. Over 45 premium estates delivered across Nigeria.",
    profilePhoto: "https://picsum.photos/id/133/300/300",
    coverPhoto: "https://picsum.photos/id/29/800/400",
    gallery: [],
    services: [],
    socialLinks: {},
    tier: "verified",
    isApproved: true,
    isFeatured: false,
    joinedAt: "2024-03-01T10:00:00Z",
    stats: { profileViews: 289, whatsappClicks: 76, messageCount: 14 }
  },
  {
    id: "7",
    slug: "naira-finance",
    businessName: "Naira Finance",
    ownerName: "Adaora Nwosu",
    email: "support@nairafinance.ng",
    phone: "+234 706 789 0123",
    category: "finance",
    location: { city: "Enugu", state: "Enugu" },
    description: "Digital financial services, microloans, savings and investment products for SMEs and individuals.",
    profilePhoto: "https://picsum.photos/id/201/300/300",
    coverPhoto: "https://picsum.photos/id/160/800/400",
    gallery: [],
    services: [],
    socialLinks: { instagram: "@nairafinance" },
    tier: "free",
    isApproved: true,
    isFeatured: false,
    joinedAt: "2024-04-22T10:00:00Z",
    stats: { profileViews: 156, whatsappClicks: 23, messageCount: 9 }
  }
];

export const featuredMembers = members.filter(m => m.isFeatured).sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999));

export const plans: Plan[] = [
  {
    id: "free",
    tier: "free",
    name: "Free Member",
    price: "₦0",
    priceNum: 0,
    interval: "forever",
    features: ["Basic directory listing", "Searchable profile", "1 business photo", "Standard support"],
    cta: "Get Started Free"
  },
  {
    id: "verified",
    tier: "verified",
    name: "Verified",
    price: "₦15,000",
    priceNum: 15000,
    interval: "mo",
    features: ["Everything in Free", "Green verification badge", "Priority in search results", "5 business photos", "Basic analytics"],
    cta: "Get Verified",
    popular: false
  },
  {
    id: "premium",
    tier: "premium",
    name: "Premium",
    price: "₦45,000",
    priceNum: 45000,
    interval: "mo",
    features: ["Everything in Verified", "Blue glowing profile", "Category homepage feature", "15 business photos", "Product listings", "Advanced analytics"],
    cta: "Go Premium",
    popular: true,
    recommended: true
  },
  {
    id: "featured",
    tier: "featured",
    name: "Featured",
    price: "₦120,000",
    priceNum: 120000,
    interval: "mo",
    features: ["Everything in Premium", "Homepage carousel placement", "Top directory ranking", "Unlimited photos & gallery", "Priority customer support", "Lead generation"],
    cta: "Become Featured",
    popular: false
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aisha Bello",
    business: "Luxe Tailors",
    avatar: "https://picsum.photos/id/64/128/128",
    quote: "MemberHub has completely transformed how customers discover us. The featured placement brought in 3x more inquiries in the first month.",
    rating: 5,
    category: "fashion"
  },
  {
    id: "t2",
    name: "Chinedu Okeke",
    business: "Tech Haven",
    avatar: "https://picsum.photos/id/201/128/128",
    quote: "The analytics dashboard is incredible. We can see exactly where our leads are coming from. Best investment we've made this year.",
    rating: 5,
    category: "electronics"
  },
  {
    id: "t3",
    name: "Dr. Ifeoma Adewale",
    business: "Pure Health Clinic",
    avatar: "https://picsum.photos/id/64/128/128",
    quote: "Being featured helped us establish trust instantly. Patients now reach out directly through the directory with confidence.",
    rating: 5,
    category: "health"
  }
];

export const stats = {
  members: 1243,
  categories: 8,
  cities: 14,
  satisfaction: 98
};
