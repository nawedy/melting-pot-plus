'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

interface CartProps {
  language?: string;
}

export default function Cart({ language = 'en' }: CartProps) {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, getProduct, total } = useCart();
  const { t } = useTranslation();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {t('cart.title')}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={toggleCart}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">{t('cart.close')}</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {items.length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-gray-500">{t('cart.empty')}</p>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {items.map((item) => {
                                const product = getProduct(item.productId);
                                if (!product) return null;

                                return (
                                  <motion.li
                                    key={item.productId}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="flex py-6"
                                  >
                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <Image
                                        src={product.images[0]}
                                        alt={product.name[language as keyof typeof product.name]}
                                        width={96}
                                        height={96}
                                        className="h-full w-full object-cover object-center"
                                      />
                                      {!product.inStock && (
                                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                                          <ExclamationCircleIcon className="h-8 w-8 text-white" />
                                        </div>
                                      )}
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>{product.name[language as keyof typeof product.name]}</h3>
                                          <p className="ml-4">
                                            {product.currency} {(product.price * item.quantity).toFixed(2)}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.category}
                                          {!product.inStock && (
                                            <span className="ml-2 text-red-500">{t('cart.outOfStock')}</span>
                                          )}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                          {product.inStock ? (
                                            <>
                                              <button
                                                onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                                className="rounded-md bg-gray-100 px-2 py-1 hover:bg-gray-200"
                                              >
                                                -
                                              </button>
                                              <span className="text-gray-500">
                                                {t('cart.quantity', { count: item.quantity })}
                                              </span>
                                              <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="rounded-md bg-gray-100 px-2 py-1 hover:bg-gray-200"
                                              >
                                                +
                                              </button>
                                            </>
                                          ) : (
                                            <span className="text-gray-500">
                                              {t('cart.quantity', { count: item.quantity })}
                                            </span>
                                          )}
                                        </div>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={() => removeItem(item.productId)}
                                            className="font-medium text-primary-600 hover:text-primary-500"
                                          >
                                            {t('cart.remove')}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                        <p>{t('cart.subtotal')}</p>
                        <p>
                          {items.length > 0 ? getProduct(items[0].productId)?.currency : '$'} {total.toFixed(2)}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={items.length === 0 || items.some(item => !getProduct(item.productId)?.inStock)}
                      >
                        {t('cart.checkout')}
                      </motion.button>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          {t('cart.or')}{' '}
                          <button
                            type="button"
                            className="font-medium text-primary-600 hover:text-primary-500"
                            onClick={toggleCart}
                          >
                            {t('cart.continueShopping')}
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 