import { useEffect, useState } from "react";
import { useGameContext } from "../Context/GameContext";
import axios from "axios";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { useAuth } from "../Context/AuthContext";
import qs from "qs";

interface Props {
  orderBy: string;
  platform: string[];
}

const GeneralGameList = ({ orderBy, platform }: Props) => {
  const {
    state: { genralGames },
    UpdateGenralGames,
  } = useGameContext();
  const {
    state: { token },
  } = useAuth();

  const { ToggleLike, ToggleWatchList } = useGameContext();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      let url = `${import.meta.env.VITE_BACKEND_URL}/user/games/`;

      const params: { sortBy?: string; order: string; platforms?: string[] } = {
        sortBy: orderBy.toLowerCase(),
        order: "asc",
      };

      if (platform && platform.length > 0) {
        params.platforms = platform;
        url += "filter";
      }

      try {
        const res = await axios.get(url, {
          params,
          headers: { "x-auth-token": token },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        });
        UpdateGenralGames(res.data.data);
      } catch (err) {
        alert(err);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };
    fetchData();
  }, [UpdateGenralGames, token, orderBy, platform]);

  if (isLoading)
    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4">
        {[...Array(8)].map((key) => (
          <div className="col" key={key}>
            <GameCardSkeleton />
          </div>
        ))}
      </div>
    );

  return (
    <div>
      {genralGames.length === 0 ? (
        "No Games Available"
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4">
          {genralGames.map((data, key) => (
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

export default GeneralGameList;
