'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Pencil, Loader2, FileText, MessageSquareText } from 'lucide-react';
import Header from '../../Header';
import Footer from '../../Footer';
import axios from 'axios';
import { getAllBlogs, getBlogById, updateBlog } from '@/app/lib/api';

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getBlogById(id)
    .then(data => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(() => setError('Failed to load blog.'));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateBlog(id, { title, content });
      setSuccess('✅ Blog updated!');
      setTimeout(() => router.push('/blogs'), 1600);
    } catch (err) {
      setError('❌ Update failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0f2fe] via-white to-[#fdf2f8] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#111827] relative">
      {/* Glowing background */}
      <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] bg-purple-300 dark:bg-purple-800 opacity-20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-300 dark:bg-blue-800 opacity-20 rounded-full blur-2xl -z-10" />

      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl backdrop-blur-xl bg-white/10 dark:bg-zinc-900/20 border border-white/20 dark:border-zinc-700/40 shadow-2xl rounded-3xl p-10"
        >
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-4">
            <Pencil className="w-6 h-6" />
            Edit Blog
          </h1>

          {error && <p className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 p-3 rounded-lg mb-3">{error}</p>}
          {success && <p className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 p-3 rounded-lg mb-3">{success}</p>}

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                <FileText className="w-4 h-4" />
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800/70 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none backdrop-blur"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                <MessageSquareText className="w-4 h-4" />
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 h-48 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800/70 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none backdrop-blur"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : '💾 Update Blog'}
            </button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
