import { type UUID } from "crypto";
import { type Request, type Response, type NextFunction } from "express"; // Import the Request, Response, and Router types from the Express library
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library for generating and verifying JSON Web Tokens
import { db } from "../db/index.js"; // Import the database instance from the db module
import { users } from "../db/schema.js"; // Import the users table schema from the schema module
import { eq } from "drizzle-orm";

export interface AuthenticatedRequest extends Request {
    user?: UUID; // Optional property to store the authenticated user's ID
    token?: string; // Optional property to store the authentication token
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["x-auth-token"]; // Retrieve the header from the request

        if (!authHeader || typeof authHeader !== "string") {
            return res.status(401).json({ error: "No token provided" }); // Send a 401 Unauthorized response if no token is provided
        }

        const verifiedToken = jwt.verify(authHeader, "this_is_a_secret_key"); // Verify the token using the secret key

        if (!verifiedToken) {
            return res.status(403).json({ error: "Invalid token" }); // Send a 403 Forbidden response if the token is invalid
        }

        const verifiedUserId = verifiedToken as { id: UUID }; // Extract the user ID from the verified token

        const user = await db.select().from(users).where(eq(users.id, verifiedUserId.id)); // Retrieve the user associated with the verified token from the database
        
        if (!user) {
            return res.status(404).json({ error: "User not found" }); // Send a 404 Not Found response if the user does not exist
        }

        req.user = verifiedUserId.id; // Attach the authenticated user's ID to the request object
        req.token = authHeader; // Attach the authentication token to the request object

        next(); // Call the next middleware function in the stack
    } catch (e) {
        res.status(500).json({ error: e }); // Send a 500 Internal Server Error response if an error occurs
    }
};
