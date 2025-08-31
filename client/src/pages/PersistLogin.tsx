import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "@/store/useRefreshToken";
import { useAuth } from "@/store/useAuth";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error("Could not refresh token:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth?.accessToken) {
      console.log("refresh");

      verifyRefreshToken();
    } else {
      console.log("not refresh");

      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("isLoading", isLoading);
    console.log("auth", JSON.stringify(auth?.accessToken));
  }, [isLoading]);

  return isLoading ? <div>Loading...</div> : <Outlet />;
};
