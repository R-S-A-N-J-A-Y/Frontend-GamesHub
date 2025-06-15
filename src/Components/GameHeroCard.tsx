import styled from "styled-components";
import type { gameData } from "../Pages/GameDetailsPage";
import { FaPlaystation, FaWindows } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface Props {
  game: gameData;
  ToggleAddtoCart: (id: string) => void;
}

const Wrapper = styled.div<{ imageUrl: string }>`
  min-height: 100vh;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.56),
      rgba(89, 74, 74, 0.38)
    ),
    url(${({ imageUrl }) => imageUrl});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1350px) {
    gap: 50px;
    padding: 0;
  }

  @media (min-width: 1350px) {
    flex-direction: row;
    gap: 300px;
    padding: 0;
  }
`;

const LeftSection = styled.section<{ $isTwoLine: boolean }>`
  margin-top: 100px;
  gap: ${({ $isTwoLine }) => ($isTwoLine ? "20px" : "70px")};
  padding: ${({ $isTwoLine }) => ($isTwoLine ? "0" : "50px")} 0 0 100px;

  @media (max-width: 1350px) {
    margin-top: 60px;
    gap: 40px;
    padding: 0 25px;
  }

  @media (min-width: 750px) and (max-width: 1350px) {
    padding: 0 55px;
  }

  @media (min-width: 1350px) {
    flex: 1;
    max-width: 50%;
  }
`;

const RightSection = styled.section`
  margin-top: 50px;
  gap: 50px;
  padding: 0 120px 0 0;

  @media (max-width: 500px) {
    margin: 0;
    padding: 0 25px;
  }

  @media (min-width: 500px) and (max-width: 750px) {
    margin: 0;
    gap: 40px;
    padding: 0 25px;
  }

  @media (min-width: 750px) and (max-width: 1350px) {
    margin: 0;
    gap: 40px;
    padding: 0 55px;
  }

  @media (min-width: 1350px) {
    flex: 1;
    max-width: 50%;
  }
`;

const VideoIcon = styled.iframe`
  width: 100%;
  height: 280px;

  @media (min-width: 500px) and (max-width: 700px) {
    height: 250px;
  }

  @media (min-width: 700px) and (max-width: 1000px) {
    height: 350px;
  }

  @media (min-width: 1001px) and (max-width: 1350px) {
    height: 450px;
  }
`;

const GameTitle = styled.h1`
  color: #00bfff;
  font-weight: 800;
  font-size: 2rem;

  @media (min-width: 500px) {
    font-size: 2.5rem;
  }

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (min-width: 1350px) {
    font-size: 4rem;
  }
`;

export const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 1.25rem;

  @media (min-width: 500px) {
    font-size: 1.5rem;
  }

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const GameHeroCard = ({ game, ToggleAddtoCart }: Props) => {
  const {
    state: { isLogged },
  } = useAuth();
  const Navigate = useNavigate();

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isTwoLine, setTwoLine] = useState<boolean>(false);

  useEffect(() => {
    if (titleRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(titleRef.current).lineHeight
      );
      const height = titleRef.current.offsetHeight;
      const lines = Math.round(height / lineHeight);
      setTwoLine(lines > 1);
    }
  }, [game.name]);

  const HandleClickCart = () => {
    if (!isLogged) {
      alert("Log in to Continue");
      return;
    }
    if (game.isInCart) {
      return Navigate("/cart");
    }
    ToggleAddtoCart(game._id);
  };

  console.log(isTwoLine);
  return (
    <Wrapper imageUrl={game.heroImageUrl} className="text-light">
      <LeftSection
        $isTwoLine={isTwoLine}
        className="w-100 w-lg-50 d-flex flex-column"
      >
        <GameTitle ref={titleRef}>{game.name}</GameTitle>
        <div className="d-flex flex-column gap-4">
          <SectionTitle>About the Game</SectionTitle>
          <p style={{ color: "#C8D6E5" }}>{game.description}</p>
          <div className="d-flex gap-4">
            <button
              className="btn btn-primary fw-bolder"
              style={{ background: "#1E90FF" }}
            >
              Purchase Now
            </button>
            <button
              className="btn d-flex align-items-center gap-1 border"
              style={{ backdropFilter: "blur(20px)" }}
              onClick={HandleClickCart}
            >
              {!game.isInCart ? (
                <p className="p-0 m-0 fw-bold text-white">Add to Cart</p>
              ) : (
                <p className="p-0 m-0 fw-bold text-white">Go to Cart</p>
              )}
            </button>
          </div>
          <div className="d-flex gap-4 mt-3">
            <FaPlaystation size={30} />
            <FaWindows size={30} />
          </div>
        </div>
      </LeftSection>
      <RightSection className="d-flex flex-column">
        <div>
          <SectionTitle>View Trailer</SectionTitle>
          <div className="border mb-3"></div>
          <div>
            <VideoIcon
              src={game.youtubeLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="border border-2"
            ></VideoIcon>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <SectionTitle className="fw-bold">Tags</SectionTitle>
          <div
            className="d-flex align-items-center flex-wrap"
            style={{ gap: "5px 20px" }}
          >
            {game.tags.map((data) => (
              <p
                key={data._id}
                className="border px-4 py-2 rounded-3"
                style={{
                  whiteSpace: "nowrap",
                  backdropFilter: "blur(50px)",
                }}
              >
                {data.name}
              </p>
            ))}
          </div>
        </div>
      </RightSection>
    </Wrapper>
  );
};

export default GameHeroCard;
