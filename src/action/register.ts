"use server"; // Indicates this code runs on the server-side

import * as z from "zod"; // Importing Zod for schema validation
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing

// Importing the database connection
import { RegisterSchema } from "@/schemas"; // Importing the registration schema for validation
// Importing function to get user by email

// Function to handle user registration
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // Validating input fields using the RegisterSchema
  const validatedFields = RegisterSchema.safeParse(values);

  // If validation fails, return an error indicating invalid fields
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  // Extracting email, password, and name from validated fields
  const { email, password, name } = validatedFields.data;

  // Hashing the provided password with bcrypt (salt rounds: 10)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Checking if a user with the provided email already exists
  const existingUser = await getUserByEmail(email);

  // If a user with the email already exists, return an error
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Creating a new user in the database with the provided name, email, and hashed password
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Return a success message indicating that a confirmation email has been sent
  return { success: "Confirmation email sent!" };
};
