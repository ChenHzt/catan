import api from '../../api/api'
// import api from 'axios';
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
      const response = await api.get(`/games/${gameid}`);
      dispatch({ type: `GAME_DATA`, payload: response.data });

    }
    catch (e){
      console.log(e.message);
    }
  };
  