'use client';
import React from 'react';
import { ShoppingBag, Star, TrendingUp } from 'lucide-react';

export default function ProductCard({
    product,
    isLoaded,
    index,
    hoveredProduct,
    setHoveredProduct,
}) {
    return (
        <div
            key={product.id}
            className={`group relative rounded-3xl overflow-hidden backdrop-blur-xl bg-[#121212]/80 border border-[#FAFAFA]/10 shadow-2xl transition-all duration-200 hover:scale-105 hover:border-[#FF3B30]/50 cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
            onClick={() => console.log(`Navigate to product ${product.id}`)}
        >
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {product.isNew && (
                    <span className="bg-[#3D5AFE] text-[#FAFAFA] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        NEW
                    </span>
                )}
                {product.isTrending && (
                    <span className="bg-[#FF3B30] text-[#FAFAFA] text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <TrendingUp size={12} /> HOT
                    </span>
                )}
            </div>


            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-200 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`absolute inset-0 flex items-center justify-center bg-[#121212]/60 transition-all duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-center">
                        <ShoppingBag size={32} className="text-[#FFD500] mx-auto mb-2" />
                        <p className="text-[#FAFAFA] font-semibold">Click to View</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-4">
                <span className="text-xs font-medium text-[#FFD500] uppercase tracking-wider">
                    {product.category}
                </span>

                <h3 style={{ fontFamily: 'Zoredo Blocker' }} className="text-xl font-bold text-[#FAFAFA] group-hover:text-[#FFD500] transition-colors duration-300">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={`${i < Math.floor(product.rating) ? 'fill-[#FFD500] text-[#FFD500]' : 'text-[#FAFAFA] opacity-30'}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-[#FAFAFA] opacity-75">
                        {product.rating} ({product.reviews})
                    </span>
                </div>

                {Array.isArray(product.colors) && product.colors.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-[#FAFAFA] opacity-60">Colors:</span>
                        <div className="flex gap-1">
                            {product.colors.map((color, i) => (
                                <div
                                    key={i}
                                    className="w-4 h-4 rounded-full border-2 border-[#FAFAFA]/30 shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-[#FAFAFA]">
                        {product.price}
                    </span>
                    <span className="text-sm text-[#FAFAFA] opacity-40 line-through">
                        {product.originalPrice}
                    </span>
                    <span className="text-xs bg-[#FF3B30] text-[#FAFAFA] px-2 py-1 rounded-full">
                        ₹ {Math.round(((parseInt(product.originalPrice) - parseInt(product.price)) / parseInt(product.originalPrice)) * 100)}% OFF
                    </span>
                </div>
            </div>
        </div>
    );
}
