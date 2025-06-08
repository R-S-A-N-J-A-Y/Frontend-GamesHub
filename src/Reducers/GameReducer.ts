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
      type: "SET_CATEGORY_TYPE" | "SET_SELECTED_CATEGORY_TYPE";
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
    }
  | {
      type: "TOGGLE_LIKE" | "TOGGLE_WATCHLIST";
      payload: {
        id: string;
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
  } else if (action.type === "SET_SELECTED_CATEGORY_TYPE") {
    return {
      ...state,
      game: {
        ...state.game,
        name: action.payload.type,
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
  } else if (action.type === "TOGGLE_LIKE") {
    return {
      ...state,
      game: {
        ...state.game,
        gamesId: state.game.gamesId.map((game) =>
          game._id === action.payload.id
            ? { ...game, liked: !game.liked }
            : game
        ),
      },
      genralGames: state.genralGames.map((game) =>
        game._id === action.payload.id ? { ...game, liked: !game.liked } : game
      ),
    };
  } else if (action.type === "TOGGLE_WATCHLIST") {
    return {
      ...state,
      game: {
        ...state.game,
        gamesId: state.game.gamesId.map((game) =>
          game._id === action.payload.id
            ? { ...game, watched: !game.watched }
            : game
        ),
      },
      genralGames: state.genralGames.map((game) =>
        game._id === action.payload.id
          ? { ...game, watched: !game.watched }
          : game
      ),
    };
  }

  return state;
};

export default gameReducer;
