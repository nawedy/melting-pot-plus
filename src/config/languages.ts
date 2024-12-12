export const languages = {
  en: { name: 'English', code: 'en', flag: 'us' },
  es: { name: 'Español', code: 'es', flag: 'es' },
  fr: { name: 'Français', code: 'fr', flag: 'fr' },
  ar: { name: 'العربية', code: 'ar', flag: 'sa' },
  am: { name: 'አማርኛ', code: 'am', flag: 'et' }
};

export const defaultLanguage = 'en';

export type Language = keyof typeof languages; 