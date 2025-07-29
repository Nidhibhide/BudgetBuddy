import { getbudget, getCategories } from "../api";
import { convertCurrency } from "./Utils";
import { CATEGORIES } from "../constants";
export const setLimitFromAPI = async (setLimit, data) => {
  try {
    const res = await getbudget();
    const storedLimitINR = res?.data?.limit ?? 0;
    const userCurrency = data?.currency || "INR";

    if (userCurrency !== "INR") {
      const convertedLimit = await convertCurrency(
        Number(storedLimitINR),
        userCurrency,
        "INR"
      );
      setLimit(convertedLimit);
    } else {
      setLimit(storedLimitINR);
    }
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
