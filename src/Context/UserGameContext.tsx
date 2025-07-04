import { useContext, createContext } from "react";
import type { Gamedata } from "./GameContext";

interface UserGameContextType {
  likedGames: Gamedata[];
  watchList: Gamedata[];
  cart: Gamedata[];
}

export const UserGameContext = createContext<UserGameContextType | undefined>(
  undefined
);

export const UserGameContextProvide = () => {};

export const useGameContext = () => {
  const context = useContext(UserGameContext);
  if (!context)
    throw new Error(
      "useGameContext must be used within an GameContextProvider"
    );
  return context;
};
