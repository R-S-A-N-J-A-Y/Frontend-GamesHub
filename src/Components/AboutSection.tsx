import { type ProfileData } from "../Context/AuthContext";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import styled from "styled-components";
import { HeaderIconShadowEffect } from "./Header";
import { CardHoverAnimation } from "./GameCard";

const Wrapper = styled.div<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  ${HeaderIconShadowEffect}
  ${CardHoverAnimation}
`;

const AboutSection = ({ profile }: { profile: ProfileData }) => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  return (
    <>
      <h3 className="fw-bold">About</h3>
      <Wrapper
        theme={curr}
        className="border border-2 rounded-4 d-flex flex-column gap-4 p-5"
      >
        <div>
          <label className="form-label">Email: </label>
          <input
            type="text"
            className="form-control"
            value={profile.email}
            disabled
          />
        </div>
        <div>
          <label className="form-label">Phone: </label>
          <input
            type="text"
            className="form-control"
            value={profile.phone}
            disabled
          />
        </div>
        <div>
          <label className="form-label">DOB: </label>
          <input
            type="text"
            className="form-control"
            value={profile.dob}
            disabled
          />
        </div>
        <div>
          <label className="form-label">Gender: </label>
          <input
            type="text"
            className="form-control"
            value={profile.gender}
            disabled
          />
        </div>
      </Wrapper>
    </>
  );
};

export default AboutSection;
