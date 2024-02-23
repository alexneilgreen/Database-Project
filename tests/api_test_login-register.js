/*Note: Be sure to reset database indices to proper starting values if you care about ID consistency */

const axios = require("axios");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to handle errors
const handleError = (error) => {
  console.error("Error:", error.response.data);
};

let test_userId; // Global variable to store the userId or adminId

// Function to test the register API
const testRegister = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username: "temp_user",
        password: "testpassword",
        phone: "0001110000",
        email: "temp_user@example.com",
        isAdmin: false,
      });
      console.log("Register API Response:", response.data);
      
      // Store the userId or adminId from the response
      test_userId = response.data.userInfo.userId;

      console.log("New user's ID: ",  test_userId);
      
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test the login API
const testLogin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: "temp_user",
        password: "testpassword",
      });
      console.log("Login API Response:", response.data);
      resolve();
    } catch (error) {
      handleError(error);
      reject();
    }
  });
};

// Function to test the deletion of a user
const testDeletion = () => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Deleting ID:", test_userId);
      const response = await axios.delete(`http://localhost:3001/delete-user/${test_userId}`);
      console.log("Delete User API Response:", response.data);
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
    await testRegister();
    await testLogin();
    await testDeletion();
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Run the tests
runTests();