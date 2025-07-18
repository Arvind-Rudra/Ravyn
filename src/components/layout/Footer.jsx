'use client';

import React from 'react';
import {
  Star,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';

export default function Footer() {
  const socialIcons = [
    { Icon: Instagram, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-[#121212] border-t border-[#1E1E1E] text-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-[#FF3B30] mb-4">ravyn</h3>
            <p className="text-[#AAAAAA] mb-4">
              Gen Z fashion, skincare & accessories that speak your language.
              Express yourself fearlessly.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="p-2 bg-[#1E1E1E] rounded-full hover:bg-[#FFD500] hover:text-black transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[#FAFAFA] font-medium mb-4">SHOP</h4>
            <ul className="space-y-2 text-[#AAAAAA]">
              <li><a href="#" className="hover:text-[#FFD500] transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-[#FFD500] transition-colors">Clothing</a></li>
              <li><a href="#" className="hover:text-[#FFD500] transition-colors">Skincare</a></li>
              <li><a href="#" className="hover:text-[#FFD500] transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-[#FFD500] transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#FAFAFA] font-medium mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-[#AAAAAA]">
              <li><a href="#" className="hover:text-[#FFD500] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#FFD500] transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-[#FFD500] transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-[#FFD500] transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-[#FFD500] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[#FAFAFA] font-medium mb-4">STAY CONNECTED</h4>
            <p className="text-[#AAAAAA] mb-4">Get the latest drops & exclusive offers</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#1E1E1E] border border-[#2A2A2A] rounded-l-lg py-2 px-4 text-[#FAFAFA] placeholder-[#888] focus:outline-none focus:border-[#FFD500]"
              />
              <button className="bg-[#FFD500] text-black px-4 py-2 rounded-r-lg hover:bg-[#FFC300] transition-colors">
                <Star className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#1E1E1E] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#888] text-sm">
            © 2024 Ravyn. All rights reserved. Made with 💜 for Gen Z
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-[#888] hover:text-[#FFD500] text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#888] hover:text-[#FFD500] text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-[#888] hover:text-[#FFD500] text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
