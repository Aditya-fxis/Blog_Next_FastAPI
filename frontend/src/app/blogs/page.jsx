'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { deleteBlog, getAllBlogs } from '../lib/api';
import { FileText, CalendarDays, Trash2, Pencil } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      await deleteBlog(id);
      // await axios.delete(`http://localhost:8000/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert('Failed to delete blog');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0f2fe] via-white to-[#fdf2f8] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#111827] relative">
      {/* Background */}
      <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] bg-purple-300 dark:bg-purple-800 opacity-20 rounded-full blur-3xl -z-10" />

      <Header />

      <main className="flex-grow px-6 py-12 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📰 Latest Blogs
        </motion.h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">No blogs found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="relative group rounded-2xl p-6 bg-white/10 dark:bg-zinc-900/30 backdrop-blur-xl border border-white/20 dark:border-zinc-700/40 shadow-lg hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Clickable area */}
                <div
                  onClick={() => router.push(`/blogs/${blog.id}`)}
                  className="cursor-pointer"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 mb-3">
                    {blog.content}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/edit/${blog.id}`);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(blog.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
