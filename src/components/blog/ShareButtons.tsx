'use client';

import React, { useState } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
} from 'react-share';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  onShare?: (platform: string) => void;
  language?: string;
}

export default function ShareButtons({ 
  url, 
  title, 
  description, 
  image = '', 
  onShare,
  language = 'en'
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleShare = (platform: string) => {
    onShare?.(platform);
    // Track share event
    try {
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'share', {
          method: platform,
          content_type: 'blog_post',
          item_id: url,
        });
      }
    } catch (error) {
      console.error('Error tracking share event:', error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      handleShare('copy');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const shareButtons = [
    {
      Button: FacebookShareButton,
      Icon: FacebookIcon,
      name: 'Facebook',
      ariaLabel: 'Share on Facebook',
    },
    {
      Button: TwitterShareButton,
      Icon: TwitterIcon,
      name: 'Twitter',
      ariaLabel: 'Share on Twitter',
    },
    {
      Button: WhatsappShareButton,
      Icon: WhatsappIcon,
      name: 'WhatsApp',
      ariaLabel: 'Share on WhatsApp',
    },
    {
      Button: TelegramShareButton,
      Icon: TelegramIcon,
      name: 'Telegram',
      ariaLabel: 'Share on Telegram',
    },
    {
      Button: LinkedinShareButton,
      Icon: LinkedinIcon,
      name: 'LinkedIn',
      ariaLabel: 'Share on LinkedIn',
    },
    {
      Button: PinterestShareButton,
      Icon: PinterestIcon,
      name: 'Pinterest',
      ariaLabel: 'Share on Pinterest',
    },
    {
      Button: RedditShareButton,
      Icon: RedditIcon,
      name: 'Reddit',
      ariaLabel: 'Share on Reddit',
    },
  ];

  return (
    <div className="space-y-4" role="group" aria-label="Share buttons">
      <div className="flex flex-wrap gap-2">
        {shareButtons.map(({ Button, Icon, name, ariaLabel }) => (
          <div
            key={name}
            className="relative"
            onMouseEnter={() => setShowTooltip(name)}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <Button
              url={url}
              title={title}
              description={description}
              media={image}
              onClick={() => handleShare(name.toLowerCase())}
              className="focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
              aria-label={ariaLabel}
            >
              <Icon size={32} round className="hover:opacity-80 transition-opacity" />
            </Button>
            <AnimatePresence>
              {showTooltip === name && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap z-10"
                  role="tooltip"
                >
                  {name}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <button
          onClick={handleCopy}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 relative"
          onMouseEnter={() => setShowTooltip('Copy')}
          onMouseLeave={() => setShowTooltip(null)}
          aria-label="Copy link to clipboard"
        >
          {copied ? (
            <CheckIcon className="w-5 h-5 text-green-600" aria-hidden="true" />
          ) : (
            <ClipboardIcon className="w-5 h-5 text-gray-600" aria-hidden="true" />
          )}
          <AnimatePresence>
            {showTooltip === 'Copy' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap z-10"
                role="tooltip"
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      <div aria-live="polite" className="sr-only">
        {copied && 'Link copied to clipboard'}
      </div>
    </div>
  );
} 