/*Note: Be sure to reset database indices to proper starting values if you care about ID consistency */

const axios = require("axios");

let test_eventID;
let rsoID1 = 1;
let adminID1 = 1;
let adminID2 = 2;
let userID2 = 2;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to handle errors
const handleError = (error) => {
  console.error("Error:", error.response ? error.response.data : error.message);
};

// Function to test Autoload API
const testAutoloadEvents = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing autoload events: ");
    try {
      const response = await axios.get(
        "http://localhost:3001/auto/all?startIndex=0&endIndex=10"
      );
      console.log("Autoload Events Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Scheduled Events API
const testAutoloadScheduledEvents = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing scheduled events: ");
    try {
      const response = await axios.get(
        `http://localhost:3001/auto/scheduled/3?startIndex=0&endIndex=10`
      );
      console.log("Scheduled Events Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Followed RSOs API
const testFollowedRSOEvents = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing followed RSOs: ");
    try {
      const response = await axios.get(
        `http://localhost:3001/auto/followed-rsos/${userID2}`
      );
      console.log("Followed RSOs Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Follow Event API
const testFollowEvent = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing event following: ");
    try {
      const response = await axios.post("http://localhost:3001/follow-event", {
        userId: userID2,
        eventId: test_eventID,
      });
      console.log("Follow Event Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Unfollow Event API
const testUnfollowEvent = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing event unfollowing: ");
    try {
      const response = await axios.post(
        "http://localhost:3001/unfollow-event",
        {
          userId: userID2,
          eventId: test_eventID,
        }
      );
      console.log("Unfollow Event Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Create Event API
const testCreateEvent = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing event creation: ");
    try {
      const response = await axios.post("http://localhost:3001/create-event", {
        adminId: adminID1,
        rsoId: rsoID1,
        eventName: "Test Event from Test File",
        eventTime: "2024-02-20 12:00:00",
        eventAddress: "123 Main St",
        locationLat: 40.7128,
        locationLong: -74.006,
        eventDescription: "Description of Test Event",
      });
      console.log("Create Event Response:", response.data);
      // Store the returned event ID in the global variable
      test_eventID = response.data.eventId;
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Delete Event API
const testDeleteEvent = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing event deletion: ");
    try {
      const response = await axios.delete(
        `http://localhost:3001/delete-event/${rsoID1}/${adminID1}/${test_eventID}`
      );
      console.log("Delete Event Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Edit Event API
const testEditEvent = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing event editing: ");
    try {
      const response = await axios.put(
        `http://localhost:3001/edit-event/${rsoID1}/${adminID1}/${test_eventID}`,
        {
          eventName: "Edited Test Event",
          eventTime: "2024-02-21 12:00:00",
          locationLat: 40.7128,
          locationLong: -74.006,
          eventAddress: "456 Elm St",
          eventDescription: "Edited description of Test Event",
        }
      );
      console.log("Edit Event Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Chain the API calls
const runTests = async () => {
  try {
    await testCreateEvent();
    await testFollowEvent();
    await testAutoloadEvents();
    await testAutoloadScheduledEvents();
    await testFollowedRSOEvents();
    await testUnfollowEvent();
    await testEditEvent();
    await testDeleteEvent();
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Run the tests
runTests();
