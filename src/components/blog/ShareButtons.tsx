'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShareOptions } from '@/types/blog';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  PinterestShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  LinkedinIcon,
  TelegramIcon,
  PinterestIcon,
  RedditIcon,
} from 'react-share';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  showCount?: boolean;
  onShare?: (platform: string) => void;
  className?: string;
  size?: number;
  round?: boolean;
  showCopyLink?: boolean;
  showQR?: boolean;
  showStats?: boolean;
  stats?: {
    [key: string]: number;
  };
}

const buttonVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
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

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const tooltipVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const statsVariants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: {
        type: "spring",
        stiffness: 300,
        damping: 30
      },
      opacity: {
        duration: 0.2
      }
    }
  }
};

export default function ShareButtons({
  url,
  title,
  description,
  image,
  showCount = false,
  onShare,
  className = '',
  size = 32,
  round = true,
  showCopyLink = true,
  showQR = false,
  showStats = false,
  stats = {}
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showAllStats, setShowAllStats] = useState(false);

  const handleShare = (platform: string) => {
    if (onShare) {
      onShare(platform);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const buttons = [
    {
      Component: FacebookShareButton,
      Icon: FacebookIcon,
      platform: 'facebook',
      label: 'Share on Facebook',
      color: '#1877f2'
    },
    {
      Component: TwitterShareButton,
      Icon: TwitterIcon,
      platform: 'twitter',
      label: 'Share on Twitter',
      color: '#1da1f2'
    },
    {
      Component: WhatsappShareButton,
      Icon: WhatsappIcon,
      platform: 'whatsapp',
      label: 'Share on WhatsApp',
      color: '#25d366'
    },
    {
      Component: LinkedinShareButton,
      Icon: LinkedinIcon,
      platform: 'linkedin',
      label: 'Share on LinkedIn',
      color: '#0a66c2'
    },
    {
      Component: TelegramShareButton,
      Icon: TelegramIcon,
      platform: 'telegram',
      label: 'Share on Telegram',
      color: '#0088cc'
    },
    {
      Component: PinterestShareButton,
      Icon: PinterestIcon,
      platform: 'pinterest',
      label: 'Share on Pinterest',
      color: '#e60023'
    },
    {
      Component: RedditShareButton,
      Icon: RedditIcon,
      platform: 'reddit',
      label: 'Share on Reddit',
      color: '#ff4500'
    },
    {
      Component: EmailShareButton,
      Icon: EmailIcon,
      platform: 'email',
      label: 'Share via Email',
      color: '#737373'
    }
  ];

  const totalShares = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className={`flex flex-wrap gap-2 ${className}`}
      >
        {buttons.map(({ Component, Icon, platform, label, color }) => (
          <motion.div
            key={platform}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="relative group"
            onMouseEnter={() => setShowTooltip(platform)}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <Component
              url={url}
              title={title}
              description={description}
              media={image}
              onClick={() => handleShare(platform)}
              className="focus:outline-none"
            >
              <Icon size={size} round={round} />
              {showCount && stats[platform] > 0 && (
                <span className="absolute -top-2 -right-2 bg-white rounded-full px-1 text-xs font-medium shadow-sm">
                  {stats[platform]}
                </span>
              )}
            </Component>

            <AnimatePresence>
              {showTooltip === platform && (
                <motion.div
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap pointer-events-none"
                >
                  {label}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {showCopyLink && (
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={copyToClipboard}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {copied ? (
              <CheckIcon className="w-5 h-5 text-green-500" />
            ) : (
              <ClipboardIcon className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>
        )}
      </motion.div>

      {showStats && (
        <motion.div
          variants={statsVariants}
          initial="initial"
          animate="animate"
          className="bg-gray-50 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Total Shares: {totalShares}
            </span>
            <button
              onClick={() => setShowAllStats(!showAllStats)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {showAllStats ? 'Show Less' : 'Show More'}
            </button>
          </div>

          <AnimatePresence>
            {showAllStats && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 overflow-hidden"
              >
                {buttons.map(({ platform, label, color }) => (
                  stats[platform] > 0 && (
                    <div key={platform} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className="text-sm font-medium" style={{ color }}>
                        {stats[platform]}
                      </span>
                    </div>
                  )
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
} 