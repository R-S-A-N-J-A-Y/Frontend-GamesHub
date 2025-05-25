import { useEffect, useState } from "react";
import { useGameContext } from "../Context/GameContext";
import GameCard from "./GameCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import GameCardSkeleton from "./GameCardSkeleton";

const CategoryGameList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    state: { game },
    updateSelectedCategory,
  } = useGameContext();
  const { type, id } = useParams<{ type: string; id: string }>();

  useEffect(() => {
    const fetch = async () => {
      try {
        let url = type;
        if (type === "platforms") url = "platformsv";
        const res = await axios.get(`http://localhost:3000/user/${url}/${id}`);
        updateSelectedCategory(res.data.data);
      } catch (err) {
        alert(err);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetch();
  }, [type, id, updateSelectedCategory]);

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

  if (game._id === "") return <p>No Category is Selected.</p>;

  return (
    <div>
      {game.gamesId.length === 0 ? (
        <p>No Games Available.</p>
      ) : (
        <div>
          {game.gamesId.map((data, key) => (
            <div key={key}>
              <GameCard game={data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGameList;
