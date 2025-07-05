import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiGrid, FiList, FiZoomIn, FiSearch, FiX } from 'react-icons/fi';
// import galleryHero from '../assets/images/about-hero-bg.jpg';
import '../assets/styles/Gallery.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  // const [filterOpen, setFilterOpen] = useState(false);
  
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true
    });
  }, []);

  // Gallery categories
  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'campus', name: 'Campus Life' },
    { id: 'events', name: 'College Events' },
    { id: 'students', name: 'Student Activities' },
    { id: 'graduation', name: 'Graduation' },
    { id: 'workshops', name: 'Workshops' }
  ];

  // Gallery images data
  const galleryImages = [
    { id: 1, category: 'campus', title: 'Main Campus Building', tags: ['campus', 'building'] },
    { id: 2, category: 'events', title: 'Annual Tech Fest', tags: ['event', 'festival'] },
    { id: 3, category: 'students', title: 'Programming Competition', tags: ['students', 'coding'] },
    { id: 4, category: 'graduation', title: 'Graduation Ceremony 2023', tags: ['graduation', 'ceremony'] },
    { id: 5, category: 'workshops', title: 'Web Development Workshop', tags: ['workshop', 'coding'] },
    { id: 6, category: 'campus', title: 'Computer Lab', tags: ['campus', 'lab'] },
    { id: 7, category: 'events', title: 'Cultural Festival', tags: ['event', 'culture'] },
    { id: 8, category: 'students', title: 'Robotics Club', tags: ['students', 'robotics'] },
    { id: 9, category: 'graduation', title: 'Graduate Celebration', tags: ['graduation', 'celebration'] },
    { id: 10, category: 'workshops', title: 'AI Workshop', tags: ['workshop', 'ai'] },
    { id: 11, category: 'campus', title: 'Library', tags: ['campus', 'library'] },
    { id: 12, category: 'events', title: 'Sports Day', tags: ['event', 'sports'] }
  ];

  // Filter images based on category and search term
  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = activeCategory === 'all' || image.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Open image in lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="container">
          <div className="row min-vh-70 align-items-center py-5">
            <div className="col-lg-8 text-center text-lg-start" data-aos="fade-right">
              <h1 className="display-4 fw-bold text-white mb-4">
                Dream Technical <span className="text-warning">College Gallery</span>
              </h1>
              <p className="lead text-light mb-4">
                Explore our campus, events, and student life through our photo gallery. 
                Witness the vibrant community that makes Dream Technical College special.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <button 
                  className="btn btn-primary btn-lg px-4 py-3 d-flex align-items-center"
                  onClick={() => document.getElementById('gallery-section').scrollIntoView()}
                >
                  View Gallery <FiGrid className="ms-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section id="gallery-section" className="py-5">
        <div className="container">
          {/* Gallery Controls */}
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
              <div className="d-flex justify-content-md-end gap-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search photos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-primary">
                    <FiSearch />
                  </button>
                </div>
                
                <div className="btn-group">
                  <button 
                    className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <FiGrid />
                  </button>
                  <button 
                    className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <FiList />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Images */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-5" data-aos="fade-up">
              <h4 className="text-muted">No photos found matching your criteria</h4>
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
            <div 
              className={`gallery-container ${viewMode === 'grid' ? 'gallery-grid' : 'gallery-list'}`}
              data-aos="fade-up"
            >
              {filteredImages.map((image) => (
                <div 
                  key={image.id} 
                  className="gallery-item"
                  onClick={() => openLightbox(image)}
                >
                  <div className="gallery-image">
                    {/* Placeholder for actual image */}
                    <div className={`image-placeholder ${image.category}`}></div>
                    <div className="gallery-overlay">
                      <div className="zoom-icon">
                        <FiZoomIn size={24} />
                      </div>
                    </div>
                  </div>
                  <div className="gallery-info">
                    <h6 className="mb-0">{image.title}</h6>
                    <div className="d-flex flex-wrap gap-1 mt-2">
                      {image.tags.map((tag, index) => (
                        <span key={index} className="badge bg-light text-dark">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-modal">
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>
              <FiX size={24} />
            </button>
            
            <div className="lightbox-image">
              <div className={`image-placeholder ${selectedImage.category}`}></div>
            </div>
            
            <div className="lightbox-info">
              <h4>{selectedImage.title}</h4>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {selectedImage.tags.map((tag, index) => (
                  <span key={index} className="badge bg-primary">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0" data-aos="fade-right">
              <h2 className="fw-bold">Share Your Dream Tech Experience</h2>
              <p className="lead mb-0">
                Have photos from our campus or events? Submit them to be featured in our gallery!
              </p>
            </div>
            <div className="col-lg-4 text-lg-end" data-aos="fade-left">
              <button className="btn btn-light btn-lg px-5 py-3">
                Submit Photos
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;