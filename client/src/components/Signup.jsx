import React, { useState } from 'react';
import signpic from '../images/signup.gif'; 
import '../styles/signup.css';
// Import useHistory instead of useNavigate
import { NavLink, useHistory } from 'react-router-dom'; 

const Signup = () => {
  const history = useHistory(); // Use useHistory
  const [user, setUser] = useState({
    name: "", email: "", password: "", cpassword: "", phone: "", address: ""
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword, phone, address } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({ name, email, password, cpassword, phone, address })
    });

    const data = await res.json();
    if (data.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      window.alert("Registration Successful");
      history.push("/login"); // Use history.push
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        
        <div className="signup-left">
          <img src={signpic} alt="signup" />
        </div>

        <div className="signup-right">
          <center><h2 className="signup-title">Create Account</h2>
          <p className="subtitle">Join us to access your personalized dashboard</p>
          </center>

          <form className="signup-form" onSubmit={PostData}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" name="name" id="name" value={user.name} onChange={handleInputs} placeholder="Your name" required />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" id="email" value={user.email} onChange={handleInputs} placeholder="you@example.com" required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={user.password} onChange={handleInputs} placeholder="Enter password" required />
            </div>

            <div className="input-group">
              <label htmlFor="cpassword">Confirm Password</label>
              <input type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInputs} placeholder="Re-enter password" required />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" name="phone" id="phone" value={user.phone} onChange={handleInputs} placeholder="Your phone number" required />
            </div>

            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address" value={user.address} onChange={handleInputs} placeholder="Your address" required />
            </div>

            <button type="submit" className="signup-btn">Register</button>
          </form>

          <div className="signup-links">
            <NavLink to="/login">Already have an account? Log in</NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;