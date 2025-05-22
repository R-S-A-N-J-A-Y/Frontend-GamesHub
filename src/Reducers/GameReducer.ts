import type { GenralDatatype } from "../Context/GameContext";

type GameState = {
  category: GenralDatatype[];
  game: GenralDatatype[];
};

type GameAction = {
  type: string;
  payload: {
    data: GenralDatatype[];
  };
};

const gameReducer = (state: GameState, action: GameAction) => {
  if (action.type === "Category") {
    return {
      ...state,
      category: action.payload.data,
    };
  }

  return state;
};

export default gameReducer;
