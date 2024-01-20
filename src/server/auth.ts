import NextAuth from "next-auth"; // Importing NextAuth library
 // Importing authentication configuration
import { DrizzleAdapter } from "@auth/drizzle-adapter"; // Importing function to get a user by ID
import authConfig from "./auth.config";
import { db } from "./db";

// Destructuring NextAuth functionalities: handlers, auth, signIn, signOut
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    // Customizing authentication pages
    signIn: "/auth/login", // Custom sign-in page
    error: "/auth/error", // Custom error page
  },
  callbacks: {
    // Callback executed when creating a session
    async session({ token, session }) {
      console.log({
        sessionToken: token, // Logging the session token
      });

      if (token.sub && session.user) {
        session.user.id = token.sub; // Setting the user ID in the session
      }
      return session; // Returning the updated session
    },

    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },

    // Callback executed when processing a JSON Web Token (JWT)
  },
  adapter: DrizzleAdapter(db), // Using PrismaAdapter with the provided database connection
  session: { strategy: "jwt" }, // Configuring session strategy as "jwt"
  ...authConfig, // Spreading additional authentication configurations
});

// Exporting the destructured NextAuth functionalities
