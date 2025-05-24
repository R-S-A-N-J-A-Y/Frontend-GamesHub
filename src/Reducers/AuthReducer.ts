import type { RegisterData } from "../Context/AuthContext";

type StateData = {
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

type actionData =
  | {
      type: "CREATE_USER";
      payload: {
        userData: RegisterData;
      };
    }
  | {
      type: "LOGIN_USER";
      payload: {
        user: { email: string; name: string; _id: string };
      };
    };

const AuthReducer = (state: StateData, action: actionData) => {
  if (action.type === "CREATE_USER") {
    const { password, ...user } = action.payload.userData;
    console.log(password);
    return { ...state, isLogged: true, role: "user", profile: user };
  } else if (action.type === "LOGIN_USER") {
    return {
      ...state,
      isLogged: true,
      role: "user",
      id: action.payload.user._id,
    };
  }
  return state;
};

export default AuthReducer;
