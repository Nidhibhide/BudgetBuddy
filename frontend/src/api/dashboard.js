import { globalaxios } from "../globals";
export const getTransactions = async () => {
  try {
    const res = await globalaxios.get("/dashboard/get-transactions");
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
export const getCategoryData = async () => {
  try {
    const res = await globalaxios.get("/dashboard/get-categoryData");
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
export const getTips = async () => {
  try {
    const res = await globalaxios.get("/dashboard/get-tips");
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
export const getBarChart = async () => {
  try {
    const res = await globalaxios.get("/dashboard/get-barChart");
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
