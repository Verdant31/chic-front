/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react";
import React, { createContext, ReactNode, useEffect } from "react";

type User = {
  expires: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
};

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const { status, data: session } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session as User);
    }
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = React.useContext(AuthContext);
  return value;
};
