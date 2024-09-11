import { NextResponse } from "next/server";

export default async function middleware(request) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token");
    const userId = request.cookies.get("userId");
    console.log(userId)

    // Protect /dashboard routes, only allow access if token exists
    if (path.startsWith("/dashboard")) {
        console.log("dashboard middleware: checking user authentication");
        if (!token) {
            console.log("dashboard middleware: no token found, redirecting");
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // If token exists, don't allow access to login or signup
    if ((path === "/login" || path === "/signup") && token) {
        console.log("middleware: token found, redirecting from login/signup");
        return NextResponse.redirect(new URL(`/dashboard/${userId.value}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*","/dashboard", "/login", "/signup"],
};
