import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEdit, faSave, faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import './style1.css';

const CenterProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    } else {
      if (user.role === 'center') {
        fetchCenterDonations(user.id);
      } else {
        fetchUserDonations();
      }
      setFormData({ name: user.name, email: user.email, phone: user.phone });
    }
  }, [user, navigate]);

  const fetchUserDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await axios.put(`http://localhost:5000/api/users/${user.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  if (!user) return null;

  return (
    <div className='main-signup'>
      <Navbar />
      <h1>Center Profile</h1>
      {isEditing ? (
        <div>
          <label>
            Name:
            <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type='email' name='email' value={formData.email} onChange={handleInputChange} />
          </label>
          <label>
            Phone:
            <input type='text' name='phone' value={formData.phone} onChange={handleInputChange} />
          </label>
          <button className='btn btn-save' onClick={handleSaveClick}>
            <FontAwesomeIcon icon={faSave} /> Save
          </button>
        </div>
      ) : (
        <div>
          <p><FontAwesomeIcon icon={faUser}/>Name: {user.name}</p>
          <p><FontAwesomeIcon icon={faEnvelope}/>Email: {user.email}</p>
          <p><FontAwesomeIcon icon={faPhone}/>Phone: {user.phone}</p>
          <p>User Type: {user.role}</p>
          <button className='btn btn-edit' onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </button>
        </div>
      )}
      
      <h2>Donations</h2>
      <ul>
        {donations.length > 0 ? (
          donations.map((donation) => (
            <li key={donation._id}>
              <p>Material: {donation.material}</p>
              <p>Quantity: {donation.quantity}</p>
              <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
              <p>Donor: {donation.user ? donation.user.name : 'Unknown Donor'}</p>
            </li>
          ))
        ) : (
          <p>No donations found for this center.</p>
        )}
      </ul>

      <button className='btn btn-logout' onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </div>
  );
};

export default CenterProfile;
