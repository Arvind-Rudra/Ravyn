'use client';
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Star, Zap, Sparkles, TrendingUp } from 'lucide-react';
import Particles from '@/components/background/Particals';
import ProductCard from '@/components/layout/ProductCard';
import axios from 'axios';
import Link from 'next/link';

export default function Makeup() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    setIsLoaded(true);

    // Fetch skincare products from API
    async function fetchSkincareProducts() {
      setLoadingProducts(true);
      try {
        const res = await axios.get('/api/categories/skincare');
        setProducts(res.data.products || []);
      } catch (e) {
        setProducts([]);
      }
      setLoadingProducts(false);
    }

    fetchSkincareProducts();
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
      <div className="relative z-10 md:ml-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#121212]/80 via-transparent to-[#121212]/80" />

        <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="text-[#FFD500] animate-pulse" size={24} />
              <h1 style={{ fontFamily: 'Zoredo Blocker' }} className="text-6xl font-black text-[#FAFAFA] tracking-tight">
                Skincare <span className="text-[#FFD500]">Essentials</span>
              </h1>
              <Zap className="text-[#FFD500] animate-pulse" size={24} />
            </div>
            <p className="text-lg text-[#FAFAFA] opacity-70 font-light max-w-2xl mx-auto">
              Elevate your glow with handpicked skincare must-haves for every routine
            </p>
          </div>

          {loadingProducts ? (
            <div className="text-center text-[#FFD500] text-lg py-12">Loading skincare...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-[#FFD500] text-lg py-12">No skincare found.</div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, index) => (
                <Link
                  key={product._id || product.id}
                  href={`/shop/products/${product._id || product.id}`}
                  className="block"
                  style={{ textDecoration: 'none' }}
                >
                  <ProductCard
                    product={product}
                    isLoaded={isLoaded}
                    index={index}
                    hoveredProduct={hoveredProduct}
                    setHoveredProduct={setHoveredProduct}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-20">
            <button className="bg-[#3D5AFE] hover:bg-[#FF3B30] text-[#FAFAFA] font-bold py-4 px-12 rounded-full text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <span className="text-[#FFD500] mr-2">💄</span>
              View All Skincare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
