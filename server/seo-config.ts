/**
 * Server-side SEO Configuration
 * This ensures meta tags are present in the initial HTML response
 * before JavaScript executes, making them visible to search engines.
 */

export type Language = 'en' | 'ar';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  language: Language;
  ogImage?: string;
}

interface RouteSEOConfig {
  [path: string]: {
    [lang in Language]: Omit<SEOData, 'language' | 'canonicalUrl'>;
  } & { canonicalUrl: string };
}

// SEO configuration for all routes
const routeSEO: RouteSEOConfig = {
  '/': {
    canonicalUrl: 'https://www.areebb.com/',
    ar: {
      title: 'أريب | شركة تقنية معلومات وحلول ذكاء اصطناعي في الأردن',
      description: 'أريب - شركة تقنية معلومات وحلول ذكاء اصطناعي رائدة في الأردن. متخصصة في حلول البرمجيات، Odoo ERP، حلول مركز الاتصال، أنظمة نقاط البيع، والتحول الرقمي. أفضل شركات تقنية المعلومات في الأردن.',
      keywords: 'شركات تقنية معلومات الأردن، شركات ذكاء اصطناعي الأردن، خدمات تقنية معلومات الأردن، خدمات ذكاء اصطناعي الأردن، حلول برمجيات، Odoo ERP، حلول مركز الاتصال، أنظمة نقاط البيع، التحول الرقمي، خدمات إدارة تكنولوجيا المعلومات',
    },
    en: {
      title: 'Areeb | IT & AI Company in Jordan',
      description: 'Areeb - Leading IT and AI company in Jordan. Specializing in Software Solutions, Odoo ERP, Call Center solutions, Point of Sale (POS) systems, Digital Transformation, and AI-powered technology services. Best IT companies in Jordan.',
      keywords: 'IT companies in Jordan, AI companies in Jordan, IT services Jordan, AI services Jordan, Software Solutions, Odoo ERP, Call Center solutions, Agent Call Center, Point of Sale, POS systems, Digital Transformation, IT Managed Services, Voice AI, AI Agents, Technology services Amman, Software development Jordan',
    },
  },
  '/services': {
    canonicalUrl: 'https://www.areebb.com/services',
    ar: {
      title: 'خدماتنا | أريب | شركة تقنية معلومات وحلول ذكاء اصطناعي في الأردن',
      description: 'اكتشف خدماتنا الشاملة: التحول الرقمي، إدارة تكنولوجيا المعلومات، حلول الذكاء الاصطناعي، المشاركة عبر قنوات متعددة، والتعهيد. حلول تقنية متطورة لتحويل أعمالك.',
      keywords: 'خدمات تقنية معلومات الأردن، خدمات ذكاء اصطناعي، التحول الرقمي، إدارة تكنولوجيا المعلومات، Call Center، Software Solutions',
    },
    en: {
      title: 'Our Services | Areeb | IT & AI Company in Jordan',
      description: 'Discover our comprehensive services: Digital Transformation, IT Managed Services, AI Solutions, Omnichannel Engagement, and Outsourcing. Cutting-edge technology solutions to transform your business.',
      keywords: 'IT services Jordan, AI services, Digital Transformation, IT Managed Services, Call Center solutions, Software Solutions, Technology services Amman',
    },
  },
  '/privacy-policy': {
    canonicalUrl: 'https://www.areebb.com/privacy-policy',
    ar: {
      title: 'سياسة الخصوصية | أريب',
      description: 'اقرأ سياسة الخصوصية الخاصة بنا لفهم كيفية جمع أريب واستخدامها وحماية معلوماتك الشخصية.',
    },
    en: {
      title: 'Privacy Policy | Areeb',
      description: 'Read our privacy policy to understand how Areeb collects, uses, and protects your personal information.',
    },
  },
  '/terms-of-service': {
    canonicalUrl: 'https://www.areebb.com/terms-of-service',
    ar: {
      title: 'شروط الخدمة | أريب',
      description: 'اقرأ شروط الخدمة الخاصة بنا لفهم القواعد والإرشادات لاستخدام خدمات أريب وموقعه الإلكتروني.',
    },
    en: {
      title: 'Terms of Service | Areeb',
      description: 'Read our terms of service to understand the rules and guidelines for using Areeb\'s services and website.',
    },
  },
};

/**
 * Get SEO data for a given route and language
 */
export function getSEOData(path: string, language: Language = 'ar'): SEOData | null {
  // Normalize path (remove query params, trailing slashes)
  const normalizedPath = path.split('?')[0].replace(/\/$/, '') || '/';
  
  const config = routeSEO[normalizedPath];
  if (!config) {
    return null;
  }

  const langConfig = config[language] || config.ar; // Fallback to Arabic
  
  return {
    ...langConfig,
    language,
    canonicalUrl: config.canonicalUrl,
    ogImage: 'https://www.areebb.com/opengraph.jpg',
  };
}

/**
 * Extract language from URL query parameter
 */
export function getLanguageFromURL(url: string): Language {
  const urlObj = new URL(url, 'http://localhost');
  const lang = urlObj.searchParams.get('lang');
  return lang === 'en' ? 'en' : 'ar';
}
