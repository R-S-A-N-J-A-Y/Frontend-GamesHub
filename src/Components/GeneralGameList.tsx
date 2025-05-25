import { useEffect, useState } from "react";
import { useGameContext } from "../Context/GameContext";
import axios from "axios";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

const GeneralGameList = () => {
  const {
    state: { genralGames },
    UpdateGenralGames,
  } = useGameContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/games/");
        UpdateGenralGames(res.data.data);
      } catch (err) {
        alert(err);
      } finally {
        setTimeout(() => setIsLoading(false), 3000);
      }
    };
    fetchData();
  }, [UpdateGenralGames]);

  if (isLoading)
    return (
      <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5">
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
        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5 ">
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
