import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  
  // 1. Secure Admin Dashboard with Proxy/Rewrite
  // We use `getToken` to access the session token directly in middleware
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Check if the user is accessing a protected dashboard route
  const isDashboardRoute = path.startsWith("/dashboard");
  const isAdminRoute = path.startsWith("/dashboard/admin");

  // 2. Authentication Check
  if (isDashboardRoute && !token) {
    // Redirect unauthenticated users to login
    // We add a callbackUrl so they are returned to the requested page after login
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  // 3. Authorization (Role) Check for Admin Routes
  if (isAdminRoute && token?.role !== "admin") {
    // PROXY (REWRITE) BEHAVIOR:
    // Instead of redirecting the user to a 403 page (changing the URL),
    // we "rewrite" the response to show the Access Denied content
    // while keeping the URL as is. This is better for UX and SEO.
    return NextResponse.rewrite(new URL("/access-denied", req.url));
  }

  // Allow the request to proceed if all checks pass
  return NextResponse.next();
}

// Configure paths that trigger this middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
    // Add other protected paths here if needed
  ],
};
