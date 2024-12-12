'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BlogComment } from '@/types/blog';
import { useAuth } from '@/contexts/AuthContext';
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
  FlagIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';

interface CommentSectionProps {
  comments: BlogComment[];
  onAddComment: (comment: Partial<BlogComment>, parentId?: string) => Promise<void>;
  onEditComment: (commentId: string, newContent: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  onLikeComment: (commentId: string) => Promise<void>;
  onReportComment: (commentId: string, reason: string) => Promise<void>;
}

const commentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

const replyVariants = {
  hidden: { opacity: 0, height: 0, marginBottom: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    marginBottom: "1rem",
    transition: {
      height: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: {
      height: {
        duration: 0.2
      }
    }
  }
};

function Comment({
  comment,
  onReply,
  onEdit,
  onDelete,
  onLike,
  onReport,
  depth = 0
}: {
  comment: BlogComment;
  onReply: (parentId: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onReport: (commentId: string) => void;
  depth?: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { user } = useAuth();

  const handleEdit = () => {
    onEdit(comment.id, editContent);
    setIsEditing(false);
  };

  return (
    <motion.div
      variants={commentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`relative ${depth > 0 ? 'ml-8' : ''}`}
    >
      {depth > 0 && (
        <div className="absolute -left-6 top-8 h-full w-px bg-gray-200" />
      )}

      <div className="flex space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={comment.userAvatar || '/images/default-avatar.png'}
              alt={comment.userName}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{comment.userName}</span>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
                {comment.isEdited && (
                  <span className="text-xs text-gray-500">(edited)</span>
                )}
              </div>

              {/* Actions Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowActions(!showActions)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                </motion.button>

                <AnimatePresence>
                  {showActions && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                    >
                      {user?.id === comment.userId ? (
                        <>
                          <button
                            onClick={() => {
                              setIsEditing(true);
                              setShowActions(false);
                            }}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              onDelete(comment.id);
                              setShowActions(false);
                            }}
                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2"
                          >
                            <TrashIcon className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            onReport(comment.id);
                            setShowActions(false);
                          }}
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <FlagIcon className="w-4 h-4" />
                          <span>Report</span>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Comment Content */}
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEdit}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Save
                  </motion.button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">{comment.content}</p>
            )}

            {/* Actions */}
            <div className="mt-4 flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onLike(comment.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
              >
                {comment.likes > 0 ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>{comment.likes}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onReply(comment.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-primary-500"
              >
                <ChatBubbleLeftIcon className="w-5 h-5" />
                <span>Reply</span>
              </motion.button>
            </div>
          </div>

          {/* Nested Replies */}
          {comment.replies?.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onLike={onLike}
              onReport={onReport}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CommentSection({
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onReportComment
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await onAddComment({
        content: newComment,
        userId: user?.id || 'anonymous',
        userName: user?.name || 'Anonymous User',
        userAvatar: user?.avatar,
        createdAt: new Date().toISOString(),
        likes: 0
      }, replyTo || undefined);

      setNewComment('');
      setReplyTo(null);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {replyTo && (
          <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">
              Replying to a comment
            </span>
            <button
              onClick={() => setReplyTo(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={user?.avatar || '/images/default-avatar.png'}
                alt={user?.name || 'Anonymous'}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!newComment.trim()}
                className={`px-6 py-2 rounded-lg font-medium
                  ${newComment.trim()
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                Comment
              </motion.button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <AnimatePresence>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={setReplyTo}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
            onLike={onLikeComment}
            onReport={onReportComment}
          />
        ))}
      </AnimatePresence>
    </div>
  );
} 