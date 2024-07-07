import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './style.css';
import Navbar from '../navbar/navbar';
const Signup = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('donor');
  const { signup, error, loading } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, address, email, password, phone, role);
  };

  return (
    <div className='main-signup'>
      <Navbar/>
    <form onSubmit={handleSubmit} className='Signup-form'>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="donor">Donor</option>
        <option value="center">Center</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" disabled={loading}>Signup</button>
      {error && <p>{error}</p>}
    </form>
    </div>
  );
};

export default Signup;
