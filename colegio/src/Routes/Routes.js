// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import LoginDemo from './LoginDemo';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginDemo />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
