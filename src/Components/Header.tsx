import { NavLink } from "react-router-dom";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import styled from "styled-components";

import { IoNotifications } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const SearchBar = styled.input<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  color: white;
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
`;

const Link = styled(NavLink)<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  transition: background 0.3s ease-in-out, transform 0.3s ease-in-out;

  box-shadow: ${({ theme }) =>
    theme.name === "light"
      ? "-5px -5px 10px #fafbff, 5px 5px 10px rgba(22, 24, 29, 0.2)"
      : "-2px -2px 5px rgba(0, 0, 0, 0.49), 2px 2px 5px rgba(255, 255, 255, 0.58)"};

  &.active {
    background: ${({ theme }) => theme.highLight};
  }

  &:hover {
    transform: scale(1.17);
  }
`;

const Header = () => {
  const { theme, themeColor, toggleTheme } = useAppContext();
  const currentTheme = themeColor[theme];
  return (
    <div className="d-flex justify-content-between align-items-center px-5 py-4">
      <div className="w-50">
        <SearchBar
          theme={currentTheme}
          className="me-2 rounded-2 px-3 py-2 w-50"
          type="search"
          placeholder="Search"
        />
      </div>

      <Links className="d-flex justify-content-between align-items-center align-center px-4">
        <Link
          theme={currentTheme}
          to="/notifications"
          className="p-2 rounded-3"
        >
          <IoNotifications
            color={theme === "dark" ? "white" : "black"}
            size={"24px"}
          />
        </Link>
        <Link theme={currentTheme} to="/cart" className="p-2 rounded-3">
          <FaShoppingCart
            color={theme === "dark" ? "white" : "black"}
            size={"24px"}
          />
        </Link>
        <Link theme={currentTheme} to="/profile" className="p-2 rounded-3">
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
