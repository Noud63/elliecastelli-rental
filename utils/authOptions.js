import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
import Register from "@/models/Register";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../lib/db";

export const authOptions = {

  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "jwt",
  },

  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },

      async authorize(credentials, req) {
        try {
          if (!credentials) return null;

          const foundUser = await User.findOne({
            email: credentials.email,
          });

          if (!foundUser) {
            throw new Error("Invalid email or password");
          }

          const match = await bcrypt.compare(
            credentials.password,
            foundUser.password
          );

          if (!match) {
            throw new Error("Password did not matched");
          }

          return foundUser;

        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],


  callbacks: {
    // Invoked on successful signin
    async signIn({ user, profile, account }) {
        console.log(account)
      // 1. Connect to database
      if (account.provider === "google" || account.provider === "facebook") {
        //  console.log(profile);
        await connectDB();
        // 2. Check if user exists
        const userExists = await User.findOne({ email: profile.email });
        // 3. If not, add user to database
        if (!userExists) {
          //Truncate username if too long
        
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
          });
          
        }
      }
      // 4. Return true to allow sign in
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.name = user.username;
      }
      return token;
    },

    //Modify the session object
    async session({ session, token }) {
      // 1. Get user from the database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign user id to the session
      session.user.id = user._id.toString();
      // 3. Return session
      return session;
    },
  },
};
