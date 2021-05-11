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

  buildSettelment(gameId,location) {
    return api.post(`/games/${gameId}/buildSettelment`,{location},{ headers: authHeader() })
  }

  buildCity(gameId,location) {
    return api.post(`/games/${gameId}/buildCity`,{location},{ headers: authHeader() })
  }

  buildRoad(gameId,location) {
    return api.post(`/games/${gameId}/buildRoad`,{location},{ headers: authHeader() })
  }

  currentAction(gameId,action) {
    return api.post(`/games/${gameId}/currentAction`,{action},{ headers: authHeader() })
  }

  endTurn(gameId) {
    return api.post(`/games/${gameId}/endTurn`,{},{ headers: authHeader() })
  }

  rollDice(gameId) {
    return api.post(`/games/${gameId}/endTurn`,{},{ headers: authHeader() })
  }

  distributeResources(gameId,dice) {
    return api.post(`/games/${gameId}/distributeResources`,{dice},{ headers: authHeader() })
  }

  placeRobber(gameId,hexId){
    return api.post(`/games/${gameId}/placeRobber`,{hexId},{ headers: authHeader() })
  }

  createNewGame(players){
    return api.post(`/games`,{players},{ headers: authHeader() })
  }

  buyDevelopmentCard(gameId){
    return api.post(`/games/${gameId}/buyDevelopmentCard`,{},{ headers: authHeader() })
  }
  
  activateKnight(gameId,location){
    return api.post(`/games/${gameId}/activateKnight`,{hexId:location},{ headers: authHeader() })
  }
  
  
  
}

export default new UserService();