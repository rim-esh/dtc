// components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome, FiInfo, FiBookOpen, FiUsers,
  FiCalendar, FiMail, FiPhone, FiMenu, FiX,
  FiBook, FiMessageCircle, FiCheck, FiUser
} from 'react-icons/fi';
import '../assets/styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu open/close
  const [isSticky, setIsSticky] = useState(false); // State for sticky header
  const [activeDropdown, setActiveDropdown] = useState(null); // State for which mobile dropdown is open
  const [scrolled, setScrolled] = useState(false); // State for if page is scrolled
  const location = useLocation(); // Get current location for active link styling

  // Ref for the header to detect clicks outside dropdowns (primarily for mobile now)
  const headerRef = useRef(null);

  // Handle scroll for sticky header and top bar hiding
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100); // Header becomes sticky after 100px scroll
      setScrolled(window.scrollY > 20); // Top bar hides after 20px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to close mobile dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is not inside the header, and a mobile dropdown is open, close it
      if (headerRef.current && !headerRef.current.contains(event.target) && isOpen) {
        setActiveDropdown(null);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown, isOpen]); // Re-run if activeDropdown or isOpen changes

  // Navigation items with dropdowns (dropdown property now only affects mobile)
  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    {
      name: 'About',
      path: '/about',
      icon: <FiInfo />,
      dropdown: [ // These dropdown items will ONLY be used for the mobile menu
        { name: 'Our History', path: '/about' },
        { name: 'Vision & Mission', path: '/about' },
        { name: 'Infrastructure', path: '/about' },
        { name: 'Administration', path: '/about' },
      ]
    },
    {
      name: 'Courses',
      path: '/courses',
      icon: <FiBookOpen />,
      dropdown: [ // These dropdown items will ONLY be used for the mobile menu
        { name: 'Computer & Office', path: '/courses' },
        { name: 'IELTS Preparation', path: '/courses' },
        { name: 'Japanese Language', path: '/courses' },
        { name: 'Accounting (Tally)', path: '/courses' },
        { name: 'View All Courses', path: '/courses' },
      ]
    },
    { name: 'Faculty', path: '/faculty', icon: <FiUsers /> },
    { name: 'Events', path: '/events', icon: <FiCalendar /> },
    { name: 'Blog', path: '/blog', icon: <FiBook /> },
    { name: 'Contact', path: '/contact', icon: <FiMail /> },
  ];

  // Contact information for top bar and mobile menu
  const contactInfo = {
    phone: '+977 9857080873',
    email: 'info@dreamtech.edu.np',
    whatsapp: '+977 9857080872'
  };

  // Toggle mobile menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Control body overflow to prevent scrolling when mobile menu is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    document.body.classList.toggle('mobile-menu-open', !isOpen);
    if (isOpen) setActiveDropdown(null); // Close any open mobile dropdowns when closing the main mobile menu
  };

  // Handle click for desktop navigation items (now all are direct links)
  const handleDesktopNavItemClick = () => {
    setActiveDropdown(null); // Just ensure any lingering dropdown state is cleared (though none will be shown on desktop)
  };

  // Toggle dropdown for mobile navigation (on click)
  const toggleMobileDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index); // Toggle dropdown visibility
  };

  // Function to determine if a link is active based on current URL
  const isActive = (path, dropdownItems) => {
    // If the current path exactly matches the link's path, it's active
    if (location.pathname === path) {
      return true;
    }
    // If it has dropdown items (for mobile), check if any dropdown item's path starts with the current path
    // This makes parent links active when a child page is visited
    if (dropdownItems) {
      return dropdownItems.some(item => location.pathname.startsWith(item.path));
    }
    return false;
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className={`top-contact-bar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="top-contact-inner">
            <div className="contact-info">
              <a href={`tel:${contactInfo.phone}`} className="contact-item">
                <FiPhone className="icon" /> {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="contact-item">
                <FiMail className="icon" /> {contactInfo.email}
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                className="contact-item whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiMessageCircle className="icon" /> WhatsApp
              </a>
            </div>

            <div className="top-buttons">
              <Link to="/verify" className="top-btn verify-btn">
                <FiCheck className="icon" /> Verify Certificate
              </Link>
              <Link to="/admission" className="top-btn admission-btn">
                <FiUser className="icon" /> Admission
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`header ${isSticky ? 'sticky' : ''} ${scrolled ? 'scrolled' : ''}`} ref={headerRef}>
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <div className="logo-container">
              <Link to="/" className="logo">
                <div className="logo-icon">
                  <div className="logo-circle primary"></div>
                  <div className="logo-circle warning"></div>
                  <div className="logo-circle info"></div>
                </div>
                <div className="logo-text">
                  <h1>Dream</h1>
                  <p>Technical College</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <ul className="nav-list">
                {navItems.map((item, index) => (
                  <li
                    className={`nav-item${item.dropdown ? ' has-dropdown' : ''}`} // Keep 'has-dropdown' for potential styling if needed, but 'open' class won't be added by desktop logic
                    key={index}
                  >
                    {/* All desktop navigation items are now direct links */}
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive(item.path, item.dropdown) ? 'active-nav-link' : ''}`}
                      onClick={() => handleDesktopNavItemClick()} // Call handler to ensure no activeDropdown state remains
                    >
                      <span className="nav-text">{item.name}</span>
                    </Link>

                    {/* The dropdown-menu div still exists in HTML but CSS should hide it by default for desktop without 'open' */}
                    {item.dropdown && (
                       // This div exists in HTML but CSS for desktop will keep it hidden
                       // as activeDropdown will not be set for desktop.
                      <div className="dropdown-menu">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className={`dropdown-item ${location.pathname === subItem.path ? 'active-nav-link' : ''}`}
                            onClick={() => setActiveDropdown(null)} // Close mobile dropdown if relevant, though not visible here
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`mobile-toggle ${isOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>

            {/* Desktop Action Button */}
            <div className="header-action">
              <Link to="/login" className="action-btn">
                Student Login
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
            <Link to="/" className="logo" onClick={toggleMenu}> {/* Close menu on logo click */}
              <div className="logo-icon">
                <div className="logo-circle primary"></div>
                <div className="logo-circle warning"></div>
                <div className="logo-circle info"></div>
              </div>
              <div className="logo-text">
                <h1>Dream</h1>
                <p>Technical College</p>
              </div>
            </Link>
            <button className="close-menu" onClick={toggleMenu}>
              <FiX size={24} />
            </button>
          </div>

          <div className="mobile-nav-content">
            <ul className="mobile-nav-list">
              {navItems.map((item, index) => (
                <li
                  className={`mobile-nav-item ${item.dropdown ? 'has-dropdown' : ''} ${activeDropdown === index ? 'open' : ''}`}
                  key={index}
                >
                  <Link
                    to={item.path}
                    className={`mobile-nav-link ${isActive(item.path, item.dropdown) || activeDropdown === index ? 'active-nav-link' : ''}`}
                    onClick={(e) => {
                      if (item.dropdown) {
                        e.preventDefault(); // Prevent default link navigation for mobile dropdown parents
                        toggleMobileDropdown(index); // Toggle mobile dropdown
                      } else {
                        toggleMenu(); // Close mobile menu for direct links
                      }
                    }}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {item.name}
                  </Link>
                  {/* Mobile dropdown menu */}
                  {item.dropdown && (
                    <ul className="mobile-dropdown-menu">
                      {item.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className={`mobile-dropdown-item ${location.pathname === subItem.path ? 'active-nav-link' : ''}`}
                            onClick={toggleMenu} // Close entire mobile menu when sub-item is clicked
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="mobile-actions">
              <Link to="/verify" className="mobile-action-btn" onClick={toggleMenu}>
                <FiCheck className="icon" /> Verify Certificate
              </Link>
              <Link to="/admission" className="mobile-action-btn primary" onClick={toggleMenu}>
                <FiUser className="icon" /> Admission
              </Link>
              <Link to="/login" className="mobile-action-btn" onClick={toggleMenu}>
                Student Login
              </Link>
            </div>
          </div>

          <div className="mobile-contact">
            <a href={`tel:${contactInfo.phone}`} className="contact-link">
              <FiPhone className="icon" /> Call Us
            </a>
            <a href={`mailto:${contactInfo.email}`} className="contact-link">
              <FiMail className="icon" /> Email
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              className="contact-link whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiMessageCircle className="icon" /> WhatsApp
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;