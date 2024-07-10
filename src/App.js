import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CenterProfile from './components/CenterProfile';
import Homepage from './home/home1';
import About from './about/about';
import Contact from './contact/contact';
import UseType from './usertype/usertype';
import AdminDashboard from './components/Admin';
import Signin from './components/Signin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/about/about" element={<About/>}/>
      <Route path="/usertype/usertype" element={<UseType/>}/>
      <Route path="/contact/contact" element={<Contact/>}/>
      <Route path="/components/Signup" element={<Signup />} />
      <Route path="/components/Signin" element={<Signin />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Admin" element={<AdminDashboard/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/centers/:Id" element={<CenterProfile />} />
      <Route path="/adminDashboard" element={<AdminDashboard/>}/>
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
