'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import StackLogoAnimation from '@/animations/StackLogoAnimation';
import { Button } from '@/components/shadcn/button';
import { Silk } from '@/components/react-bits/Silk';
import { TypographyH3 } from '@/components/shadcn/typography';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/sign-in';

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <Silk
            opacity={0.2}
            speed={2.8}
        />
        
        <div className="relative self-center justify-center mx-4 md:m-0 w-full md:w-[60vw] h-[70vh] dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden flex rounded-xl border border-zinc-200 dark:border-zinc-800"> 
            <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-2">
                    <Image
                        src="/vicky-logo.svg"
                        alt="Vicky Logo"
                        width={26}
                        height={26}
                        className="self-end"
                    />
                    <TypographyH3>Vicky</TypographyH3>
                </div>
            </div>
            
            <div className="hidden lg:flex min-w-1/2 bg-[#141414] items-center justify-center">
                <StackLogoAnimation />
            </div>

            <div className="min-w-full lg:min-w-1/2 bg-black text-white relative flex items-center justify-center lg:border-l lg:border-zinc-800">
            <div className="absolute top-4 right-4">
                {isLogin ? (
                <Button variant="ghost" asChild>
                    <Link href="/sign-up">
                    Sign Up
                    </Link>
                </Button>
                ) : (
                <Button variant="ghost" asChild>
                    <Link href="/sign-in">
                        Sign In
                    </Link>
                </Button>
                )}
            </div>

            <div className="w-full p-8">
                {children}
            </div>
            </div>
        </div>
    </div>
  );
}
