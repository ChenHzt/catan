import api from '../../api/api'
// import api from 'axios';
import userService from '../../services/user.service';
import {calcTileCenterByLocationMap} from '../../helper'
export const setBoardGameDims = dims => {
    // Return an action
    return {
      type: 'BOARD_GAME_DIMS',
      payload: dims
    };
  };

  export const createNewGame = (players) => async dispatch => {
    const response = await api.post(`/games`,players);
    dispatch({ type: `CREATE_NEW_GAME`, payload: response.data });
  };
  
  export const getGameData = (gameid) => async dispatch => {
    try{
      const response = await userService.getGameData(gameid);
      console.log(response.data);
      dispatch({ type: `GAME_DATA`, payload: response.data });

    }
    catch (e){
      console.log(e.message);
    }
  };
  
  export const setGamesDimentions = (width, height) => {
    console.log(width,height);
    const tileRadius = width/12;
    const centerLine = width/2;
    const topRowX = height/2 -3*tileRadius;
    return {
      type:'GAME_DIMENTIONS',
      payload:{width,height,tileRadius,centerLine,topRowX}
    }
  }