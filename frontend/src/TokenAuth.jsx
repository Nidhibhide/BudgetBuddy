import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkToken, refreshToken } from "./api";
import { useLocation } from "react-router-dom";
import { authStore, appStore } from "./store";
const TokenAuth = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const auth = authStore((state) => state.logout);
  const app = appStore((state) => state.logout);
  const location = useLocation();
  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await checkToken();
        const { statusCode } = res;
        if (statusCode === 200) {
          setStatus("valid");
        } else {
          const res = await refreshToken();
          const { statusCode } = res;
          if (statusCode === 200) {
            await validateToken();
          } else {
            auth();
            app();
            setStatus("expired");
          }
        }
      } catch (err) {
        setStatus("expired");
      }
    };

    validateToken();
  }, [location.pathname]);

  // Redirect logic
  if (status === "loading") return null;
  if (status === "expired") return <Navigate to="/session-expired" />;

  return children;
};

export default TokenAuth;
