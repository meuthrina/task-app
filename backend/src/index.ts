import express = require("express"); // Import the express module using CommonJS syntax
import authRouter from "./routes/auth.js";

const app = express(); // Create an instance of the Express application

// MIDDLEWARE
// This app.use() method mounts the express.json() middleware, which is used to parse incoming JSON requests. It allows the server to handle JSON data sent in the request body.
app.use(express.json());
// This app.use() method mounts the authRouter on the "/auth" path, meaning that any requests to "/auth" will be handled by the authRouter.
app.use("/auth", authRouter); // Use the authRouter for handling authentication-related routes

// Define a route for the root URL ("/") that sends a response when accessed
app.get("/", (req, res) => {
  res.send("Hello, Wolrd! My name is Task App. This is the backend server.");
});

// Start the server and listen on port 8000. When the server starts, log a message to the console.
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
