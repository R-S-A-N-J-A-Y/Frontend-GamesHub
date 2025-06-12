import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";
import type { featureType } from "../Pages/GameDetailsPage";
import GameFeatureCard from "./GameFeatureCard";

interface Props {
  name: string;
  features: featureType[];
}

const Wrapper = styled.div`
  padding: 3rem;

  @media (max-width: 500px) {
    padding: 1rem;
  }
`;

const GameFetureWrapper = styled.div`
  padding: 5px;
`;

const GameFeatureList = ({ name, features }: Props) => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];
  return (
    <Wrapper className="d-flex flex-column" style={{ gap: "60px" }}>
      <div className="text-center">
        <h2 className="mb-4">
          Why you should Play{" "}
          <span className="fw-bold" style={{ color: `${curr.highLight}` }}>
            {name}
          </span>{" "}
          ?
        </h2>
        <h5 className="text-secondary fw-bold">
          Discover the features that set it apart.
        </h5>
      </div>
      <GameFetureWrapper className="d-flex flex-column" style={{ gap: "70px" }}>
        {features.map((ft, idx) => (
          <GameFeatureCard key={idx} feature={ft} idx={idx} />
        ))}
      </GameFetureWrapper>
    </Wrapper>
  );
};

export default GameFeatureList;
