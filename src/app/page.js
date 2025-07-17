'use client';

import { signIn } from "next-auth/react";
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Particles from './Particles';

export default function Home() {
  return (<>
      <div className="absolute inset-0 -z-10">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10">
        <Sidebar />
        <Footer />
      </div>
    </>
  );
}
