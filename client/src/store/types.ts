export type User = {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  accessToken?: string;
};

export type Auth = {
  accessToken?: string;
};
export type AuthContextType = {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
};

export type LogInData = {
  username: string;
  password: string;
};

export type RegisterData = {
  username: string;
  password: string;
  firstName: string;
  lastName?: string;
  avatar?: string;
};
