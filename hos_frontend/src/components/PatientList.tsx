import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/patients/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setPatients(response.data))
      .catch(error => console.error(error));
  }, [token]);

  const handleDelete = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/api/patients/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setPatients(patients.filter((p: any) => p.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <Table striped bordered hover>
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
        {patients.map((patient: any) => (
          <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.first_name}</td>
            <td>{patient.last_name}</td>
            <td>{patient.dob}</td>
            <td>{patient.contact_number}</td>
            <td>
              <Button variant="warning" as={Link as any} to={`/patients/edit/${patient.id}`}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(patient.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PatientList;