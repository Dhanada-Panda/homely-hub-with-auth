import axios from 'axios';

// Create an instance of axios with a default base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Function to set the authorization token
export const setAuthToken = (token) => {
  if (token) {
    // Apply token to every request if logged in
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete api.defaults.headers.common['Authorization'];
  }
};

// API requests for authentication
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/signin', { email, password });
  return response.data;
};

export const registerUser = async (name, address, email, password, phone, role) => {
  const response = await api.post('/auth/signup', { name, address, email, password, phone, role });
  return response.data;
};

// API requests for donations
export const fetchDonations = async () => {
  const response = await api.get('/donations');
  return response.data;
};

export const createDonation = async (donor, center, item, quantity) => {
  const response = await api.post('/donations', { donor, center, item, quantity });
  return response.data;
};

export default api;
