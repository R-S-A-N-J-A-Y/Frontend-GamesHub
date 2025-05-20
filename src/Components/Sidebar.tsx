import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { GrHomeRounded } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";
import { useAppContext } from "../Context/AppContext";
import type { ThemeObj } from "../Context/AppContext";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const SidebarTag = styled.div<{ theme: ThemeObj }>`
  position: fixed;
  height: 100vh;
  width: 150px;
  background-color: ${({ theme }) => theme.color};
`;

const Links = styled.div`
  height: 400px;
`;

const Link = styled(NavLink)<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  border: none;
  box-shadow: ${({ theme }) =>
    theme.name === "light"
      ? "-5px -5px 10px #fafbff, 5px 5px 10px rgba(22, 24, 29, 0.2)"
      : "inset -2px -2px 10px rgba(58, 57, 57, 0.86), inset 2px 2px 10px rgba(255, 255, 255, 0.7)"};
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

const Sidebar = () => {
  const { theme, themeColor } = useAppContext();
  const currentTheme = themeColor[theme];
  return (
    <SidebarTag
      theme={currentTheme}
      className="p-4 pb-5 d-flex flex-column justify-content-between align-items-center"
      style={{ zIndex: 1 }}
    >
      <div className="navbar-brand fw-bolder fs-3">GameX</div>
      <Links className="py-4 d-flex flex-column justify-content-around align-items-center align-center">
        <Link theme={currentTheme} to="/" className="p-3 rounded-4">
          <GrHomeRounded
            color={theme === "dark" ? "white" : "black"}
            size={"24px"}
          />
        </Link>
        <Link theme={currentTheme} to="/explore" className="p-3 rounded-4">
          <IoGameController
            color={theme === "dark" ? "white" : "black"}
            size={"25px"}
          />
        </Link>
        <Link theme={currentTheme} to="/community" className="p-3 rounded-4">
          <HiUserGroup
            color={theme === "dark" ? "white" : "black"}
            size={"25px"}
          />
        </Link>
      </Links>
      <div className="navbar-brand fw-bolder fs-3">
        <LogoutAnimation />
      </div>
    </SidebarTag>
  );
};

export default Sidebar;
