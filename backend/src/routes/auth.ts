import { Router, type Request, type Response } from "express"; // Import the Router class from the express module to create a new router instance
import { db } from "../db/index.js"; // Import the database instance from the db module
import { users, type NewUser } from "../db/schema.js"; // Import the users table schema from the schema module
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs"; // Import the bcrypt library for password hashing

// Create a new instance of the Router class to define authentication-related routes
const authRouter = Router();

// Define an interface for the request body of the signup route. This interface specifies the expected structure of the request body, which includes a username, password, and email.
interface SignupRequestBody {
  name: string; // The username of the user signing up
  password: string; // The password of the user signing up
  email: string;    // The email address of the user signing up
}

// Define an interface for the request body of the login route. This interface specifies the expected structure of the request body, which includes an email and password.
interface LoginRequestBody {
  email: string; // The email address of the user logging in
  password: string; // The password of the user logging in
}

// Define a POST route for the "/signup" path of the authRouter. This route handles user signup requests.
authRouter.post("/signup", async (req: Request<{}, {}, SignupRequestBody>, res:Response) => {
    try {
        const { name, password, email } = req.body; // Destructure the username, password, and email from the request body
        const existingUser = await db.select().from(users).where(eq(users.email, email)); // Check if a user with the provided email already exists in the database

        if (existingUser.length > 0) {
            return res.status(400).json({ error: "User already exists" }); // Send a 400 Bad Request response if the user already exists
        }

        const hashedPassword = await bcryptjs.hash(password, 10); // Hash the password using bcrypt with a salt round of 10

        // Create a new user object with the provided username, email, and hashed password. This object conforms to the NewUser type defined in the schema.
        const newUser: NewUser = {
            name: name, // Set the name of the new user to the provided username
            email: email,   // Set the email of the new user to the provided email
            password: hashedPassword, // Set the password of the new user to the hashed password
        };

        const [user] = await db.insert(users).values(newUser).returning(); // Insert the new user into the database and return the inserted user
        res.status(201).json({ message: "User created successfully", user }); // Send a 201 Created response with a success message and the created user
    } catch (e) {
        res.status(500).json({ error: e }); // Send a 500 Internal Server Error response if an error occurs
    }
});

authRouter.post("/login", async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    try {
        const { email, password } = req.body; // Destructure the email and password from the request body
        const [user] = await db.select().from(users).where(eq(users.email, email)); // Retrieve the user with the provided email from the database

        if (!user) {
            return res.status(400).json({ error: "Email not found" }); // Send a 400 Bad Request response if the user does not exist
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password); // Compare the provided password with the hashed password stored in the database

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Incorrect password" }); // Send a 400 Bad Request response if the password is invalid
        }

        res.status(200).json({ message: "Login successful", user }); // Send a 200 OK response with a success message and the logged-in user
    } catch (e) {
        res.status(500).json({ error: e }); // Send a 500 Internal Server Error response if an error occurs
    }
});

// Define a GET route for the root path ("/") of the authRouter. When this route is accessed, it sends a response indicating that the auth route is working.
authRouter.get("/", (req, res) => {
  res.send("Auth route is working!");
});

export default authRouter;