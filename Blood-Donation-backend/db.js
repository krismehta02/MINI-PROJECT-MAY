const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',   
  user: 'root',        
  password: 'cdac',     
  database: 'blood_donation' 
});

module.exports = db;
