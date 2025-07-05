import React, { useState, useEffect, useRef, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FiBook, FiUser, FiMapPin,
  FiAward, FiArrowRight,
  FiMail, FiPhone
} from 'react-icons/fi';
import { FaGraduationCap, FaChalkboardTeacher, FaLaptopCode } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';

import CourseCard from '../components/CourseCard';
import EventCard from '../components/EventCard';
import FacultyCarousel from '../components/FacultyCarousel';
import testimonials from '../components/testimonialData';
import homeHero from '../assets/images/about-hero-bg.jpg';
import campusImg from '../assets/images/about-hero-bg.jpg';
import '../assets/styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Home = () => {
  // States
  const [stats, setStats] = useState([
    { value: 0, label: 'Students Enrolled', icon: <FiUser /> },
    { value: 0, label: 'Courses Offered', icon: <FiBook /> },
    { value: 0, label: 'Certified Teachers', icon: <FaChalkboardTeacher /> },
    { value: 0, label: 'Awards Won', icon: <FiAward /> }
  ]);

  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);

  // Refs for cleanup
  const intervalRefs = useRef([]);
  const timerRefs = useRef([]);

  // Animate statistics (moved above useEffect and wrapped in useCallback)
  const animateStats = useCallback(() => {
    const finalStats = [12500, 24, 58, 12];
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;
    const timers = [];
    stats.forEach((_, index) => {
      let current = 0;
      const increment = finalStats[index] / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= finalStats[index]) {
          current = finalStats[index];
          clearInterval(timer);
        }
        setStats(prevStats =>
          prevStats.map((stat, i) =>
            i === index ? { ...stat, value: Math.floor(current) } : stat
          )
        );
      }, interval);
      timers.push(timer);
    });
    timerRefs.current = timers;
  }, [stats]);

  useEffect(() => {
    // Initialize animations
    AOS.init({
      duration: 800,
      once: true
    });

    // Load data
    loadCourses();
    loadEvents();

    // Start stats animation
    animateStats();

    // Copy refs to local vars for cleanup
    const intervals = intervalRefs.current;
    const timers = timerRefs.current;

    // Cleanup on unmount
    return () => {
      intervals.forEach(id => clearInterval(id));
      timers.forEach(timer => clearInterval(timer));
    };

  }, [animateStats]);

  // Load courses
  const loadCourses = () => {
    const fetchedCourses = [
      {
        id: 1,
        title: "Computer Basic & Office Package",
        description: "Master essential computer skills and office software for professional environments",
        duration: "3 Months",
        level: "Beginner",
        icon: <FaLaptopCode />
      },
      {
        id: 2,
        title: "IELTS Preparation",
        description: "Comprehensive training for IELTS exam success with experienced instructors",
        duration: "4 Months",
        level: "Intermediate",
        icon: <FaGraduationCap />
      },
      {
        id: 3,
        title: "Japanese Language (N5-N3)",
        description: "Learn Japanese for career opportunities in Japan and international companies",
        duration: "6 Months",
        level: "All Levels",
        icon: <FaGraduationCap />
      },
      {
        id: 4,
        title: "Accounting Training (Tally)",
        description: "Professional accounting training with Tally software certification",
        duration: "4 Months",
        level: "Intermediate",
        icon: <FaGraduationCap />
      }
    ];
    setCourses(fetchedCourses);
  };

  // Load events
  const loadEvents = () => {
    const fetchedEvents = [
      {
        id: 1,
        title: "Open House & Campus Tour",
        date: "2023-12-15",
        time: "10:00 AM - 2:00 PM",
        location: "Main Campus, Bardaghat",
        description: "Explore our facilities and programs with guided campus tours"
      },
      {
        id: 2,
        title: "Tech Fest 2023",
        date: "2024-01-20",
        time: "9:00 AM - 5:00 PM",
        location: "College Auditorium",
        description: "Annual technology festival showcasing student projects and innovations"
      },
      {
        id: 3,
        title: "Career Fair",
        date: "2024-02-10",
        time: "11:00 AM - 4:00 PM",
        location: "College Ground",
        description: "Connect with top employers and explore job opportunities"
      }
    ];
    setEvents(fetchedEvents);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="row align-items-center min-vh-80 py-5">
            <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
              <h1 className="display-4 fw-bold text-white mb-4">
                Empowering <span className="text-warning">Futures</span> at Dream Technical College
              </h1>
              <p className="lead text-light mb-4">
                Premier technical education in Bardaghat, Nawalparasi offering industry-relevant
                courses in IT, language, and professional training.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a
                  href="/courses"
                  className="btn btn-primary btn-lg px-4 py-3 d-flex align-items-center"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  Explore Courses <FiArrowRight className="ms-2" />
                </a>
                <a
                  href="/admission"
                  className="btn btn-outline-light btn-lg px-4 py-3"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  Apply Now
                </a>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="hero-image-container">
                <img
                  src={homeHero}
                  alt="Dream Technical College Campus"
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
  );

  {/* Quick Stats */ }
  <section className="py-5 bg-light">
    <div className="container">
      <div className="row g-4">
        {stats.map((stat, index) => (
          <div className="col-md-3 col-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="text-center p-3">
              <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                {stat.icon}
              </div>
              <h3 className="text-primary fw-bold">{stat.value.toLocaleString()}+</h3>
              <p className="small text-dark mb-0">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Popular Courses */ }
  <section className="py-5">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <h2 className="fw-bold text-primary mb-3">Our Popular Courses</h2>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Industry-relevant programs designed for career success
        </p>
      </div>

      <div className="row g-4">
        {courses.map((course) => (
          <div key={course.id} className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={course.id * 100}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      <div className="text-center mt-5" data-aos="fade-up">
        <a href="/courses" className="btn btn-outline-primary btn-lg px-5">
          View All Courses
        </a>
      </div>
    </div>
  </section>

  {/* Why Choose Us */ }
  <section className="py-5 bg-light">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6" data-aos="fade-right">
          <img
            src={campusImg}
            alt="Dream Technical College Campus"
            className="img-fluid rounded-4 shadow"
          />
        </div>
        <div className="col-lg-6" data-aos="fade-left">
          <h2 className="fw-bold text-primary mb-4">Why Choose Dream Technical College?</h2>

          <div className="d-flex mb-4">
            <div className="icon-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-4 flex-shrink-0">
              <FiUser size={24} />
            </div>
            <div>
              <h4>Expert Faculty</h4>
              <p className="mb-0">
                Learn from industry professionals with years of teaching and practical experience.
              </p>
            </div>
          </div>

          <div className="d-flex mb-4">
            <div className="icon-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-4 flex-shrink-0">
              <FaChalkboardTeacher size={24} />
            </div>
            <div>
              <h4>Practical Learning</h4>
              <p className="mb-0">
                Hands-on training with modern equipment and industry-standard tools.
              </p>
            </div>
          </div>

          <div className="d-flex mb-4">
            <div className="icon-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-4 flex-shrink-0">
              <FiAward size={24} />
            </div>
            <div>
              <h4>Career Support</h4>
              <p className="mb-0">
                95% placement rate with dedicated career counseling and job placement assistance.
              </p>
            </div>
          </div>

          <div className="d-flex">
            <div className="icon-md bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-4 flex-shrink-0">
              <FiMapPin size={24} />
            </div>
            <div>
              <h4>Modern Campus</h4>
              <p className="mb-0">
                State-of-the-art facilities in a convenient Bardaghat location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* Upcoming Events */ }
  <section className="py-5">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <h2 className="fw-bold text-primary mb-3">Upcoming Events</h2>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Join our community events and learning opportunities
        </p>
      </div>

      <div className="row g-4">
        {events.map((event) => (
          <div key={event.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={event.id * 100}>
            <EventCard event={event} />
          </div>
        ))}
      </div>

      <div className="text-center mt-5" data-aos="fade-up">
        <a href="/events" className="btn btn-outline-primary btn-lg px-5">
          View All Events
        </a>
      </div>
    </div>
  </section>

  {/* Faculty Spotlight */ }
  <section className="py-5 bg-light">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <h2 className="fw-bold text-primary mb-3">Our Expert Faculty</h2>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Meet our team of dedicated educators and industry experts
        </p>
      </div>

      <FacultyCarousel />
    </div>
  </section>

  {/* Testimonials Section */ }
  <section className="py-5">
    <div className="container">
      <div className="text-center mb-5" data-aos="fade-up">
        <h2 className="fw-bold text-primary mb-3">What Our Students Say</h2>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
          Hear from our successful graduates about their experiences
        </p>
      </div>

      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* Group testimonials into chunks of 3 */}
          {testimonials.reduce((result, item, index) => {
            const chunkIndex = Math.floor(index / 3);

            if (!result[chunkIndex]) {
              result[chunkIndex] = [];
            }

            result[chunkIndex].push(item);
            return result;
          }, []).map((chunk, chunkIndex) => (
            <div
              key={chunkIndex}
              className={`carousel-item ${chunkIndex === 0 ? 'active' : ''}`}
            >
              <div className="row justify-content-center">
                {chunk.map((testimonial) => (
                  <div key={testimonial.id} className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body p-4 d-flex flex-column">
                        <div className="d-flex align-items-center mb-3">
                          <img
                            src={testimonial.photo}
                            alt={testimonial.studentName}
                            className="rounded-circle me-3"
                            width="60"
                            height="60"
                          />
                          <div>
                            <h5 className="mb-0">{testimonial.studentName}</h5>
                            <p className="text-muted mb-0">
                              {testimonial.courseName} · {testimonial.graduationYear}
                            </p>
                          </div>
                        </div>

                        <div className="mb-3 text-warning">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star${i < testimonial.rating ? '' : ' far'}`}
                            ></i>
                          ))}
                        </div>

                        <blockquote className="flex-grow-1">
                          <p className="fst-italic mb-0">"{testimonial.feedback}"</p>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bg-primary rounded-circle p-2" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#testimonialCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bg-primary rounded-circle p-2" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="text-center mt-5" data-aos="fade-up">
        <a href="/testimonials" className="btn btn-outline-primary btn-lg px-5">
          View All Testimonials
        </a>
      </div>
    </div>
  </section>

  {/* Call to Action */ }
  <section className="py-5 bg-primary text-white">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-8 mb-4 mb-lg-0" data-aos="fade-right">
          <h2 className="fw-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="lead mb-0">
            Join thousands of successful students who launched their careers with Dream Technical College.
          </p>
        </div>
        <div className="col-lg-4 text-lg-end" data-aos="fade-left">
          <a href="/admission" className="btn btn-light btn-lg px-5 py-3">
            Apply Now
          </a>
        </div>
      </div>
    </div>
  </section>

  {/* Contact Info */ }
  <section className="py-5">
    <div className="container">
      <div className="row g-4">
        <div className="col-md-4" data-aos="fade-up">
          <div className="text-center p-4">
            <div className="icon-xl bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
              <FiMapPin size={32} />
            </div>
            <h4 className="mb-3">Our Location</h4>
            <p className="mb-0">Bardaghat, Nawalparasi, Nepal</p>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
          <div className="text-center p-4">
            <div className="icon-xl bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
              <FiPhone size={32} />
            </div>
            <h4 className="mb-3">Contact Us</h4>
            <p className="mb-1">078-580873</p>
            <p className="mb-0">9857080873, 9857080872</p>
          </div>
        </div>

        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
          <div className="text-center p-4">
            <div className="icon-xl bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
              <FiMail size={32} />
            </div>
            <h4 className="mb-3">Email Us</h4>
            <p className="mb-0">info@dreamtech.edu.np</p>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div >
  );
};

export default Home;