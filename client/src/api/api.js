
import axios from 'axios';

/** base url to make requests to the the movie database */
const instance = axios.create({
  baseURL: 'https://localhost:5000',
});

export default instance;