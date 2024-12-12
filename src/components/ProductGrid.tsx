'use client';

import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import { useRef, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const gridVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: -15
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      delay: i * 0.1,
      duration: 0.8
    }
  }),
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200
    }
  }
};

interface ProductGridProps {
  products: Product[];
  language: string;
  isLoading?: boolean;
}

export default function ProductGrid({ products, language, isLoading = false }: ProductGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const scaleProgress = useSpring(useTransform(scrollYProgress, [0, 1], [0.8, 1]), springConfig);
  const opacityProgress = useSpring(useTransform(scrollYProgress, [0, 0.3], [0.3, 1]), springConfig);

  const [loadingType, setLoadingType] = useState<'spinner' | 'dots' | 'pulse'>('dots');

  // Cycle through loading animations
  useState(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingType(prev => {
          if (prev === 'spinner') return 'dots';
          if (prev === 'dots') return 'pulse';
          return 'spinner';
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner
          type={loadingType}
          size="lg"
          color="primary"
          text="Loading amazing products..."
        />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[400px] flex flex-col items-center justify-center text-center p-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-6xl mb-4"
        >
          🔍
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full"
    >
      <motion.div
        variants={gridVariants}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            custom={index}
            variants={cardVariants}
            whileHover="hover"
            className="transform-gpu perspective-1000"
          >
            <motion.div
              whileHover={{ 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ProductCard product={product} language={language} />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-medium"
        style={{
          scale: useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]),
          opacity: useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0])
        }}
      >
        <motion.div
          style={{
            rotate: useTransform(scrollYProgress, [0, 1], [0, 360])
          }}
        >
          ↑
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 