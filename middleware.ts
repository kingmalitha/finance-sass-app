import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  // '/forum(.*)' -> (.*) means any route after /forum,
]);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) auth().protect();

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
