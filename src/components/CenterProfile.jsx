import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CenterProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if user is not logged in
    } else {
      console.log('User object:', user); // Debug log
      if (user.role === 'center') {
        if (user._id) {
          fetchCenterDonations(user._id);
        } else {
          console.error('User ID is undefined');
        }
      } else {
        fetchUserDonations();
      }
    }
  }, [user, navigate]);

  const fetchUserDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in again.');
        navigate('/signin');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/donations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonations(response.data);
    } catch (error) {
      console.error('Failed to fetch donations', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  const fetchCenterDonations = async (centerId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in again.');
        navigate('/signin');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/donations/center/${centerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonations(response.data);
    } catch (error) {
      console.error('Failed to fetch center donations', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  if (!user) return null; // Render nothing if user is not logged in

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>User Type: {user.role}</p>

      <h2>Donations</h2>
      <ul>
        {donations.length > 0 ? (
          donations.map((donation) => (
            <li key={donation._id}>
              <p>Material: {donation.material}</p>
              <p>Quantity: {donation.quantity}</p>
              <p>Donor: {donation.user ? donation.user.name : 'Unknown Donor'}</p>
              <p>Center: {donation.center ? donation.center.name : 'Unknown Center'}</p>
            </li>
          ))
        ) : (
          <p>No donations found for this user.</p>
        )}
      </ul>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default CenterProfile;
