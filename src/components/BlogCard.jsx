import React from 'react';
import { FiCalendar, FiUser, FiClock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card blog-card border-0 shadow-sm h-100">
      <div className="row g-0">
        <div className="col-md-4">
          <div className={`blog-image ${blog.image}`}></div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2 mb-3">
              <span className="badge bg-primary">{blog.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
              {blog.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="badge bg-light text-dark">#{tag}</span>
              ))}
            </div>
            
            <h5 className="card-title mb-3">{blog.title}</h5>
            <p className="card-text text-muted mb-4">{blog.excerpt}</p>
            
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-wrap gap-3 text-muted small">
                <span className="d-flex align-items-center">
                  <FiUser className="me-1" /> {blog.author}
                </span>
                <span className="d-flex align-items-center">
                  <FiCalendar className="me-1" /> {formatDate(blog.date)}
                </span>
                <span className="d-flex align-items-center">
                  <FiClock className="me-1" /> {blog.readTime} min read
                </span>
              </div>
              
              < Link to={`/blog/${blog.title.toLowerCase().split(' ').join('-')}`} className="btn btn-sm btn-outline-primary d-flex align-items-center">
                Read More <FiArrowRight className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;