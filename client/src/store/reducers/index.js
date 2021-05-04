import { combineReducers } from 'redux';

export const gameBoardDimsReducer = (dims = {}, action) => {
    if (action.type === 'GAME_BOARD_DIMS') {
      return action.payload;
    }
  
    return dims;
  };

 export const gameDataReducer = (game = {}, action) => {
    if (action.type === 'GAME_DATA') {
      return action.payload;
    }
  
    return game;
  };


  export default combineReducers({
    game: gameDataReducer,
    boardDims: gameBoardDimsReducer,
  });
  