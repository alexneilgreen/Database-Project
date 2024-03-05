const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3001;

//TODO:
// ADD SEARCH API CALL

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

//========= ACCOUNT MANAGEMENT API CALLS

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("User logging in: ", username, password);

  // Check if user exists with the given username and password
  const query = "SELECT * FROM Users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, userResults) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else if (userResults.length > 0) {
      // User found and password is correct
      const userId = userResults[0].userId;

      // Check if the user is an admin
      const adminQuery = "SELECT * FROM Admins WHERE userId = ?";
      db.query(adminQuery, [userId], (adminErr, adminResults) => {
        if (adminErr) {
          console.error(adminErr);
          res.status(500).send("Internal Server Error");
        } else {
          // Construct user information object
          const userInfo = {
            userId: userId,
            username: userResults[0].username,
            phone: userResults[0].phone,
            email: userResults[0].email,
          };

          if (adminResults.length > 0) {
            // User is an admin, return the adminID and user information
            const adminId = adminResults[0].adminId;
            res
              .status(200)
              .json({
                code: "good",
                message: "Login successful as admin",
                adminId: adminId,
                userInfo: userInfo,
              });
          } else {
            // User is not an admin, return user information
            res
              .status(200)
              .json({
                code: "good",
                message: "Login successful",
                userInfo: userInfo,
              });
          }
        }
      });
    } else {
      // No user found or password is incorrect
      res
        .status(401)
        .json({ code: "bad", message: "Invalid username/password" });
    }
  });
});

// Register API
app.post("/register", (req, res) => {
  const { username, password, phone, email, isAdmin } = req.body;

  console.log("User registering: ", username, password, phone, email, isAdmin);

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
      const insertUserQuery =
        "INSERT INTO Users (username, password, phone, email) VALUES (?, ?, ?, ?)";
      db.query(
        insertUserQuery,
        [username, password, phone, email],
        (insertUserErr, insertUserResults) => {
          if (insertUserErr) {
            console.error(insertUserErr);
            res.status(500).send("Internal Server Error");
          } else {
            // User successfully added to Users table
            const userId = insertUserResults.insertId;
            const userInfo = {
              userId: userId,
              username: username,
              phone: phone,
              email: email,
            };

            if (isAdmin) {
              // If user is admin, insert into Admins table
              const insertAdminQuery = "INSERT INTO Admins (userId) VALUES (?)";
              db.query(
                insertAdminQuery,
                [userId],
                (insertAdminErr, insertAdminResults) => {
                  if (insertAdminErr) {
                    console.error(insertAdminErr);
                    res.status(500).send("Internal Server Error");
                  } else {
                    // User successfully added to Admins table
                    const adminId = insertAdminResults.insertId;
                    res
                      .status(200)
                      .json({
                        code: "good",
                        message: "Admin-user registered successfully",
                        adminId: adminId,
                        userInfo: userInfo,
                      });
                  }
                }
              );
            } else {
              // User is not admin, registration is complete
              res
                .status(200)
                .json({
                  code: "good",
                  message: "User registered successfully",
                  userInfo: userInfo,
                });
            }
          }
        }
      );
    }
  });
});

// Delete User API
app.delete("/delete-user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  console.log("Deleting user: ", userId);

  // Check if userId is provided and valid
  if (isNaN(userId)) {
    return res.status(400).json({ code: "bad", message: "Invalid user ID" });
  }

  // Delete user entry from Users table and related entries from other tables
  const deleteQuery = "DELETE FROM Users WHERE userId = ?";
  db.query(deleteQuery, [userId], (deleteErr, deleteResults) => {
    if (deleteErr) {
      console.error(deleteErr);
      return res.status(500).send("Internal Server Error");
    }

    // Return success response
    res
      .status(200)
      .json({ code: "good", message: "User deleted successfully" });
  });
});

//=======================================

//========= EVENT MANAGEMENT API CALLS

//>>> AUTO LOADING

// Autoload API
app.get("/auto/all", (req, res) => {
  // Get the start and end indices from the query parameters
  const startIndex = parseInt(req.query.startIndex);
  const endIndex = parseInt(req.query.endIndex);

  // Check if startIndex and endIndex are valid numbers
  if (isNaN(startIndex) || isNaN(endIndex)) {
    return res
      .status(400)
      .json({ code: "bad", message: "Invalid start or end index" });
  }

  // Query the database to fetch events within the specified range
  const query = "SELECT * FROM Events LIMIT ?, ?";
  db.query(query, [startIndex, endIndex - startIndex + 1], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    } else {
      res
        .status(200)
        .json({
          code: "good",
          message: "Events loaded successfully",
          events: results,
        });
    }
  });
});

