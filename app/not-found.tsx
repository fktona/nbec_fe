"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-blue-800">
            New Breed Educational Centre
          </h2>
        </motion.div>

        {/* 404 Text */}
        <motion.div
          className="text-9xl font-bold text-blue-600 mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-2xl text-gray-600 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Oops! Looks like this page is on a field trip.
        </motion.p>

        {/* Animated school items */}
        <div className="relative h-60 mb-8">
          {[
            { icon: "📚", delay: 0.6 },
            { icon: "🖍️", delay: 0.8 },
            { icon: "🔬", delay: 1 },
            { icon: "🎨", delay: 1.2 },
            { icon: "🏀", delay: 1.4 },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="absolute text-4xl"
              style={{
                left: `${index * 20}%`,
                top: `${Math.sin(index) * 20 + 50}%`,
              }}
              initial={{ y: -100, opacity: 0, rotate: -180 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{
                duration: 0.5,
                delay: item.delay,
                type: "spring",
                stiffness: 100,
              }}
            >
              {item.icon}
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
