
import type { NextAuthConfig } from "next-auth"; // Importing NextAuthConfig type
import Credentials from "next-auth/providers/credentials"; // Importing Credentials provider for NextAuth
import Github from "next-auth/providers/github"; // Importing Github provider for NextAuth
import Google from "next-auth/providers/google"; // Importing Google provider for NextAuth
import { LoginSchema } from "@/lib/validations/auth";
 // Importing login schema for validation // Importing function to get user by email


//  middleware uses edge, but prisma does not uses edge.thats why we created this file.
    

const nextAuthConfig: NextAuthConfig = {
  providers: [
    // Configuring Google provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID, // Providing Google Client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Providing Google Client Secret from environment variables
    }),
    // Configuring Github provider
    Github({
      clientId: process.env.GITHUB_CLIENT_ID, // Providing GitHub Client ID from environment variables
      clientSecret: process.env.GITHUB_CLIENT_SECRET, // Providing GitHub Client Secret from environment variables
    }),
    // Configuring Credentials provider for custom credentials-based authentication
    Credentials({
      async authorize(credentials) {
        // Validating the provided credentials against a login schema
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data; // Extracting email and password from validated credentials
          
          // Retrieving user details from the database by email

          // Comparing the provided password with the hashed password stored in the database
          

          // If passwords match, return the user object; otherwise, return null
        }

        return null; // Return null if credentials are invalid or user not found
      }
    })
  ],
};

export default nextAuthConfig; // Exporting the NextAuth configuration object
