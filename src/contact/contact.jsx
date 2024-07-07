import React from "react";
import "./contact.css";
import { Link } from "react-router-dom";
import About from "../about/about";
import Navbar from "../navbar/navbar";
// import SignUpForm from "../login/signup";

function Contact() {
  return (
    <div className="contact1">
     <Navbar/>

      <div class="landing_page">
    <div class="responsive-container-block big-container">
      <div class="responsive-container-block container">
        <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12 left-one">
          <div class="content-box">
            <h1 class="text-blk-section-head">Contact us</h1>
            <p class="text-blk section-subhead">We are here for you always. Call us, email us, or visit us for all your queries and suggestions. Alternatively, you can send us a message by filling the adjacent form, and we will get in touch with you asap. <h3>End Poverty</h3></p>
            <ul className="u-list-reset">
              <li className="p-icon p-icon--tel">
                <a href="tel:0124-4101200">0124-4101200</a> 
                <a href="tel:0124-4101239">0124-4101239</a>
              </li>
              <li className="p-icon p-icon--mail">
                <a href="mailto:contact@endpovertyindia.org">contact@endpovertyindia.org</a>
              </li>
            </ul>
            <h1 class="text-blk section-head">Visit us</h1>
            <p class="text-blk section-subhead">Plot No. 64, Institutional Area, Sector - 18, Sarhaul, Gurugram, Haryana - 122015</p>
            
            <div class="icons-container">
              <a class="share-icon">
                <img class="img" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png"></img>
              </a>
              <a class="share-icon">
                <img class="img" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png"></img>
              </a>
              <a class="share-icon">
                <img class="img" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-google.png"></img>
              </a>
              <a class="share-icon">
                <img class="img" src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png"></img>
              </a>
            </div>
          </div>
        </div>
        <div class="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6 right-one" id="i1zj">
          <form class="form-box" action="https://endpoverty.org.in/wp-content/themes/endpoverty/script-contact-form-send.php" method="post">
            <div class="container-block form-wrapper">
              <p class="text-blk contactus-head">
                <a class="link" href="">
                </a>
                Share your thoughts and leave us a message
              </p>
              
              <div class="responsive-container-block">
                <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i10mt-7">
                  <input class="input" id="ijowk-7" name="FirstName" placeholder="First Name" data-error-text="First name Error"></input>
                </div>
                <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i1ro7">
                  <input class="input" id="indfi-5" name="Last Name" placeholder="Last Name"></input>
                </div>
                <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-6 wk-ipadp-6 emial" id="ityct">
                  <input class="input" id="ipmgh-7" name="Email" placeholder="Email"></input>
                </div>
                <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                  <input class="input" id="imgis-6" name="PhoneNumber" placeholder="Phone Number"></input>
                </div>
                <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-7">
                  <textarea placeholder="Type message here" aria-placeholder="Type message here" class="textinput" id="i5vyy-7" ></textarea>
                </div>
              </div>
              <button class="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</div>

    </div>
  );
}

export default Contact;