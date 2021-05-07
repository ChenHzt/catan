import api from '../../api/api'
import userService from '../../services/user.service';

export const setCurrentUser = user => {
    return {
      type: 'CURRENT_USER',
      payload: user
    };
  };

export const getUserGames = () => async dispatch => {
  const response = await userService.getUserData()
  console.log(response);
  dispatch({ type: 'USER_GAMES', payload: response.data });
};