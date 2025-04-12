import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Browse from './components/Browse';
import Wishlist from './components/Wishlist';
import './app.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* One-pager: Home + Browse */}
        <Route
          path="/"
          element={
            <>
              <section id="home">
                <Home />
              </section>
              <section id="browse">
                <Browse />
              </section>
            </>
          }
        />

        {/* Separate page for Wishlist */}
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
};

export default App;
