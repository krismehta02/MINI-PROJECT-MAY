import React, { useState } from 'react';
import '../Feedback.css';

function Feedback() {
  const [formData, setFormData] = useState({
    rating: '',
    comments: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Create feedback)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if rating and comments are filled
    if (!formData.rating || !formData.comments) {
      alert('Please provide both rating and comments.');
      return;
    }

    // Sending the feedback data to the server using fetch
    try {
      const response = await fetch('http://localhost:5000/submitFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: formData.rating,
          comments: formData.comments,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Feedback submitted successfully!');
        setFormData({ rating: '', comments: '' }); // Reset form after successful submission
      } else {
        alert('Failed to submit feedback. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again later.');
    }
  };

  return (
    <div className="feedback-container">
      <h1>Blood Donation Feedback</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">How was your donation experience?</label>
        <select
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          <option value="">Select one</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="okay">Okay</option>
          <option value="bad">Bad</option>
        </select>

        <label htmlFor="comments">Additional Comments</label>
        <textarea
          id="comments"
          name="comments"
          rows="4"
          value={formData.comments}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
