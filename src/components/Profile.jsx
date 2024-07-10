import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSignOutAlt, faDonate, faPen, faPhone, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [donationSuccessMessage, setDonationSuccessMessage] = useState('');
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showCenters, setShowCenters] = useState(false);
  const [centers, setCenters] = useState([]);
  const [donations, setDonations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if user is not logged in
    } else {
      if (user.role === 'donor') {
        fetchCenters(); // Fetch centers for donor
      }
      fetchDonations(); // Fetch donations for both roles
    }
  }, [user, navigate]);

  const fetchCenters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/centers');
      setCenters(response.data);
    } catch (error) {
      console.error('Failed to fetch centers', error);
    }
  };

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in again.');
        navigate('/Signin');
        return;
      }

      let url = 'http://localhost:5000/api/donations';
      if (user.role === 'center') {
        url = `http://localhost:5000/api/donations/center/${user.id || user._id}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Ensure donations are properly formatted with center information
      const formattedDonations = response.data.map(donation => ({
        ...donation,
        center: donation.center ? donation.center.name : 'Unknown Center'
      }));
      setDonations(formattedDonations);
    } catch (error) {
      console.error('Failed to fetch donations', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  const handleDonationSubmit = async (event) => {
    event.preventDefault();

    if (!material || !quantity || !selectedCenter || !(user.id || user._id)) {
      console.error('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in again.');
        navigate('/Signin');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/donations',
        {
          material,
          quantity,
          centerId: selectedCenter._id,
          userId: user.id || user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Donation successful:', response.data);
      setDonationSuccessMessage(`Donation to ${selectedCenter.name} was successful!`);
      fetchDonations(); // Refresh donations after successful submission
    } catch (error) {
      console.error('Failed to make donation', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  const handleCenterSelection = (center) => {
    console.log('Selected center:', center);
    setSelectedCenter(center);
  };

  const handleEditProfile = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in again.');
        navigate('/Signin');
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/users/${user.id || user._id}`,
        {
          name: editName,
          email: editEmail,
          phone: editPhone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Profile updated successfully:', response.data);
      alert('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  if (!user) return null; // Render nothing if user is not logged in

  return (
    <div className='main-signup'>
      <Navbar />
      <h1>Profile</h1>
      <p><FontAwesomeIcon icon={faUser} /> Name: {user.name}</p>
      <p><FontAwesomeIcon icon={faEnvelope} /> Email: {user.email}</p>
      <p><FontAwesomeIcon icon={faPhone} /> Phone: {user.phone}</p>
      <p>User Type: {user.role}</p>

      <button
        style={{ backgroundColor: 'lightgreen' }}
        onClick={() => setShowDonationForm(true)}
      >
        <FontAwesomeIcon icon={faDonate} /> Donate
      </button>

      <button
        style={{ backgroundColor: 'lightblue' }}
        onClick={() => setIsEditing(true)}
      >
        <FontAwesomeIcon icon={faEdit} /> Edit Profile
      </button>

      {showDonationForm && (
        <>
          <form onSubmit={handleDonationSubmit}>
            <input
              type="text"
              placeholder="Material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <button
              style={{ backgroundColor: 'lightcoral' }}
              type="button"
              onClick={() => setShowCenters(true)}
            >
              Show Centers
            </button>
            {showCenters && (
              <ul>
                {centers.map((center) => (
                  <li key={center._id}>
                    <p>Name: {center.name}</p>
                    <p>Location: {center.address}</p>
                    <button
                      style={{ backgroundColor: 'lightgoldenrodyellow' }}
                      type="button"
                      onClick={() => handleCenterSelection(center)}
                    >
                      Select Center
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {selectedCenter && (
              <div>
                <p>Selected Center: {selectedCenter.name}</p>
                <button
                  style={{ backgroundColor: 'lightseagreen' }}
                  type="submit"
                >
                  Submit Donation
                </button>
              </div>
            )}
          </form>
        </>
      )}

      {donationSuccessMessage && <p>{donationSuccessMessage}</p>}

      {isEditing && (
        <form onSubmit={handleEditProfile}>
          <input
            type="text"
            placeholder="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            required
          />
          <button
            style={{ backgroundColor: 'lightpink' }}
            type="submit"
          >
            Update Profile
          </button>
        </form>
      )}

      <h2>Donations</h2>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id}>
            <p>Material: {donation.material}</p>
            <p>Quantity: {donation.quantity}</p>
            <p>Center: {donation.center}</p>
          </li>
        ))}
      </ul>

      <button
        style={{ backgroundColor: 'lightgray' }}
        onClick={logout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </div>
  );
};

export default Profile;
