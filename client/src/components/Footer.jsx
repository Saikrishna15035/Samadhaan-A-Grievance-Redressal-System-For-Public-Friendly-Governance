import React from 'react';
import '../styles/Footer.css'; // We will create this CSS file

// Add this to your index.html <head> for the social icons
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

const Footer = () => {
  return (
    <footer id="contact" className="app-footer">
      <div className="container">
        <div className="footer-content">
          
          <div className="footer-column">
            <h3>Samadhaan</h3>
            <p>Your unified portal for grievance redressal. Committed to a transparent and efficient platform.</p>
            <div className="social-links">
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/grievance">File a Grievance</a></li>
              <li><a href="/about">My Profile</a></li>
              <li><a href="#about-section">About Us</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Related Portals</h3>
            <ul>
              <li><a href="https://pgportal.gov.in/" target="_blank" rel="noopener noreferrer">CPGRAMS</a></li>
              <li><a href="https://www.mygov.in/" target="_blank" rel="noopener noreferrer">MyGov.in</a></li>
              <li><a href="https://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer">Digital India</a></li>
              <li><a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer">National Portal of India</a></li>
            </ul>
          </div>
          
        </div>
        <div className="footer-bottom">
          <p>© 2025 Samadhan Portal. All rights reserved.</p>
          <p className="disclaimer">Disclaimer: This is a grievance redressal portal. Do not share personal financial information.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;