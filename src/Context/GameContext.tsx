import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

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
    category: GenralDatatype[];
    game: GenralDatatype[];
  };
  FetchGenre: (data: GenralDatatype[]) => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(gameReducer, {
    category: [],
    game: [],
  });

  // Use Callback function to Memoize the Function and get Reference for it
  // Normal functions recreated at every Render so it cause the functions Reinitialized which create an rendering in the GenrePage useEffect
  const FetchGenre = useCallback((data: GenralDatatype[]) => {
    dispatch({ type: "Category", payload: { data } });
  }, []);

  return (
    <GameContext.Provider value={{ state, FetchGenre }}>
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
