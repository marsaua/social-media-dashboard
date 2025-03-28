// store/useRefreshToken.ts
import { fetchData } from "./helpers";
import { useAuth } from "./useAuth";

interface RefreshResponse {
  accessToken: string;
}

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async (): Promise<string> => {
    const response = await fetchData<RefreshResponse>("/auth/refreshToken", "POST", undefined, {}, true);
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.accessToken);
      return {
        ...prev,
        accessToken: response.accessToken,
      };
    });
    return response.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
