import { useEffect, useState } from "react";
import AboutSection from "../Components/AboutSection";
import ProfileSection from "../Components/ProfileSection";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 78vh;
  @media (max-width: 1300px) {
    flex-direction: column;
  }
`;

const ProfileWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1300px) {
    flex-direction: row;
  }

  @media (max-width: 620px) {
    flex-direction: column;
  }
`;

const AboutWrapper = styled.section`
  padding: 1.5rem 3rem;
  gap: 30px;
  @media (max-width: 1300px) {
    padding: 1rem;
  }
`;

const ProfilePage = () => {
  const {
    state: { token, profile, role },
    UserProfile,
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      const headers = { "x-auth-token": token };
      try {
        const data = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
          {
            headers: headers,
          }
        );
        UserProfile(data.data);
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [token, UserProfile]);
  if (isLoading)
    return (
      <section
        className="d-flex justify-content-center align-items-center"
        style={{ height: "75vh" }}
      >
        <section
          role="status"
          className="spinner-border"
          style={{ width: "3rem", height: "3rem", borderWidth: "8px" }}
        ></section>
      </section>
    );
  return (
    <Wrapper className="d-flex">
      <ProfileWrapper className="p-5">
        <ProfileSection name={profile.name} role={role} />
      </ProfileWrapper>
      <AboutWrapper className="flex-fill d-flex flex-column">
        <AboutSection profile={profile} />
      </AboutWrapper>
    </Wrapper>
  );
};

export default ProfilePage;
