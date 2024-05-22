'use client';

import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

/**
 * Renders an error page with the provided error message and a button to reset the error.
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/error|Next error.js} - Link to the documentation.
 *
 * @param {Object} props - The props object.
 * @param {Error & { digest?: string }} props.error - The error object to display.
 * @param {() => void} props.reset - Function to reset / reload the page.
 * @return {JSX.Element} The error page component.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const errorMessage = error.message || 'An unexpected error occurred';

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      <h1 className="text-7xl font-bold">500</h1>
      <div className="w-full md:w-1/2 aspect-square overflow-hidden mb-3">
        <Image
          src="/images/anya-500.png"
          alt="Not Found"
          width={ 500 }
          height={ 500 }
          className="w-full aspect-square"
        />
      </div>
      <h2 className="text-3xl text-cente font-bold mb-5">Internal Server Error</h2>
      <div className="text-center text-2xl">
        { errorMessage }
      </div>

      <div className="flex items-center gap-4 mt-5">
        <Button
          type="button"
          variant="outline"
          onClick={ reset }
        >
          <RotateCcw size={ 15 } className="mr-2" />
          Try Again
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
