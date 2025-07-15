import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions = {
  adapter: MongoDBAdapter(connectToDatabase()),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        await connectToDatabase();

        const user = await User.findOne({ 
          email: credentials.email.toLowerCase() 
        }).select('+password');

        if (!user) {
          throw new Error('No user found with this email');
        }

        if (!user.emailVerified) {
          throw new Error('Please verify your email before signing in');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'customer',
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        await connectToDatabase();
        
        try {
          // Check if user already exists
          const existingUser = await User.findOne({ 
            email: user.email.toLowerCase() 
          });

          if (existingUser) {
            // Update existing user with Google info if not set
            if (!existingUser.image && user.image) {
              existingUser.image = user.image;
              await existingUser.save();
            }
            return true;
          }

          // Create new user for Google sign-in
          const newUser = new User({
            name: user.name,
            email: user.email.toLowerCase(),
            image: user.image,
            role: 'customer',
            emailVerified: true,
            provider: 'google',
            googleId: profile.sub,
          });

          await newUser.save();
          return true;
        } catch (error) {
          console.error('Error in Google sign-in:', error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }

      // Refresh user data on each request
      if (token.id) {
        await connectToDatabase();
        const dbUser = await User.findById(token.id);
        if (dbUser) {
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.image = dbUser.image;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/signup',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
const handler = NextAuth(authOptions); 

export { handler as GET, handler as POST };