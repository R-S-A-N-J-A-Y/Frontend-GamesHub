import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GameHeroCard from "../Components/GameHeroCard";

interface gameData {
  _id: string;
  name: string;
  shortName: string;
  description: string;
  genres: string[];
  platforms: string[];
  studios: string[];
  stores: string[];
  tags: string[];
  coverImageUrl: string;
  screenshots: string[];
  likes: number;
  peopleAdded: number;
  rating: number;
  totalPurchase: number;
}

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<gameData | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/user/games/${id}`
        );
        setGame(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [id]);

  if (!game) return <div>Loading...</div>;
  return <GameHeroCard />;
};

export default GameDetailsPage;