// Scheduled Events API
app.get("/auto/scheduled/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const startIndex = parseInt(req.query.startIndex);
  const endIndex = parseInt(req.query.endIndex);

  // Check if userId, startIndex, and endIndex are valid numbers
  if (isNaN(userId) || isNaN(startIndex) || isNaN(endIndex)) {
    return res
      .status(400)
      .json({
        code: "bad",
        message: "Invalid user ID, start index, or end index",
      });
  }

  // Query the database to fetch scheduled events for the user within the specified range
  const query =
    "SELECT Events.* FROM Events WHERE eventId IN (SELECT eventId FROM `event_lists` WHERE userId = ?) LIMIT ?, ?";
  db.query(
    query,
    [userId, startIndex, endIndex - startIndex + 1],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        res
          .status(200)
          .json({
            code: "good",
            message: "Scheduled events loaded successfully",
            scheduledEvents: results,
          });
      }
    }
  );
});

// Auto API to retrieve events associated with RSOs followed by the user
app.get("/auto/followed-rsos/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);

  // Check if userId is a valid number
  if (isNaN(userId)) {
    return res.status(400).json({ code: "bad", message: "Invalid user ID" });
  }

  // Query to find all RSOs followed by the user
  const rsoQuery = "SELECT rsoId FROM RSO_Followers WHERE userId = ?";
  db.query(rsoQuery, [userId], (rsoErr, rsoResults) => {
    if (rsoErr) {
      console.error(rsoErr);
      return res.status(500).send("Internal Server Error");
    }

    // Extract the list of rsoIds from the query results
    const rsoIds = rsoResults.map((row) => row.rsoId);

    if (rsoIds.length === 0) {
      // If the user does not follow any RSOs, return an empty response
      return res
        .status(200)
        .json({ code: "good", message: "No events found", events: [] });
    }

    // Query to retrieve all events associated with the RSOs followed by the user
    const eventQuery =
      "SELECT * FROM Events WHERE eventId IN (SELECT eventId FROM Event_Lists WHERE rsoId IN (?))";
    db.query(eventQuery, [rsoIds], (eventErr, eventResults) => {
      if (eventErr) {
        console.error(eventErr);
        return res.status(500).send("Internal Server Error");
      }

      // Return the list of events associated with RSOs followed by the user
      res
        .status(200)
        .json({
          code: "good",
          message: "Events loaded successfully",
          events: eventResults,
        });
    });
  });
});

//<<<

//>>> EVENT CREATION/DELETION/EDITING

// Create Event API
app.post("/create-event", (req, res) => {
  const {
    adminId,
    rsoId,
    eventName,
    eventTime,
    eventAddress,
    locationLat,
    locationLong,
    eventDescription,
  } = req.body;

  console.log(
    "Creating event: ",
    adminId,
    rsoId,
    eventName,
    eventTime,
    eventAddress,
    locationLat,
    locationLong,
    eventDescription
  );

  // Check if adminId, rsoId, and other parameters are provided and valid
  if (!adminId || !rsoId || isNaN(adminId) || isNaN(rsoId)) {
    return res
      .status(400)
      .json({ code: "bad", message: "Invalid admin ID or RSO ID" });
  }

  // Check if the provided adminId is an owner of the specified RSO
  const adminOwnershipQuery =
    "SELECT * FROM RSO_Owners WHERE adminId = ? AND rsoId = ?";
  db.query(
    adminOwnershipQuery,
    [adminId, rsoId],
    (ownershipErr, ownershipResults) => {
      if (ownershipErr) {
        console.error(ownershipErr);
        return res.status(500).send("Internal Server Error");
      } else if (ownershipResults.length === 0) {
        return res
          .status(401)
          .json({
            code: "bad",
            message: "Unauthorized: Admin is not an owner of the specified RSO",
          });
      }

      // Insert the new event into the Events table
      const insertEventQuery =
        "INSERT INTO Events (rsoId, eventName, eventTime, eventAddress, locationLat, locationLong, eventDescription) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(
        insertEventQuery,
        [
          rsoId,
          eventName,
          eventTime,
          eventAddress,
          locationLat,
          locationLong,
          eventDescription,
        ],
        (insertErr, insertResults) => {
          if (insertErr) {
            console.error(insertErr);
            return res.status(500).send("Internal Server Error");
          }

          // Retrieve the newly inserted event ID
          const eventId = insertResults.insertId;

          // Return success response with the newly created event ID
          res
            .status(200)
            .json({
              code: "good",
              message: "Event created successfully",
              eventId: eventId,
            });
        }
      );
    }
  );
});

