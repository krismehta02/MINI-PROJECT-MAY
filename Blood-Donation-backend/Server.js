const express = require('express');
const db = require('./db');
const bcrypt = require('bcryptjs');
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET_KEY = "your-secret-key";

// Registration Route (No Change)
app.post('/register', (req, res) => {
  const { role, username, phone_number, blood_group, age, password } = req.body;

  if (!role || !username || !phone_number || !blood_group || !age || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Password hashing error' });
    }

    const tableName = role === 'donor' ? 'donor_history' : 'patient_history';
    const query = `INSERT INTO ${tableName} (role, username, phone_number, blood_group, age, password) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(query, [role, username, phone_number, blood_group, age, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error', error: err });
      }

      if (role === 'donor') {
        const liveDonorQuery = `INSERT INTO live_donors (username, phone_number, blood_group, age) VALUES (?, ?, ?, ?)`;
        
        db.query(liveDonorQuery, [username, phone_number, blood_group, age], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error while adding to live_donors', error: err });
          }

          return res.status(201).json({ message: 'Donor registered successfully!' });
        });
      } else {
        return res.status(201).json({ message: 'Patient registered successfully!' });
      }
    });
  });
});

// Login Route (No Change)
app.post('/login', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required!' });
  }

  const tableName = role === 'donor' ? 'donor_history' : 'patient_history';
  const query = `SELECT * FROM ${tableName} WHERE username = ?`;

  db.query(query, [username], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found!' });
    }

    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Password comparison error' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials!' });
      }

      // Generate JWT Token
      const payload = {
        username: result[0].username,
        role: result[0].role,
        blood_group: result[0].blood_group
      };

      const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });

      // Send token to frontend
      return res.status(200).json({
        message: 'Login successful!',
        token
      });
    });
  });
});

// Fetch Matching Donors Route (Fixed Logic)
app.get('/getMatchingDonors', (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { blood_group } = decoded;

    const donorQuery = `SELECT username, blood_group, phone_number FROM live_donors WHERE blood_group = ?`;

    db.query(donorQuery, [blood_group], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error while fetching matching donors', error: err });
      }

      return res.status(200).json({
        message: 'Matching donors fetched successfully!',
        donors: result,
      });
    });
  });
});

// Delete Donor Profile (Restored Logic)
app.delete('/deleteDonorProfile', (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const username = decoded.username;
    const donorQuery = `DELETE FROM donor_history WHERE username = ?`;
    const liveDonorQuery = `DELETE FROM live_donors WHERE username = ?`;

    db.query(donorQuery, [username], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error while deleting donor profile', error: err });
      }

      db.query(liveDonorQuery, [username], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Database error while deleting live_donors', error: err });
        }

        return res.status(200).json({ message: 'Profile deleted successfully!' });
      });
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
