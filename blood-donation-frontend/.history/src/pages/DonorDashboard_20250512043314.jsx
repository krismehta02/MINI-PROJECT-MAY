import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const [donor, setDonor] = useState(null); // Initialize as null to track loading
  const [editing, setEditing] = useState(false);
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

        // Extract donor data whether it's nested or direct
        const donorData = response.data.donor || response.data;
        
        // Ensure we have valid donor data before setting state
        if (donorData && (donorData.username || donorData.age || donorData.blood_group)) {
          setDonor({
            username: donorData.username || "",
            age: donorData.age || "",
            blood_group: donorData.blood_group || ""
          });
        } else {
          // If no valid data, set empty object but don't show "Not available"
          setDonor({});
        }
      } catch (error) {
        console.error("Error fetching donor data:", error);
        setDonor({}); // Set empty object on error
      }
    };

    fetchDonorData();
  }, [navigate]);

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
    if (window.confirm("Are you sure you want to cancel registration?")) {
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
    }
  };

  // Render nothing until we have donor data
  if (donor === null) {
    return null;
  }

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <h2>Donor Dashboard</h2>
      
      {editing ? (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={donor.username}
            onChange={(e) => setDonor({ ...donor, username: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Age"
            value={donor.age}
            onChange={(e) => setDonor({ ...donor, age: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Blood Group"
            value={donor.blood_group}
            onChange={(e) => setDonor({ ...donor, blood_group: e.target.value })}
            className="form-control mb-2"
          />
          <button onClick={handleUpdate} className="btn btn-success mb-2">
            Save
          </button>
          <button onClick={() => setEditing(false)} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {donor.username && <p><strong>Username:</strong> {donor.username}</p>}
          {donor.age && <p><strong>Age:</strong> {donor.age}</p>}
          {donor.blood_group && <p><strong>Blood Group:</strong> {donor.blood_group}</p>}
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