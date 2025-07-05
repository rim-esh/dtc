import React from 'react'; // Removed useState as it's no longer needed for showHeaderFooter
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'; // Import Outlet
import 'animate.css';


// Import your components and pages
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Admission from './pages/Admission';
import CertificateVerification from './pages/CertificateVerification';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import Gallery from './pages/Gallery';
import Publication from './pages/Publication';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFound from './pages/NotFound';

// Define a layout component for pages that *should* have Header and Footer
function MainLayout() {
  return (
    <>
      <Header />
      <main className="flex-grow-1">
        <Outlet /> {/* This is where the matched child route component will be rendered */}
      </main>
      <Footer />
    </>
  );
}

// Define a component for the 404 page that *should NOT* have Header and Footer
function NotFoundPageLayout() {
  return (
    <main className="flex-grow-1"> {/* Keeping main here, but without Header/Footer */}
      <NotFound />
    </main>
  );
}

function App() {
  // We no longer need the showHeaderFooter state, as layout is handled by routes
  // const [showHeaderFooter, setShowHeaderFooter] = useState(true);

  return (
    <Router>
      <Routes>
        {/*
          Route that wraps all pages that should have the Header and Footer.
          When a child route matches, MainLayout is rendered, and its <Outlet />
          renders the specific page component (e.g., Home, About, etc.).
        */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:title" element={<BlogPost />} />
          <Route path="/verify" element={<CertificateVerification />} />
          <Route path="/events" element={<Events />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/publication" element={<Publication />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* If you want a specific /not-found route that *has* Header/Footer, place it here: */}
          {/* <Route path="/not-found" element={<NotFound />} /> */}
        </Route>

        {/*
          This is the 404 catch-all route.
          It uses the NotFoundPageLayout, which explicitly *does not* include Header and Footer.
          Crucially, we no longer pass setShowHeaderFooter to NotFound.
        */}
        <Route path="*" element={<NotFoundPageLayout />} />
      </Routes>
    </Router>
  );
}

export default App;