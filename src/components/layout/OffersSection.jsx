'use client';

import SkewButton from '../ui/Button';
import Image from 'next/image';

const offers = [
  {
    title: 'Mid-Year Sale',
    subtitle: 'Flat 40% Off',
    description: 'On all skincare essentials. Limited time only!',
    image: '/skin.png',
    bg: 'bg-transparent',
    color: 'text-[#FFD500]',
  },
  {
    title: 'Drop Alert',
    subtitle: 'New Arrivals',
    description: 'Exclusive Gen Z fashion just landed!',
    image: '/clothing.jpeg',
    bg: 'bg-[#121212]/80',
    color: 'text-[#3D5AFE]',
    reverse: true,
  },
];

export default function OffersSection() {
  return (
    <section className="relative py-24 px-6 md:px-16 bg-transparent text-[#FAFAFA]">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Offers & Sales
        </h2>
        <p className="text-[#FAFAFA]/80 text-lg">Don’t miss exclusive drops & limited-time deals</p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 gap-12">
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className={`
              group flex flex-col md:flex-row items-center justify-between
              p-6 md:p-10 rounded-3xl backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.2)]
              transition-all duration-300 ease-in-out hover:scale-[1.02]
              ${offer.bg} ${offer.reverse ? 'md:flex-row-reverse' : ''}
            `}
          >
            {/* Image */}
            <div className="relative w-[240px] h-[240px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                priority
              />
            </div>

            {/* Text */}
            <div className="flex-1 space-y-4 mt-6 md:mt-0 md:px-10 text-center md:text-left">
              <h3 className={`text-3xl md:text-4xl font-extrabold ${offer.color}`}>
                {offer.title}
              </h3>
              <p className="text-2xl font-bold">{offer.subtitle}</p>
              <p className="text-[#FAFAFA]/80 text-base md:text-lg">{offer.description}</p>
              <div className="pt-2">
                <SkewButton className="group-hover:scale-105 transition-transform">Shop Now</SkewButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
