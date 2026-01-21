import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  language?: 'en' | 'ar';
}

/**
 * SEO Component - Client-side meta tag updater
 * Meta tags are injected server-side in server/seo-injector.ts
 * This component updates tags for dynamic language/route changes
 */
export function SEO({ title, description, keywords, canonicalUrl, language = 'ar' }: SEOProps) {
  useEffect(() => {
    // Update HTML lang and dir attributes for SEO and accessibility
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    if (title) {
      document.title = title;
      
      // Update OG title
      const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      if (ogTitle) {
        ogTitle.content = title;
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.content = title;
        document.head.appendChild(meta);
      }
      
    }
    
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDesc) {
        metaDesc.content = description;
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }

      // Update OG description
      const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      if (ogDesc) {
        ogDesc.content = description;
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.content = description;
        document.head.appendChild(meta);
      }

    }

    if (keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.name = 'keywords';
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.content = keywords;
    }

    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonicalUrl;
      
      // Update OG URL
      const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
      if (ogUrl) {
        ogUrl.content = canonicalUrl;
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:url');
        meta.content = canonicalUrl;
        document.head.appendChild(meta);
      }
    }
    
    // Update OG locale based on language
    const ogLocale = document.querySelector('meta[property="og:locale"]') as HTMLMetaElement;
    const localeValue = language === 'ar' ? 'ar_JO' : 'en_US';
    if (ogLocale) {
      ogLocale.content = localeValue;
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:locale');
      meta.content = localeValue;
      document.head.appendChild(meta);
    }
    
    // Update OG site_name
    const ogSiteName = document.querySelector('meta[property="og:site_name"]') as HTMLMetaElement;
    if (ogSiteName) {
      ogSiteName.content = 'Areeb';
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:site_name');
        meta.content = 'Areeb';
      document.head.appendChild(meta);
    }

    // NOTE: Structured Data (JSON-LD) is now handled SERVER-SIDE in server/seo-injector.ts
    // This ensures schemas are in the initial HTML for optimal AI/RAG ranking.
    // Client-side only updates meta tags for dynamic changes (e.g., language switching).
  }, [title, description, keywords, canonicalUrl, language]);

  return null;
}