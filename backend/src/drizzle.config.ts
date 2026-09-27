import { defineConfig } from "drizzle-kit"; // Import the defineConfig function from the drizzle-kit module to define the configuration for Drizzle ORM

// Export the configuration for Drizzle ORM using the defineConfig function. This configuration specifies the database dialect, schema file, output directory for migrations, and database credentials.
export default defineConfig({
    dialect: "postgresql", // Specify the database dialect as PostgreSQL
    schema: "./db/schema.ts", // Specify the path to the schema file that defines the database structure
    out: "./drizzle", // Specify the output directory for the generated migration files
    dbCredentials: {
        host: "localhost", // Specify the database host as localhost
        port: 5432, // Specify the database port as 5432 (default for PostgreSQL)
        database: "mydb", // Specify the name of the database as "mydb"
        user: "postgres", // Specify the database user as "postgres"
        password: "test123", // Specify the password for the database user
        ssl: false, // Specify that SSL is not required for the database connection
    },
});
