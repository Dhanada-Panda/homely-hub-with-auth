import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
      setUser(response.data.user); // Set user state with response data
      localStorage.setItem('token', response.data.token); // Store token in local storage
      setError('');

      // Redirect based on user role
      if (response.data.user.role === 'donor') {
        navigate('/profile');
      } else if (response.data.user.role === 'center') {
        navigate(`/centers/${response.data.user.id || response.data.user._id}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed'); // Set error message from API response
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, address, email, password, phone, role) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { name, address, email, password, phone, role });
      setError('');
      navigate('/signin'); // Redirect to signin page after successful signup
    } catch (error) {
      setError(error.response?.data?.error || 'Signup failed'); // Set error message from API response
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext };
