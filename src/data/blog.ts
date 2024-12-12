import { BlogPost } from '@/types/blog';

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'traditional-ethiopian-coffee',
    title: {
      en: 'The Art of Traditional Ethiopian Coffee Ceremony',
      es: 'El Arte de la Ceremonia Tradicional del Café Etíope',
      fr: 'L\'Art de la Cérémonie Traditionnelle du Café Éthiopien',
      ar: 'فن مراسم القهوة الإثيوبية التقليدية',
      am: 'የባህላዊ ኢትዮጵያ ቡና ስነ-ስርዓት ጥበብ',
    },
    excerpt: {
      en: 'Discover the rich cultural heritage and intricate rituals of the Ethiopian coffee ceremony.',
      es: 'Descubre la rica herencia cultural y los intrincados rituales de la ceremonia del café etíope.',
      fr: 'Découvrez le riche patrimoine culturel et les rituels complexes de la cérémonie du café éthiopien.',
      ar: 'اكتشف التراث الثقافي الغني والطقوس المعقدة لمراسم القهوة الإثيوبية.',
      am: 'የኢትዮጵያ ቡና ስነ-ስርዓት ባህላዊ ቅርስና ውስብስብ ስርዓቶችን ይፋ ያደርጋል።',
    },
    content: {
      en: 'Full article content in English...',
      es: 'Contenido completo del artículo en español...',
      fr: 'Contenu complet de l\'article en français...',
      ar: 'محتوى المقال الكامل باللغة العربية...',
      am: 'ሙሉ የፅሑፍ ይዘት በአማርኛ...',
    },
    author: {
      id: 'author1',
      name: 'Makeda Solomon',
      avatar: '/images/authors/makeda-solomon.jpg',
      role: 'Cultural Expert',
    },
    category: {
      id: 'traditions',
      name: {
        en: 'Traditions',
        es: 'Tradiciones',
        fr: 'Traditions',
        ar: 'التقاليد',
        am: 'ባህሎች',
      },
      slug: 'traditions',
    },
    tags: ['Coffee', 'Ethiopia', 'Culture', 'Ceremony'],
    image: '/images/blog/ethiopian-coffee-ceremony.jpg',
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: 8,
    likes: 245,
    comments: [
      {
        id: 'comment1',
        userId: 'user1',
        userName: 'Sarah Johnson',
        content: 'This was such an insightful article! I had no idea about the complexity of the coffee ceremony.',
        createdAt: '2024-01-15T14:30:00Z',
        likes: 12,
      },
    ],
  },
  {
    id: 'moroccan-tagine',
    title: {
      en: 'Mastering the Art of Moroccan Tagine',
      es: 'Dominando el Arte del Tajín Marroquí',
      fr: 'Maîtriser l\'Art du Tajine Marocain',
      ar: 'إتقان فن الطاجين المغربي',
      am: 'የሞሮኮ ታጂን ጥበብን ማወቅ',
    },
    excerpt: {
      en: 'Learn the secrets of preparing authentic Moroccan tagine from master chefs.',
      es: 'Aprende los secretos de la preparación del auténtico tajín marroquí de chefs expertos.',
      fr: 'Apprenez les secrets de la préparation du tajine marocain authentique des chefs experts.',
      ar: 'تعلم أسرار تحضير الطاجين المغربي الأصيل من كبار الطهاة.',
      am: 'ከባለሙያ ሼፎች እውነተኛውን የሞሮኮ ታጂን የማዘጋጀት ሚስጥሮችን ይማሩ።',
    },
    content: {
      en: 'Full article content in English...',
      es: 'Contenido completo del artículo en español...',
      fr: 'Contenu complet de l\'article en français...',
      ar: 'محتوى المقال الكامل باللغة العربية...',
      am: 'ሙሉ የፅሑፍ ይዘት በአማርኛ...',
    },
    author: {
      id: 'author2',
      name: 'Fatima El Amrani',
      avatar: '/images/authors/fatima-el-amrani.jpg',
      role: 'Chef & Culinary Expert',
    },
    category: {
      id: 'cooking',
      name: {
        en: 'Cooking',
        es: 'Cocina',
        fr: 'Cuisine',
        ar: 'الطبخ',
        am: 'ምግብ ማብሰል',
      },
      slug: 'cooking',
    },
    tags: ['Moroccan Cuisine', 'Cooking', 'Traditional Food', 'Recipe'],
    image: '/images/blog/moroccan-tagine.jpg',
    publishedAt: '2024-01-14T09:00:00Z',
    readTime: 12,
    likes: 189,
    comments: [
      {
        id: 'comment2',
        userId: 'user2',
        userName: 'Mohammed Hassan',
        content: 'The tips about spice combinations were especially helpful. Thank you!',
        createdAt: '2024-01-14T11:45:00Z',
        likes: 8,
      },
    ],
  },
  // Add more sample blog posts as needed
]; 