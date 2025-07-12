import { globalaxios } from "../globals";
export const create = async (data) => {
  try {
    const res = await globalaxios.post("/expense/create", data);
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
export const getAll = async (filters) => {
  try {
    const res = await globalaxios.get("/expense/getAll", { params: filters });
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
