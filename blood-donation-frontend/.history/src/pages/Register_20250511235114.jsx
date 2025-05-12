import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'role') setRole(value);
    else if (name === 'name') setName(value);
    else if (name === 'phone') setPhone(value);
    else if (name === 'bloodGroup') setBloodGroup(value);
    else if (name === 'age') setAge(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if age is greater than 18
    if (age < 18) {
      alert("You must be 18 years or older to register.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert('Registration successful!');
    navigate('/'); // Redirect to home page after successful registration
  };

  return (
    <div className="container mt-5">
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        {/* User Role Dropdown */}
        <Form.Group controlId="formRole">
          <Form.Label>Select Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="donor">Donor</option>
          </Form.Control>
        </Form.Group>

        {/* Name Field */}
        <Form.Group controlId="formName" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Phone Field */}
        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Blood Group Dropdown */}
        <Form.Group controlId="formBloodGroup" className="mt-3">
          <Form.Label>Blood Group</Form.Label>
          <Form.Control
            as="select"
            name="bloodGroup"
            value={bloodGroup}
            onChange={handleChange}
            required
          >
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

        {/* Age Field */}
        <Form.Group controlId="formAge" className="mt-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            placeholder="Enter your age"
            value={age}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Confirm Password Field */}
        <Form.Group controlId="formConfirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
