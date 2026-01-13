import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';
import '../styles/Header.css'; // Make sure this path is correct

const Header = () => { 
  const { state } = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false); // State for mobile menu

  const closeMenu = () => setIsNavOpen(false);

  const RenderMenu = () => {
    // This is your logic, unchanged
    if (state) {
      return (
        <>
          <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/grievance" onClick={closeMenu}>Grievance</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>My Profile</NavLink></li>
          <li><NavLink to="/logout" onClick={closeMenu}>Logout</NavLink></li>
        </>
      )
    } else {
      return (
        <>
          <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/grievance" onClick={closeMenu}>Grievance</NavLink></li>
          <li><NavLink to="/login" onClick={closeMenu}>Login</NavLink></li>
          <li><NavLink to="/signup" onClick={closeMenu}>Signup</NavLink></li>
        </>
      )
    }
  }

  return (
    <header className="app-header">
      <div className="header-container">
        
        {/* --- MODIFIED LOGO SECTION --- */}
        {/* Using spans gives us much better styling control */}
        <NavLink className="logo-link" to="/">
          <span className="logo-title">Samadhaan</span>
          <span className="logo-subtitle">A Grievance Redressal Portal</span>
        </NavLink>
        {/* --- END OF MODIFIED SECTION --- */}

        <button 
          className="nav-toggle" 
          aria-label="toggle navigation"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span className={`hamburger ${isNavOpen ? 'active' : ''}`}></span>
        </button>

        <nav className={`nav-links ${isNavOpen ? 'active' : ''}`}>
          <ul>
            <RenderMenu />
          </ul>
        </nav>
      </div>
    </header>
  )
};

export default Header;