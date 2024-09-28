import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

const authOptions = {
  providers: [
    // Add authentication providers here (e.g., CredentialsProvider, GoogleProvider)
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
  ],
  callbacks: {
    // Add custom authentication callbacks here (e.g., signIn, signOut, jwt, session)
    async signIn({ profile }) {
      try {
        if (!profile.email) {
          throw new Error("No email found");
        }
        await dbConnect();
        const existingUser = await UserModel.findOne({
          email: profile.email,
        });
        if (existingUser) {
          // update user name
          await UserModel.updateOne(
            { email: profile.email },
            { name: profile.name }
          );
          return true;
        }
        // create new user
        const hashedPassword = await bcrypt.hash(
          profile.email + process.env.SECRET,
          10
        );
        await UserModel.create({
          email: profile.email,
          password: hashedPassword,
          name: profile.name,
        });
        return true;
      } catch (err) {
        return false;
      }
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
        token.account = account;
        token.profile = profile;
      }
      return token;
    },
    async redirect({ baseUrl }) {
      return baseUrl + "/app";
    },
  },

  pages: {
    // Customize authentication-related pages (e.g., signIn, error)
    // signIn: "/app/login",
  },
  session: {
    // Configure session options (e.g., JWT settings, session management)
    strategy: "jwt",
  },
};

export default authOptions;
