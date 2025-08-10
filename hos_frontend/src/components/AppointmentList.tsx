import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/appointments/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setAppointments(response.data))
      .catch(error => console.error(error));
  }, [token]);

  const handleDelete = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/api/appointments/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setAppointments(appointments.filter((a: any) => a.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Patient</th>
          <th>Staff</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((a: any) => (
          <tr key={a.id}>
            <td>{a.id}</td>
            <td>{a.patient.first_name} {a.patient.last_name}</td>
            <td>{a.staff.first_name} {a.staff.last_name}</td>
            <td>{a.date}</td>
            <td>{a.status}</td>
            <td>
              <Button variant="warning" as={Link as any} to={`/appointments/edit/${a.id}`}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(a.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AppointmentList;