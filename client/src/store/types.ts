export type User = {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  refreshToken?: string;
  accessToken?: string;
};

export type Auth = {
  accessToken?: string;
  refreshToken?: string;
};
export type AuthContextType = {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
};
