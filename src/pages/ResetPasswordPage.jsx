// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff, FiCheck, FiArrowLeft } from 'react-icons/fi';
import collegeLogo from '../assets/images/about-hero-bg.jpg'; // Replace with your logo

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL (for demo purposes)
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

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
    
    if (!token) {
      setError('Invalid reset token');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate password reset process
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
    <div className="reset-password-page d-flex align-items-center min-vh-100 bg-light">
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
                  <h2 className="fw-bold text-primary">
                    {success ? "Password Reset Successful!" : "Reset Your Password"}
                  </h2>
                  <p className="text-muted">
                    {success 
                      ? "Your password has been updated successfully" 
                      : "Create a new password for your account"}
                  </p>
                </div>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {success ? (
                  <div className="text-center py-5">
                    <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                      <FiCheck size={36} />
                    </div>
                    <p className="text-muted mb-4">
                      You'll be redirected to login page shortly.
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
                        <label htmlFor="password" className="form-label fw-medium">New Password</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FiLock className="text-muted" />
                          </span>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Create a new password"
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
                        <label htmlFor="confirmPassword" className="form-label fw-medium">Confirm New Password</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FiLock className="text-muted" />
                          </span>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm your new password"
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
                      
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-3 fw-bold"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Updating Password...
                          </>
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
              
              <div className="card-footer bg-white border-0 pb-4">
                <div className="text-center">
                  <Link to="/login" className="btn btn-outline-secondary d-inline-flex align-items-center">
                    <FiArrowLeft className="me-2" /> Back to Login
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

export default ResetPasswordPage;