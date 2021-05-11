import { combineReducers } from "redux";

export const gameBoardDimsReducer = (dims = {}, action) => {
  if (action.type === "GAME_BOARD_DIMS") {
    return action.payload;
  }

  return dims;
};

export const gameDataReducer = (game = {}, action) => {
  if (action.type === "GAME_DATA") {
    return action.payload;
  }
  if (action.type === "GET_BUILD_SETTELMENT_SUCCESS") {
    return action.data.game;
  }
  if (action.type === "GET_BUILD_ROAD_SUCCESS") {
    return action.data.game;
  }
  if (action.type === "END_TURN") {
    return action.payload.game;
  }
  if (action.type === "DISTRIBUTE_RESOURCES") {
    return action.payload.game;
  }
  if (action.type === "PLACE_ROBBER") {
    console.log(action)
    return action.payload.game;
  }

  return game;
};
export const userGamesReducer = (games = [], action) => {
  if (action.type === "USER_GAMES") {
    return action.payload;
  }

  return games;
};

export const gameDimsReducer = (dims = {}, action) => {
  if (action.type === "GAME_DIMENTIONS") return action.payload;
  return dims;
};

export const validActionsReducer = (actions = [], action) => {
  if (action.type === "VALID_ACTIONS") return action.payload;
  return actions;
};

export const validPlacesForSettelmentsReducer = (locations = [], action) => {
  if (action.type === "SETTELMENT_LOCATIONS") return action.payload;
  return locations;
};

// errorReducer.js

const initState = {
  error: null,
};

export function errorReducer(state = initState, action) {
  const { error } = action;

  if (error || error==='') {
    return {
      error: error,
    };
  }

  return state;
}

export const currentActionReducer = (currentActionType='', action) =>{
  if(action.type==='SET_CURRENT_ACTION')
    return action.payload;
  else return currentActionType
}

export default combineReducers({
  game: gameDataReducer,
  boardDims: gameBoardDimsReducer,
  games: userGamesReducer,
  gameDims: gameDimsReducer,
  validActions: validActionsReducer,
  locations: validPlacesForSettelmentsReducer,
  error:errorReducer,
  currentAction:currentActionReducer
});
