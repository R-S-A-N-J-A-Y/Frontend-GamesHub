import type { ExploreCategoryItem } from "../Context/GameContext";

type GameState = {
  category: { type: string; data: ExploreCategoryItem[] };
  game: ExploreCategoryItem[];
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
  }

  return state;
};

export default gameReducer;
