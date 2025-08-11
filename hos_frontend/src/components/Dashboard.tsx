import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard: React.FC = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/dashboard">HOS Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/patients">Manage Patients</Nav.Link>
              <Nav.Link href="/staff">Manage Staff</Nav.Link>
              <Nav.Link href="/appointments">Manage Appointments</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/">Logout</Nav.Link> {/* Add logout logic later */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="dashboard-container">
        <h2 className="dashboard-title">Welcome to HOS Dashboard</h2>
        <Row className="justify-content-center">
          <Col md={4}>
            <Card className="text-center dashboard-card">
              <Card.Body>
                <i className="bi bi-person-fill dashboard-icon text-primary"></i>
                <Card.Title>Manage Patients</Card.Title>
                <Card.Text>View and edit patient records.</Card.Text>
                <Link to="/patients">
                  <button className="btn btn-primary">Go to Patients</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center dashboard-card">
              <Card.Body>
                <i className="bi bi-people-fill dashboard-icon text-primary"></i>
                <Card.Title>Manage Staff</Card.Title>
                <Card.Text>View and edit staff details.</Card.Text>
                <Link to="/staff">
                  <button className="btn btn-primary">Go to Staff</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center dashboard-card">
              <Card.Body>
                <i className="bi bi-calendar-event-fill dashboard-icon text-primary"></i>
                <Card.Title>Manage Appointments</Card.Title>
                <Card.Text>Schedule and view appointments.</Card.Text>
                <Link to="/appointments">
                  <button className="btn btn-primary">Go to Appointments</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;