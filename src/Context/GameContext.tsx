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

export interface ExploreCategoryItem {
  //Explore Section - genre, platform and so on.
  _id: string;
  name: string;
  totalGames: number;
  popularGame: [popularGame, popularGame];
}

export interface Gamedata {
  _id: string;
  name: string;
  coverImageUrl: string;
  peopleAdded: number;
  ratings: number;
  likes: number;
  liked?: boolean; //Only Available when User Logged In
  watched?: boolean;
}

export interface SelectedCategory {
  _id: string;
  name: string;
  gamesId: Gamedata[];
}

interface GameContextType {
  state: {
    category: { type: string; data: ExploreCategoryItem[] };
    game: SelectedCategory;
    genralGames: Gamedata[];
  };
  updateCategory: (type: string, data: ExploreCategoryItem[]) => void;
  updateCategoryType: (type: string) => void;
  updateSelectedCategory: (categoryData: SelectedCategory) => void;
  UpdateGenralGames: (games: Gamedata[]) => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(gameReducer, {
    category: { type: "", data: [] },
    game: {
      _id: "",
      name: "",
      gamesId: [],
    },
    genralGames: [],
  });

  // Use Callback function to Memoize the Function and get Reference for it
  // Normal functions recreated at every Render so it cause the functions Reinitialized which create an rendering in the GenrePage useEffect
  const updateCategory = useCallback(
    (type: string, data: ExploreCategoryItem[]) => {
      dispatch({ type: "SET_CATEGORY_TYPE_DATA", payload: { type, data } });
    },
    []
  );

  // Update the Type of Category to first, to avoid the fetching the leftOver page for previous category
  const updateCategoryType = useCallback((type: string) => {
    dispatch({ type: "SET_CATEGORY_TYPE", payload: { type } });
  }, []);

  // Update the Selected Category Data
  const updateSelectedCategory = useCallback(
    (categoryData: SelectedCategory) => {
      dispatch({
        type: "SET_SELECTED_CATEGORY_DATA",
        payload: { categoryData },
      });
    },
    []
  );

  const UpdateGenralGames = useCallback((games: Gamedata[]) => {
    dispatch({ type: "SET_GENRAL_GAME_DATA", payload: { games } });
  }, []);

  return (
    <GameContext.Provider
      value={{
        state,
        updateCategory,
        updateCategoryType,
        updateSelectedCategory,
        UpdateGenralGames,
      }}
    >
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
