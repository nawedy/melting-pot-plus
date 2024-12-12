'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import BlogGrid from '@/components/blog/BlogGrid';
import SubmissionForm from '@/components/blog/SubmissionForm';
import { BlogCategory, UserSubmission } from '@/types/blog';
import { sampleBlogPosts } from '@/data/blog';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const categories: BlogCategory[] = [
  {
    id: 'all',
    name: {
      en: 'All Posts',
      es: 'Todas las Publicaciones',
      fr: 'Tous les Articles',
      ar: 'جميع المقالات',
      am: 'ሁሉም ፅሁፎች',
    },
    description: {
      en: 'View all blog posts',
      es: 'Ver todas las publicaciones del blog',
      fr: 'Voir tous les articles du blog',
      ar: 'عرض جميع مقالات المدونة',
      am: 'ሁሉንም የብሎግ ፅሁፎች ይመልከቱ',
    },
    slug: 'all',
    postCount: sampleBlogPosts.length
  },
  {
    id: 'traditions',
    name: {
      en: 'Traditions',
      es: 'Tradiciones',
      fr: 'Traditions',
      ar: 'التقاليد',
      am: 'ባህሎች',
    },
    description: {
      en: 'Cultural traditions and ceremonies',
      es: 'Tradiciones culturales y ceremonias',
      fr: 'Traditions culturelles et cérémonies',
      ar: 'التقاليد الثقافية والمراسم',
      am: 'የባህል ወግና ስርዓቶች',
    },
    slug: 'traditions',
    postCount: sampleBlogPosts.filter(post => post.category.id === 'traditions').length
  },
  {
    id: 'cooking',
    name: {
      en: 'Cooking',
      es: 'Cocina',
      fr: 'Cuisine',
      ar: 'الطبخ',
      am: 'ምግብ ማብሰል',
    },
    description: {
      en: 'Recipes and cooking techniques',
      es: 'Recetas y técnicas de cocina',
      fr: 'Recettes et techniques de cuisine',
      ar: 'وصفات وتقنيات الطبخ',
      am: 'የምግብ ማብሰያ ዘዴዎች',
    },
    slug: 'cooking',
    postCount: sampleBlogPosts.filter(post => post.category.id === 'cooking').length
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const filterVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0
  }
};

const fabVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.9 }
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false);
  const language = 'en'; // This would come from your language context/settings

  const filteredPosts = selectedCategory === 'all'
    ? sampleBlogPosts
    : sampleBlogPosts.filter(post => post.category.id === selectedCategory);

  const handleCategoryChange = (categoryId: string) => {
    setIsLoading(true);
    setSelectedCategory(categoryId);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleSubmission = async (submission: Partial<UserSubmission>) => {
    // In a real app, this would send the submission to your backend
    console.log('Submission received:', submission);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Blog
            </motion.h1>
            <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover stories, thinking, and expertise from writers on all things cultural and culinary.
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={filterVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {category.name[language]}
                <span className="ml-2 text-xs">
                  ({category.postCount})
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Blog Grid */}
          <BlogGrid
            posts={filteredPosts}
            language={language}
            isLoading={isLoading}
            showFeatured={selectedCategory === 'all'}
          />
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        variants={fabVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsSubmissionFormOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <PencilSquareIcon className="w-6 h-6" />
      </motion.button>

      {/* Submission Form */}
      <SubmissionForm
        isOpen={isSubmissionFormOpen}
        onClose={() => setIsSubmissionFormOpen(false)}
        onSubmit={handleSubmission}
      />
    </>
  );
} 