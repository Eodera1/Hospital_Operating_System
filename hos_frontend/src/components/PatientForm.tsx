import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface Patient {
  id?: number;
  first_name: string;
  last_name: string;
  dob: string;
  contact_number: string;
  medical_history: string;
}

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<Patient>({
    first_name: '',
    last_name: '',
    dob: '',
    contact_number: '',
    medical_history: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://127.0.0.1:8000/api/patients/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setFormData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching patient:', error);
          setError('Failed to load patient data. Please try again.');
          setLoading(false);
        });
    }
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.first_name || !formData.last_name || !formData.dob || !formData.contact_number) {
      setError('All fields except Medical History are required.');
      return false;
    }
    if (!/^\d{10,}$/.test(formData.contact_number)) {
      setError('Contact number must be at least 10 digits.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);
    const method = id ? 'put' : 'post';
    const url = id ? `http://127.0.0.1:8000/api/patients/${id}/` : 'http://127.0.0.1:8000/api/patients/';
    try {
      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(`Patient ${id ? 'updated' : 'added'} successfully!`);
      setTimeout(() => navigate('/patients'), 1500); // Redirect after 1.5s
    } catch (error) {
      console.error('Error saving patient:', error);
      setError('Failed to save patient. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '500px' }} className="shadow-sm p-4">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">
            <i className="bi bi-person-plus-fill me-2"></i>
            {id ? 'Edit Patient' : 'Add Patient'}
          </h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
          {success && <Alert variant="success" className="mb-3">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="first_name" className="mb-3">
              <Form.Label>
                <i className="bi bi-person-fill me-2"></i>First Name
              </Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="last_name" className="mb-3">
              <Form.Label>
                <i className="bi bi-person-fill me-2"></i>Last Name
              </Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="dob" className="mb-3">
              <Form.Label>
                <i className="bi bi-calendar-fill me-2"></i>DOB
              </Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="contact_number" className="mb-3">
              <Form.Label>
                <i className="bi bi-telephone-fill me-2"></i>Contact Number
              </Form.Label>
              <Form.Control
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="medical_history" className="mb-3">
              <Form.Label>
                <i className="bi bi-clipboard-fill me-2"></i>Medical History
              </Form.Label>
              <Form.Control
                as="textarea"
                name="medical_history"
                value={formData.medical_history}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? (
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              ) : (
                'Save'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientForm;