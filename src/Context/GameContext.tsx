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
    category: { type: string; data: GenralDatatype[] };
    game: GenralDatatype[];
  };
  FetchGenre: (type: string, data: GenralDatatype[]) => void;
  changeType: (type: string) => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(gameReducer, {
    category: { type: "", data: [] },
    game: [],
  });

  // Use Callback function to Memoize the Function and get Reference for it
  // Normal functions recreated at every Render so it cause the functions Reinitialized which create an rendering in the GenrePage useEffect
  const FetchGenre = useCallback((type: string, data: GenralDatatype[]) => {
    dispatch({ type: "SET_CATEGORY_TYPE_DATA", payload: { type, data } });
  }, []);

  // Update the Type of Category to first, to avoid the fetching the leftOver page for previous category
  const changeType = useCallback((type: string) => {
    dispatch({ type: "SET_CATEGORY_TYPE", payload: { type } });
  }, []);

  return (
    <GameContext.Provider value={{ state, FetchGenre, changeType }}>
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
