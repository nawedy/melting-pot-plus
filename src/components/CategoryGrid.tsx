import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCategory } from '@/types/product';

interface CategoryGridProps {
  categories: ProductCategory[];
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

export default function CategoryGrid({ categories, language }: CategoryGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {categories.map((category) => (
        <motion.div
          key={category.id}
          variants={item}
          className="group relative overflow-hidden rounded-lg shadow-lg"
        >
          <Link href={`/categories/${category.slug}`}>
            <div className="relative h-64">
              <Image
                src={category.image}
                alt={category.name[language as keyof typeof category.name]}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {category.name[language as keyof typeof category.name]}
                </h3>
                <p className="text-sm text-white/80">
                  {category.description[language as keyof typeof category.description]}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
} 