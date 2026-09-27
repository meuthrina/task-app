import { Router } from "express"; // Import the Router class from the express module to create a new router instance

// Create a new instance of the Router class to define authentication-related routes
const authRouter = Router();

// Define a GET route for the root path ("/") of the authRouter. When this route is accessed, it sends a response indicating that the auth route is working.
authRouter.get("/", (req, res) => {
  res.send("Auth route is working!");
});

export default authRouter;