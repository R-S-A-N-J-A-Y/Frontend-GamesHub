import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";

const ProfileImage = styled.section<{ $theme: string }>`
  width: 320px;
  height: 320px;
  border: 5px solid ${({ $theme }) => ($theme === "dark" ? "white" : "black")};

  @media (min-width: 400px and max-width: 600px) {
    width: 320px;
    height: 320px;
  }
  @media (max-width: 400px) or (min-width: 600px and max-width: 800px) {
    width: 250px;
    height: 250px;
  }
`;

const ProfileSection = ({ name, role }: { name: string; role: string }) => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];
  return (
    <>
      <ProfileImage $theme={curr.name} className="rounded-circle">
        <img
          src="/DaysGone.jpg"
          alt="Profile-Image"
          className="rounded-circle"
          style={{ height: "100%", width: "100%", objectFit: "fill" }}
        />
      </ProfileImage>
      <div className="d-flex flex-column gap-2 align-items-center">
        <h2 className="fw-bold">{name}</h2>
        <p className="fs-5">
          <span className="fw-bold" style={{ color: curr.highLight }}>
            Role:
          </span>{" "}
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </p>
      </div>
    </>
  );
};

export default ProfileSection;
