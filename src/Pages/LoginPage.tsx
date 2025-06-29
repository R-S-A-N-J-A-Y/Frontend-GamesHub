import styled from "styled-components";
import LoginForm from "../Components/LoginForm";
import { useAppContext, type ThemeObj } from "../Context/AppContext";

const Wrapper = styled.div<{ theme: ThemeObj }>`
  height: 100vh;
  background: ${({ theme }) => theme.bodyColor};
`;

const FormContainer = styled.div<{ theme: ThemeObj }>`
  color: ${({ theme }) => (theme.name === "dark" ? "white" : "black")};
  background: ${({ theme }) => theme.color};
  box-shadow: ${({ theme }) =>
    theme.name === "dark"
      ? "0px 0px 30px rgba(255, 255, 255, 0.57);"
      : "0px 0px 30px rgba(0, 0, 0, 0.53);"};
  width: 50%;
  padding: 3rem;
  @media (max-width: 680px) {
    width: 85%;
    padding: 1.5rem;
  }
`;

const LoginPage = () => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];
  return (
    <Wrapper
      theme={currTheme}
      className="d-flex flex-column justify-content-center align-items-center gap-5 pb-5 pt-0"
    >
      <FormContainer theme={currTheme} className="border rounded-4">
        <LoginForm />
      </FormContainer>
    </Wrapper>
  );
};

export default LoginPage;
