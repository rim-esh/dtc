import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FiBook, FiFileText, FiDownload, FiSearch, 
  FiCalendar, FiUser, FiBookOpen, FiFilter 
} from 'react-icons/fi';
import publicationHero from '../assets/images/about-hero-bg.jpg';
import '../assets/styles/Publication.css';

const Publication = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
    
    // Simulate fetching publication data
    const mockPublications = [
      {
        id: 1,
        title: "Annual Research Journal 2023",
        type: "journal",
        category: "research",
        author: "Dr. Rajesh Sharma",
        date: "2023-12-15",
        downloads: 1248,
        description: "Collection of research papers from faculty and students covering advancements in computer science and engineering.",
        coverColor: "primary"
      },
      {
        id: 2,
        title: "Student Handbook 2023-24",
        type: "handbook",
        category: "academic",
        author: "Academic Department",
        date: "2023-06-01",
        downloads: 2873,
        description: "Comprehensive guide for students containing academic policies, course information, and campus resources.",
        coverColor: "success"
      },
      {
        id: 3,
        title: "Technical Innovation Magazine - Fall Edition",
        type: "magazine",
        category: "news",
        author: "Editorial Team",
        date: "2023-09-20",
        downloads: 932,
        description: "Showcasing student projects, faculty achievements, and industry partnerships from the past semester.",
        coverColor: "warning"
      },
      {
        id: 4,
        title: "AI in Education: Research Findings",
        type: "research-paper",
        category: "research",
        author: "Prof. Anita Gupta",
        date: "2023-11-05",
        downloads: 651,
        description: "Study on the impact of artificial intelligence tools in technical education environments.",
        coverColor: "info"
      },
      {
        id: 5,
        title: "Campus Newsletter - October 2023",
        type: "newsletter",
        category: "news",
        author: "PR Department",
        date: "2023-10-15",
        downloads: 574,
        description: "Monthly update on campus events, student achievements, and upcoming activities.",
        coverColor: "danger"
      },
      {
        id: 6,
        title: "Advanced Programming Techniques",
        type: "textbook",
        category: "academic",
        author: "Dr. Sanjay Patel",
        date: "2023-07-10",
        downloads: 1892,
        description: "Comprehensive guide to modern programming paradigms and best practices for computer science students.",
        coverColor: "secondary"
      },
      {
        id: 7,
        title: "Renewable Energy Systems Research",
        type: "research-paper",
        category: "research",
        author: "Dr. Meera Singh",
        date: "2023-08-22",
        downloads: 732,
        description: "Analysis of renewable energy systems implementation in rural communities.",
        coverColor: "primary"
      },
      {
        id: 8,
        title: "Career Development Guide",
        type: "handbook",
        category: "academic",
        author: "Career Services",
        date: "2023-05-18",
        downloads: 1563,
        description: "Resource for students preparing for internships and job placements in technical fields.",
        coverColor: "success"
      }
    ];
    
    setPublications(mockPublications);
    setFilteredPublications(mockPublications);
  }, []);
  
  useEffect(() => {
    // Filter publications based on category and search term
    const filtered = publications.filter(pub => {
      const matchesCategory = activeCategory === 'all' || pub.category === activeCategory;
      const matchesSearch = searchTerm === '' || 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredPublications(filtered);
  }, [activeCategory, searchTerm, publications]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Publication categories
  const categories = [
    { id: 'all', name: 'All Publications', icon: <FiBook /> },
    { id: 'research', name: 'Research Papers', icon: <FiFileText /> },
    { id: 'academic', name: 'Academic Resources', icon: <FiBookOpen /> },
    { id: 'news', name: 'News & Updates', icon: <FiFilter /> }
  ];

  // Publication types with icons and labels
  const publicationTypes = {
    journal: { icon: <FiBook />, label: 'Journal' },
    handbook: { icon: <FiBookOpen />, label: 'Handbook' },
    magazine: { icon: <FiBook />, label: 'Magazine' },
    "research-paper": { icon: <FiFileText />, label: 'Research Paper' },
    newsletter: { icon: <FiFileText />, label: 'Newsletter' },
    textbook: { icon: <FiBook />, label: 'Textbook' }
  };

  return (
    <div className="publication-page">
      {/* Hero Section */}
      <section className="publication-hero">
        <div className="container">
          <div className="row min-vh-70 align-items-center py-5">
            <div className="col-lg-7" data-aos="fade-right">
              <h1 className="display-4 fw-bold text-white mb-4">
                Dream Technical <span className="text-warning">College Publications</span>
              </h1>
              <p className="lead text-light mb-4">
                Explore our academic journals, research papers, student handbooks, and college magazines. 
                Access valuable resources created by our faculty and students.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button 
                  className="btn btn-primary btn-lg px-4 py-3 d-flex align-items-center"
                  onClick={() => document.getElementById('publications-section').scrollIntoView()}
                >
                  Browse Publications <FiBook className="ms-2" />
                </button>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block" data-aos="fade-left">
              <div className="publication-hero-graphic">
                <div className="floating-book book-1">
                  <div className="book-cover bg-primary"></div>
                  <div className="book-pages"></div>
                </div>
                <div className="floating-book book-2">
                  <div className="book-cover bg-warning"></div>
                  <div className="book-pages"></div>
                </div>
                <div className="floating-book book-3">
                  <div className="book-cover bg-success"></div>
                  <div className="book-pages"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications-section" className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold text-primary mb-3">Our Publications</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: "700px"}}>
              Academic resources, research findings, and college publications
            </p>
          </div>

          {/* Filters and Search */}
          <div className="row mb-4" data-aos="fade-up">
            <div className="col-md-8 mb-3 mb-md-0">
              <div className="d-flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`btn btn-sm ${
                      activeCategory === category.id ? 'btn-primary' : 'btn-outline-primary'
                    } d-flex align-items-center`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.icon} <span className="ms-2">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FiSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search publications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Publications Grid */}
          {filteredPublications.length === 0 ? (
            <div className="text-center py-5" data-aos="fade-up">
              <div className="mb-4">
                <FiBook size={48} className="text-muted" />
              </div>
              <h4 className="text-muted">No publications found matching your criteria</h4>
              <button 
                className="btn btn-outline-primary mt-3"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchTerm('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="row g-4" data-aos="fade-up">
              {filteredPublications.map((pub) => (
                <div key={pub.id} className="col-md-6 col-lg-4">
                  <div className="card publication-card h-100 border-0 shadow-sm">
                    <div className="publication-cover">
                      <div className={`cover-bg bg-${pub.coverColor}`}>
                        <div className="cover-icon">
                          {publicationTypes[pub.type].icon}
                        </div>
                        <div className="cover-label">
                          {publicationTypes[pub.type].label}
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className="badge bg-light text-dark">
                          {pub.category.charAt(0).toUpperCase() + pub.category.slice(1)}
                        </span>
                        <div className="text-muted small d-flex align-items-center">
                          <FiDownload className="me-1" /> {pub.downloads.toLocaleString()}
                        </div>
                      </div>
                      
                      <h5 className="mb-3">{pub.title}</h5>
                      <p className="text-muted small mb-0">{pub.description}</p>
                    </div>
                    <div className="card-footer bg-white border-0 pt-0 pb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center small text-muted">
                          <FiUser className="me-2" /> {pub.author}
                        </div>
                        <div className="d-flex align-items-center small text-muted">
                          <FiCalendar className="me-2" /> {formatDate(pub.date)}
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-light border-0">
                      <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
                        <FiDownload className="me-2" /> Download Publication
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Statistics Section */}
          <div className="row mt-5 pt-4" data-aos="fade-up">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4 p-md-5">
                  <div className="icon-xl bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
                    <FiBook size={32} />
                  </div>
                  <h3 className="text-primary fw-bold">24+</h3>
                  <p className="text-uppercase text-muted mb-0">Research Papers</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4 p-md-5">
                  <div className="icon-xl bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
                    <FiFileText size={32} />
                  </div>
                  <h3 className="text-success fw-bold">18,500+</h3>
                  <p className="text-uppercase text-muted mb-0">Total Downloads</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4 p-md-5">
                  <div className="icon-xl bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-4">
                    <FiUser size={32} />
                  </div>
                  <h3 className="text-warning fw-bold">42+</h3>
                  <p className="text-uppercase text-muted mb-0">Contributing Authors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
              <div className="pe-lg-4">
                <h2 className="fw-bold text-primary mb-4">Submit Your Publication</h2>
                <p className="lead mb-4">
                  Faculty and students are invited to submit research papers, articles, 
                  and academic resources for consideration in our publications.
                </p>
                <div className="bg-primary bg-opacity-10 p-4 rounded-3 mb-4">
                  <h5 className="d-flex align-items-center mb-3">
                    <FiFileText className="text-primary me-2" /> Submission Guidelines
                  </h5>
                  <ul className="mb-0">
                    <li>Original, unpublished work only</li>
                    <li>PDF format with proper formatting</li>
                    <li>Include abstract and keywords</li>
                    <li>Follow academic citation standards</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4 p-md-5">
                  <h3 className="text-center mb-4 text-primary">Publication Submission Form</h3>
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Title *</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Author(s) *</label>
                      <input type="text" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Publication Type *</label>
                      <select className="form-select" required>
                        <option value="">Select Type</option>
                        <option value="research-paper">Research Paper</option>
                        <option value="article">Article</option>
                        <option value="review">Literature Review</option>
                        <option value="case-study">Case Study</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Abstract *</label>
                      <textarea className="form-control" rows="3" required></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Upload Document (PDF) *</label>
                      <input type="file" className="form-control" accept=".pdf" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-3">
                      Submit Publication
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Publication;