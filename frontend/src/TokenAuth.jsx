import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkToken, refreshToken } from "./api";
const TokenAuth = ({ children }) => {
  const [status, setStatus] = useState("loading");

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
            setStatus("expired");
          }
        }
      } catch (err) {
        setStatus("expired");
      }
    };

    validateToken();
  }, []);

  // Redirect logic
  if (status === "loading") return null;
  if (status === "expired") return <Navigate to="/session-expired" />;

  return children;
};

export default TokenAuth;
