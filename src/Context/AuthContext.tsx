import { createContext, useContext, useEffect, useReducer } from "react";
import type { Props } from "./AppContext";
import AuthReducer, { type StateData } from "../Reducers/AuthReducer";

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
  Register: (userData: { email: string; name: string; _id: string }) => void;
  Login: (user: { email: string; name: string; _id: string }) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const getInitialState = (): StateData => {
  const storedData = localStorage.getItem("authState");
  if (storedData) return JSON.parse(storedData);
  return {
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
  };
};

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, getInitialState());

  const Register = (user: { email: string; name: string; _id: string }) => {
    dispatch({ type: "CREATE_USER", payload: { user } });
  };

  const Login = (user: { email: string; name: string; _id: string }) => {
    dispatch({ type: "LOGIN_USER", payload: { user } });
  };

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

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
