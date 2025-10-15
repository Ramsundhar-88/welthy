import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LayoutDashboard, PenBox } from 'lucide-react';
import { checkUser } from '@/lib/checkUser';

const Header = async() => {
  await checkUser();
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-300'>
      <nav className='container mx-auto py-3 md:py-4 px-4 flex justify-between items-center'>
        <Link href="/">
          <div className="font-[Righteous] text-2xl md:text-4xl tracking-tight cursor-pointer">Welthy</div>
        </Link>

        <div className="flex items-center">
          <SignedIn>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/dashboard" 
                className='text-gray-700 hover:text-gray-900'>
                <Button variant="outline" className="flex items-center space-x-1 px-2 md:px-4 h-8 md:h-10">
                  <LayoutDashboard size={16} className="md:w-[18px] md:h-[18px]"/>
                  <span className='hidden sm:inline text-sm md:text-base'>Dashboard</span>
                </Button>
              </Link>

              <Link href="/transaction/create"
                className='text-gray-700 hover:text-gray-900'>
                <Button className="flex items-center space-x-1 px-2 md:px-4 h-8 md:h-10">
                  <PenBox size={16} className="md:w-[18px] md:h-[18px]"/>
                  <span className='hidden sm:inline text-sm md:text-base'>Add Transaction</span>
                </Button>
              </Link>

              <UserButton appearance={{elements:{
                avatarBox: 'w-8 h-8 md:w-10 md:h-10',
              }}}/>
            </div>
          </SignedIn>
          
          <SignedOut>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/sign-in">
                <Button variant="outline" className="cursor-pointer h-8 md:h-10 px-3 md:px-4 text-sm md:text-base">Login</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="secondary" className="cursor-pointer h-8 md:h-10 px-3 md:px-4 text-sm md:text-base">Sign-up</Button>
              </Link>
            </div>
          </SignedOut>
        </div>
      </nav>
    </div>
  );
};

export default Header;