import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getMatchingDonors", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Debug: Log the API response
        console.log("API Response:", response.data);
        
        // Ensure response has expected structure
        if (response.data && Array.isArray(response.data.donors)) {
          setDonors(response.data.donors);
        } else {
          throw new Error("Invalid data format from server");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [navigate]);

  // Render states
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3">
        Error: {error}
        <button 
          className="btn btn-sm btn-secondary ms-2"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Available Donors</h2>
      
      {donors.length === 0 ? (
        <div className="alert alert-info">
          No matching donors found for your blood type.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Blood Type</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.username}>
                  <td>{donor.username}</td>
                  <td>{donor.blood_group}</td>
                  <td>{donor.phone_number}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => alert(`Contacting ${donor.username}`)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;