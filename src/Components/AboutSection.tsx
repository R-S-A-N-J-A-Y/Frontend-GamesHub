import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import axios from "axios";
import styled from "styled-components";
import { HeaderIconShadowEffect } from "./Header";
import { CardHoverAnimation } from "./GameCard";

const Wrapper = styled.div<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  ${HeaderIconShadowEffect}
  ${CardHoverAnimation}
`;

const AboutSection = () => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];
  const {
    state: { token, profile },
    UserProfile,
  } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      const headers = { "x-auth-token": token };
      try {
        const data = await axios.get("http://localhost:3000/user/profile", {
          headers: headers,
        });
        UserProfile(data.data);
      } catch (err) {
        alert(err);
      }
    };
    fetch();
  }, [token, UserProfile]);

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
