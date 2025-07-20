'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Zap, AlertCircle, Check } from 'lucide-react';
import SkewButton from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    const loginSuccess = Math.random() > 0.7;
    if (loginSuccess) {
      setIsLoading(false);
      alert('Neural link established successfully!');
    } else {
      setIsLoading(false);
      setLoginAttempts(prev => prev + 1);
      if (loginAttempts + 1 >= 3) {
        setIsLocked(true);
        setLockTimeRemaining(30);
        setErrors({ general: 'Multiple failed attempts detected. System locked for security.' });
      } else {
        setErrors({ general: 'Invalid neural credentials. Access denied.' });
      }
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link sent to your neural interface!');
  };

  const handleGoogleSignIn = () => {
    alert('Redirecting to Google Sign-In...');
    // Add your Google Sign-In logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="relative max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <Zap className="w-10 h-10 text-[var(--color-cyberyellow)]" />
              <div className="absolute inset-0 w-10 h-10 rounded-full animate-ping bg-[var(--color-cyberyellow)] opacity-30"></div>
            </div>
            <h1 className="text-4xl font-bold text-[var(--color-typography)] tracking-wider">
              NEURAL ACCESS
            </h1>
          </div>
          <div className="w-20 h-1 mx-auto bg-[var(--color-cyberyellow)]"></div>
        </div>

        <div className="bg-[var(--color-jetblack)]/40 backdrop-blur-sm rounded-lg border border-gray-800 shadow-2xl overflow-hidden">
          <div className="p-8 space-y-6">
            {errors.general && (
              <div className="p-4 rounded-lg border border-[var(--color-electricred)]/50 bg-[var(--color-electricred)]/10">
                <div className="flex items-center gap-2">
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
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isLocked}
              />
              {errors.email && (
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
                onChange={(e) => handleInputChange('password', e.target.value)}
                disabled={isLocked}
                righticon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLocked}>
                    {showPassword ? <EyeOff className="text-gray-400 w-5 h-5" /> : <Eye className="text-gray-400 w-5 h-5" />}
                  </button>
                }
              />
              {errors.password && (
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
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  disabled={isLocked}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                  formData.rememberMe
                    ? 'border-[var(--color-cyberyellow)] bg-[var(--color-cyberyellow)]'
                    : 'border-gray-600'
                }`}>
                  {formData.rememberMe && <Check className="w-3 h-3 text-black" />}
                </div>
                <span className="text-gray-400 text-sm">Remember neural pattern</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isLocked}
                className="text-sm font-medium transition-colors disabled:opacity-50 text-[var(--color-cyberyellow)]"
              >
                Reset Access?
              </button>
            </div>

            <div className="flex items-center justify-center">
              <SkewButton
                width="350px"
                onClick={handleLogin}
                disabled={isLoading || isLocked}
                className="w-full text-center"
              >
                {isLocked ? `SYSTEM LOCKED (${lockTimeRemaining}s)` : isLoading ? 'CONNECTING...' : 'Login'}
              </SkewButton>
            </div>

            {/* Sign in with Google */}
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-full py-2 px-4 bg-white text-black font-medium rounded-lg shadow-md hover:bg-gray-100 transition-colors"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}