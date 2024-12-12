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
  FlagIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';

interface CommentProps {
  comment: BlogComment;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onReport: (commentId: string, reason: string) => void;
}

interface CommentSectionProps {
  comments: BlogComment[];
  onAddComment: (content: string) => void;
  onEditComment: (commentId: string, content: string) => void;
  onDeleteComment: (commentId: string) => void;
  onLikeComment: (commentId: string) => void;
  onReportComment: (commentId: string, reason: string) => void;
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

const Comment: React.FC<{
  comment: BlogComment;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onReport: (commentId: string, reason: string) => void;
}> = ({ comment, onEdit, onDelete, onLike, onReport }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleReport = () => {
    const reason = window.prompt('Please provide a reason for reporting this comment:');
    if (reason) {
      onReport(comment.id, reason);
      setShowActions(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative"
    >
      <div className="flex space-x-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <Image
            src={comment.userAvatar || '/images/default-avatar.png'}
            alt={comment.userName}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {comment.userName}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
                {comment.isEdited && (
                  <span className="text-xs text-gray-500 ml-2">(edited)</span>
                )}
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onEdit(comment.id, editedContent);
                      setIsEditing(false);
                    }}
                    className="px-3 py-1 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-2 flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onLike(comment.id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-primary-500"
            >
              {comment.isLiked ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span>{comment.likes}</span>
            </motion.button>

            {/* Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500" />
              </button>

              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowActions(false);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(comment.id);
                      setShowActions(false);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <TrashIcon className="w-5 h-5" />
                    <span>Delete</span>
                  </button>
                  <button
                    onClick={handleReport}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FlagIcon className="w-5 h-5" />
                    <span>Report</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(newComment);
    setNewComment('');
    setReplyTo(null);
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