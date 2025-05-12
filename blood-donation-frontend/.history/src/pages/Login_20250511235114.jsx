import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState(''); 
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (e) => setRole(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (role === 'patient') {
      navigate('/patients-dashboard'); 
    } else if (role === 'donor') {
      navigate('/donors-dashboard'); 
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRole">
          <Form.Label>Login as</Form.Label>
          <Form.Control as="select" value={role} onChange={handleRoleChange} required>
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="donor">Donor</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={handleEmailChange} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter phone number" 
            value={phone} 
            onChange={handlePhoneChange} 
            required 
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
