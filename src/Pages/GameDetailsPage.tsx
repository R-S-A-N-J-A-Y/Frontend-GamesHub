import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppContext } from "../Context/AppContext";
import { useAuth } from "../Context/AuthContext";
import type { Platform } from "../Context/GameContext";

import GameHeroCard from "../Components/GameHeroCard";
import GameGallery from "../Components/GameGallery";
import GameFeatureList from "../Components/GameFeatureList";
import GameSimilarSection from "../Components/GameSimilarSection";
import Loader from "../Components/Loader";

import { fetchGame } from "../api/GameApi";
import { createCart } from "../api/userGameActions";

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
  const [isLoading, setIsLoading] = useState(false);

  const {
    state: { token },
  } = useAuth();

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    const fetch = async () => {
      try {
        const result = await fetchGame(token, id);
        setGame(result.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id, token]);

  const ToggleAddtoCart = (id: string) => {
    if (!game) return;

    const fetch = async () => {
      try {
        await createCart(token, id);
      } catch (err) {
        console.log(err);
      }
    };

    setGame({ ...game, isInCart: true });
    fetch();
  };
  if (isLoading) return <Loader />;
  if (!game) return <div>Game Not Found...</div>;
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
