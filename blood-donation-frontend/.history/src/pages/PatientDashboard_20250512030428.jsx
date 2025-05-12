import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mountStatus, setMountStatus] = useState("Component mounting...");

  // 1. Verify component mounting
  useEffect(() => {
    console.log("Component mounted successfully");
    setMountStatus("Component mounted successfully");
    
    const token = localStorage.getItem("authToken");
    console.log("Token exists:", !!token, "Token value:", token);
    
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login");
      return;
    }
    
    const fetchDonors = async () => {
      try {
        console.log("Making API request...");
        const response = await axios.get("http://localhost:5000/getMatchingDonors", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("API response status:", response.status);
        console.log("API response data:", response.data);
        
        if (!response.data?.donors) {
          throw new Error("Invalid response format: missing donors array");
        }
        
        setDonors(response.data.donors);
      } catch (err) {
        console.error("API Error:", {
          message: err.message,
          code: err.code,
          status: err.response?.status,
          data: err.response?.data
        });
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [navigate]);

  // 2. Render debug information first
  return (
    <div style={{
      padding: "20px",
      backgroundColor: "#f0f8ff",
      border: "3px solid red",
      margin: "10px"
    }}>
      <h2>Debug Information</h2>
      <p><strong>Mount Status:</strong> {mountStatus}</p>
      <p><strong>Loading State:</strong> {loading.toString()}</p>
      <p><strong>Error State:</strong> {error || "null"}</p>
      <p><strong>Donors Count:</strong> {donors.length}</p>
      <p><strong>LocalStorage Token:</strong> {localStorage.getItem("authToken") ? "Exists" : "Missing"}</p>
      
      <div style={{ marginTop: "20px" }}>
        <button 
          onClick={() => {
            console.log("Current state:", { loading, error, donors });
            window.location.reload();
          }}
          style={{ padding: "8px 15px" }}
        >
          Refresh & Log State
        </button>
      </div>

      {/* 3. Only show actual content if debug passes */}
      {!loading && !error && donors.length > 0 && (
        <div style={{ marginTop: "30px", borderTop: "2px solid #000", paddingTop: "20px" }}>
          <h3>Actual Component Content:</h3>
          <div className="container py-4">
            <h2 className="text-center mb-4">Available Donors</h2>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
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
                          onClick={() => alert(`Selected ${donor.username}`)}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;