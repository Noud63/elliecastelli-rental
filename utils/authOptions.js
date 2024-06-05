import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/config/database';
import User from '@/models/User';
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";

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

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            console.log("User exist");
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log("You are logged in");
              delete foundUser.password;

              if (foundUser.email === "noudvandun@gmail.com") {
                foundUser["role"] = "admin";
              } else {
                foundUser["role"] = "Unverified Email";
              }

              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],

  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      // 1. Connect to database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. If not, add user to database
      if (!userExists) {
        //Truncate username if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username: username,
          image: profile.picture,
        });
      }

      // 4. Return true to allow sign in
      return true;
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