import styled from "styled-components";
import type { gameData } from "../Pages/GameDetailsPage";
import { FaPlaystation, FaWindows } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
`;

const GameHeroCard = ({ game, ToggleAddtoCart }: Props) => {
  const {
    state: { isLogged },
  } = useAuth();
  const Navigate = useNavigate();

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

  return (
    <Wrapper imageUrl={game.heroImageUrl} className="d-flex gap-5 text-light">
      <div
        className="w-50 d-flex flex-column"
        style={{ marginTop: "100px", gap: "70px", padding: "50px 100px" }}
      >
        <h1
          className="fw-bolder"
          style={{ fontSize: "60px", color: "#00BFFF" }}
        >
          {game.name}
        </h1>
        <div className="d-flex flex-column gap-4">
          <h2 className="fw-bolder">About the Game</h2>
          <p style={{ color: "#C8D6E5" }}>{game.description}</p>
          <div className="d-flex gap-4">
            <button
              className="btn btn-primary px-3 py-2 fw-bolder"
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
      </div>
      <div
        className="w-50"
        style={{ marginTop: "50px", gap: "70px", padding: "0 120px 0 200px" }}
      >
        <div className="w-50 d-flex flex-column" style={{ gap: "60px" }}>
          <div>
            <h4>View Trailer</h4>
            <div className="border mb-3"></div>
            <div>
              <iframe
                width="450"
                height="250"
                src={game.youtubeLink}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="border border-2"
              ></iframe>
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <h2 className="fw-bold">Tags</h2>
            <div className="d-flex gap-4 align-items-center">
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
        </div>
      </div>
    </Wrapper>
  );
};

export default GameHeroCard;
