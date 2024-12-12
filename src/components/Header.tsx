'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ShoppingCartIcon, UserIcon, GlobeAltIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { languages } from '@/config/languages';

const navVariants = {
  hidden: { y: -100 },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1
    }
  }
};

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "afterChildren"
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const menuItemVariants = {
  closed: {
    x: -20,
    opacity: 0
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const menuBackdropVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  }
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { user } = useAuth();
  const { toggleCart, items } = useCart();
  const { scrollY } = useScroll();

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll
  useEffect(() => {
    return scrollY.onChange(latest => {
      setIsScrolled(latest > 0);
    });
  }, [scrollY]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
      if (!target.closest('.language-menu') && !target.closest('.language-button')) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Melting Pot Plus"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Melting Pot Plus
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative language-menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="language-button p-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <GlobeAltIcon className="w-6 h-6" />
                </motion.button>

                <AnimatePresence>
                  {isLanguageMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    >
                      <div className="py-1">
                        {languages.map((lang) => (
                          <motion.button
                            key={lang.code}
                            whileHover={{ backgroundColor: '#F3F4F6' }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700"
                          >
                            {lang.name}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={user ? '/profile' : '/login'}
                  className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <UserIcon className="w-6 h-6" />
                </Link>
              </motion.div>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCart}
                className="p-2 text-gray-700 hover:text-primary-600 transition-colors relative"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="mobile-menu-button md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <motion.div
                  animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <XMarkIcon className="w-6 h-6" />
                  ) : (
                    <Bars3Icon className="w-6 h-6" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                variants={menuBackdropVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Menu */}
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="absolute top-16 inset-x-0 bg-white shadow-lg md:hidden mobile-menu z-50"
              >
                <div className="px-4 py-6 space-y-4">
                  {navItems.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={menuItemVariants}
                      className="block"
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
} 