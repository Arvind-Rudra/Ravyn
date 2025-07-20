"use client";

import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import SkewButton from '@/components/ui/Button'; // <-- Make sure the import path is correct

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    setError(null);
    // Simulated API call
    await new Promise((res) => setTimeout(res, 1500));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
      <div className="max-w-md w-full bg-black/60 backdrop-blur rounded-xl border border-gray-800 p-8 shadow-2xl">
        <button
          className="flex items-center mb-4 text-[var(--color-cyberyellow)] hover:text-[var(--color-electricblue)] transition-colors"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Back
        </button>
        <h1 style={{ fontFamily: 'Zoredo Blocker' }} className="text-3xl font-bold text-[var(--color-cyberyellow)] mb-2 tracking-wider">Forgot Password</h1>
        <p className="text-[var(--color-typography)] mb-6 text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        {submitted ? (
          <div className="text-center">
            <CheckCircle className="w-14 h-14 mx-auto mb-4 text-[var(--color-cyberyellow)]" />
            <p className="text-lg text-[var(--color-cyberyellow)] font-bold">Check your email</p>
            <p className="text-[var(--color-typography)] mt-2">A password reset link has been sent to <span className="text-[var(--color-electricblue)]">{email}</span>.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label style={{ fontFamily: 'Zoredo Blocker' }} className="block mb-1 text-[var(--color-cyberyellow)] font-bold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-700 bg-[var(--color-jetblack)] text-[var(--color-typography)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-electricblue)] transition duration-200"
                  placeholder="your@email.com"
                />
              </div>
              {error && (
                <p className="text-red-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              )}
            </div>
            <SkewButton
              type="submit"
              width="100%"
              height="46px"
              fontSize="18px"
              className="mt-2"
            >
              Send Reset Link
            </SkewButton>
          </form>
        )}
        <div className="text-center mt-8 text-[var(--color-typography)]/60 text-xs">
          <span>Need help? <a href="/support" className="text-[var(--color-electricblue)]">Contact support</a></span>
        </div>
      </div>
    </div>
  );
}
