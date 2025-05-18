import { NavLink } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi2";
import styled from "styled-components";

const SidebarTag = styled.div`
  position: fixed;
  height: 100vh;
  width: 150px;
  background-color: #000000;
`;

const Links = styled.div`
  height: 400px;
`;

const Sidebar = () => {
  return (
    <SidebarTag className="p-4 d-flex flex-column justify-content-between">
      <div className="navbar-brand fw-bolder fs-3">GameX</div>
      <Links className="py-4 d-flex flex-column justify-content-around align-items-center align-center">
        <NavLink
          to="/"
          className="p-3 border rounded-4"
          style={{ background: "#303038" }}
        >
          <GrHomeRounded color="white" size={"24px"} />
        </NavLink>
        <NavLink
          to="/explore"
          className="p-3 border rounded-4"
          style={{ background: "#303038" }}
        >
          <IoGameController color="white" size={"25px"} />
        </NavLink>
        <NavLink
          to="/community"
          className="p-3 border rounded-4"
          style={{ background: "#303038" }}
        >
          <HiUserGroup color="white" size={"25px"} />
        </NavLink>
      </Links>
      <div className="navbar-brand fw-bolder fs-3">GameX</div>
    </SidebarTag>
  );
};

export default Sidebar;
