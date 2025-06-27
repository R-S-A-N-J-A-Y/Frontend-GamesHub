import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GameHeroCard from "../Components/GameHeroCard";
import GameGallery from "../Components/GameGallery";
import GameFeatureList from "../Components/GameFeatureList";
import GameSimilarSection from "../Components/GameSimilarSection";
import { useAppContext } from "../Context/AppContext";
import { useAuth } from "../Context/AuthContext";
import type { Platform } from "../Context/GameContext";

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
  platforms: Platform[];
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
          `${import.meta.env.VITE_BACKEND_URL}/user/games/${id}`,
          {
            headers: { "x-auth-token": token },
          }
        );
        setGame(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [id, token]);

  const ToggleAddtoCart = (id: string) => {
    if (!game) return;

    const fetch = async () => {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/cart`,
          { gameId: id },
          {
            headers: { "x-auth-token": token },
          }
        );
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    };

    setGame({ ...game, isInCart: true });
    fetch();
  };

  if (!game) return <div>Loading...</div>;
  return (
    <div className="d-flex flex-column gap-5">
      <GameHeroCard game={game} ToggleAddtoCart={ToggleAddtoCart} />
      <GameGallery theme={curr} screenshots={game.screenshots} />
      <GameFeatureList name={game.name} features={game.features} />
      <GameSimilarSection genres={game.genres} theme={curr} />
    </div>
  );
};

export default GameDetailsPage;
