// src/components/Testimonial.jsx
import React from 'react';
import testimonials from './testimonialData';

const Testimonial = ({ courseName, showAll = false }) => {
  // Filter testimonials based on props
  const filteredTestimonials = courseName
    ? testimonials.filter(testimonial => 
        testimonial.courseName.toLowerCase().includes(courseName.toLowerCase()))
    : testimonials;

  // If showAll is false, show only 3 testimonials
  const displayedTestimonials = showAll 
    ? filteredTestimonials 
    : filteredTestimonials.slice(0, 3);

  // Star rating component
  const renderStars = (rating) => {
    return (
      <div className="d-flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={i < rating ? "#FFD700" : "#E0E0E0"}
            className="me-1"
            viewBox="0 0 16 16"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        {displayedTestimonials.length > 0 ? (
          displayedTestimonials.map(testimonial => (
            <div key={testimonial.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.studentName}
                      className="rounded-circle me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <h5 className="card-title mb-0">{testimonial.studentName}</h5>
                      <div className="d-flex flex-wrap">
                        <span className="badge bg-primary me-2 mb-1">{testimonial.courseName}</span>
                        <span className="text-muted small">Class of {testimonial.graduationYear}</span>
                      </div>
                    </div>
                  </div>
                  
                  {renderStars(testimonial.rating)}
                  
                  <p className="card-text mt-3 mb-0">
                    <i className="fas fa-quote-left me-2 text-muted"></i>
                    {testimonial.feedback}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="alert alert-info">
              No testimonials found for this course. Check back later!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;