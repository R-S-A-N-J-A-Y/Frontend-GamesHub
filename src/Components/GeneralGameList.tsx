import { useEffect, useState } from "react";
import { useGameContext } from "../Context/GameContext";
import axios from "axios";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import { useAuth } from "../Context/AuthContext";

interface Props {
  orderBy: string;
}

const GeneralGameList = ({ orderBy }: Props) => {
  const {
    state: { genralGames },
    UpdateGenralGames,
  } = useGameContext();
  const {
    state: { token },
  } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const url = "http://localhost:3000/user/games/";
      try {
        const res = await axios.get(url, {
          params: { sortBy: orderBy.toLowerCase(), order: "asc" },
          headers: { "x-auth-token": token },
        });
        UpdateGenralGames(res.data.data);
      } catch (err) {
        alert(err);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };
    fetchData();
  }, [UpdateGenralGames, token, orderBy]);

  if (isLoading)
    return (
      <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4">
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
        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4">
          {genralGames.map((data, key) => (
            <div key={key} className="col">
              <GameCard game={data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneralGameList;
