import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

interface Vendor {
  id: string;
  name: string;
  description: {
    en: string;
    es: string;
    fr: string;
    ar: string;
    am: string;
  };
  image: string;
  logo: string;
  rating: number;
  totalSales: number;
  verified: boolean;
  country: string;
  specialties: string[];
}

interface VendorCardProps {
  vendor: Vendor;
  language: string;
}

export default function VendorCard({ vendor, language }: VendorCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full">
        <Image
          src={vendor.image}
          alt={vendor.name}
          fill
          className="object-cover"
        />
        {/* Logo */}
        <div className="absolute -bottom-10 left-4">
          <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden">
            <Image
              src={vendor.logo}
              alt={`${vendor.name} logo`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-12">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">
            {vendor.name}
            {vendor.verified && (
              <CheckBadgeIcon className="inline-block w-5 h-5 ml-1 text-blue-500" />
            )}
          </h3>
          <span className="text-sm text-gray-500">{vendor.country}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4">
          {vendor.description[language as keyof typeof vendor.description]}
        </p>

        {/* Rating and Sales */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 text-gray-700">{vendor.rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-gray-500">
            {vendor.totalSales.toLocaleString()} sales
          </span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2">
          {vendor.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* View Store Button */}
        <Link href={`/vendors/${vendor.id}`}>
          <button className="mt-4 w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200">
            View Store
          </button>
        </Link>
      </div>
    </motion.div>
  );
} 