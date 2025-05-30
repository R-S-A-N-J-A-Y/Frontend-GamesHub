import styled, { css } from "styled-components";
import { useAppContext } from "../Context/AppContext";
import { MdAddToPhotos } from "react-icons/md";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useGameContext, type Gamedata } from "../Context/GameContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
export const CardHoverAnimation = css`
  transition: box-shadow 0.3s ease, transform 0.3s ease-in;

  &:hover {
    box-shadow: 2px 2px 10px rgba(117, 112, 112, 0.53);
    transform: scale(1.02);
  }
`;

const Card = styled.div`
  width: 300px;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  padding: 1px;
  cursor: pointer;
  ${CardHoverAnimation};
`;

const GameCard = ({ game }: { game: Gamedata }) => {
  const Navigate = useNavigate();
  const {
    state: { isLogged },
  } = useAuth();
  const { ToggleLike, ToggleWatchList } = useGameContext();
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  const isToggleWatchList = () => {
    if (isLogged) ToggleWatchList(game._id, game.watched);
    else alert("Please Login to Continue...");
  };

  const isToggleLike = () => {
    if (isLogged) ToggleLike(game._id, game.liked);
    else alert("Please Login to Continue...");
  };

  return (
    <Card className="card" onClick={() => Navigate("game/12")}>
      <img
        src={`${game.coverImageUrl}`}
        className="card-img-top"
        style={{ borderRadius: "10px 10px 0 0" }}
        alt="..."
      />
      <div
        className="card-body"
        style={{
          background: `${curr.boxColor}`,
          color: `${curr.name === "dark" ? "#ffffff" : "#000000"}`,
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <div className="d-flex flex-column gap-2">
          <p className="fs-5 fw-bold m-0 p-0">{game.name}</p>
          <div className="d-flex align-items-center gap-4">
            <p className="m-0 p-0" style={{ fontSize: "20px" }}>
              $78
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="p-1"
              style={{ border: "none", background: "none" }}
              onClick={isToggleLike}
            >
              {isLogged ? (
                game.liked ? (
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
              className="btn fw-bold w-100"
              style={{ background: `${curr.highLight}` }}
            >
              Purchase
            </a>
            <button
              className={`btn d-flex align-items-center gap-1 border text-${
                theme === "dark" ? "white" : "black"
              }`}
              onClick={isToggleWatchList}
            >
              {isLogged ? (
                game.watched ? (
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
      </div>
    </Card>
  );
};

export default GameCard;
