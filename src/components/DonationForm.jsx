import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './style.css';
import Navbar from '../navbar/navbar';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState('');

  const fetchData = async (type) => {
    try {
      let response;
      if (type === 'donors') {
        response = await axios.get('http://localhost:5000/api/users?role=donor');
      } else if (type === 'centers') {
        response = await axios.get('http://localhost:5000/api/users?role=center');
      } else if (type === 'donations') {
        response = await axios.get('http://localhost:5000/api/donations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      setData(response.data);
      setDataType(type);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  };

  const renderData = () => {
    if (dataType === 'donors') {
      return (
        <div className="dashboard-box">
          <h2>Donors</h2>
          <ul>
            {data.map(donor => (
              <li key={donor._id}>
                <h4>Name:</h4>{donor.name}, <h4>Email:</h4>{donor.email},
                <h4>Address:</h4>{donor.address}, <h4>Phone:</h4>{donor.phone}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (dataType === 'centers') {
      return (
        <div className="dashboard-box">
          <h2>Centers</h2>
          <ul>
            {data.map(center => (
              <li key={center._id}>
                <h4>Name:</h4>{center.name}, <h4>Email:</h4>{center.email},
                <h4>Address:</h4>{center.address}, <h4>Phone:</h4>{center.phone}
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (dataType === 'donations') {
      return (
        <div className="dashboard-box">
          <h2>Donations</h2>
          <ul>
            {data.map(donation => (
              <li key={donation._id}>
                Donor: {donation.user ? donation.user.name : 'Unknown'},
                Center: {donation.center ? donation.center.name : 'Unknown'},
                Material: {donation.material},
                Quantity: {donation.quantity},
                Date: {new Date(donation.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='main-dashboard'>
      <Navbar />
      <div className='dashboard-content'>
        <h1>Welcome to the Admin Dashboard</h1>
        <button onClick={() => fetchData('donors')}>Donors</button>
        <button onClick={() => fetchData('centers')}>Centers</button>
        <button onClick={() => fetchData('donations')}>Donations</button>
        <button onClick={logout}>Logout</button>

        {/* Render fetched data */}
        {renderData()}
      </div>
    </div>
  );
};

export default AdminDashboard;
