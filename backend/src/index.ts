import express = require("express"); // Import the express module using CommonJS syntax

const app = express(); // Create an instance of the Express application

// Define a route for the root URL ("/") that sends a response when accessed
app.get("/", (req, res) => {
  res.send("Hello, Wolrd! My name is Task App. This is the backend server.");
});

// Start the server and listen on port 8000. When the server starts, log a message to the console.
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
