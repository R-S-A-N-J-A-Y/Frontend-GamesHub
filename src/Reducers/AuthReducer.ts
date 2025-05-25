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
        userData: { email: string; name: string; _id: string };
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
    return {
      ...state,
      isLogged: true,
      role: "user",
      id: action.payload.userData._id,
      profile: { ...state.profile, name: action.payload.userData.name },
    };
  } else if (action.type === "LOGIN_USER") {
    return {
      ...state,
      isLogged: true,
      role: "user",
      id: action.payload.user._id,
      profile: { ...state.profile, name: action.payload.user.name },
    };
  }
  return state;
};

export default AuthReducer;
