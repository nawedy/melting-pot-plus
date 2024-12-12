import React from 'react';
import { useTranslation } from 'react-i18next';
import { BlogPost } from '@/types/blog';

interface CategoryListProps {
  posts: BlogPost[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

/**
 * CategoryList component displays all blog categories with post counts
 * and allows filtering posts by category
 */
const CategoryList: React.FC<CategoryListProps> = ({
  posts,
  selectedCategory,
  onCategorySelect,
}) => {
  const { t } = useTranslation();

  // Get unique categories and their post counts
  const getCategoryStats = () => {
    const stats = new Map<string, number>();
    
    posts.forEach((post) => {
      const category = post.category.name.en;
      stats.set(category, (stats.get(category) || 0) + 1);
    });

    return Array.from(stats.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({ category, count }));
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 dark:text-white">
        {t('blog.categories')}
      </h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            selectedCategory === null
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {t('blog.allPosts')} ({posts.length})
        </button>
        {categoryStats.map(({ category, count }) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === category
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {category} ({count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList; 