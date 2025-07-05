import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiCheckCircle, FiDownload, FiArrowRight, FiPhone, FiMapPin } from "react-icons/fi";
import { FaGraduationCap, FaChalkboardTeacher, FaLaptopCode } from "react-icons/fa";
import admissionHero from "../assets/images/about-hero-bg.jpg";
import campusImg from "../assets/images/about-hero-bg.jpg";
import "../assets/styles/Admission.css";

const Admission = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
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
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const courses = [
    { name: "Computer Basic", icon: <FaLaptopCode size={24} /> },
    { name: "IELTS Preparation", icon: <FaGraduationCap size={24} /> },
    { name: "Japanese Language", icon: <FaGraduationCap size={24} /> },
    { name: "Accounting Training", icon: <FaGraduationCap size={24} /> },
    { name: "Teacher Service", icon: <FaChalkboardTeacher size={24} /> },
    { name: "Medical Entrance", icon: <FaGraduationCap size={24} /> }
  ];

  return (
    <div className="admission-page">
      {/* Hero Section */}
      <section className="admission-hero">
        <div className="container">
          <div className="row align-items-center min-vh-80 py-5">
            <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
              <h1 className="display-4 fw-bold text-white mb-4">
                Admissions <span className="text-warning">Open</span> 2082
              </h1>
              <p className="lead text-light mb-4">
                Begin your journey to success with Nepal's premier technical education provider. 
                Limited seats available across all programs.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a 
                  href="#application-process" 
                  className="btn btn-primary btn-lg px-4 py-3 d-flex align-items-center"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  Apply Now <FiArrowRight className="ms-2" />
                </a>
                <a 
                  href="/brochure.pdf" 
                  className="btn btn-outline-light btn-lg px-4 py-3 d-flex align-items-center"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <FiDownload className="me-2" /> Download Brochure
                </a>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="hero-image-container">
                <img 
                  src={admissionHero} 
                  alt="Students at Dream Technical College" 
                  className="img-fluid rounded-4 shadow-lg" 
                />
                <div className="floating-badge bg-warning text-dark">
                  <FiCheckCircle className="me-2" /> 100% Practical Learning
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
            {[
              { title: "Programs", value: "24+", desc: "Technical & Language Courses" },
              { title: "Scholarships", value: "Available", desc: "For Deserving Students" },
              { title: "Placement", value: "95%", desc: "Job Placement Record" },
              { title: "Faculty", value: "50+", desc: "Expert Instructors" }
            ].map((item, index) => (
              <div className="col-md-3 col-6" key={index} data-aos="fade-up" data-aos-delay={index*100}>
                <div className="text-center p-3">
                  <h3 className="text-primary fw-bold">{item.value}</h3>
                  <h6 className="text-uppercase text-muted mb-1">{item.title}</h6>
                  <p className="small text-dark mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section id="application-process" className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Simple 3-Step Admission</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: "700px"}}>
              Our straightforward admission process gets you started quickly on your educational journey
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: "01",
                title: "Explore Programs",
                desc: "Browse our course offerings and select your preferred program",
                color: "primary"
              },
              {
                icon: "02",
                title: "Submit Application",
                desc: "Complete the online form or visit our campus in person",
                color: "success"
              },
              {
                icon: "03",
                title: "Confirm Enrollment",
                desc: "Pay fees and begin your classes with orientation",
                color: "warning"
              }
            ].map((item, index) => (
              <div className="col-md-4" key={index} data-aos="zoom-in" data-aos-delay={index*200}>
                <div className={`card h-100 border-0 shadow-sm step-card step-${item.color}`}>
                  <div className="card-body text-center p-4 p-xl-5">
                    <div className={`step-number bg-${item.color} text-white`}>{item.icon}</div>
                    <h4 className="my-4">{item.title}</h4>
                    <p className="text-muted mb-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Our Popular Programs</h2>
            <p className="text-muted mx-auto" style={{maxWidth: "700px"}}>
              Industry-relevant courses designed for career success
            </p>
          </div>

          <div className="row g-4">
            {courses.map((course, index) => (
              <div className="col-md-6 col-lg-4" key={index} data-aos="fade-up" data-aos-delay={index*100}>
                <div className="card course-card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle me-3">
                        {course.icon}
                      </div>
                      <h5 className="mb-0">{course.name}</h5>
                    </div>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2"><FiCheckCircle className="text-success me-2" /> 3-6 Months Duration</li>
                      <li className="mb-2"><FiCheckCircle className="text-success me-2" /> Practical Training</li>
                      <li className="mb-2"><FiCheckCircle className="text-success me-2" /> Certification</li>
                    </ul>
                  </div>
                  <div className="card-footer bg-transparent border-0 pt-0 pb-4 px-4">
                    <a href="#apply-now" className="btn btn-sm btn-outline-primary">
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-now" className="py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="pe-lg-5">
                <h2 className="fw-bold text-primary mb-4">Ready to Apply?</h2>
                <p className="lead mb-4">
                  Fill out this form and our admission team will contact you within 24 hours to 
                  guide you through the enrollment process.
                </p>
                <div className="bg-primary bg-opacity-10 p-4 rounded-3 mb-4">
                  <h5 className="d-flex align-items-center mb-3">
                    <FiMapPin className="text-primary me-2" /> Campus Address
                  </h5>
                  <p className="mb-0">Bardaghat, Nawalparasi, Nepal</p>
                </div>
                <div className="bg-primary bg-opacity-10 p-4 rounded-3">
                  <h5 className="d-flex align-items-center mb-3">
                    <FiPhone className="text-primary me-2" /> Contact
                  </h5>
                  <p className="mb-1">078-580873</p>
                  <p className="mb-0">9857080873, 9857080872, 9812919231</p>
                </div>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4 p-md-5">
                  {submitted ? (
                    <div className="text-center py-5">
                      <FiCheckCircle className="display-4 text-success mb-3" />
                      <h3 className="mb-3">Application Submitted!</h3>
                      <p className="text-muted mb-4">
                        Thank you for your interest. Our admission team will contact you shortly.
                      </p>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => setSubmitted(false)}
                      >
                        Submit Another Application
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-center mb-4 text-primary">Admission Form</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">Full Name *</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Email Address</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Phone Number *</label>
                            <input
                              type="tel"
                              name="phone"
                              className="form-control"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Course Interest *</label>
                            <select
                              name="course"
                              className="form-select"
                              value={formData.course}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select Course</option>
                              {courses.map((course, i) => (
                                <option key={i} value={course.name}>{course.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-12">
                            <label className="form-label">Message (Optional)</label>
                            <textarea
                              name="message"
                              className="form-control"
                              rows="4"
                              value={formData.message}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                          <div className="col-12 mt-4">
                            <button 
                              type="submit" 
                              className="btn btn-primary w-100 py-3"
                            >
                              Submit Application
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Tour */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <img 
                src={campusImg} 
                alt="Dream Technical College Campus" 
                className="img-fluid rounded-3 shadow" 
              />
            </div>
            <div className="col-lg-6 ps-lg-5" data-aos="fade-left">
              <h2 className="fw-bold mb-4">Schedule a Campus Tour</h2>
              <p className="lead mb-4">
                Experience our facilities firsthand. Visit our campus and meet with faculty members 
                to learn more about our programs.
              </p>
              <button className="btn btn-outline-light btn-lg px-4">
                Book a Tour
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admission;