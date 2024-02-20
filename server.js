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

//////////////////////////////// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if user exists with the given username and password
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else if (results.length > 0) {
      // User found and password is correct
      res.status(200).json({ code: "good", message: "Login successful" });
    } else {
      // No user found or password is incorrect
      res.status(401).json({ code: "bad", message: "Invalid username/password" });
    }
  });
});

//////////////////////////////// Register API
app.post("/register", (req, res) => {
  const { username, password, phone, email, isAdmin } = req.body;

  // Check if username, phone, or email is already in use
  const checkQuery = "SELECT * FROM Users WHERE username = ?";
  db.query(checkQuery, [username], (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      res.status(500).send("Internal Server Error");
    } else if (checkResults.length > 0) {
      // Username, phone, or email is already in use
      res.status(400).json({ code: "bad", message: "Username already in use" });
    } else {
      // Insert the new user into the Users table
      const insertUserQuery = "INSERT INTO Users (username, password, phone, email) VALUES (?, ?, ?, ?)";
      db.query(insertUserQuery, [username, password, phone, email], (insertUserErr, insertUserResults) => {
        if (insertUserErr) {
          console.error(insertUserErr);
          res.status(500).send("Internal Server Error");
        } else {
          // User successfully added to Users table
          const userId = insertUserResults.insertId;

          if (isAdmin) {
            // If user is admin, insert into Admins table
            const insertAdminQuery = "INSERT INTO Admins (userId) VALUES (?)";
            db.query(insertAdminQuery, [userId], (insertAdminErr, insertAdminResults) => {
              if (insertAdminErr) {
                console.error(insertAdminErr);
                res.status(500).send("Internal Server Error");
              } else {
                // User successfully added to Admins table
                res.status(200).json({ code: "good", message: "Admin-user registered successfully" });
              }
            });
          } else {
            // User is not admin, registration is complete
            res.status(200).json({ code: "good", message: "User registered successfully" });
          }
        }
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
