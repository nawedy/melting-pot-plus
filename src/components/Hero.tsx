'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const countries = [
  {
    name: 'Ethiopia',
    flag: '/images/flags/ethiopia.png',
    culturalImage: '/images/cultural/ethiopia.jpg',
    description: 'Traditional Ethiopian coffee ceremony'
  },
  {
    name: 'Morocco',
    flag: '/images/flags/morocco.png',
    culturalImage: '/images/cultural/morocco.jpg',
    description: 'Vibrant Moroccan marketplace'
  },
  {
    name: 'Egypt',
    flag: '/images/flags/egypt.png',
    culturalImage: '/images/cultural/egypt.jpg',
    description: 'Ancient Egyptian artifacts'
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollY } = useScroll();

  // Parallax effects
  const flagY = useTransform(scrollY, [0, 500], [0, 150]);
  const imageY = useTransform(scrollY, [0, 500], [0, 200]);
  const textY = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % countries.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-cream-50">
      <div className="absolute inset-0 parallax">
        {/* Left side - Flags */}
        <motion.div
          style={{ y: flagY }}
          className="absolute inset-y-0 left-0 w-[55%] diagonal-split bg-primary-50"
        >
          <div className="relative h-full flex items-center justify-center">
            <motion.div
              key={currentIndex + 'flag'}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="relative h-2/3 w-2/3"
            >
              <Image
                src={countries[currentIndex].flag}
                alt={`${countries[currentIndex].name} flag`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
          {/* Gradient overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream-50/50 to-cream-50 transform -rotate-15" />
        </motion.div>

        {/* Right side - Cultural Images */}
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-y-0 right-0 w-[55%] diagonal-split-reverse overflow-hidden"
        >
          <motion.div
            key={currentIndex + 'image'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full"
          >
            <Image
              src={countries[currentIndex].culturalImage}
              alt={countries[currentIndex].description}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cream-50/50 to-cream-50 transform -rotate-15" />
          </motion.div>
        </motion.div>

        {/* Overlay Text */}
        <motion.div
          style={{ y: textY, opacity }}
          className="absolute inset-0 flex items-center justify-center text-center z-10"
        >
          <div className="max-w-3xl px-4 bg-cream-50/80 backdrop-blur-sm rounded-2xl p-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 mb-6"
            >
              Discover Global Treasures
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-primary-800"
            >
              Explore authentic products from around the world, carefully curated for your home
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {countries.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-primary-600' : 'bg-primary-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 