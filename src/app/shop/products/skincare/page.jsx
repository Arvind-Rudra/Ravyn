'use client';
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Star, Zap, Sparkles, TrendingUp } from 'lucide-react';
import Particles from '@/components/background/Particals';
import ProductCard from '@/components/layout/ProductCard';

const products = [
  {
    id: 101,
    name: 'Liquid Matte Lipstick',
    price: '₹699',
    originalPrice: '₹999',
    image: '/makeup/lipstick.jpeg',
    rating: 4.7,
    reviews: 198,
    isNew: true,
    isTrending: false,
    colors: ['#D72638', '#A4133C', '#FFC0CB'],
    category: 'Lipsticks'
  },
  {
    id: 102,
    name: 'Glow Highlighter Palette',
    price: '₹1,299',
    originalPrice: '₹1,799',
    image: '/makeup/highlighter.jpeg',
    rating: 4.8,
    reviews: 142,
    isNew: false,
    isTrending: true,
    colors: ['#FFF5E1', '#FFD700'],
    category: 'Highlighters'
  },
  {
    id: 103,
    name: 'Smudge-Proof Eyeliner',
    price: '₹499',
    originalPrice: '₹699',
    image: '/makeup/eyeliner.jpeg',
    rating: 4.6,
    reviews: 310,
    isNew: false,
    isTrending: false,
    colors: ['#000000'],
    category: 'Eye Makeup'
  },
  {
    id: 104,
    name: 'Blush Duo Pack',
    price: '₹899',
    originalPrice: '₹1,299',
    image: '/makeup/blush.jpeg',
    rating: 4.9,
    reviews: 78,
    isNew: true,
    isTrending: true,
    colors: ['#FFB6C1', '#F08080'],
    category: 'Blush'
  },
];

export default function Makeup() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <Particles
          particleColors={['#FAFAFA', '#FAFAFA']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 md:ml-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#121212]/80 via-transparent to-[#121212]/80" />

        <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-[#FFD500] animate-pulse" size={24} />
              <h1 style={{ fontFamily: 'Zoredo Blocker' }} className="text-6xl font-black text-[#FAFAFA] tracking-tight">
                Makeup <span className="text-[#FFD500]">Magic</span>
              </h1>
              <Zap className="text-[#FFD500] animate-pulse" size={24} />
            </div>
            <p className="text-lg text-[#FAFAFA] opacity-70 font-light max-w-2xl mx-auto">
              Elevate your glam with handpicked makeup must-haves that slay every look
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isLoaded={isLoaded}
                index={index}
                hoveredProduct={hoveredProduct}
                setHoveredProduct={setHoveredProduct}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          <div className="text-center mt-20">
            <button className="bg-[#3D5AFE] hover:bg-[#FF3B30] text-[#FAFAFA] font-bold py-4 px-12 rounded-full text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <span className="text-[#FFD500] mr-2">💄</span>
              View All Makeup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
