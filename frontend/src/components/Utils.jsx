import React from "react";
import toast from "react-hot-toast";
import { MONTHS } from "../constants";
import { authStore, appStore } from "../store";
import { useNavigate } from "react-router-dom";
import { setLimitFromAPI, setCategoryFromAPI } from "./index";
import { FaUtensils, FaShoppingBag, FaCar, FaHotel } from "react-icons/fa";
import axios from "axios";

export const showSuccess = (message = "Operation Success") => {
  toast.success(message);
};
export const showError = (message = "Operation Failed") => {
  toast.error(message);
};

export const callToStore = async (data) => {
  const setUser = authStore.getState().setUser;
  const setCategories = appStore.getState().setCategories;
  const setLimit = appStore.getState().setLimit;
  setUser(data);
  await setCategoryFromAPI(setCategories);
  await setLimitFromAPI(setLimit,data);//here jo bhi currency hoga usme INR to current cuurency mein convert krna hoga
};

export const useHandleResponse = () => {
  const navigate = useNavigate();

  const Response = ({ response, successCode = 201 }) => {
    const { message, statusCode } = response;

    if (statusCode === successCode) {
      showSuccess("Changes Saved");
      setTimeout(() => navigate("/dashboard/home"), 3000);
      return true;
    } else {
      showError(message || "Something went wrong");
      return false;
    }
  };

  return Response;
};

export const getDiffCategories = (oldList, newList) => {
  return {
    added: newList.filter((item) => !oldList.includes(item)),
    removed: oldList.filter((item) => !newList.includes(item)),
  };
};

export function getLastSixMonths() {
  const currentMonth = new Date().getMonth();
  const result = [];

  for (let i = 1; i <= 6; i++) {
    const index = (currentMonth - i + 12) % 12;
    result.push(MONTHS[index]);
  }

  return result;
}

export const categoryIcons = {
  Food: <FaUtensils size={20} color="white" />,
  Shopping: <FaShoppingBag size={20} color="white" />,
  Transport: <FaCar size={20} color="white" />,
  Hotel: <FaHotel size={20} color="white" />,
};

export const convertCurrency = async (amount, to, from) => {
  try {
    if (to === from) return amount;
    if (amount === 0) return 0;
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
    const response = await axios.get(url);
    const data = response.data;

    if (!data?.rates?.[to]) {
      throw new Error("Conversion failed or invalid currency.");
    }

    return parseFloat(data.rates[to].toFixed(2));
  } catch (error) {
    console.error("Conversion error:", error.message);
    return 0;
  }
};
