import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";
import {NextResponse} from "next/server";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await dbConnect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            return null; // User not found, NextAuth will handle the error
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            return null; // Password incorrect, NextAuth will handle the error
          }

          return user;
        } catch (err: any) {
          console.error("Authentication error:", err);
          return null; // Let NextAuth handle error (don't throw)
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      return true; // Return true to allow sign-in
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      //session.accessToken = token.accessToken
      return session
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export const runtime = "nodejs";
