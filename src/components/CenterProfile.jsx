import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CenterProfile = () => {
  const { centerId } = useParams();
  const [center, setCenter] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCenterData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/centers/${centerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCenter(response.data);
      } catch (error) {
        console.error('Failed to fetch center data', error);
      }
    };

    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/donations/center/${centerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDonations(response.data);
      } catch (error) {
        console.error('Failed to fetch donations', error);
      }
    };

    fetchCenterData();
    fetchDonations();
    setLoading(false);
  }, [centerId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {center && (
        <div>
          <h1>Profile</h1>
          <p><strong>Name:</strong> {center.name}</p>
          <p><strong>Email:</strong> {center.email}</p>
          <p><strong>Phone:</strong> {center.phone}</p>
          <p><strong>User Type:</strong> {center.userType}</p>
        </div>
      )}

      <h2>Details of received Donations</h2>
      {donations.length > 0 ? (
        <ul>
          {donations.map((donation) => (
            <li key={donation._id}>
              <p><strong>Donor:</strong> {donation.user ? donation.user.name : 'Unknown Donor'}</p>
              <p><strong>Email:</strong> {donation.user ? donation.user.email : 'No Email'}</p>
              <p><strong>Material:</strong> {donation.material}</p>
              <p><strong>Quantity:</strong> {donation.quantity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations found for this center.</p>
      )}

      <button onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/signin';
      }}>Logout</button>
    </div>
  );
};

export default CenterProfile;
