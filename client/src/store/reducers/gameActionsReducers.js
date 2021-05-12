import * as actionTypes from '../actions/actionTypes'


export const gameDataReducer = (game = {}, action) => {
    if (action.type === actionTypes.GET_GAME_DATA_SUCCESS) {
      return action.data;
    }
    if (action.type === actionTypes.CREATE_NEW_GAME_SUCCESS) {
      return action.data;
    }
    if (action.type === actionTypes.GET_BUILD_SETTELMENT_SUCCESS) {
      return action.data;
    }
    if (action.type === actionTypes.GET_BUILD_CITY_SUCCESS) {
      return action.data;
    }
    if (action.type === actionTypes.GET_BUILD_ROAD_SUCCESS) {
      return action.data;
    }
    // if (action.type === "END_TURN") {
    //   return action.data.game;
    // }
    if (action.type === actionTypes.DISTRIBUTE_RESOURCES_SUCCESS) {
      return action.data;
    }
    if (action.type === actionTypes.PLACE_ROBBER_SUCCESS) {
      return action.data;
    }
    if (action.type === actionTypes.ACTIVATE_KNIGHT_CARD_SUCCESS) {
      return action.data;
    }
    if (action.type === actionTypes.BUY_DEVELOPMENT_CARD_SUCCESS) {
      return action.data;
    }
  
    return game;
  };

  export const validActionsReducer = (actions = [], action) => {
    if (action.type === actionTypes.GET_VALID_ACTIONS_SUCCESS) 
        return action.data;
    return actions;
  };

  
export const currentActionReducer = (currentActionType='', action) =>{
    if(action.type===actionTypes.SET_CURRENT_ACTION_SUCCESS)
      return action.data;
    else return currentActionType
  }

export const currentTurnReducer = (currentTurn = -1, action ) =>{
    if(action.type===actionTypes.END_TURN_SUCCESS)
        return action.data.currentTurn;
    else return currentTurn;
}

export const gamePhaseReducer = (phase = '', action ) =>{
    if(action.type===actionTypes.END_TURN_SUCCESS)
        return action.data.gamePhase;
    else return phase;
}