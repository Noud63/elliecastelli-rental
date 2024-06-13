import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
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
    }),

    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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

          const foundUser = await User.findOne({ email: credentials.email });

          console.log(foundUser)

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

  pages: {
    signOut: "/"
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Invoked on successful signin
    async signIn({ user, account }) {
      
      // 1. Connect to database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: user.email });
      // 3. If not, add user to database
      if (!userExists) {
        //Truncate username if too long
        const username = user.name.slice(0, 20);
        await User.create({
          email: user.email,
          username: username,
          image: user.picture,
        });
      
      }

      // 4. Return true to allow sign in
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        console.log(user, token)
        token.name=user.name
      }
      return token;
    },

    //Modify the session object
    async session({ session }) {
      // 1. Get user from the database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign user id to the session
      session.user.id = user._id.toString();
      // 3. Return session
      return session;
    },
  },
};