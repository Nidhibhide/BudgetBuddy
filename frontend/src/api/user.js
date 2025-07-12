import { globalaxios } from "../globals";
export const signup = async (data) => {
  try {
    const res = await globalaxios.post("/user/register", data);

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

export const signin = async (data) => {
  try {
    const res = await globalaxios.post("/user/login", data);
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
export const signinwithGoogle = async (token) => {
  try {
    const res = await globalaxios.post("/user/google-login", { token });
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
export const getMe = async () => {
  try {
    const res = await globalaxios.get("/user/getMe");
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
