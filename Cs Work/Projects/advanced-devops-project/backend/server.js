require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// MySQL Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Create table if not exists
const initDB = () => {
  db.query(`
    CREATE TABLE IF NOT EXISTS user_inputs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      content VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error("❌ Table creation failed:", err.message);
      // Retry after 3 seconds if DB not ready yet
      setTimeout(initDB, 3000);
    } else {
      console.log("✅ Table ready");
    }
  });
};

// Check DB Connection on Startup with retry
const connectWithRetry = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("❌ Database connection failed:", err.message, "— retrying in 3s...");
      setTimeout(connectWithRetry, 3000);
    } else {
      console.log("✅ Connected to MySQL database");
      connection.release();
      initDB();
    }
  });
};

connectWithRetry();

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET all entries
app.get('/api/v1/entries', (req, res) => {
  db.query("SELECT * FROM user_inputs ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error("Select error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// POST - save input
app.post('/api/v1/process', (req, res) => {
  const input = req.body.input;

  if (!input) {
    return res.status(400).json({ error: "Input required" });
  }

  db.query(
    "INSERT INTO user_inputs (content) VALUES (?)",
    [input],
    (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ status: 'Success', id: result.insertId });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});