// import { onAuthStateChanged } from "firebase/auth";
// import {  NextResponse } from "next/server";
// import { auth } from "./firebaseConfig";
// export default function middleware(request) {
//     const path = request.nextUrl.pathname;
//     const accountType = request.cookies.get("accountType")?.value || "user";
//     let token
//     onAuthStateChanged(auth,(user)=>{

//         token=user.accessToken;
//       })

//     // Redirect to login page if the user is not authenticated
//     if (!token) {
//         if (path.startsWith("/dashboard")){
//             console.log("dashboard middleware")
//             return NextResponse.redirect(new URL('/login', request.url));
//         }
//     }

//     // Allow access for all other paths
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/dashboard/:path*","/dashboard"], // Apply middleware to /employer and /admin paths
// };

import { auth } from "./firebaseConfig";
import { NextResponse } from "next/server";
import { getIdToken } from "firebase/auth";

// Create a helper function to check authentication asynchronously
async function isAuthenticated() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe(); // Unsubscribe to avoid memory leaks
            if (user) {
                user.getIdToken().then((token) => {
                    resolve(token);
                }).catch((error) => {
                    console.error("Error fetching token:", error);
                    resolve(null);  // Resolve with null in case of error
                });
            } else {
                resolve(null);  // No user is authenticated
            }
        });
    });
}

export default async function middleware(request) {
    const path = request.nextUrl.pathname;
    const accountType = request.cookies.get("accountType")?.value || "user";
    
    // Wait for the authentication state
    const token = await isAuthenticated();

    // Redirect to login page if the user is not authenticated
    if (!token) {
        if (path.startsWith("/dashboard")){
            console.log("dashboard middleware: user not authenticated");
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Allow access for all other paths
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/dashboard"], // Apply middleware to /dashboard paths
};
