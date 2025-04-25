import { useMutation } from "@tanstack/react-query";
import { LogInData } from "@/store/types";
import { fetchData } from "./helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useAutherization = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const logInUser = async (data: LogInData) => {
    try {
      const result: { accessToken: string } = await fetchData("/auth/sign-in", "POST", data);
      return result;
    } catch (error) {
      console.log("Full error:", error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: logInUser,
    onSuccess: (data) => {
      setAuth({ accessToken: data.accessToken });
      navigate(from || "/home", { replace: true });
    },
    onError: (error) => {
      console.log("MESSAGE:", error);
    },
  });

  return {
    ...mutation,
  };
};

export const useLogInForm = () => {
  const { mutate, isError, error, isSuccess } = useAutherization();

  const initialValues: LogInData = {
    username: "",
    password: "",
  };
  const handleSubmit = (values: LogInData) => {
    mutate(values);
  };

  return {
    initialValues,
    handleSubmit,
    isError,
    error,
    isSuccess,
  };
};
