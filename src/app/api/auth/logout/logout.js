import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    const session = await getServerSession();
    
    // Update last activity if user is logged in
    if (session?.user?.id) {
      await connectToDatabase();
      await User.findByIdAndUpdate(
        session.user.id,
        { 
          lastActivity: new Date(),
          updatedAt: new Date()
        }
      );
    }

    // Create response
    const response = NextResponse.json(
      { 
        message: 'Logged out successfully' 
      },
      { status: 200 }
    );

    // Clear auth cookies
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    // Clear NextAuth cookies
    response.cookies.set('next-auth.session-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    response.cookies.set('__Secure-next-auth.session-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}