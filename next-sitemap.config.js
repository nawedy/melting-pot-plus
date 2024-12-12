/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://meltingpotplus.netlify.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://meltingpotplus.netlify.app/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/admin'],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom transform function for multi-language support
    const languages = ['en', 'es', 'fr', 'ar', 'am'];
    if (path === '/') {
      return languages.map((lang) => ({
        loc: `${config.siteUrl}/${lang}`,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }));
    }
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
}; 