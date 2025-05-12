import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const [donor, setDonor] = useState({});
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          alert("No token found, please log in.");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/getDonorProfile", {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"  // Added content type
          },
        });

        // Added response validation
        if (!response.data?.donor) {
          throw new Error("Invalid response format");
        }

        setDonor(response.data.donor);
      } catch (error) {
        console.error("API Error:", error);  // Added error logging
        alert(error.response?.data?.message || "Failed to load profile");
        // Removed automatic navigate to login
      }
    };

    fetchDonorData();
  }, [navigate]);

  // Rest of your code remains exactly the same...
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.put("http://localhost:5000/updateDonorProfile", donor, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      alert("Error updating profile");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.delete("http://localhost:5000/deleteDonorProfile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Registration cancelled successfully");
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      alert("Error cancelling registration");
    }
  };

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <h2>Donor Dashboard</h2>

      {editing ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={donor.username || ""}
            onChange={(e) => setDonor({ ...donor, username: e.target.value })}
            className="form-control mb-2"
          />
          {/* Other input fields remain same */}
          <button onClick={handleUpdate} className="btn btn-success mb-2">
            Save
          </button>
          <button onClick={() => setEditing(false)} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Username:</strong> {donor.username}</p>
          {/* Other display fields remain same */}
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