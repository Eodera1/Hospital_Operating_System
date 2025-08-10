import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  return (
    <Container className="mt-5">
      <h2>HOS Dashboard</h2>
      <Button variant="primary" as={Link as any} to="/patients" className="m-2">Manage Patients</Button>
      <Button variant="primary" as={Link as any} to="/staff" className="m-2">Manage Staff</Button>
      <Button variant="primary" as={Link as any} to="/appointments" className="m-2">Manage Appointments</Button>
    </Container>
  );
};

export default Dashboard;