// Delete Event API
app.delete("/delete-event/:rsoId/:adminId/:eventId", (req, res) => {
  const rsoId = parseInt(req.params.rsoId);
  const adminId = parseInt(req.params.adminId);
  const eventId = parseInt(req.params.eventId);

  console.log("Deleting Event: ", rsoId, adminId, eventId);

  // Check if adminId, rsoId, and eventId are provided and valid
  if (isNaN(adminId) || isNaN(rsoId) || isNaN(eventId)) {
    return res
      .status(400)
      .json({ code: "bad", message: "Invalid admin ID, RSO ID, or Event ID" });
  }

  // Verify that the admin is the owner of the RSO
  const ownershipQuery =
    "SELECT * FROM RSO_Owners WHERE adminId = ? AND rsoId = ?";
  db.query(
    ownershipQuery,
    [adminId, rsoId],
    (ownershipErr, ownershipResults) => {
      if (ownershipErr) {
        console.error(ownershipErr);
        return res.status(500).send("Internal Server Error");
      }

      // If the admin is not the owner of the RSO, return an unauthorized response
      if (ownershipResults.length === 0) {
        return res
          .status(401)
          .json({
            code: "unauthorized",
            message: "Admin is not the owner of the RSO",
          });
      }

      // Delete the event from the Events table
      const deleteQuery = "DELETE FROM Events WHERE eventId = ?";
      db.query(deleteQuery, [eventId], (deleteErr, deleteResults) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res.status(500).send("Internal Server Error");
        }

        // Return success response
        res
          .status(200)
          .json({ code: "good", message: "Event deleted successfully" });
      });
    }
  );
});

// Edit Event API
app.put("/edit-event/:adminId/:rsoId/:eventId", (req, res) => {
  const adminId = parseInt(req.params.adminId);
  const rsoId = parseInt(req.params.rsoId);
  const eventId = parseInt(req.params.eventId);
  const {
    eventName,
    eventTime,
    locationLat,
    locationLong,
    eventAddress,
    eventDescription,
  } = req.body;

  console.log(
    "Editing event details: ",
    eventName,
    eventTime,
    locationLat,
    locationLong,
    eventAddress,
    eventDescription,
    adminId,
    rsoId,
    eventId
  );

  // Check if adminId, rsoId, and eventId are provided and valid
  if (isNaN(adminId) || isNaN(rsoId) || isNaN(eventId)) {
    return res
      .status(400)
      .json({ code: "bad", message: "Invalid admin ID, RSO ID, or Event ID" });
  }

  // Verify that the admin is the owner of the RSO
  const ownershipQuery =
    "SELECT * FROM RSO_Owners WHERE adminId = ? AND rsoId = ?";
  db.query(
    ownershipQuery,
    [adminId, rsoId],
    (ownershipErr, ownershipResults) => {
      if (ownershipErr) {
        console.error(ownershipErr);
        return res.status(500).send("Internal Server Error");
      }

      // If the admin is not the owner of the RSO, return an unauthorized response
      if (ownershipResults.length === 0) {
        return res
          .status(401)
          .json({
            code: "unauthorized",
            message: "Admin is not the owner of the RSO",
          });
      }

      // Update the event information in the Events table
      const updateQuery =
        "UPDATE Events SET eventName = ?, eventTime = ?, locationLat = ?, locationLong = ?, eventAddress = ?, eventDescription = ? WHERE eventId = ?";
      const values = [
        eventName,
        eventTime,
        locationLat,
        locationLong,
        eventAddress,
        eventDescription,
        eventId,
      ];
      db.query(updateQuery, values, (updateErr, updateResults) => {
        if (updateErr) {
          console.error(updateErr);
          return res.status(500).send("Internal Server Error");
        }

        // Return success response
        res
          .status(200)
          .json({
            code: "good",
            message: "Event information updated successfully",
          });
      });
    }
  );
});

