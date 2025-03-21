const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  ssl: { rejectUnauthorized: true },
  waitForConnections: true,
  connectionLimit: 10,  // Allows up to 10 connections
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to database');
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = db;
