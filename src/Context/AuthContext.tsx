import { createContext, useContext, useReducer } from "react";
import type { Props } from "./AppContext";
import AuthReducer from "../Reducers/AuthReducer";

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
  gender: string;
}

export interface AuthContextType {
  state: {
    isLogged: boolean;
    role: string;
    id: string;
    profile: {
      name: string;
      email: string;
      phone: string;
      dob: string;
      gender: string;
    };
  };
  Register: (userData: RegisterData) => void;
  Login: (user: { email: string; name: string; _id: string }) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isLogged: false,
    role: "",
    id: "",
    profile: {
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
    },
  });

  const Register = (userData: RegisterData) => {
    dispatch({ type: "CREATE_USER", payload: { userData } });
  };

  const Login = (user: { email: string; name: string; _id: string }) => {
    dispatch({ type: "LOGIN_USER", payload: { user } });
  };

  return (
    <AuthContext.Provider value={{ state, Register, Login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const Context = useContext(AuthContext);
  if (!Context) throw new Error("useAuth must be used within an AuthProvider");
  return Context;
};
