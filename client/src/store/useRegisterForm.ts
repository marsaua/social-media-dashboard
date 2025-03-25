import { useQueryClient, useMutation } from "@tanstack/react-query";
import { User } from "@/store/types";
import { fetchData } from "./helpers";
import { useNavigate } from "react-router-dom";

export const useRegistration = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const registerUser = async (data: User) => {
    try {
      const result: { accessToken: string } = await fetchData(
        "/auth/register",
        "POST",
        data,
      );
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
      navigate("/");
    },
  });

  return {
    ...mutation,
  };
};

export const useRegisterForm = () => {
  const { mutate, isError, error, isSuccess } = useRegistration();

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
