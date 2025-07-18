'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Particles from "@/components/background/Particals";
import SplitText from '@/components/Introanim/Anim';
import Silk from '@/components/background/Silk';

export default function Home() {
  const texts = [
    { text: "CLOTHING", color: "#FF3B30" },
    { text: "SKINCARE", color: "#FFD500" },
    { text: "ACCESSORIES", color: "#3D5AFE" },
  ];

  const [index, setIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [done, setDone] = useState(false);

  const logoRef = useRef(null);

  const handleNext = () => {
    if (index < texts.length - 1) {
      setTimeout(() => setIndex(index + 1), 500);
    } else if (!showLogo) {
      setTimeout(() => setShowLogo(true), 500);
    }
  };

  useEffect(() => {
    if (showLogo && logoRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        logoRef.current,
        { opacity: 1, scale: 1, y: 0 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
      ).to(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.85,
          duration: 0.3,
          ease: 'power2.inOut',
          delay: 0.2,
          onComplete: () => setDone(true),
        }
      );
    }
  }, [showLogo]);

  return (
    <>
      {!done ? (
        <>
          <div className="fixed inset-0 -z-10">
            <Silk speed={5} scale={1} color="#5A5561" noiseIntensity={1.5} rotation={0} />
          </div>

          <div className="flex items-center justify-center h-screen bg-transparent">
            {!showLogo ? (
              <SplitText
                key={index}
                text={texts[index].text}
                className="text-6xl font-extrabold"
                delay={100}
                duration={0.3}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0, color: texts[index].color }}
                textAlign="center"
                onLetterAnimationComplete={handleNext}
              />
            ) : (
              <Image
                ref={logoRef}
                src="/logo2.png"
                alt="Ravyn Logo"
                width={250}
                height={250}
                priority
              />
            )}
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 -z-10">
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
            <Sidebar />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
