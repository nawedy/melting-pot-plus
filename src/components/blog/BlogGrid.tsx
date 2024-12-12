'use client';

import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
  language: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function BlogGrid({ posts, language }: BlogGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item}>
          <BlogCard post={post} language={language} />
        </motion.div>
      ))}
    </motion.div>
  );
} 