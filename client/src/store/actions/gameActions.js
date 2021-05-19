import api from "../../api/api";
// import api from 'axios';
import userService from "../../services/user.service";
import { calcTileCenterByLocationMap } from "../../helper";
import * as actionTypes from './actionTypes'

const request = (type) =>{
  return {
    type,
    error: ''
  };
}

const success = (type,results) => {
  return {
    type,
    data: results,
    error: '',
  };
}

const error = (type,error)  => {
  return {
    type,
    data: null,
    error: error,
  };
}

export const createNewGame = (players) => async (dispatch) => {
  console.log(players)
  dispatch(request(actionTypes.CREATE_NEW_GAME_REQUEST))
  userService
    .createNewGame(players)
    .then((res) =>{
      try{
        dispatch(success(actionTypes.CREATE_NEW_GAME_SUCCESS,res.data))
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch(error(actionTypes.CREATE_NEW_GAME_ERROR,err.response.data.error)));
};

export const getGameData = (gameid) => async (dispatch) => {

  dispatch(request(actionTypes.GET_GAME_DATA_REQUEST))

  userService.getGameData(gameid).then((res) => {
    try{
      dispatch(success(actionTypes.GET_GAME_DATA_SUCCESS,res.data))
    }
    catch(err) {
      console.log(err.message)
    }
  })
  .catch((err) => dispatch(error(actionTypes.GET_GAME_DATA_ERROR, err.response.data.error)));

};

export const setBoardGameDims = (width, height) =>  (dispatch) =>  {
  const tileRadius = height / 10;
  const centerLine = width / 2;
  const topRowX = height / 2 - 3 * tileRadius;

  const dims={tileRadius,centerLine,topRowX,width,height}
  dispatch(success(actionTypes.SET_BOARD_GAME_DIMS,dims))

};

export const getValidActions = (gameid) => async (dispatch) => {

  dispatch(request(actionTypes.GET_VALID_ACTIONS_REQUEST))

  userService.getValidActionsForCurrentPlayer(gameid).then((res) => {
    try{
      dispatch(success(actionTypes.GET_VALID_ACTIONS_SUCCESS,res.data))
    }
    catch(err) {
      console.log(err.message)
    }
  })
  .catch((err) => dispatch(error(actionTypes.GET_VALID_ACTIONS_ERROR, err.response.data.error)));

};

export const buildSettelment = (gameid, location) => async (dispatch) => {
 
    dispatch(request(actionTypes.GET_BUILD_SETTELMENT_REQUEST));

    userService
      .buildSettelment(gameid, location)
      .then((res) => {
        try {
        if (res.status === 200) dispatch(success( actionTypes.GET_BUILD_SETTELMENT_SUCCESS,res.data));
        }
        catch(e){ console.log(res,e)}
      })
      .catch((err) => dispatch(error( actionTypes.GET_BUILD_SETTELMENT_ERROR,err.response.data.error)));
};

export const buildCity = (gameid, location) => async (dispatch) => {
 
    dispatch(request(actionTypes.GET_BUILD_CITY_REQUEST));

    userService
      .buildCity(gameid, location)
      .then((res) => {
        try {
        if (res.status === 200) dispatch(success(actionTypes.GET_BUILD_CITY_SUCCESS,res.data));
        }
        catch(e){ console.log(res,e)}
      })
      .catch((err) => dispatch(error(actionTypes.GET_BUILD_CITY_ERROR,err.response.data.error)));

};

export const buildRoad = (gameid, location) => async (dispatch) => {
 
    dispatch(request(actionTypes.GET_BUILD_ROAD_REQUEST));

    userService
      .buildRoad(gameid, location)
      .then((res) => {
        console.log(res);
        try {
        if (res.status === 200) dispatch(success(actionTypes.GET_BUILD_ROAD_SUCCESS,res.data));
        }
        catch(e){ console.log(res,e)}
      })
      .catch((err) => dispatch(error(actionTypes.GET_BUILD_ROAD_ERROR,err.response.data.error)));

};

export const setCurrentAction = (gameid,actionType) => async dispatch =>{
  dispatch(request(actionTypes.SET_CURRENT_ACTION_REQUEST))
    userService
    .currentAction(gameid,actionType)
    .then((res) => {
      try{
        dispatch(success(actionTypes.SET_CURRENT_ACTION_SUCCESS,actionType))
      }
      catch(e) {
        console.log(res,e);
      }
    })
    .catch((err) => dispatch(error(actionTypes.SET_CURRENT_ACTION_ERROR, err.response.data.error)));



}

export const endTurn = (gameid) => async dispatch =>{
    dispatch(request(actionTypes.END_TURN_REQUEST))
  
    userService
    .endTurn(gameid)
    .then((res) => {
      try{
        dispatch(success(actionTypes.END_TURN_SUCCESS,res.data))
      }
      catch(e) {
        console.log(res,e);
      }
    })
    .catch((err) => dispatch(error(actionTypes.END_TURN_ERROR, err.response.data.error)));
}

export const distributeResources = (gameId,diceValue) => async dispatch =>{
  dispatch(request(actionTypes.DISTRIBUTE_RESOURCES_REQUEST))

  userService
    .distributeResources(gameId,diceValue)
    .then((res) =>{
      try{
        dispatch(success(actionTypes.DISTRIBUTE_RESOURCES_SUCCESS,res.data))
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch(error(actionTypes.DISTRIBUTE_RESOURCES_ERROR,err.response.data.error)));

}

export const rollDice = (gameId,diceValue) =>async dispatch =>{
  if(diceValue === 7){
  dispatch(request(actionTypes.SET_CURRENT_ACTION_REQUEST))
    
    userService
    .currentAction(gameId,'PLACE_ROBBER')
    .then((res) => {
      try{
        dispatch(success(actionTypes.SET_CURRENT_ACTION_SUCCESS,'PLACE_ROBBER'))
      }
      catch(e) {
        console.log(res,e);
      }
    })
    .catch((err) => dispatch(error(actionTypes.SET_CURRENT_ACTION_ERROR,err.response.data.error)));
  }
  dispatch(request(actionTypes.DISTRIBUTE_RESOURCES_REQUEST))

    userService
    .distributeResources(gameId,diceValue)
    .then((res) =>{
      try{
        dispatch(success(actionTypes.DISTRIBUTE_RESOURCES_SUCCESS,res.data))
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch(error(actionTypes.DISTRIBUTE_RESOURCES_ERROR,err.response.data.error)));

  
}

export const placeRobber = (gameId,hexId) => async dispatch =>{
  dispatch(request(actionTypes.PLACE_ROBBER_REQUEST))

  userService
    .placeRobber(gameId,hexId)
    .then((res) =>{
      try{
        dispatch(success(actionTypes.PLACE_ROBBER_SUCCESS,res.data))
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch(error(actionTypes.PLACE_ROBBER_ERROR,err.response.data.error)));

}

export const buyDevelopmentCard = (gameId) => async dispatch =>{
  dispatch(request(actionTypes.BUY_DEVELOPMENT_CARD_REQUEST))

  userService
    .buyDevelopmentCard(gameId)
    .then((res) =>{
      try{
        dispatch(success(actionTypes.BUY_DEVELOPMENT_CARD_SUCCESS,res.data))
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch(error(actionTypes.BUY_DEVELOPMENT_CARD_ERROR, err.response.data.error)));

}

export const activateKnight = (gameId,location) => async dispatch =>{
  dispatch(request(actionTypes.ACTIVATE_KNIGHT_CARD_REQUEST))
  userService
    .activateKnight(gameId,location)
    .then((res) =>{
      try{
        dispatch(success(actionTypes.ACTIVATE_KNIGHT_CARD_SUCCESS,res.data))
      }
      catch(err) {
        console.log(err.message)
      }
    })
    .catch((err) => dispatch(error(actionTypes.ACTIVATE_KNIGHT_CARD_ERROR, err.response.data.error)));
}
