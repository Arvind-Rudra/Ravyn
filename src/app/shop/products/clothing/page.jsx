'use client';
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Star, Zap, Sparkles, TrendingUp } from 'lucide-react';
import Particles from '@/components/background/Particals';
import ProductCard from '@/components/layout/ProductCard';


const products = [
  {
    id: 1,
    name: 'Neon Streetwear Hoodie',
    price: '₹2,499',
    originalPrice: '₹3,499',
    image: '/cloths/pin.jpeg',
    rating: 4.8,
    reviews: 156,
    isNew: true,
    isTrending: false,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    category: 'Streetwear'
  },
  {
    id: 2,
    name: 'Cyber Mini Dress',
    price: '₹1,799',
    originalPrice: '₹2,299',
    image: '/cloths/pin.jpeg',
    rating: 4.6,
    reviews: 89,
    isNew: false,
    isTrending: true,
    colors: ['#FF1493', '#00CED1', '#FFD700'],
    category: 'Dresses'
  },
  {
    id: 3,
    name: 'Mauve Oversized Tee',
    price: '₹1,299',
    originalPrice: '₹1,699',
    image: '/cloths/pin.jpeg',
    rating: 4.7,
    reviews: 234,
    isNew: false,
    isTrending: false,
    colors: ['#DDA0DD', '#F0E68C', '#98FB98'],
    category: 'Casual'
  },
  {
    id: 4,
    name: 'Oatmeal Ribbed Co-ord Set',
    price: '₹1,999',
    originalPrice: '₹2,799',
    image: '/cloths/pin.jpeg',
    rating: 4.9,
    reviews: 67,
    isNew: true,
    isTrending: true,
    category: 'Sets'
  },
];

export default function Clothing() {
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
    <div className="min-h-screen  relative overflow-hidden">
      {/* Animated Background */}

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
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#121212]/80 via-transparent to-[#121212]/80" />

        {/* Main Content */}
        <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-[#FFD500] animate-pulse" size={24} />
              <h1 style={{ fontFamily: 'Zoredo Blocker' }} className="text-6xl font-black text-[#FAFAFA] tracking-tight">
                Explore the <span className="text-[#FFD500]">Drop</span>
              </h1>
              <Zap className="text-[#FFD500] animate-pulse" size={24} />
            </div>
            <p className="text-lg text-[#FAFAFA] opacity-70 font-light max-w-2xl mx-auto">
              Discover our latest collection of cutting-edge fashion pieces that define tomorrow's style
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {
              products.map((product, index) => (
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

          {/* Call to Action */}
          <div className="text-center mt-20">
            <button className="bg-[#3D5AFE] hover:bg-[#FF3B30] text-[#FAFAFA] font-bold py-4 px-12 rounded-full text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <span className="text-[#FFD500] mr-2">🔥</span>
              View All Products
            </button>
          </div>
        </div>


      </div>
    </div>
  );
}