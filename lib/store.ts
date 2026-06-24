import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

interface Mockup {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  userId: string;
  createdAt: Date;
  isPublic: boolean;
}

interface MockupStore {
  mockups: Mockup[];
  setMockups: (mockups: Mockup[]) => void;
  addMockup: (mockup: Mockup) => void;
  removeMockup: (id: string) => void;
}

export const useMockupStore = create<MockupStore>((set) => ({
  mockups: [],
  setMockups: (mockups) => set({ mockups }),
  addMockup: (mockup) => set((state) => ({ mockups: [...state.mockups, mockup] })),
  removeMockup: (id) => set((state) => ({ mockups: state.mockups.filter((m) => m.id !== id) })),
}));
