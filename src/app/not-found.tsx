'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

/**
 * Renders a page for displaying a 404 Not Found page.
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/not-found|Next not-found.js} - Link to the documentation.
 *
 * @return {JSX.Element} The NotFound component.
 */
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      <h1 className="text-7xl font-bold">404</h1>
      <div className="w-full md:w-1/2 aspect-square overflow-hidden mb-3">
        <Image
          src="/images/konata-not-found.png"
          alt="Not Found"
          width={ 500 }
          height={ 500 }
          className="w-full aspect-square"
        />
      </div>
      <h2 className="text-3xl text-cente font-bold mb-5">Not Found</h2>
      <div className="text-center text-2xl">
        Oops! Seems page or anime that you are looking for is not found
      </div>

      <div className="flex items-center gap-4 mt-5">
        <Button
          type="button"
          variant="outline"
          onClick={ () => router.back() }
        >
          <ChevronLeft className="mr-2" />
          Go Back
        </Button>

        <Button asChild>
          <Link href="/">
            Home page
          </Link>
        </Button>

      </div>
    </div>
  );
}
