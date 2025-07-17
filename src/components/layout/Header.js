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
  TikTok,
  Youtube,
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 text-gray-100 border-r border-zinc-800 transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-800">
          <span className="text-2xl font-bold text-red-600">ravyn</span>
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-yellow-400 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4 mt-6 px-6">
          <a href="#" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
            <Home size={18} /> Home
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
            <Star size={18} /> Featured
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
            <ShoppingBag size={18} /> Shop
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
            <User size={18} /> Account
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
            <Heart size={18} /> Wishlist
          </a>
        </nav>

        {/* Social Media */}
        <div className="mt-auto px-6 py-6 border-t border-zinc-800 flex items-center gap-4">
          <a href="#" className="hover:text-yellow-400">
            <Instagram size={18} />
          </a>
          <a href="#" className="hover:text-yellow-400">
            <Twitter size={18} />
          </a>
          <a href="#" className="hover:text-yellow-400">
            <TikTok size={18} />
          </a>
          <a href="#" className="hover:text-yellow-400">
            <Youtube size={18} />
          </a>
        </div>
      </aside>
    </>
  );
}
