import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StaffList: React.FC = () => {
  const [staff, setStaff] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/staff/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setStaff(response.data))
      .catch(error => console.error(error));
  }, [token]);

  const handleDelete = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/api/staff/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setStaff(staff.filter((s: any) => s.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Role</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {staff.map((s: any) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.first_name}</td>
            <td>{s.last_name}</td>
            <td>{s.role}</td>
            <td>{s.contact_number}</td>
            <td>
              <Button variant="warning" as={Link as any} to={`/staff/edit/${s.id}`}>Edit</Button>
              <Button variant="danger" onClick={() => handleDelete(s.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StaffList;