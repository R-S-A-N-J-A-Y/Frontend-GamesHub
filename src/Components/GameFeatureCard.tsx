import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";
import type { featureType } from "../Pages/GameDetailsPage";

interface Props {
  idx: number;
  feature: featureType;
}

const ImgSection = styled.div<{ imageUrl: string }>`
  background-image: url(${({ imageUrl }) => imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 500px;
  flex: 3;
`;

const TextSection = styled.div`
  padding: 4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div``;

const GameFeatureCard = ({ feature, idx }: Props) => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  return (
    <Container className="d-flex border rounded-3">
      {idx % 2 != 0 && (
        <ImgSection imageUrl={feature.imageUrl} className="rounded-start-3" />
      )}
      <TextSection
        style={{ background: `${curr.boxColor}` }}
        className="rounded-3"
      >
        <h2 className="fw-bold mb-4 text-center">{feature.name}</h2>
        <p>{feature.description}</p>
      </TextSection>
      {idx % 2 == 0 && (
        <ImgSection imageUrl={feature.imageUrl} className="rounded-end-3" />
      )}
    </Container>
  );
};

export default GameFeatureCard;
