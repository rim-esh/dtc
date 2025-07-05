// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import collegeLogo from '../assets/images/about-hero-bg.jpg'; // Replace with your logo

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate login process
    setTimeout(() => {
      if (formData.email === 'student@dtc.edu.np' && formData.password === 'password123') {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-page d-flex align-items-center min-vh-100 bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="card overflow-hidden border-0 shadow-lg">
              <div className="row g-0">
                {/* Left Side - Branding & Image */}
                <div className="col-lg-6 d-none d-lg-block position-relative">
                  <div className="h-100 bg-primary position-relative">
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary bg-opacity-90">
                      <div className="position-relative h-100 d-flex flex-column justify-content-center p-5">
                        <div className="text-center mb-5">
                          <img 
                            src={collegeLogo} 
                            alt="Dream Technical College" 
                            className="img-fluid mb-4"
                            style={{ maxHeight: '80px' }}
                          />
                          <h2 className="text-white mb-1">Dream Technical College</h2>
                          <p className="text-white-50 mb-0">Bardaghat, Nawalparasi, Nepal</p>
                        </div>
                        
                        <div className="text-center mt-auto">
                          <div className="position-relative" style={{ height: '300px', overflow: 'hidden' }}>
                            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                              <div className="text-center text-white">
                                <FiUser className="display-1 mb-3 opacity-25" />
                                <h4 className="mb-1">Student Portal</h4>
                                <p className="mb-0">Access your courses, results and resources</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center text-white-50 small mt-auto">
                          © {new Date().getFullYear()} Dream Technical College. All rights reserved.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Login Form */}
                <div className="col-lg-6">
                  <div className="p-4 p-md-5">
                    <div className="text-center mb-5">
                      <h2 className="fw-bold text-primary">Sign In</h2>
                      <p className="text-muted">Enter your credentials to access your account</p>
                    </div>
                    
                    {error && (
                      <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <div className="me-2">
                          <FiLock />
                        </div>
                        <div>{error}</div>
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="email" className="form-label fw-medium">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <FiMail className="text-muted" />
                          </span>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control border-start-0"
                            placeholder="student@dreamtech.edu.np"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-medium">Password</label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <FiLock className="text-muted" />
                          </span>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="form-control border-start-0"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <button
                            type="button"
                            className="input-group-text bg-light border-start-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            id="remember"
                            className="form-check-input"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                          />
                          <label htmlFor="remember" className="form-check-label small">Remember me</label>
                        </div>
                        <Link to="/forgot-password" className="small text-primary text-decoration-none">
                          Forgot password?
                        </Link>
                      </div>
                      
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-3 fw-bold"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                      
                      <div className="text-center mt-4">
                        <div className="d-flex align-items-center justify-content-center mb-3">
                          <div className="border-top flex-grow-1"></div>
                          <div className="px-3 small text-muted">Or continue with</div>
                          <div className="border-top flex-grow-1"></div>
                        </div>
                        
                        <div className="d-flex justify-content-center gap-3">
                          <button type="button" className="btn btn-outline-secondary rounded-circle p-2">
                            <i className="fab fa-google"></i>
                          </button>
                          <button type="button" className="btn btn-outline-secondary rounded-circle p-2">
                            <i className="fab fa-facebook-f"></i>
                          </button>
                          <button type="button" className="btn btn-outline-secondary rounded-circle p-2">
                            <i className="fab fa-linkedin-in"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-center mt-5">
                        <p className="text-muted mb-0">
                          Don't have an account?{' '}
                          <Link to="/register" className="text-primary fw-medium text-decoration-none">
                            Register now
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;