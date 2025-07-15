import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set, get) => ({
      user: null,

      // Set user data
      setUser: (userData) => set({ user: userData }),

      // Clear user data and local storage
      logout: () => {
        set({ user: null });
        setTimeout(() => {
          localStorage.removeItem("auth_data");
        }, 100);
      },
    }),
    {
      name: "auth_data",
    }
  )
);

export default authStore;
