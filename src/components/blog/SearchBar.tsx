'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  CalendarIcon,
  TagIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { BlogPost } from '@/types/blog';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  suggestions?: string[];
  recentSearches?: string[];
  posts: BlogPost[];
  language: string;
}

interface SearchFilters {
  category?: string;
  tags?: string[];
  author?: string;
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  sortBy?: 'date' | 'popularity' | 'relevance';
}

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

const dropdownVariants = {
  hidden: { 
    opacity: 0,
    y: -10,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function SearchBar({ onSearch, suggestions = [], recentSearches = [], posts, language }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Get unique tags and authors from posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const allAuthors = Array.from(new Set(posts.map(post => post.author.name)));

  // Filter suggestions based on input
  const filteredSuggestions = query
    ? [...suggestions, ...recentSearches]
        .filter(s => s.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : recentSearches.slice(0, 3);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch(query, filters);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Search Input */}
        <div className="relative flex items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              placeholder="Search articles, recipes, and stories..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`ml-2 p-3 rounded-lg border transition-colors
              ${isFilterOpen
                ? 'border-primary-500 bg-primary-50 text-primary-600'
                : 'border-gray-300 hover:border-gray-400 text-gray-600'
              }`}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-0 right-12 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: '#F3F4F6' }}
                  onClick={() => {
                    setQuery(suggestion);
                    handleSearch();
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  {index < recentSearches.length ? (
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                  ) : (
                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                  )}
                  <span>{suggestion}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters Dropdown */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-10"
            >
              <div className="p-4 space-y-4">
                {/* Categories */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {posts.reduce((categories, post) => {
                      if (!categories.includes(post.category.name[language])) {
                        categories.push(post.category.name[language]);
                      }
                      return categories;
                    }, [] as string[]).map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters(prev => ({ ...prev, category }))}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                          ${filters.category === category
                            ? 'bg-primary-100 text-primary-700 border-primary-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <motion.button
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          tags: prev.tags?.includes(tag)
                            ? prev.tags.filter(t => t !== tag)
                            : [...(prev.tags || []), tag]
                        }))}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1
                          ${filters.tags?.includes(tag)
                            ? 'bg-primary-100 text-primary-700 border-primary-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        <TagIcon className="w-4 h-4" />
                        <span>{tag}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Authors */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Authors</label>
                  <div className="flex flex-wrap gap-2">
                    {allAuthors.map((author) => (
                      <motion.button
                        key={author}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters(prev => ({ ...prev, author }))}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1
                          ${filters.author === author
                            ? 'bg-primary-100 text-primary-700 border-primary-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>{author}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Sort By */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Sort By</label>
                  <div className="flex flex-wrap gap-2">
                    {['date', 'popularity', 'relevance'].map((sort) => (
                      <motion.button
                        key={sort}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilters(prev => ({ ...prev, sortBy: sort as SearchFilters['sortBy'] }))}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                          ${filters.sortBy === sort
                            ? 'bg-primary-100 text-primary-700 border-primary-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {sort.charAt(0).toUpperCase() + sort.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div variants={itemVariants} className="flex justify-end space-x-2 pt-2 border-t">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFilters({});
                      setIsFilterOpen(false);
                    }}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Clear All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleSearch();
                      setIsFilterOpen(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                  >
                    Apply Filters
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 