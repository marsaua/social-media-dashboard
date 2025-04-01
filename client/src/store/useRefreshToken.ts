// store/useRefreshToken.ts
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async (): Promise<string> => {
    const response = await fetchData<RefreshResponse>("/auth/refresh-token", "POST", undefined, {}, true);
    setAuth({ ...response, refreshToken: response.refreshToken });
    console.log(response);
    return response.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
