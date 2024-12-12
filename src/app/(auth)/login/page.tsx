'use client';

import { motion } from 'framer-motion';
import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Image
            src="/images/MELLTING POT Plus Logo Design Dec 2024.png"
            alt="Melting Pot Plus"
            width={180}
            height={60}
            className="h-16 w-auto"
            priority
          />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute -left-10 top-1/4 w-40 h-40 bg-primary-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute -right-10 bottom-1/4 w-40 h-40 bg-secondary-500 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative sm:mx-auto sm:w-full sm:max-w-md z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LoginForm />
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-cream-50 to-cream-100 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              <span className="ml-2">Google</span>
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
              <span className="ml-2">Facebook</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 