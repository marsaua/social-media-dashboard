import { createContext, useState, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  auth: { accessToken?: string };
  setAuth: Dispatch<SetStateAction<{ accessToken?: string }>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{ accessToken?: string }>({});

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
