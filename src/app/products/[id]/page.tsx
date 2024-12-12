'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { StarIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/contexts/AuthContext';
import { sampleProducts } from '@/data/products';
import { Variants } from 'framer-motion';

const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const { user, addToCart, addToWishlist, removeFromWishlist } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [direction, setDirection] = useState(0);
  const { scrollYProgress } = useScroll();

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const product = sampleProducts.find(p => p.id === params.id);
  const language = 'en';

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-cream-50"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </motion.div>
    );
  }

  const handleImageChange = (newIndex: number) => {
    setDirection(newIndex > selectedImage ? 1 : -1);
    setSelectedImage(newIndex);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity,
    });
    
    // Add success animation
    const button = document.getElementById('add-to-cart-button');
    if (button) {
      button.classList.add('animate-success');
      setTimeout(() => button.classList.remove('animate-success'), 1000);
    }
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={selectedImage}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name[language]}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image selector */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="mt-4 grid grid-cols-4 gap-2"
            >
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleImageChange(index)}
                  className={`relative h-24 rounded-md overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary-500' : 'ring-1 ring-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Product ${index + 1}`}
                    fill
                    className="object-cover object-center"
                  />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Product info */}
          <motion.div
            style={{ y: contentY, opacity }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-3xl font-bold tracking-tight text-gray-900"
            >
              {product.name[language]}
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="mt-3"
            >
              <h2 className="sr-only">Product origin</h2>
              <p className="text-lg text-gray-600">From {product.countryOfOrigin}</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-6"
            >
              <h2 className="sr-only">Product price</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.currency} {product.price.toFixed(2)}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-6"
            >
              <p className="text-base text-gray-700">
                {product.description[language]}
              </p>
            </motion.div>

            {/* Add to cart section */}
            <motion.div
              variants={fadeInUp}
              className="mt-8"
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center border border-gray-300 rounded-lg"
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-600 hover:text-gray-700"
                  >
                    -
                  </motion.button>
                  <span className="px-4 py-2 text-gray-900">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-600 hover:text-gray-700"
                  >
                    +
                  </motion.button>
                </motion.div>
                <motion.button
                  id="add-to-cart-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-600 py-3 px-8 rounded-lg text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                >
                  <span className="flex items-center justify-center">
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    Add to Cart
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleWishlist}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <motion.div
                    animate={isWishlisted ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {isWishlisted ? (
                      <HeartSolidIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="mt-8"
            >
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    variants={fadeInUp}
                    custom={index}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Reviews section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 border-t border-gray-200 pt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="mt-8 space-y-8"
          >
            {product.reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.01 }}
                className="border-b border-gray-200 pb-8"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={`${
                          review.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                        } h-5 w-5 flex-shrink-0`}
                      />
                    ))}
                  </div>
                  <p className="ml-3 text-sm text-gray-600">{review.userName}</p>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <div className="mt-4 flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{review.date}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-primary-600 hover:text-primary-800"
                  >
                    Helpful ({review.helpful})
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 