import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LayoutDashboard, PenBox } from 'lucide-react';

const Header = () => {
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-300'>
      <nav className='container mx-auto py-4 px-4 flex justify-between items-center'>
        <Link href="/">
          <Image 
            src="/logo.png"
            alt="Wealth Logo"
            height={60}
            width={200}
            className='cursor-pointer h-12 w-auto object-contain'
          />
        </Link>

        <div>
          <SignedIn>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" 
              className='text-gray-700 hover:text-gray-900 flex items-center gap-2'>
                <Button variant="outline" className="flex items-center space-x-1">
                  <LayoutDashboard size={18}/>
                  <span className='hidden md:inline'>Dashboard</span>
                </Button>
              </Link>

              <Link href="/transactions/create"
              className='text-gray-700 hover:text-gray-900 flex items-center gap-2'>
                <Button className="flex items-center space-x-1">
                  <PenBox size={18}/>
                  <span className='hidden md:inline'>Add Transcation</span>
                </Button>
              </Link>




              <UserButton appearance={{elements:{
                avatarBox: 'w-10 h-10',
              }}}/>
            </div>




          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard'>
              <Button variant="outline" className="mr-4">Login</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </div>
  );
};

export default Header;
