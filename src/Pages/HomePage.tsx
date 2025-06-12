import ContinueSection from "../Components/ContinueSection";
import LibrarySection from "../Components/LibrarySection";
import HeroSection from "../Components/HeroSection";
import AccessoriedSection from "../Components/AccessoriedSection";
import styled from "styled-components";

const UserAction = styled.section`
  display: flex;

  @media (max-width: 1060px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const HomePage = () => {
  return (
    <div className="d-flex flex-column gap-5">
      <HeroSection />
      <ContinueSection />
      <UserAction className="gap-5">
        <AccessoriedSection />
        <LibrarySection />
      </UserAction>
    </div>
  );
};

export default HomePage;
