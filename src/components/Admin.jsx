import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faGift, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import Navbar from '../navbar/navbar';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [dataType, setDataType] = useState('');

  const fetchData = async (type) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      let response;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (type === 'donors') {
        response = await axios.get('http://localhost:5000/api/users?role=donor', config);
      } else if (type === 'centers') {
        response = await axios.get('http://localhost:5000/api/users?role=center', config);
      } else if (type === 'donations') {
        response = await axios.get('http://localhost:5000/api/donations', config);
      }

      console.log(`${type} data:`, response.data); // Debug log
      setData(response.data);
      setDataType(type);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(`http://localhost:5000/api/users/${id}`, config);

      console.log(`Deleted user: ${id}`, response.data); // Debug log
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const renderData = () => {
    if (dataType === 'donors' || dataType === 'centers') {
      return (
        <div className="dashboard-box">
          <h2>{dataType.charAt(0).toUpperCase() + dataType.slice(1)}</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (dataType === 'donations') {
      return (
        <div className="dashboard-box">
          <h2>Donations</h2>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Donor</th>
                <th>Center</th>
              </tr>
            </thead>
            <tbody>
              {data.map(donation => (
                <tr key={donation._id}>
                  <td>{donation.material}</td>
                  <td>{donation.quantity}</td>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                  <td>{donation.user ? donation.user.name : 'Unknown Donor'}</td>
                  <td>{donation.center ? donation.center.name : 'Unknown Center'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='main-signup'>
      <Navbar />
      <div className='dashboard-content'>
        <h1>Welcome to the Admin Dashboard</h1>
        <button onClick={() => fetchData('donors')}>
          <FontAwesomeIcon icon={faUser} /> Donors
        </button>
        <button onClick={() => fetchData('centers')}>
          <FontAwesomeIcon icon={faBuilding} /> Centers
        </button>
        <button onClick={() => fetchData('donations')}>
          <FontAwesomeIcon icon={faGift} /> Donations
        </button>
        <button onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>

        {renderData()}
      </div>
    </div>
  );
};

export default AdminDashboard;
