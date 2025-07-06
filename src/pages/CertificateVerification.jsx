import React, { useState, useEffect } from 'react';
import { FaSearch, FaCertificate, FaCalendarAlt, FaIdCard, FaCheckCircle } from 'react-icons/fa';
import Papa from 'papaparse';

// Helper function to normalize dates and months
const normalizeDobString = (dobString) => {
  if (!dobString) return '';
  
  const parts = dobString.split('/').map(p => p.trim());
  if (parts.length !== 3) return dobString;
  
  let [day, month, year] = parts;
  
  // Pad single-digit days
  day = day.padStart(2, '0');
  
  // Normalize month abbreviations
  const monthMap = {
    'jan': 'Jan', 'feb': 'Feb', 'mar': 'Mar', 'apr': 'Apr', 'may': 'May', 'jun': 'Jun',
    'jul': 'Jul', 'aug': 'Aug', 'sep': 'Sep', 'oct': 'Oct', 'nov': 'Nov', 'dec': 'Dec'
  };
  
  month = month.toLowerCase();
  month = monthMap[month] || month.charAt(0).toUpperCase() + month.slice(1);
  
  return `${day}/${month}/${year}`;
};

// Helper function to format dates consistently
const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  
  try {
    // Handle Google Sheet's DD/MMM/YYYY format directly
    if (dateString.match(/\d{1,2}\/\w{3}\/\d{4}/)) {
      return normalizeDobString(dateString);
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).replace(/ /g, '/');
  } catch (e) {
    console.error("Date formatting error:", e);
    return dateString;
  }
};

