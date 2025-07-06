// src/pages/Faculty.jsx
import React, { useState } from 'react';
import { 
  FaChalkboardTeacher, FaGraduationCap, FaBookOpen, 
  FaLaptopCode, FaChartLine, FaLightbulb, FaQuoteLeft, 
  FaLinkedinIn, FaTwitter, FaEnvelope
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import "../assets/styles/Faculty.css";

const FacultyPage = () => {
  const [activeDept, setActiveDept] = useState(1);
  
  const departments = [
    {
      id: 1,
      name: "Computer Science",
      icon: <FaLaptopCode className="text-primary" />,
      description: "Our computer science faculty are industry pioneers and academic leaders specializing in cutting-edge technologies.",
      faculty: [
        { 
          id: 1, 
          name: "Dr. Sarah Johnson", 
          position: "Head of Department", 
          expertise: "AI & Machine Learning", 
          experience: "15 years", 
          description: "Former Google AI researcher with multiple publications in top journals. PhD in Computer Science from MIT.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:sarah.johnson@dreamtech.edu.np"
          }
        },
        { 
          id: 2, 
          name: "Prof. Michael Chen", 
          position: "Senior Lecturer", 
          expertise: "Cloud Computing", 
          experience: "12 years", 
          description: "AWS certified solutions architect with industry experience. Developed scalable cloud solutions for Fortune 500 companies.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:michael.chen@dreamtech.edu.np"
          }
        },
        { 
          id: 3, 
          name: "Dr. Priya Sharma", 
          position: "Associate Professor", 
          expertise: "Cybersecurity", 
          experience: "10 years", 
          description: "Cybersecurity consultant for government agencies and private sector. Authored two textbooks on network security.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:priya.sharma@dreamtech.edu.np"
          }
        }
      ]
    },
    {
      id: 2,
      name: "Business Management",
      icon: <FaChartLine className="text-primary" />,
      description: "Our business faculty combine academic rigor with real-world corporate experience to prepare future leaders.",
      faculty: [
        { 
          id: 1, 
          name: "Dr. Robert Williams", 
          position: "Professor", 
          expertise: "Strategic Management", 
          experience: "20 years", 
          description: "Former CEO with Fortune 500 company experience. Specializes in corporate strategy and organizational development.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:robert.williams@dreamtech.edu.np"
          }
        },
        { 
          id: 2, 
          name: "Prof. Emma Rodriguez", 
          position: "Senior Lecturer", 
          expertise: "Marketing Analytics", 
          experience: "8 years", 
          description: "Digital marketing expert with focus on data-driven strategies. Developed award-winning campaigns for global brands.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:emma.rodriguez@dreamtech.edu.np"
          }
        },
        { 
          id: 3, 
          name: "Dr. James Wilson", 
          position: "Associate Professor", 
          expertise: "Entrepreneurship", 
          experience: "12 years", 
          description: "Founder of three successful startups turned educator. Focuses on innovation and venture capital strategies.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:james.wilson@dreamtech.edu.np"
          }
        }
      ]
    },
    {
      id: 3,
      name: "Engineering",
      icon: <FaLightbulb className="text-primary" />,
      description: "Our engineering faculty bridge theoretical knowledge with practical application across diverse specializations.",
      faculty: [
        { 
          id: 1, 
          name: "Dr. Lisa Anderson", 
          position: "Head of Department", 
          expertise: "Electrical Engineering", 
          experience: "18 years", 
          description: "Holder of 7 patents in renewable energy technologies. Leads research in sustainable power solutions.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:lisa.anderson@dreamtech.edu.np"
          }
        },
        { 
          id: 2, 
          name: "Prof. David Kim", 
          position: "Senior Lecturer", 
          expertise: "Mechanical Engineering", 
          experience: "14 years", 
          description: "Former NASA engineer specializing in propulsion systems. Contributed to Mars exploration projects.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:david.kim@dreamtech.edu.np"
          }
        },
        { 
          id: 3, 
          name: "Dr. Maria Garcia", 
          position: "Associate Professor", 
          expertise: "Civil Engineering", 
          experience: "11 years", 
          description: "Infrastructure consultant for major international projects. Expert in earthquake-resistant design.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:maria.garcia@dreamtech.edu.np"
          }
        }
      ]
    },
    {
      id: 4,
      name: "Language Studies",
      icon: <FaBookOpen className="text-primary" />,
      description: "Our language faculty bring global perspectives and cultural insights to language education.",
      faculty: [
        { 
          id: 1, 
          name: "Prof. Thomas Müller", 
          position: "Department Chair", 
          expertise: "Linguistics", 
          experience: "16 years", 
          description: "Multilingual expert with publications on language acquisition. Focuses on communicative teaching methods.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:thomas.muller@dreamtech.edu.np"
          }
        },
        { 
          id: 2, 
          name: "Dr. Aisha Khan", 
          position: "Senior Lecturer", 
          expertise: "Applied Linguistics", 
          experience: "9 years", 
          description: "Specialist in bilingual education and language assessment. Developed our TOEFL preparation curriculum.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:aisha.khan@dreamtech.edu.np"
          }
        },
        { 
          id: 3, 
          name: "Prof. Kenji Tanaka", 
          position: "Associate Professor", 
          expertise: "Japanese Studies", 
          experience: "13 years", 
          description: "Native speaker with expertise in Japanese business communication. Former interpreter for diplomatic missions.",
          social: {
            linkedin: "#",
            twitter: "#",
            email: "mailto:kenji.tanaka@dreamtech.edu.np"
          }
        }
      ]
    }
  ];

  const testimonials = [
    {
      id: 1,
      content: "The faculty at Dream Technical College transformed my approach to problem-solving. Their real-world experience brings concepts to life in ways textbooks never could.",
      author: "Rajesh Thapa",
      position: "Software Engineer, Tech Innovations Ltd",
      course: "BSc Computer Science, 2020"
    },
    {
      id: 2,
      content: "What sets this college apart is the accessibility of professors. They genuinely care about student success and make time for mentoring outside the classroom.",
      author: "Priya Sharma",
      position: "Marketing Director, Global Solutions",
      course: "MBA, 2019"
    },
    {
      id: 3,
      content: "The engineering faculty don't just teach theory—they show us how to apply it. Their industry connections led to my internship at a leading construction firm.",
      author: "Bikram Singh",
      position: "Civil Engineer, Nepal Infrastructure",
      course: "BE Civil Engineering, 2021"
    }
  ];

  return (
    <div className="faculty-page">
      {/* Hero Section */}
      <section className="faculty-hero-section bg-dark">
        <div className="container">
          <div className="row min-vh-80 align-items-center py-5">
            <div className="col-lg-7 text-white py-5 position-relative z-1">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="faculty-accent-line"></div>
                <span className="text-uppercase faculty-letter-spacing fw-medium">Distinguished Faculty</span>
              </div>
              <h1 className="display-2 fw-bold mb-4">Shaping Minds, Building Futures</h1>
              <p className="faculty-lead-opacity mb-5">
                Meet the brilliant scholars and industry experts who make Dream Technical College 
                a premier institution for technical education in Nepal.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#faculty-section" className="btn btn-primary btn-lg px-4 py-3">
                  Meet Our Faculty
                </a>
                <a href="/admission" className="btn btn-outline-light btn-lg px-4 py-3">
                  Join Our Community
                </a>
              </div>
            </div>
            <div className="col-lg-5 position-relative">
              <div className="faculty-hero-image">
                <div className="faculty-main-image"></div>
                <div className="faculty-badge-card bg-primary text-white">
                  <FaGraduationCap className="me-2" />
                  <span>98% Faculty with Advanced Degrees</span>
                </div>
                <div className="faculty-pattern-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="faculty-stats-section py-6 bg-light">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-md-3 col-6">
              <div className="faculty-stat-card text-center p-4">
                <div className="faculty-stat-icon bg-primary bg-opacity-10">
                  <FaGraduationCap className="text-primary" />
                </div>
                <div className="display-4 fw-bold text-primary mt-3">98%</div>
                <div className="text-dark fw-medium mt-2">Faculty with PhDs</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="faculty-stat-card text-center p-4">
                <div className="faculty-stat-icon bg-primary bg-opacity-10">
                  <FaChalkboardTeacher className="text-primary" />
                </div>
                <div className="display-4 fw-bold text-primary mt-3">15+</div>
                <div className="text-dark fw-medium mt-2">Avg. Years Experience</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="faculty-stat-card text-center p-4">
                <div className="faculty-stat-icon bg-primary bg-opacity-10">
                  <FaBookOpen className="text-primary" />
                </div>
                <div className="display-4 fw-bold text-primary mt-3">85%</div>
                <div className="text-dark fw-medium mt-2">Industry Professionals</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="faculty-stat-card text-center p-4">
                <div className="faculty-stat-icon bg-primary bg-opacity-10">
                  <FaLightbulb className="text-primary" />
                </div>
                <div className="display-4 fw-bold text-primary mt-3">1:15</div>
                <div className="text-dark fw-medium mt-2">Student-Faculty Ratio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Navigation */}
      <section id="faculty-section" className="faculty-dept-section py-6">
        <div className="container">
          <div className="text-center mb-6">
            <h2 className="display-5 fw-bold mb-3">Academic Departments</h2>
            <p className="text-muted mx-auto mb-0 faculty-max-width">
              Explore our distinguished faculty members by department
            </p>
          </div>
          
          <div className="faculty-dept-nav mb-6">
            <div className="faculty-dept-container">
              {departments.map(dept => (
                <button
                  key={dept.id}
                  className={`faculty-dept-item ${activeDept === dept.id ? 'active' : ''}`}
                  onClick={() => setActiveDept(dept.id)}
                >
                  <span className="faculty-dept-icon">{dept.icon}</span>
                  <span className="faculty-dept-text">{dept.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Department Faculty */}
          {departments.filter(dept => dept.id === activeDept).map(department => (
            <div key={department.id} className="faculty-dept-content">
              <div className="row align-items-center mb-5">
                <div className="col-lg-8">
                  <h3 className="fw-bold mb-3">{department.name} Department</h3>
                  <p className="text-muted mb-0">{department.description}</p>
                </div>
                <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                  <a href="#facult" className="btn btn-outline-primary">
                    View All Faculty <FiExternalLink className="ms-2" />
                  </a>
                </div>
              </div>
              
              <div className="row g-5">
                {department.faculty.map(member => (
                  <div key={member.id} className="col-lg-4 col-md-6">
                    <div className="faculty-member-card">
                      <div className="faculty-card-header">
                        <div className="faculty-card-image">
                          <div className="faculty-image-placeholder"></div>
                          <div className="faculty-social-links">
                            <a href={member.social.linkedin} className="faculty-social-link">
                              <FaLinkedinIn />
                            </a>
                            <a href={member.social.twitter} className="faculty-social-link">
                              <FaTwitter />
                            </a>
                            <a href={member.social.email} className="faculty-social-link">
                              <FaEnvelope />
                            </a>
                          </div>
                        </div>
                        <div className="faculty-card-info">
                          <h4 className="mb-1">{member.name}</h4>
                          <p className="text-primary fw-medium mb-2">{member.position}</p>
                          <div className="faculty-expertise-badge">
                            {member.expertise}
                          </div>
                        </div>
                      </div>
                      <div className="faculty-card-body">
                        <div className="faculty-experience-badge">
                          <span>{member.experience} Experience</span>
                        </div>
                        <p className="mb-4">{member.description}</p>
                        <a href="#facult" className="btn btn-outline-primary w-100">
                          View Full Profile
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="faculty-philosophy-section py-6 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <div className="faculty-philosophy-image">
                <div className="faculty-philo-main-image"></div>
                <div className="faculty-philo-badge bg-primary text-white">
                  <FaChalkboardTeacher className="me-2" />
                  <span>Student-Centered Learning</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="faculty-accent-line"></div>
                <span className="text-uppercase faculty-letter-spacing fw-medium">Our Approach</span>
              </div>
              <h2 className="display-5 fw-bold mb-4">Teaching Philosophy</h2>
              
              <div className="faculty-philosophy-points">
                <div className="faculty-point">
                  <div className="faculty-point-icon bg-primary bg-opacity-10">
                    <div className="faculty-point-number">01</div>
                  </div>
                  <div className="faculty-point-content">
                    <h5>Practical Application</h5>
                    <p className="mb-0">Emphasis on real-world projects and industry-relevant skills development</p>
                  </div>
                </div>
                
                <div className="faculty-point">
                  <div className="faculty-point-icon bg-primary bg-opacity-10">
                    <div className="faculty-point-number">02</div>
                  </div>
                  <div className="faculty-point-content">
                    <h5>Mentorship Focus</h5>
                    <p className="mb-0">Personalized guidance to help each student achieve their potential</p>
                  </div>
                </div>
                
                <div className="faculty-point">
                  <div className="faculty-point-icon bg-primary bg-opacity-10">
                    <div className="faculty-point-number">03</div>
                  </div>
                  <div className="faculty-point-content">
                    <h5>Innovative Thinking</h5>
                    <p className="mb-0">Encouraging creativity, critical analysis, and problem-solving skills</p>
                  </div>
                </div>
                
                <div className="faculty-point">
                  <div className="faculty-point-icon bg-primary bg-opacity-10">
                    <div className="faculty-point-number">04</div>
                  </div>
                  <div className="faculty-point-content">
                    <h5>Continuous Learning</h5>
                    <p className="mb-0">Faculty committed to ongoing professional development and research</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="faculty-testimonials-section py-6 bg-primary text-white">
        <div className="container">
          <div className="text-center mb-6">
            <h2 className="display-5 fw-bold mb-3">Student & Alumni Experiences</h2>
            <p className="faculty-opacity-75 mx-auto mb-0 faculty-max-width">
              Hear what our community says about learning from our distinguished faculty
            </p>
          </div>
          
          <div className="row g-4">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="col-md-4">
                <div className="faculty-testimonial-card h-100">
                  <div className="faculty-quote-icon">
                    <FaQuoteLeft />
                  </div>
                  <p className="mb-4">"{testimonial.content}"</p>
                  <div className="faculty-testimonial-author">
                    <h6 className="mb-1 fw-bold">{testimonial.author}</h6>
                    <p className="small mb-1 faculty-opacity-75">{testimonial.position}</p>
                    <p className="small mb-0">{testimonial.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="faculty-cta-section py-6 bg-dark">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 text-white mb-5 mb-lg-0">
              <h2 className="display-5 fw-bold mb-3">Join Our Academic Community</h2>
              <p className="faculty-opacity-75 mb-0">
                Ready to learn from industry leaders and academic experts? Apply now and become 
                part of the Dream Technical College family.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="d-flex flex-column flex-lg-row gap-3 justify-content-lg-end">
                <a href="/admission" className="btn btn-primary btn-lg px-4 py-3">
                  Apply Now
                </a>
                <a href="/contact" className="btn btn-outline-light btn-lg px-4 py-3">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;