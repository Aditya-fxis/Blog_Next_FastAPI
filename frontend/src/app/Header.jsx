'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
  const router = useRouter();

  return (
    <header className="max-w-6xl mx-auto w-full flex justify-between items-center mb-12 px-6 pt-8">
      <Link href={"/"}>
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        📓 BlogVerse
      </h1>
      </Link>
      <nav className="space-x-4 text-sm sm:text-base">
        <button
          onClick={() => router.push('/')}
          className="hover:underline cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={() => router.push('/blogs')}
          className="hover:underline cursor-pointer"
        >
          Blogs
        </button>
        <button
          onClick={() => router.push('/create')}
          className="hover:underline cursor-pointer"
        >
          Create
        </button>
      </nav>
    </header>
  );
};

export default Header;
