// store/useRefreshToken.ts
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";

interface RefreshResponse {
  accessToken: string;
}

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async (): Promise<string> => {
    const response = await fetchData<RefreshResponse>("/auth/refresh-token", "POST", undefined, {}, true);
    setAuth({ accessToken: response.accessToken });
    return response.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
