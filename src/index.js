import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'aos/dist/aos.css';



import { BrowserRouter } from 'react-router-dom';  // यो लाइन थप्नुहोस्

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <BrowserRouter>      {/* यहाँ App लाई wrap गर्नुहोस् */}
    <App />
  </BrowserRouter>
);
