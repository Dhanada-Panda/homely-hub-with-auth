import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Profile from './components/Profile';
import CenterProfile from './components/CenterProfile';
import Homepage from './home/home1';
import About from './about/about';
import Contact from './contact/contact';
import UseType from './usertype/usertype';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/about/about" element={<About/>}/>
      <Route path="/usertype/usertype" element={<UseType/>}/>
      <Route path="/contact/contact" element={<Contact/>}/>
      <Route path="/components/Signup" element={<Signup />} />
      <Route path="/components/Signin" element={<Signin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/centers/:Id" element={<CenterProfile />} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
