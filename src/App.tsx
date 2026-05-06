import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Search, MapPin, Phone, MessageCircle, Star, 
  Menu, X, ChevronLeft, ArrowRight, 
  Check 
} from 'lucide-react';
import { useStore } from './stores/useStore';
import { Member, Plan } from './types';
import { categories, plans, testimonials, featuredMembers, members } from './mock/data';

const TierBadge = ({ tier, size = 'md' }: { tier: string; size?: 'sm' | 'md' }) => {
  const colors: Record<string, string> = {
    featured: 'bg-amber-500 text-white border-amber-400',
    premium: 'bg-blue-600 text-white border-blue-400',
    verified: 'bg-emerald-500 text-white border-emerald-400',
    free: 'bg-slate-200 text-slate-700 border-slate-300'
  };
  
  const labels: Record<string, string> = {
    featured: 'FEATURED',
    premium: 'PREMIUM',
    verified: 'VERIFIED',
    free: 'FREE'
  };
  
  const icon = tier === 'featured' ? '🏆' : tier === 'premium' ? '⭐' : tier === 'verified' ? '✓' : '👤';
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-[0.5px] font-semibold rounded-full border ${colors[tier] || colors.free} ${size === 'sm' ? 'text-[9px] px-2 py-0.5' : ''}`}>
      <span>{icon}</span>
      <span>{labels[tier] || tier.toUpperCase()}</span>
    </div>
  );
};

const Avatar = ({ src, tier, size = 48, className = '' }: { src?: string; tier?: string; size?: number; className?: string }) => (
  <div className={`relative inline-block flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
    <img 
      src={src || `https://picsum.photos/id/${Math.floor(Math.random()*100)}/300/300`} 
      alt="Profile" 
      className="w-full h-full object-cover rounded-full ring-2 ring-white shadow-md"
    />
    {tier && tier !== 'free' && (
      <div className="absolute -bottom-0.5 -right-0.5">
        <TierBadge tier={tier} size="sm" />
      </div>
    )}
  </div>
);

