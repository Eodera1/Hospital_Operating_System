import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import StaffList from './components/StaffList';
import AppointmentList from './components/AppointmentList';
import PatientForm from './components/PatientForm';
import StaffForm from './components/StaffForm';
import AppointmentForm from './components/AppointmentForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/add" element={<PatientForm />} />
        <Route path="/patients/edit/:id" element={<PatientForm />} />
        <Route path="/staff" element={<StaffList />} />
        <Route path="/staff/add" element={<StaffForm />} />
        <Route path="/staff/edit/:id" element={<StaffForm />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/appointments/add" element={<AppointmentForm />} />
        <Route path="/appointments/edit/:id" element={<AppointmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;