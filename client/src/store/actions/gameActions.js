import api from "../../api/api";
// import api from 'axios';
import userService from "../../services/user.service";
import { calcTileCenterByLocationMap } from "../../helper";
import * as actionTypes from './actionTypes'



export const createNewGame = (players) => async (dispatch) => {
  console.log(players)
  dispatch({type:actionTypes.CREATE_NEW_GAME_REQUEST,data:{game:res.data}})
  userService
    .createNewGame(players)
    .then((res) =>{
      try{
        dispatch({type:actionTypes.CREATE_NEW_GAME_SUCCESS,data:{game:res.data}})
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch({type:actionTypes.CREATE_NEW_GAME_ERROR, error:err.response.data.error}));
};

export const getGameData = (gameid) => async (dispatch) => {

  dispatch({type:actionTypes.GET_GAME_DATA_REQUEST,data:res.data})

  userService.getGameData(gameid).then((res) => {
    try{
      dispatch({type:actionTypes.GET_GAME_DATA_SUCCESS,data:res.data})
    }
    catch(err) {
      console.log(err.message)
    }
  })
  .catch((err) => dispatch({type:actionTypes.GET_GAME_DATA_ERROR, error:err.response.data.error}));

};

export const setBoardGameDims = (width, height) => {
  const tileRadius = height / 10;
  const centerLine = width / 2;
  const topRowX = height / 2 - 3 * tileRadius;

  const dims={tileRadius,centerLine,topRowX,width,height}

  return {
    type: actionTypes.SET_BOARD_GAME_DIMS,
    data: dims,
  };
};


// export const startRoll = () => (dispatch) => {
//   dispatch({
//     type: SET_ROLLING,
//     payload: null,
//   });
// };

export const getValidActions = (gameid) => async (dispatch) => {
  // try {
  //   const response = await userService.getValidActionsForCurrentPlayer(gameid);
  //   console.log(response.data);
  //   dispatch({ type: `VALID_ACTIONS`, payload: response.data });
  // } catch (e) {
  //   console.log(e.message);
  // }
  dispatch({type:actionTypes.GET_VALID_ACTIONS_REQUEST,data:res.data})

  userService.getValidActionsForCurrentPlayer(gameid).then((res) => {
    try{
      dispatch({type:actionTypes.GET_VALID_ACTIONS_SUCCESS,data:res.data})
    }
    catch(err) {
      console.log(err.message)
    }
  })
  .catch((err) => dispatch({type:actionTypes.GET_VALID_ACTIONS_ERROR, error:err.response.data.error}));

};

// export const getPlacesForSettelment = (gameid) => async (dispatch) => {
//   try {
//     const response = await userService.getValidPlacesToBuildSettelments(gameid);
//     dispatch({ type: `SETTELMENT_LOCATIONS`, payload: response.data });
//   } catch (e) {
//     console.log(e.message);
//   }
// };


export function loadBuildSettelmentRequest() {
  return {
    type: actionTypes.GET_BUILD_SETTELMENT_REQUEST,
    error: ''
  };
}

export function loadBuildSettelmentSuccess(results) {
  return {
    type: GET_BUILD_SETTELMENT_SUCCESS,
    data: results,
    error: '',
  };
}

export function loadBuildSettelmentError(error) {
  return {
    type: GET_BUILD_SETTELMENT_ERROR,
    data: null,
    error: error,
  };
}

export const buildSettelment = (gameid, location) => async (dispatch) => {
 
    dispatch(loadBuildSettelmentRequest());

    userService
      .buildSettelment(gameid, location)
      .then((res) => {
        try {
        if (res.status === 200) dispatch(loadBuildSettelmentSuccess(res.data));
        }
        catch(e){ console.log(res,e)}
      })
      .catch((err) => dispatch(loadBuildSettelmentError(err.response.data.error)));
};

export function loadBuildCityRequest() {
  return {
    type: actionTypes.GET_BUILD_CITY_REQUEST,
    error: ''
  };
}

export function loadBuildCitySuccess(results) {
  return {
    type: actionTypes.GET_BUILD_CITY_SUCCESS,
    data: results,
    error: '',
  };
}

export function loadBuildCityError(error) {
  return {
    type: actionTypes.GET_BUILD_CITY_ERROR,
    data: null,
    error: error,
  };
}

export const buildCity = (gameid, location) => async (dispatch) => {
 
    dispatch(loadBuildCityRequest());

    userService
      .buildCity(gameid, location)
      .then((res) => {
        try {
        if (res.status === 200) dispatch(loadBuildCitySuccess(res.data));
        }
        catch(e){ console.log(res,e)}
      })
      .catch((err) => dispatch(loadBuildCityError(err.response.data.error)));

};

export function loadBuildRoadRequest() {
  return {
    type: actionTypes.GET_BUILD_ROAD_REQUEST,
    error: ''
  };
}

export function loadBuildRoadSuccess(results) {
  return {
    type: actionTypes.GET_BUILD_ROAD_SUCCESS,
    data: results,
    error: '',
  };
}

export function loadBuildRoadError(error) {
  return {
    type: actionTypes.GET_BUILD_ROAD_ERROR,
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
  dispatch({type:actionTypes.SET_CURRENT_ACTION_REQUEST,payload:actionType})
    userService
    .currentAction(gameid,actionType)
    .then((res) => {
      try{
        dispatch({type:actionTypes.SET_CURRENT_ACTION_SUCCESS,payload:actionType})
      }
      catch(e) {
        console.log(res,e);
      }
    })
    .catch((err) => dispatch({type:actionTypes.SET_CURRENT_ACTION_ERROR, error:err.response.data.error}));



}
export const endTurn = (gameid) => async dispatch =>{
    dispatch({type:actionTypes.END_TURN_REQUEST,payload:actionType})
  
    userService
    .endTurn(gameid)
    .then((res) => {
      try{
        dispatch({type:actionTypes.END_TURN_SUCCESS,payload:res.data})
      }
      catch(e) {
        console.log(res,e);
      }
    })
    .catch((err) => dispatch({type:actionTypes.END_TURN_ERROR, error:err.response.data.error}));
}


export const distributeResources = (gameId,diceValue) => async dispatch =>{
  dispatch({type:actionTypes.DISTRIBUTE_RESOURCES_REQUEST,payload:actionType})

  userService
    .distributeResources(gameId,diceValue)
    .then((res) =>{
      try{
        dispatch({type:actionTypes.DISTRIBUTE_RESOURCES_SUCCESS,payload:res.data})
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch({type:actionTypes.DISTRIBUTE_RESOURCES_ERROR, error:err.response.data.error}));

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
  dispatch({type:actionTypes.PLACE_ROBBER_REQUEST,payload:actionType})

  userService
    .placeRobber(gameId,hexId)
    .then((res) =>{
      try{
        dispatch({type:actionTypes.PLACE_ROBBER_SUCCESS,payload:res.data})
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch({type:actionTypes.PLACE_ROBBER_ERROR, error:err.response.data.error}));

}

export const buyDevelopmentCard = (gameId) => async dispatch =>{
  dispatch({type:actionTypes.BUY_DEVELOPMENT_CARD_REQUEST,payload:actionType})

  userService
    .buyDevelopmentCard(gameId)
    .then((res) =>{
      try{
        dispatch({type:actionTypes.BUY_DEVELOPMENT_CARD_SUCCESS,payload:res.data})
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch({type:actionTypes.BUY_DEVELOPMENT_CARD_ERROR, error:err.response.data.error}));

}

export const activateKnight = (gameId,location) => async dispatch =>{
  dispatch({type:actionTypes.ACTIVATE_KNIGHT_CARD_REQUEST,payload:actionType})
  userService
    .activateKnight(gameId,location)
    .then((res) =>{
      try{
        dispatch({type:actionTypes.ACTIVATE_KNIGHT_CARD_SUCCESS,payload:res.data})
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch({type:actionTypes.ACTIVATE_KNIGHT_CARD_ERROR, error:err.response.data.error}));
}
