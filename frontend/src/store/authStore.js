import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set, get) => ({
      user: null,

      //set user data
      setUser: (userData) => set({ user: userData }),

      // //get user data
      // getUser: () => get().user,

      //clear data
      logout: () => set({ user: null }),
    }),
    {
      name: "data", // key in localStorage
    }
  )
);
export default authStore;
