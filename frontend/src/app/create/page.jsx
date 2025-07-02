// app/create/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, FileText, MessageSquareText, Pencil } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { createBlog } from '../lib/api';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await createBlog({ title, content });
      setSuccess('✅ Blog created successfully!');
      setTimeout(() => router.push('/blogs'), 1800);
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col relative overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-white to-[#fdf2f8] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#111827]">
      {/* Background Blobs */}
      <Header />
      <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] bg-purple-300 dark:bg-purple-800 opacity-20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-300 dark:bg-blue-800 opacity-20 rounded-full blur-2xl -z-10" />


      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <motion.div
          className="w-full max-w-3xl backdrop-blur-xl bg-white/10 dark:bg-zinc-900/20 border border-white/20 dark:border-zinc-700/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] rounded-3xl p-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
              <Pencil className="w-8 h-8 text-blue-900" />
              New Blog Post
            </h1>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              Share your thoughts, stories, or knowledge with the world.
            </p>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-300 flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your blog title"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800/70 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none backdrop-blur"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-300 flex items-center gap-1">
                <MessageSquareText className="w-4 h-4" />
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post here..."
                className="w-full px-4 py-3 h-48 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800/70 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none backdrop-blur"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : '🚀 Publish Blog'}
            </button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
