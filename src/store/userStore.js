// stores/useAuthStore.ts
import { create } from "zustand";
const userDefault = {
  id: "",
  name: "",
  avatar: "",
};
const themeDefault = {};
export const useAuthStore = create((set) => ({
  user: userDefault,
  setUser: (user) => set({ user }),
  logout: () => set({ user: userDefault }),
}));
export const useThemeStore = create((set) => ({
  theme: themeDefault,
  setTheme: (theme) => set({ theme }),
}));
