import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null, // current user data

  // store user data
  setUser: (user) => set({ user }),

  // clear user data
  clearUser: () => set({ user: null }),
}));