//<<<

//>>> EVENT FOLLOWING AND UNFOLLOWING

// Follow Event API
app.post("/follow-event", (req, res) => {
  const { userId, eventId } = req.body;

  console.log("User following event: ", userId, eventId);

  // Check if userId and eventId are provided and valid
  if (!userId || !eventId || isNaN(userId) || isNaN(eventId)) {
    return res.status(400).json({ code: "bad", message: "Invalid user ID or event ID" });
  }

  // Check if the user is already following the event
  const checkQuery = "SELECT * FROM event_lists WHERE userId = ? AND eventId = ?";
  db.query(checkQuery, [userId, eventId], (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).send("Internal Server Error");
    } else if (checkResults.length > 0) {
      // User is already following the event
      return res.status(400).json({ code: "bad", message: "User is already following the event" });
    } else {
      // Insert the new entry into the event_lists table
      const insertQuery = "INSERT INTO event_lists (userId, eventId) VALUES (?, ?)";
      db.query(insertQuery, [userId, eventId], (insertErr, insertResults) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).send("Internal Server Error");
        }
        
        // Return success response
        res.status(200).json({ code: "good", message: "User is now following the event" });
      });
    }
  });
});

// Unfollow Event API
app.post("/unfollow-event", (req, res) => {
  const { userId, eventId } = req.body;

  console.log("User unfollowing event: ", userId, eventId);

  // Check if userId and eventId are provided and valid
  if (!userId || !eventId || isNaN(userId) || isNaN(eventId)) {
    return res.status(400).json({ code: "bad", message: "Invalid user ID or event ID" });
  }

  // Check if the user is currently following the event
  const checkQuery = "SELECT * FROM event_lists WHERE userId = ? AND eventId = ?";
  db.query(checkQuery, [userId, eventId], (checkErr, checkResults) => {
    if (checkErr) {
      console.error(checkErr);
      return res.status(500).send("Internal Server Error");
    } else if (checkResults.length === 0) {
      // User is not following the event
      return res.status(400).json({ code: "bad", message: "User is not following the event" });
    } else {
      // Delete the entry from the event_lists table to unfollow the event
      const deleteQuery = "DELETE FROM event_lists WHERE userId = ? AND eventId = ?";
      db.query(deleteQuery, [userId, eventId], (deleteErr, deleteResults) => {
        if (deleteErr) {
          console.error(deleteErr);
          return res.status(500).send("Internal Server Error");
        }
        
        // Return success response
        res.status(200).json({ code: "good", message: "User has unfollowed the event" });
      });
    }
  });
});

//========= RSO MANAGEMENT API CALLS

//>>> RSO CREATION/DELETION/EDITING/JOINING/LEAVING

// Create RSO API
app.post("/create-rso", (req, res) => {
  const { adminId, rsoName, rsoDescription, adminCode } = req.body;

  console.log("Creating RSO: ", adminId, rsoName, rsoDescription, adminCode);

  // Check if adminId, rsoName, rsoDescr, and adminCode are provided
  if (!adminId || !rsoName || !rsoDescription || !adminCode) {
    return res.status(400).json({ code: "bad", message: "Missing parameters" });
  }

  // Insert the RSO into the RSOs table
  const insertQuery =
    "INSERT INTO RSOs (rsoName, rsoDescription, adminCode) VALUES (?, ?, ?)";
  db.query(
    insertQuery,
    [rsoName, rsoDescription, adminCode],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      const rsoId = results.insertId;

      // Insert the admin-RSO pair into the RSO_Owners table
      const insertOwnerQuery =
        "INSERT INTO RSO_Owners (adminId, rsoId) VALUES (?, ?)";
      db.query(insertOwnerQuery, [adminId, rsoId], (ownerErr, ownerResults) => {
        if (ownerErr) {
          console.error(ownerErr);
          // Rollback the RSO creation if adding admin fails
          db.query(
            "DELETE FROM RSOs WHERE rsoId = ?",
            [rsoId],
            (rollbackErr, rollbackResults) => {
              if (rollbackErr) {
                console.error(rollbackErr);
              }
            }
          );
          return res.status(500).send("Internal Server Error");
        }

        // Return success response
        res
          .status(200)
          .json({ code: "good", message: "RSO created successfully", rsoId });
      });
    }
  );
});

