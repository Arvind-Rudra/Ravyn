'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SkewButton from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    router.push('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#121212] via-[#1e1e1e] to-[#121212] px-4">
      <div className="w-full max-w-lg bg-[#1a1a1a] rounded-3xl shadow-2xl p-10 md:p-12 text-[#FAFAFA]">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#FF3B30]">Sign In to Ravyn</h1>
          <p className="mt-2 text-sm text-[#FAFAFA]/70">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm text-[#FAFAFA]/70">Email address</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-[#FAFAFA]/70">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="pt-2 flex justify-center">
            <SkewButton type="submit" className="w-40 text-center">
              Sign In
            </SkewButton>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-[#FAFAFA]/60">
          Don't have an account?{' '}
          <Link href="/signup" className="text-[#3D5AFE] hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
