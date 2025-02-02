const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool to the database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  ssl: { rejectUnauthorized: true }  // Required for TiDB Cloud
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error getting connection from the pool:', err);
    return;
  }
  console.log('Connected to the database');
  connection.release();  // Release the connection back to the pool
});

module.exports = db;
