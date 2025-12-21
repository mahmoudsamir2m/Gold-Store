import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split("@")[0],
          };

          set({ user: mockUser });
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: "user@gmail.com",
            name: "Google User",
            avatar:
              "https://ui-avatars.com/api/?name=Google+User&background=random",
          };

          set({ user: mockUser });
        } finally {
          set({ isLoading: false });
        }
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
          };

          set({ user: mockUser });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null });
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log("Password reset email sent to:", email);
        } finally {
          set({ isLoading: false });
        }
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
