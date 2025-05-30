import Footer from "../Components/Footer";
// import Header from "../Components/Header";

import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";
import type { ThemeObj } from "../Context/AppContext";
import { Outlet } from "react-router-dom";

const Root = styled.div<{ theme: ThemeObj }>`
  background-color: ${({ theme }) => theme.bodyColor};
  color: ${({ theme }) => (theme.color === "#ffffff" ? "#000000" : "#ffffff")};
`;

const AppLayout = () => {
  const { theme, themeColor } = useAppContext();
  const currentTheme = themeColor[theme];

  return (
    <Root theme={currentTheme}>
      <main style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      <Footer />
    </Root>
  );
};

export default AppLayout;
