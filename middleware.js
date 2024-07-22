export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/properties/add",
    "/profile",
    "/profile/editprofile",
    "/properties/saved",
    "/messages",
  ],
};
