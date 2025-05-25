import LoginForm from "../Components/LoginForm";
import { useAppContext } from "../Context/AppContext";

const LoginPage = () => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center p-5 text-${
        currTheme.name === "dark" ? "light" : "dark"
      }`}
      style={{ height: "100vh" }}
    >
      <LoginForm />
    </div>
  );
};

export default LoginPage;
