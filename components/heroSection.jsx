'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-20 pb-10 px-4 ">
      <div className="container mx-auto text-center">
        {/* Hero Title */}
        <h1
          className="text-5xl md:text-8xl lg:text-[105px] pb-6 font-extrabold tracking-tighter
                     bg-gradient-to-b from-blue-400 
                     bg-clip-text text-transparent inline-block pt-4 mt-4 "
        >
          Manage Your  <span className="pr-1 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent animate-pulse">
          Finances
    </span>   <br />  with Intelligence
        </h1>

        <p className="mt-8 mb-8 text-lg md:text-xl">
          An AI-powered financial management platform that helps you track, analyze, and optimize your spending habits.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">Get Started</Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="px-8">Watch Demo</Button>
          </Link>
        </div>

        {/* Hero Image with 3D scroll effect */}
        {/* <div
          style={{ perspective: '1000px' }}
          className="w-full flex justify-center"
        >
          <Image
            src="/banner.jpg"
            alt="Hero"
            width={800}
            height={600}
            style={{
              transform: scrolled
                ? 'rotateX(0deg) scale(1) translateY(40px)'
                : 'rotateX(15deg) scale(1)',
              transition: 'transform 0.5s ease-out',
              willChange: 'transform',
              borderRadius: '20px',
            }}
          />
        </div> */}
      </div>
    </div>
  );
}
