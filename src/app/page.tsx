'use client';

import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import CategoryGrid from '@/components/CategoryGrid'
import CountryGrid from '@/components/CountryGrid'
import VendorGrid from '@/components/VendorGrid'
import VendorSignup from '@/components/VendorSignup'
import { sampleProducts } from '@/data/products'
import { categories } from '@/data/categories'
import { featuredVendors } from '@/data/vendors'

export default function Home() {
  // For now, we'll use 'en' as the default language
  // Later, we'll implement proper language detection and switching
  const language = 'en';

  return (
    <div>
      <Hero />
      
      {/* Featured Vendors Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Vendors
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Meet our trusted artisans and cultural entrepreneurs
            </p>
          </div>
          <VendorGrid vendors={featuredVendors} language={language} />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Discover unique treasures from around the world
            </p>
          </div>
          <ProductGrid products={sampleProducts} language={language} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Explore our curated collection of authentic products
            </p>
          </div>
          <CategoryGrid categories={categories} language={language} />
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Shop by Country
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Experience the rich cultural heritage of different nations
            </p>
          </div>
          <CountryGrid language={language} />
        </div>
      </section>

      {/* Vendor Signup Section */}
      <VendorSignup />

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Stay Connected
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              Subscribe to our newsletter for the latest products, cultural stories, and exclusive offers
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 