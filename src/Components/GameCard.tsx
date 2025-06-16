import styled, { css } from "styled-components";
import { useAppContext } from "../Context/AppContext";
import { MdAddToPhotos } from "react-icons/md";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useGameContext, type Gamedata } from "../Context/GameContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PiFilmSlate } from "react-icons/pi";
import { MdCurrencyRupee } from "react-icons/md";

import Platforms from "./Platforms";
import { useState } from "react";

export const CardHoverAnimation = css`
  transition: box-shadow 0.3s ease, transform 0.3s ease-in;

  &:hover {
    box-shadow: 2px 2px 10px rgba(117, 112, 112, 0.53);
    transform: scale(1.02);
  }
`;

const Card = styled.div`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  padding: 1px;
  ${CardHoverAnimation};
`;

const CardImagePreview = styled.div<{ imageUrl: string }>`
  aspect-ratio: 14/9;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  border-radius: 10px 10px 0 0;
`;

const RatingContainer = styled.div`
  right: 10px;
  top: 10px;
  backdrop-filter: blur(20px);
`;

const PlatformContainer = styled.div`
  left: 10px;
  bottom: 10px;
  gap: 15px;
  backdrop-filter: blur(20px);
`;

interface Props {
  game: Gamedata;
  cardWidth?: string;
}

const GameCard = ({ game, cardWidth }: Props) => {
  const Navigate = useNavigate();
  const {
    state: { isLogged },
  } = useAuth();

  const { ToggleLike, ToggleWatchList } = useGameContext();
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  const [isLiked, setIsLiked] = useState(game.liked);
  const [isWatched, setIsWatched] = useState(game.watched);

  const isToggleWatchList = () => {
    if (isLogged) {
      setIsWatched(!isWatched);
      ToggleWatchList(game._id, game.watched);
    } else alert("Please Login to Continue...");
  };

  const isToggleLike = () => {
    if (isLogged) {
      setIsLiked(!isLiked);
      ToggleLike(game._id, game.liked);
    } else alert("Please Login to Continue...");
  };

  return (
    <Card className="card" style={{ width: `${cardWidth}` }}>
      <CardImagePreview
        imageUrl={game.coverImageUrl}
        className="card-img-top position-relative"
        onClick={() => Navigate(`/games/${game._id}`)}
      >
        <RatingContainer className="position-absolute d-flex align-items-center gap-2 border px-2 py-1 rounded-3">
          <PiFilmSlate size={22} color="white" />
          <p className="text-white fw-bold p-0 m-0">{game.ratings}</p>
        </RatingContainer>

        <PlatformContainer className="position-absolute d-flex p-2 border rounded-3">
          <Platforms platforms={game.platforms} />
        </PlatformContainer>
      </CardImagePreview>
      <div
        className="card-body d-flex flex-column"
        style={{
          gap: "7px",
          background: `${curr.boxColor}`,
          color: `${curr.name === "dark" ? "#ffffff" : "#000000"}`,
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <p className="fs-5 fw-bold m-0 p-0">{game.name}</p>
        <p
          className="m-0 p-0 d-flex align-items-center"
          style={{ fontSize: "1.05rem" }}
        >
          <MdCurrencyRupee />
          {game.price}
        </p>
        <div className="d-flex gap-2">
          <button
            style={{
              border: "none",
              background: "none",
            }}
            className="p-0"
            onClick={isToggleLike}
          >
            {isLogged ? (
              isLiked ? (
                <GoHeartFill size={29} color="red" />
              ) : (
                <GoHeart
                  size={29}
                  color={curr.name === "dark" ? "white" : "black"}
                />
              )
            ) : (
              <GoHeartFill
                size={29}
                color={curr.name === "dark" ? "white" : "black"}
              />
            )}
          </button>
          <a
            href="#"
            className="btn fw-bold px-1 w-100"
            style={{ background: `${curr.highLight}`, fontSize: "0.958rem" }}
          >
            Purchase
          </a>
          <button
            className={`btn p-2 d-flex align-items-center gap-1 border text-${
              theme === "dark" ? "white" : "black"
            }`}
            onClick={isToggleWatchList}
            style={{ fontSize: "0.938rem" }}
          >
            {isLogged ? (
              isWatched ? (
                <p className="text-success fw-bold m-0">Added</p>
              ) : (
                <>
                  <MdAddToPhotos
                    size={20}
                    color={theme === "dark" ? "white" : "black"}
                  />
                  Add
                </>
              )
            ) : (
              <>
                <MdAddToPhotos
                  size={20}
                  color={theme === "dark" ? "white" : "black"}
                />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;
