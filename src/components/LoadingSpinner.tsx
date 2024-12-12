'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullScreen?: boolean;
  type?: 'spinner' | 'dots' | 'pulse';
}

const sizes = {
  sm: 'w-8 h-8 border-2',
  md: 'w-12 h-12 border-3',
  lg: 'w-16 h-16 border-4'
};

const dotSizes = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4'
};

const spinTransition = {
  repeat: Infinity,
  ease: "linear",
  duration: 1
};

const pulseTransition = {
  scale: [1, 1.2, 1],
  opacity: [0.5, 1, 0.5],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const dotsVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const dotVariants = {
  animate: {
    y: ["50%", "-50%"],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  text,
  fullScreen = false,
  type = 'spinner'
}: LoadingSpinnerProps) {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center'
    : 'flex flex-col items-center justify-center';

  const spinnerColorClasses = {
    primary: 'border-primary-600 border-t-transparent',
    secondary: 'border-secondary-600 border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  const dotColorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    white: 'bg-white'
  };

  const renderLoadingIndicator = () => {
    switch (type) {
      case 'dots':
        return (
          <motion.div
            variants={dotsVariants}
            animate="animate"
            className="flex space-x-2"
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                variants={dotVariants}
                className={`${dotSizes[size]} rounded-full ${dotColorClasses[color]}`}
              />
            ))}
          </motion.div>
        );
      case 'pulse':
        return (
          <motion.div
            animate={pulseTransition}
            className={`${sizes[size]} rounded-full ${dotColorClasses[color]}`}
          />
        );
      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={spinTransition}
            className={`${sizes[size]} rounded-full ${spinnerColorClasses[color]}`}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={containerClasses}
    >
      <div className="flex flex-col items-center">
        {renderLoadingIndicator()}
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-600"
          >
            {text}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
} 