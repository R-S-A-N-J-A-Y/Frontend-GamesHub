import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

import gameReducer from "../Reducers/GameReducer";
import axios from "axios";
import { useAuth } from "./AuthContext";

interface Props {
  children: ReactNode;
}

interface popularGame {
  name: string;
  likes: number;
}

export interface ExploreCategoryItem {
  //Explore Section - genre, platform and so on.
  _id: string;
  name: string;
  shortName: string;
  totalGames: number;
  coverImageUrl: string;
  popularGame: [popularGame, popularGame];
}

export interface Gamedata {
  _id: string;
  name: string;
  coverImageUrl: string;
  peopleAdded: number;
  ratings: number;
  likes: number;
  liked: boolean; //Only Available when User Logged In
  watched: boolean;
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
  ToggleLike: (id: string, currStatus: boolean) => void;
  ToggleWatchList: (id: string, currStatus: boolean) => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameContextProvider = ({ children }: Props) => {
  const {
    state: { token },
  } = useAuth();

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

  // Genral Games Fetching with Reducer
  const UpdateGenralGames = useCallback((games: Gamedata[]) => {
    dispatch({ type: "SET_GENRAL_GAME_DATA", payload: { games } });
  }, []);

  // Toggle Like of particular Game and update at backend
  const ToggleLike = async (id: string, currStatus: boolean) => {
    dispatch({ type: "TOGGLE_LIKE", payload: { id } });

    try {
      const config = { headers: { "x-auth-token": token } };
      await axios.patch(
        "http://localhost:3000/user/toggleLike",
        { gameId: id, liked: !currStatus },
        config
      );
    } catch (err) {
      alert(err);
    }
  };

  const ToggleWatchList = async (id: string, currStatus: boolean) => {
    dispatch({ type: "TOGGLE_WATCHLIST", payload: { id } });

    try {
      const config = { headers: { "x-auth-token": token } };
      await axios.patch(
        "http://localhost:3000/user/toggleWatchList",
        { gameId: id, watched: !currStatus },
        config
      );
    } catch (err) {
      alert(err);
    }
  };

  return (
    <GameContext.Provider
      value={{
        state,
        updateCategory,
        updateCategoryType,
        updateSelectedCategory,
        UpdateGenralGames,
        ToggleLike,
        ToggleWatchList,
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
