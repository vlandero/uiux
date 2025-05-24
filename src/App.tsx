import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { OwnerRegister } from './pages/OwnerRegister';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { ClientRestaurant } from './pages/ClientRestaurant';
import { OwnerLogin } from './pages/OwnerLogin';
import { OwnerRestaurant } from './pages/OwnerRestaurant';
import { AddRestaurant } from './pages/AddRestaurant';
import styles from './App.module.css';

const App: React.FC = () => {
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all restaurant data? This will delete all saved restaurants.')) {
      // Clear only the restaurants data
      localStorage.removeItem('restaurantsData');
      // Refresh the page
      window.location.reload();
    }
  };
  return (
    <div className={styles.appContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navBrand}>
          <Link to="/">Rezervo</Link>
        </div>
        <input type="checkbox" id={styles.navToggle} className={styles.navToggle} />
        <label htmlFor={styles.navToggle} className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className={styles.navLinks}>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Owner Dashboard</Link>
          <div className={styles.authLinks}>
            <Link to="/login" className={styles.loginLink}>Owner Login</Link>
            <Link to="/register" className={styles.registerLink}>Owner Register</Link>
          </div>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<OwnerRegister />} />
          <Route path="/dashboard" element={<OwnerDashboard />} />
          <Route path="/restaurant/:id" element={<ClientRestaurant />} />
          <Route path="/login" element={<OwnerLogin />} />
          <Route path="/owner/restaurant/:id" element={<OwnerRestaurant />} />
          <Route path="/owner/add-restaurant" element={<AddRestaurant />} />
        </Routes>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Rezervo Restaurant Reservations</p>
      </footer>
      <button
        onClick={handleResetData}
        className={styles.resetDataButton}
        title="Reset restaurant data (development only)"
      >
        🗑️
      </button>
    </div>
  );
};

export default App;