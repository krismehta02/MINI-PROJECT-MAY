import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const [donor, setDonor] = useState({
    username: "",
    age: "",
    blood_group: ""
  });
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

        // Value display logic
        const donorData = response.data.donor || response.data;
        setDonor({
          username: donorData.username || "",
          age: donorData.age || "",
          blood_group: donorData.blood_group || ""
        });
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchDonorData();
  }, [navigate]);

  // ... (keep all other existing functions exactly the same)

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