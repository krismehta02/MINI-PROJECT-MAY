import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const [donor, setDonor] = useState({});
  const [editing, setEditing] = useState(false);
  const [alreadyAlerted, setAlreadyAlerted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          if (!alreadyAlerted) {
            alert("No token found, please log in.");
            setAlreadyAlerted(true);
          }
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/getDonorProfile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDonor(response.data.donor);
      } catch (error) {
        if (!alreadyAlerted) {
          alert("Error fetching donor data");
          setAlreadyAlerted(true);
        }
      }
    };

    fetchDonorData();
  }, [navigate, alreadyAlerted]);

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
    if (window.confirm("Are you sure you want to cancel your registration?")) {
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
          <p><strong>Username:</strong> {donor.username}</p>
          <p><strong>Age:</strong> {donor.age}</p>
          <p><strong>Blood Group:</strong> {donor.blood_group}</p>
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