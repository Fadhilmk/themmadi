import {  NextResponse } from "next/server";

export default function middleware(request) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";
    const accountType = request.cookies.get("accountType")?.value || "user";

    // Redirect to login page if the user is not authenticated
    if (!token) {
        if (path.startsWith("/employer") || path.startsWith("/admin")) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }


    if (path === "/login" && token) {
        if (accountType === "user") {
            return NextResponse.redirect(new URL('/jobs', request.url));
        } else if (accountType === "employer") {
            return NextResponse.redirect(new URL('/employer/job/my-jobs', request.url));
        } else if (accountType === "admin") {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }


    if (path.startsWith("/job/:path") && token) {
        if (accountType === "admin") {
            return NextResponse.redirect(new URL('/admin', request.url));
        } else if (accountType === "employer") {
            return NextResponse.redirect(new URL('/employer/job/my-jobs', request.url));
        }
    }


    // Redirect to login page if the user does not have the required account type
    if (path.startsWith("/employer")) {
        if (accountType !== "employer") {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else if (path.startsWith("/admin")) {
        if (accountType !== "admin") {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Allow access for all other paths
    return NextResponse.next();
}

export const config = {
    matcher: ["/employer/:path*", "/admin/:path*", "/login", '/job/:path'], // Apply middleware to /employer and /admin paths
};