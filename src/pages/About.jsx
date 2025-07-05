// src/pages/About.jsx
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FiCheck, FiAward, FiUsers, FiBook, 
  FiBriefcase, FiMapPin, FiPhone, FiMail,
  FiGlobe, FiTarget, FiHeart, FiBarChart2
} from 'react-icons/fi';
import { FaChalkboardTeacher, FaLaptopCode } from 'react-icons/fa';
import aboutHero from '../assets/images/about-hero-bg.jpg';
import teamImg from '../assets/images/about-hero-bg.jpg';
import "../assets/styles/About.css";

const About = () => {
  const [activeTab, setActiveTab] = useState('vision');

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
  }, []);

  // Stats data
  const stats = [
    { icon: <FiUsers size={24} />, value: "12,500+", label: 'Students Enrolled' },
    { icon: <FiBook size={24} />, value: "24+", label: 'Courses Offered' },
    { icon: <FiBriefcase size={24} />, value: "18+", label: 'Industry Partners' },
    { icon: <FiAward size={24} />, value: "5+", label: 'Awards Won' }
  ];

  const values = [
    { title: "Excellence", desc: "Commitment to highest standards", icon: <FiAward /> },
    { title: "Innovation", desc: "Embracing modern teaching methods", icon: <FiGlobe /> },
    { title: "Integrity", desc: "Ethical practices in all operations", icon: <FiHeart /> },
    { title: "Diversity", desc: "Inclusive learning environment", icon: <FiUsers /> },
    { title: "Community", desc: "Contributing to local development", icon: <FiTarget /> },
    { title: "Growth", desc: "Continuous improvement mindset", icon: <FiBarChart2 /> }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center min-vh-80 py-5">
            <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
              <h1 className="display-4 fw-bold text-white mb-4">
                Empowering <span className="text-warning">Futures</span> at Dream Technical College
              </h1>
              <p className="lead text-light mb-4">
                Located in Bardaghat, Nawalparasi, we offer comprehensive courses in languages, 
                IT, and professional training to prepare students for global opportunities.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a 
                  href="#why-us" 
                  className="btn btn-primary btn-lg px-4 py-3 d-flex align-items-center"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  Why Choose Us <FiCheck className="ms-2" />
                </a>
                <a 
                  href="/courses" 
                  className="btn btn-outline-light btn-lg px-4 py-3 d-flex align-items-center"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  Explore Courses
                </a>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="hero-image-container">
                <img 
                  src={aboutHero} 
                  alt="Dream Technical College" 
                  className="img-fluid rounded-4 shadow-lg" 
                />
                <div className="floating-badge bg-warning text-dark">
                  <FiAward className="me-2" /> Est. 2010
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, index) => (
              <div className="col-md-3 col-6" key={index} data-aos="fade-up" data-aos-delay={index*100}>
                <div className="text-center p-3">
                  <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                    {stat.icon}
                  </div>
                  <h3 className="text-primary fw-bold">{stat.value}</h3>
                  <p className="small text-dark mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision Tabs */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Our Core Philosophy</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: "700px"}}>
              Guiding principles that drive our institution
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 shadow-sm" data-aos="zoom-in">
                <div className="card-body p-0">
                  <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'vision' ? 'active' : ''}`}
                        onClick={() => setActiveTab('vision')}
                      >
                        Our Vision
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'mission' ? 'active' : ''}`}
                        onClick={() => setActiveTab('mission')}
                      >
                        Our Mission
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeTab === 'values' ? 'active' : ''}`}
                        onClick={() => setActiveTab('values')}
                      >
                        Core Values
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content p-4 p-md-5">
                    {activeTab === 'vision' && (
                      <div className="tab-pane fade show active">
                        <h3 className="mb-4">Shaping Future Leaders</h3>
                        <p className="lead">
                          To become the premier technical education provider in Nepal, recognized for 
                          innovation, academic excellence, and producing job-ready graduates for both 
                          domestic and international markets.
                        </p>
                        <div className="row mt-4">
                          <div className="col-md-6 mb-3">
                            <div className="p-3 bg-primary bg-opacity-10 rounded h-100">
                              <h5 className="d-flex align-items-center text-primary">
                                <FiGlobe className="me-2" /> Global Standards
                              </h5>
                              <p className="mb-0">Internationally benchmarked curriculum</p>
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="p-3 bg-primary bg-opacity-10 rounded h-100">
                              <h5 className="d-flex align-items-center text-primary">
                                <FiTarget className="me-2" /> Industry Alignment
                              </h5>
                              <p className="mb-0">Training that meets market demands</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'mission' && (
                      <div className="tab-pane fade">
                        <h3 className="mb-4">Transforming Education</h3>
                        <p className="lead">
                          To deliver accessible, affordable, and high-quality technical education that 
                          bridges the gap between academia and industry requirements.
                        </p>
                        <div className="row mt-4">
                          <div className="col-md-6 mb-3">
                            <div className="p-3 bg-primary bg-opacity-10 rounded h-100">
                              <h5 className="d-flex align-items-center text-primary">
                                <FiBook className="me-2" /> Practical Learning
                              </h5>
                              <p className="mb-0">70% hands-on training in all programs</p>
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="p-3 bg-primary bg-opacity-10 rounded h-100">
                              <h5 className="d-flex align-items-center text-primary">
                                <FiBriefcase className="me-2" /> Career Support
                              </h5>
                              <p className="mb-0">100% internship placement assistance</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'values' && (
                      <div className="tab-pane fade">
                        <h3 className="mb-4">What We Stand For</h3>
                        <div className="row g-4">
                          {values.map((item, index) => (
                            <div key={index} className="col-md-4" data-aos="fade-up" data-aos-delay={index*100}>
                              <div className="card border-0 shadow-sm h-100">
                                <div className="card-body text-center p-4">
                                  <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                                    {item.icon}
                                  </div>
                                  <h5 className="mb-2">{item.title}</h5>
                                  <p className="text-muted mb-0">{item.desc}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Why Choose Dream Technical College?</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: "700px"}}>
              We stand out from the competition
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                title: "Expert Instructors",
                desc: "Learn from certified professionals with industry experience",
                icon: <FaChalkboardTeacher size={24} />,
                color: "primary"
              },
              {
                title: "Comprehensive Courses",
                desc: "Language, IT, Accounting, and professional training programs",
                icon: <FiBook size={24} />,
                color: "success"
              },
              {
                title: "Career Support",
                desc: "Job placement assistance and internship opportunities",
                icon: <FiBriefcase size={24} />,
                color: "warning"
              },
              {
                title: "Modern Facilities",
                desc: "Well-equipped labs and digital learning resources",
                icon: <FaLaptopCode size={24} />,
                color: "info"
              },
              {
                title: "Affordable Education",
                desc: "Quality training at reasonable costs with payment plans",
                icon: <FiCheck size={24} />,
                color: "danger"
              },
              {
                title: "Recognized Certifications",
                desc: "CTEVT and internationally recognized credentials",
                icon: <FiAward size={24} />,
                color: "secondary"
              }
            ].map((item, index) => (
              <div key={index} className="col-md-4" data-aos="zoom-in" data-aos-delay={index*100}>
                <div className={`card h-100 border-0 shadow-sm bg-${item.color}-light`}>
                  <div className="card-body text-center p-4">
                    <div className={`icon-lg bg-${item.color} text-white rounded-circle mx-auto mb-4`}>
                      {item.icon}
                    </div>
                    <h4 className="mb-3">{item.title}</h4>
                    <p className="text-muted mb-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Our Leadership Team</h2>
            <p className="text-muted mx-auto" style={{maxWidth: "700px"}}>
              Experienced educators guiding our institution
            </p>
          </div>

          <div className="row g-4">
            {[
              { name: "John Doe", position: "Principal", exp: "15+ years experience" },
              { name: "Jane Smith", position: "Academic Director", exp: "12+ years experience" },
              { name: "Robert Johnson", position: "IT Department Head", exp: "10+ years experience" },
              { name: "Sarah Williams", position: "Language Program Coordinator", exp: "8+ years experience" }
            ].map((member, index) => (
              <div className="col-md-3 col-6" key={index} data-aos="fade-up" data-aos-delay={index*100}>
                <div className="card border-0 shadow-sm h-100">
                  <img 
                    src={teamImg} 
                    alt={member.name} 
                    className="card-img-top"
                  />
                  <div className="card-body text-center">
                    <h5 className="mb-1">{member.name}</h5>
                    <p className="text-primary small mb-1">{member.position}</p>
                    <p className="text-muted small mb-0">{member.exp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="fw-bold mb-4">Get In Touch</h2>
              <div className="mb-4">
                <h5 className="d-flex align-items-center mb-3">
                  <FiMapPin className="me-2" /> Location
                </h5>
                <p>Bardaghat, Nawalparasi, Nepal</p>
              </div>
              <div className="mb-4">
                <h5 className="d-flex align-items-center mb-3">
                  <FiPhone className="me-2" /> Phone
                </h5>
                <p className="mb-1">078-580873</p>
                <p className="mb-1">9857080873, 9857080872</p>
                <p>9812919231</p>
              </div>
              <div className="mb-4">
                <h5 className="d-flex align-items-center mb-3">
                  <FiMail className="me-2" /> Email
                </h5>
                <p>info@dreamtech.edu.np</p>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4 p-md-5">
                  <h3 className="text-center mb-4">Send Us a Message</h3>
                  <form>
                    <div className="mb-3">
                      <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder="Your Name" 
                      />
                    </div>
                    <div className="mb-3">
                      <input 
                        type="email" 
                        className="form-control form-control-lg" 
                        placeholder="Email Address" 
                      />
                    </div>
                    <div className="mb-3">
                      <input 
                        type="tel" 
                        className="form-control form-control-lg" 
                        placeholder="Phone Number" 
                      />
                    </div>
                    <div className="mb-3">
                      <textarea 
                        className="form-control form-control-lg" 
                        rows="4" 
                        placeholder="Your Message"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-light btn-lg w-100 py-3"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;