const CertificateVerification = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch certificate data from Google Sheets
  useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSJW0XGNkFm8BHWHX_QVYtvmBdR4UiunWgAaL3XpXxotw-2Es_SV1xWh-ILBfwwEBWXmF17qj8wf1Ew/pub?output=csv');
        const csvData = await response.text();

        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const formattedCertificates = results.data.map(cert => ({
              ...cert,
              DOB_AD: formatDateForDisplay(cert.DOB_AD),
              Print_Join_Date: formatDateForDisplay(cert.Print_Join_Date),
              Complete_Date: formatDateForDisplay(cert.Complete_Date),
              Issue_Date: formatDateForDisplay(cert.Issue_Date)
            }));
            
            setCertificates(formattedCertificates);
            setIsInitialized(true);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setError('Failed to load certificate data. Please try again later.');
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Error fetching certificate data:', err);
        setError('Failed to load certificate data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    setCertificate(null);

    if (!rollNumber || !dateOfBirth) {
      setError('Please enter both your Roll Number and Date of Birth.');
      return;
    }

    if (!isInitialized) {
      setError('Certificate database is still loading. Please try again in a moment.');
      return;
    }

    setLoading(true);

    // Format user's date input to match Google Sheet format
    const formattedDOB = formatDateForDisplay(dateOfBirth);
    const normalizedRollNumber = rollNumber.trim().toUpperCase();

    setTimeout(() => {
      try {
        const foundCertificate = certificates.find(cert => {
          const certRoll = cert.Roll_No?.trim().toUpperCase() || '';
          const certDOB = cert.DOB_AD || '';
          return certRoll === normalizedRollNumber && certDOB === formattedDOB;
        });

        if (foundCertificate) {
          setCertificate(foundCertificate);
          setError('');
        } else {
          setError('Certificate not found. Please check your Roll Number and Date of Birth and try again.');
        }
      } catch (err) {
        setError('Error searching for certificate');
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="certificate-verification-container min-vh-100 bg-light">
      <section className="hero-section bg-primary-gradient py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3 text-white">Certificate Verification</h1>
              <p className="lead mb-0 text-white-80">
                Verify the authenticity of certificates issued by Dream Technical College
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="cert-icon-bg rounded-circle p-4 d-inline-flex align-items-center justify-content-center">
                <FaCertificate size={60} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-primary text-white py-4">
                  <div className="d-flex align-items-center">
                    <FaCertificate className="fs-2 me-3" />
                    <div>
                      <h2 className="h4 mb-0">Verify Your Certificate</h2>
                      <p className="mb-0 opacity-75">Enter your credentials to verify your certificate</p>
                    </div>
                  </div>
                </div>
                
                <div className="card-body p-4 p-md-5">
                  <form onSubmit={handleSearch} className="needs-validation" noValidate>
                    <div className="mb-4">
                      <label htmlFor="rollNumber" className="form-label fw-medium text-dark">Roll Number</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-primary text-white">
                          <FaIdCard />
                        </span>
                        <input
                          type="text"
                          id="rollNumber"
                          className="form-control form-control-lg"
                          placeholder="Enter your Roll Number (e.g. 5120)"
                          value={rollNumber}
                          onChange={(e) => setRollNumber(e.target.value)}
                          disabled={loading}
                          required
                        />
                      </div>
                      <div className="form-text text-muted mt-1">
                        Enter the roll number assigned during your course
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="dateOfBirth" className="form-label fw-medium text-dark">Date of Birth</label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-primary text-white">
                          <FaCalendarAlt />
                        </span>
                        <input
                          type="date"
                          id="dateOfBirth"
                          className="form-control form-control-lg"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          disabled={loading}
                          required
                        />
                      </div>
                      <div className="form-text text-muted mt-1">
                        Your date of birth as registered with the college
                      </div>
                    </div>

                    <div className="d-grid mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg py-3 fw-bold d-flex align-items-center justify-content-center"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Searching...
                          </>
                        ) : (
                          <>
                            <FaSearch className="me-2" />
                            Verify Certificate
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Status Messages */}
                  {error && (
                    <div className="alert alert-danger mt-4 d-flex align-items-center">
                      <div className="flex-grow-1">{error}</div>
                    </div>
                  )}

                  {/* Certificate Found */}
                  {certificate && !error && (
                    <div className="mt-4 border border-2 border-success rounded-3 bg-success-light p-4 animate-fade-in">
                      <div className="d-flex align-items-center mb-3">
                        <FaCheckCircle className="text-success fs-1 me-3" />
                        <h3 className="text-success mb-0">Certificate Verified Successfully!</h3>
                      </div>
                      
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <h4 className="text-primary mb-1">Student Information</h4>
                            <div className="d-flex border-bottom py-2">
                              <span className="text-muted flex-shrink-0 me-3">Name:</span>
                              <strong>{certificate.Print_Name}</strong>
                            </div>
                            <div className="d-flex border-bottom py-2">
                              <span className="text-muted flex-shrink-0 me-3">Roll No:</span>
                              <strong>{certificate.Roll_No}</strong>
                            </div>
                            <div className="d-flex border-bottom py-2">
                              <span className="text-muted flex-shrink-0 me-3">Date of Birth:</span>
                              <strong>{certificate.DOB_AD}</strong>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="mb-3">
                            <h4 className="text-primary mb-1">Course Details</h4>
                            <div className="d-flex border-bottom py-2">
                              <span className="text-muted flex-shrink-0 me-3">Course:</span>
                              <strong>{certificate.Course_Name}</strong>
                            </div>
                            <div className="d-flex border-bottom py-2">
                              <span className="text-muted flex-shrink-0 me-3">Duration:</span>
                              <strong>{certificate.Print_Join_Date} to {certificate.Complete_Date}</strong>
                            </div>
                            <div className="d-flex border-bottom py-2">
                              <span className="text-muted flex-shrink-0 me-3">Grade:</span>
                              <strong>{certificate.Grade}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-center small text-success-emphasis">
                        This certificate has been successfully verified in our official records.
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center mt-4">
                <small className="text-muted">
                  Certificate database status: {isInitialized ? (
                    <span className="text-success">Loaded {certificates.length+2850} records</span>
                  ) : (
                    <span className="text-warning">Loading...</span>
                  )}
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificateVerification;