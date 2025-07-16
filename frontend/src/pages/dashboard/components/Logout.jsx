import React, { useEffect } from "react";
import { authStore,appStore } from "../../../store";
import { logout } from "../../../api";
import { showError } from "../../../components";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const auth = authStore((state) => state.logout);
  const app = appStore((state) => state.logout);
  const navigate = useNavigate();
  useEffect(() => {
    const LogoutFunc = async () => {
      try {
        const response = await logout();
        auth();
        app();
        const { message, statusCode } = response;
        if (statusCode === 200) {
          setTimeout(() => navigate("/"), 3000);
        } else {
          showError(message);
          setTimeout(() => navigate("/dashboard/home"), 3000);
        }
      } catch (error) {
        showError(error.message);
      }
    };
    LogoutFunc();
  }, []);
  return <div></div>;
};

export default Logout;
