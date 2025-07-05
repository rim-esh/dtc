// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import collegeLogo from '../assets/images/about-hero-bg.jpg'; // Replace with your logo

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="forgot-password-page d-flex align-items-center min-vh-100 bg-light">
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
                  <h2 className="fw-bold text-primary">Forgot Your Password?</h2>
                  <p className="text-muted">
                    {success 
                      ? "We've sent instructions to reset your password" 
                      : "Enter your email to reset your password"}
                  </p>
                </div>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {success ? (
                  <div className="text-center py-5">
                    <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                      <FiCheck size={36} />
                    </div>
                    <h3 className="fw-bold mb-3">Email Sent!</h3>
                    <p className="text-muted mb-4">
                      We've sent password reset instructions to <span className="fw-medium">{email}</span>. 
                      Please check your email inbox.
                    </p>
                    <div className="d-grid gap-3">
                      <button 
                        className="btn btn-primary"
                        onClick={() => navigate('/login')}
                      >
                        Return to Login
                      </button>
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setSuccess(false);
                          setEmail('');
                        }}
                      >
                        Resend Email
                      </button>
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
                        <label htmlFor="email" className="form-label fw-medium">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FiMail className="text-muted" />
                          </span>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="student@dreamtech.edu.np"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
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
                            Sending Email...
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

export default ForgotPasswordPage;