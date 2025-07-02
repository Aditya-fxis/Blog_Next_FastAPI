'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../../Header';
import Footer from '../../Footer';
import { CalendarDays } from 'lucide-react';
import { getBlogById } from '@/app/lib/api';

export default function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
 
        getBlogById(id)
        .then((data)=>setBlog(data))
        .catch(()=>setError('Could not load blog'));
  }, [id]);
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;
  if (!blog) return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0f2fe] via-white to-[#fdf2f8] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#111827] relative">
      {/* Background Blobs */}
      <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] bg-purple-300 dark:bg-purple-800 opacity-20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-300 dark:bg-blue-800 opacity-20 rounded-full blur-2xl -z-10" />

      <Header />

      <main className="flex-grow px-4 py-12 flex justify-center items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl backdrop-blur-xl bg-white/10 dark:bg-zinc-900/20 border border-white/20 dark:border-zinc-700/40 shadow-xl rounded-3xl p-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {blog.title}
          </h1>

          <p className="text-gray-800 dark:text-gray-300 whitespace-pre-wrap text-lg leading-relaxed">
            {blog.content}
          </p>

          <div className="mt-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CalendarDays className="w-4 h-4" />
            <span>Published on {new Date(blog.created_at).toLocaleString()}</span>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
