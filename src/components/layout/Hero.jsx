'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import SkewButton from '../ui/Button';
import SecondaryButton from '../ui/SecondaryButton';

const IMAGES = ['/clothing.jpeg', '/skin.png', '/acc.png'];

export default function HeroSection() {
  const imageWrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Continuous floating animation — only runs once
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageWrapperRef.current, {
        x: 10,
        y: 0,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, imageWrapperRef);

    return () => ctx.revert();
  }, []);

  // Looping image swap
  useLayoutEffect(() => {
    const interval = setInterval(() => {
      gsap.to(imageWrapperRef.current.children[currentIndex], {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          const nextIndex = (currentIndex + 1) % IMAGES.length;
          setCurrentIndex(nextIndex);
          gsap.fromTo(
            imageWrapperRef.current.children[nextIndex],
            { opacity: 0 },
            { opacity: 1, duration: 0.6 }
          );
        },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-transparent text-[#FAFAFA] overflow-hidden">
      {/* Text Section */}
      <div className="z-10 max-w-xl space-y-6 text-center md:text-left">
        <h1 style={{ fontFamily: 'Zoredo Blocker' }} className="text-5xl md:text-7xl font-extrabold leading-tight">
          Be Bold, <br />
          <span style={{ fontFamily: 'Zoredo Blocker Line' }}>Be</span>{' '}
          <span className="text-[#FF3B30]">Ravyn</span>.
        </h1>
        <p className="text-lg md:text-xl text-[#FAFAFA]/80">
          Explore edgy clothing, radiant skincare & bold accessories – curated for Gen Z.
        </p>
        <div className="flex justify-center md:justify-start gap-4 pt-4">
          <SkewButton>shop now</SkewButton>
          <SecondaryButton className="p-1">more</SecondaryButton>
        </div>
      </div>

      {/* Floating Image Section */}
      <div
        ref={imageWrapperRef}
        className="relative w-[320px] h-[450px] md:w-[450px] md:h-[500px] mt-16 md:mt-0 rounded-3xl overflow-hidden"
      >
        {IMAGES.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt="Model wearing Ravyn"
            fill
            sizes="100%"
            className={`object-cover rounded-3xl absolute inset-0 transition-opacity duration-700 ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            priority={idx === 0}
          />
        ))}
      </div>
    </section>
  );
}
