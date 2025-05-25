import type { BackendProps } from "../Context/AuthContext";

export type StateData = {
  isLogged: boolean;
  token: string;
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
        user: BackendProps;
      };
    }
  | {
      type: "LOGIN_USER";
      payload: {
        user: BackendProps;
      };
    };

const AuthReducer = (state: StateData, action: actionData) => {
  if (action.type === "CREATE_USER") {
    return {
      ...state,
      isLogged: true,
      token: action.payload.user.token,
      role: "user",
      id: action.payload.user._id,
      profile: {
        ...state.profile,
        name: action.payload.user.name,
        email: action.payload.user.email,
      },
    };
  } else if (action.type === "LOGIN_USER") {
    return {
      ...state,
      isLogged: true,
      token: action.payload.user.token,
      role: "user",
      id: action.payload.user._id,
      profile: {
        ...state.profile,
        name: action.payload.user.name,
        email: action.payload.user.email,
      },
    };
  }
  return state;
};

export default AuthReducer;
