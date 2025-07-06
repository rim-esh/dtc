// src/pages/Sitemap.jsx
import React from 'react';
import { FiMap, FiHome, FiBook, FiUsers, FiCalendar, FiFileText, FiMail } from 'react-icons/fi';
import "../assets/styles/Sitemap.css";

const Sitemap = () => {
  const siteSections = [
    {
      title: "Main Pages",
      icon: <FiHome />,
      pages: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" }
      ]
    },
    {
      title: "Academic Programs",
      icon: <FiBook />,
      pages: [
        { name: "All Courses", path: "/courses" },
        { name: "Language Programs", path: "/courses/languages" },
        { name: "IT & Technology", path: "/courses/it" },
        { name: "Professional Training", path: "/courses/professional" },
        { name: "Admissions", path: "/admission" },
        { name: "Certification Verification", path: "/certificate-verification" }
      ]
    },
    {
      title: "Campus Life",
      icon: <FiUsers />,
      pages: [
        { name: "Faculty & Staff", path: "/faculty" },
        { name: "Student Testimonials", path: "/testimonials" },
        { name: "Gallery", path: "/gallery" },
        { name: "Student Resources", path: "/resources" }
      ]
    },
    {
      title: "Events & News",
      icon: <FiCalendar />,
      pages: [
        { name: "Upcoming Events", path: "/events" },
        { name: "College News", path: "/blog" },
        { name: "Publications", path: "/publication" }
      ]
    },
    {
      title: "Legal & Policies",
      icon: <FiFileText />,
      pages: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "FAQs", path: "/faqs" }
      ]
    },
    {
      title: "Support",
      icon: <FiMail />,
      pages: [
        { name: "Contact Us", path: "/contact" },
        { name: "Help Center", path: "/support" },
        { name: "Feedback Form", path: "/feedback" }
      ]
    }
  ];

  return (
    <div className="sitemap">
      {/* Hero Section */}
      <section className="sitemap-hero bg-primary text-white">
        <div className="container">
          <div className="row min-vh-40 align-items-center text-center py-5">
            <div className="col-12">
              <FiMap className="hero-icon mb-3" size={48} />
              <h1 className="display-4 fw-bold mb-3">Website Sitemap</h1>
              <p className="lead mb-0">
                Navigate our website with ease
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4">
                  <div className="alert alert-info mb-0">
                    <p className="text-success mb-0">
                      <strong>Quick Search:</strong> Use our search feature at the top right of any page 
                      to find content quickly. Can't find what you're looking for? 
                      <a href="/contact" className="alert-link ms-1">Contact us</a>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                {siteSections.map((section, index) => (
                  <div className="col-md-6 col-lg-4" key={index}>
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-header bg-primary text-white">
                        <h3 className="d-flex align-items-center mb-0">
                          <span className="section-icon me-2">{section.icon}</span>
                          {section.title}
                        </h3>
                      </div>
                      <div className="card-body">
                        <ul className="sitemap-list">
                          {section.pages.map((page, pageIndex) => (
                            <li key={pageIndex}>
                              <a href={page.path} className="d-flex align-items-center">
                                <span className="bullet me-2">•</span>
                                {page.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card border-0 shadow-sm mt-4">
                <div className="card-body p-4">
                  <h3 className="mb-4 text-center">Additional Resources</h3>
                  <div className="row g-3">
                    {[
                      { name: "Academic Calendar", path: "/calendar" },
                      { name: "Student Portal", path: "/portal", external: true },
                      { name: "Career Opportunities", path: "/careers" },
                      { name: "Alumni Network", path: "/alumni" },
                      { name: "Library Resources", path: "/library" },
                      { name: "Download Center", path: "/downloads" }
                    ].map((resource, idx) => (
                      <div className="col-md-4 col-6" key={idx}>
                        <a 
                          href={resource.path} 
                          className="btn btn-outline-primary w-100"
                          target={resource.external ? "_blank" : "_self"}
                          rel={resource.external ? "noreferrer" : ""}
                        >
                          {resource.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sitemap;