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
    title: "Explore the Wild",
    description:
      "Ride through forests, rivers, caves, and snowy mountains in a dangerous but beautiful world. Search small towns for supplies, explore dark caves, and enjoy the huge open land of post-apocalyptic Oregon.",
  },
  {
    imageUrl:
      "https://gmedia.playstation.com/is/image/SIEPDC/Days-Gone-Remastered-screenshot-legal-12-21feb25?$1600px$",
    title: "Survive the Hordes",
    description:
      "Play as Deacon and fight to stay alive against hundreds of wild Freakers chasing you. Grab everything you need from camp before heading out — running into a horde could mean the end.",
  },
  {
    imageUrl:
      "https://gmedia.playstation.com/is/image/SIEPDC/Days-Gone-Remastered-screenshot-legal-14-21feb25?$1600px$",
    title: "A Story of Love and Brotherhood",
    description:
      "Ride with Deacon as he holds on to the memories of his lost wife and fights to protect his closest friend. In a world falling apart, love gives him strength, and brotherhood keeps him going. Through pain, loss, and danger—this journey is about never giving up on the people you care about.",
  },
  {
    imageUrl:
      "https://ik.imagekit.io/sanjayvault/GamesHub/Game%20Previews/Days%20Gone/Screenshots/DaysGone.png",
    title: "Ride and Fight",
    description:
      "Hop on your bike and ride through a world full of danger. Face changing weather, day and night cycles, random enemies, and Freakers that keep getting smarter. Stay ready — the road is never safe.",
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
