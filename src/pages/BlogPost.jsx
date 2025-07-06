import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FiCalendar, FiUser, FiClock, FiTag, 
  FiShare2, FiArrowLeft, FiMessageSquare, 
  FiThumbsUp, FiBookmark, FiCornerUpLeft,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
// import blogHero from '../assets/images/about-hero-bg.jpg';
import authorImg from '../assets/images/author-placeholder.png';
import '../assets/styles/BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
    
    // Scroll progress tracker
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Simulate fetching blog post data based on slug
    const fetchBlogPost = () => {
      const blogPosts = {
        "the-future-of-technical-education-in-nepal": {
          id: 1,
          title: "The Future of Technical Education in Nepal",
          author: "Dr. Rajesh Sharma",
          authorRole: "Education Director",
          authorImg: authorImg,
          date: "2023-11-15",
          readTime: 8,
          category: "education",
          tags: ["education", "technology", "future"],
          content: `
            <p>Technical education in Nepal is at a pivotal moment in its evolution. With rapid technological advancements and changing industry demands, educational institutions must adapt to prepare students for the challenges of tomorrow.</p>
            
            <h3>The Current Landscape</h3>
            <p>Nepal's technical education sector has grown significantly in the past decade. According to recent data from the Council for Technical Education and Vocational Training (CTEVT), enrollment in technical programs has increased by 42% since 2015. This growth reflects the increasing recognition of technical skills in Nepal's developing economy.</p>
            
            <p>However, challenges remain. A recent industry survey revealed that 65% of employers believe technical graduates lack the practical skills needed for immediate workplace contribution. This skills gap represents both a challenge and an opportunity for educational reform.</p>
            
            <div class="highlight-box">
              <p>"The future belongs to those who can bridge the gap between theoretical knowledge and practical application. Technical education must evolve to meet this need."</p>
              <p class="author">- Dr. Rajesh Sharma, Education Director</p>
            </div>
            
            <h3>Emerging Trends</h3>
            <p>Several key trends are shaping the future of technical education in Nepal:</p>
            
            <h4>1. Industry-Academia Collaboration</h4>
            <p>Forward-thinking institutions are establishing stronger ties with industry partners. At Dream Technical College, we've implemented the Industry Immersion Program where students spend every Friday working on real projects with our partner companies. This model has shown a 78% improvement in job readiness according to our internal assessments.</p>
            
            <h4>2. Digital Transformation</h4>
            <p>The adoption of digital learning platforms has accelerated dramatically. Our college has implemented a blended learning model that combines:</p>
            <ul>
              <li>Interactive online modules for theoretical concepts</li>
              <li>Hands-on lab sessions for practical skills</li>
              <li>Virtual reality simulations for complex technical procedures</li>
            </ul>
            
            <h4>3. Focus on Soft Skills</h4>
            <p>Technical proficiency alone is no longer sufficient. Employers increasingly value communication, teamwork, and problem-solving abilities. Our curriculum now integrates soft skills development throughout all technical programs.</p>
            
            <h3>The Path Forward</h3>
            <p>To prepare students for the future, technical education in Nepal must focus on:</p>
            <ol>
              <li><strong>Adaptive Curriculum:</strong> Regularly updating course content to reflect industry changes</li>
              <li><strong>Practical Experience:</strong> Increasing industry exposure through internships and projects</li>
              <li><strong>Technology Integration:</strong> Leveraging emerging technologies in both teaching and learning</li>
              <li><strong>Entrepreneurship Focus:</strong> Encouraging innovation and startup culture</li>
            </ol>
            
            <p>At Dream Technical College, we're committed to leading this transformation. Our new Future Skills Initiative includes partnerships with international universities and tech companies to bring global best practices to our students.</p>
          `,
          likes: 42,
          comments: [
            { id: 1, name: "Suresh Pandey", date: "2023-11-18", content: "This article perfectly captures the challenges and opportunities in Nepal's education sector. I especially agree with the need for more industry collaboration." },
            { id: 2, name: "Anita Gurung", date: "2023-11-16", content: "As a recent graduate, I can confirm the importance of soft skills. Technical knowledge alone wasn't enough during my job interviews." }
          ]
        }
      };
      
      return blogPosts[slug] || null;
    };
    
    // Simulate fetching related blogs
    const fetchRelatedBlogs = () => {
      return [
        {
          id: 2,
          slug: "top-5-programming-languages-to-learn-in-2024",
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
          id: 4,
          slug: "the-importance-of-soft-skills-in-technical-careers",
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
          slug: "ai-and-machine-learning-opportunities-for-nepali-students",
          title: "AI and Machine Learning: Opportunities for Nepali Students",
          excerpt: "How Nepali students can prepare for careers in the rapidly growing field of artificial intelligence.",
          author: "Prof. Meera Singh",
          date: "2023-09-18",
          readTime: 9,
          category: "technology",
          tags: ["ai", "machine-learning", "future"],
          image: "ai"
        }
      ];
    };
    
    const blogData = fetchBlogPost();
    setBlog(blogData);
    setRelatedBlogs(fetchRelatedBlogs());
    setComments(blogData?.comments || []);
    setLikes(blogData?.likes || 0);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [slug]);
  
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && name.trim() && email.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        name: name,
        date: new Date().toISOString().split('T')[0],
        content: newComment
      };
      
      setComments([...comments, newCommentObj]);
      setNewComment('');
      setName('');
      setEmail('');
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || '';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank');
        break;
      default:
        break;
    }
    
    setShowShareOptions(false);
  };

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h2>Blog Post Not Found</h2>
        <p>The requested blog post could not be found.</p>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => navigate('/blog')}
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      {/* Reading Progress Bar */}
      <div className="reading-progress" style={{ width: `${progress}%` }}></div>
      
      {/* Floating Action Buttons (Mobile) */}
      <div className="floating-actions d-lg-none">
        <button 
          className="floating-action back-btn"
          onClick={() => navigate('/blogs')}
        >
          <FiArrowLeft />
        </button>
        <button 
          className={`floating-action like-btn ${isLiked ? 'active' : ''}`}
          onClick={handleLike}
        >
          <FiThumbsUp />
          <span className="count">{likes}</span>
        </button>
        <button 
          className={`floating-action bookmark-btn ${isBookmarked ? 'active' : ''}`}
          onClick={handleBookmark}
        >
          <FiBookmark />
        </button>
        <button 
          className="floating-action share-btn"
          onClick={() => setShowShareOptions(!showShareOptions)}
        >
          <FiShare2 />
        </button>
      </div>
      
      {/* Share Options Modal */}
      {showShareOptions && (
        <div className="share-modal">
          <div className="share-options">
            <button className="share-option facebook" onClick={() => handleShare('facebook')}>
              <FaFacebook />
              <span>Facebook</span>
            </button>
            <button className="share-option twitter" onClick={() => handleShare('twitter')}>
              <FaTwitter />
              <span>Twitter</span>
            </button>
            <button className="share-option linkedin" onClick={() => handleShare('linkedin')}>
              <FaLinkedin />
              <span>LinkedIn</span>
            </button>
            <button className="share-option whatsapp" onClick={() => handleShare('whatsapp')}>
              <FaWhatsapp />
              <span>WhatsApp</span>
            </button>
          </div>
          <button className="close-share" onClick={() => setShowShareOptions(false)}>
            <FiCornerUpLeft />
          </button>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="blog-post-hero">
        <div className="container">
          <div className="row min-vh-50 align-items-center py-5">
            <div className="col-lg-8 mx-auto text-center">
              <button 
                className="btn btn-outline-light mb-4 d-none d-lg-inline-flex align-items-center"
                onClick={() => navigate('/blogs')}
                data-aos="fade-up"
              >
                <FiArrowLeft className="me-2" /> Back to Blog
              </button>
              
              <h1 className="display-4 fw-bold text-white mb-4" data-aos="fade-up">
                {blog.title}
              </h1>
              
              <div className="d-flex flex-wrap justify-content-center gap-4 text-light" data-aos="fade-up" data-aos-delay="100">
                <span className="d-flex align-items-center">
                  <FiUser className="me-2" /> {blog.author}
                </span>
                <span className="d-flex align-items-center">
                  <FiCalendar className="me-2" /> {formatDate(blog.date)}
                </span>
                <span className="d-flex align-items-center">
                  <FiClock className="me-2" /> {blog.readTime} min read
                </span>
                <span className="d-flex align-items-center">
                  <FiTag className="me-2" /> 
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="me-1">#{tag}</span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* Blog Content */}
              <div className="blog-content" data-aos="fade-up">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
              
              {/* Action Buttons */}
              <div className="d-flex justify-content-between align-items-center my-5 py-3 border-top border-bottom d-none d-lg-flex" data-aos="fade-up">
                <div className="d-flex gap-2">
                  <button 
                    className={`btn btn-sm ${isLiked ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center`}
                    onClick={handleLike}
                  >
                    <FiThumbsUp className="me-2" /> {likes} {likes === 1 ? 'Like' : 'Likes'}
                  </button>
                  <button 
                    className={`btn btn-sm ${isBookmarked ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center`}
                    onClick={handleBookmark}
                  >
                    <FiBookmark className="me-2" /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>
                
                <div className="d-flex gap-2">
                  <span className="d-flex align-items-center text-muted">Share:</span>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleShare('facebook')}
                  >
                    <FaFacebook />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleShare('twitter')}
                  >
                    <FaTwitter />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleShare('linkedin')}
                  >
                    <FaLinkedin />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleShare('whatsapp')}
                  >
                    <FaWhatsapp />
                  </button>
                </div>
              </div>
              
              {/* Author Info */}
              <div className="card border-0 shadow-sm my-5" data-aos="fade-up">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="author-avatar me-3">
                      <img 
                        src={blog.authorImg} 
                        alt={blog.author} 
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div>
                      <h5 className="mb-0">{blog.author}</h5>
                      <p className="text-muted mb-0">{blog.authorRole}</p>
                    </div>
                  </div>
                  <p className="mb-0">Education expert with 15+ years of experience in curriculum development and technical education reform. Passionate about bridging the gap between academia and industry.</p>
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="mb-5" data-aos="fade-up">
                <h3 className="mb-4 d-flex align-items-center">
                  <FiMessageSquare className="me-2 text-primary" /> 
                  {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                </h3>
                
                {comments.length > 0 ? (
                  <div className="comments-list">
                    {comments.map(comment => (
                      <div key={comment.id} className="card border-0 shadow-sm mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="mb-0">{comment.name}</h6>
                            <small className="text-muted">{formatDate(comment.date)}</small>
                          </div>
                          <p className="mb-0">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No comments yet. Be the first to comment!</p>
                )}
                
                <h4 className="mt-5 mb-3">Leave a Comment</h4>
                <form onSubmit={handleCommentSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Your Comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Post Comment
                  </button>
                </form>
              </div>
              
              {/* Related Posts */}
              <div data-aos="fade-up">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0">Related Posts</h3>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary related-prev">
                      <FiChevronLeft />
                    </button>
                    <button className="btn btn-sm btn-outline-primary related-next">
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
                <div className="row g-4">
                  {relatedBlogs.map(blog => (
                    <div key={blog.id} className="col-md-6">
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="card border-0 shadow-sm py-5 px-3 px-md-5" data-aos="zoom-in">
                <div className="card-body">
                  <h2 className="mb-3">Subscribe to Our Blog</h2>
                  <p className="text-muted mb-4">
                    Get the latest articles, resources, and college updates delivered to your inbox
                  </p>
                  <div className="input-group mb-3">
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      placeholder="Your email address" 
                    />
                    <button className="btn btn-primary btn-lg">
                      Subscribe
                    </button>
                  </div>
                  <p className="small text-muted mb-0">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;