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

  const registerUser = async (data: User) => {
    try {
      const result: { accessToken: string } = await fetchData("/auth/login", "POST", data);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || "Register failed.");
      }
      throw new Error("Register failed.");
    }
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["authToken"], data.accessToken);
      setAuth({ accessToken: data.accessToken });
      console.log(data);

      navigate(from, { replace: true });
    },
  });

  return {
    ...mutation,
  };
};

export const useRegisterForm = () => {
  const { mutate, isError, error, isSuccess } = useAutherization();

  const initialValues: User = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    avatar: "",
  };

  const handleSubmit = (values: User) => {
    mutate(values);
    console.log(values);
  };

  return {
    initialValues,
    handleSubmit,
    isError,
    error,
    isSuccess,
  };
};
