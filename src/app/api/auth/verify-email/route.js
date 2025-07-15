import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({
      email: decoded.email,
      verificationToken: token,
      emailVerified: false,
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found or already verified' },
        { status: 404 }
      );
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.emailVerifiedAt = new Date();
    user.updatedAt = new Date();
    await user.save();

    return NextResponse.json(
      {
        message: 'Email verified successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    await connectToDatabase();

    if (email && !token) {
      const user = await User.findOne({
        email: email.toLowerCase(),
        emailVerified: false,
      });

      if (!user) {
        return NextResponse.json(
          { error: 'User not found or already verified' },
          { status: 404 }
        );
      }

      const verificationToken = jwt.sign(
        { email: user.email },
        process.env.NEXTAUTH_SECRET,
        { expiresIn: '24h' }
      );

      user.verificationToken = verificationToken;
      user.updatedAt = new Date();
      await user.save();

      try {
        await sendVerificationEmail(user.email, verificationToken);
        return NextResponse.json(
          { message: 'Verification email sent successfully' },
          { status: 200 }
        );
      } catch (emailError) {
        console.error('Failed to send verification email:', emailError);
        return NextResponse.json(
          { error: 'Failed to send verification email' },
          { status: 500 }
        );
      }
    }

    if (token) {
      return await POST(request);
    }

    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Email verification GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export { POST as defaultPOST, GET as defaultGET };
export default { POST, GET };
