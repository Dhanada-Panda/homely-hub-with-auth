import React from 'react';
import Navbar from '../navbar/navbar';
import './usertype.css';

function UseType() {
  return (
    <div className='main-usertype'>
      <Navbar />
      <div className="user-type-container">
        <h1 className="user-type-heading">Select Your User Type</h1>
        <div className="card-container">
          <div className="user-card">
            <h2 className="user-card-title">Center</h2>
            <p className="user-card-description">
              If you are a center, you can categorize the products, find the appropriate places to donate, and ensure that the donations reach the needy people.
            </p>
            <p className="user-card-description">
              Manage your beneficiaries, track donations, and report your impact effectively.
            </p>
            <a href="/center-signup" className="user-card-link">Join as Center</a>
          </div>
          <div className="user-card">
            <h2 className="user-card-title">Donor</h2>
            <p className="user-card-description">
              As a donor, you can provide product details including quantity and images. View all available centers and choose one to make your donation.
            </p>
            <p className="user-card-description">
              Track the progress of your donations and receive detailed reports.
            </p>
            <a href="/donor-signup" className="user-card-link">Join as Donor</a>
          </div>
        </div>
      </div>
      <div className="extra-content">
        <h2>Additional Information</h2>
        <p>This section can contain more details, FAQs, testimonials, or any other content that you want to include on this page.</p>
      </div>
    </div>
  );
}

export default UseType;
