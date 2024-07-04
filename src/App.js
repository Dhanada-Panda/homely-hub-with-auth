import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';
import CenterProfile from './components/CenterProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/centers/:centerId" element={<CenterProfile />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
