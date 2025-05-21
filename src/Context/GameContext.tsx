import { createContext, useContext, useReducer, type ReactNode } from "react";

import gameReducer from "../Reducers/GameReducer";

interface Props {
  children: ReactNode;
}

interface popularGame {
  gameName: string;
  likes: number;
}

export interface GenralDatatype {
  _id: string;
  name: string;
  gameCount: number;
  popularGame: [popularGame, popularGame];
}

interface GameContextType {
  state: {
    genres: GenralDatatype[];
    platforms: GenralDatatype[];
    tags: GenralDatatype[];
    stores: GenralDatatype[];
    studios: GenralDatatype[];
    game: GenralDatatype[];
  };
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(gameReducer, {
    genres: [],
    platforms: [],
    tags: [],
    stores: [],
    studios: [],
    game: [],
  });

  return (
    <GameContext.Provider value={{ state }}>{children}</GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