const MemberCard = ({ member, onViewProfile }: { member: Member; onViewProfile: (member: Member) => void }) => {
  const isFeatured = member.tier === 'featured';
  const isPremium = member.tier === 'premium';
  
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`member-card group relative bg-white rounded-3xl overflow-hidden border ${isFeatured ? 'border-amber-400 shadow-xl shadow-amber-500/10' : isPremium ? 'border-blue-400 shadow-xl shadow-blue-500/10' : 'border-slate-200'} h-full flex flex-col`}
    >
      {isFeatured && (
        <div className="absolute top-4 right-4 z-20">
          <div className="shimmer px-4 py-1 text-[10px] font-mono bg-amber-500 text-white rounded-3xl flex items-center gap-1 shadow-md">
            <span>★</span> FEATURED
          </div>
        </div>
      )}
      
      <div className="relative h-48">
        <img 
          src={member.coverPhoto} 
          alt={member.businessName}
          className="w-full h-full object-cover"
        />
        <div className="absolute -bottom-8 left-6">
          <Avatar src={member.profilePhoto} tier={member.tier} size={72} />
        </div>
      </div>
      
      <div className="pt-12 px-6 pb-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-display text-2xl font-semibold text-slate-900 tracking-tight">{member.businessName}</h3>
          <TierBadge tier={member.tier} />
        </div>
        
        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span>{member.location.city}</span>
          <span className="text-emerald-500 font-medium">• {member.category}</span>
        </div>
        
        <p className="line-clamp-3 text-slate-600 text-[15px] flex-1 mb-6">
          {member.description}
        </p>
        
        <div className="border-t pt-6 mt-auto flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${member.whatsapp?.replace(/\D/g,'')}`, '_blank'); }}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition-colors text-white text-sm font-medium py-3 px-4 rounded-2xl"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => { e.stopPropagation(); onViewProfile(member); }}
            className="flex-1 border border-slate-300 hover:bg-slate-50 transition-colors text-slate-700 text-sm font-medium py-3 px-4 rounded-2xl"
          >
            View Profile
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const { isMobileMenuOpen, setMobileMenuOpen, currentUser, logout, isAdmin } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-display text-2xl font-bold tracking-tighter">M</div>
            <div>
              <div className="font-display text-3xl font-semibold tracking-tighter text-slate-900">memberhub</div>
              <div className="text-[10px] text-slate-400 -mt-1 font-mono">DIRECTORY</div>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-sm">
            <Link to="/directory" className={`font-medium transition-colors hover:text-blue-600 ${isActive('/directory') ? 'text-blue-600' : 'text-slate-600'}`}>Directory</Link>
            <Link to="/categories" className={`font-medium transition-colors hover:text-blue-600 ${isActive('/categories') ? 'text-blue-600' : 'text-slate-600'}`}>Categories</Link>
            <Link to="/join" className={`font-medium transition-colors hover:text-blue-600 ${isActive('/join') ? 'text-blue-600' : 'text-slate-600'}`}>Join</Link>
            {currentUser && <Link to="/dashboard" className={`font-medium transition-colors hover:text-blue-600 ${isActive('/dashboard') ? 'text-blue-600' : 'text-slate-600'}`}>Dashboard</Link>}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Avatar src={currentUser.profilePhoto} size={36} />
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{currentUser.ownerName}</div>
                    <div className="text-[10px] text-emerald-500 font-medium">Online</div>
                  </div>
                </div>
                {isAdmin && (
                  <Link to="/admin" className="px-5 py-2.5 text-xs font-semibold rounded-3xl border border-amber-400 text-amber-600 hover:bg-amber-50">ADMIN</Link>
                )}
                <button 
                  onClick={logout}
                  className="text-sm px-6 py-2.5 font-medium text-slate-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-8 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Log in
                </button>
                <Link 
                  to="/join" 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm font-semibold rounded-3xl shadow-lg shadow-blue-500/30 flex items-center gap-2"
                >
                  Join Free <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-slate-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-lg">
              <Link to="/directory" onClick={() => setMobileMenuOpen(false)} className="font-medium">Directory</Link>
              <Link to="/join" onClick={() => setMobileMenuOpen(false)} className="font-medium">For Businesses</Link>
              {currentUser && <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="font-medium">My Dashboard</Link>}
              
              {!currentUser && (
                <div className="pt-4 border-t flex flex-col gap-4">
                  <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="w-full py-4 border text-slate-700 font-medium rounded-3xl">Log in</button>
                  <Link to="/join" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-blue-600 text-white font-semibold rounded-3xl text-center">Join the Directory</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { setSearchQuery } = useStore();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm);
      navigate('/directory');
    }
  };
  
  return (
    <div className="relative pt-8 pb-20 overflow-hidden bg-[#0F172A] text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_0.8px,transparent_1px)] bg-[length:20px_20px] opacity-30"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 text-white text-xs tracking-[1px] font-mono px-5 h-7 rounded-3xl mb-8 border border-white/20"
          >
            NIGERIA'S PREMIER BUSINESS NETWORK
          </motion.div>
          
          <h1 className="font-display text-5xl sm:text-7xl md:text-[92px] leading-[1.05] font-semibold tracking-tighter mb-6">
            Discover the<br />best local<br />businesses.
          </h1>
          
          <p className="text-2xl text-slate-400 max-w-md mb-12">
            Connect with verified Nigerian businesses. From fashion to fintech.
          </p>
          
          <form onSubmit={handleSearch} className="relative w-full max-w-sm sm:max-w-xl">
            <div className="bg-white rounded-3xl p-2 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center">
              <div className="flex-1 flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-0">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search businesses or services..."
                  className="flex-1 bg-transparent outline-none text-lg sm:text-xl placeholder:text-slate-400 text-slate-900 font-light min-w-0"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-6 sm:px-10 py-4 sm:py-6 rounded-3xl flex items-center justify-center gap-2 sm:gap-3 group min-h-[48px] sm:min-h-0"
              >
                <span className="hidden sm:inline">SEARCH</span>
                <span className="sm:hidden">Find</span>
                <div className="group-active:rotate-45 transition-transform">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </button>
            </div>
            <div className="absolute -bottom-8 right-0 sm:right-12 text-xs flex items-center gap-5 text-white/60">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div> <span className="hidden sm:inline">1,243 members online</span><span className="sm:hidden">1.2k online</span></div>
            </div>
          </form>
        </div>
      </div>
      
      {/* Floating avatars */}
      <div className="absolute right-12 bottom-12 hidden xl:block">
        <div className="flex -space-x-6">
          {[1,2,3,4].map(i => (
            <motion.div 
              key={i}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              className="w-16 h-16 border-[6px] border-[#0F172A] rounded-full overflow-hidden shadow-2xl"
            >
              <img src={`https://picsum.photos/id/${50 + i}/300/300`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
        <div className="mt-4 bg-white/95 text-slate-900 text-sm font-medium px-6 py-3 rounded-3xl shadow-xl inline-flex items-center gap-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />)}
          </div>
          <div>
            Trusted by <span className="font-semibold text-emerald-500">1.2k</span> businesses
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsBar = () => {
  const [counts, setCounts] = useState({ members: 0, categories: 0, cities: 0, satisfaction: 0 });
  
  useEffect(() => {
    const animate = () => {
      let start = 0;
      const duration = 1800;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        
        setCounts({
          members: Math.floor(1243 * ease),
          categories: Math.floor(8 * ease),
          cities: Math.floor(14 * ease),
          satisfaction: Math.floor(98 * ease)
        });
        
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };
    
    const timeout = setTimeout(animate, 800);
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="bg-white py-8 border-b">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Active Members", value: counts.members, suffix: "+" },
          { label: "Categories", value: counts.categories },
          { label: "Cities Covered", value: counts.cities },
          { label: "Satisfaction", value: counts.satisfaction, suffix: "%" }
        ].map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-4xl font-semibold text-slate-900 tracking-tighter mb-1">{stat.value}{stat.suffix}</div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FeaturedMembers = ({ onViewProfile }: { onViewProfile: (m: Member) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="uppercase text-blue-600 text-xs tracking-[2px] font-mono mb-3">CURATED SELECTION</div>
          <h2 className="font-display text-5xl tracking-tighter font-semibold text-slate-900">Featured Businesses</h2>
        </div>
        <Link to="/directory" className="hidden md:flex items-center gap-2 text-sm font-medium group">
          VIEW ALL 
          <div className="transition group-hover:translate-x-1">→</div>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredMembers.slice(0, 3).map((member) => (
          <MemberCard key={member.id} member={member} onViewProfile={onViewProfile} />
        ))}
      </div>
    </div>
  );
};

const CategoryGrid = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 bg-slate-50">
      <div className="flex justify-between items-baseline mb-10">
        <h2 className="font-display text-5xl font-semibold tracking-tight">Explore by Industry</h2>
        <Link to="/categories" className="text-blue-600 text-sm flex items-center gap-2 hover:underline">All categories <ArrowRight className="w-3 h-3" /></Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <motion.div 
            key={cat.slug}
            whileHover={{ scale: 1.02, y: -4 }}
            onClick={() => navigate(`/directory?category=${cat.slug}`)}
            className="group bg-white border border-slate-100 hover:border-slate-200 rounded-3xl p-8 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <div className="text-7xl mb-6 transition-transform group-hover:scale-110">{cat.icon}</div>
            <div className="font-semibold text-2xl text-slate-900 mb-1">{cat.label}</div>
            <div className="text-sm text-slate-500">{cat.count} businesses</div>
            
            <div className="mt-8 text-blue-500 text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
              BROWSE <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 pb-32">
      <div className="text-center mb-16">
        <div className="inline px-4 py-1.5 text-xs font-medium bg-amber-100 text-amber-600 rounded-3xl">TESTIMONIALS</div>
        <h2 className="font-display text-5xl tracking-tighter mt-4">Real stories from real members</h2>
      </div>

      <div className="relative h-[420px]">
        <AnimatePresence mode="wait">
          {testimonials.map((testimonial, idx) => (
            idx === current && (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-white rounded-3xl shadow-xl p-8 md:p-12 flex flex-col"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="text-xl md:text-2xl leading-relaxed text-slate-700 font-light flex-1">
                  "{testimonial.quote}"
                </div>

                <div className="flex items-center gap-5 pt-8 border-t">
                  <Avatar src={testimonial.avatar} size={56} />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.business}</div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-3 mt-12">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${idx === current ? 'bg-blue-600 scale-125' : 'bg-slate-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

const JoinCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mx-6 mt-16 mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 py-16 px-10 text-white">
      <div className="max-w-md">
        <div className="uppercase font-mono tracking-widest text-blue-200 text-sm mb-4">NEXT STEP FOR YOUR BUSINESS</div>
        <h2 className="font-display text-5xl leading-none tracking-tighter mb-6">Ready to be discovered by thousands?</h2>
        <p className="text-blue-100 text-lg mb-10">Join thousands of Nigerian businesses growing their customer base through MemberHub.</p>
        
        <div className="flex flex-wrap gap-4">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.985 }}
            onClick={() => navigate('/join/register')}
            className="bg-white text-blue-700 px-10 py-4 rounded-3xl font-semibold flex items-center gap-3 shadow-xl"
          >
            START FOR FREE
          </motion.button>
          <button 
            onClick={() => navigate('/join')}
            className="border border-white/60 hover:bg-white/10 transition-colors px-8 py-4 rounded-3xl font-medium"
          >
            Compare plans
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-12 hidden lg:block">
        <div className="-mb-6 text-[180px] opacity-10">📍</div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 pt-20">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-y-16">
      <div className="col-span-2 md:col-span-1">
        <div className="flex items-center gap-3 text-white mb-6">
          <div className="w-8 h-8 bg-white rounded-2xl flex items-center justify-center text-blue-600 text-3xl font-bold">M</div>
          <span className="font-display text-4xl font-semibold tracking-tighter text-white">memberhub</span>
        </div>
        <p className="text-sm leading-relaxed pr-8">Connecting Nigerian businesses with customers since 2023.</p>
        
        <div className="mt-10 flex gap-6">
          {['𝕏', 'IG', 'FB', 'LN'].map(s => (
            <div key={s} className="w-8 h-8 border border-white/30 rounded-2xl flex items-center justify-center text-xs hover:bg-white/5 cursor-pointer transition-colors">{s}</div>
          ))}
        </div>
      </div>
      
      {[
        ['Product', 'Directory', 'Categories', 'Pricing', 'For Startups'],
        ['Company', 'About', 'Blog', 'Careers', 'Contact'],
        ['Resources', 'Help Center', 'Community', 'Success Stories'],
        ['Legal', 'Privacy', 'Terms', 'Trust & Safety']
      ].map((col, index) => (
        <div key={index}>
          <div className="font-medium text-white mb-6 text-sm tracking-widest">{col[0]}</div>
          <div className="space-y-3 text-sm">
            {col.slice(1).map(item => <div key={item} className="hover:text-white cursor-pointer transition-colors">{item}</div>)}
          </div>
        </div>
      ))}
    </div>
    
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
      <div>© {new Date().getFullYear()} MemberHub Directory. All rights reserved.</div>
      <div className="flex gap-6">
        <div>Made for the entrepreneurs of Nigeria</div>
      </div>
    </div>
  </footer>
);

const DirectoryPage = ({ onViewProfile }: { onViewProfile: (member: Member) => void }) => {
  const { filteredMembers, filters, setFilters, clearFilters, searchQuery, setSearchQuery } = useStore();
  const [showFilters, setShowFilters] = useState(false);
  
  const allCities = Array.from(new Set(members.map(m => m.location.city)));
  
  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div className="font-semibold text-xl">Filters</div>
              <button onClick={clearFilters} className="text-xs text-blue-600 hover:underline">Clear all</button>
            </div>
            
            {/* Search */}
            <div className="mb-8">
              <div className="text-xs font-medium text-slate-500 mb-2">KEYWORD</div>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Business name..." 
                  className="w-full bg-white border border-slate-200 focus:border-blue-400 rounded-2xl px-5 py-4 text-sm outline-none"
                />
                <Search className="absolute right-5 top-4 w-5 h-5 text-slate-400" />
              </div>
            </div>
            
            {/* Categories */}
            <div className="mb-8">
              <div className="text-xs font-medium text-slate-500 mb-3">CATEGORIES</div>
              <div className="space-y-2 max-h-72 overflow-auto pr-2 custom-scroll">
                {categories.map(cat => (
                  <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={filters.categories.includes(cat.slug)}
                      onChange={(e) => {
                        const newCats = e.target.checked 
                          ? [...filters.categories, cat.slug]
                          : filters.categories.filter(c => c !== cat.slug);
                        setFilters({ categories: newCats });
                      }}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <div className="flex-1 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span> {cat.label}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{cat.count}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Locations */}
            <div className="mb-8">
              <div className="text-xs font-medium text-slate-500 mb-3">LOCATION</div>
              {allCities.map(city => (
                <label key={city} className="flex items-center gap-3 cursor-pointer group mb-2">
                  <input 
                    type="checkbox" 
                    checked={filters.locations.includes(city)}
                    onChange={(e) => {
                      const newLocs = e.target.checked 
                        ? [...filters.locations, city]
                        : filters.locations.filter(c => c !== city);
                      setFilters({ locations: newLocs });
                    }}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-sm">{city}</span>
                </label>
              ))}
            </div>
            
            {/* Tiers */}
            <div>
              <div className="text-xs font-medium text-slate-500 mb-3">MEMBERSHIP</div>
              {['featured','premium','verified','free'].map(t => (
                <label key={t} className="flex items-center gap-3 cursor-pointer group mb-2 last:mb-0">
                  <input 
                    type="checkbox" 
                    checked={filters.tiers.includes(t)}
                    onChange={(e) => {
                      const newTiers = e.target.checked 
                        ? [...filters.tiers, t]
                        : filters.tiers.filter(ti => ti !== t);
                      setFilters({ tiers: newTiers });
                    }}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <div className="capitalize text-sm flex items-center gap-2">
                    <TierBadge tier={t} size="sm" />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <div>
              <span className="font-semibold text-3xl text-slate-900">{filteredMembers.length}</span>
              <span className="text-slate-400 ml-2">businesses found</span>
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 border px-6 py-3 rounded-3xl text-sm"
            >
              <span>Filters</span>
              {filters.categories.length + filters.tiers.length > 0 && <div className="bg-blue-500 text-white text-[10px] px-2 rounded-full h-4 flex items-center justify-center font-mono">+{filters.categories.length + filters.tiers.length}</div>}
            </button>
          </div>
          
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredMembers.map(member => (
                <MemberCard key={member.id} member={member} onViewProfile={onViewProfile} />
              ))}
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center">
              <div className="text-8xl mb-6 opacity-40">🔎</div>
              <div className="text-3xl font-medium mb-2 text-slate-800">No matches found</div>
              <p className="max-w-xs text-slate-500">Try broadening your filters or search terms.</p>
              <button onClick={clearFilters} className="mt-8 text-sm border px-8 py-3.5 rounded-3xl">Clear all filters</button>
            </div>
          )}
          
          {filteredMembers.length > 0 && (
            <div className="mt-16 flex justify-center">
              <button className="px-10 py-4 border border-slate-300 text-sm flex items-center gap-3 rounded-3xl hover:bg-slate-50">
                LOAD MORE BUSINESSES <span className="text-xs px-3 py-1 bg-slate-100 rounded-full font-mono">12</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileModal = ({ member, isOpen, onClose }: { member: Member | null; isOpen: boolean; onClose: () => void }) => {
  const { addToast } = useStore();
  
  if (!member || !isOpen) return null;
  
  const handleContact = (type: string) => {
    if (type === 'whatsapp') {
      window.open(`https://wa.me/${member.whatsapp?.replace(/[^0-9]/g, '') || '2348012345678'}`, '_blank');
      addToast('Opening WhatsApp...', 'success');
    } else if (type === 'call') {
      window.location.href = `tel:${member.phone}`;
    } else {
      addToast('Message feature coming in Phase 2', 'info');
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 z-[100]" onClick={onClose} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", bounce: 0.02, duration: 0.4 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white max-w-4xl w-full max-h-[92vh] overflow-auto rounded-3xl shadow-2xl">
              {/* Cover */}
              <div className="relative h-80">
                <img src={member.coverPhoto} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                
                <button onClick={onClose} className="absolute top-6 right-6 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur">
                  ✕
                </button>
                
                <div className="absolute bottom-0 left-0 p-10 flex items-end gap-8 w-full">
                  <Avatar src={member.profilePhoto} tier={member.tier} size={130} className="ring-8 ring-white shadow-2xl" />
                  
                  <div className="-mb-1">
                    <TierBadge tier={member.tier} />
                    <h1 className="text-white text-6xl font-display tracking-tighter mt-3">{member.businessName}</h1>
                    <div className="flex items-center gap-4 text-white/90 mt-2">
                      <div className="flex items-center gap-1"><MapPin className="inline w-4" /> {member.location.city}, {member.location.state}</div>
                      <div className="bg-white/20 text-xs px-4 py-1 rounded-3xl">{member.category.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7">
                  <h3 className="uppercase text-xs tracking-widest font-medium mb-4 text-slate-500">ABOUT THIS BUSINESS</h3>
                  <p className="text-lg leading-relaxed text-slate-600">{member.description}</p>
                  
                  <div className="mt-14">
                    <h4 className="font-semibold mb-6 text-xl">Our Services</h4>
                    <div className="space-y-6">
                      {member.services.length > 0 ? member.services.map(service => (
                        <div key={service.id} className="flex gap-6 border-l-4 border-blue-200 pl-6">
                          <div className="flex-1">
                            <div className="font-medium">{service.title}</div>
                            <div className="text-sm text-slate-500 mt-1">{service.description}</div>
                          </div>
                          {service.price && <div className="font-mono text-right text-emerald-600 text-lg">₦{service.price.toLocaleString()}</div>}
                        </div>
                      )) : <div className="opacity-40 italic">Services will be displayed here in the live version.</div>}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <div className="font-medium mb-4">QUICK ACTIONS</div>
                    <div className="space-y-3">
                      <button onClick={() => handleContact('call')} className="w-full flex items-center justify-between border p-5 rounded-3xl hover:bg-slate-50 group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center"><Phone className="w-5 h-5" /></div>
                          <div className="text-left">
                            <div className="font-semibold text-sm">Call Now</div>
                            <div className="text-xs text-slate-500">{member.phone}</div>
                          </div>
                        </div>
                        <ArrowRight className="text-slate-300 group-hover:text-blue-500 transition" />
                      </button>
                      
                      <button onClick={() => handleContact('whatsapp')} className="w-full flex items-center justify-between border p-5 rounded-3xl hover:bg-emerald-50 group border-emerald-100">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">💬</div>
                          <div className="text-left">
                            <div className="font-semibold text-sm text-emerald-700">Chat on WhatsApp</div>
                            <div className="text-xs text-emerald-600/80">{member.whatsapp}</div>
                          </div>
                        </div>
                        <ArrowRight className="text-emerald-200 group-hover:text-emerald-500 transition" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-4 flex items-center justify-between">
                      <span>GALLERY</span>
                      <span className="text-xs text-slate-400">3 PHOTOS</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {member.gallery && member.gallery.length > 0 ? member.gallery.map((img, index) => (
                        <div key={index} className="aspect-square rounded-2xl overflow-hidden border"><img src={img} className="object-cover w-full h-full" /></div>
                      )) : (
                        Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="aspect-square bg-slate-100 rounded-2xl flex items-center justify-center text-4xl">📸</div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t p-6 flex justify-end">
                <button onClick={onClose} className="px-10 py-3.5 text-sm font-medium">Close Profile</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const PricingPage = () => {
  const navigate = useNavigate();
  const { addToast } = useStore();
  
  const handleSelectPlan = (plan: Plan) => {
    if (plan.tier === 'free') {
      addToast('Welcome! Your free membership has been activated.', 'success');
      setTimeout(() => navigate('/join/register'), 800);
    } else {
      addToast(`Redirecting to checkout for ${plan.name}... (mock)`, 'info');
    }
  };
  
  return (
    <div className="pt-16 pb-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="font-mono text-xs tracking-widest text-blue-600 mb-4">MEMBERSHIP TIERS</div>
          <h1 className="font-display text-6xl tracking-tighter font-semibold">Choose how you grow</h1>
          <p className="mt-4 max-w-md mx-auto text-lg text-slate-600">Transparent pricing. Real results. Cancel anytime.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: plan.recommended ? -12 : -6 }}
              className={`bg-white rounded-3xl p-8 border-2 flex flex-col relative ${plan.recommended ? 'border-blue-600 shadow-2xl scale-[1.03] z-10' : 'border-transparent'}`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-medium px-6 py-1 rounded-3xl shadow">MOST POPULAR</div>
              )}
              
              <div>
                <div className="uppercase text-xs font-medium tracking-widest text-slate-400">{plan.name}</div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-6xl font-display font-semibold tracking-tighter">{plan.price}</span>
                  <span className="text-slate-400 text-sm">/{plan.interval}</span>
                </div>
              </div>
              
              <ul className="my-12 space-y-5 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="mt-0.5 w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleSelectPlan(plan)}
                className={`mt-auto w-full py-6 text-sm font-semibold rounded-3xl transition-all ${plan.recommended ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' : 'bg-slate-900 text-white hover:bg-black'}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center text-xs mt-16 text-slate-400">All plans include profile editing, directory listing, and analytics dashboard. Prices in Naira.</div>
      </div>
    </div>
  );
};

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    businessName: '',
    category: '',
    location: '',
    phone: '',
    description: '',
    plan: 'free'
  });
  const [completed, setCompleted] = useState(false);
  const { addToast, login } = useStore();
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (step < 3) {
      setStep(s => s + 1);
    } else {
      // Submit
      setCompleted(true);
      confetti({
        particleCount: 180,
        spread: 80,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        addToast("Congratulations! Your profile has been submitted for review.", "success");
        login(formData.email, 'demo123');
        navigate('/dashboard');
      }, 2100);
    }
  };
  
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  if (completed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white">
        <div className="text-center max-w-md">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="mx-auto mb-8 w-28 h-28 bg-emerald-100 rounded-full flex items-center justify-center text-7xl"
          >
            🎉
          </motion.div>
          <h2 className="font-display text-5xl tracking-tight mb-4">Welcome to the family!</h2>
          <p className="text-slate-600 mb-12">Your business profile is now live and under review by our team. Expect an email within 24 hours.</p>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-emerald-600 text-white px-14 py-6 rounded-3xl text-lg font-semibold shadow-inner"
          >
            GO TO MY DASHBOARD →
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto px-5 py-16">
      <div className="mb-12">
        <div className="flex gap-4 mb-8">
          {[1,2,3].map(s => (
            <div key={s} className={`h-2 flex-1 rounded-full transition-all ${step >= s ? 'bg-blue-600' : 'bg-slate-200'}`} />
          ))}
        </div>
        <div className="font-display text-6xl font-medium tracking-tighter">Create your profile</div>
        <div className="text-slate-500 mt-4">Step {step} of 3 • Takes 4 minutes</div>
      </div>
      
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            className="space-y-8"
          >
            <div>
              <label className="block text-xs font-medium mb-2 text-slate-500">YOUR NAME</label>
              <input value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} type="text" className="w-full rounded-3xl border border-slate-200 px-7 py-7 focus:border-blue-400 outline-none text-2xl" placeholder="Aisha Okon" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2 text-slate-500">BUSINESS EMAIL</label>
              <input value={formData.email} onChange={(e) => updateField('email', e.target.value)} type="email" className="w-full rounded-3xl border border-slate-200 px-7 py-7 focus:border-blue-400 outline-none text-2xl" placeholder="hello@yourbusiness.ng" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium mb-2 text-slate-500">PASSWORD</label>
                <input value={formData.password} onChange={(e) => updateField('password', e.target.value)} type="password" className="w-full rounded-3xl border border-slate-200 px-7 py-7 focus:border-blue-400 outline-none" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2 text-slate-500">CONFIRM PASSWORD</label>
                <input type="password" className="w-full rounded-3xl border border-slate-200 px-7 py-7 focus:border-blue-400 outline-none" placeholder="••••••••" />
              </div>
            </div>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            className="space-y-8"
          >
            <div>
              <label className="block text-xs font-medium mb-2 text-slate-500">BUSINESS NAME</label>
              <input value={formData.businessName} onChange={(e) => updateField('businessName', e.target.value)} type="text" className="w-full rounded-3xl border border-slate-200 px-7 py-7 focus:border-blue-400 outline-none text-2xl" placeholder="Luxe Tailors" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium mb-2 text-slate-500">CATEGORY</label>
                <select value={formData.category} onChange={(e) => updateField('category', e.target.value)} className="w-full rounded-3xl border border-slate-200 px-7 py-7 focus:border-blue-400 outline-none bg-white text-lg">
                  <option value="">Select category...</option>
                  {categories.map(c => <option key={c.slug} value={c.slug}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-2 text-slate-500">CITY</label>
                <input value={formData.location} onChange={(e) => updateField('location', e.target.value)} type="text" className="w-full rounded-3xl border border-slate-200 px-7 py-7 focus:border-blue-400 outline-none" placeholder="Lagos" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-2 text-slate-500">BUSINESS PHONE</label>
              <input value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} type="tel" className="w-full rounded-3xl border border-slate-200 px-7 py-7 focus:border-blue-400 outline-none" placeholder="+234 801 234 5678" />
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-2 text-slate-500">TELL US ABOUT YOUR BUSINESS</label>
              <textarea value={formData.description} onChange={(e) => updateField('description', e.target.value)} rows={5} className="w-full rounded-3xl border border-slate-200 p-7 focus:border-blue-400 outline-none resize-y text-base" placeholder="We specialize in..." />
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            className="space-y-8"
          >
            <div>
              <label className="text-xs font-medium text-slate-500 block mb-4">CHOOSE A PLAN</label>
              <div className="grid grid-cols-1 gap-4">
                {plans.map(plan => (
                  <div 
                    key={plan.id} 
                    onClick={() => updateField('plan', plan.tier)}
                    className={`p-6 border-2 rounded-3xl cursor-pointer transition-all ${formData.plan === plan.tier ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-xl">{plan.name}</div>
                        <div className="text-xs text-slate-500">{plan.price} /mo</div>
                      </div>
                      {formData.plan === plan.tier && <Check className="text-blue-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-8 border-t">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 accent-blue-600" defaultChecked />
                <span className="text-sm">I agree to the Terms of Service and Privacy Policy</span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex justify-between items-center mt-16">
        {step > 1 && (
          <button 
            onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-600"
          >
            <ChevronLeft className="w-4 h-4" /> BACK
          </button>
        )}
        
        <button 
          onClick={handleNext}
          className="ml-auto px-16 py-6 bg-blue-600 text-white font-semibold rounded-3xl flex items-center gap-4 hover:bg-blue-700 transition-all active:scale-[0.985]"
        >
          {step === 3 ? 'COMPLETE REGISTRATION' : 'CONTINUE'} 
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { currentUser, logout } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!currentUser) {
    return <div className="p-12 text-center">Please log in to view dashboard.</div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <div className="font-display tracking-tight text-6xl">Welcome back, {currentUser.ownerName.split(' ')[0]}</div>
          <div className="text-emerald-500 flex items-center gap-2 mt-3">
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div> Your profile is live and verified
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={logout} className="px-5 py-3 text-sm border rounded-3xl">Logout</button>
          <Link to="/dashboard/profile" className="bg-slate-900 text-white px-8 py-3 text-sm font-medium rounded-3xl">Edit profile</Link>
        </div>
      </div>
      
      <div className="flex gap-3 border-b mb-8">
        {['overview', 'listing', 'analytics'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 text-sm transition-colors border-b-2 ${activeTab === tab ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            {tab === 'overview' && 'Overview'}
            {tab === 'listing' && 'My Listing'}
            {tab === 'analytics' && 'Analytics'}
          </button>
        ))}
      </div>
      
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* KPI Cards */}
          <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Profile Views", value: currentUser.stats.profileViews, icon: "👀", trend: "+34%" },
              { label: "WhatsApp Clicks", value: currentUser.stats.whatsappClicks, icon: "📱", trend: "+12%" },
              { label: "Messages", value: currentUser.stats.messageCount, icon: "✉️", trend: "+8" },
              { label: "Rank", value: "4th", icon: "🏅", trend: "in category" }
            ].map((kpi, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border">
                <div className="text-5xl mb-8">{kpi.icon}</div>
                <div className="text-6xl font-display font-semibold tracking-tighter mb-1">{kpi.value}</div>
                <div className="text-xs tracking-widest text-slate-400">{kpi.label}</div>
                <div className="text-xs text-emerald-500 mt-6">{kpi.trend}</div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-8 bg-white rounded-3xl p-10 border">
            <div className="font-medium mb-8 flex items-center justify-between">
              <span>RECENT ACTIVITY</span>
              <span className="text-xs text-slate-400">LAST 30 DAYS</span>
            </div>
            
            <div className="space-y-8">
              {[
                "3 new profile views from Ikeja today",
                "Your WhatsApp link was clicked 8 times this week",
                "New review received: ★★★★★ from customer"
              ].map((activity, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="w-6 h-6 rounded-2xl bg-blue-100 text-blue-500 flex items-center justify-center text-xs font-mono">0{idx+1}</div>
                  <div className="text-slate-600">{activity}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4 bg-white border rounded-3xl p-8 flex flex-col">
            <div className="font-medium mb-6">PROFILE STRENGTH</div>
            
            <div className="flex-1 flex items-center justify-center flex-col">
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 -rotate-12" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="14" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#2563eb" strokeWidth="14" strokeDasharray="327" strokeDashoffset="65" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-7xl font-display font-bold text-blue-600">82</div>
                  <div className="text-xs -mt-2 text-slate-400 tracking-widest">PERCENT</div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-slate-500">Add cover photo and 2 services to reach 100%</div>
          </div>
        </div>
      )}
      
      {activeTab === 'listing' && (
        <div className="bg-white border rounded-3xl p-12">
          <MemberCard member={currentUser} onViewProfile={() => {}} />
          <div className="text-center text-xs text-slate-400 mt-6">This is how your listing appears to visitors</div>
        </div>
      )}
    </div>
  );
};

const AdminPage = () => {
  const { pendingApprovals, addToast } = useStore();
  
  const approveMember = (id: string) => {
    addToast(`Member #${id} approved ✓`, 'success');
  };
  
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white text-slate-950 rounded-3xl text-xs font-semibold">ADMIN CONSOLE</div>
            <div className="font-display text-4xl">MemberHub Control</div>
          </div>
          <div className="text-xs text-emerald-400 font-mono">7 PENDING APPROVALS</div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs text-slate-400">
                <th className="pb-6 font-normal">BUSINESS</th>
                <th className="pb-6 font-normal">CATEGORY</th>
                <th className="pb-6 font-normal">SUBMITTED</th>
                <th className="pb-6 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {pendingApprovals.map((mem, idx) => (
                <tr key={idx} className="group">
                  <td className="py-7 flex items-center gap-4">
                    <Avatar src={mem.profilePhoto} size={42} />
                    <div>
                      <div>{mem.businessName}</div>
                      <div className="text-xs text-slate-500">{mem.ownerName}</div>
                    </div>
                  </td>
                  <td className="py-7 text-slate-400 capitalize">{mem.category}</td>
                  <td className="py-7 text-xs text-slate-400 font-mono">MAR 12</td>
                  <td className="py-7 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => approveMember(mem.id)} className="bg-emerald-500 hover:bg-emerald-600 transition-colors px-8 py-2 text-xs rounded-3xl">APPROVE</button>
                      <button className="border border-white/30 px-5 py-2 text-xs rounded-3xl hover:bg-white/5">REJECT</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-xs opacity-40 text-center">Phase 1 demo • Data is mocked. Real Firebase integration in Phase 2.</div>
      </div>
    </div>
  );
};

function AppContent() {
  const { openModal, closeModal, activeModal, selectedMember, setSelectedMember } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleViewProfile = (member: Member) => {
    setSelectedMember(member);
    openModal('profile');
  };
  
  // Auto close modal on route change
  useEffect(() => {
    if (activeModal) closeModal();
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <StatsBar />
            <FeaturedMembers onViewProfile={handleViewProfile} />
            <CategoryGrid />
            <Testimonials />
            <JoinCTA />
          </>
        } />
        
        <Route path="/directory" element={<DirectoryPage onViewProfile={handleViewProfile} />} />
        <Route path="/categories" element={<CategoryGrid />} />
        <Route path="/join" element={<PricingPage />} />
        <Route path="/join/register" element={<RegistrationForm />} />
        <Route path="/login" element={
          <div className="min-h-[90vh] flex items-center justify-center bg-slate-50">
            <div className="bg-white shadow-xl border p-12 rounded-3xl max-w-md w-full">
              <div className="mx-auto mb-8 flex justify-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-violet-600 rounded-3xl flex items-center justify-center text-white text-4xl font-bold">M</div>
              </div>
              <h2 className="font-display text-center text-5xl tracking-tighter mb-2">Welcome back</h2>
              <p className="text-center text-slate-500 mb-12">Sign in to manage your business profile</p>
              
              <div className="space-y-6">
                <div>
                  <div className="text-xs mb-2 font-medium text-slate-500">EMAIL ADDRESS</div>
                  <input type="email" defaultValue="aisha@luxe.ng" className="border w-full py-6 px-6 rounded-3xl" />
                </div>
                <div>
                  <div className="text-xs mb-2 font-medium text-slate-500">PASSWORD</div>
                  <input type="password" defaultValue="demo123" className="border w-full py-6 px-6 rounded-3xl" />
                </div>
                
                <button 
                  onClick={() => {
                    useStore.getState().login("aisha@luxe.ng", "demo123");
                    navigate('/dashboard');
                  }}
                  className="w-full py-7 bg-slate-900 hover:bg-black transition-colors text-white font-semibold rounded-3xl mt-4"
                >
                  SIGN IN
                </button>
                
                <div className="text-xs text-center text-slate-400 pt-4">Demo credentials pre-filled. Click SIGN IN</div>
              </div>
              
              <div className="text-center mt-10 text-xs">
                Don't have an account? <Link to="/join/register" className="text-blue-600 hover:underline">Join now for free</Link>
              </div>
            </div>
          </div>
        } />
        
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
        
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-zinc-100">
            <div className="text-center">
              <div className="text-[180px] leading-none font-display font-bold text-slate-200 tracking-tighter">404</div>
              <div className="text-3xl -mt-8">Page not found</div>
              <Link to="/" className="mt-8 inline-block px-10 py-4 bg-white border text-sm font-medium rounded-3xl">RETURN HOME</Link>
            </div>
          </div>
        } />
      </Routes>
      
      <Footer />
      
      {/* Profile Modal */}
      <ProfileModal 
        member={selectedMember} 
        isOpen={activeModal === 'profile'} 
        onClose={() => {
          closeModal();
          setSelectedMember(null);
        }} 
      />
      
      {/* Global Toast Container */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2">
        <AnimatePresence>
          {useStore.getState().toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80 }}
              className={`px-6 py-4 rounded-3xl shadow-xl flex items-center gap-3 text-sm max-w-[260px] ${
                toast.type === 'success' ? 'bg-emerald-700 text-white' : 
                toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'
              }`}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
