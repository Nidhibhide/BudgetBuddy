import React from "react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { MONTHS } from "../../../shared/constants";
import { authStore, appStore } from "../store";
import { useNavigate } from "react-router-dom";
import { setLimitFromAPI, setCategoryFromAPI } from "./index";
import { FaUtensils, FaShoppingBag, FaCar, FaHotel } from "react-icons/fa";

export const showSuccess = (message = "Operation Success") => {
  toast.success(message);
};
export const showError = (message = "Operation Failed") => {
  toast.error(message);
};

export const ExportToPdf = async (previewRef) => {
  try {
    const element = previewRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("report.pdf");

    return true;
  } catch (error) {
    console.error("PDF Export failed:", error);
    return false;
  }
};

export const callToStore = async (data) => {
  const setUser = authStore.getState().setUser;
  const setCategories = appStore.getState().setCategories;
  const setLimit = appStore.getState().setLimit;
  setUser(data);
  await setCategoryFromAPI(setCategories);
  await setLimitFromAPI(setLimit);
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
