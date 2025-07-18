'use client';

import SkewButton from '../ui/Button';
import { useRouter } from 'next/navigation';
import SecondaryButton from './SecondaryButton';

export default function SignupPromptSection() {
  const router = useRouter();

  return (
    <section className="bg-transparent py-10 px-6 md:px-16 text-[#FAFAFA] text-center">
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Be a Part of <span className="text-[#FF3B30]">Ravyn</span>
        </h2>
        <p className="text-[#FAFAFA]/80 text-base md:text-lg">
          Sign up now to unlock early access to drops, insider perks, and exclusive offers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-3">
          <SkewButton
            onClick={() => router.push('/signup')}
            className="bg-[#FF3B30] hover:bg-[#FFD500]"
          >
            Sign Up
          </SkewButton>
          <SecondaryButton
            onClick={() => router.push('/login')}
            className="bg-transparent border border-[#3D5AFE] text-[#3D5AFE] hover:bg-[#3D5AFE] hover:text-[#121212]"
          >
            Login
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
}
