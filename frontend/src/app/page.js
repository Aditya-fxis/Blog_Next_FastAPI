'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

export default function Page() {
  const router = useRouter();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex flex-col justify-between px-6 overflow-hidden bg-gradient-radial from-blue-50 via-white to-purple-100 dark:from-[#0a0a0a] dark:via-[#1a1a1a] dark:to-[#222]"
      >
      {/* Background Blobs */}
      <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-purple-300 dark:bg-purple-800 opacity-20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-blue-300 dark:bg-blue-900 opacity-20 rounded-full blur-2xl -z-10" />
      <Header/>
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto space-y-8">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white"
        >
          Write What Matters. <br /> Read What Inspires.
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg sm:text-xl text-gray-700 dark:text-gray-300"
        >
          A modern blogging platform for curious minds & thoughtful writers.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button
            onClick={() => router.push('/create')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition cursor-pointer"
          >
            ✍️ Write a Blog
          </button>
          <button
            onClick={() => router.push('/blogs')}
            className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold px-8 py-3 rounded-lg shadow-md transition"
          >
            📖 Browse Blogs
          </button>
        </motion.div>
      </section>
    <Footer/>
    </motion.main>
  );
}
