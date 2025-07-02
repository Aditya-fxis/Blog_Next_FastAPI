import React from 'react'

const Footer = () => {
  return (
    <>
    {/* Footer */}
      <footer className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Built  by Aditya Patel using Next.js & FastAPI.
      </footer>
    </>
  )
}

export default Footer