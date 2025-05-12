import React, { useState } from 'react';
import '../Feedback.css';

function Feedback() {
  const [formData, setFormData] = useState({
    rating: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    alert('Thank you for your feedback!');
    setFormData({ name: '', email: '', rating: '', comments: '' });
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
