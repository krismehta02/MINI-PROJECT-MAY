import React, { useState } from 'react';
import '../Register.css';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (age < 18) {
      setErrorMessage('You must be 18 years or older to register.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      setErrorMessage('Phone number must be exactly 10 digits and should not start with 0 to 5.');
      return;
    }

    try {
      // Send data to backend
      const response = await axios.post('http://localhost:5000/register', {
        role,
        username,
        phone_number: phone,
        blood_group: bloodGroup,
        age,
        password,
      });

      alert(response.data.message);
      navigate('/');  // Redirect to home or login page after registration

    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="register-background">
      <div className="container mt-5">
        <h1>Register</h1>

        {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

        <Form onSubmit={handleSubmit}>

          <Form.Group controlId="formRole">
            <Form.Label>Select Role</Form.Label>
            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">Select Role</option>
              <option value="patient">Patient</option>
              <option value="donor">Donor</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formUsername" className="mt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBloodGroup" className="mt-3">
            <Form.Label>Blood Group</Form.Label>
            <Form.Control as="select" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formAge" className="mt-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
