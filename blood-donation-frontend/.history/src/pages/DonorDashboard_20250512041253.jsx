import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const [donor, setDonor] = useState({}); // Initialize as empty object
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/getDonorProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Debug log to check API response
        console.log("API Response:", response.data);
        
        // Set donor data if available, otherwise empty object
        setDonor(response.data?.donor || {}); 
      } catch (error) {
        console.error("Error fetching donor data:", error);
        setDonor({}); // Set empty object on error
      } finally {
        setIsLoading(false); // Ensure loading state is always updated
      }
    };

    fetchDonorData();
  }, [navigate]);

  // ... (keep your existing handleUpdate and handleDelete functions exactly the same)

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <h2>Donor Dashboard</h2>
      
      {isLoading ? (
        <p>Loading donor information...</p>
      ) : editing ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={donor.username || ""}
            onChange={(e) => setDonor({ ...donor, username: e.target.value })}
            className="form-control mb-2"
          />
          {/* Other input fields remain the same */}
          <button onClick={handleUpdate} className="btn btn-success mb-2">
            Save
          </button>
          <button onClick={() => setEditing(false)} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Username:</strong> {donor.username || "Not available"}</p>
          <p><strong>Age:</strong> {donor.age || "Not available"}</p>
          <p><strong>Blood Group:</strong> {donor.blood_group || "Not available"}</p>
          <button onClick={() => setEditing(true)} className="btn btn-primary mb-2">
            Edit Profile
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Cancel Registration
          </button>
        </div>
      )}
    </div>
  );
}

export default DonorDashboard;