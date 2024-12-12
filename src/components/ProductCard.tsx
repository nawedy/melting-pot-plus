import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { StarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  language: string;
}

export default function ProductCard({ product, language }: ProductCardProps) {
  const [isWishListed, setIsWishListed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishListed(!isWishListed);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-200">
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name[language as keyof typeof product.name]}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            onClick={nextImage}
          />
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
            onClick={toggleWishlist}
          >
            {isWishListed ? (
              <HeartSolidIcon className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.name[language as keyof typeof product.name]}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {product.description[language as keyof typeof product.description].substring(0, 100)}...
          </p>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.reviews.length} reviews)
            </span>
          </div>

          {/* Price and Origin */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-900">
              {product.currency} {product.price.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">
              {product.countryOfOrigin}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 