import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { OwnerRegister } from './pages/OwnerRegister';
import { OwnerDashboard } from './pages/OwnerDashboard';
import { RestaurantDetail } from './pages/RestaurantDetails';
import { ClientBrowse } from './pages/ClientBrowse';
import { ClientRestaurant } from './pages/ClientRestaurant';
import { OwnerLogin } from './pages/OwnerLogin';
import { AppProvider } from './contexts/AppContext';
import { OwnerRestaurant } from './pages/OwnerRestaurant';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<OwnerRegister />} />
        <Route path="/dashboard" element={<OwnerDashboard />} />
        <Route path="/restaurant-detail" element={<RestaurantDetail />} />
        <Route path="/browse" element={<ClientBrowse />} />
        <Route path="/restaurant/:id" element={<ClientRestaurant />} />
        <Route path="/login" element={<OwnerLogin />} />
        <Route path="/owner/restaurant/:id" element={<OwnerRestaurant />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
