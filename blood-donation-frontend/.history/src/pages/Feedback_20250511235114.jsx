import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Feedback() {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (feedback.trim() === '') {
      alert('Please enter your feedback.');
      return;
    }

    alert('Thank you for your feedback!');
    setFeedback('');
  };

  return (
    <div className="container mt-5">
      <h1>Feedback</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="feedback">
          <Form.Label>Your Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback here"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Feedback;
