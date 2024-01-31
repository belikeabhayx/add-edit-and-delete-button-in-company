// "use server"; // Indicates this code runs on the server-side

// import * as z from "zod"; // Importing Zod for schema validation
// import { AuthError } from "next-auth"; // Importing AuthError from NextAuth
// import { signIn } from "next-auth/react";
// import { LoginSchema } from "@/lib/validations/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "routes";

// // Function to handle user login
// export const login = async (values: z.infer<typeof LoginSchema>) => {
//   // Validating input fields using the LoginSchema
//   const validatedFields = LoginSchema.safeParse(values);

//   // If validation fails, return an error indicating invalid fields
//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   // Extracting email and password from validated fields
//   const { email, password } = validatedFields.data;

//   try {
//     // Attempting to sign in using credentials (email and password)
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo: DEFAULT_LOGIN_REDIRECT, // Redirect user after successful login
//     });
//   } catch (error) {
//     // Handling authentication errors
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { error: "Invalid credentials!" }; // Return error for invalid credentials
//         default:
//           return { error: "Something went wrong!" }; // Return a generic error for other authentication errors
//       }
//     }

//     throw error; // Throw any other unexpected errors
//   }
// };
