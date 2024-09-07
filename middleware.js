import { auth } from "./firebaseConfig";
import { NextResponse } from "next/server";

export default async function middleware(request) {
    const path = request.nextUrl.pathname;

    // Only apply the token check to paths starting with /dashboard
    if (path.startsWith("/dashboard")) {
        console.log("dashboard middleware: checking user authentication");

        // Get the current user
        const user = auth.currentUser;

        // If no user is logged in, redirect to the login page
        if (!user) {
            console.log("dashboard middleware: no user logged in, redirecting");
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // Try to retrieve the token
        try {
            const token = await user.getIdToken();
            if (!token) {
                console.log("dashboard middleware: failed to retrieve token, redirecting");
                return NextResponse.redirect(new URL("/login", request.url));
            }
        } catch (error) {
            console.error("dashboard middleware: error retrieving token", error);
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // Allow access for all other paths
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/dashboard"], // Apply middleware to /dashboard paths
};
