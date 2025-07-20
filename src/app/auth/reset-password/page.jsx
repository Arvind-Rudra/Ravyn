"use client";

import React, { useState } from 'react';
import { Lock, Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import SkewButton from '@/components/ui/Button';
import Link from 'next/link';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!password || password.length < 8)
      return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number.";
    if (password !== confirm)
      return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError(null);
    setSubmitted(true);
    // Replace the following line with your backend API call as needed
    await new Promise(res => setTimeout(res, 1500));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
      <div className="max-w-md w-full bg-black/20 backdrop-blur rounded-xl border border-gray-800 p-8 shadow-2xl">
        <h1 style={{ fontFamily: 'Zoredo Blocker' }} className="text-3xl font-bold text-[var(--color-cyberyellow)] mb-2 tracking-wider">Reset Password</h1>
        <p  className="mb-6 text-[var(--color-typography)] text-sm">
          Create a new password for your account below.
        </p>
        {submitted ? (
          <div className="text-center">
            <CheckCircle className="w-14 h-14 mx-auto mb-4 text-[var(--color-cyberyellow)]" />
            <p className="text-lg text-[var(--color-cyberyellow)] font-bold">Password reset successful</p>
            <p className="text-[var(--color-typography)] mt-2">You may now log in with your new password.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label style={{ fontFamily: 'Zoredo Blocker' }} className="block mb-1 text-[var(--color-cyberyellow)] font-bold">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-700 bg-[var(--color-jetblack)] text-[var(--color-typography)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-cyberyellow)] transition duration-200"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label style={{ fontFamily: 'Zoredo Blocker' }} className="block mb-1 text-[var(--color-cyberyellow)] font-bold">Confirm Password</label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-700 bg-[var(--color-jetblack)] text-[var(--color-typography)] placeholder-gray-500 focus:outline-none focus:border-[var(--color-cyberyellow)] transition duration-200"
                  placeholder="Re-enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {/* Security Features */}
            <div className="p-4 rounded-lg border border-gray-700 bg-gray-900/30 text-sm text-[var(--color-typography)]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: password.length >= 8 ? 'var(--color-cyberyellow)' : '#666' }}></div>
                Minimum 8 characters
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: /[A-Z]/.test(password) ? 'var(--color-cyberyellow)' : '#666' }}></div>
                Uppercase letter
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: /[0-9]/.test(password) ? 'var(--color-cyberyellow)' : '#666' }}></div>
                Number
              </div>
            </div>
            {error && (
              <p className="text-red-400 mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
            <SkewButton
              type="submit"
              width="100%"
              height="46px"
              fontSize="18px"
              className="mt-2"
            >
              Reset Password
            </SkewButton>
          </form>
        )}
        <div className="text-center mt-8 text-[var(--color-typography)]/60 text-xs">
          <Link href="/auth/login" className="text-[var(--color-cyberyellow)] hover:text-[var(--color-electricblue)]">Return to login</Link>
        </div>
      </div>
    </div>
  );
}
