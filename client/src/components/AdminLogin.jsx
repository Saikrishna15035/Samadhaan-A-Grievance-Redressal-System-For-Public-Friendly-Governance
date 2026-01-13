import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import adminIllustration from "../images/login.gif"; // optional: reuse login.gif

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const getAccess = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // if server doesn't return JSON on non-200, guard parse:
      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.status === 200 && data && data.role === "admin") {
        window.alert("Admin Login Successful!");
        history.push("/aAbBcC"); // Admin dashboard route
      } else if (res.status === 200 && data && data.role === "user") {
        window.alert("This login is for users, not admins.");
      } else {
        window.alert(data?.error || "You don't have this access");
      }
    } catch (err) {
      console.error(err);
      window.alert("Server error");
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-left">
          <img src={adminIllustration} alt="Admin login illustration" />
        </div>

        <div className="login-right">
          <div className="login-card">
            <h2 className="login-title">Admin Login</h2>
            <p className="subtitle">Authorized personnel only</p>

            <form className="login-form" onSubmit={getAccess} noValidate>
              <div className="input-group">
                <label htmlFor="admin-email">Email ID</label>
                <input
                  id="admin-email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Visible, styled button */}
              <div className="input-group mt-3">
                <button type="submit" className="login-btn admin-btn">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
