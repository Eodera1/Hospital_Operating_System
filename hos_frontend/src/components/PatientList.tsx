import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  contact_number: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://127.0.0.1:8000/api/patients/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
        setError('Failed to load patients. Please try again later.');
        setLoading(false);
      });
  }, [token]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      axios
        .delete(`http://127.0.0.1:8000/api/patients/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setPatients(patients.filter((p: Patient) => p.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting patient:', error);
          setError('Failed to delete patient. Please try again.');
        });
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0"><i className="bi bi-person-fill me-2"></i>Patient List</h3>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient: Patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.first_name}</td>
                  <td>{patient.last_name}</td>
                  <td>{patient.dob}</td>
                  <td>{patient.contact_number}</td>
                  <td>
                    <Button
                      variant="warning"
                      as={Link as any}
                      to={`/patients/edit/${patient.id}`}
                      className="me-2"
                    >
                      <i className="bi bi-pencil-fill me-1"></i>Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(patient.id)}
                    >
                      <i className="bi bi-trash-fill me-1"></i>Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientList;