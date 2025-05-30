import type { BackendProps, ProfileData } from "../Context/AuthContext";

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
    }
  | {
      type: "LOG_OUT";
    }
  | {
      type: "SET_USER_PROFILE";
      payload: {
        user: ProfileData;
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
  } else if (action.type === "LOG_OUT") {
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
  } else if (action.type === "SET_USER_PROFILE") {
    return {
      ...state,
      profile: {
        ...action.payload.user,
        dob: action.payload.user.dob.split("T")[0],
      },
    };
  }
  return state;
};

export default AuthReducer;
