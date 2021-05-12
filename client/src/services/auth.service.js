// import axios from "axios";
import api from '../api/api'
// import api from '../api/api'

class AuthService {
  async login(email, password) {
    try{
      const response = await api.post("/users/login", {email,password})

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      
      return response.data;
    }
    catch(e){
      throw new Error(e.message);
    }

  }

  async logout() {
    await api.post('/users/logout',{
          headers:{
              Authentication:JSON.parse(localStorage.getItem("user")).token
          }
      })
    localStorage.removeItem("user");
  }

  async register(name,email, password) {
    const response = await api.post("/users", {
      email,
      name,
      password
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();