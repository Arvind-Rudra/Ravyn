'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera } from 'lucide-react';

export default function Profile ()  {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Chen',
    email: 'alex.chen@cybercorp.net',
    phone: '+1 (555) 987-6543',
    location: 'Neo Tokyo, Japan',
    joinDate: 'March 2024',
    bio: 'Full-stack developer passionate about cybersecurity and AI. Building the future one line of code at a time.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen p-6 bg-transparent">
      {/* Cyber Grid Background */}

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 style={{ fontFamily: 'Zoredo Blocker' }} className="text-4xl font-bold text-white mb-2 tracking-wider">
            USER PROFILE
          </h1>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#FFD500' }}></div>
        </div>

        {/* Main Profile Card */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative p-8 border-b border-gray-800" style={{ background: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)' }}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
                  <img 
                    src={profile.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#FFD500' }}>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-3xl font-bold bg-transparent border-b-2 border-gray-600 text-white focus:border-yellow-500 outline-none mb-2 w-full max-w-xs"
                    style={{ borderColor: '#FFD500' }}
                  />
                ) : (
                  <h2 className="text-3xl font-bold text-white mb-2">{profile.name}</h2>
                )}
                <p className="text-gray-400 mb-4">Senior Developer • Level 47</p>
                
                {/* Action Buttons */}
                <div className="flex gap-3 justify-center md:justify-start">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                        style={{ backgroundColor: '#3D5AFE' }}
                      >
                        <Save className="w-4 h-4" />
                        SAVE
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white border border-gray-600 hover:border-red-500 transition-all duration-300"
                        style={{ backgroundColor: '#FF3B30' }}
                      >
                        <X className="w-4 h-4" />
                        CANCEL
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                      style={{ backgroundColor: '#3D5AFE' }}
                    >
                      <Edit3 className="w-4 h-4" />
                      UPDATE PROFILE
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6" style={{ backgroundColor: '#FFD500' }}></div>
                  CONTACT DATA
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FF3B30' }}>
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-transparent border-b border-gray-600 text-white focus:border-yellow-500 outline-none w-full"
                        />
                      ) : (
                        <p className="text-white font-medium">{profile.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FF3B30' }}>
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="bg-transparent border-b border-gray-600 text-white focus:border-yellow-500 outline-none w-full"
                        />
                      ) : (
                        <p className="text-white font-medium">{profile.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FF3B30' }}>
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">Location</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="bg-transparent border-b border-gray-600 text-white focus:border-yellow-500 outline-none w-full"
                        />
                      ) : (
                        <p className="text-white font-medium">{profile.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FF3B30' }}>
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">Member Since</p>
                      <p className="text-white font-medium">{profile.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6" style={{ backgroundColor: '#FFD500' }}></div>
                  BIO DATA
                </h3>
                
                <div className="p-6 rounded-lg border border-gray-700" style={{ backgroundColor: '#1a1a1a' }}>
                  {isEditing ? (
                    <textarea
                      value={editedProfile.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows="6"
                      className="w-full bg-transparent text-white placeholder-gray-400 outline-none resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg border border-gray-700" style={{ backgroundColor: '#1a1a1a' }}>
                    <div className="text-2xl font-bold" style={{ color: '#FFD500' }}>47</div>
                    <p className="text-gray-400 text-sm">Level</p>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-gray-700" style={{ backgroundColor: '#1a1a1a' }}>
                    <div className="text-2xl font-bold" style={{ color: '#FFD500' }}>1.2K</div>
                    <p className="text-gray-400 text-sm">Points</p>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-gray-700" style={{ backgroundColor: '#1a1a1a' }}>
                    <div className="text-2xl font-bold" style={{ color: '#FFD500' }}>89%</div>
                    <p className="text-gray-400 text-sm">Progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>SECURE CONNECTION • ENCRYPTED DATA • NEURAL NETWORK PROTECTED</p>
        </div>
      </div>
    </div>
  );
};
