import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("1. Starting useEffect");
    const token = localStorage.getItem("authToken");
    console.log("2. Token exists:", !!token);

    if (!token) {
      console.warn("3. No token - redirecting to login");
      navigate("/login");
      return;
    }

    const fetchDonors = async () => {
      console.log("4. Starting API fetch");
      try {
        const response = await axios.get("http://localhost:5000/getMatchingDonors", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("5. API Response:", response.data);
        
        if (response.data && Array.isArray(response.data.donors)) {
          console.log("6. Valid donors data received");
          setDonors(response.data.donors);
        } else {
          console.warn("7. Invalid data format from server");
          throw new Error("Invalid data format from server");
        }
      } catch (err) {
        console.error("8. Fetch error:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(err.message || "Failed to load donor data");
      } finally {
        console.log("9. Fetch completed");
        setLoading(false);
      }
    };

    fetchDonors();
  }, [navigate]);

  // ===== DEBUG VISUALIZATION =====
  console.log("RENDER - Current state:", { loading, error, donors });
  if (!loading && !error && donors.length === 0) {
    return (
      <div style={{ 
        backgroundColor: '#fffde7', 
        padding: '20px',
        border: '2px solid red',
        margin: '20px'
      }}>
        <h2>DEBUG MODE ACTIVE</h2>
        <p><strong>Loading:</strong> {loading.toString()}</p>
        <p><strong>Error:</strong> {error || 'null'}</p>
        <p><strong>Donors count:</strong> {donors.length}</p>
        <p><strong>API Status:</strong> Check console for network request</p>
        <button 
          onClick={() => window.location.reload()}
          style={{ padding: '8px 15px', marginTop: '10px' }}
        >
          Force Reload
        </button>
      </div>
    );
  }
  // ===== END DEBUG =====

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>
          <p>Loading donor data...</p>
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        <h4>Error Loading Data</h4>
        <p>{error}</p>
        <button 
          className="btn btn-secondary"
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