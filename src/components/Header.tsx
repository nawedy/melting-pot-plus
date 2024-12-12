'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import {
  ShoppingCartIcon,
  UserIcon,
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { languages } from '@/config/languages';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toggleCart, items } = useCart();
  const { user, logout } = useAuth();

  const handleLanguageChange = (langCode: string) => {
    // Get the current path segments
    const segments = pathname.split('/');
    
    // Replace the language code (first segment after empty string)
    if (segments[1] && Object.keys(languages).includes(segments[1])) {
      segments[1] = langCode;
    } else {
      segments.splice(1, 0, langCode);
    }

    // Reconstruct the path
    const newPath = segments.join('/');
    
    // Update the cookie
    document.cookie = `NEXT_LOCALE=${langCode};path=/;max-age=31536000`;
    
    // Navigate to the new path
    router.push(newPath);
  };

  const navigation = [
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className="fixed w-full bg-white shadow-sm z-40">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold text-primary-600"
              >
                Melting Pot Plus
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  pathname.startsWith(item.href)
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600',
                  'text-sm font-medium transition-colors duration-200'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Language Selector */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-gray-700 hover:text-primary-600">
                <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {Object.values(languages).map((lang) => (
                      <motion.button
                        key={lang.code}
                        whileHover={{ backgroundColor: '#F3F4F6' }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleLanguageChange(lang.code)}
                      >
                        <span className="flex items-center">
                          <span className={`fi fi-${lang.flag} mr-2`} />
                          {lang.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative text-gray-700 hover:text-primary-600"
            >
              <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-600 text-xs text-white flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>

            {/* User Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-gray-700 hover:text-primary-600">
                <UserIcon className="h-6 w-6" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {user ? (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => logout()}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    ) : (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/login"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign in
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/register"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Create account
                            </Link>
                          )}
                        </Menu.Item>
                      </>
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition
          show={isMenuOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    pathname.startsWith(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Transition>
      </nav>
    </header>
  );
} 