import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    } else {
      fetchDonations();
      fetchCenters();
    }
  }, [user]);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/donations/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonations(response.data);
    } catch (error) {
      console.error('Failed to fetch donations', error);
    }
  };

  const fetchCenters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/centers');
      setCenters(response.data);
    } catch (error) {
      console.error('Failed to fetch centers', error);
    }
  };

  if (!user) return null;

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>User Type: {user.role}</p>
      {user.role === 'donor' && (
        <>
          <button>Donate</button>
          <h2>Donations</h2>
          <ul>
            {donations.map((donation) => (
              <li key={donation._id}>
                <p>Material: {donation.material}</p>
                <p>Date: {donation.date}</p>
                <p>Quantity: {donation.quantity}</p>
                <p>Center: {donation.centerName}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
