import { getbudget, getCategories } from "../api";
import { CATEGORIES } from "../../../shared/constants";
export const setLimitFromAPI = async (setLimit) => {
  try {
    const res = await getbudget();
    const limit = res?.data?.limit || 0;
    setLimit(limit);
  } catch (e) {
    console.error("Error fetching limit:", e);
    setLimit(0);
  }
};
export const setCategoryFromAPI = async (setCategories) => {
  try {
    const res = await getCategories();
    const names = res?.data?.names || CATEGORIES;
    setCategories(names);
  } catch (e) {
    console.error("Error fetching categories:", e);
    setCategories([]);
  }
};
