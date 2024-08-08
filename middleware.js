export { default } from "next-auth/middleware";;
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// export const config = {
//   matcher: [
//     "/properties/add",
//     "/profile",
//     "/profile/editprofile",
//     "/properties/saved",
//     "/messages",
//   ],
// };

const protectedRoutes = [
  "/properties/add",
  "/profile",
  "/profile/editprofile",
  "/properties/saved",
  "/messages",
];

export async function middleware(request) {
  const token = await getToken({ req: request });
  // console.log("Token:", {token});
  for (const route of protectedRoutes) {
    if (!token && request.nextUrl.pathname === route) {
      return NextResponse.redirect("http://localhost:3000/signIn");
    }
  }
}