// Edit RSO API
app.put("/edit-rso/:rsoId/:adminId", (req, res) => {
  const adminId = parseInt(req.params.adminId);
  const rsoId = parseInt(req.params.rsoId);
  const { rsoName, rsoDescription, adminCode } = req.body;

  console.log(
    "Editing RSO details: ",
    rsoName,
    rsoDescription,
    adminCode,
    adminId,
    rsoId
  );

  // Check if adminId and rsoId are provided and valid
  if (isNaN(adminId) || isNaN(rsoId)) {
    return res
      .status(400)
      .json({ code: "bad", message: "Invalid admin ID or RSO ID" });
  }

  // Verify that the admin is the owner of the RSO
  const ownershipQuery =
    "SELECT * FROM RSO_Owners WHERE adminId = ? AND rsoId = ?";
  db.query(
    ownershipQuery,
    [adminId, rsoId],
    (ownershipErr, ownershipResults) => {
      console.log("RSO ownership results: " + ownershipResults + "\n");

      if (ownershipErr) {
        console.error(ownershipErr);
        return res.status(500).send("Internal Server Error");
      }

      // If the admin is not the owner of the RSO, return an unauthorized response
      if (ownershipResults.length === 0) {
        return res
          .status(401)
          .json({
            code: "unauthorized",
            message: "Admin is not the owner of the RSO",
          });
      }

      // Update the RSO information in the RSOs table
      const updateQuery =
        "UPDATE RSOs SET rsoName = ?, rsoDescription = ?, adminCode = ? WHERE rsoId = ?";
      const values = [rsoName, rsoDescription, adminCode, rsoId];
      db.query(updateQuery, values, (updateErr, updateResults) => {
        if (updateErr) {
          console.error(updateErr);
          return res.status(500).send("Internal Server Error");
        }

        // Return success response
        res
          .status(200)
          .json({
            code: "good",
            message: "RSO information updated successfully",
          });
      });
    }
  );
});

// RSO Deletion API
app.delete("/delete-rso/:rsoId/:adminId", (req, res) => {
  const rsoId = parseInt(req.params.rsoId);
  const adminId = parseInt(req.params.adminId);

  console.log("Deleting RSO: ", rsoId, adminId);

  // Check if rsoId and adminId are provided and valid
  if (isNaN(rsoId) || isNaN(adminId)) {
    return res
      .status(400)
      .json({ code: "bad", message: "Invalid RSO ID or admin ID" });
  }

  // Query the database to check if the admin is the owner of the RSO
  const ownershipQuery =
    "SELECT * FROM RSO_Owners WHERE adminId = ? AND rsoId = ?";
  db.query(ownershipQuery, [adminId, rsoId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // If the admin is not the owner of the RSO, return an unauthorized response
    if (results.length === 0) {
      return res
        .status(401)
        .json({
          code: "unauthorized",
          message: "Admin is not the owner of the RSO",
        });
    }

    // Delete the RSO from the RSOs table
    const deleteQuery = "DELETE FROM RSOs WHERE rsoId = ?";
    db.query(deleteQuery, [rsoId], (deleteErr, deleteResults) => {
      if (deleteErr) {
        console.error(deleteErr);
        return res.status(500).send("Internal Server Error");
      }

      // Return success response
      res
        .status(200)
        .json({ code: "good", message: "RSO deleted successfully" });
    });
  });
});

// Join RSO as Admin API
app.post("/administrate-rso", (req, res) => {
  const { adminId, rsoId, adminCode } = req.body;

  console.log("Admin joining RSO: ", adminId, rsoId, adminCode);

  // Check if adminId, rsoId, and adminCode are provided and valid
  if (!adminId || !rsoId || !adminCode || isNaN(adminId) || isNaN(rsoId)) {
    return res
      .status(400)
      .json({
        code: "bad",
        message: "Invalid admin ID, RSO ID, or admin code",
      });
  }

  // Query the database to check if the provided admin code is correct
  const codeQuery = "SELECT adminCode FROM RSOs WHERE rsoId = ?";
  db.query(codeQuery, [rsoId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Check if the provided admin code matches the code for the RSO
    if (results.length === 0 || results[0].adminCode !== adminCode) {
      return res
        .status(401)
        .json({ code: "unauthorized", message: "Incorrect admin code" });
    }

    // Insert the admin-RSO pair into the RSO_Owners table
    const insertQuery = "INSERT INTO RSO_Owners (adminId, rsoId) VALUES (?, ?)";
    db.query(insertQuery, [adminId, rsoId], (insertErr, insertResults) => {
      if (insertErr) {
        console.error(insertErr);
        return res.status(500).send("Internal Server Error");
      }

      // Return success response
      res
        .status(200)
        .json({
          code: "good",
          message: "Admin joined RSO as administrator successfully",
        });
    });
  });
});

