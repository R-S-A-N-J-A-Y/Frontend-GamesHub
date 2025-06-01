import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GameHeroCard from "../Components/GameHeroCard";
import GameGallery from "../Components/GameGallery";
import GameFeatureList from "../Components/GameFeatureList";

export interface featureType {
  imageUrl: string;
  title: string;
  description: string;
}

export interface gameData {
  _id: string;
  name: string;
  shortName: string;
  description: string;
  genres: string[];
  platforms: string[];
  studios: string[];
  stores: string[];
  tags: { _id: string; name: string }[];
  coverImageUrl: string;
  screenshots: string[];
  likes: number;
  peopleAdded: number;
  rating: number;
  totalPurchase: number;
}

const InitialFeature = [
  {
    imageUrl:
      "https://gmedia.playstation.com/is/image/SIEPDC/Days-Gone-Remastered-screenshot-legal-10-21feb25?$1600px$",
    title: "Farewell Wilderness",
    description:
      "From lush pine forests and meadows, to cascading waterfalls, and desert lava fields, the world of Days Gone is both beautiful and lethal. Descend into the depths of caves and mines, scavenge supplies in small rural towns, or ride up snow covered mountains to take in the vast landscapes of a post-apocalyptic Oregon.",
  },
  {
    imageUrl:
      "https://gmedia.playstation.com/is/image/SIEPDC/Days-Gone-Remastered-screenshot-legal-10-21feb25?$1600px$",
    title: "Farewell Wilderness",
    description:
      "From lush pine forests and meadows, to cascading waterfalls, and desert lava fields, the world of Days Gone is both beautiful and lethal. Descend into the depths of caves and mines, scavenge supplies in small rural towns, or ride up snow covered mountains to take in the vast landscapes of a post-apocalyptic Oregon.",
  },
  {
    imageUrl:
      "https://gmedia.playstation.com/is/image/SIEPDC/Days-Gone-Remastered-screenshot-legal-10-21feb25?$1600px$",
    title: "Farewell Wilderness",
    description:
      "From lush pine forests and meadows, to cascading waterfalls, and desert lava fields, the world of Days Gone is both beautiful and lethal. Descend into the depths of caves and mines, scavenge supplies in small rural towns, or ride up snow covered mountains to take in the vast landscapes of a post-apocalyptic Oregon.",
  },
];

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
  return (
    <div className="d-flex flex-column gap-5">
      <GameHeroCard game={game} />
      <GameGallery screenshots={game.screenshots} />
      <GameFeatureList name={game.name} features={InitialFeature} />
    </div>
  );
};

export default GameDetailsPage;
