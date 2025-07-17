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
  const [logoShown, setLogoShown] = useState(false);
  const [done, setDone] = useState(false);

  const logoRef = useRef(null);

  const handleNext = () => {
    if (index < texts.length - 1) {
      setTimeout(() => setIndex(index + 1), 1200); // ~1.2s per text
    } else if (!logoShown) {
      setTimeout(() => setLogoShown(true), 1200); // show logo after last text
    }
  };

  // Animate logo in and out
  useEffect(() => {
    if (logoShown && logoRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.7,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      tl.to(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: -20,
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.6, // pause with logo visible
          onComplete: () => {
            setDone(true);
          },
        }
      );
    }
  }, [logoShown]);

  return (
    <>
      {!done ? (
        <>
          {/* Background */}
          <div className="fixed inset-0 -z-10">
            <Silk
              speed={5}
              scale={1}
              color="#5A5561"
              noiseIntensity={1.5}
              rotation={0}
            />
          </div>

          {/* Foreground */}
          <div className="flex items-center justify-center h-screen bg-transparent">
            {!logoShown ? (
              <SplitText
                key={index}
                text={texts[index].text}
                className="text-6xl font-extrabold"
                delay={100}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0, color: texts[index].color }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleNext}
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image
                  ref={logoRef}
                  src={'/logo2.png'}
                  alt={"Ravyn Logo"}
                  width={250}
                  height={250}
                  priority
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Main Content */}
          <div className="absolute inset-0 -z-10">
            <Particles
              particleColors={['#FAFAFA', '#FAFAFA']}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>

          <div className="relative z-10 ml-16">
            <Sidebar />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
