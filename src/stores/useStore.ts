import { create } from 'zustand';
import { Member, FilterState, Toast } from '../types';
import { members } from '../mock/data';

interface AppState {
  // Auth
  currentUser: Member | null;
  isAdmin: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  
  // Directory
  allMembers: Member[];
  filteredMembers: Member[];
  filters: FilterState;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  
  // UI
  isMobileMenuOpen: boolean;
  activeModal: string | null;
  toasts: Toast[];
  setMobileMenuOpen: (open: boolean) => void;
  openModal: (modalName: string) => void;
  closeModal: () => void;
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
  
  // Selected member for profile
  selectedMember: Member | null;
  setSelectedMember: (member: Member | null) => void;
  
  // Admin
  pendingApprovals: Member[];
}

export const useStore = create<AppState>((set, get) => ({
  // Auth
  currentUser: null,
  isAdmin: false,
  login: (email: string) => {
    const user = members.find(m => m.email === email) || members[0];
    set({ currentUser: user, isAdmin: email.includes('admin') });
    get().addToast(`Welcome back, ${user.ownerName.split(' ')[0]}!`, 'success');
  },
  logout: () => {
    set({ currentUser: null, isAdmin: false });
    get().addToast('Logged out successfully', 'info');
  },
  
  // Directory
  allMembers: members,
  filteredMembers: [...members],
  filters: {
    search: '',
    categories: [],
    locations: [],
    tiers: []
  },
  searchQuery: '',
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().applyFilters();
  },
  clearFilters: () => {
    set({ 
      filters: { search: '', categories: [], locations: [], tiers: [] },
      searchQuery: ''
    });
    get().applyFilters();
  },
  applyFilters: () => {
    const { allMembers, filters, searchQuery } = get();
    let result = [...allMembers];
    
    // Search
    const q = (searchQuery || filters.search || '').toLowerCase().trim();
    if (q) {
      result = result.filter(m => 
        m.businessName.toLowerCase().includes(q) || 
        m.description.toLowerCase().includes(q) ||
        m.ownerName.toLowerCase().includes(q)
      );
    }
    
    // Categories
    if (filters.categories.length > 0) {
      result = result.filter(m => filters.categories.includes(m.category));
    }
    
    // Tiers
    if (filters.tiers.length > 0) {
      result = result.filter(m => filters.tiers.includes(m.tier));
    }
    
    // Sort: Featured first, then Premium, Verified, Free
    result.sort((a, b) => {
      const tierOrder = { featured: 0, premium: 1, verified: 2, free: 3 };
      return (tierOrder[a.tier] || 4) - (tierOrder[b.tier] || 4);
    });
    
    set({ filteredMembers: result });
  },
  
  // UI
  isMobileMenuOpen: false,
  activeModal: null,
  toasts: [],
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  openModal: (modalName) => set({ activeModal: modalName }),
  closeModal: () => set({ activeModal: null }),
  addToast: (message, type) => {
    const id = Date.now().toString();
    const newToast = { id, message, type, duration: 4000 };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    
    setTimeout(() => {
      get().removeToast(id);
    }, newToast.duration);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
  },
  
  selectedMember: null,
  setSelectedMember: (member) => set({ selectedMember: member }),
  
  // Admin
  pendingApprovals: members.slice(3, 6),
}));
