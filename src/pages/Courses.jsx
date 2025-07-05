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
  // FiFilter,
  FiArrowRight
} from "react-icons/fi";
import { 
  FaChalkboardTeacher, 
  FaLaptopCode, 
  FaLanguage, 
  FaGraduationCap,
  FaChartLine
} from "react-icons/fa";
// import courseHero from "../assets/images/about-hero-bg.jpg";
import "../assets/styles/Courses.css";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCourses, setVisibleCourses] = useState(6);

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
  }, []);

  const categories = [
    { id: "all", name: "All Courses", icon: <FiBook /> },
    { id: "language", name: "Language", icon: <FaLanguage /> },
    { id: "computer", name: "Computer", icon: <FaLaptopCode /> },
    { id: "teacher", name: "Teacher Training", icon: <FaChalkboardTeacher /> },
    { id: "professional", name: "Professional", icon: <FaChartLine /> },
    { id: "entrance", name: "Entrance Prep", icon: <FaGraduationCap /> }
  ];

  const courses = [
    {
      id: 1,
      title: "Basic Computer Course",
      category: "computer",
      duration: "3 Months",
      fee: "NPR 15,000",
      instructor: "Rajesh Sharma",
      description: "Fundamental computer skills including MS Office, internet, and basic troubleshooting.",
      features: ["Practical lab sessions", "Certification", "Job placement assistance"]
    },
    {
      id: 2,
      title: "IELTS Preparation",
      category: "language",
      duration: "2 Months",
      fee: "NPR 20,000",
      instructor: "Sarah Johnson",
      description: "Comprehensive training for all IELTS test components with mock tests.",
      features: ["Expert native trainers", "Test strategies", "Study materials"]
    },
    {
      id: 3,
      title: "Japanese Language (N5-N3)",
      category: "language",
      duration: "6 Months",
      fee: "NPR 25,000",
      instructor: "Kenji Tanaka",
      description: "Beginner to intermediate Japanese language course with cultural immersion.",
      features: ["JLPT preparation", "Conversation practice", "Job interview training"]
    },
    {
      id: 4,
      title: "Accounting Training",
      category: "professional",
      duration: "4 Months",
      fee: "NPR 18,000",
      instructor: "Anita Gurung",
      description: "Practical accounting skills using Tally and other accounting software.",
      features: ["Real-world projects", "Industry-recognized certification", "Internship opportunity"]
    },
    {
      id: 5,
      title: "Teacher Service Preparation",
      category: "teacher",
      duration: "5 Months",
      fee: "NPR 22,000",
      instructor: "Dr. Binod Poudel",
      description: "Complete preparation for teacher service exams with subject specialization.",
      features: ["Subject experts", "Previous question analysis", "Mock tests"]
    },
    {
      id: 6,
      title: "Medical Entrance Prep",
      category: "entrance",
      duration: "8 Months",
      fee: "NPR 35,000",
      instructor: "Dr. Sanjay Kumar",
      description: "Comprehensive preparation for MBBS/BDS entrance examinations.",
      features: ["Expert faculty", "Regular tests", "Study materials"]
    },
    {
      id: 7,
      title: "Korean Language (EPS TOPIK)",
      category: "language",
      duration: "4 Months",
      fee: "NPR 23,000",
      instructor: "Lee Min-ho",
      description: "Specialized Korean language training for EPS-TOPIK exam and employment.",
      features: ["Focus on workplace Korean", "Cultural orientation", "Interview preparation"]
    },
    {
      id: 8,
      title: "Advanced Web Development",
      category: "computer",
      duration: "6 Months",
      fee: "NPR 30,000",
      instructor: "Amit Chaudhary",
      description: "Full-stack web development with React, Node.js, and MongoDB.",
      features: ["Project-based learning", "Portfolio development", "Freelance training"]
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

  return (
    <div className="courses-page">
      {/* Hero Section */}
      <section className="courses-hero">
        <div className="container">
          <div className="row min-vh-60 align-items-center">
            <div className="col-lg-6 text-white" data-aos="fade-right">
              <h1 className="display-4 fw-bold mb-4">Our Courses</h1>
              <p className="lead mb-4">
                Industry-relevant programs designed to launch your career in Nepal and abroad
              </p>
              <a 
                href="#course-list" 
                className="btn btn-primary btn-lg px-4 py-3"
                data-aos="zoom-in"
              >
                Explore Programs <FiArrowRight className="ms-2" />
              </a>
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
                  placeholder="Search courses..."
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
                    <div className="card course-card h-100 border-0 shadow-sm hover-lift">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle me-3">
                            {categories.find(c => c.id === course.category)?.icon}
                          </div>
                          <h5 className="mb-0">{course.title}</h5>
                        </div>
                        <p className="text-muted mb-4">{course.description}</p>
                        
                        <div className="course-meta mb-4">
                          <div className="d-flex align-items-center mb-2">
                            <FiClock className="text-muted me-2" />
                            <small>{course.duration}</small>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <FiDollarSign className="text-muted me-2" />
                            <small>{course.fee}</small>
                          </div>
                          <div className="d-flex align-items-center">
                            <FiUser className="text-muted me-2" />
                            <small>Instructor: {course.instructor}</small>
                          </div>
                        </div>

                        <div className="course-features mb-4">
                          <h6 className="mb-3">Course Features:</h6>
                          <ul className="list-unstyled">
                            {course.features.map((feature, i) => (
                              <li key={i} className="mb-2">
                                <FiCheckCircle className="text-success me-2" />
                                <small>{feature}</small>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="card-footer bg-transparent border-0 pt-0 pb-4 px-4">
                        <a 
                          href={`/admission?course=${encodeURIComponent(course.title)}`} 
                          className="btn btn-sm btn-primary w-100"
                        >
                          Apply Now
                        </a>
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
            <h2 className="fw-bold text-primary mb-3">Why Our Courses Stand Out</h2>
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

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0" data-aos="fade-right">
              <h2 className="fw-bold mb-3">Still Deciding on a Course?</h2>
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
    </div>
  );
};

export default Courses;