const mysql = require('mysql2');
require('dotenv').config();

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 4000,
  ssl: { rejectUnauthorized: true }  // Required for TiDB Cloud
});

// Check the connection state before querying
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Handle connection closure and reconnection
db.on('error', (err) => {
  console.error('MySQL error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconnecting to the database...');
    db.connect(); // Reconnect
  }
});

module.exports = db;
