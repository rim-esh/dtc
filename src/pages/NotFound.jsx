// src/pages/NotFound.jsx
import React, { useState } from 'react'; // Removed useEffect
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { FiHome, FiSearch, FiMail, FiArrowRight, FiCompass } from 'react-icons/fi';
import { motion } from 'framer-motion';
import '../assets/styles/NotFound.css';

// Remove setShowHeaderFooter from props
const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Remove the useEffect that manipulated setShowHeaderFooter
  // useEffect(() => {
  //   if (setShowHeaderFooter) {
  //     setShowHeaderFooter(false);
  //   }
  //   return () => {
  //     if (setShowHeaderFooter) {
  //       setShowHeaderFooter(true);
  //     }
  //   };
  // }, [setShowHeaderFooter]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        // Use navigate for SPA-friendly routing
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }, 1500);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="not-found-container">
      <div className="space-background">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>

      <div className="not-found-content">
        <motion.div
          className="error-number"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          4
          <motion.span
            className="astronaut"
            initial={{ rotate: 0, y: 0 }}
            animate={{
              rotate: [0, 10, -10, 0],
              y: [0, -15, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="astronaut-helmet"></div>
            <div className="astronaut-body"></div>
          </motion.span>
          4
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Lost in Space?
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The page you're looking for seems to have drifted off into the cosmos.
          Don't worry, we can help you find your way back!
        </motion.p>

        <motion.div
          className="search-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search our galaxy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="search-button"
              disabled={isSearching}
            >
              {isSearching ? (
                <div className="spinner"></div>
              ) : (
                <><FiArrowRight /> Explore</>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          className="action-buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {/* Use Link components for internal navigation */}
          <Link to="/" className="action-button home-button">
            <FiHome className="button-icon" />
            Return to Earth (Home)
          </Link>
          <Link to="/contact" className="action-button contact-button">
            <FiMail className="button-icon" />
            Contact Mission Control
          </Link>
        </motion.div>

        <motion.div
          className="url-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="url-display">
            <FiCompass className="compass-icon" />
            <span className="url-text">{window.location.href}</span>
          </div>
          <button
            className="copy-button"
            onClick={copyUrl}
          >
            {isCopied ? 'Copied!' : 'Copy URL'}
          </button>
        </motion.div>

        <motion.div
          className="suggestions"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <h3>Popular Destinations:</h3>
          <div className="suggestion-links">
            {/* Use Link components for internal navigation */}
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/about">About Us</Link>
            <Link to="/admissions">Admissions</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </motion.div>
      </div>

      <div className="space-objects">
        <motion.div
          className="planet"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="planet-surface"></div>
          <div className="planet-ring"></div>
        </motion.div>

        <motion.div
          className="comet"
          initial={{ x: -100, y: -100, opacity: 0 }}
          animate={{ x: 300, y: 300, opacity: 1 }}
          transition={{ delay: 0.5, duration: 8, repeat: Infinity }}
        >
          <div className="comet-tail"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;