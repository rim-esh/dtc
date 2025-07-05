
import React from 'react';
import { 
  FiMail, FiPhone, FiMapPin, FiClock, 
  FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, 
  FiBook, FiUser, FiAward, FiArrowRight 
} from 'react-icons/fi';

import '../assets/styles/Footer.css'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer data
  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Courses', path: '/courses' },
        { name: 'Faculty', path: '/faculty' },
        { name: 'Events', path: '/events' },
        { name: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Our Courses',
      links: [
        { name: 'Computer Basic & Office', path: '/courses/computer' },
        { name: 'IELTS Preparation', path: '/courses/ielts' },
        { name: 'Japanese Language', path: '/courses/japanese' },
        { name: 'Accounting Training', path: '/courses/accounting' },
        { name: 'All Courses', path: '/courses' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Career Center', path: '/careers' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'FAQs', path: '/faqs' },
        { name: 'Student Portal', path: '/login' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FiFacebook />, url: '#', name: 'Facebook' },
    { icon: <FiTwitter />, url: '#', name: 'Twitter' },
    { icon: <FiInstagram />, url: '#', name: 'Instagram' },
    { icon: <FiLinkedin />, url: '#', name: 'LinkedIn' },
    { icon: <FiYoutube />, url: '#', name: 'YouTube' }
  ];

  const stats = [
    { value: 12500, label: 'Students Enrolled', icon: <FiUser /> },
    { value: 24, label: 'Courses Offered', icon: <FiBook /> },
    { value: 58, label: 'Certified Teachers', icon: <FiAward /> }
  ];

  return (
    <footer className="footer bg-dark-blue">
      {/* Top Footer Section */}
      <div className="footer-top py-5">
        <div className="container">
          <div className="row g-5">
            {/* College Info */}
            <div className="col-lg-4">
              <div className="footer-info mb-5">
                <h3 className="footer-logo fw-bold text-white mb-4">
                  <span className="text-primary">Dream</span> Technical College
                </h3>
                <p className="text-light mb-4">
                  Premier technical education provider in Bardaghat, Nawalparasi 
                  offering industry-relevant programs in IT, language, and professional training.
                </p>
                
                <div className="footer-stats row g-3 mb-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="col-md-4 col-sm-4 col-6">
                      <div className="stat-box bg-primary-light text-center p-2 rounded">
                        <div className="icon-sm bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2">
                          {stat.icon}
                        </div>
                        <h5 className="text-primary fw-bold mb-0">{stat.value.toLocaleString()}+</h5>
                        <p className="small text-white mb-0">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="social-links d-flex">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      className="btn btn-sm btn-primary rounded-circle me-2 d-flex align-items-center justify-content-center"
                      aria-label={social.name}
                      style={{ width: '38px', height: '38px' }}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Link Columns */}
            <div className="col-lg-4 col-md-6">
              <div className="row">
                {footerLinks.map((section, index) => (
                  <div key={index} className="col-md-4 col-sm-4 col-6">
                    <h5 className="text-white mb-4 position-relative footer-title">
                      {section.title}
                    </h5>
                    <ul className="list-unstyled">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex} className="mb-2">
                          <a 
                            href={link.path} 
                            className="text-light text-decoration-none d-flex align-items-center footer-link"
                          >
                            <FiArrowRight className="me-2 text-primary" size={14} /> {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact & Newsletter */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-contact mb-5">
                <h5 className="text-white mb-4 position-relative footer-title">
                  Contact Us
                </h5>
                
                <ul className="list-unstyled">
                  <li className="d-flex mb-3">
                    <div className="icon-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      <FiMapPin size={18} />
                    </div>
                    <div>
                      <h6 className="text-white mb-0">Our Location</h6>
                      <p className="mb-0 text-light">Bardaghat, Nawalparasi, Nepal</p>
                    </div>
                  </li>
                  
                  <li className="d-flex mb-3">
                    <div className="icon-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      <FiPhone size={18} />
                    </div>
                    <div>
                      <h6 className="text-white mb-0">Call Us</h6>
                      <p className="mb-0 text-light">078-580873<br />9857080873, 9857080872</p>
                    </div>
                  </li>
                  
                  <li className="d-flex mb-3">
                    <div className="icon-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      <FiMail size={18} />
                    </div>
                    <div>
                      <h6 className="text-white mb-0">Email Us</h6>
                      <p className="mb-0 text-light">info@dreamtech.edu.np</p>
                    </div>
                  </li>
                  
                  <li className="d-flex">
                    <div className="icon-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      <FiClock size={18} />
                    </div>
                    <div>
                      <h6 className="text-white mb-0">Opening Hours</h6>
                      <p className="mb-0 text-light">
                        Sun-Thu: 7:00 AM - 5:00 PM<br />
                        Fri: 7:00 AM - 1:00 PM
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="footer-newsletter">
                <h5 className="text-white mb-4 position-relative footer-title">
                  Newsletter
                </h5>
                <p className="text-light mb-3">
                  Subscribe to get updates on new courses, events, and college news.
                </p>
                
                <form className="mb-3">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control border-primary bg-transparent text-light" 
                      placeholder="Your Email" 
                      aria-label="Email"
                      required
                    />
                    <button 
                      className="btn btn-primary px-4" 
                      type="submit"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="footer-bottom py-4 bg-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="mb-0 text-light opacity-75">
                © {currentYear} Dream Technical College. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-3">
                  <a href="/privacy" className="text-light text-decoration-none opacity-75">Privacy Policy</a>
                </li>
                <li className="list-inline-item me-3">
                  <a href="/terms" className="text-light text-decoration-none opacity-75">Terms of Use</a>
                </li>
                <li className="list-inline-item">
                  <a href="/sitemap" className="text-light text-decoration-none opacity-75">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Contact Button */}
      <div className="floating-contact">
        <a href="/contact" className="btn btn-primary btn-icon rounded-circle shadow-lg">
          <FiPhone size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;