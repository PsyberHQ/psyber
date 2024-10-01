import GoogleProvider from 'next-auth/providers/google';
// import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from '@/model/User';
import { NextAuthOptions } from 'next-auth';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        if (!profile?.email) {
          throw new Error('No email found');
        }
        await dbConnect();
        const existingUser = await UserModel.findOne({ email: profile.email });

        const picture = (profile as { picture?: string })?.picture || '';

        if (existingUser) {
          // Update existing user information
          await UserModel.updateOne(
            { email: profile.email },
            { name: profile.name, imageUrl: picture || '' }
          );
        } else {
          // Create a new user
          await UserModel.create({
            email: profile.email,
            name: profile.name,
            imageUrl: picture || '',
          });
        }
        return true;
      } catch (err) {
        console.error('Sign-in error:', err);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  pages: {
    // signIn: "/app/login",
  },
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;
