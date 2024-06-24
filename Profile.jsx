import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [centers, setCenters] = useState([]);
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [donationSuccessMessage, setDonationSuccessMessage] = useState('');
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showCenters, setShowCenters] = useState(false);
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
      if (!token) throw new Error('No token found');
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
      const response = await axios.get('http://localhost:5000/api/users?role=center');
      setCenters(response.data);
    } catch (error) {
      console.error('Failed to fetch centers', error);
    }
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCenter) {
      alert('Please select a center before submitting.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      await axios.post('http://localhost:5000/api/donations', {
        material,
        quantity,
        centerId: selectedCenter._id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonationSuccessMessage('Donation successful!');
      setMaterial('');
      setQuantity('');
      setSelectedCenter(null);
      setShowDonationForm(false);
      setShowCenters(false);
      fetchDonations();
    } catch (error) {
      console.error('Failed to make donation', error);
    }
  };

  const handleCenterSelection = (center) => {
    setSelectedCenter(center);
    setShowCenters(false);
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
          <button onClick={() => setShowDonationForm(true)}>Donate</button>

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
                <button type="button" onClick={() => setShowCenters(true)}>
                  Show Centers
                </button>
                {showCenters && (
                  <ul>
                    {centers.map((center) => (
                      <li key={center._id}>
                        <p>Name: {center.name}</p>
                        <p>Location: {center.address}</p>
                        <button type="button" onClick={() => handleCenterSelection(center)}>
                          Select Center
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {selectedCenter && (
                  <div>
                    <p>Selected Center: {selectedCenter.name}</p>
                    <button type="submit">Submit Donation</button>
                  </div>
                )}
              </form>
            </>
          )}

          {donationSuccessMessage && <p>{donationSuccessMessage}</p>}

          {donations.length > 0 && (
            <>
              <h2>Donations</h2>
              <ul>
                {donations.map((donation) => (
                  <li key={donation._id}>
                    <p>Material: {donation.material}</p>
                    <p>Date: {new Date(donation.date).toLocaleDateString()}</p>
                    <p>Quantity: {donation.quantity}</p>
                    <p>Center: {donation.centerName}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
