import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Navbar.css';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="I2E E-Cell Logo" />
          <span className="logo-text">I<span className="highlight-2">2</span>E</span>
        </Link>
        <ul className="nav-links">
          {isLandingPage && (
            <>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#contact">Contact</a></li>
            </>
          )}
          <li><Link to="/problems">Problem Bank</Link></li>

          {currentUser ? (
            <>
              <li className="user-greeting">
                <Link to="/profile" className="profile-link">Hi, {currentUser.displayName?.split(' ')[0] || 'User'}</Link>
              </li>
              <li><button onClick={handleLogout} className="nav-btn-link">Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}

          <li><a href="#join-us" className="cta-btn">Join Us</a></li>
          <li><ThemeToggle /></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
