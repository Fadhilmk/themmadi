import { onAuthStateChanged } from "firebase/auth";
import { NextResponse } from "next/server";
import { auth } from "./firebaseConfig";
export default function middleware(request) {
  const path = request.nextUrl.pathname;
  const user=auth.currentUser
  let token;
  onAuthStateChanged(auth, (user) => {
    token = user?.accessToken;
  });

  // Redirect to login page if the user is not authenticated
//   if (path.startsWith("/dashboard")) {
//     console.log(user)
//     if (!token) {
//       console.log("dashboard middleware");
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

  // Allow access for all other paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"], // Apply middleware to /employer and /admin paths
};
