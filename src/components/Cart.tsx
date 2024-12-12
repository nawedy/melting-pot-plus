'use client';

import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const cartVariants = {
  hidden: { 
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  visible: { 
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    x: 50,
    opacity: 0
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

export default function Cart() {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, getProduct, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={toggleCart}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {/* Cart panel */}
          <motion.div
            variants={cartVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-4 border-b border-gray-200 flex items-center justify-between"
            >
              <div className="flex items-center">
                <ShoppingBagIcon className="h-6 w-6 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
                <span className="ml-2 text-sm text-gray-600">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </motion.button>
            </motion.div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="text-center py-12"
                  >
                    <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Start adding some items to your cart!
                    </p>
                  </motion.div>
                ) : (
                  <motion.ul
                    variants={cartVariants}
                    className="divide-y divide-gray-200"
                  >
                    {items.map((item) => {
                      const product = getProduct(item.productId);
                      if (!product) return null;

                      return (
                        <motion.li
                          key={item.productId}
                          variants={itemVariants}
                          layout
                          className="py-6 flex"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative h-24 w-24 rounded-md overflow-hidden"
                          >
                            <Image
                              src={product.images[0]}
                              alt={product.name.en}
                              fill
                              className="object-cover object-center"
                            />
                          </motion.div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div className="flex justify-between">
                              <motion.h3
                                whileHover={{ color: '#4F46E5' }}
                                className="text-base font-medium text-gray-900"
                              >
                                {product.name.en}
                              </motion.h3>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeItem(item.productId)}
                                className="text-gray-400 hover:text-gray-500"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </motion.button>
                            </div>

                            <p className="mt-1 text-sm text-gray-500">
                              {product.countryOfOrigin}
                            </p>

                            <div className="flex-1 flex items-end justify-between">
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center border border-gray-300 rounded-lg"
                              >
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                  className="p-2 text-gray-600 hover:text-gray-700"
                                >
                                  -
                                </motion.button>
                                <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="p-2 text-gray-600 hover:text-gray-700"
                                >
                                  +
                                </motion.button>
                              </motion.div>
                              <p className="text-base font-medium text-gray-900">
                                {product.currency} {(product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-gray-200 py-6 px-4"
            >
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>{items[0]?.currency || '$'} {total.toFixed(2)}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary-600 py-3 px-4 rounded-lg text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
              >
                Checkout
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleCart}
                className="mt-3 w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 