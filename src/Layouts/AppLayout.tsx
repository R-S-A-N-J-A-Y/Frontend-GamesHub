import type { ReactNode } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";
import type { ThemeObj } from "../Context/AppContext";

interface Props {
  children: ReactNode;
}

const Root = styled.div<{ theme: ThemeObj }>`
  background-color: ${({ theme }) => theme.bodyColor};
  color: ${({ theme }) => (theme.color === "#ffffff" ? "#000000" : "#ffffff")};
`;

const Children = styled.div`
  padding: 0 50px;
`;

const AppLayout = ({ children }: Props) => {
  const { theme, themeColor } = useAppContext();
  const currentTheme = themeColor[theme];

  return (
    <Root theme={currentTheme}>
      <Sidebar />
      <main id="main" className="d-flex flex-column gap-2">
        <Header />
        <Children>{children}</Children>
        <Footer />
      </main>
    </Root>
  );
};

export default AppLayout;
