import axios from 'axios';
import authHeader from './auth-header';
import api from '../api/api'
// const API_URL = 'http://localhost:8080/api/test/';

class UserService {

  async getUserData() {
    return await api.get('/users/me', { headers: authHeader() });
  }
  
  async getGameData(gameId) {
    return await api.get(`/games/${gameId}`, { headers: authHeader() });
  }

  async getValidActionsForCurrentPlayer(gameId) {
    return await api.get(`/games/${gameId}/getValidActions`, { headers: authHeader() });
  }

  async getValidPlacesToBuildSettelments(gameId) {
    return await api.get(`/games/${gameId}/getValidPlacesForSettelment`, { headers: authHeader() });
  }

  async getValidPlacesToBuildRoad(gameId) {
    return await api.get(`/games/${gameId}/getValidPlacesForRoad`, { headers: authHeader() });
  }

  async getValidPlacesToBuildCity(gameId) {
    return await api.get(`/games/${gameId}/getValidPlacesForCity`, { headers: authHeader() });
  }

  builtSettelment(gameId,location) {
    return api.post(`/games/${gameId}/buildSettelment`,{location},{ headers: authHeader() })
  }
  
}

export default new UserService();