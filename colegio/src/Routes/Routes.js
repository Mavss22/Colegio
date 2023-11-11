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
import DeleteProfesor from '../components/deleteProfesor';
import UpdateProject from '../components/updateHistorialAseroria';
import SearchProfesorList from '../components/SearchProfesorList';
import SearchAJoinP from '../components/searchAJoinP';
import SearchStudent from '../components/SearchStudent';
import SearchAlumnoList from '../components/SearchStudentList';









import ComiteByProfesor from '../components/comitebyP';
import SearchCjoinP from '../components/searchCJoinP';
import AssociationPC from '../components/associationPC';
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
      <Route path="/deleteProfesor"element={<DeleteProfesor />} />
      <Route path="updateProject" element={<UpdateProject />} />
      <Route path="/obtenerlist" element={<SearchProfesorList/>} />
      <Route path="/searchAlumnsJoinP" element={<SearchAJoinP />} />
      <Route path="/alumnoin" element={<SearchStudent/>} />
      <Route path="/alumnolist" element={<SearchAlumnoList/>}/>









      <Route path="/UpdatePandC" element={<ComiteByProfesor />}/>
      <Route path="/searchPandC" element={<SearchCjoinP />} />
      <Route path="/assocPandC" element={<AssociationPC />} />



      <Route 
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
