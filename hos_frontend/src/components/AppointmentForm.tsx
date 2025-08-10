import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({ patient_id: '', staff_id: '', date: '', status: '' });
  const [patients, setPatients] = useState([]);
  const [staff, setStaff] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/patients/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setPatients(response.data));

    axios.get('http://127.0.0.1:8000/api/staff/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setStaff(response.data));

    if (id) {
      axios.get(`http://127.0.0.1:8000/api/appointments/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => setFormData({
          patient_id: response.data.patient.id,
          staff_id: response.data.staff.id,
          date: response.data.date,
          status: response.data.status
        }));
    }
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `http://127.0.0.1:8000/api/appointments/${id}/` : 'http://127.0.0.1:8000/api/appointments/';
    await axios[method](url, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate('/appointments');
  };

  return (
    <Container className="mt-5">
      <h2>{id ? 'Edit Appointment' : 'Add Appointment'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="patient_id">
          <Form.Label>Patient</Form.Label>
          <Form.Select name="patient_id" value={formData.patient_id} onChange={handleChange} required>
            <option value="">Select Patient</option>
            {patients.map((p: any) => (
              <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="staff_id">
          <Form.Label>Staff</Form.Label>
          <Form.Select name="staff_id" value={formData.staff_id} onChange={handleChange} required>
            <option value="">Select Staff</option>
            {staff.map((s: any) => (
              <option key={s.id} value={s.id}>{s.first_name} {s.last_name} ({s.role})</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control name="date" type="datetime-local" value={formData.date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Save</Button>
      </Form>
    </Container>
  );
};

export default AppointmentForm;