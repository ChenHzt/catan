import { combineReducers } from "redux";
// import {userGamesReducer} from './userReducers'
import {errorReducer} from './errorReducer'
import  {gameDimsReducer} from './gameDimsReducer'
import  {gameDataReducer,validActionsReducer,currentActionReducer,currentTurnReducer,gamePhaseReducer,diceReducer} from './gameActionsReducers'
import * as actionTypes from '../actions/actionTypes'



// export const validPlacesForSettelmentsReducer = (locations = [], action) => {
//   if (action.type === "SETTELMENT_LOCATIONS") return action.payload;
//   return locations;
// };



export default combineReducers({
  game: gameDataReducer,
  // boardDims: gameBoardDimsReducer,
  // games: userGamesReducer,
  gameDims: gameDimsReducer,
  validActions: validActionsReducer,
  currentTurn: currentTurnReducer,
  dice: diceReducer,
  gamePhase: gamePhaseReducer,
  // locations: validPlacesForSettelmentsReducer,
  error:errorReducer,
  currentAction:currentActionReducer
});
