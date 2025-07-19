'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff, Shield, Zap, Upload, Check, AlertCircle } from 'lucide-react';

export default function Signup  ()  {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    avatar: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

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

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number required';
    if (!formData.location.trim()) newErrors.location = 'Location required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password required';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(3);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        {/* Cyber Grid Background */}
       

        <div className="relative max-w-md w-full">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 shadow-2xl p-8 text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#FFD500' }}>
              <Check className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">WELCOME TO THE GRID</h2>
            <p className="text-gray-400 mb-6">Your neural link has been established successfully. Welcome to the future, {formData.firstName}.</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: '#3D5AFE' }}
            >
              ENTER THE MATRIX
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      {/* Cyber Grid Background */}
      

      <div className="relative max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-8 h-8" style={{ color: '#FFD500' }} />
            <h1 className="text-3xl font-bold text-white tracking-wider">
              NEURAL LINK
            </h1>
          </div>
          <p className="text-gray-400">Join the cybernetic revolution</p>
          <div className="w-16 h-1 mx-auto mt-2" style={{ backgroundColor: '#FFD500' }}></div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= 1 ? 'text-black' : 'text-gray-400'
            }`} style={{ backgroundColor: step >= 1 ? '#FFD500' : '#333' }}>
              1
            </div>
            <div className="w-12 h-1" style={{ backgroundColor: step >= 2 ? '#FFD500' : '#333' }}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step >= 2 ? 'text-black' : 'text-gray-400'
            }`} style={{ backgroundColor: step >= 2 ? '#FFD500' : '#333' }}>
              2
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-bold text-white mb-6 text-center">
              {step === 1 ? 'PERSONAL DATA' : 'SECURITY PROTOCOL'}
            </h2>

            <div className="space-y-6">
              {step === 1 ? (
                <>
                  {/* Avatar Upload */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-700 mx-auto mb-2">
                        {formData.avatar ? (
                          <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                            <User className="w-8 h-8 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <label className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110" style={{ backgroundColor: '#FFD500' }}>
                        <Upload className="w-4 h-4 text-black" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-gray-400 text-sm">Upload Avatar</p>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                            errors.firstName ? 'border-red-500' : 'border-gray-600'
                          } bg-gray-900/50 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition-all duration-300`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                            errors.lastName ? 'border-red-500' : 'border-gray-600'
                          } bg-gray-900/50 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition-all duration-300`}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Neural Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                          errors.email ? 'border-red-500' : 'border-gray-600'
                        } bg-gray-900/50 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition-all duration-300`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Secure Line Number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                          errors.phone ? 'border-red-500' : 'border-gray-600'
                        } bg-gray-900/50 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition-all duration-300`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Current Sector Location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                          errors.location ? 'border-red-500' : 'border-gray-600'
                        } bg-gray-900/50 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition-all duration-300`}
                      />
                    </div>
                    {errors.location && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.location}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                    style={{ backgroundColor: '#3D5AFE' }}
                  >
                    CONTINUE TO SECURITY
                  </button>
                </>
              ) : (
                <>
                  {/* Password */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Neural Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                          errors.password ? 'border-red-500' : 'border-gray-600'
                        } bg-gray-900/50 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition-all duration-300`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
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

                  {/* Confirm Password */}
                  <div>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Neural Password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                        } bg-gray-900/50 text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition-all duration-300`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Security Features */}
                  <div className="p-4 rounded-lg border border-gray-700 bg-gray-900/30">
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" style={{ color: '#FFD500' }} />
                      SECURITY FEATURES
                    </h4>
                    <div className="space-y-1 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: formData.password.length >= 8 ? '#FFD500' : '#666' }}></div>
                        Minimum 8 characters
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: /[A-Z]/.test(formData.password) ? '#FFD500' : '#666' }}></div>
                        Uppercase letter
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: /[0-9]/.test(formData.password) ? '#FFD500' : '#666' }}></div>
                        Number
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 rounded-lg font-bold text-white border border-gray-600 hover:border-gray-500 transition-all duration-300"
                    >
                      BACK
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex-1 py-3 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ backgroundColor: '#3D5AFE' }}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          CONNECTING...
                        </>
                      ) : (
                        'JOIN THE GRID'
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-gray-800 bg-black/20">
            <p className="text-center text-gray-500 text-sm">
              Already have neural access? 
              <button className="ml-2 font-medium hover:text-white transition-colors" style={{ color: '#FFD500' }}>
                Connect Here
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>🔒 QUANTUM ENCRYPTED • AI PROTECTED • NEURAL SECURE</p>
        </div>
      </div>
    </div>
  );
};