import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { GrHomeRounded } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";

const SidebarTag = styled.div`
  position: fixed;
  height: 100vh;
  width: 150px;
  background-color: #000000;
`;

const Links = styled.div`
  height: 400px;
`;

const Link = styled(NavLink)`
  background: #202020;
  transition: background 0.3s ease-in-out, transform 0.3s ease-in-out;
  &.active {
    background: #4db1e5;
    border: 1px solid black !important;
  }

  &:hover {
    transform: scale(1.17);
  }
`;

const Sidebar = () => {
  return (
    <SidebarTag className="p-4 d-flex flex-column justify-content-between">
      <div className="navbar-brand fw-bolder fs-3">GameX</div>
      <Links className="py-4 d-flex flex-column justify-content-around align-items-center align-center">
        <Link to="/" className="p-3 border rounded-4">
          <GrHomeRounded color="white" size={"24px"} />
        </Link>
        <Link to="/explore" className="p-3 border rounded-4">
          <IoGameController color="white" size={"25px"} />
        </Link>
        <Link to="/community" className="p-3 border rounded-4">
          <HiUserGroup color="white" size={"25px"} />
        </Link>
      </Links>
      <div className="navbar-brand fw-bolder fs-3">GameX</div>
    </SidebarTag>
  );
};

export default Sidebar;
