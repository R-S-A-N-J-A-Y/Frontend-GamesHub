import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import styled, { css } from "styled-components";

import { IoNotifications } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useAuth } from "../Context/AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";

const SearchBar = styled.input<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  color: ${({ theme }) => (theme.name === "dark" ? "white" : "black")};
  border: none;
  outline: none;

  box-shadow: ${({ theme }) =>
    theme.name === "light"
      ? "-5px -5px 10px #fafbff, 5px 5px 10px rgba(22, 24, 29, 0.2)"
      : "inset -2px -2px 10px rgba(0, 0, 0, 0.61), inset 2px 2px 10px rgba(187, 179, 179, 0.66)"};
  &::placeholder {
    color: ${({ theme }) => (theme.name === "dark" ? "#ffffff" : "#000000")};
    opacity: 1;
  }
`;

const Links = styled.div`
  width: 400px;

  @media (max-width: 768px) {
    display: none !important;
  }
`;

const HamBurger = styled.div<{ $background: string }>`
  display: none !important;

  @media (max-width: 768px) {
    cursor: pointer;
    background: ${({ $background }) => $background};
    padding: 10px;
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
`;

export const HeaderIconShadowEffect = css<{ theme: ThemeObj }>`
  box-shadow: ${({ theme }) =>
    theme.name === "light"
      ? "-5px -5px 10px #fafbff, 5px 5px 10px rgba(22, 24, 29, 0.2)"
      : "-2px -2px 5px rgba(0, 0, 0, 0.49), 2px 2px 5px rgba(255, 255, 255, 0.58)"};
`;

const Link = styled(NavLink)<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  transition: background 0.3s ease-in-out, transform 0.3s ease-in-out;
  ${HeaderIconShadowEffect}

  &.active {
    background: ${({ theme }) => theme.highLight};
  }

  &:hover {
    transform: scale(1.17);
  }
`;

const Header = () => {
  const { state } = useAuth();
  const { theme, themeColor, toggleTheme } = useAppContext();
  const currentTheme = themeColor[theme];

  const Navigate = useNavigate();

  // Handling Navigation for Header when Logged and not Logged
  const HandleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!state.isLogged) {
      e.preventDefault();

      const target = e.currentTarget as HTMLElement;
      const name = target.getAttribute("data-name");

      if (name === "profile") {
        Navigate("/auth");
      } else {
        alert("Please log in first!");
      }
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center px-5 py-4">
      <div className="w-75">
        <SearchBar
          theme={currentTheme}
          className="me-2 rounded-2 px-3 py-2 w-50"
          type="search"
          placeholder="Search"
        />
      </div>

      <HamBurger $background={currentTheme.boxColor} className="rounded-3">
        <RxHamburgerMenu size={20} />
      </HamBurger>

      <Links className="d-flex justify-content-between align-items-center align-center px-4">
        <Link
          theme={currentTheme}
          to="/notifications"
          data-name="notifications"
          className="p-2 rounded-3"
          onClick={HandleNavigate}
        >
          <IoNotifications
            color={theme === "dark" ? "white" : "black"}
            size={"24px"}
          />
        </Link>
        <Link
          theme={currentTheme}
          to="/cart"
          data-name="cart"
          className="p-2 rounded-3"
          onClick={HandleNavigate}
        >
          <FaShoppingCart
            color={theme === "dark" ? "white" : "black"}
            size={"24px"}
          />
        </Link>
        <Link
          theme={currentTheme}
          to="/profile"
          data-name="profile"
          className="p-2 rounded-3"
          onClick={HandleNavigate}
        >
          <MdAccountCircle
            color={theme === "dark" ? "white" : "black"}
            size={"25px"}
          />
        </Link>
        <button
          className={`rounded-4 px-3 py-2 
            bg-${theme === "dark" ? "light" : "dark"} 
            text-${theme}`}
          onClick={toggleTheme}
        >
          Theme
        </button>
      </Links>
    </div>
  );
};

export default Header;
