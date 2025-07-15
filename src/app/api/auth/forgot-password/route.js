import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { sendPasswordResetEmail } from '@/lib/email';
import { forgotPasswordSchema } from '@/lib/validations';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = forgotPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.flatten() 
        },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ 
      email: email.toLowerCase() 
    });

    // Always return success message for security (don't reveal if email exists)
    const successResponse = NextResponse.json(
      { 
        message: 'If an account with that email exists, a password reset link has been sent.' 
      },
      { status: 200 }
    );

    if (!user) {
      return successResponse;
    }

    // Check if user has verified email
    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email address first' },
        { status: 400 }
      );
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Create JWT token for additional security
    const jwtToken = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        resetToken 
      },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: '1h' }
    );

    // Update user with reset token
    user.passwordResetToken = resetToken;
    user.passwordResetExpiry = resetTokenExpiry;
    user.updatedAt = new Date();

    await user.save();

    // Send password reset email
    try {
      await sendPasswordResetEmail(user.email, user.name, jwtToken);
    } catch (emailError) {
      // console.error('Failed to send password reset email:', emailError);
      // return NextResponse.json(
      //   { error: 'Failed to send password reset email' },
      //   { status: 500 }
      // );
    }

    return successResponse;

  } catch (error) {
    console.error('Forgot password error:', error);
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

    if (!token) {
      return NextResponse.json(
        { error: 'Reset token is required' },
        { status: 400 }
      );
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find user and verify reset token
    const user = await User.findOne({
      _id: decoded.userId,
      email: decoded.email,
      passwordResetToken: decoded.resetToken,
      passwordResetExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Reset token is valid',
        email: user.email 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Reset token validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}