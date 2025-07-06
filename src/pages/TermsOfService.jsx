// src/pages/TermsOfService.jsx
import React from 'react';
import { FiFileText } from 'react-icons/fi';
import "../assets/styles/TermsOfService.css";

const TermsOfService = () => {
  return (
    <div className="terms-of-service">
      {/* Hero Section */}
      <section className="terms-hero bg-primary text-white">
        <div className="container">
          <div className="row min-vh-40 align-items-center text-center py-5">
            <div className="col-12">
              <FiFileText className="hero-icon mb-3" size={48} />
              <h1 className="display-4 fw-bold mb-3">Terms of Service</h1>
              <p className="lead mb-0">
                Effective: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <div className="content-section">
                    <h2 className="mb-4">1. Acceptance of Terms</h2>
                    <p className="text-dark">
                      By accessing or using Dream Technical College's website, services, or facilities, 
                      you agree to be bound by these Terms of Service. If you do not agree, do not use our services.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">2. Services Provided</h2>
                    <p className="text-dark">
                      Dream Technical College provides technical education services including:
                    </p>
                    <ul>
                      <li>Academic courses and certifications</li>
                      <li>Training programs and workshops</li>
                      <li>Career counseling and placement services</li>
                      <li>Online learning resources</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">3. Enrollment and Payments</h2>
                    <ul>
                      <li>Enrollment is complete only after full payment or approved payment plan</li>
                      <li>Course fees are non-refundable after the first week of classes</li>
                      <li>We reserve the right to cancel courses with insufficient enrollment</li>
                      <li>Payment plans must be adhered to as scheduled</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">4. Student Conduct</h2>
                    <p className="text-dark">
                      Students must adhere to our code of conduct:
                    </p>
                    <ul>
                      <li>Respect for staff, faculty, and fellow students</li>
                      <li>Academic integrity (no plagiarism or cheating)</li>
                      <li>Attendance requirements as specified per course</li>
                      <li>Proper use of college facilities and equipment</li>
                      <li>Compliance with all safety regulations</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">5. Intellectual Property</h2>
                    <p className="text-dark">
                      All course materials, including but not limited to lectures, presentations, 
                      documents, and online content, are the property of Dream Technical College 
                      and may not be reproduced or distributed without permission.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">6. Limitation of Liability</h2>
                    <p className="text-dark">
                      Dream Technical College shall not be liable for any indirect, incidental, 
                      special, consequential, or punitive damages, including lost profits, 
                      arising from your use of our services.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">7. Termination</h2>
                    <p className="text-dark">
                      We may terminate or suspend access to our services immediately, without 
                      prior notice, for conduct that violates these Terms or applicable laws.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">8. Changes to Terms</h2>
                    <p className="text-dark">
                      We reserve the right to modify these Terms at any time. Continued use of 
                      our services after changes constitutes acceptance of the new Terms.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">9. Governing Law</h2>
                    <p className="text-dark">
                      These Terms shall be governed by the laws of Nepal without regard to its 
                      conflict of law provisions.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">10. Contact Information</h2>
                    <p className="text-dark">
                      For questions about these Terms, contact us at:
                      <br />
                      legal@dreamtech.edu.np
                      <br />
                      Dream Technical College, Bardaghat, Nawalparasi, Nepal
                    </p>
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

export default TermsOfService;