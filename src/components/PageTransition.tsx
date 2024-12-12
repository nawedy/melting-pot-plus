'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = {
  hidden: {
    opacity: 0,
    x: -200,
    y: 0
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    x: 200,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn"
    }
  }
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
      >
        <motion.div variants={contentVariants}>
          {children}
        </motion.div>

        {/* Page transition overlay */}
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          style={{ originX: isRTL() ? 1 : 0 }}
        >
          <motion.div
            className="w-full h-full bg-primary-600"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "circOut", delay: 0.1 }}
            style={{ originX: isRTL() ? 1 : 0 }}
          />
        </motion.div>

        {/* Loading progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary-600 origin-left z-50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

// Helper function to check if the current layout direction is RTL
function isRTL() {
  return document.documentElement.dir === 'rtl';
} 