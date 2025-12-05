import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: "admin" | "editor";
  }

  interface Session {
    user: {
      role: "admin" | "editor";
    } & DefaultSession["user"];
  }
}
