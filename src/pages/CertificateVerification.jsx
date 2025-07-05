import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaDownload, FaCertificate, FaRegSmileBeam, FaCalendarAlt, FaIdCard } from 'react-icons/fa';
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { QRCodeCanvas } from 'qrcode.react';
import Papa from 'papaparse';
import DatePicker from 'react-datepicker'; // Import DatePicker component
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker CSS
import certificateBg from '../assets/images/certificate_bg.jpg'; // Ensure this path is correct

const CertificateVerification = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null); // State for Date of Birth
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const certificateRef = useRef(null);

  // Utility function to format date from YYYY-MM-DD to DD/MMM/YYYY
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      return date.toLocaleDateString('en-GB', options).replace(/ /g, '/');
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return dateString; // Return original if formatting fails
    }
  };

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
            // Process dates from YYYY-MM-DD to DD/MMM/YYYY for display
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
    setShowSuccess(false);

    if (!rollNumber || !dateOfBirth) {
      setError('Please enter both your Roll Number and Date of Birth.');
      return;
    }

    if (!isInitialized) {
      setError('Certificate database is still loading. Please try again in a moment.');
      return;
    }

    setLoading(true);

    // Format the selected dateOfBirth to YYYY-MM-DD for comparison
    const formattedDOB = dateOfBirth.toISOString().split('T')[0];

    setTimeout(() => {
      try {
        const normalizedRollNumber = rollNumber.trim().toUpperCase();

        const foundCertificate = certificates.find(
          cert => cert.Roll_No.trim().toUpperCase() === normalizedRollNumber &&
                   cert.DOB_AD.includes(formattedDOB.substring(8, 10)) && // Check day
                   cert.DOB_AD.includes(new Date(formattedDOB).toLocaleString('en-US', { month: 'short' })) && // Check month (short name)
                   cert.DOB_AD.includes(formattedDOB.substring(0, 4)) // Check year
        );

        if (foundCertificate) {
          setCertificate(foundCertificate);
          setShowSuccess(true);

          setTimeout(() => {
            if (certificateRef.current) {
              certificateRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } else {
          setError('Certificate not found. Please check your Roll Number and Date of Birth and try again.');
        }
      } catch (err) {
        setError('Error searching for certificate');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const SuccessAnimation = () => (
    <div className="success-animation">
      <div className="animation-circle"></div>
      <div className="animation-circle"></div>
      <div className="animation-circle"></div>
      <div className="animation-circle"></div>
      <FaRegSmileBeam className="animation-icon" />
    </div>
  );

  // PDF Certificate Component
  const PDFCertificate = ({ certificate }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={certificateBg} style={styles.backgroundImage} />

        {/* Certificate Content */}
        <View style={styles.content}>
          <Text style={styles.header}>Dream Technical College</Text>
          <Text style={styles.title}>Certificate of Completion</Text>

          <Text style={styles.bodyText}>
            This is to certify that <Text style={styles.highlightText}>{certificate.Print_Name}</Text>, daughter/son of <Text style={styles.highlightText}>{certificate.Parents_Name}</Text>,
            a resident of <Text style={styles.highlightText}>{certificate.Address}</Text>, was a bona fide student at this college.
            She/He joined the <Text style={styles.highlightText}>{certificate.Course_Name}</Text> course on <Text style={styles.highlightText}>{certificate.Print_Join_Date}</Text> AD
            and completed it on <Text style={styles.highlightText}>{certificate.Complete_Date}</Text> AD with a Grade Point Average (GPA) of <Text style={styles.highlightText}>{certificate.Grade}</Text>.
            She/He bears a good moral character.
          </Text>

          <Text style={styles.wishText}>I wish her/him success in every step of her/his life.</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Certificate No.</Text>
              <Text style={styles.detailValue}>#{certificate.CR_Number}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date of Birth</Text>
              <Text style={styles.detailValue}>{certificate.DOB_AD}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Registration No.</Text>
              <Text style={styles.detailValue}>{certificate.Regd_No}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Roll No.</Text>
              <Text style={styles.detailValue}>{certificate.Roll_No}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date of Issue</Text>
              <Text style={styles.detailValue}>{certificate.Issue_Date}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              This certificate is generated by the official site. This does not require verification by
              local stamp or signature. You can verify this certificate at:
              https://dreamtech.edu.np/verify?roll={certificate.Roll_No}
            </Text>
          </View>

          <View style={styles.signatures}>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLine}></Text>
              <Text style={styles.signatureName}>Principal</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureLine}></Text>
              <Text style={styles.signatureName}>Director</Text>
            </View>
          </View>

          <View style={styles.qrContainer}>
            <Image
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  ${document.getElementById('cert-qr-pdf') ? document.getElementById('cert-qr-pdf').innerHTML : '<rect width="100" height="100" fill="white"/>'}
                </svg>`
              )}`}
              style={styles.qrCode}
            />
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="certificate-verification min-vh-100 bg-light">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Certificate Verification</h1>
              <p className="lead mb-0">
                Verify the authenticity of certificates issued by Dream Technical College
              </p>
            </div>
            <div className="col-lg-6 text-lg-end">
              <FaCertificate size={80} className="opacity-25" />
            </div>
          </div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <div className="icon-circle bg-primary bg-opacity-10 text-primary mb-3 mx-auto">
                      <FaCertificate size={32} />
                    </div>
                    <h2 className="fw-bold text-dark mb-2">Verify Your Certificate</h2>
                    <p className="text-muted">Enter your Roll Number and Date of Birth to verify your certificate</p>
                  </div>

                  <form onSubmit={handleSearch}>
                    <div className="mb-4">
                      <label htmlFor="rollNumber" className="form-label fw-medium">Roll Number</label>
                      <div className="input-group">
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
                          aria-describedby="rollNumberHelp"
                          required
                        />
                      </div>
                      <div id="rollNumberHelp" className="form-text text-muted">
                        Enter the roll number you were assigned during your course.
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="dateOfBirth" className="form-label fw-medium">Date of Birth</label>
                      <div className="input-group">
                        <span className="input-group-text bg-primary text-white">
                          <FaCalendarAlt />
                        </span>
                        <DatePicker
                          id="dateOfBirth"
                          selected={dateOfBirth}
                          onChange={(date) => setDateOfBirth(date)}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select or type YYYY-MM-DD"
                          className="form-control form-control-lg datepicker-input" // Add custom class for styling
                          wrapperClassName="date-picker-wrapper" // Wrapper class for input styling
                          disabled={loading}
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={15}
                          required
                        />
                      </div>
                      <div className="form-text text-muted">
                        Enter your date of birth in YYYY-MM-DD format.
                      </div>
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg py-3 fw-bold"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="spinner-border spinner-border-sm me-2"></span>
                        ) : (
                          <FaSearch className="me-2" />
                        )}
                        {loading ? 'Searching...' : 'Verify Certificate'}
                      </button>
                    </div>
                  </form>

                  {error && (
                    <div className="alert alert-danger mt-4 animate__animated animate__shakeX">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Display */}
      {certificate && (
        <section className="py-5" ref={certificateRef}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className={`card border-0 shadow-lg overflow-hidden ${showSuccess ? 'certificate-found' : ''}`}>
                  <div className="card-header bg-primary text-white py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-0 d-flex align-items-center">
                        <FaRegSmileBeam className="me-2" /> Certificate Found!
                      </h4>
                      <div>
                        {certificate && (
                          <PDFDownloadLink
                            document={<PDFCertificate certificate={certificate} />}
                            fileName={`${certificate.Print_Name.replace(/\s+/g, '_')}_Certificate.pdf`}
                            className="btn btn-light btn-sm me-2"
                          >
                            {({ loading: pdfLoading }) =>
                              pdfLoading ? 'Generating...' : <><FaDownload className="me-1" /> Download PDF</>
                            }
                          </PDFDownloadLink>
                        )}
                        <button
                          className="btn btn-outline-light btn-sm"
                          onClick={() => {
                            setCertificate(null);
                            setShowSuccess(false);
                            setRollNumber(''); // Clear roll number
                            setDateOfBirth(null); // Clear date of birth
                          }}
                        >
                          New Search
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card-body p-0">
                    <div className="row g-0">
                      <div className="col-md-5 bg-light p-4">
                        <h5 className="text-primary mb-4">Certificate Details</h5>

                        {showSuccess && <SuccessAnimation />}

                        <div className="mb-4">
                          <h6 className="text-uppercase text-muted small">Student Information</h6>
                          <table className="table table-sm table-striped">
                            <tbody>
                              <tr>
                                <th width="40%">Full Name</th>
                                <td>{certificate.Print_Name}</td>
                              </tr>
                              <tr>
                                <th>Roll Number</th>
                                <td>{certificate.Roll_No}</td>
                              </tr>
                              <tr>
                                <th>Date of Birth</th>
                                <td>{certificate.DOB_AD}</td>
                              </tr>
                              <tr>
                                <th>Parent's Name</th>
                                <td>{certificate.Parents_Name}</td>
                              </tr>
                              <tr>
                                <th>Address</th>
                                <td>{certificate.Address}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mb-4">
                          <h6 className="text-uppercase text-muted small">Course Details</h6>
                          <table className="table table-sm table-striped">
                            <tbody>
                              <tr>
                                <th width="40%">Course Name</th>
                                <td>{certificate.Course_Name}</td>
                              </tr>
                              <tr>
                                <th>Registration No</th>
                                <td>{certificate.Regd_No}</td>
                              </tr>
                              <tr>
                                <th>CR Number</th>
                                <td>#{certificate.CR_Number}</td>
                              </tr>
                              <tr>
                                <th>Grade</th>
                                <td>{certificate.Grade}</td>
                              </tr>
                              <tr>
                                <th>Year</th>
                                <td>{certificate.Year}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mb-4">
                          <h6 className="text-uppercase text-muted small">Course Timeline</h6>
                          <table className="table table-sm table-striped">
                            <tbody>
                              <tr>
                                <th width="40%">Joined Date</th>
                                <td>{certificate.Print_Join_Date}</td>
                              </tr>
                              <tr>
                                <th>Completion Date</th>
                                <td>{certificate.Complete_Date}</td>
                              </tr>
                              <tr>
                                <th>Issue Date</th>
                                <td>{certificate.Issue_Date}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="text-center mt-4">
                          <div className="p-3 bg-white rounded-3 border d-inline-block shadow-sm">
                            <QRCodeCanvas
                              id="cert-qr"
                              value={`https://dreamtech.edu.np/verify?roll=${certificate.Roll_No}`}
                              size={128}
                              level="H"
                              includeMargin={true}
                            />
                            <div className="mt-2 small text-muted">Scan to verify</div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-7 bg-white p-4">
                        <div className="certificate-preview position-relative rounded-3 overflow-hidden shadow-sm">
                          <img
                            src={certificateBg}
                            alt="Certificate background"
                            className="position-absolute w-100 h-100 top-0 start-0 object-cover opacity-10"
                          />

                          <div className="position-relative p-4 p-md-5">
                            <div className="text-center mb-4">
                              <h2 className="text-primary fw-bold mb-0">Dream Technical College</h2>
                              <h3 className="text-dark fw-bold">Certificate of Completion</h3>
                            </div>

                            <div className="certificate-body mb-4">
                              <p className="text-center mb-0">
                                This is to certify that <span className="fw-bold">{certificate.Print_Name}</span>,
                                daughter/son of <span className="fw-bold">{certificate.Parents_Name}</span>,
                                a resident of <span className="fw-bold">{certificate.Address}</span>,
                                was a bona fide student at this college.
                              </p>
                              <p className="text-center">
                                She/He joined the <span className="fw-bold">{certificate.Course_Name}</span> course on
                                <span className="fw-bold"> {certificate.Print_Join_Date} AD</span> and completed it on
                                <span className="fw-bold"> {certificate.Complete_Date} AD</span> with a Grade Point Average (GPA) of
                                <span className="fw-bold"> {certificate.Grade}</span>. She/He bears a good moral character.
                              </p>
                              <p className="text-center fst-italic">
                                I wish her/him success in every step of her/his life.
                              </p>
                            </div>

                            <div className="row mt-4">
                              <div className="col-md-6">
                                <div className="d-flex mb-2">
                                  <span className="fw-bold me-2">Certificate No.:</span>
                                  <span>#{certificate.CR_Number}</span>
                                </div>
                                <div className="d-flex mb-2">
                                  <span className="fw-bold me-2">Date of Birth:</span>
                                  <span>{certificate.DOB_AD}</span>
                                </div>
                                <div className="d-flex mb-2">
                                  <span className="fw-bold me-2">Registration No.:</span>
                                  <span>{certificate.Regd_No}</span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="d-flex mb-2">
                                  <span className="fw-bold me-2">Roll No.:</span>
                                  <span>{certificate.Roll_No}</span>
                                </div>
                                <div className="d-flex mb-2">
                                  <span className="fw-bold me-2">Date of Issue:</span>
                                  <span>{certificate.Issue_Date}</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-center mt-5">
                              <div className="d-inline-block p-2 bg-white border rounded">
                                <QRCodeCanvas
                                  id="cert-qr-pdf"
                                  value={`https://dreamtech.edu.np/verify?roll=${certificate.Roll_No}`}
                                  size={80}
                                  level="H"
                                  includeMargin={true}
                                />
                                <p className="mb-0 small text-muted">Scan to verify</p>
                              </div>
                            </div>

                            <div className="row mt-5 pt-4">
                              <div className="col-md-6 text-center">
                                <div className="signature-line mb-1 mx-auto"></div>
                                <p className="mb-0 fw-bold">Principal</p>
                              </div>
                              <div className="col-md-6 text-center">
                                <div className="signature-line mb-1 mx-auto"></div>
                                <p className="mb-0 fw-bold">Director</p>
                              </div>
                            </div>

                            <div className="text-center mt-5 pt-3 border-top">
                              <p className="small text-muted mb-0">
                                This certificate is generated by the official site. This does not require
                                verification by local stamp or signature. You can verify this certificate
                                at: https://dreamtech.edu.np/verify?roll={certificate.Roll_No}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Database Status */}
      <div className="container py-4">
        <div className="text-center">
          <small className="text-muted">
            Certificate database status: {isInitialized ? (
              <span className="text-success">Loaded {certificates.length} records</span>
            ) : (
              <span className="text-warning">Loading...</span>
            )}
          </small>
        </div>
      </div>
    </div>
  );
};

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    fontFamily: 'Helvetica', // Ensure a standard font is used for PDF
  },
  backgroundImage: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    height: '100%',
    width: '100%',
    opacity: 0.1,
    // Adjust object-fit if image doesn't scale well
  },
  content: {
    padding: 40,
    zIndex: 1,
  },
  header: {
    fontSize: 28, // Increased font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#0d6efd',
    textTransform: 'uppercase', // Added for emphasis
  },
  title: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#343a40', // Darker color
    textDecoration: 'underline', // Added underline
  },
  bodyText: {
    fontSize: 12,
    textAlign: 'justify', // Justified text for better readability
    marginBottom: 15,
    lineHeight: 1.8, // Increased line height
    paddingHorizontal: 20, // Added horizontal padding
  },
  highlightText: {
    fontWeight: 'bold', // Highlight names and dates
    color: '#0d6efd', // Primary color for highlights
  },
  wishText: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 30,
    color: '#6c757d', // Muted color
  },
  detailsContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 50,
    border: '1px solid #e9ecef', // Added subtle border
    borderRadius: 8,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottom: '0.5px dotted #ced4da', // Dotted separator
    paddingBottom: 5,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#495057',
  },
  detailValue: {
    fontSize: 11,
    color: '#212529',
  },
  footer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #dee2e6',
    borderBottom: '1px solid #dee2e6',
  },
  footerText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#6c757d',
  },
  signatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    marginBottom: 20,
  },
  signatureBox: {
    alignItems: 'center',
    width: '40%', // Allocate width for signature blocks
  },
  signatureLine: {
    width: '80%', // Line takes 80% of box width
    borderBottom: '1px solid #000',
    marginBottom: 5,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#212529',
    marginTop: 5,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrCode: { // Renamed from qrCodeCanvas for consistency with Image component
    width: 80,
    height: 80,
    border: '2px solid #adb5bd', // Added border to QR code
    padding: 2,
  },
});

export default CertificateVerification;