import type { RegisterData } from "../Context/AuthContext";

type StateData = {
  isLogged: boolean;
  role: string;
  profile: {
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
  };
};

type actionData = {
  type: "CREATE_USER";
  payload: {
    userData: RegisterData;
  };
};

const AuthReducer = (state: StateData, action: actionData) => {
  if (action.type === "CREATE_USER") {
    const { password, ...user } = action.payload.userData;
    return { ...state, isLogged: true, role: "user", profile: user };
  }
  return state;
};

export default AuthReducer;
