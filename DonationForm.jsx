import React, { useState } from 'react';

const DonationForm = ({ centers, onSubmit }) => {
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [centerId, setCenterId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ material, quantity, type, centerId });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <select
        value={centerId}
        onChange={(e) => setCenterId(e.target.value)}
        required
      >
        <option value="">Select Center</option>
        {centers.map((center) => (
          <option key={center._id} value={center._id}>
            {center.name}
          </option>
        ))}
      </select>
      <button type="submit">Submit Donation</button>
    </form>
  );
};

export default DonationForm;
