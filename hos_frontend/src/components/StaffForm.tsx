import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const StaffForm: React.FC = () => {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', role: '', contact_number: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/staff/${id}/`, {
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
    const url = id ? `http://127.0.0.1:8000/api/staff/${id}/` : 'http://127.0.0.1:8000/api/staff/';
    await axios[method](url, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate('/staff');
  };

  return (
    <Container className="mt-5">
      <h2>{id ? 'Edit Staff' : 'Add Staff'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control name="first_name" value={formData.first_name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="last_name" value={formData.last_name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="contact_number">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control name="contact_number" value={formData.contact_number} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Save</Button>
      </Form>
    </Container>
  );
};

export default StaffForm;