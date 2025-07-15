import { globalaxios } from "../globals";
export const editbudget = async (data) => {
  try {
    const res = await globalaxios.put("/budget/edit", data);
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
export const getbudget = async () => {
  try {
    const res = await globalaxios.get("/budget/get");
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
