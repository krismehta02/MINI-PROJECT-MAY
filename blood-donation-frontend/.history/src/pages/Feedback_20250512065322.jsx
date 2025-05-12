import React, { useState } from 'react';
import '../Feedback.css';

function Feedback() {
  const [formData, setFormData] = useState({
    rating: '',
    comments: '',
  });

  const [feedbackList, setFeedbackList] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Create feedback)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here we simulate submitting feedback
    const newFeedback = { ...formData, id: feedbackList.length + 1 };
    setFeedbackList([...feedbackList, newFeedback]);

    // Reset form after submission
    setFormData({ rating: '', comments: '' });

    alert('Feedback submitted successfully!');
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

      <div className="feedback-list">
        <h2>All Feedback</h2>
        {feedbackList.length > 0 ? (
          <ul>
            {feedbackList.map((feedback) => (
              <li key={feedback.id}>
                <div><strong>Rating:</strong> {feedback.rating}</div>
                <div><strong>Comments:</strong> {feedback.comments}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedback available</p>
        )}
      </div>
    </div>
  );
}

export default Feedback;
