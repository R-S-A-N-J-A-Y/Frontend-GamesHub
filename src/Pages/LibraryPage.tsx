import { useEffect, useState } from "react";
import type { Platform } from "../Context/GameContext";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import GameCard from "../Components/GameCard";
import Loader from "../Components/Loader";
import { ToggleLikeApi, ToggleWatchListApi } from "../api/userGameActions";

type GameData = {
  _id: string;
  name: string;
  coverImageUrl: string;
  peopleAdded: number;
  ratings: number;
  likes: number;
  platforms: Platform[];
  price: number;
  liked: boolean;
};

const LibraryPage = () => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];
  const {
    state: { token },
  } = useAuth();
  const [isLoding, setIsloading] = useState<boolean>(false);

  const Navigate = useNavigate();

  const [games, setGames] = useState<GameData[] | null>(null);

  useEffect(() => {
    setIsloading(true);
    const fetch = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/watchListPreview`,
          {
            headers: { "x-auth-token": token },
          }
        );
        setGames(result.data.data);
      } catch (err) {
        console.log(err);
        alert(err);
      } finally {
        setIsloading(false);
      }
    };
    fetch();
  }, [token]);

  const ToggleLike = async (id: string, currStatus: boolean) => {
    await ToggleLikeApi(id, currStatus, token);
  };

  const ToggleWatchList = async (id: string, currStatus: boolean) => {
    if (!games) return;
    setGames(games.filter((game) => game._id != id));
    await ToggleWatchListApi(id, currStatus, token);
  };

  if (isLoding) return <Loader />;

  return (
    <div>
      <div className="mb-5">
        <p className="fw-bold fs-3 m-0 mb-2">
          Game{" "}
          <span className="fs-3" style={{ color: `${currTheme.highLight}` }}>
            Archive
          </span>
        </p>
        <h5 className="text-secondary fw-bold">
          Everything you love, all in one place.
        </h5>
      </div>

      {!games ? (
        <div className="d-flex flex-column align-items-center">
          <h2 className="fs-3 font-bolder mb-2">
            Your Library Is{" "}
            <span style={{ color: `${currTheme.highLight}` }}>Empty.</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            You haven’t added any games yet.
            <br />
            Found something cool? Add it to your Library!
          </p>
          <div>
            <button
              className="btn fw-bold w-100"
              style={{ background: `${currTheme.highLight}` }}
              onClick={() => Navigate("/explore")}
            >
              Browse Games
            </button>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4">
          {games.map((game, key) => (
            <div key={key} className="col">
              <GameCard
                ToggleLike={ToggleLike}
                ToggleWatchList={ToggleWatchList}
                game={{ ...game, watched: true }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