// Leave RSO as Admin API
app.post("/disown-rso", (req, res) => {
  const { adminId, rsoId } = req.body;

  console.log("Admin leaving RSO: ", adminId, rsoId);

  // Check if adminId and rsoId are provided and valid
  if (!adminId || !rsoId || isNaN(adminId) || isNaN(rsoId)) {
    return res
      .status(400)
      .json({ code: "bad", message: "Invalid admin ID or RSO ID" });
  }

  // Delete the admin-RSO pair from the RSO_Owners table
  const deleteQuery = "DELETE FROM RSO_Owners WHERE adminId = ? AND rsoId = ?";
  db.query(deleteQuery, [adminId, rsoId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Return success response
    res
      .status(200)
      .json({
        code: "good",
        message: "Admin left RSO as administrator successfully",
      });
  });
});

//<<<

//>>> RSO FOLLOWING AND UNFOLLOWING

// Follow RSO API
app.post("/follow-rso", (req, res) => {
  const { userId, rsoId } = req.body;

  console.log("User following RSO: ", userId, rsoId);

  // Check if userId and rsoId are provided and valid
  if (!userId || !rsoId || isNaN(userId) || isNaN(rsoId)) {
    return res
      .status(400)
      .json({ code: "bad", message: "Invalid user ID or RSO ID" });
  }

  // Insert the user-RSO pair into the RSO_Followers table
  const insertQuery = "INSERT INTO RSO_Followers (userId, rsoId) VALUES (?, ?)";
  db.query(insertQuery, [userId, rsoId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Return success response
    res
      .status(200)
      .json({ code: "good", message: "User followed RSO successfully" });
  });
});

// Leave RSO as Follower API
app.post("/unfollow-rso", (req, res) => {
  const { userId, rsoId } = req.body;

  console.log("User unfollowing RSO: ", userId, rsoId);

  // Check if userId and rsoId are provided and valid
  if (!userId || !rsoId || isNaN(userId) || isNaN(rsoId)) {
    return res
      .status(400)
      .json({ code: "bad", message: "Invalid user ID or RSO ID" });
  }

  // Delete the user-RSO pair from the RSO_Followers table
  const deleteQuery =
    "DELETE FROM RSO_Followers WHERE userId = ? AND rsoId = ?";
  db.query(deleteQuery, [userId, rsoId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    // Return success response
    res
      .status(200)
      .json({
        code: "good",
        message: "User left RSO as follower successfully",
      });
  });
});

//<<<

//>>> OTHER UTILITY

// Check if Admin is Last Admin API
app.get("/check-last-admin/:rsoId/:adminId", (req, res) => {
  const rsoId = parseInt(req.params.rsoId);
  const adminId = parseInt(req.params.adminId);

  console.log("Checking if admin is last in RSO: ", rsoId, adminId);

  // Check if adminId and rsoId are provided and valid
  if (isNaN(adminId) || isNaN(rsoId)) {
    return res
      .status(400)
      .json({ code: "bad", message: "Invalid admin ID or RSO ID" });
  }

  // Query the database to check if the admin is the last admin of the RSO
  const query = "SELECT COUNT(*) AS adminCount FROM RSO_Owners WHERE rsoId = ?";
  db.query(query, [rsoId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    const adminCount = results[0].adminCount;

    // If adminCount is 1, the admin is the last admin; otherwise, there are other admins
    const isLastAdmin = adminCount === 1;

    // Return success response with boolean indicating whether admin is last admin
    if (isLastAdmin) {
      res
        .status(200)
        .json({
          code: "good",
          message: "Admin is the last admin of the RSO",
          isLastAdmin: isLastAdmin,
        });
    } else {
      res
        .status(200)
        .json({
          code: "good",
          message: "Admin is not the last admin of the RSO",
          isLastAdmin: isLastAdmin,
        });
    }
  });
});

//<<<

//=======================================

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});