// src/pages/Events.jsx
import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaSearch, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Papa from 'papaparse';

// Helper function to parse dates robustly
const parseDate = (dateString) => {
  if (!dateString) {
    // console.log(`[parseDate] Input: "${dateString}" -> Output: null (empty)`);
    return null;
  }

  let parsedDate = null;

  // Try parsing "DD/MM/YYYY", "DD-MM-YYYY", or "DD.MM.YYYY"
  const dmyMatch = dateString.match(/^(\d{1,2})[/\-.]([a-zA-Z]{3}|\d{1,2})[/\-.](20\d{2}|\d{2})$/);
  if (dmyMatch) {
    let [, day, month, year] = dmyMatch;

    // Handle 2-digit year (e.g., "25" for 2025)
    if (year.length === 2) {
      year = `20${year}`;
    }

    // Month mapping for abbreviations (e.g., "Jan", "Jul")
    const monthMap = {
      'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
      'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
    };

    let monthIndex;
    if (isNaN(month)) { // Month is an abbreviation (e.g., "Jan")
      monthIndex = monthMap[month.toLowerCase()];
    } else { // Month is a number (e.g., "01" or "7")
      monthIndex = parseInt(month, 10) - 1; // Correct: Month is 0-indexed in Date constructor
    }

    if (monthIndex !== undefined && !isNaN(parseInt(day, 10)) && !isNaN(parseInt(year, 10))) {
      parsedDate = new Date(parseInt(year, 10), monthIndex, parseInt(day, 10));
    }
  }

  // If not parsed by DD/MM/YYYY or DD/MMM/YYYY, try standard JS Date constructor (e.g., for YYYY-MM-DD, MM/DD/YYYY)
  if (!parsedDate || isNaN(parsedDate.getTime())) {
    parsedDate = new Date(dateString);
  }

  // Double-check validity after all attempts
  const isValidDate = !isNaN(parsedDate.getTime());
  // console.log(`[parseDate] Input: "${dateString}" -> Output: ${isValidDate ? parsedDate.toLocaleDateString() : 'Invalid Date'}`);

  return isValidDate ? parsedDate : null;
};


const Events = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [eventsData, setEventsData] = useState([]);
  const [error, setError] = useState('');

  // IMPORTANT: Ensure this URL is correct and publicly accessible CSV
  const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSltHS6faugPdqcvFmSNaNPDQ92TiHd-iG5A_QwZCO5P0RsZskeiHl5LUFsXQ2lYdziFefcS_5ADexT/pub?output=csv";

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'seminar', name: 'Seminars' },
    { id: 'conference', name: 'Conferences' },
    { id: 'cultural', name: 'Cultural Events' },
    { id: 'sports', name: 'Sports Events' },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedEvents = results.data
              .map((event, index) => ({
                id: event.ID || `event-${index}-${Date.now()}`,
                title: event.Title || 'No Title',
                date: event.Date || '', // Keep as string for parsing later
                time: event.Time || 'No Time',
                location: event.Location || 'No Location',
                description: event.Description || 'No Description',
                category: event.Category ? event.Category.toLowerCase().trim() : 'uncategorized',
                featured: event.Featured && (event.Featured.toLowerCase().trim() === 'yes'),
                seats: parseInt(event.Seats) || 0,
                registered: parseInt(event.Registered) || 0,
                image: event.Image || 'default',
              }))
              .filter(event => event.title && event.date); // Filter out events with no title or date

            setEventsData(parsedEvents);
            console.log("Fetched and Parsed Event Data (raw):", parsedEvents); // Check initial data
            setIsLoading(false);
          },
          error: (parseError) => {
            console.error('Error parsing CSV:', parseError);
            setError('Failed to parse event data. Please check the sheet format.');
            setEventsData([]);
            setIsLoading(false);
          }
        });

      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError('Failed to load event data. Please try again later.');
        setEventsData([]);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [GOOGLE_SHEET_CSV_URL]);

  // Helper function to determine if an event is upcoming or past
  const getEventStatus = (eventDateString) => {
    const eventDate = parseDate(eventDateString);
    if (!eventDate) {
        // console.log(`[getEventStatus] Cannot parse date "${eventDateString}". Returning 'unknown'.`);
        return 'unknown';
    }

    const now = new Date();
    // Normalize both dates to start of day for accurate comparison
    now.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    // console.log(`[getEventStatus] Event Date: ${eventDate.toLocaleDateString()}, Current Date: ${now.toLocaleDateString()}`);

    if (eventDate.getTime() >= now.getTime()) {
      // console.log(`[getEventStatus] "${eventDateString}" is UPCOMING`);
      return 'upcoming';
    } else {
      // console.log(`[getEventStatus] "${eventDateString}" is PAST`);
      return 'past';
    }
  };

  const allFilteredEvents = eventsData.filter(event => {
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter based on the correctly parsed and compared dates
  const upcomingEvents = allFilteredEvents.filter(event => getEventStatus(event.date) === 'upcoming');
  const pastEvents = allFilteredEvents.filter(event => getEventStatus(event.date) === 'past');
  const featuredEvents = upcomingEvents.filter(event => event.featured);


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const renderEventCards = (events, title, noEventsMessage) => (
    <section className="py-5">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary mb-3">{title}</h2>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading events...</p>
          </div>
        ) : error ? (
          <div className="col-12 text-center py-5">
            <div className="alert alert-danger">
              {error}
            </div>
          </div>
        ) : events.length > 0 ? (
          <div className="row g-4">
            {events.map((event, index) => (
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
            ))}
          </div>
        ) : (
          <div className="col-12 text-center py-5">
            <div className="alert alert-info">
              {noEventsMessage}
            </div>
          </div>
        )}
      </div>
    </section>
  );


  return (
    <div className="events-page">
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
            {isLoading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading featured events...</p>
              </div>
            ) : error ? (
              <div className="col-12 text-center py-5">
                <div className="alert alert-danger">
                  {error}
                </div>
              </div>
            ) : featuredEvents.length > 0 ? (
              featuredEvents.slice(0, 3).map((event, index) => (
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
                          <div className="progress" style={{ '--progress': `${event.seats > 0 ? (event.registered / event.seats) * 100 : 0}%` }}>
                            <span>{event.seats > 0 ? Math.round((event.registered / event.seats) * 100) : 0}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-white border-0 pt-0 pb-4 px-4">
                      <button className="btn btn-outline-primary w-100">Register Now</button>
                    </div>
                  </motion.div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <div className="alert alert-info">
                  No featured events found.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Events Filter and Search */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row align-items-center mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <h2 className="fw-bold mb-0">Explore All Events</h2>
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
        </div>
      </section>

      {/* Upcoming Events List */}
      {renderEventCards(upcomingEvents, "Upcoming Events", "No upcoming events found matching your criteria.")}

      <hr className="my-5 mx-auto w-75" /> {/* Separator */}

      {/* Past Events List */}
      {renderEventCards(pastEvents, "Past Events", "No past events found matching your criteria.")}


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