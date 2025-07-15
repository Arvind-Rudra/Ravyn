import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // e.g. yourname@gmail.com
    pass: process.env.EMAIL_PASS, // app password
  },
});

export async function sendVerificationEmail(email, token) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;



  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `
      <h2>Welcome to Our Platform</h2>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendPasswordResetEmail(email, name, token) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;
  console.log(token);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Your Password',
    html: `
      <h2>Hello ${name || 'User'},</h2>
      <p>You requested a password reset for your account.</p>
      <p>Click the button below to reset your password:</p>
      <p><a href="${resetUrl}" style="background:#000;color:#fff;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Password</a></p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
      <p>This link is valid for 1 hour only.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}