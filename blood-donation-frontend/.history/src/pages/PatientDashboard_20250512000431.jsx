import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No token found, please log in.");
      setLoading(false);
      return;
    }

    // Fetch matching donors
    axios
      .get("http://localhost:5000/getMatchingDonors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDonors(response.data.donors);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching donors. Please try again.");
        setLoading(false);
      });
  }, []);

  const handleSelect = () => {
    alert("Donor selected successfully!");
    navigate("/home");
  };

  return (
    <div className="container d-flex flex-column align-items-center" style={{ marginTop: "30px" }}>
      <h2 className="text-center mb-4">Available Donors</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : donors.length === 0 ? (
        <p>No donors available for your blood type</p>
      ) : (
        <table className="table table-striped table-hover table-bordered" style={{ width: "70%" }}>
          <thead>
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
                    onClick={handleSelect}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PatientDashboard;
