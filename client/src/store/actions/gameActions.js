import api from '../../api/'
export const setBoardGameDims = dims => {
    // Return an action
    return {
      type: 'BOARD_GAME_DIMS',
      payload: dims
    };
  };

  export const createNewGame = (players) => async dispatch => {
    const response = await api.post(`/api/games`,players);
    dispatch({ type: `CREATE_NEW_GAME`, payload: response.data });
  };
  
  export const getGameData = (gameid) => async dispatch => {
    const response = await api.get(`/api/games/${gameid}`,players);
    dispatch({ type: `CREATE_NEW_GAME`, payload: response.data });
  };
  