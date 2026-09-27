import { Pool } from "pg"; // Import the Pool class from the pg module to manage PostgreSQL connections
import { drizzle } from "drizzle-orm/node-postgres"; // Import the drizzle function from the drizzle-orm/node-postgres module to create a Drizzle ORM instance

// Create a new instance of the Pool class with the PostgreSQL connection string
const pool = new Pool({
    connectionString: "postgresql://postgres:test123@db:5432/mydb",
});

// Create a Drizzle ORM instance using the connection pool
export const db = drizzle(pool);