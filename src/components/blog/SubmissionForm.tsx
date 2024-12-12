'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserSubmission } from '@/types/blog';

interface SubmissionFormProps {
  onSubmit: (submission: Partial<UserSubmission>) => Promise<void>;
}

export default function SubmissionForm({ onSubmit }: SubmissionFormProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'story' | 'recipe' | 'photo' | 'review'>('story');
  const [images, setImages] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

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

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
      >
        {isLoading ? t('common.submitting') : t('blog.submit')}
      </button>
    </form>
  );
} 