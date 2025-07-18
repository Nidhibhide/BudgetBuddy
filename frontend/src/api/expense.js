import { globalaxios } from "../globals";
export const createExpense = async (data) => {
  try {
    const res = await globalaxios.post("/expense/create", data);
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
export const getAllExpense = async (filters) => {
  try {
    const res = await globalaxios.get("/expense/getAll", { params: filters });
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
export const getCount = async (categories) => {
  try {
    const res = await globalaxios.post("/expense/get-count", categories);
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
export const softdelete = async (categories) => {
  try {
    const res = await globalaxios.put("/expense/delete", categories);
    return res.data;
  } catch (err) {
    return (
      err.response?.data || {
        message: "Unexpected error occurred",
        statusCode: 500,
      }
    );
  }
};
