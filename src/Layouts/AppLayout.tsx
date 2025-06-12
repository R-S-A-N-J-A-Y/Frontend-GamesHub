import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";
import type { ThemeObj } from "../Context/AppContext";
import { Outlet, useLocation } from "react-router-dom";
import ExploreSidebar from "../Components/ExploreSidebar";

const Root = styled.div<{ theme: ThemeObj }>`
  background-color: ${({ theme }) => theme.bodyColor};
  color: ${({ theme }) => (theme.color === "#ffffff" ? "#000000" : "#ffffff")};
`;

const Children = styled.div`
  padding: 0 30px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

const AppLayout = () => {
  const location = useLocation();
  const [url, setUrl] = useState("/");
  const { theme, themeColor } = useAppContext();
  const currentTheme = themeColor[theme];

  useEffect(() => {
    setUrl(location.pathname);
    // console.log(location);
  }, [location]);

  return (
    <Root theme={currentTheme}>
      {url.includes("/explore") ? <ExploreSidebar /> : <Sidebar />}
      <main id="main" className="d-flex flex-column gap-2">
        <Header />
        <Children>
          <Outlet />
        </Children>
        <Footer />
      </main>
    </Root>
  );
};

export default AppLayout;
