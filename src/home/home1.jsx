import React from "react";
import "./home1.css";
import Navbar from "../navbar/navbar";
import home1 from "./home1.png";
import Programs from "./home2";
function Homepage() {
  function hover() {
    // Add your hover logic here
  }

  function out() {
    // Add your out logic here
  }

  return (
    <div className="main-content">
      <Navbar/>
      <div className="home1-container">
        <div className="home1-description" style={{marginTop:'100px',marginLeft:'20px'}}>
           <h1>This website provides resources, information, and advocacy to address and reduce poverty globally.</h1>
           <button
          class="btn btn-secondary dropdown-toggle"
          type="button" style={{marginTop:'10px',borderRadius:'25px',background:'blue'}}
        >
          Donate
        </button>
        </div>
        <div className="home1-image">
          <img src={home1} style={{height:'400px',width:'500px',borderRadius:'50px',marginRight:'30px'}}/>
        </div>
      </div>
      <Programs />
    </div>
  );
}

export default Homepage;
