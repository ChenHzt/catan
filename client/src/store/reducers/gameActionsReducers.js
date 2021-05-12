import * as actionTypes from "../actions/actionTypes";

export const gameDataReducer = (game = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_GAME_DATA_SUCCESS:
    case actionTypes.CREATE_NEW_GAME_SUCCESS:
    case actionTypes.GET_BUILD_SETTELMENT_SUCCESS:
    case actionTypes.GET_BUILD_CITY_SUCCESS:
    case actionTypes.GET_BUILD_ROAD_SUCCESS:
    case actionTypes.DISTRIBUTE_RESOURCES_SUCCESS:
    case actionTypes.PLACE_ROBBER_SUCCESS:
    case actionTypes.ACTIVATE_KNIGHT_CARD_SUCCESS:
    case actionTypes.BUY_DEVELOPMENT_CARD_SUCCESS:
      return action.data;
    default:
      return game;
  }
};

export const validActionsReducer = (actions = [], action) => {
  if (action.type === actionTypes.GET_VALID_ACTIONS_SUCCESS) 
    return action.data;
  return actions;
};

export const currentActionReducer = (currentActionType = "", action) => {
  if (action.type === actionTypes.SET_CURRENT_ACTION_SUCCESS)
    return action.data;
  else return currentActionType;
};

export const currentTurnReducer = (currentTurn = -1, action) => {
  if (action.type === actionTypes.END_TURN_SUCCESS||
    action.type ===  actionTypes.GET_GAME_DATA_SUCCESS ||
    action.type ===  actionTypes.CREATE_NEW_GAME_SUCCESS)
    return action.data.currentTurn;
  else return currentTurn;
};

export const gamePhaseReducer = (phase = "", action) => {
  if (action.type === actionTypes.END_TURN_SUCCESS ||
    action.type ===  actionTypes.GET_GAME_DATA_SUCCESS ||
    action.type ===  actionTypes.CREATE_NEW_GAME_SUCCESS){
    console.log(action);
    return action.data.phase;
  }
  else return phase;
};

export const diceReducer = (dice = 0, action) => {
  if (
    action.type === actionTypes.END_TURN_SUCCESS ||
    action.type === actionTypes.DISTRIBUTE_RESOURCES_SUCCESS||
    action.type ===  actionTypes.GET_GAME_DATA_SUCCESS ||
    action.type ===  actionTypes.CREATE_NEW_GAME_SUCCESS
  )
    return action.data.dice;
  else return dice;
};
