import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";
import type { featureType } from "../Pages/GameDetailsPage";
import { useEffect, useState } from "react";

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

  @media (max-width: 500px) {
    min-height: 200px;
  }

  @media (min-width: 500px) and (max-width: 800px) {
    min-height: 300px;
  }
`;

const TextSection = styled.div`
  padding: 4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 800px) {
    padding: 2rem;
  }

  @media (min-width: 800px) and (max-width: 1000px) {
    padding: 2rem;
  }
`;

const Container = styled.div`
  display: flex;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const GameFeatureCard = ({ feature, idx }: Props) => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container className="border rounded-3">
      {isMobile ? (
        <>
          <ImgSection imageUrl={feature.imageUrl} className="rounded-top-3" />
          <TextSection
            style={{ background: `${curr.boxColor}` }}
            className="rounded-bottom-3"
          >
            <h2 className="fw-bold mb-4 text-center">{feature.name}</h2>
            <p>{feature.description}</p>
          </TextSection>
        </>
      ) : (
        <>
          {idx % 2 !== 0 && (
            <ImgSection
              imageUrl={feature.imageUrl}
              className="rounded-start-3"
            />
          )}
          <TextSection
            style={{ background: `${curr.boxColor}` }}
            className="rounded-3"
          >
            <h2 className="fw-bold mb-4 text-center">{feature.name}</h2>
            <p>{feature.description}</p>
          </TextSection>
          {idx % 2 === 0 && (
            <ImgSection imageUrl={feature.imageUrl} className="rounded-end-3" />
          )}
        </>
      )}
    </Container>
  );
};

export default GameFeatureCard;
