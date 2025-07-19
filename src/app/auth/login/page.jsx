'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Zap, Shield, AlertCircle, Check, User, Fingerprint } from 'lucide-react';

export default function Login  ()  {
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
  const [biometricAvailable, setBiometricAvailable] = useState(true);

  // Simulate lockout timer
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate failed login for demo (you can modify this)
    const loginSuccess = Math.random() > 0.7; // 30% success rate for demo
    
    if (loginSuccess) {
      setIsLoading(false);
      // Handle successful login
      alert('Neural link established successfully!');
    } else {
      setIsLoading(false);
      setLoginAttempts(prev => prev + 1);
      
      if (loginAttempts + 1 >= 3) {
        setIsLocked(true);
        setLockTimeRemaining(30); // 30 second lockout
        setErrors({ general: 'Multiple failed attempts detected. System locked for security.' });
      } else {
        setErrors({ general: 'Invalid neural credentials. Access denied.' });
      }
    }
  };

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Biometric scan successful! Neural link established.');
  };

  const handleForgotPassword = () => {
    alert('Password reset link sent to your neural interface!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent" >
      {/* Cyber Grid Background */}
     

      {/* Floating particles effect */}
      

      <div className="relative max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <Zap className="w-10 h-10" style={{ color: '#FFD500' }} />
              <div className="absolute inset-0 w-10 h-10 rounded-full animate-ping" style={{ backgroundColor: '#FFD500', opacity: 0.3 }}></div>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-wider">
              NEURAL ACCESS
            </h1>
          </div>
          <p className="text-gray-400 mb-2">Initialize connection to the grid</p>
          <div className="w-20 h-1 mx-auto" style={{ backgroundColor: '#FFD500' }}></div>
        </div>

        {/* Security Status */}
        <div className="mb-6 p-4 rounded-lg border border-gray-700 bg-gray-900/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: '#FFD500' }} />
              <span className="text-white text-sm font-medium">SECURITY STATUS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-400 text-xs">SECURE</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            Failed attempts: {loginAttempts}/3
            {isLocked && (
              <span className="text-red-400 ml-2">
                • Locked for {lockTimeRemaining}s
              </span>
            )}
          </div>
        </div>

        {/* Main Login Card */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              {/* General Error Message */}
              {errors.general && (
                <div className="p-4 rounded-lg border border-red-500/50 bg-red-500/10">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400 text-sm font-medium">{errors.general}</p>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Neural ID</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="user@neuralgrid.net"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={isLocked}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    } bg-gray-900/50 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Access Code</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    disabled={isLocked}
                    className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    } bg-gray-900/50 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLocked}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
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
                    formData.rememberMe ? 'border-yellow-500 bg-yellow-500' : 'border-gray-600'
                  }`}>
                    {formData.rememberMe && <Check className="w-3 h-3 text-black" />}
                  </div>
                  <span className="text-gray-400 text-sm">Remember neural pattern</span>
                </label>
                
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLocked}
                  className="text-sm font-medium transition-colors disabled:opacity-50"
                  style={{ color: '#FFD500' }}
                >
                  Reset Access?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading || isLocked}
                className="w-full py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: isLocked ? '#FF3B30' : '#3D5AFE' }}
              >
                {isLocked ? (
                  <>
                    <Shield className="w-5 h-5" />
                    SYSTEM LOCKED ({lockTimeRemaining}s)
                  </>
                ) : isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    CONNECTING...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    ESTABLISH CONNECTION
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/40 text-gray-400">ALTERNATIVE ACCESS</span>
                </div>
              </div>

              {/* Biometric Login */}
              {biometricAvailable && (
                <button
                  onClick={handleBiometricLogin}
                  disabled={isLoading || isLocked}
                  className="w-full py-3 rounded-lg font-bold text-white border-2 border-gray-600 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Fingerprint className="w-5 h-5" />
                  BIOMETRIC SCAN
                </button>
              )}

              {/* Quick Access */}
              <div className="grid grid-cols-2 gap-3">
                <button className="py-2 px-4 rounded-lg border border-gray-600 text-gray-400 text-sm hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  Guest Access
                </button>
                <button className="py-2 px-4 rounded-lg border border-gray-600 text-gray-400 text-sm hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin Portal
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-gray-800 bg-black/20">
            <p className="text-center text-gray-500 text-sm">
              New to the neural grid? 
              <button className="ml-2 font-medium hover:text-white transition-colors" style={{ color: '#FFD500' }}>
                Initialize New Link
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-gray-500 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>QUANTUM ENCRYPTED</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <span>NEURAL PROTECTED</span>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <span>AI MONITORED</span>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mt-4 p-3 rounded-lg border border-gray-800 bg-black/20">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Grid Status:</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-400">ONLINE</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-gray-400">Neural Latency:</span>
            <span className="text-green-400">12ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};