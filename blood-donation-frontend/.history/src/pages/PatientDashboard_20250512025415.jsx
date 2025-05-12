import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Debugging logs
  console.log("Rendering PatientDashboard - Initial state:", { loading, error, donors });

  useEffect(() => {
    console.log("Effect triggered - checking authentication");
    
    const token = localStorage.getItem("authToken");
    console.log("Retrieved token:", token ? "Exists" : "Missing");

    if (!token) {
      console.warn("No token - redirecting to login");
      navigate("/login");
      return;
    }

    const fetchDonors = async () => {
      console.log("Starting donor fetch...");
      setLoading(true);
      setError(null);

      try {
        console.log("Making API request to:", "http://localhost:5000/getMatchingDonors");
        const response = await axios.get("http://localhost:5000/getMatchingDonors", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("API response received:", response.data);
        
        if (!response.data?.donors) {
          throw new Error("Invalid response structure");
        }

        setDonors(response.data.donors);
      } catch (err) {
        console.error("Fetch error:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(err.response?.data?.message || "Failed to load donor data");
      } finally {
        console.log("Fetch completed - setting loading to false");
        setLoading(false);
      }
    };

    fetchDonors();
  }, [navigate]);

  // Render loading state
  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Finding matching donors...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Error Loading Data</h4>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render main content
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Donors</h2>
      
      {donors.length === 0 ? (
        <div className="alert alert-info">
          No matching donors found for your blood type.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Blood Group</th>
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
                      onClick={() => alert(`Selected donor: ${donor.username}`)}
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