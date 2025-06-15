import ContinueSection from "../Components/ContinueSection";
import LibrarySection from "../Components/LibrarySection";
import AccessoriedSection from "../Components/AccessoriedSection";
import styled from "styled-components";
import { useAuth } from "../Context/AuthContext";
import HeroCard from "../Components/HeroCard";
import NewReleases from "../Components/NewReleases";

const UserAction = styled.section`
  display: flex;

  @media (max-width: 1060px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const HomePage = () => {
  const {
    state: { isLogged, profile },
  } = useAuth();

  return (
    <div className="d-flex flex-column gap-4">
      {isLogged && (
        <p className="fw-normal fs-2 pt-3 m-0">
          Welcome back, <span className="fw-bold fs-1">{profile.name}</span>{" "}
        </p>
      )}
      <div>
        <p className="fw-bold fs-3 p-0 m-0">Today’s top-rated deals</p>
        <p className="fs-5 text-secondary p-1">
          Limited-time offers on top-rated titles. Scroll, pick, play.
        </p>
      </div>
      <HeroCard />
      {isLogged && (
        <>
          <ContinueSection />
          <UserAction className="gap-5">
            <AccessoriedSection />
            <LibrarySection />
          </UserAction>
        </>
      )}
      {!isLogged && (
        <>
          <NewReleases />
        </>
      )}
    </div>
  );
};

export default HomePage;
