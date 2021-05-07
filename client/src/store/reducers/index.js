import { combineReducers } from 'redux';

export const gameBoardDimsReducer = (dims = {}, action) => {
    if (action.type === 'GAME_BOARD_DIMS') {
      return action.payload;
    }
  
    return dims;
  };

 export const gameDataReducer = (game = {}, action) => {
    if (action.type === 'GAME_DATA') {
      console.log(action.payload);
      return action.payload;
    }
  
    return game;
  };
 export const userGamesReducer = (games = [], action) => {
    if (action.type === 'USER_GAMES') {
      return action.payload;
    }
  
    return games;
  };

  export const gameDimsReducer = (dims={}, action) => {
    if(action.type === 'GAME_DIMENTIONS')
      return action.payload;
    return dims;
  }


  export default combineReducers({
    game: gameDataReducer,
    boardDims: gameBoardDimsReducer,
    games: userGamesReducer,
    gameDims: gameDimsReducer,
  });
  