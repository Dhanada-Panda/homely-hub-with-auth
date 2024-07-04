import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if user is not logged in
    } else {
      fetchCenters(); // Fetch centers when user is logged in
      fetchDonations(); // Fetch donations when user is logged in
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
        navigate('/signin');
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
      setDonationSuccessMessage('Donation was successful!');
      fetchDonations(); // Refresh donations after successful submission
    } catch (error) {
      console.error('Failed to make donation', error);
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
                        <button type="button" onClick={() => setSelectedCenter(center)}>
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
        </>
      )}

      <h2>Donations</h2>
      <ul>
        {donations.map((donation) => (
          <li key={donation._id}>
            <p>Material: {donation.material}</p>
            <p>Quantity: {donation.quantity}</p>
            <p>Center: {donation.center ? donation.center.name : 'Unknown Center'}</p>
          </li>
        ))}
      </ul>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
