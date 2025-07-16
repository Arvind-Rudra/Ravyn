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
    const validationResult = forgotPasswordSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;
    await connectToDatabase();

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always send same response to avoid email enumeration
    const successResponse = NextResponse.json(
      { message: 'If an account with that email exists, a password reset link has been sent.' },
      { status: 200 }
    );

    if (!user) return successResponse;

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email address first' },
        { status: 400 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email, resetToken },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: '1h' }
    );

    user.passwordResetToken = resetToken;
    user.passwordResetExpiry = resetTokenExpiry;
    user.updatedAt = new Date();
    if (await user.save()) console.log("done ")
    console.log(user)

    try {
      await sendPasswordResetEmail(user.email, user.name, jwtToken);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
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

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    } catch {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    await connectToDatabase();

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
      { message: 'Reset token is valid', email: user.email },
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

export { POST as defaultPOST, GET as defaultGET };
export default { POST, GET };
