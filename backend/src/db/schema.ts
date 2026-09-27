import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"; // Import the necessary functions and types from the drizzle-orm/pg-core module to define the database schema

// Define the "users" table schema using the pgTable function. This schema defines the structure of the "users" table in the database, including its columns and their data types.
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(), // Define a primary key column named "id" with auto-incrementing integer values
    name: text("name").notNull(), // Define a column named "name" that cannot be null
    email: text("email").notNull().unique(), // Define a column named "email" that cannot be null
    password: text("password").notNull(), // Define a column named "password" that cannot be null
    createdAt: timestamp("created_at").defaultNow(), // Define a column named "created_at" that cannot be null and has a default value of the current timestamp
    updatedAt: timestamp("updated_at").defaultNow(), // Define a column named "updated_at" that cannot be null and has a default value of the current timestamp
});

export type User = typeof users.$inferSelect; // Define a TypeScript type named "User" that infers the shape of the data returned when selecting from the "users" table. This type can be used for type-checking and autocompletion in TypeScript code.
export type NewUser = typeof users.$inferInsert; // Define a TypeScript type named "NewUser" that infers the shape of the data required when inserting into the "users" table. This type can be used for type-checking and autocompletion in TypeScript code when creating new user records.