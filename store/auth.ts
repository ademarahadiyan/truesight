// 21) /store/auth.ts
import { create } from "zustand";

type User = { email?: string; name?: string } | null;

type AuthState = {
  token: string | null;
  user: User;
  setToken: (t: string | null) => void;
  setUser: (u: User) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined" ? localStorage.getItem("token") : null,

  user: null,

  setToken: (t) => {
    if (typeof window !== "undefined" && t) {
      localStorage.setItem("token", t);
    }
    set({ token: t });
  },

  setUser: (u) => set({ user: u }),

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({ token: null, user: null });
  }
}));
