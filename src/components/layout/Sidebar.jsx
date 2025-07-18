import React, { useState } from 'react';
import Image from 'next/image'
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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <>
      {/* Toggle Button (Mobile only) */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-transparent text-white rounded-md hover:bg-zinc-800 md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-16 bg-transparent text-gray-100 border-r border-zinc-800 flex flex-col items-center py-4 transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="mb-6">
            <Image src={`/logo1.png`} alt={'Ravyn Logo'} className="w-10 h-10 object-contain" width="64" height="64" />
          {/* <img
            src="public/logo.jpeg" // ← Replace this with the correct path to your image
            alt="Ravyn Logo"
            className="w-10 h-10 object-contain"
          /> */}
        </div>

        {/* Icon Navigation */}
        <nav className="flex flex-col gap-6 items-center">
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <Home size={20} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <Star size={20} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <ShoppingBag size={20} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <User size={20} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <Heart size={20} />
          </a>
        </nav>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Social Icons */}
        <div className="flex flex-col gap-4 items-center mb-4">
          <a href="#" className="hover:text-yellow-400">
            <Instagram size={18} />
          </a>
          <a href="#" className="hover:text-yellow-400">
            <Twitter size={18} />
          </a>
          <a href="#" className="hover:text-yellow-400">
            <X size={18} />
          </a>
          <a href="#" className="hover:text-yellow-400">
            <Youtube size={18} />
          </a>
        </div>
      </aside>
    </>
  );
}
