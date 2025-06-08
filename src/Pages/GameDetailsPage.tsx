import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GameHeroCard from "../Components/GameHeroCard";
import GameGallery from "../Components/GameGallery";
import GameFeatureList from "../Components/GameFeatureList";
import GameSimilarSection from "../Components/GameSimilarSection";
import { useAppContext } from "../Context/AppContext";
import { useAuth } from "../Context/AuthContext";

export interface featureType {
  imageUrl: string;
  name: string;
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
  heroImageUrl: string;
  screenshots: string[];
  youtubeLink: string;
  features: featureType[];

  likes: number;
  peopleAdded: number;
  rating: number;
  totalPurchase: number;

  isInCart: boolean; //Only For Logged in User
}

const GameDetailsPage = () => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<gameData | null>(null);

  const {
    state: { token },
  } = useAuth();

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

  const ToggleAddtoCart = (id: string, currState: boolean) => {
    if (!game) return;

    const fetch = async () => {
      try {
        const result = await axios.post(
          "http://localhost:3000/user/cart",
          { gameId: id, currState },
          {
            headers: { "x-auth-token": token },
          }
        );
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    };

    setGame({ ...game, isInCart: !game.isInCart });
    fetch();
  };

  if (!game) return <div>Loading...</div>;
  return (
    <div className="d-flex flex-column gap-5">
      <GameHeroCard game={game} ToggleAddtoCart={ToggleAddtoCart} />
      <GameGallery theme={curr} screenshots={game.screenshots} />
      <GameFeatureList name={game.name} features={game.features} />
      <GameSimilarSection theme={curr} />
    </div>
  );
};

export default GameDetailsPage;
