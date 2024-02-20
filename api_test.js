const axios = require("axios");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Function to test the login API
async function testLoginAPI() {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      username: "testuser",
      password: "testpassword",
    });
    console.log("Login API Response:", response.data);
  } catch (error) {
    console.error("Error testing login API:", error.response.data);
  }
}

// Function to test the register API
async function testRegisterAPI() {
  try {
    const response = await axios.post("http://localhost:3001/register", {
      username: "testuser",
      password: "testpassword",
      phone: "1112223333",
      email: "test_user@example.com",
      isAdmin: true,
    });
    console.log("Register API Response:", response.data);
  } catch (error) {
    console.error("Error testing register API:", error.response.data);
  }
}

// Test the APIs
testRegisterAPI();
sleep(1000);
testLoginAPI();