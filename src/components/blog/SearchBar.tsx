'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BlogPost } from '@/types/blog';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface SearchBarProps {
  posts: BlogPost[];
  language: keyof typeof import('@/config/languages').languages;
  onSearch?: (results: BlogPost[]) => void;
}

export default function SearchBar({ posts, language, onSearch }: SearchBarProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<BlogPost[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      onSearch?.([]);
      return;
    }

    const searchResults = posts.filter((post) => {
      const titleMatch = post.title[language].toLowerCase().includes(query.toLowerCase());
      const excerptMatch = post.excerpt[language].toLowerCase().includes(query.toLowerCase());
      const contentMatch = post.content[language].toLowerCase().includes(query.toLowerCase());
      const categoryMatch = post.category.name[language].toLowerCase().includes(query.toLowerCase());
      const tagsMatch = post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

      return titleMatch || excerptMatch || contentMatch || categoryMatch || tagsMatch;
    });

    setResults(searchResults);
    onSearch?.(searchResults);
  }, [query, posts, language, onSearch]);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={t('search.placeholder')}
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200"
          >
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {t('search.results', { count: results.length })}
                </h3>
              </div>

              <div className="space-y-4">
                {results.slice(0, 5).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-start space-x-4 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title[language]}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {post.title[language]}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {post.excerpt[language]}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {results.length > 5 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-primary-600 hover:text-primary-800"
                  >
                    {t('search.viewAll', { count: results.length - 5 })}
                  </button>
                </div>
              )}

              <div className="mt-4">
                <h4 className="text-xs font-medium text-gray-500 mb-2">
                  {t('search.categories')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(results.map(post => post.category.name[language]))).map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 