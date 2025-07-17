import React, { useState } from 'react';
import {
  Menu,
  X,
  Home,
  Star,
  ShoppingBag,
  User,
  Heart,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';

export default function Footer  ()  {
  const socialIcons = [
    { Icon: Instagram, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-transparent border-t border-zinc-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Brand */}
      <div>
        <h3 className="text-2xl font-bold text-red-600 mb-4">ravyn</h3>
        <p className="text-gray-400 mb-4">
          Gen Z fashion, skincare & accessories that speak your language. 
          Express yourself fearlessly.
        </p>
        <div className="flex space-x-4">
          {socialIcons.map(({ Icon, href }, index) => (
            <a
              key={index}
              href={href}
              className="p-2 bg-zinc-800 rounded-full hover:bg-yellow-400 hover:text-black transition-colors duration-200"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Shop */}
      <div>
        <h4 className="text-white font-medium mb-4">SHOP</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#" className="hover:text-yellow-400 transition-colors">New Arrivals</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-colors">Clothing</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-colors">Skincare</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-colors">Accessories</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-colors">Sale</a></li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-white font-medium mb-4">SUPPORT</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#" className="hover:text-yellow-400 transition-colors">Help Center</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-colors">Size Guide</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-colors">Shipping Info</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-colors">Returns</a></li>
          <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact Us</a></li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="text-white font-medium mb-4">STAY CONNECTED</h4>
        <p className="text-gray-400 mb-4">Get the latest drops & exclusive offers</p>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-l-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
          />
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-r-lg hover:bg-yellow-500 transition-colors">
            <Star className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400 text-sm">
        © 2024 Ravyn. All rights reserved. Made with 💜 for Gen Z
      </p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Privacy Policy</a>
        <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Terms of Service</a>
        <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">Cookies</a>
      </div>
    </div>
  </div>
</footer>

  );
};