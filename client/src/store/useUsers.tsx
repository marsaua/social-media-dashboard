import { useMutation } from "@tanstack/react-query";
import type { RegisterData } from "@/store/types";
import { fetchData } from "./helpers";

export const useUsers = () => {
  const registerUser = async (data: getUsers) => {
    try {
      const result: { accessToken: string } = await fetchData("/auth/register", "POST", data, {}, true);
      return result;
    } catch (error) {
      console.log("Full error:", error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuth({ accessToken: data.accessToken });
      console.log(data);

      navigate("/home");
    },
  });

  return {
    ...mutation,
  };
};

export const useRegisterForm = () => {
  const { mutate, isError, error, isSuccess } = useRegistration();

  const initialValues: RegisterData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    avatar: "",
  };

  const handleSubmit = (values: RegisterData) => {
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
