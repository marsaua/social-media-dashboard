import { useQueryClient, useMutation } from "@tanstack/react-query";
import { User } from "@/store/types";
import { fetchData } from "./helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useAutherization = () => {
  const { setAuth } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const logInUser = async (data: User) => {
    try {
      const result: { accessToken: string } = await fetchData("/auth/login", "POST", data);
      return result;
    } catch (error: any) {
      console.log("Full error:", error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: logInUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["authToken"], data.accessToken);
      setAuth({ accessToken: data.accessToken });
      navigate(from || "/home", { replace: true });
    },
    onError: (error) => {
      console.log("MESSAGE:", error.message);
      console.log("STATUS:", error.status);
      console.log("VALIDATION ERRORS:", error.errors);
    },
  });

  return {
    ...mutation,
  };
};

export const useLogInForm = () => {
  const { mutate, isError, error, isSuccess } = useAutherization();

  const initialValues: User = {
    username: "",
    password: "",
  };
  const handleSubmit = (values: User) => {
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
