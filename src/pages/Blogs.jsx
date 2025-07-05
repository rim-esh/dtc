import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FiCalendar, FiUser, FiTag, FiSearch, 
  FiBookOpen, FiArrowRight, FiClock 
} from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import BlogCard from '../components/BlogCard';
import blogHero from '../assets/images/about-hero-bg.jpg';
import '../assets/styles/Blogs.css';

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
    
    // Simulate fetching blog data
    const mockBlogs = [
      {
        id: 1,
        title: "The Future of Technical Education in Nepal",
        excerpt: "Exploring how technical education is evolving to meet the demands of the digital age in Nepal.",
        author: "Dr. Rajesh Sharma",
        date: "2023-11-15",
        readTime: 8,
        category: "education",
        tags: ["education", "technology", "future"],
        image: "education"
      },
      {
        id: 2,
        title: "Top 5 Programming Languages to Learn in 2024",
        excerpt: "Discover which programming languages are in high demand and worth investing your time in.",
        author: "Prof. Anita Gupta",
        date: "2023-10-28",
        readTime: 6,
        category: "technology",
        tags: ["programming", "career", "coding"],
        image: "technology"
      },
      {
        id: 3,
        title: "How Our Graduates Are Transforming Nepal's Tech Industry",
        excerpt: "Success stories of Dream Technical College alumni making an impact in Nepal's growing tech sector.",
        author: "Career Services",
        date: "2023-10-12",
        readTime: 10,
        category: "success-stories",
        tags: ["alumni", "success", "career"],
        image: "success"
      },
      {
        id: 4,
        title: "The Importance of Soft Skills in Technical Careers",
        excerpt: "Why communication and teamwork skills are just as important as technical knowledge for career success.",
        author: "Dr. Sanjay Patel",
        date: "2023-09-30",
        readTime: 7,
        category: "career",
        tags: ["soft-skills", "career", "development"],
        image: "career"
      },
      {
        id: 5,
        title: "AI and Machine Learning: Opportunities for Nepali Students",
        excerpt: "How Nepali students can prepare for careers in the rapidly growing field of artificial intelligence.",
        author: "Prof. Meera Singh",
        date: "2023-09-18",
        readTime: 9,
        category: "technology",
        tags: ["ai", "machine-learning", "future"],
        image: "ai"
      },
      {
        id: 6,
        title: "Balancing Study and Work: Tips for Technical Students",
        excerpt: "Practical advice for students juggling coursework with part-time jobs or internships.",
        author: "Student Support",
        date: "2023-08-25",
        readTime: 5,
        category: "student-life",
        tags: ["student", "tips", "balance"],
        image: "student"
      }
    ];
    
    setBlogs(mockBlogs);
    setFilteredBlogs(mockBlogs);
  }, []);
  
  useEffect(() => {
    // Filter blogs based on category and search term
    const filtered = blogs.filter(blog => {
      const matchesCategory = activeCategory === 'all' || blog.category === activeCategory;
      const matchesSearch = searchTerm === '' || 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredBlogs(filtered);
  }, [activeCategory, searchTerm, blogs]);

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Blog categories
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'education', name: 'Education' },
    { id: 'technology', name: 'Technology' },
    { id: 'career', name: 'Career' },
    { id: 'student-life', name: 'Student Life' },
    { id: 'success-stories', name: 'Success Stories' }
  ];

  // Popular tags
  const popularTags = [
    "education", "technology", "career", "programming", 
    "ai", "student", "future", "success", "tips"
  ];

  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <section className="blogs-hero">
        <div className="container">
          <div className="row min-vh-70 align-items-center py-5">
            <div className="col-lg-8" data-aos="fade-right">
              <h1 className="display-4 fw-bold text-white mb-4">
                Dream Technical <span className="text-warning">College Blog</span>
              </h1>
              <p className="lead text-light mb-4">
                Insights, stories, and expertise from our faculty, students, and industry partners. 
                Stay updated with the latest in technical education and career development.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button 
                  className="btn btn-primary btn-lg px-4 py-3 d-flex align-items-center"
                  onClick={() => document.getElementById('blog-section').scrollIntoView()}
                >
                  Read Our Blogs <FiBookOpen className="ms-2" />
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section id="blog-section" className="py-5">
        <div className="container">
          <div className="row">
            {/* Main Content */}
            <div className="col-lg-8">
              {/* Filters and Search */}
              <div className="row mb-4" data-aos="fade-up">
                <div className="col-md-8 mb-3 mb-md-0">
                  <div className="d-flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        className={`btn btn-sm ${activeCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search blogs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-primary">
                      <FiSearch />
                    </button>
                  </div>
                </div>
              </div>

              {/* Blog List */}
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-5" data-aos="fade-up">
                  <div className="mb-4">
                    <FiBookOpen size={48} className="text-muted" />
                  </div>
                  <h4 className="text-muted">No blog posts found matching your criteria</h4>
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
                  {filteredBlogs.map(blog => (
                    <div key={blog.id} className="col-12">
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="col-lg-4 mt-5 mt-lg-0">
              <div className="sticky-top" style={{ top: '20px' }}>
                {/* About Card */}
                <div className="card border-0 shadow-sm mb-4" data-aos="fade-left">
                  <div className="card-body">
                    <h5 className="card-title mb-3">About Our Blog</h5>
                    <p className="card-text">
                      Our blog features insights on technical education, career advice, 
                      technology trends, and success stories from our college community.
                    </p>
                    <button className="btn btn-outline-primary w-100 mt-3">
                      Subscribe to Newsletter
                    </button>
                  </div>
                </div>
                
                {/* Popular Categories */}
                <div className="card border-0 shadow-sm mb-4" data-aos="fade-left" data-aos-delay="100">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Categories</h5>
                    <ul className="list-group list-group-flush">
                      {categories.slice(1).map(category => (
                        <li 
                          key={category.id}
                          className={`list-group-item border-0 px-0 py-2 d-flex justify-content-between align-items-center ${activeCategory === category.id ? 'active-category' : ''}`}
                          onClick={() => setActiveCategory(category.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <span>{category.name}</span>
                          <span className="badge bg-primary rounded-pill">
                            {blogs.filter(b => b.category === category.id).length}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Popular Tags */}
                <div className="card border-0 shadow-sm mb-4" data-aos="fade-left" data-aos-delay="200">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Popular Tags</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {popularTags.map(tag => (
                        <button
                          key={tag}
                          className={`btn btn-sm ${searchTerm === tag ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setSearchTerm(tag)}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Recent Posts */}
                <div className="card border-0 shadow-sm" data-aos="fade-left" data-aos-delay="300">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Recent Posts</h5>
                    <div className="list-group list-group-flush">
                      {blogs.slice(0, 3).map(blog => (
                        <a 
                          key={`recent-${blog.id}`}
                          href={`/blog/${blog.id}`}
                          className="list-group-item list-group-item-action border-0 px-0 py-3"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <div className={`recent-thumb ${blog.image}`}></div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="mb-1">{blog.title}</h6>
                              <small className="text-muted d-flex align-items-center">
                                <FiCalendar className="me-1" /> {formatDate(blog.date)}
                              </small>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0" data-aos="fade-right">
              <h2 className="fw-bold">Stay Updated with Our Latest Content</h2>
              <p className="lead mb-0">
                Subscribe to our newsletter for the newest blog posts, college updates, 
                and career opportunities.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end" data-aos="fade-left">
              <button className="btn btn-light btn-lg px-5 py-3">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;