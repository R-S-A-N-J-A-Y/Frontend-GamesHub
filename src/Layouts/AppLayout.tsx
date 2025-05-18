import type { ReactNode } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";

interface Props {
  children: ReactNode;
}

const Root = styled.div<{ theme: "light" | "dark" }>`
  background-color: ${({ theme }) =>
    theme === "light" ? "#ebebeb" : "#171717"};
  color: ${({ theme }) => (theme === "light" ? "#000000" : "#ffffff")};
  height: 100vh;
`;

const AppLayout = ({ children }: Props) => {
  const { theme } = useAppContext();

  return (
    <Root theme={theme}>
      <Sidebar />
      <main id="main">
        <Header />
        {children}
        <Footer />
      </main>
    </Root>
  );
};

export default AppLayout;
