'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { BlogPost } from '@/types/blog';
import { sampleBlogPosts } from '@/data/blog';
import LoadingSpinner from '@/components/LoadingSpinner';

interface BlogGridProps {
  posts?: BlogPost[];
  loading?: boolean;
  error?: string;
  category?: string;
  tag?: string;
  searchQuery?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export default function BlogGrid({
  posts: propPosts,
  loading = false,
  error,
  category,
  tag,
  searchQuery,
  onLoadMore,
  hasMore = false,
}: BlogGridProps) {
  const t = useTranslations('Blog');
  const [posts, setPosts] = useState<BlogPost[]>(propPosts || []);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (propPosts) {
      setPosts(propPosts);
    } else {
      // If no posts provided, use sample data
      setPosts(sampleBlogPosts);
    }
  }, [propPosts]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const filteredPosts = posts.filter(post => {
    if (category && post.category.slug !== category) return false;
    if (tag && !post.tags.includes(tag)) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.en.toLowerCase().includes(query) ||
        post.excerpt.en.toLowerCase().includes(query) ||
        post.content.en.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner size="lg" text={t('loading')} />;
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">{t('noPosts')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <a href={`/blog/${post.id}`} className="block">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title.en}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                {post.category && (
                  <span className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category.name.en}
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime} {t('minRead')}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {post.title.en}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt.en}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      <p className="text-gray-900 dark:text-white font-medium">
                        {post.author.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {post.author.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      {post.comments.length}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      {post.shares}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
      
      {hasMore && (
        <div className="text-center">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" color="white" />
                <span className="ml-2">{t('loading')}</span>
              </>
            ) : (
              t('loadMore')
            )}
          </button>
        </div>
      )}
    </div>
  );
} 