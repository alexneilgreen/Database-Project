/*Note: Be sure to reset database indices to proper starting values if you care about ID consistency */

const axios = require("axios");

let test_rsoID;
let adminID1 = 1;
let adminID2 = 2;
let userID2 = 2;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to handle errors
const handleError = (error) => {
  if (error.response) {
    console.error("Error:", error.response.data);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
  }
};

// Function to test Create RSO API
const testCreateRSO = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing RSO creation: ");
    try {
      const response = await axios.post("http://localhost:3001/create-rso", {
        adminId: adminID1,
        rsoName: "Test RSO",
        rsoDescription: "Description of Test RSO",
        adminCode: "admin123",
      });
      console.log("Create RSO Response:", response.data);
      // Store the returned RSO ID in the global variable
      test_rsoID = response.data.rsoId;
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Follow RSO API
const testFollowRSO = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing RSO following: ");
    try {
      const response = await axios.post("http://localhost:3001/follow-rso", {
        userId: userID2,
        rsoId: test_rsoID,
      });
      console.log("Follow RSO Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Unfollow RSO API
const testUnfollowRSO = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing RSO unfollowing: ");
    try {
      const response = await axios.post("http://localhost:3001/unfollow-rso", {
        userId: userID2,
        rsoId: test_rsoID,
      });
      console.log("Unfollow RSO Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Administrate RSO API
const testAdministrateRSO = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing RSO joining as admin: ");
    try {
      const response = await axios.post(
        "http://localhost:3001/administrate-rso",
        {
          adminId: adminID2,
          rsoId: test_rsoID,
          adminCode: "admin123",
        }
      );
      console.log("Administrate RSO Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Disown RSO API
const testDisownRSO = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing RSO leaving as admin: ");
    try {
      const response = await axios.post("http://localhost:3001/disown-rso", {
        adminId: adminID2,
        rsoId: test_rsoID,
      });
      console.log("Disown RSO Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test Edit RSO API
const testEditRSO = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing RSO editing: ");
    try {
      const response = await axios.put(
        `http://localhost:3001/edit-rso/${test_rsoID}/${adminID1}`,
        {
          rsoName: "Edited RSO",
          rsoDescription: "Description of Edited RSO",
          adminCode: "edited123",
        }
      );

      // Check if the response status is successful (200)
      if (response.status === 200) {
        console.log("Edit RSO Response:", response.data);
        resolve();
      } else {
        // If the response status is not successful, reject the promise
        reject(new Error(`Edit RSO failed with status: ${response.status}`));
      }
    } catch (error) {
      handleError(error);
      reject(error); // Reject with the caught error
    }
  });
};

// Function to test Delete RSO API
const testDeleteRSO = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Testing RSO deletion: ");
    try {
      const response = await axios.delete(
        `http://localhost:3001/delete-rso/${test_rsoID}/${adminID1}`
      );
      console.log("Delete RSO Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

async function testCheckLastAdminAPI(adminId) {
  return new Promise(async (resolve, reject) => {
    console.log("Testing if admin is last admin of RSO: ");
    try {
      // Make a GET request to the API endpoint to check if admin is the last admin
      const rsoId = test_rsoID;
      const response = await axios.get(
        `http://localhost:3001/check-last-admin/${rsoId}/${adminId}`
      );
      // Log the response from the API
      console.log(response.data);
      resolve();
    } catch (error) {
      // Log any errors
      console.error("Error:", error.message);
      reject();
    }
  });
}

// Chain the API calls
const runTests = async () => {
  try {
    await testCreateRSO();
    await testFollowRSO();
    await testUnfollowRSO();
    await testAdministrateRSO();
    await testEditRSO();
    await testCheckLastAdminAPI(adminID2);
    await testDisownRSO();
    await testCheckLastAdminAPI(adminID1);
    await testDeleteRSO();
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Run the tests
runTests();
