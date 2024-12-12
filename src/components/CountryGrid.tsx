import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ET, MA, EG } from 'country-flag-icons/react/3x2';

interface Country {
  code: string;
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
  flag: React.ComponentType<{ className?: string }>;
  slug: string;
}

const countries: Country[] = [
  {
    code: 'ET',
    name: {
      en: 'Ethiopia',
      es: 'Etiopía',
      fr: 'Éthiopie',
      ar: 'إثيوبيا',
      am: 'ኢትዮጵያ',
    },
    description: {
      en: 'Discover authentic Ethiopian coffee, textiles, and crafts',
      es: 'Descubre auténtico café, textiles y artesanías etíopes',
      fr: 'Découvrez le café, les textiles et l\'artisanat éthiopiens authentiques',
      ar: 'اكتشف القهوة والمنسوجات والحرف اليدوية الإثيوبية الأصيلة',
      am: 'እውነተኛ የኢትዮጵያ ቡና፣ ጨርቃጨርቅ እና እ���-ጥበብ ይግኙ',
    },
    image: '/images/countries/ethiopia.jpg',
    flag: ET,
    slug: 'ethiopia',
  },
  {
    code: 'MA',
    name: {
      en: 'Morocco',
      es: 'Marruecos',
      fr: 'Maroc',
      ar: 'المغرب',
      am: 'ሞሮኮ',
    },
    description: {
      en: 'Explore Moroccan rugs, pottery, and leather goods',
      es: 'Explora alfombras, cerámica y artículos de cuero marroquíes',
      fr: 'Explorez les tapis, la poterie et les articles en cuir marocains',
      ar: 'استكشف السجاد والفخار والمنتجات الجلدية المغربية',
      am: 'የሞሮኮ ምንጣፎችን፣ ሸክላዎችን እና የቆዳ እቃዎችን ያግኙ',
    },
    image: '/images/countries/morocco.jpg',
    flag: MA,
    slug: 'morocco',
  },
  {
    code: 'EG',
    name: {
      en: 'Egypt',
      es: 'Egipto',
      fr: 'Égypte',
      ar: 'مصر',
      am: 'ግብጽ',
    },
    description: {
      en: 'Find Egyptian cotton textiles and traditional artifacts',
      es: 'Encuentra textiles de algodón egipcio y artefactos tradicionales',
      fr: 'Trouvez des textiles en coton égyptien et des artefacts traditionnels',
      ar: 'اكتشف المنسوجات القطنية المصرية والقطع الأثرية التقليدية',
      am: 'የግብጽ ጥጥ ጨርቃጨርቆች እና ባህላዊ እቃዎችን ያግኙ',
    },
    image: '/images/countries/egypt.jpg',
    flag: EG,
    slug: 'egypt',
  },
];

interface CountryGridProps {
  language: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CountryGrid({ language }: CountryGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {countries.map((country) => (
        <motion.div
          key={country.code}
          variants={item}
          className="group relative overflow-hidden rounded-lg shadow-lg bg-white"
        >
          <Link href={`/countries/${country.slug}`}>
            <div className="relative h-64">
              <Image
                src={country.image}
                alt={country.name[language as keyof typeof country.name]}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Flag */}
              <div className="absolute top-4 right-4 w-12 h-8 rounded-md overflow-hidden shadow-lg">
                {country.flag && <country.flag className="w-full h-full object-cover" />}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {country.name[language as keyof typeof country.name]}
                </h3>
                <p className="text-sm text-white/90">
                  {country.description[language as keyof typeof country.description]}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
} 