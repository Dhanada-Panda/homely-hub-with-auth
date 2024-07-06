import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get('http://localhost:5000/api/donations', config);
      const userDonations = response.data.filter(donation => donation.donor._id === user._id);
      setDonations(userDonations);
    };
    fetchDonations();
  }, [user]);

  const handleDonate = async () => {
    const item = prompt('Enter item:');
    const quantity = parseInt(prompt('Enter quantity:'), 10);
    const centerId = prompt('Enter center ID:');
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    await axios.post('http://localhost:5000/api/donations', { item, quantity, centerId }, config);
    window.location.reload();
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Role: {user.role}</p>
      {user.role === 'donor' && <button onClick={handleDonate}>Donate</button>}
      <h2>Donations</h2>
      {donations.length === 0 ? (
        <p>No donations made yet.</p>
      ) : (
        <ul>
          {donations.map((donation) => (
            <li key={donation._id}>
              {donation.item} - {donation.quantity} pcs on {new Date(donation.date).toLocaleDateString()} to {donation.center.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
