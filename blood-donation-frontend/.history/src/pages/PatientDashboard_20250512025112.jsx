import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log("PatientDashboard component mounted - token check:", localStorage.getItem("authToken"));

  useEffect(() => {
    console.log("useEffect triggered");
    
    const fetchDonors = async () => {
      console.log("fetchDonors function started");
      const token = localStorage.getItem("authToken");
      console.log("Token from localStorage:", token);

      if (!token) {
        console.warn("No token found - redirecting to login");
        setError("No token found, please log in.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        console.log("Attempting to fetch donors from API...");
        const response = await axios.get("http://localhost:5000/getMatchingDonors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data);

        if (response.data && response.data.donors) {
          console.log("Received donors:", response.data.donors);
          setDonors(response.data.donors);
        } else {
          console.warn("Unexpected API response structure");
          setError("Received unexpected data format from server");
        }
      } catch (err) {
        console.error("API Error Details:", {
          message: err.message,
          response: err.response,
          stack: err.stack
        });
        setError(err.response?.data?.message || "Error fetching donors. Please try again.");
      } finally {
        console.log("Request completed - setting loading to false");
        setLoading(false);
      }
    };

    fetchDonors();
  }, [navigate]);

  const handleSelect = (donorUsername) => {
    console.log("Selected donor:", donorUsername);
    alert(`Donor ${donorUsername} selected successfully!`);
    navigate("/home");
  };

  return (
    <div className="container d-flex flex-column align-items-center" style={{ marginTop: "30px" }}>
      <h2 className="text-center mb-4">Available Donors</h2>

      {loading ? (
        <div className="d-flex flex-column align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Searching for matching donors...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">
          {error}
          <button 
            className="btn btn-link"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : donors.length === 0 ? (
        <div className="alert alert-info">
          No donors available for your blood type at this time.
        </div>
      ) : (
        <div className="table-responsive" style={{ width: "90%", maxWidth: "800px" }}>
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Blood Group</th>
                <th>Phone Number</th>
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
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSelect(donor.username)}
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