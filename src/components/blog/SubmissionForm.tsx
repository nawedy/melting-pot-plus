'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

interface SubmissionFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function SubmissionForm({ onSuccess, onCancel }: SubmissionFormProps) {
  const t = useTranslations('BlogSubmission');
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    image: null as File | null,
    language: 'en',
    type: 'story' as 'story' | 'recipe' | 'photo' | 'review',
  });
  
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    category?: string;
    tags?: string;
    image?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = t('titleRequired');
    }
    
    if (!formData.content.trim()) {
      newErrors.content = t('contentRequired');
    }
    
    if (!formData.category) {
      newErrors.category = t('categoryRequired');
    }
    
    if (!formData.tags.trim()) {
      newErrors.tags = t('tagsRequired');
    }
    
    if (formData.type === 'photo' && !formData.image) {
      newErrors.image = t('imageRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement actual submission logic
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('title', formData.title);
      formDataToSubmit.append('content', formData.content);
      formDataToSubmit.append('category', formData.category);
      formDataToSubmit.append('tags', formData.tags);
      formDataToSubmit.append('type', formData.type);
      formDataToSubmit.append('language', formData.language);
      if (formData.image) {
        formDataToSubmit.append('image', formData.image);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setErrors({
        general: t('submissionFailed')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
    try {
      const submission: Partial<UserSubmission> = {
        title,
        content,
        type,
        images: images ? Array.from(images).map(file => URL.createObjectURL(file)) : [],
        submittedAt: new Date().toISOString(),
        status: 'pending',
      };

      await onSubmit(submission);
      onClose();
      // Reset form
      setTitle('');
      setContent('');
      setType('story');
      setImages(null);
    } catch (err) {
      setError(t('blog.submissionError'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('blog.submitPost')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      {t('blog.submissionType')}
                    </label>
                    <select
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value as typeof type)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="story">{t('blog.types.story')}</option>
                      <option value="recipe">{t('blog.types.recipe')}</option>
                      <option value="photo">{t('blog.types.photo')}</option>
                      <option value="review">{t('blog.types.review')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      {t('blog.title')}
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                      {t('blog.content')}
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={6}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                      {t('blog.images')}
                    </label>
                    <input
                      type="file"
                      id="images"
                      multiple
                      accept="image/*"
                      onChange={(e) => setImages(e.target.files)}
                      className="mt-1 block w-full"
                    />
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                    >
                      {t('common.cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      {isLoading ? t('common.submitting') : t('blog.submit')}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
} 