// Normalise SITE_URL so it ALWAYS has https://
const rawUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://www.sublimevital.com'

const SITE_URL = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,

  // keep your excludes if you really want them,
  // but I've removed '/*' because it excludes everything.
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/posts/*'],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/'], // same as SEO guy
        allow: '/', // explicitly allow everything else
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
  },
}
