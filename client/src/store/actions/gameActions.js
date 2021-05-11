import api from "../../api/api";
// import api from 'axios';
import userService from "../../services/user.service";
import { calcTileCenterByLocationMap } from "../../helper";
export const setBoardGameDims = (dims) => {
  // Return an action
  return {
    type: "BOARD_GAME_DIMS",
    payload: dims,
  };
};

export const createNewGame = (players) => async (dispatch) => {
  const response = await api.post(`/games`, players);
  dispatch({ type: `CREATE_NEW_GAME`, payload: response.data });
};

export const getGameData = (gameid) => async (dispatch) => {
  try {
    const response = await userService.getGameData(gameid);
    dispatch({ type: `GAME_DATA`, payload: response.data });
  } catch (e) {
    console.log(e.message);
  }
};

export const setGamesDimentions = (width, height) => {
  const tileRadius = height / 10;
  const centerLine = width / 2;
  const topRowX = height / 2 - 3 * tileRadius;
  return {
    type: "GAME_DIMENTIONS",
    payload: { width, height, tileRadius, centerLine, topRowX },
  };
};

export const startRoll = () => (dispatch) => {
  dispatch({
    type: SET_ROLLING,
    payload: null,
  });
};

export const getValidActions = (gameid) => async (dispatch) => {
  try {
    const response = await userService.getValidActionsForCurrentPlayer(gameid);
    console.log(response.data);
    dispatch({ type: `VALID_ACTIONS`, payload: response.data });
  } catch (e) {
    console.log(e.message);
  }
};

export const getPlacesForSettelment = (gameid) => async (dispatch) => {
  try {
    const response = await userService.getValidPlacesToBuildSettelments(gameid);
    dispatch({ type: `SETTELMENT_LOCATIONS`, payload: response.data });
  } catch (e) {
    console.log(e.message);
  }
};

// todoTypes.js
export const GET_BUILD_REQUEST = "GET_BUILD_SETTELMENT_REQUEST";
export const GET_BUILD_SUCCESS = "GET_BUILD_SETTELMENT_SUCCESS";
export const GET_BUILD_ERROR = "GET_BUILD_SETTELMENT_ERROR";

// todoActions.js
export function loadBuildRequest() {
  return {
    type: GET_BUILD_REQUEST,
    error: ''
  };
}

export function loadBuildSuccess(results) {
  return {
    type: GET_BUILD_SUCCESS,
    data: results,
    error: '',
  };
}

export function loadBuildError(error) {
  return {
    type: GET_BUILD_ERROR,
    data: null,
    error: error,
  };
}

export const buildSettelment = (gameid, location) => async (dispatch) => {
 
    dispatch(loadBuildRequest());
    let response;

    userService
      .buildSettelment(gameid, location)
      .then((res) => {
        try {
        if (res.status === 200) dispatch(loadBuildSuccess(res.data));
        }
        catch(e){ console.log(res,e)}
      })
      .catch((err) => dispatch(loadBuildError(err.response.data.error)));

};

// todoTypes.js
export const GET_BUILD_ROAD_REQUEST = "GET_BUILD_ROAD_REQUEST";
export const GET_BUILD_ROAD_SUCCESS = "GET_BUILD_ROAD_SUCCESS";
export const GET_BUILD_ROAD_ERROR = "GET_BUILD_ROAD_ERROR";

// todoActions.js
export function loadBuildRoadRequest() {
  return {
    type: GET_BUILD_ROAD_REQUEST,
    error: ''
  };
}

export function loadBuildRoadSuccess(results) {
  return {
    type: GET_BUILD_ROAD_SUCCESS,
    data: results,
    error: '',
  };
}

export function loadBuildRoadError(error) {
  return {
    type: GET_BUILD_ROAD_ERROR,
    data: null,
    error: error,
  };
}

export const buildRoad = (gameid, location) => async (dispatch) => {
 
    dispatch(loadBuildRoadRequest());

    userService
      .buildRoad(gameid, location)
      .then((res) => {
        try {
        if (res.status === 200) dispatch(loadBuildRoadSuccess(res.data));
        }
        catch(e){ console.log(res,e)}
      })
      .catch((err) => dispatch(loadBuildRoadError(err.response.data.error)));

};

export const setCurrentAction = (gameid,actionType) => async dispatch =>{
    userService
    .currentAction(gameid,actionType)
    .then((res) => {
      try{
        dispatch({type:'SET_CURRENT_ACTION',payload:actionType})
      }
      catch(e) {
        console.log(res,e);
      }
    })
    .catch((err) => dispatch({type:'ERROR', error:err.response.data.error}));


}
export const endTurn = (gameid) => async dispatch =>{
    userService
    .endTurn(gameid)
    .then((res) => {
      try{
        dispatch({type:'END_TURN',payload:res.data})
      }
      catch(e) {
        console.log(res,e);
      }
    })
    .catch((err) => dispatch({type:'ERROR', error:err.response.data.error}));
}


export const distributeResources = (gameId,diceValue) => async dispatch =>{

  userService
    .distributeResources(gameId,diceValue)
    .then((res) =>{
      try{
        dispatch({type:'DISTRIBUTE_RESOURCES',payload:res.data})
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch({type:'ERROR', error:err.response.data.error}));
}

export const rollDice = (gameId,diceValue) =>async dispatch =>{
  if(diceValue === 7){
    userService
    .currentAction(gameId,'PLACE_ROBBER')
    .then((res) => {
      try{
        dispatch({type:'SET_CURRENT_ACTION',payload:'PLACE_ROBBER'})
      }
      catch(e) {
        console.log(res,e);
      }
    })
    .catch((err) => dispatch({type:'ERROR', error:err.response.data.error}));
  }

    userService
    .distributeResources(gameId,diceValue)
    .then((res) =>{
      try{
        dispatch({type:'DISTRIBUTE_RESOURCES',payload:res.data})
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch({type:'ERROR', error:err.response.data.error}));
  
}

export const placeRobber = (gameId,hexId) => async dispatch =>{

  userService
    .placeRobber(gameId,hexId)
    .then((res) =>{
      try{
        dispatch({type:'PLACE_ROBBER',payload:res.data})
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch({type:'ERROR', error:err.response.data.error}));
}