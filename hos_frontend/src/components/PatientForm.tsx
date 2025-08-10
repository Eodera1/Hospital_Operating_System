import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', dob: '', contact_number: '', medical_history: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/patients/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => setFormData(response.data))
        .catch(error => console.error(error));
    }
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `http://127.0.0.1:8000/api/patients/${id}/` : 'http://127.0.0.1:8000/api/patients/';
    await axios[method](url, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate('/patients');
  };

  return (
    <Container className="mt-5">
      <h2>{id ? 'Edit Patient' : 'Add Patient'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control name="first_name" value={formData.first_name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="last_name" value={formData.last_name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="dob">
          <Form.Label>DOB</Form.Label>
          <Form.Control name="dob" type="date" value={formData.dob} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="contact_number">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control name="contact_number" value={formData.contact_number} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="medical_history">
          <Form.Label>Medical History</Form.Label>
          <Form.Control name="medical_history" as="textarea" value={formData.medical_history} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Save</Button>
      </Form>
    </Container>
  );
};

export default PatientForm;