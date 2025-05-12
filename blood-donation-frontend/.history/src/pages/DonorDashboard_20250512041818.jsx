import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const [donor, setDonor] = useState({ username: "", age: "", blood_group: "" });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return navigate("/login");
      
      try {
        const res = await axios.get("http://localhost:5000/getDonorProfile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data?.donor) {
          setDonor(res.data.donor);
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.put("http://localhost:5000/updateDonorProfile", donor, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile updated!");
      setEditing(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete your profile permanently?")) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete("http://localhost:5000/deleteDonorProfile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem("authToken");
        navigate("/login");
      } catch (err) {
        alert("Deletion failed");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <h2>Donor Dashboard</h2>
      
      {editing ? (
        <div className="mt-3">
          <input
            value={donor.username}
            onChange={(e) => setDonor({...donor, username: e.target.value})}
            className="form-control mb-2"
            placeholder="Username"
          />
          <input
            value={donor.age}
            onChange={(e) => setDonor({...donor, age: e.target.value})}
            className="form-control mb-2"
            placeholder="Age"
          />
          <input
            value={donor.blood_group}
            onChange={(e) => setDonor({...donor, blood_group: e.target.value})}
            className="form-control mb-2"
            placeholder="Blood Group"
          />
          <div className="d-flex gap-2">
            <button onClick={handleUpdate} className="btn btn-success">
              Save Changes
            </button>
            <button 
              onClick={() => setEditing(false)} 
              className="btn btn-outline-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <div className="card p-3 mb-3">
            <p><strong>Username:</strong> {donor.username}</p>
            <p><strong>Age:</strong> {donor.age}</p>
            <p><strong>Blood Group:</strong> {donor.blood_group}</p>
          </div>
          <div className="d-flex gap-2">
            <button 
              onClick={() => setEditing(true)} 
              className="btn btn-primary"
            >
              Edit Profile
            </button>
            <button 
              onClick={handleDelete} 
              className="btn btn-outline-danger"
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DonorDashboard;