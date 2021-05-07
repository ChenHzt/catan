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

  
}

export default new UserService();