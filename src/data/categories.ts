import { ProductCategory } from '@/types/product';

export const categories: ProductCategory[] = [
  {
    id: 'cat1',
    name: {
      en: 'Home & Living',
      es: 'Hogar y Vida',
      fr: 'Maison et Vie',
      ar: 'المنزل والمعيشة',
      am: 'ቤት እና ኑሮ',
    },
    description: {
      en: 'Beautiful home decor and furniture from around the world',
      es: 'Hermosa decoración y muebles de todo el mundo',
      fr: 'Belle décoration et meubles du monde entier',
      ar: 'ديكور منزلي وأثاث جميل من جميع أنحاء العالم',
      am: 'ከዓለም ዙሪያ የመጡ ቆንጆ የቤት ማስዋቢያዎች እና ቤት እቃዎች',
    },
    image: '/images/categories/home-living.jpg',
    slug: 'home-living',
  },
  {
    id: 'cat2',
    name: {
      en: 'Kitchen & Dining',
      es: 'Cocina y Comedor',
      fr: 'Cuisine et Salle à Manger',
      ar: 'المطبخ والطعام',
      am: 'ኩሽና እና መመገቢያ',
    },
    description: {
      en: 'Traditional cookware and dining essentials',
      es: 'Utensilios de cocina tradicionales y elementos esenciales para la mesa',
      fr: 'Ustensiles de cuisine traditionnels et essentiels pour la table',
      ar: 'أواني الطبخ التقليدية ومستلزمات تناول الطعام',
      am: 'ባህላዊ የማብሰያ እና የምግብ መመገቢያ ዕቃዎች',
    },
    image: '/images/categories/kitchen-dining.jpg',
    slug: 'kitchen-dining',
  },
  {
    id: 'cat3',
    name: {
      en: 'Textiles & Fabrics',
      es: 'Textiles y Telas',
      fr: 'Textiles et Tissus',
      ar: 'المنسوجات والأقمشة',
      am: 'ጨርቃጨርቅ እና ጌጣጌጥ',
    },
    description: {
      en: 'Handwoven textiles and traditional fabrics',
      es: 'Textiles tejidos a mano y telas tradicionales',
      fr: 'Textiles tissés à la main et tissus traditionnels',
      ar: 'منسوجات يدوية وأقمشة تقليدية',
      am: 'በእጅ የተሰሩ ጨርቃጨርቆች እና ባህላዊ ጌጣጌጦች',
    },
    image: '/images/categories/textiles.jpg',
    slug: 'textiles-fabrics',
  },
  {
    id: 'cat4',
    name: {
      en: 'Art & Crafts',
      es: 'Arte y Artesanía',
      fr: 'Art et Artisanat',
      ar: 'الفن والحرف اليدوية',
      am: 'ስነ-ጥበብ እና እደ-ጥበብ',
    },
    description: {
      en: 'Handmade art pieces and traditional crafts',
      es: 'Piezas de arte hechas a mano y artesanías tradicionales',
      fr: 'Pièces d\'art faites à la main et artisanat traditionnel',
      ar: 'قطع فنية يدوية وحرف تقليدية',
      am: 'በእጅ የተሰሩ የስነ-ጥበብ ስራዎች እና ባህላዊ እደ-ጥበብ',
    },
    image: '/images/categories/art-crafts.jpg',
    slug: 'art-crafts',
  },
  {
    id: 'cat5',
    name: {
      en: 'Jewelry & Accessories',
      es: 'Joyería y Accesorios',
      fr: 'Bijoux et Accessoires',
      ar: 'المجوهرات والإكسسوارات',
      am: 'ጌጣጌጥ እና ተጨማሪ ዕቃዎች',
    },
    description: {
      en: 'Traditional jewelry and cultural accessories',
      es: 'Joyería tradicional y accesorios culturales',
      fr: 'Bijoux traditionnels et accessoires culturels',
      ar: 'مجوهرات تقليدية وإكسسوارات ثقافية',
      am: 'ባህላዊ ጌጣጌጦች እና ባህላዊ ተጨማሪ ዕቃዎች',
    },
    image: '/images/categories/jewelry.jpg',
    slug: 'jewelry-accessories',
  },
  {
    id: 'cat6',
    name: {
      en: 'Food & Beverages',
      es: 'Alimentos y Bebidas',
      fr: 'Alimentation et Boissons',
      ar: 'الطعام والمشروبات',
      am: 'ም��ብ እና መጠጥ',
    },
    description: {
      en: 'Authentic spices, coffee, tea, and traditional foods',
      es: 'Especias auténticas, café, té y alimentos tradicionales',
      fr: 'Épices authentiques, café, thé et aliments traditionnels',
      ar: 'توابل أصلية وقهوة وشاي وأطعمة تقليدية',
      am: 'እውነተኛ ቅመማ ቅመሞች፣ ቡና፣ ሻይ እና ባህላዊ ምግቦች',
    },
    image: '/images/categories/food-beverages.jpg',
    slug: 'food-beverages',
  },
]; 