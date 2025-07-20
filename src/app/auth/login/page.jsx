'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Zap, AlertCircle, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Zap, AlertCircle, Check } from 'lucide-react';
import SkewButton from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);

  useEffect(() => {
    if (isLocked && lockTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setLockTimeRemaining(lockTimeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLocked && lockTimeRemaining === 0) {
      setIsLocked(false);
      setLoginAttempts(0);
    }
  }, [isLocked, lockTimeRemaining]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Neural ID required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid neural ID format';
    }
    if (!formData.password) {
      newErrors.password = 'Access code required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (isLocked) return;
    if (!validateForm()) return;
    setIsLoading(true);

    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    setIsLoading(false);

    if (res?.ok) {
      router.push('/'); // Use router here!
    } else {
      setLoginAttempts(prev => prev + 1);
      if (loginAttempts + 1 >= 3) {
        setIsLocked(true);
        setLockTimeRemaining(30);
        setErrors({ general: 'Multiple failed attempts detected. System locked for security.' });
      } else {
        setErrors({ general: res?.error || 'Invalid neural credentials. Access denied.' });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/' });
    setGoogleLoading(false);
  };

  // --------------- NEW LOGIC FOR ALREADY LOGGED IN USERS ---------------
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        <div className="text-center text-gray-100 text-lg font-semibold">
          Checking your session...
        </div>
      </div>
    );
  }

  if (status === "authenticated" && session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        <div className="text-center text-red-500 text-lg font-bold border border-red-500 bg-red-900/20 rounded-lg px-8 py-6">
          <AlertCircle className="inline-block mb-2 mr-2 w-6 h-6 text-red-500" />
          You are already signed in and cannot access the login page.
        </div>
      </div>
    );
  }
  // ---------------------------------------------------------------------

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="relative max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <Zap className="w-10 h-10 text-[var(--color-cyberyellow)]" />
              <div className="absolute inset-0 w-10 h-10 rounded-full animate-ping bg-[var(--color-cyberyellow)] opacity-30"></div>
              <Zap className="w-10 h-10 text-[var(--color-cyberyellow)]" />
              <div className="absolute inset-0 w-10 h-10 rounded-full animate-ping bg-[var(--color-cyberyellow)] opacity-30"></div>
            </div>
            <h1
              className="text-4xl font-bold text-[var(--color-typography)] tracking-wider"
              style={{ fontFamily: 'Zoredo Blocker' }}
            >
              LOGIN
            </h1>
          </div>
          <div className="w-20 h-1 mx-auto bg-[var(--color-cyberyellow)]"></div>
          <div className="w-20 h-1 mx-auto bg-[var(--color-cyberyellow)]"></div>
        </div>

        <div className="bg-[var(--color-jetblack)]/40 backdrop-blur-sm rounded-lg border border-gray-800 shadow-2xl overflow-hidden">
        <div className="bg-[var(--color-jetblack)]/40 backdrop-blur-sm rounded-lg border border-gray-800 shadow-2xl overflow-hidden">
          <div className="p-8 space-y-6">

            {errors.general && (
              <div className="p-4 rounded-lg border border-[var(--color-electricred)]/50 bg-[var(--color-electricred)]/10">
              <div className="p-4 rounded-lg border border-[var(--color-electricred)]/50 bg-[var(--color-electricred)]/10">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[var(--color-electricred)]" />
                  <p className="text-[var(--color-electricred)] text-sm font-medium">{errors.general}</p>
                  <AlertCircle className="w-5 h-5 text-[var(--color-electricred)]" />
                  <p className="text-[var(--color-electricred)] text-sm font-medium">{errors.general}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-400 text-sm mb-2">Neural ID</label>
              <Input
                type="email"
                icon={<Mail className="text-gray-400 w-5 h-5" />}
                placeholder="user@neuralgrid.net"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                disabled={isLocked}
              />
              {errors.email && (
                <p className="text-[var(--color-electricred)] text-sm mt-1 flex items-center gap-1">
                <p className="text-[var(--color-electricred)] text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Access Code</label>
              <Input
                type={showPassword ? 'text' : 'password'}
                icon={<Lock className="text-gray-400 w-5 h-5" />}
                placeholder="••••••••••••"
                value={formData.password}
                onChange={e => handleInputChange('password', e.target.value)}
                disabled={isLocked}
                righticon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLocked}>
                    {showPassword ? <EyeOff className="text-gray-400 w-5 h-5" /> : <Eye className="text-gray-400 w-5 h-5" />}
                  </button>
                }
              />
              {errors.password && (
                <p className="text-[var(--color-electricred)] text-sm mt-1 flex items-center gap-1">
                <p className="text-[var(--color-electricred)] text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={e => handleInputChange('rememberMe', e.target.checked)}
                  disabled={isLocked}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${formData.rememberMe
                  ? 'border-[var(--color-cyberyellow)] bg-[var(--color-cyberyellow)]'
                  : 'border-gray-600'
                }`}>
                  {formData.rememberMe && <Check className="w-3 h-3 text-black" />}
                </div>
                <span className="text-gray-400 text-sm">Remember neural pattern</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium transition-colors disabled:opacity-50 text-[var(--color-cyberyellow)]"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <SkewButton
                width="350px"
                onClick={handleLogin}
                disabled={isLoading || isLocked || googleLoading}
                className="w-full text-center"
              >
                {isLocked ? `SYSTEM LOCKED (${lockTimeRemaining}s)` : isLoading ? 'CONNECTING...' : 'Login'}
              </SkewButton>
            </div>

            {/* Sign in with Google */}
            <div className="my-4 w-full flex items-center">
              <div className="flex-1 h-px bg-gray-700" />
              <span className="mx-3 text-gray-400 text-xs">or</span>
              <div className="flex-1 h-px bg-gray-700" />
            </div>
            <div className="flex flex-col items-center max-w-md w-full mb-6">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-3 w-full py-3 rounded-lg font-bold text-black bg-white border border-gray-200 shadow hover:shadow-lg hover:bg-gray-50 transition-all duration-150"
                style={{ fontFamily: 'inherit', fontSize: 16 }}
                disabled={isLoading || googleLoading}
                type="button"
              >
                <FcGoogle className="w-6 h-6" />
                {googleLoading ? 'CONNECTING...' : 'Sign In with Google'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
