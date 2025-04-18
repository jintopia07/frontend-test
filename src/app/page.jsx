'use client';

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import InteractiveList from './components/InteractiveList'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Interactive Fruit/Vegetable</title>
        <meta name="description" content="Next.js Interactive List Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '2rem' }} className="flex-grow">
        <h1 className='text-center text-orange-500 font-semibold px-3 py-2'>Interactive Fruit/Vegetable</h1>
        <InteractiveList />
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-gray-300">Click the button below to see users data grouped by department</p>
          <Link
            href="/users-grouped"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Users Grouped by Department
          </Link>

        </div>
      </footer>
    </div>
  );
}