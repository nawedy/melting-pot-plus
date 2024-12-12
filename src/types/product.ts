export interface Product {
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
  price: number;
  currency: string;
  images: string[];
  category: string;
  countryOfOrigin: string;
  inStock: boolean;
  rating: number;
  reviews: Review[];
  specifications: {
    weight?: string;
    dimensions?: string;
    material?: string;
    color?: string;
    [key: string]: string | undefined;
  };
  tags: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  language: string;
}

export interface ProductCategory {
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
  image: string;
  slug: string;
} 