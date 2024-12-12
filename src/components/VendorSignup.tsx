import { motion } from 'framer-motion';
import { ShoppingBagIcon, GlobeAltIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: ShoppingBagIcon,
    title: 'Reach Global Customers',
    description: 'Connect with customers from around the world interested in authentic cultural products.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Cultural Exchange',
    description: 'Share your culture and traditions through your products and stories.',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Grow Your Business',
    description: 'Access tools and support to expand your business internationally.',
  },
];

export default function VendorSignup() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4"
          >
            Start Selling on Melting Pot Plus
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Join our community of artisans and cultural entrepreneurs
          </motion.p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <benefit.icon className="w-12 h-12 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8"
        >
          <form className="space-y-6">
            <div>
              <label htmlFor="business-name" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                id="business-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="country"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option>Select your country</option>
                <option value="ET">Ethiopia</option>
                <option value="MA">Morocco</option>
                <option value="EG">Egypt</option>
                {/* Add more countries */}
              </select>
            </div>
            <div>
              <label htmlFor="product-category" className="block text-sm font-medium text-gray-700">
                Main Product Category
              </label>
              <select
                id="product-category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option>Select a category</option>
                <option value="home-living">Home & Living</option>
                <option value="kitchen-dining">Kitchen & Dining</option>
                <option value="textiles-fabrics">Textiles & Fabrics</option>
                <option value="art-crafts">Art & Crafts</option>
                <option value="jewelry-accessories">Jewelry & Accessories</option>
                <option value="food-beverages">Food & Beverages</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Start Selling
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 