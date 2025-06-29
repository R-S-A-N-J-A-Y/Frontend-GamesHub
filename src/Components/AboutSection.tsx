import { type ProfileData } from "../Context/AuthContext";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import styled from "styled-components";
import { HeaderIconShadowEffect } from "./Header";
import { CardHoverAnimation } from "./GameCard";
import { ArrowIcon } from "./LibrarySection";

const AboutLayoutGrid = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 580px) {
    grid-template-columns: 7fr 5fr;
  }
`;

const ThemedCard = styled.section<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  ${HeaderIconShadowEffect}
  ${CardHoverAnimation}
`;

const ResponsiveField = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  flex-direction: column;

  @media (min-width: 580px) {
    flex-direction: row;
    align-items: center;
  }
`;

const AboutSection = ({ profile }: { profile: ProfileData }) => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  return (
    <>
      {/* Credential Section  */}
      <section>
        <h3 className="fw-bold mb-3">Credentials</h3>
        <ThemedCard
          theme={curr}
          className="border border-2 rounded-4 d-flex flex-column gap-3 p-4"
        >
          <ResponsiveField>
            <label
              className="p-0 m-0 fw-bold fs-5"
              style={{ minWidth: "100px" }}
            >
              Email:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              value={profile.email}
              disabled
            />
          </ResponsiveField>
          <ResponsiveField>
            <label
              className="p-0 m-0 fw-bold fs-5"
              style={{ minWidth: "100px" }}
            >
              Password:{" "}
            </label>
            <input
              type="password"
              className="form-control"
              value={profile.email}
              disabled
            />
          </ResponsiveField>
        </ThemedCard>
      </section>
      {/* About and Activity Section  */}
      <AboutLayoutGrid>
        {/* About Section */}
        <section>
          <h3 className="fw-bold mb-3">About</h3>
          <ThemedCard
            theme={curr}
            className="border border-2 rounded-4 d-flex flex-column gap-3 p-4"
          >
            <ResponsiveField>
              <label
                className="p-0 m-0 fw-bold fs-5"
                style={{ minWidth: "100px" }}
              >
                DOB:
              </label>
              <input
                type="text"
                className="form-control flex-grow-1"
                value={profile.dob}
                disabled
              />
            </ResponsiveField>

            <ResponsiveField>
              <label
                className="p-0 m-0 fw-bold fs-5"
                style={{ minWidth: "100px" }}
              >
                Phone:
              </label>
              <input
                type="text"
                className="form-control flex-grow-1"
                value={profile.phone}
                disabled
              />
            </ResponsiveField>

            <ResponsiveField>
              <label
                className="p-0 m-0 fw-bold fs-5"
                style={{ minWidth: "100px" }}
              >
                Gender:
              </label>
              <input
                type="text"
                className="form-control flex-grow-1"
                value={profile.gender}
                disabled
              />
            </ResponsiveField>
          </ThemedCard>
        </section>

        {/* Activity Log */}
        <section>
          <h3 className="fw-bold mb-3">Activity Log</h3>
          <ThemedCard
            theme={curr}
            className="border border-2 rounded-4 p-3 position-relative"
            style={{ height: "200px" }}
          >
            <ArrowIcon
              size={25}
              color={`${curr.highLight}`}
              className="position-absolute"
              style={{ right: "20px" }}
            />
            <img
              src="/UserActivity.png"
              alt="activity"
              style={{ height: "100%", width: "100%", objectFit: "fill" }}
            />
          </ThemedCard>
        </section>
      </AboutLayoutGrid>
    </>
  );
};

export default AboutSection;
