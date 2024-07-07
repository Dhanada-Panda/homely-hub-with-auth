import React from "react";
import "./about.css";
import "../home/home1.css";
import { Link } from "react-router-dom";
import Contact from "../contact/contact";
// import SignUp from "../login/signup";
import Programs from "../home/home2";
import Support from "../support/support";
import Navbar from "../navbar/navbar";
function About() {
  return (
    <div className="about-main">
      <Navbar/>
      <div class="responsive-container-block bigContainer">
        <div class="responsive-container-block Container">
          <h1 class="text-blk-heading">
            About Us
          </h1>
          <div className="about-1-container">
          <div class="text-blk-subHeading">
            End Poverty (EP) is a civil society organization, started in the
            year 2009, based in India that designs and delivers innovative
            solutions for the poor of India in partnership with national and
            international organizations.
          </div>
          <div class="text-blk-subHeading">
            EP’s approach is to enable and empower people for change and
            support them with identifying solutions and making informed
            choices. The programs are designed after meeting the targeted
            beneficiary groups, understanding their needs and aspirations,
            in-depth research, with scientific and strategic inputs from a
            team of experts and dedicated professionals.
          </div>
          </div>
          <Programs />
        </div>
        
          
      </div>
          
    </div>
  );
}

export default About;