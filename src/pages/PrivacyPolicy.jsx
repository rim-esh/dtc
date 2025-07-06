// src/pages/PrivacyPolicy.jsx
import React from 'react';
import { FiShield } from 'react-icons/fi';
import "../assets/styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      {/* Hero Section */}
      <section className="privacy-hero bg-primary text-white">
        <div className="container">
          <div className="row min-vh-40 align-items-center text-center py-5">
            <div className="col-12">
              <FiShield className="hero-icon mb-3" size={48} />
              <h1 className="display-4 fw-bold mb-3">Privacy Policy</h1>
              <p className="lead mb-0">
                Last Updated: {new Date().toLocaleDateString('en-US', { 
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
                    <h2 className="mb-4">Introduction</h2>
                    <p className="text-dark">
                      Dream Technical College ("we," "our," or "us") is committed to protecting your privacy. 
                      This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                      when you visit our website dtc.edu.np or use our services.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">Information We Collect</h2>
                    <p className="text-dark">We may collect information about you in a variety of ways:</p>
                    <ul>
                      <li><strong>Personal Data:</strong> Name, email, phone number, address, payment information</li>
                      <li><strong>Derivative Data:</strong> IP address, browser type, access times</li>
                      <li><strong>Academic Data:</strong> Course enrollments, grades, certifications</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">Use of Your Information</h2>
                    <p className="text-dark">We use the information we collect to:</p>
                    <ul>
                      <li>Process applications and enrollments</li>
                      <li>Provide academic services and support</li>
                      <li>Send administrative information</li>
                      <li>Improve our website and services</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">Data Security</h2>
                    <p className="text-dark">
                      We implement security measures designed to protect your information from unauthorized access. 
                      These include encryption, secure servers, and access controls. However, no electronic transmission 
                      over the internet is 100% secure.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">Third-Party Services</h2>
                    <p className="text-dark">
                      We may share information with third parties that perform services for us, such as payment processing, 
                      data analysis, email delivery, hosting services, and customer service. These third parties are 
                      prohibited from using your information except to provide these services.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">Your Rights</h2>
                    <p className="text-dark">You have the right to:</p>
                    <ul>
                      <li>Request access to your personal data</li>
                      <li>Request correction of inaccurate data</li>
                      <li>Request deletion of your data</li>
                      <li>Object to processing of your data</li>
                    </ul>
                    <p className="text-dark">To exercise these rights, contact us at info@dtc.edu.np</p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">Policy Changes</h2>
                    <p className="text-dark">
                      We may update this Privacy Policy periodically. We will notify you of any changes by posting 
                      the new Privacy Policy on this page and updating the "Last Updated" date.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2 className="mb-4">Contact Us</h2>
                    <p className="text-dark">
                      If you have questions about this Privacy Policy, please contact us at:
                      <br />
                      info@dtc.edu.np
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

export default PrivacyPolicy;