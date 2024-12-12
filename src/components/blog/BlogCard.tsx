'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { formatDistanceToNow } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
  language: string;
}

export default function BlogCard({ post, language }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Link href={`/blog/${post.id}`}>
        <div className="relative h-48">
          <Image
            src={post.image}
            alt={post.title[language as keyof typeof post.title]}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {post.title[language as keyof typeof post.title]}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {post.excerpt[language as keyof typeof post.excerpt]}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {post.likes}
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                {post.comments.length}
              </span>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {post.category.name[language as keyof typeof post.category.name]}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 