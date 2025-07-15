import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { sendVerificationEmail } from '@/lib/email';
import { signupSchema } from '@/lib/validations';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.flatten() 
        },
        { status: 400 }
      );
    }

    const { name, email, password, confirmPassword } = validationResult.data;

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ 
      email: email.toLowerCase() 
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate verification token
    const verificationToken = jwt.sign(
      { email: email.toLowerCase() },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: '24h' }
    );

    // Create user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'customer',
      emailVerified: false,
      verificationToken,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue with signup even if email fails
    }

    // Return success response (without sensitive data)
    return NextResponse.json(
      {
        message: 'User created successfully. Please check your email to verify your account.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
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