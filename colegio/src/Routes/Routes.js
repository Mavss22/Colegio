// Routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import LoginComponent from '../components/login';
import SignupComponent from '../components/Signup';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Signup" element={<SignupComponent />} />
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
