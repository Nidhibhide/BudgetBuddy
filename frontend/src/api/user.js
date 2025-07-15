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
export const editUser = async (data) => {
  try {
    const res = await globalaxios.put("/user/profile", data);
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
export const changePassword = async (data) => {
  try {
    const res = await globalaxios.put("/auth/changePassword", data);
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
export const logout = async () => {
  try {
    const res = await globalaxios.get("/user/logout");
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
export const checkToken = async () => {
  try {
    const res = await globalaxios.get("/auth/checkToken");
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

export const refreshToken = async () => {
  try {
    const res = await globalaxios.get("/auth/refreshToken");
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
