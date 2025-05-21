import type { GenralDatatype } from "../Context/GameContext";

type GameState = {
  genres: GenralDatatype[];
  platforms: GenralDatatype[];
  tags: GenralDatatype[];
  stores: GenralDatatype[];
  studios: GenralDatatype[];
  game: GenralDatatype[];
};

type GameAction = {
  type: "Genre";
  payload: {
    data: GenralDatatype[];
  };
};

const gameReducer = (state: GameState, action: GameAction) => {
  if (action.type === "Genre") {
    return {
      ...state,
      genres: action.payload.data,
    };
  }

  return state;
};

export default gameReducer;
