import { createContext, useContext, useEffect, useReducer } from "react";
import type { Props } from "./AppContext";
import AuthReducer, { type StateData } from "../Reducers/AuthReducer";

export interface BackendProps {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
  gender: string;
}

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
}

export interface AuthContextType {
  state: {
    isLogged: boolean;
    token: string;
    role: string;
    id: string;
    profile: ProfileData;
  };
  Register: (userData: BackendProps) => void;
  Login: (user: BackendProps) => void;
  Logout: () => void;
  UserProfile: (user: ProfileData) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const getInitialState = (): StateData => {
  const storedData = localStorage.getItem("authState");
  if (storedData) return JSON.parse(storedData);
  return {
    isLogged: false,
    token: "",
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

  const Register = (user: BackendProps) => {
    dispatch({ type: "CREATE_USER", payload: { user } });
  };

  const Login = (user: BackendProps) => {
    dispatch({ type: "LOGIN_USER", payload: { user } });
  };

  const Logout = () => {
    localStorage.removeItem("authState");
    dispatch({ type: "LOG_OUT" });
  };

  const UserProfile = (user: ProfileData) => {
    dispatch({ type: "SET_USER_PROFILE", payload: { user } });
  };

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider
      value={{ state, Register, Login, Logout, UserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const Context = useContext(AuthContext);
  if (!Context) throw new Error("useAuth must be used within an AuthProvider");
  return Context;
};
