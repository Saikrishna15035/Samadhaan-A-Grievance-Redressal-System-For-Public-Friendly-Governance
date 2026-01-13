import React, { useContext, useState } from 'react';
import login from '../images/login.gif';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import '../styles/login.css';  // ✅ Make sure to create and link this file

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successful");
      history.push("/");
    }
  };

  return (
    <>
      <section className="login-section">
        <div className="login-container">
          {/* Left image */}
          <div className="login-left">
            <img src={login} alt="Login illustration" />
          </div>

          {/* Right form */}
          <div className="login-right">
            <center>
            <h2>Welcome</h2>
            <p className="subtitle">Login to continue filing grievances</p>
            </center>
            <form method="POST" className="login-form" onSubmit={loginUser}>
              
              <div className="input-group">
                <label>Email ID</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="login-btn">
                Log In
              </button>

              <div className="login-links">
                <NavLink to="/signup">Create an Account</NavLink>
                <span> | </span>
                <NavLink to="/AdminLogin">Login as Admin</NavLink>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;