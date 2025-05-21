import { createContext, useContext, useState, type ReactNode } from "react";

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
  genres: GenralDatatype[];
  onClickGenre: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameContextProvider = ({ children }: Props) => {
  const [genres, setGenres] = useState<GenralDatatype[]>([
    {
      _id: "",
      name: "",
      gameCount: 0,
      popularGame: [
        { gameName: "", likes: 0 },
        { gameName: "", likes: 0 },
      ],
    },
  ]);

  const onClickGenre = () => {
    setGenres([
      {
        _id: "",
        name: "",
        gameCount: 0,
        popularGame: [
          { gameName: "", likes: 0 },
          { gameName: "", likes: 0 },
        ],
      },
    ]);
  };

  return (
    <GameContext.Provider value={{ genres, onClickGenre }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
