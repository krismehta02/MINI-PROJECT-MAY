import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleRoleChange = (e) => setRole(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (username.trim() === "" || password.trim() === "" || role.trim() === "") {
      alert("Username, password, and role cannot be empty.");
      return;
    }

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/login', {
        role,
        username,
        password,
      });

      // If login is successful, store the token and redirect
      const { message, token } = response.data;
      alert(message);

      // Store the token in localStorage for persistence
      localStorage.setItem('authToken', token);
      console.log(token);

      // Redirect to the appropriate dashboard based on role
      if (role === 'patient') {
        navigate('/patient-dashboard');
      } else if (role === 'donor') {
        navigate('/donor-dashboard');
      }

    } catch (error) {
      // Handle login errors
      if (error.response) {
        alert(error.response.data.message || 'Login failed');
      } else {
        alert('Network error. Please try again later.');
      }

      // Reset the form fields after a failed login attempt
      setUsername('');
      setPassword('');
    }
  };

  return ( 
  <div 
     style={{
    minHeight: '70vh',  // Covers 90% of viewport height instead of 100%
    width: '00%',
    backgroundImage: 'url(/Videos/login_bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',  // Makes background fixed during scrolling
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px'
  }}
  >
    <div className="container mt-5 login-form-container" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.93)',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      maxWidth: '500px',
      width: '100%'
    }}>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        {/* User Role Dropdown */}
        <Form.Group controlId="formRole">
          <Form.Label>Login as</Form.Label>
          <Form.Control as="select" value={role} onChange={handleRoleChange} required>
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="donor">Donor</option>
          </Form.Control>
        </Form.Group>

        {/* Username Field */}
        <Form.Group controlId="formUsername" className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            value={username} 
            onChange={handleUsernameChange} 
            required 
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={handlePasswordChange} 
            required 
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
    </div>
    </div>
  );
}

export default Login;
