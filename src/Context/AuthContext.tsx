import { createContext, useContext, useReducer } from "react";
import type { Props } from "./AppContext";
import AuthReducer from "../Reducers/AuthReducer";

export interface AuthContextType {
  state: {
    isLogged: boolean;
    role: string;
    name: string;
    profile: {
      name: string;
      email: string;
      phone: string;
      dob: string;
      gender: string;
    };
  };
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isLogged: false,
    role: "",
    name: "",
    profile: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
    },
  });

  return (
    <AuthContext.Provider value={{ state }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const Context = useContext(AuthContext);
  if (!Context) throw new Error("useAuth must be used within an AuthProvider");
  return Context;
};
