// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import collegeLogo from '../assets/images/about-hero-bg.jpg'; // Replace with your logo 

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="register-page d-flex align-items-center min-vh-100 bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-white border-0 pt-4">
                <div className="text-center mb-4">
                  <Link to="/">
                    <img 
                      src={collegeLogo} 
                      alt="Dream Technical College" 
                      className="img-fluid mb-3"
                      style={{ maxHeight: '70px' }}
                    />
                  </Link>
                  <h2 className="fw-bold text-primary">Create Your Account</h2>
                  <p className="text-muted">Join thousands of students at Dream Technical College</p>
                </div>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {success ? (
                  <div className="text-center py-5">
                    <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                      </svg>
                    </div>
                    <h3 className="fw-bold mb-3">Registration Successful!</h3>
                    <p className="text-muted mb-4">
                      Your account has been created successfully. You'll be redirected to login shortly.
                    </p>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <div className="me-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                          </svg>
                        </div>
                        <div>{error}</div>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="fullName" className="form-label fw-medium">Full Name</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FiUser className="text-muted" />
                          </span>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="form-control"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="email" className="form-label fw-medium">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FiMail className="text-muted" />
                          </span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="student@dreamtech.edu.np"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="phone" className="form-label fw-medium">Phone Number</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">+977</span>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="98XXXXXXXX"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-medium">Password</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FiLock className="text-muted" />
                          </span>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                        <div className="form-text">Must be at least 6 characters</div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label fw-medium">Confirm Password</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FiLock className="text-muted" />
                          </span>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="form-check mb-4">
                        <input
                          type="checkbox"
                          id="terms"
                          className="form-check-input"
                          required
                        />
                        <label htmlFor="terms" className="form-check-label small">
                          I agree to the <a href="/terms" className="text-primary">Terms of Service</a> and <a href="/privacy" className="text-primary">Privacy Policy</a>
                        </label>
                      </div>
                      
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-3 fw-bold"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                      
                      <div className="text-center mt-4">
                        <p className="text-muted mb-0">
                          Already have an account?{' '}
                          <Link to="/login" className="text-primary fw-medium text-decoration-none">
                            Sign in
                          </Link>
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
              
              <div className="card-footer bg-white border-0 pb-4">
                <div className="text-center">
                  <Link to="/" className="btn btn-outline-secondary d-inline-flex align-items-center">
                    <FiArrowLeft className="me-2" /> Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;