import { motion } from 'framer-motion';
import VendorCard from './VendorCard';

interface VendorGridProps {
  vendors: any[];
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

export default function VendorGrid({ vendors, language }: VendorGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {vendors.map((vendor) => (
        <VendorCard
          key={vendor.id}
          vendor={vendor}
          language={language}
        />
      ))}
    </motion.div>
  );
} 