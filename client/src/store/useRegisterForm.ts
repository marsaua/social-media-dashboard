import { useMutation } from "@tanstack/react-query";
import { RegisterData } from "@/store/types";
import { fetchData } from "./helpers";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useRegistration = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const registerUser = async (data: RegisterData) => {
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
