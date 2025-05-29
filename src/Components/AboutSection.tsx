import { type ProfileData } from "../Context/AuthContext";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import styled from "styled-components";
import { HeaderIconShadowEffect } from "./Header";
import { CardHoverAnimation } from "./GameCard";
import { ArrowIcon } from "./LibrarySection";

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
      {/* Credential Section  */}
      <div>
        <h3 className="fw-bold mb-3">Credentials</h3>
        <Wrapper
          theme={curr}
          className="border border-2 rounded-4 d-flex flex-column gap-3 p-5"
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ gap: "62px" }}
          >
            <label className="p-0 m-0 fw-bold fs-5">Email: </label>
            <input
              type="text"
              className="form-control"
              value={profile.email}
              disabled
            />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-4">
            <label className="p-0 m-0 fw-bold fs-5">Password: </label>
            <input
              type="password"
              className="form-control"
              value={profile.email}
              disabled
            />
          </div>
        </Wrapper>
      </div>
      {/* About and Activity Section  */}
      <div className="row row-cols-2 gx-5">
        <div className="col-lg-7">
          <h3 className="fw-bold mb-3">About</h3>
          <Wrapper
            theme={curr}
            className="border border-2 rounded-4 d-flex flex-column gap-3 px-5"
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
          >
            <div className="d-flex justify-content-center align-items-center gap-5">
              <label className="p-0 m-0 fw-bold fs-5">DOB: </label>
              <input
                type="text"
                className="form-control"
                value={profile.dob}
                disabled
              />
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ gap: "32px" }}
            >
              <label className="p-0 m-0 fw-bold fs-5">Phone: </label>
              <input
                type="text"
                className="form-control"
                value={profile.phone}
                disabled
              />
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ gap: "22px" }}
            >
              <label className="p-0 m-0 fw-bold fs-5">Gender: </label>
              <input
                type="text"
                className="form-control"
                value={profile.gender}
                disabled
              />
            </div>
          </Wrapper>
        </div>
        <div className="col-lg-5">
          <h3 className="fw-bold mb-3">Activity Log</h3>
          <Wrapper
            theme={curr}
            className="border border-2 rounded-4 p-3 position-relative"
            style={{ height: "210px" }}
          >
            <ArrowIcon
              size={25}
              color={`${curr.highLight}`}
              className="position-absolute"
              style={{ right: "20px" }}
            />

            <img
              src="/UserActivity.png"
              alt=""
              style={{ height: "100%", width: "100%", objectFit: "fill" }}
            />
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
