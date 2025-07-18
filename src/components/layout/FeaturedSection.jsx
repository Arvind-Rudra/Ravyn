'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  {
    title: 'Clothing',
    description: 'Bold fits that speak your vibe.',
    image: '/clothing.jpeg',
    color: '#FF3B30',
    link: '/shop/products/clothing',
  },
  {
    title: 'Skincare',
    description: 'Glowy skin. Zero effort.',
    image: '/skin.png',
    color: '#FFD500',
    link: '/shop/products/skincare',
  },
  {
    title: 'Accessories',
    description: 'Details that complete you.',
    image: '/acc.png',
    color: '#3D5AFE',
    link: '/shop/products/accessories',
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-20 px-4 md:px-16 bg-transparent text-[#FAFAFA]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-2">Explore Our Categories</h2>
        <p className="text-[#888]">Curated for your vibe</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <Link rel="preload" href={cat.link} key={index} >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-lg group"
            >
              <div className="relative w-full h-64">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2" style={{ color: cat.color }}>
                  {cat.title}
                </h3>
                <p className="text-sm text-[#CFCFCF]">{cat.description}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
