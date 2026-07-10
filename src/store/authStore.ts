import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales_rep';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    set({
      user: {
        id: 'u-1',
        name: email.split('@')[0],
        email,
        role: 'sales_rep'
      },
      isAuthenticated: true
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));
