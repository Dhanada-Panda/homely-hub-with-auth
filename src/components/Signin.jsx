import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './style.css';
import Navbar from '../navbar/navbar';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading, user } = useContext(AuthContext); // Access user from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const success = await login(email, password);
      if (success) {
        if (user.role === 'donor') {
          navigate('/profile');
        } else if (user.role === 'center') {
          navigate(`/centers/${user.id || user._id}`);
        } else if (user.role === 'admin') { // Check if user is admin
          navigate('/Admin'); // Redirect to Admin page
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className='main-signup'>
      <Navbar/>
      <form onSubmit={handleSubmit} className='Signup-form'>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Signin
        </button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
