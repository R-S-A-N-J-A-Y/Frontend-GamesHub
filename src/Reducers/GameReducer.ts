import type {
  Gamedata,
  ExploreCategoryItem,
  SelectedCategory,
} from "../Context/GameContext";

type GameState = {
  category: { type: string; data: ExploreCategoryItem[] };
  game: SelectedCategory;
  genralGames: Gamedata[];
};

type GameAction =
  | {
      type: "SET_CATEGORY_TYPE_DATA";
      payload: {
        type: string;
        data: ExploreCategoryItem[];
      };
    }
  | {
      type: "SET_CATEGORY_TYPE";
      payload: {
        type: string;
      };
    }
  | {
      type: "SET_SELECTED_CATEGORY_DATA";
      payload: {
        categoryData: SelectedCategory;
      };
    }
  | {
      type: "SET_GENRAL_GAME_DATA";
      payload: {
        games: Gamedata[];
      };
    };

const gameReducer = (state: GameState, action: GameAction) => {
  if (action.type === "SET_CATEGORY_TYPE") {
    return {
      ...state,
      category: {
        ...state.category,
        type: action.payload.type,
      },
    };
  } else if (action.type === "SET_CATEGORY_TYPE_DATA") {
    return {
      ...state,
      category: {
        type: action.payload.type,
        data: action.payload.data,
      },
    };
  } else if (action.type === "SET_SELECTED_CATEGORY_DATA") {
    return {
      ...state,
      game: {
        ...action.payload.categoryData,
      },
    };
  } else if (action.type === "SET_GENRAL_GAME_DATA") {
    return {
      ...state,
      genralGames: action.payload.games,
    };
  }

  return state;
};

export default gameReducer;
