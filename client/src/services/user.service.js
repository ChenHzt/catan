import axios from 'axios';
import authHeader from './auth-header';
import api from '../API/api'
// const API_URL = 'http://localhost:8080/api/test/';

class UserService {
//   getPublicContent() {
//     return api.get('all');
//   }

  async getUserData() {
    return await api.get('/users/me', { headers: authHeader() });
  }

  
}

export default new UserService();