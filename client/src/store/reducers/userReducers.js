import * as actionTypes from '../actions/actionTypes'

export const userGamesReducer = (games = [], action) => {
    if (action.type === actionTypes.GET_USER_GAMES_SUCCESS) {
      return action.data;
    }
    return games;
  };