import { useEffect, useState } from "react";
import { useGameContext } from "../Context/GameContext";
import GameCard from "./GameCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import GameCardSkeleton from "./GameCardSkeleton";
import { useAppContext } from "../Context/AppContext";
import { useAuth } from "../Context/AuthContext";

const CategoryGameList = () => {
  const {
    state: { token },
  } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const {
    state: { game },
    updateSelectedCategory,
    ToggleLike,
    ToggleWatchList,
  } = useGameContext();

  const { type, id } = useParams<{ type: string; id: string }>();

  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];

  useEffect(() => {
    const fetch = async () => {
      try {
        let url = type;
        if (type === "platforms") url = "platformsv";
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/${url}/${id}`,
          {
            headers: { "x-auth-token": token },
          }
        );
        updateSelectedCategory(res.data.data);
      } catch (err) {
        alert(err);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    fetch();
  }, [type, id, updateSelectedCategory, token]);

  if (isLoading)
    return (
      <div className="d-flex flex-column gap-4" style={{ minHeight: "81vh" }}>
        <h3 className="fw-bold">
          {" "}
          Explore Realms of the{" "}
          <span style={{ color: currTheme.highLight }}>{game.name}</span>
        </h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4">
          {[...Array(8)].map((key) => (
            <div className="col" key={key}>
              <GameCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );

  if (game._id === "") return <p>No Category is Selected.</p>;

  return (
    <div className="d-flex flex-column gap-4" style={{ minHeight: "81vh" }}>
      <h3 className="fw-bold">
        {" "}
        Explore Realms of the{" "}
        <span style={{ color: currTheme.highLight }}>{game.name}</span>
      </h3>
      {game.gamesId.length === 0 ? (
        <p>No Games Available.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4">
          {game.gamesId.map((data, key) => (
            <div key={key} className="col">
              <GameCard
                game={data}
                ToggleLike={ToggleLike}
                ToggleWatchList={ToggleWatchList}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGameList;
