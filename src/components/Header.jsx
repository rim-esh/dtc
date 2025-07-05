// components/Header.jsx
import React, { useState, useEffect } from 'react';
import { 
  FiHome, FiInfo, FiBookOpen, FiUsers, 
  FiCalendar, FiMail, FiPhone, FiMenu, FiX, 
  FiBook, FiMessageCircle, FiCheck, FiUser
} from 'react-icons/fi';
import '../assets/styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { 
      name: 'About', 
      path: '/about', 
      icon: <FiInfo />,
      dropdown: [
        { name: 'Our History', path: '/about/history' },
        { name: 'Vision & Mission', path: '/about/vision' },
        { name: 'Infrastructure', path: '/about/infrastructure' },
        { name: 'Administration', path: '/about/administration' },
      ]
    },
    { 
      name: 'Courses', 
      path: '/courses', 
      icon: <FiBookOpen />,
      dropdown: [
        { name: 'Computer & Office', path: '/courses/computer' },
        { name: 'IELTS Preparation', path: '/courses/ielts' },
        { name: 'Japanese Language', path: '/courses/japanese' },
        { name: 'Accounting (Tally)', path: '/courses/accounting' },
        { name: 'View All Courses', path: '/courses/all' },
      ]
    },
    { name: 'Faculty', path: '/faculty', icon: <FiUsers /> },
    { name: 'Events', path: '/events', icon: <FiCalendar /> },
    { name: 'Blog', path: '/blog', icon: <FiBook /> },
    { name: 'Contact', path: '/contact', icon: <FiMail /> },
  ];

  // Contact info
  const contactInfo = {
    phone: '+977 9857080873',
    email: 'info@dreamtech.edu.np',
    whatsapp: '+977 9857080872'
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    document.body.classList.toggle('mobile-menu-open', !isOpen);
    if (isOpen) setActiveDropdown(null);
  };

  // Toggle dropdown
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
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
              <a href="/verify" className="top-btn verify-btn">
                <FiCheck className="icon" /> Verify Certificate
              </a>
              <a href="/admission" className="top-btn admission-btn">
                <FiUser className="icon" /> Admission
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`header ${isSticky ? 'sticky' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <div className="logo-container">
              <a href="/" className="logo">
                <div className="logo-icon">
                  <div className="logo-circle primary"></div>
                  <div className="logo-circle warning"></div>
                  <div className="logo-circle info"></div>
                </div>
                <div className="logo-text">
                  <h1>Dream</h1>
                  <p>Technical College</p>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <ul className="nav-list">
                {navItems.map((item, index) => (
                  <li 
                    className={`nav-item${item.dropdown ? ' has-dropdown' : ''}${activeDropdown === index ? ' open' : ''}`}
                    key={index}
                  >
                    <a 
                      href={item.path} 
                      className="nav-link"
                      onClick={(e) => {
                        if (item.dropdown) {
                          e.preventDefault();
                          toggleDropdown(index);
                        }
                      }}
                    >
                      <span className="nav-text">{item.name}</span>
                      {item.dropdown && (
                        <span className="dropdown-indicator">
                          {/* Modern SVG arrow with gradient */}
                          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                            <defs>
                              <linearGradient id={`arrow-gradient-${index}`} x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#0d6efd" />
                                <stop offset="1" stopColor="#0dcaf0" />
                              </linearGradient>
                            </defs>
                            <path d="M7 8.5L10 11.5L13 8.5" stroke={`url(#arrow-gradient-${index})`} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}
                    </a>
                    {item.dropdown && activeDropdown === index && (
                      <div className="dropdown-menu">
                        {item.dropdown.map((subItem, subIndex) => (
                          <a 
                            key={subIndex} 
                            href={subItem.path} 
                            className="dropdown-item"
                          >
                            {subItem.name}
                          </a>
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
              <a href="/login" className="action-btn">
                Student Login
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
            <div className="logo-container">
              <a href="/" className="logo" onClick={toggleMenu}>
                <div className="logo-icon">
                  <div className="logo-circle primary"></div>
                  <div className="logo-circle warning"></div>
                  <div className="logo-circle info"></div>
                </div>
                <div className="logo-text">
                  <h1>Dream</h1>
                  <p>Technical College</p>
                </div>
              </a>
            </div>
            <button className="close-menu" onClick={toggleMenu}>
              <FiX size={24} />
            </button>
          </div>

          <div className="mobile-nav-content">
            <ul className="mobile-nav-list">
              {navItems.map((item, index) => (
                <li className="mobile-nav-item" key={index}>
                  <a 
                    href={item.path} 
                    className="mobile-nav-link"
                    onClick={toggleMenu}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-actions">
              <a href="/verify" className="mobile-action-btn">
                <FiCheck className="icon" /> Verify Certificate
              </a>
              <a href="/admission" className="mobile-action-btn primary">
                <FiUser className="icon" /> Admission
              </a>
              <a href="/login" className="mobile-action-btn">
                Student Login
              </a>
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