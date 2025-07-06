import '../assets/styles/Footer.css';
import React from 'react';
import { 
  FiMapPin, FiPhone, FiMail, FiClock,
  FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube
} from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      {/* Top Footer Section */}
      <div className="footer-top">
        <div className="container">
          <div className="row g-5">
            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget">
                <h3 className="footer-title">Dream Technical College</h3>
                <p className="footer-desc">
                  Providing quality technical education since 2010. 
                  Empowering students with practical skills for global opportunities.
                </p>
                <ul className="footer-contact">
                  <li>
                    <FiMapPin className="icon" />
                    <span>Bardaghat, Nawalparasi, Nepal</span>
                  </li>
                  <li>
                    <FiPhone className="icon" />
                    <span>078-580873, 9857080873, 9857080872</span>
                  </li>
                  <li>
                    <FiMail className="icon" />
                    <span>info@dreamtech.edu.np</span>
                  </li>
                  <li>
                    <FiClock className="icon" />
                    <span>Sun-Fri: 7AM - 5PM | Sat: Closed</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget">
                <h4 className="footer-title">Quick Links</h4>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/courses">Courses</a></li>
                  <li><a href="/faculty">Faculty</a></li>
                  <li><a href="/admission">Admissions</a></li>
                  <li><a href="/contact">Contact Us</a></li>
                </ul>
              </div>
            </div>

            {/* Popular Courses */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h4 className="footer-title">Popular Courses</h4>
                <ul className="footer-links">
                  <li><a href="/courses/web-development">Web Development</a></li>
                  <li><a href="/courses/graphics-design">Graphics Design</a></li>
                  <li><a href="/courses/english-language">English Language</a></li>
                  <li><a href="/courses/accounting">Accounting Training</a></li>
                  <li><a href="/courses/networking">Computer Networking</a></li>
                  <li><a href="/courses/auto-cad">AutoCAD Training</a></li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-widget">
                <h4 className="footer-title">Newsletter</h4>
                <p>Subscribe to get latest updates on courses and events</p>
                <form className="footer-newsletter">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-control text-input text-primary" 
                      placeholder="Your Email" 
                      required 
                    />
                    <button className="btn btn-primary" type="submit">
                      Subscribe
                    </button>
                  </div>
                </form>
                <div className="footer-social mt-4">
                  <h5 className="mb-3">Follow Us:</h5>
                  <div className="social-icons">
                    <a href="https://facebook.com" aria-label="Facebook"><FiFacebook /></a>
                    <a href="https://twitter.com" aria-label="Twitter"><FiTwitter /></a>
                    <a href="https://instagram.com" aria-label="Instagram"><FiInstagram /></a>
                    <a href="https://linkedin.com" aria-label="LinkedIn"><FiLinkedin /></a>
                    <a href="https://youtube.com" aria-label="YouTube"><FiYoutube /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">
                &copy; {currentYear} Dream Technical College. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6">
              <ul className="footer-policy">
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/sitemap">Sitemap</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;