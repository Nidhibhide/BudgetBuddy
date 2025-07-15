import { globalaxios } from "../globals";
export const createCategory = async (data) => {
  try {
    const res = await globalaxios.post("/category/create", data);
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
export const getCategories = async () => {
  try {
    const res = await globalaxios.get("/category/get");
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
