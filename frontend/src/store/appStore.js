import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CATEGORIES } from "../../../shared/constants";

const appStore = create(
  persist(
    (set) => ({
      theme: "Light",
      categories: CATEGORIES,
      limit: 0,

      setTheme: (theme) => set({ theme }),
      setCategories: (categories) => set({ categories }),
      setLimit: (limit) => set({ limit }),
      logout: () => {
        set({ theme: "Light", categories: [], limit: 0 });
        setTimeout(() => {
          localStorage.removeItem("app-setting");
        }, 100);
      },
    }),
    { name: "app-setting" }
  )
);

export default appStore;
