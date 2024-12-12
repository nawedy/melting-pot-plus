export interface BlogPost {
  id: string;
  title: {
    en: string;
    es: string;
    fr: string;
    ar: string;
    am: string;
  };
  excerpt: {
    en: string;
    es: string;
    fr: string;
    ar: string;
    am: string;
  };
  content: {
    en: string;
    es: string;
    fr: string;
    ar: string;
    am: string;
  };
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  category: {
    id: string;
    name: {
      en: string;
      es: string;
      fr: string;
      ar: string;
      am: string;
    };
    slug: string;
  };
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
  likes: number;
  comments: BlogComment[];
  shares: number;
  isUserSubmission?: boolean;
  status?: 'published' | 'pending' | 'draft';
  socialShares?: {
    facebook: number;
    twitter: number;
    instagram: number;
    whatsapp: number;
  };
}

export interface BlogComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  replies?: BlogComment[];
  isEdited?: boolean;
  editedAt?: string;
}

export interface BlogCategory {
  id: string;
  name: {
    en: string;
    es: string;
    fr: string;
    ar: string;
    am: string;
  };
  description: {
    en: string;
    es: string;
    fr: string;
    ar: string;
    am: string;
  };
  slug: string;
  image?: string;
  postCount: number;
}

export interface UserSubmission {
  id: string;
  type: 'story' | 'recipe' | 'photo' | 'review';
  title: string;
  content: string;
  images: string[];
  author: {
    id: string;
    name: string;
    avatar?: string;
    location?: string;
  };
  category: string;
  tags: string[];
  language: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  publishedAt?: string;
  likes: number;
  comments: BlogComment[];
  featured?: boolean;
  metadata?: {
    device?: string;
    location?: {
      country: string;
      city: string;
    };
    originalLanguage: string;
  };
}

export interface ShareOptions {
  platforms: {
    id: string;
    name: string;
    icon: string;
    url: string;
  }[];
  stats: {
    totalShares: number;
    platformShares: {
      [key: string]: number;
    };
  };
  settings: {
    allowComments: boolean;
    showShareCount: boolean;
    enableAnimation: boolean;
  };
} 