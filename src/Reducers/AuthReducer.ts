type StateData = {
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

const AuthReducer = (state: StateData, action: string) => {
  console.log(state, action);
  return state;
};

export default AuthReducer;
