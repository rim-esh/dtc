// src/pages/Contact.jsx
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FiMail, FiPhone, FiMapPin, FiMessageSquare, 
  FiClock, FiSend, FiCheckCircle, FiUser 
} from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import contactHero from "../assets/images/about-hero-bg.jpg";
import mapPlaceholder from "../assets/images/about-hero-bg.jpg";
import "../assets/styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
    
    // Update current time
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: <FiPhone size={24} />,
      title: "Call Us",
      details: ["+977 78-580873", "+977 9857080873", "+977 9857080872"],
      color: "primary"
    },
    {
      icon: <FiMail size={24} />,
      title: "Email Us",
      details: ["info@dreamtech.edu.np", "admission@dreamtech.edu.np", "support@dreamtech.edu.np"],
      color: "success"
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Visit Campus",
      details: ["Bardaghat, Nawalparasi", "Near Central Bus Park", "Opposite City Hall"],
      color: "warning"
    }
  ];

  const faqs = [
    {
      question: "What are your office hours?",
      answer: "Our office is open Monday to Friday from 9:00 AM to 5:00 PM, and Saturdays from 10:00 AM to 2:00 PM."
    },
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly."
    },
    {
      question: "Do you offer campus tours?",
      answer: "Yes! We'd love to show you around. Please schedule a tour at least 24 hours in advance using our online form."
    },
    {
      question: "Can I meet with an academic advisor?",
      answer: "Absolutely. Contact our academic department to schedule an appointment with one of our advisors."
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="row align-items-center min-vh-80 py-5">
            <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
              <h1 className="display-4 fw-bold text-white mb-4">
                Get in <span className="text-warning">Touch</span>
              </h1>
              <p className="lead text-light mb-4">
                Have questions or want to learn more? Our team is ready to assist you with any inquiries about our programs and admissions.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a 
                  href="#contact-form" 
                  className="btn btn-primary btn-lg px-4 py-3 d-flex align-items-center"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  Send Message <FiSend className="ms-2" />
                </a>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="hero-image-container">
                <img 
                  src={contactHero} 
                  alt="Contact Dream Technical College" 
                  className="img-fluid rounded-4 shadow-lg" 
                />
                <div className="floating-badge bg-warning text-dark">
                  <FiClock className="me-2" /> Current Time: {currentTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {[
              { icon: <FiPhone />, title: "Call Us", value: "078-580873", color: "primary" },
              { icon: <FiMail />, title: "Email", value: "info@dreamtech.edu.np", color: "success" },
              { icon: <FiMapPin />, title: "Visit", value: "Bardaghat, Nawalparasi", color: "warning" },
              { icon: <FiClock />, title: "Hours", value: "9AM - 5PM (Mon-Sat)", color: "info" }
            ].map((item, index) => (
              <div className="col-md-3 col-6" key={index} data-aos="fade-up" data-aos-delay={index*100}>
                <div className={`contact-quick-info bg-${item.color} bg-opacity-10 p-4 rounded-3 text-center h-100`}>
                  <div className={`icon-lg bg-${item.color} text-white p-1 w-25 mx-auto mb-3`}>
                    {item.icon}
                  </div>
                  <h6 className="text-uppercase text-muted mb-1">{item.title}</h6>
                  <p className="fw-bold mb-0">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Ways to Reach Us</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: "700px"}}>
              Choose the most convenient way to get in touch with our team
            </p>
          </div>

          <div className="row g-4">
            {contactMethods.map((method, index) => (
              <div className="col-md-4" key={index} data-aos="zoom-in" data-aos-delay={index*200}>
                <div className={`card h-100 border-0 shadow-sm contact-method bg-${method.color}-light`}>
                  <div className="card-body text-center p-4 p-xl-5">
                    <div className={`icon-lg bg-${method.color} text-white p-1 w-25 mx-auto mb`}>
                      {method.icon}
                    </div>
                    <h4 className="mb-4">{method.title}</h4>
                    <ul className="list-unstyled mb-4">
                      {method.details.map((detail, i) => (
                        <li key={i} className="mb-2">
                          <FiCheckCircle className={`text-${method.color} me-2`} /> {detail}
                        </li>
                      ))}
                    </ul>
                    <button className={`btn btn-${method.color}`}>
                      {method.title}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section id="contact-form" className="py-5 bg-light">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7" data-aos="fade-right">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4 p-md-5">
                  {submitted ? (
                    <div className="text-center py-5">
                      <FiCheckCircle className="display-4 text-success mb-3" />
                      <h3 className="mb-3">Message Sent!</h3>
                      <p className="text-muted mb-4">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-center mb-4 text-primary">Contact Form</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Full Name *</label>
                            <div className="input-group">
                              <span className="input-group-text">
                                <FiUser />
                              </span>
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Email Address *</label>
                            <div className="input-group">
                              <span className="input-group-text">
                                <FiMail />
                              </span>
                              <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <div className="input-group">
                              <span className="input-group-text">
                                <FiPhone />
                              </span>
                              <input
                                type="tel"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Subject *</label>
                            <div className="input-group">
                              <span className="input-group-text">
                                <FiMessageSquare />
                              </span>
                              <input
                                type="text"
                                name="subject"
                                className="form-control"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <label className="form-label">Your Message *</label>
                            <div className="input-group">
                              <span className="input-group-text align-items-start pt-2">
                                <FiMessageSquare />
                              </span>
                              <textarea
                                name="message"
                                className="form-control"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-12 mt-4">
                            <button 
                              type="submit" 
                              className="btn btn-primary w-100 py-3 d-flex align-items-center justify-content-center"
                            >
                              <FiSend className="me-2" /> Send Message
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-5" data-aos="fade-left">
              <div className="ps-lg-4">
                <h2 className="fw-bold text-primary mb-4">Our Location</h2>
                <div className="map-container mb-4 rounded-3 overflow-hidden shadow">
                  <img 
                    src={mapPlaceholder} 
                    alt="Dream Technical College Location" 
                    className="img-fluid w-100" 
                  />
                  <div className="map-marker">
                    <div className="pulse-dot"></div>
                  </div>
                </div>
                <div className="bg-primary bg-opacity-10 p-4 rounded-3 mb-4">
                  <h5 className="d-flex align-items-center mb-3">
                    <FiMapPin className="text-primary me-2" /> Campus Address
                  </h5>
                  <p className="mb-0">Bardaghat, Nawalparasi, Nepal</p>
                </div>
                <div className="bg-primary bg-opacity-10 p-4 rounded-3">
                  <h5 className="d-flex align-items-center mb-3">
                    <FiClock className="text-primary me-2" /> Office Hours
                  </h5>
                  <p className="mb-1">Sunday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="mb-0">Saturday: 10:00 AM - 2:00 PM</p>
                </div>
                
                <div className="mt-5">
                  <h5 className="fw-bold mb-3">Follow Us</h5>
                  <div className="d-flex gap-3">
                    <a href="/social" className="social-icon facebook">
                      <FaFacebook />
                    </a>
                    <a href="/social" className="social-icon twitter">
                      <FaTwitter />
                    </a>
                    <a href="/social" className="social-icon instagram">
                      <FaInstagram />
                    </a>
                    <a href="/social" className="social-icon linkedin">
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Frequently Asked Questions</h2>
            <p className="text-muted mx-auto" style={{maxWidth: "700px"}}>
              Find quick answers to common questions about contacting us
            </p>
          </div>

          <div className="row g-4">
            {faqs.map((faq, index) => (
              <div className="col-md-6" key={index} data-aos="fade-up" data-aos-delay={index*100}>
                <div className="card faq-card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h5 className="d-flex align-items-center mb-3">
                      <FiMessageSquare className="text-primary me-2" /> {faq.question}
                    </h5>
                    <p className="text-muted mb-0">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;