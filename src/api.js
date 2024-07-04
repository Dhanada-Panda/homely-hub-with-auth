// src/api.js or wherever you define your Axios instance
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the URL as necessary
});

export default API;
