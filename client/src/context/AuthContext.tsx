import type { Auth, AuthContextType } from "@/store/types";
import { createContext, useState } from "react";

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth | null>(null);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
