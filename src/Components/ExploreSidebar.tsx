import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { TfiTarget } from "react-icons/tfi";
import { FaGamepad } from "react-icons/fa6";
import { FaTags } from "react-icons/fa6";
import { IoIosApps } from "react-icons/io";
import { TbAppsFilled } from "react-icons/tb";
import { useAppContext } from "../Context/AppContext";
import type { ThemeObj } from "../Context/AppContext";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { SidebarIconShadowEffect } from "./Sidebar";
import { useAuth } from "../Context/AuthContext";

const SidebarTag = styled.div<{ theme: ThemeObj }>`
  position: fixed;
  height: 100vh;
  width: 150px;
  background-color: ${({ theme }) => theme.color};

  @media (max-width: 768px) {
    display: none !important;
  }
`;

const Links = styled.div`
  height: 500px;
`;

const Link = styled(NavLink)<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  border: none;
  ${SidebarIconShadowEffect}
  transition: all 0.2s ease;
  &.active {
    background: ${({ theme }) => theme.iconBgColor};
  }

  &:hover {
    transform: scale(1.17);
  }
`;

const LogoutAnimation = styled(FaArrowRightFromBracket)`
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(6px); /* move 4px to the right */
  }
`;

const ExploreSidebar = () => {
  const {
    Logout,
    state: { isLogged },
  } = useAuth();
  const { theme, themeColor } = useAppContext();
  const currentTheme = themeColor[theme];
  return (
    <SidebarTag
      theme={currentTheme}
      className="p-4 pb-5 d-flex flex-column justify-content-between align-items-center"
      style={{ zIndex: 1 }}
    >
      <NavLink to="/" className="navbar-brand fw-bolder fs-3">
        GameX
      </NavLink>
      <Links className="py-4 d-flex flex-column justify-content-around align-items-center align-center">
        <Link
          theme={currentTheme}
          to="/explore/genres"
          className="rounded-4 p-3"
        >
          <TfiTarget size={28} color={theme === "dark" ? "white" : "black"} />
        </Link>

        <Link
          theme={currentTheme}
          to="/explore/platforms"
          className="p-3 rounded-4"
        >
          <FaGamepad
            color={theme === "dark" ? "white" : "black"}
            size={"28px"}
          />
        </Link>
        <Link theme={currentTheme} to="/explore/tags" className="p-3 rounded-4">
          <FaTags color={theme === "dark" ? "white" : "black"} size={"27px"} />
        </Link>
        <Link
          theme={currentTheme}
          to="/explore/stores"
          className="p-3 rounded-4"
        >
          <IoIosApps
            color={theme === "dark" ? "white" : "black"}
            size={"30px"}
          />
        </Link>
        <Link
          theme={currentTheme}
          to="/explore/studios"
          className="p-3 rounded-4"
        >
          <TbAppsFilled
            color={theme === "dark" ? "white" : "black"}
            size={"25px"}
          />
        </Link>
      </Links>
      <div className="navbar-brand fw-bolder fs-3" onClick={() => Logout()}>
        {isLogged && <LogoutAnimation />}
      </div>
    </SidebarTag>
  );
};

export default ExploreSidebar;
