import * as actionTypes from '../actions/actionTypes'


// export const gameBoardDimsReducer = (dims = {}, action) => {
//     if (action.type === "GAME_BOARD_DIMS") {
//       return action.payload;
//     }
  
//     return dims;
//   };

  export const gameDimsReducer = (dims = {}, action) => {
    if (action.type === actionTypes.SET_BOARD_GAME_DIMS) 
        return action.data;
    return dims;
  };