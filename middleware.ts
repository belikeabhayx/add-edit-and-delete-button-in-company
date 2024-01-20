import NextAuth from "next-auth"; // Importing NextAuth library
import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "routes";

import authConfig from "@/server/auth.config";

//****** middleware is not nextauth specific,it is next.js specific

// Initializing authentication based on provided authConfig
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req; // Extracting nextUrl from the request object
  const isLoggedIn = !!req.auth; // Checking if the user is logged in based on the request's authentication status

  // Checking if the requested URL path starts with the API authentication prefix
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // Checking if the requested URL path is in public routes or authentication routes
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // If the requested route is for API authentication, return null (allow access)
    return null;
  }

  if (isAuthRoute) {
    // If the requested route requires authentication
    if (isLoggedIn) {
      // If the user is logged in, redirect to the default login redirect URL based on nextUrl
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // If the user is not logged in and the route requires authentication, allow access (return null)
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // If the user is not logged in and the route is not a public route
    // Redirect to the login page and include the nextUrl as a parameter for redirection after login
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // If none of the above conditions are met, allow access (return null)
  return null;
});

// Optionally, configure paths where the Middleware won't be invoked
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
