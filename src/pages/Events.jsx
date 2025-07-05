// src/pages/Events.jsx
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaSearch, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Events = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Event categories
  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'seminar', name: 'Seminars' },
    { id: 'conference', name: 'Conferences' },
    { id: 'cultural', name: 'Cultural Events' },
    { id: 'sports', name: 'Sports Events' },
  ];

  // Mock events data
  const eventsData = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "2023-10-15",
      time: "10:00 AM - 4:00 PM",
      location: "College Auditorium",
      description: "Join industry leaders as they discuss the latest trends in technology and innovation.",
      category: "conference",
      featured: true,
      seats: 120,
      registered: 98,
      image: "tech-summit"
    },
    {
      id: 2,
      title: "Web Development Workshop",
      date: "2023-10-20",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Lab 3",
      description: "Hands-on workshop covering modern web development techniques and frameworks.",
      category: "workshop",
      featured: false,
      seats: 30,
      registered: 28,
      image: "web-dev"
    },
    {
      id: 3,
      title: "Annual Cultural Festival",
      date: "2023-11-05",
      time: "9:00 AM - 9:00 PM",
      location: "College Grounds",
      description: "Celebrate our diverse cultural heritage with music, dance, food, and art exhibitions.",
      category: "cultural",
      featured: true,
      seats: 500,
      registered: 423,
      image: "cultural-fest"
    },
    {
      id: 4,
      title: "Data Science Seminar",
      date: "2023-10-25",
      time: "11:00 AM - 1:00 PM",
      location: "Lecture Hall B",
      description: "Exploring the future of data science and its applications in various industries.",
      category: "seminar",
      featured: false,
      seats: 80,
      registered: 72,
      image: "data-science"
    },
    {
      id: 5,
      title: "Inter-College Basketball Tournament",
      date: "2023-11-10",
      time: "9:00 AM - 6:00 PM",
      location: "Sports Complex",
      description: "Watch our college team compete against other institutions in this exciting tournament.",
      category: "sports",
      featured: false,
      seats: 200,
      registered: 187,
      image: "basketball"
    },
    {
      id: 6,
      title: "AI & Machine Learning Workshop",
      date: "2023-11-15",
      time: "1:30 PM - 4:30 PM",
      location: "Tech Innovation Center",
      description: "Practical session on building and deploying machine learning models.",
      category: "workshop",
      featured: true,
      seats: 40,
      registered: 36,
      image: "ai-workshop"
    },
    {
      id: 7,
      title: "Career Development Conference",
      date: "2023-11-20",
      time: "9:30 AM - 3:30 PM",
      location: "Main Conference Hall",
      description: "Connect with industry professionals and learn about career opportunities.",
      category: "conference",
      featured: false,
      seats: 150,
      registered: 132,
      image: "career"
    },
    {
      id: 8,
      title: "Robotics Competition",
      date: "2023-12-01",
      time: "10:00 AM - 5:00 PM",
      location: "Engineering Building",
      description: "Student teams compete to build and program the most innovative robots.",
      category: "workshop",
      featured: true,
      seats: 100,
      registered: 94,
      image: "robotics"
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter events based on category and search term
  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get featured events
  const featuredEvents = eventsData.filter(event => event.featured);

  // Event card variants for animation
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="events-page">
      {/* Hero Section */}
      <section className="events-hero bg-primary text-white py-5 position-relative overflow-hidden">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="display-4 fw-bold mb-3">College Events & Activities</h1>
                <p className="lead mb-4">
                  Join our vibrant campus community through workshops, seminars, cultural events, 
                  and sports activities designed to enrich your college experience.
                </p>
                <div className="d-flex gap-2">
                  <button className="btn btn-light btn-lg px-4">View Calendar</button>
                  <button className="btn btn-outline-light btn-lg px-4">Submit Event</button>
                </div>
              </motion.div>
            </div>
            <div className="col-md-5 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="position-relative"
              >
                <div className="hero-shapes">
                  <div className="shape shape-1"></div>
                  <div className="shape shape-2"></div>
                  <div className="shape shape-3"></div>
                </div>
                <div className="hero-icon bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center">
                  <FaCalendarAlt size={48} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary mb-3">Featured Events</h2>
            <p className="text-muted">Highlighted activities you won't want to miss</p>
          </div>
          
          <div className="row g-4">
            {featuredEvents.slice(0, 3).map((event, index) => (
              <div className="col-md-4" key={event.id}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="card h-100 border-0 shadow overflow-hidden event-card"
                >
                  <div className={`card-img-top event-image event-${event.image}`}></div>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <span className="badge bg-primary me-2">{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                      <span className="text-muted small">
                        <FaCalendarAlt className="me-1" /> {event.date}
                      </span>
                    </div>
                    <h3 className="h5 fw-bold mb-2">{event.title}</h3>
                    <p className="text-muted mb-3">{event.description}</p>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <span className="d-flex align-items-center text-muted small mb-1">
                          <FaMapMarkerAlt className="me-2" /> {event.location}
                        </span>
                        <span className="d-flex align-items-center text-muted small">
                          <FaClock className="me-2" /> {event.time}
                        </span>
                      </div>
                      <div className="progress-circle">
                        <div className="progress" style={{ '--progress': `${(event.registered / event.seats) * 100}%` }}>
                          <span>{Math.round((event.registered / event.seats) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-white border-0 pt-0 pb-4 px-4">
                    <button className="btn btn-outline-primary w-100">Register Now</button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Filter */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row align-items-center mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <h2 className="fw-bold mb-0">Upcoming Events</h2>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <FaFilter className="me-1" /> Filter
                </button>
              </div>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`btn ${activeCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Events List */}
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading events...</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <div className="col-md-6 col-lg-4" key={event.id}>
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className="card h-100 border-0 shadow-sm event-card-horizontal"
                    >
                      <div className="row g-0">
                        <div className="col-md-5">
                          <div className={`event-image event-${event.image}`}></div>
                        </div>
                        <div className="col-md-7">
                          <div className="card-body p-3">
                            <div className="d-flex align-items-center mb-2">
                              <span className="badge bg-primary me-2">{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                              <span className="text-muted small">
                                <FaCalendarAlt className="me-1" /> {event.date}
                              </span>
                            </div>
                            <h3 className="h6 fw-bold mb-1">{event.title}</h3>
                            <p className="text-muted small mb-2">{event.description.substring(0, 80)}...</p>
                            <div className="d-flex align-items-center text-muted small mb-2">
                              <FaMapMarkerAlt className="me-2" /> {event.location}
                            </div>
                            <div className="d-flex align-items-center text-muted small mb-3">
                              <FaClock className="me-2" /> {event.time}
                            </div>
                            <button className="btn btn-sm btn-outline-primary w-100">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="alert alert-info">
                    No events found matching your criteria. Please try different filters.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <h2 className="fw-bold mb-3">Host Your Event With Us</h2>
              <p className="mb-0">
                Dream Technical College offers state-of-the-art facilities for workshops, 
                seminars, conferences, and cultural events.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button className="btn btn-light btn-lg px-4">Book Venue</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;