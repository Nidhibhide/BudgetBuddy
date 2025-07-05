// registerUser
//login
//googleLogin
import { globalaxios } from "../globals";
export const signup = async (data) => {
  try {
    const res = await globalaxios.post("/user/register", data);
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
export const signin = async (data) => {
  try {
    const res = await globalaxios.post("/user/login", data);
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};
export const signinwithGoogle = async (token) => {
  try {
    const res = await globalaxios.post("/user/google-login", { token });
    return res.data;
  } catch (err) {
    return (
      err.response || { message: "Unexpected error occurred", status: 500 }
    );
  }
};