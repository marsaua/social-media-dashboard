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
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || "Autherization failed.");
      }
      throw new Error("Autherization failed.");
    }
  };

  const mutation = useMutation({
    mutationFn: logInUser,
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

export const useLogInForm = () => {
  const { mutate, isError, error, isSuccess } = useAutherization();

  const initialValues: User = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();
  const handleSubmit = (values: User) => {
    mutate(values);
    navigate("/home");
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
