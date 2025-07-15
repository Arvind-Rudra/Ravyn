import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { resetPasswordSchema } from '@/lib/validations';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('Reset Password Request:', body);
    
    // Validate input
    const validationResult = resetPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.flatten() 
        },
        { status: 400 }
      );
    }

    const { token, password, confirmPassword } = validationResult.data;
    console.log('Parsed Data:', { token, password, confirmPassword });

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
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

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    user.passwordChangedAt = new Date();
    user.updatedAt = new Date();

    await user.save();

    return NextResponse.json(
      { 
        message: 'Password reset successful. You can now log in with your new password.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Password reset error:', error);
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