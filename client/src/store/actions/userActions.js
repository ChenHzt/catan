import api from '../../api/api'
import userService from '../../services/user.service';
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


export const setCurrentUser = user => {
    return {
      type: actionTypes.CURRENT_USER,
      payload: user
    };
  };

export const getUserGames = () => async dispatch => {

  dispatch(request(actionTypes.GET_USER_GAMES_REQUEST))
  
    userService
    .getUserData()
    .then((res) => {
      try{
        console.log(res);
        dispatch(success(actionTypes.GET_USER_GAMES_SUCCESS,res.data))
      }
      catch(e) {
        console.log(res,e);
      }
    })
    .catch((err) => dispatch(error(actionTypes.GET_USER_GAMES_ERROR, err.response.data.error)));
};

