// Routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import LoginComponent from '../components/login';
import SignupComponent from '../components/Signup';
import NewProjectFinal from '../components/NewProjectFinal';
import NewProfesor from '../components/NewProfesor';
import SearchProfesor from '../components/SearchProfesor';
import AssociationProject from '../components/associationProject';
import UpdateProfesor from '../components/updateProfesor'; 
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Signup" element={<SignupComponent />} />
      <Route path="/NewPF" element={<NewProjectFinal />} />
      <Route path="/NewP" element={<NewProfesor />} />
      <Route path="/SearchP" element={<SearchProfesor />} />
      <Route path="/AssociationProject" element={<AssociationProject />}/>
      <Route path="/updateProfesor" element={<UpdateProfesor />} />
      <Route 
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
