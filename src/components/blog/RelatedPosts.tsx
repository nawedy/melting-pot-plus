import React from 'react';
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';
import { useTranslation } from 'react-i18next';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  maxPosts?: number;
}

/**
 * RelatedPosts component displays similar blog posts based on shared categories and tags
 * @param currentPost - The current blog post being viewed
 * @param allPosts - All available blog posts
 * @param maxPosts - Maximum number of related posts to display (default: 3)
 */
const RelatedPosts: React.FC<RelatedPostsProps> = ({
  currentPost,
  allPosts,
  maxPosts = 3,
}) => {
  const { t } = useTranslation();

  // Calculate relevance score for each post
  const getRelatedPosts = () => {
    return allPosts
      .filter((post) => post.id !== currentPost.id)
      .map((post) => {
        let score = 0;
        
        // Check matching categories
        const sharedCategories = post.categories?.filter((category) =>
          currentPost.categories?.includes(category)
        );
        score += (sharedCategories?.length || 0) * 2;

        // Check matching tags
        const sharedTags = post.tags?.filter((tag) =>
          currentPost.tags?.includes(tag)
        );
        score += sharedTags?.length || 0;

        return { post, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, maxPosts)
      .map(({ post }) => post);
  };

  const relatedPosts = getRelatedPosts();

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        {t('blog.relatedPosts')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts; 