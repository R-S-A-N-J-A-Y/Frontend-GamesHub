import { useEffect } from "react";
import { useGameContext } from "../Context/GameContext";
import GameCard from "./GameCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const GameList = () => {
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
      }
    };

    fetch();
  }, [type, id, updateSelectedCategory]);

  if (game._id === "") return <p>No Category is Selected.</p>;
  console.log(game.gamesId);
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

export default GameList;
