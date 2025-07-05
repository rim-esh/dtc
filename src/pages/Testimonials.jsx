// src/pages/Testimonials.jsx
import React from 'react';
import Testimonial from '../components/Testimonial';

const Testimonials = () => {
  return (
    <main className="testimonials-page">
      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container py-4">
          <h1 className="display-4 fw-bold">Student Success Stories</h1>
          <p className="lead mb-0">
            Hear from our alumni about their Dream Tech College experience
          </p>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What Our Students Say</h2>
            <p className="text-muted">
              Over 10,000 success stories and counting
            </p>
          </div>
          <Testimonial showAll={true} />
        </div>
      </section>

      {/* Course-Specific Testimonials */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h3 className="fw-bold">Success by Program</h3>
            <p className="text-muted">
              See how specific programs transformed careers
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="p-4 bg-white rounded-3 shadow-sm">
                <h4>Computer Science</h4>
                <Testimonial courseName="Computer Science" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 bg-white rounded-3 shadow-sm">
                <h4>Data Science</h4>
                <Testimonial courseName="Data Science" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;