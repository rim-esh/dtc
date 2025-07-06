// src/pages/Courses.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { 
  FiBook, 
  FiClock, 
  FiDollarSign, 
  FiUser, 
  FiCheckCircle,
  FiSearch,
  FiArrowRight,
  FiStar,
  FiBarChart2,
  FiUsers
} from "react-icons/fi";
import { 
  FaChalkboardTeacher, 
  FaLaptopCode, 
  FaLanguage, 
  FaGraduationCap,
  FaChartLine,
  FaRegCalendarAlt
} from "react-icons/fa";
import "../assets/styles/Courses.css";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCourses, setVisibleCourses] = useState(6);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
  }, []);

  const categories = [
    { id: "all", name: "All Courses", icon: <FiBook /> },
    { id: "language", name: "Language", icon: <FaLanguage />, color: "#4c6ef5" },
    { id: "computer", name: "Computer", icon: <FaLaptopCode />, color: "#fa5252" },
    { id: "teacher", name: "Teacher Training", icon: <FaChalkboardTeacher />, color: "#40c057" },
    { id: "professional", name: "Professional", icon: <FaChartLine />, color: "#e64980" },
    { id: "entrance", name: "Entrance Prep", icon: <FaGraduationCap />, color: "#fab005" }
  ];

  const courses = [
    {
      id: 1,
      title: "Basic Computer Course",
      category: "computer",
      duration: "3 Months",
      fee: "NPR 15,000",
      instructor: "Rajesh Sharma",
      instructorImg: null,
      rating: 4.7,
      students: 120,
      description: "Fundamental computer skills including MS Office, internet, and basic troubleshooting.",
      features: ["Practical lab sessions", "Certification", "Job placement assistance"],
      syllabus: ["Computer Fundamentals", "MS Office Suite", "Internet & Email", "Basic Troubleshooting"],
      schedule: "Mon, Wed, Fri: 10AM - 12PM"
    },
    {
      id: 2,
      title: "IELTS Preparation",
      category: "language",
      duration: "2 Months",
      fee: "NPR 20,000",
      instructor: "Sarah Johnson",
      instructorImg: null,
      rating: 4.9,
      students: 95,
      description: "Comprehensive training for all IELTS test components with mock tests.",
      features: ["Expert native trainers", "Test strategies", "Study materials"],
      syllabus: ["Reading Techniques", "Writing Skills", "Listening Practice", "Speaking Mock Tests"],
      schedule: "Tue, Thu, Sat: 2PM - 4PM"
    },
    {
      id: 3,
      title: "Japanese Language (N5-N3)",
      category: "language",
      duration: "6 Months",
      fee: "NPR 25,000",
      instructor: "Kenji Tanaka",
      instructorImg: null,
      rating: 4.8,
      students: 85,
      description: "Beginner to intermediate Japanese language course with cultural immersion.",
      features: ["JLPT preparation", "Conversation practice", "Job interview training"],
      syllabus: ["Hiragana & Katakana", "Basic Grammar", "Kanji Characters", "Business Japanese"],
      schedule: "Mon-Fri: 4PM - 6PM"
    },
    {
      id: 4,
      title: "Accounting Training",
      category: "professional",
      duration: "4 Months",
      fee: "NPR 18,000",
      instructor: "Anita Gurung",
      instructorImg: null,
      rating: 4.6,
      students: 110,
      description: "Practical accounting skills using Tally and other accounting software.",
      features: ["Real-world projects", "Industry-recognized certification", "Internship opportunity"],
      syllabus: ["Financial Accounting", "Tally ERP9", "Taxation", "Payroll Management"],
      schedule: "Mon, Wed, Fri: 9AM - 11AM"
    },
    {
      id: 5,
      title: "Teacher Service Preparation",
      category: "teacher",
      duration: "5 Months",
      fee: "NPR 22,000",
      instructor: "Dr. Binod Poudel",
      instructorImg: null,
      rating: 4.9,
      students: 75,
      description: "Complete preparation for teacher service exams with subject specialization.",
      features: ["Subject experts", "Previous question analysis", "Mock tests"],
      syllabus: ["Educational Psychology", "Subject Specialization", "Pedagogy", "Exam Strategies"],
      schedule: "Tue, Thu, Sat: 1PM - 3PM"
    },
    {
      id: 6,
      title: "Medical Entrance Prep",
      category: "entrance",
      duration: "8 Months",
      fee: "NPR 35,000",
      instructor: "Dr. Sanjay Kumar",
      instructorImg: null,
      rating: 4.7,
      students: 150,
      description: "Comprehensive preparation for MBBS/BDS entrance examinations.",
      features: ["Expert faculty", "Regular tests", "Study materials"],
      syllabus: ["Physics", "Chemistry", "Biology", "Logical Reasoning"],
      schedule: "Daily: 7AM - 9AM"
    },
    {
      id: 7,
      title: "Korean Language (EPS TOPIK)",
      category: "language",
      duration: "4 Months",
      fee: "NPR 23,000",
      instructor: "Lee Min-ho",
      instructorImg: null,
      rating: 4.8,
      students: 65,
      description: "Specialized Korean language training for EPS-TOPIK exam and employment.",
      features: ["Focus on workplace Korean", "Cultural orientation", "Interview preparation"],
      syllabus: ["Hangul Basics", "Workplace Vocabulary", "TOPIK Exam Prep", "Cultural Etiquette"],
      schedule: "Mon, Tue, Thu: 6PM - 8PM"
    },
    {
      id: 8,
      title: "Advanced Web Development",
      category: "computer",
      duration: "6 Months",
      fee: "NPR 30,000",
      instructor: "Amit Chaudhary",
      instructorImg: null,
      rating: 4.9,
      students: 180,
      description: "Full-stack web development with React, Node.js, and MongoDB.",
      features: ["Project-based learning", "Portfolio development", "Freelance training"],
      syllabus: ["HTML/CSS", "JavaScript", "React.js", "Node.js", "MongoDB"],
      schedule: "Wed, Fri, Sun: 3PM - 5PM"
    }
  ];

  const filteredCourses = courses
    .filter(course => 
      activeCategory === "all" || course.category === activeCategory
    )
    .filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, visibleCourses);

  const loadMoreCourses = () => {
    setVisibleCourses(prev => prev + 3);
  };

  const openCourseModal = (course) => {
    setSelectedCourse(course);
  };

  const closeCourseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="courses-page">
      {/* Hero Section */}
      <section className="courses-hero">
        <div className="container">
          <div className="row min-vh-60 align-items-center">
            <div className="col-lg-6 text-white" data-aos="fade-right">
              <h1 className="display-4 fw-bold mb-4">Transform Your Future</h1>
              <p className="lead mb-4">
                Industry-relevant programs designed to launch your career in Nepal and abroad
              </p>
              <div className="d-flex gap-3">
                <a 
                  href="#course-list" 
                  className="btn btn-primary btn-lg px-4 py-3"
                  data-aos="zoom-in"
                >
                  Explore Programs <FiArrowRight className="ms-2" />
                </a>
                <a 
                  href="/admission" 
                  className="btn btn-outline-light btn-lg px-4 py-3"
                >
                  Apply Now
                </a>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="hero-circles">
                <div className="circle circle-1" data-aos="fade-left" data-aos-delay="200"></div>
                <div className="circle circle-2" data-aos="fade-left" data-aos-delay="400"></div>
                <div className="circle circle-3" data-aos="fade-left" data-aos-delay="600"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar bg-white py-4">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center gap-3">
                <div className="stat-icon bg-primary text-white">
                  <FiBook size={24} />
                </div>
                <div>
                  <div className="stat-value">24+</div>
                  <div className="stat-label">Courses</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center gap-3">
                <div className="stat-icon bg-success text-white">
                  <FiUsers size={24} />
                </div>
                <div>
                  <div className="stat-value">1,200+</div>
                  <div className="stat-label">Students</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center gap-3">
                <div className="stat-icon bg-warning text-white">
                  <FaChalkboardTeacher size={24} />
                </div>
                <div>
                  <div className="stat-value">35+</div>
                  <div className="stat-label">Instructors</div>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="d-flex align-items-center gap-3">
                <div className="stat-icon bg-info text-white">
                  <FiBarChart2 size={24} />
                </div>
                <div>
                  <div className="stat-value">98%</div>
                  <div className="stat-label">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Search & Filter */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search courses, topics, instructors..."
                  className="form-control form-control-lg ps-5"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="category-filter">
                <div className="d-flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`btn btn-outline-primary d-flex align-items-center ${
                        activeCategory === category.id ? "active" : ""
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                      style={activeCategory === category.id ? { 
                        backgroundColor: category.color,
                        borderColor: category.color,
                        color: 'white'
                      } : {}}
                    >
                      <span className="me-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course List */}
      <section id="course-list" className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">
              {activeCategory === "all" ? "All Programs" : 
               `${categories.find(c => c.id === activeCategory)?.name} Programs`}
            </h2>
            <p className="text-muted">
              {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} available
            </p>
          </div>

          {filteredCourses.length > 0 ? (
            <>
              <div className="row g-4">
                {filteredCourses.map((course, index) => (
                  <div 
                    className="col-md-6 col-lg-4" 
                    key={course.id}
                    data-aos="fade-up"
                    data-aos-delay={index % 3 * 100}
                  >
                    <div className="card course-card h-100 border-0 shadow-sm hover-lift" onClick={() => openCourseModal(course)}>
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle me-3">
                            {categories.find(c => c.id === course.category)?.icon}
                          </div>
                          <h5 className="mb-0">{course.title}</h5>
                        </div>
                        <p className="text-muted mb-4">{course.description}</p>
                        
                        <div className="course-meta mb-4">
                          <div className="d-flex justify-content-between mb-2">
                            <div className="d-flex align-items-center">
                              <FiClock className="text-muted me-2" />
                              <small>{course.duration}</small>
                            </div>
                            <div className="d-flex align-items-center">
                              <FiDollarSign className="text-muted me-2" />
                              <small>{course.fee}</small>
                            </div>
                          </div>
                          
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                              <FiUser className="text-muted me-2" />
                              <small>{course.instructor}</small>
                            </div>
                            <div className="d-flex align-items-center">
                              <FiStar className="text-warning me-1" />
                              <small>{course.rating}</small>
                            </div>
                          </div>
                        </div>

                        <div className="course-features mb-4">
                          <h6 className="mb-3">Key Features:</h6>
                          <ul className="list-unstyled">
                            {course.features.slice(0, 3).map((feature, i) => (
                              <li key={i} className="mb-2">
                                <FiCheckCircle className="text-success me-2" />
                                <small>{feature}</small>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="card-footer bg-transparent border-0 pt-0 pb-4 px-4">
                        <div className="btn btn-sm btn-primary w-100">
                          View Details
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCourses < courses.length && filteredCourses.length >= visibleCourses && (
                <div className="text-center mt-5" data-aos="fade-up">
                  <button 
                    className="btn btn-outline-primary px-4 py-2"
                    onClick={loadMoreCourses}
                  >
                    Load More Courses
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-5" data-aos="fade-up">
              <div className="alert alert-info">
                No courses found matching your criteria. Please try different filters.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Course Benefits */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Why Students Choose Us</h2>
            <p className="text-muted mx-auto" style={{maxWidth: "700px"}}>
              We provide more than just education - we offer career transformation
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: <FaChalkboardTeacher size={32} />,
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of practical experience"
              },
              {
                icon: <FaLaptopCode size={32} />,
                title: "Practical Training",
                description: "Hands-on learning with real-world projects and case studies"
              },
              {
                icon: <FaGraduationCap size={32} />,
                title: "Certification",
                description: "Receive recognized certificates upon course completion"
              },
              {
                icon: <FaChartLine size={32} />,
                title: "Career Support",
                description: "Job placement assistance and career counseling services"
              },
              {
                icon: <FaLanguage size={32} />,
                title: "Language Options",
                description: "Courses available in multiple languages for better understanding"
              },
              {
                icon: <FiUser size={32} />,
                title: "Personalized Attention",
                description: "Small batch sizes ensure individual focus from instructors"
              }
            ].map((item, index) => (
              <div className="col-md-4" key={index} data-aos="fade-up" data-aos-delay={index % 3 * 100}>
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body text-center p-4 p-xl-5">
                    <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
                      {item.icon}
                    </div>
                    <h5 className="mb-3">{item.title}</h5>
                    <p className="text-muted mb-0">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold mb-3">Student Success Stories</h2>
            <p className="opacity-75 mx-auto" style={{maxWidth: "700px"}}>
              Hear from our students who transformed their careers with our courses
            </p>
          </div>
          
          <div className="row g-4">
            {[
              {
                name: "Rajesh Thapa",
                course: "Web Development",
                quote: "The web development course gave me the skills to land my dream job at a tech startup. The instructors were incredibly supportive!",
                rating: 5
              },
              {
                name: "Priya Sharma",
                course: "IELTS Preparation",
                quote: "Thanks to the IELTS course, I scored 8.0 and got accepted into my dream university in Australia. Highly recommended!",
                rating: 5
              },
              {
                name: "Bikram Singh",
                course: "Japanese Language",
                quote: "The Japanese course helped me secure a job in Japan. The cultural immersion sessions were particularly valuable.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <div className="col-md-4" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="testimonial-card h-100 p-4 rounded-3">
                  <div className="d-flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < testimonial.rating ? "text-warning" : "text-white-50"} />
                ))}
              </div>
                  <p className="fst-italic mb-4">"{testimonial.quote}"</p>
                  <div className="d-flex align-items-center">
                    <div className="avatar-placeholder me-3"></div>
                    <div>
                      <h6 className="mb-0">{testimonial.name}</h6>
                      <small className="opacity-75">{testimonial.course} Graduate</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0" data-aos="fade-right">
              <h2 className="fw-bold mb-3">Ready to Transform Your Career?</h2>
              <p className="lead mb-0">
                Our education counselors can help you choose the perfect program for your career goals.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end" data-aos="fade-left">
              <a 
                href="/contact" 
                className="btn btn-light btn-lg px-4 py-3"
              >
                Speak with a Counselor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={closeCourseModal}>
          <div className="course-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCourseModal}>
              &times;
            </button>
            
            <div className="modal-header">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle me-3">
                  {categories.find(c => c.id === selectedCourse.category)?.icon}
                </div>
                <h3>{selectedCourse.title}</h3>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center">
                  <FiUser className="me-2" />
                  <span>Instructor: {selectedCourse.instructor}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FiClock className="me-2" />
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FiDollarSign className="me-2" />
                  <span>{selectedCourse.fee}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-8">
                  <h4>Course Description</h4>
                  <p>{selectedCourse.description}</p>
                  
                  <h4 className="mt-4">Course Syllabus</h4>
                  <ul className="syllabus-list">
                    {selectedCourse.syllabus.map((item, index) => (
                      <li key={index}>
                        <FiCheckCircle className="text-success me-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="mt-4">Schedule</h4>
                  <p>
                    <FaRegCalendarAlt className="me-2" />
                    {selectedCourse.schedule}
                  </p>
                </div>
                
                <div className="col-lg-4">
                  <div className="enrollment-card p-4 rounded-3">
                    <h4 className="mb-4">Enroll Now</h4>
                    
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span>Course Fee:</span>
                      <span className="fw-bold">{selectedCourse.fee}</span>
                    </div>
                    
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span>Duration:</span>
                      <span>{selectedCourse.duration}</span>
                    </div>
                    
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <span>Rating:</span>
                      <div className="d-flex align-items-center">
                        <FiStar className="text-warning me-1" />
                        <span>{selectedCourse.rating} ({selectedCourse.students} students)</span>
                      </div>
                    </div>
                    
                    <a 
                      href={`/admission?course=${encodeURIComponent(selectedCourse.title)}`} 
                      className="btn btn-primary w-100 mb-3"
                    >
                      Apply Now
                    </a>
                    
                    <a href="#course" className="btn btn-outline-primary w-100">
                      Download Syllabus
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;