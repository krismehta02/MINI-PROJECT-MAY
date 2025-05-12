import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Use useEffect to fetch matching donors on component mount
  useEffect(() => {
    const fetchDonors = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch matching donors
        const response = await axios.get("http://localhost:5000/getMatchingDonors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the donors list in state if the request is successful
        setDonors(response.data.donors || []); // Ensure response data is handled safely
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Error fetching donors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const handleSelect = (donor) => {
    alert(`${donor.username} selected successfully!`);
    navigate("/home", { state: { selectedDonor: donor } });
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
              <tr key={donor.donor_id}> {/* Use donor.donor_id as the unique key */}
                <td>{donor.username}</td>
                <td>{donor.blood_group}</td>
                <td>{donor.phone_number}</td>
                <td>
                  <button className="btn btn-primary btn-sm" onClick={() => handleSelect(donor)}>
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
