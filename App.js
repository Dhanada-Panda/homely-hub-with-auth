import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/profile" element={<Profile />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
