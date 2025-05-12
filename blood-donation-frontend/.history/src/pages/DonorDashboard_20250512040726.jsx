import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const [donor, setDonor] = useState({});
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/getDonorProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data?.donor) {
          setDonor(response.data.donor);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonorData();
  }, [navigate]);

  // ... keep your existing handleUpdate and handleDelete functions exactly the same ...

  if (isLoading) {
    return (
      <div className="container mt-4">
        <p>Loading donor information...</p>
      </div>
    );
  }

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
          <input
            type="text"
            placeholder="Age"
            value={donor.age || ""}
            onChange={(e) => setDonor({ ...donor, age: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="text"
            placeholder="Blood Group"
            value={donor.blood_group || ""}
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