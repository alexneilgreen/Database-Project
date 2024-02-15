const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3001;

// MySQL connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "cop4710db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Use cors middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in the request body
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
