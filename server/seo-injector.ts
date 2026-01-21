/**
 * Server-side SEO Meta Tag and Structured Data Injector
 * Injects meta tags and JSON-LD structured data into HTML before serving
 */

import { SEOData } from './seo-config';

/**
 * Generate structured data (JSON-LD) schemas
 */
function generateStructuredData(seoData: SEOData): string[] {
  const { language } = seoData;
  const localeValue = language === 'ar' ? 'ar_JO' : 'en_US';

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Areeb",
    "alternateName": "Areebb Technology",
    "url": "https://www.areebb.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.areebb.com/opengraph.jpg",
      "width": 1200,
      "height": 630
    },
    "description": language === 'ar' 
      ? "أريب - شركة تقنية معلومات وحلول ذكاء اصطناعي رائدة في الأردن. نقدم خدمات تقنية ذكية وماهرة تشمل وكلاء الذكاء الاصطناعي الصوتي، التحول الرقمي، خدمات إدارة تكنولوجيا المعلومات، وحلول مركز الاتصال ونقاط البيع."
      : "Areeb - Leading IT and AI company in Jordan. Specializing in Software Solutions, Odoo ERP, Call Center solutions, Point of Sale (POS) systems, Digital Transformation, and AI-powered technology services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al-Madina Al-Monawara St 219",
      "addressLocality": "Amman",
      "addressCountry": "JO",
      "postalCode": "XVV9+7R"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+962-799-788-261",
      "contactType": "Customer Service",
      "email": "info@areebb.com",
      "areaServed": "JO",
      "availableLanguage": ["en", "ar"]
    },
    "sameAs": [
      "https://www.areebb.com"
    ],
    "knowsAbout": [
      "Information Technology",
      "Artificial Intelligence",
      "AI Solutions",
      "IT Services",
      "Call Center Solutions",
      "Point of Sale Systems",
      "POS Solutions",
      "Software Solutions",
      "Odoo ERP",
      "Digital Transformation",
      "IT Managed Services",
      "Voice AI",
      "AI Agents",
      "Machine Learning",
      "Natural Language Processing",
      "Conversational AI",
      "AI Automation",
      "Intelligent Systems"
    ],
    "industry": "Information Technology and Artificial Intelligence",
    "foundingDate": "2020",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "10-50"
    }
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.areebb.com",
    "name": "Areeb",
    "image": "https://www.areebb.com/opengraph.jpg",
    "description": language === 'ar'
      ? "شركة تقنية معلومات وحلول ذكاء اصطناعي في الأردن متخصصة في حلول البرمجيات، Odoo ERP، حلول مركز الاتصال، أنظمة نقاط البيع، والتحول الرقمي."
      : "IT and AI company in Jordan specializing in Software Solutions, Odoo ERP, Call Center solutions, Point of Sale systems, and Digital Transformation.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al-Madina Al-Monawara St 219",
      "addressLocality": "Amman",
      "addressRegion": "Amman Governorate",
      "postalCode": "XVV9+7R",
      "addressCountry": "JO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.9539,
      "longitude": 35.8800
    },
    "url": "https://www.areebb.com",
    "telephone": "+962-799-788-261",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  // Service Catalog Schema (for Rich Snippets)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "IT Services",
    "provider": {
      "@type": "Organization",
      "name": "Areeb",
      "url": "https://www.areebb.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Jordan"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT and AI Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Transformation",
            "description": "Consulting and strategy to digitize processes, automate workflows, and drive innovation."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IT Managed Services",
            "description": "Comprehensive IT infrastructure management and support services."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Solutions",
            "description": "AI-powered tools and solutions including Voice AI agents and intelligent automation."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Agent Call Center Solutions",
            "description": "Advanced AI-powered call center solutions for automated customer support."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Point of Sale (POS) Solutions",
            "description": "Comprehensive POS systems integration and customization for retail operations."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Software Solutions",
            "description": "Custom software development and enterprise solutions including Odoo ERP."
          }
        }
      ]
    }
  };

  // Individual AI Agent Call Center Service Schema (Rich Snippet Optimized)
  const aiAgentCallCenterService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": language === 'ar' ? "حلول مركز الاتصال بوكلاء الذكاء الاصطناعي" : "AI Agent Call Center Solutions",
    "alternateName": "Voice AI Call Center",
    "description": language === 'ar'
      ? "حلول مركز اتصال متقدمة مدعومة بوكلاء الذكاء الاصطناعي الصوتي لدعم العملاء الآلي، جدولة المواعيد، والتعامل مع الاستفسارات. يدعم اللهجات الأردنية والعربية."
      : "Advanced AI-powered call center solutions featuring Voice AI agents for automated customer support, appointment scheduling, and inquiry handling. Supports Jordanian and Arabic dialects with natural language processing.",
    "provider": {
      "@type": "Organization",
      "name": "Areeb",
      "url": "https://www.areebb.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.areebb.com/opengraph.jpg"
      }
    },
    "serviceType": "Call Center Solution",
    "category": "AI Customer Service",
    "areaServed": {
      "@type": "Country",
      "name": "Jordan",
      "sameAs": "https://en.wikipedia.org/wiki/Jordan"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.areebb.com/services",
      "servicePhone": "+962-799-788-261",
      "serviceSmsNumber": "+962-799-788-261",
      "availableLanguage": ["en", "ar"]
    },
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Business",
      "geographicArea": {
        "@type": "Country",
        "name": "Jordan"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Agent Call Center Features",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Voice AI Agents",
            "description": "Natural language voice AI agents supporting Arabic and Jordanian dialects"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "24/7 Automated Support",
            "description": "Round-the-clock automated customer support with AI agents"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Appointment Scheduling",
            "description": "Intelligent appointment scheduling and calendar management"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Multi-language Support",
            "description": "Support for Arabic, English, and Jordanian dialects"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "25",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "Contact for pricing",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "0",
        "priceCurrency": "USD",
        "valueAddedTaxIncluded": true
      },
      "availability": "https://schema.org/InStock",
      "url": "https://www.areebb.com/services",
      "seller": {
        "@type": "Organization",
        "name": "Areeb"
      }
    }
  };

  // Voice AI Agent Product Schema (Enhanced for Rich Snippets)
  const voiceAIAgentProduct = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": language === 'ar' ? "وكيل أريب الصوتي للذكاء الاصطناعي" : "Areeb Voice AI Agent",
    "alternateName": ["Areeb AI Voice Assistant", "Voice AI Agent", "Conversational AI Agent"],
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "AI Customer Service",
    "operatingSystem": "Cloud-based",
    "softwareVersion": "2.0",
    "releaseNotes": language === 'ar'
      ? "إصدار محدث مع دعم محسّن للهجات الأردنية وتحسينات معالجة اللغة الطبيعية"
      : "Updated release with enhanced Jordanian dialect support and improved natural language processing",
    "description": language === 'ar'
      ? "وكيل ذكاء اصطناعي صوتي متقدم يدعم اللهجة الأردنية والعربية، يوفر دعم عملاء آلي طبيعي وتفاعلي. يستخدم تقنيات معالجة اللغة الطبيعية والتعلم الآلي لتقديم تجربة محادثة طبيعية مع العملاء على مدار الساعة."
      : "Advanced Voice AI Agent supporting Jordanian and Arabic dialects, providing natural and interactive automated customer support. Uses Natural Language Processing and Machine Learning technologies for natural conversation experiences. Available 24/7 for automated customer service.",
    "featureList": [
      "Natural Language Processing (NLP)",
      "Arabic and Jordanian Dialect Support",
      "Voice Recognition and Synthesis",
      "Conversational AI Technology",
      "24/7 Automated Customer Support",
      "Multi-language Support (Arabic, English)",
      "Machine Learning Integration",
      "Real-time Speech Processing",
      "Context-aware Conversations",
      "Automated Appointment Scheduling"
    ],
    "screenshot": "https://www.areebb.com/opengraph.jpg",
    "softwareRequirements": "Internet connection, Web browser or API access",
    "permissions": "Voice input, API access",
    "browserRequirements": "Modern web browser with microphone support",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "50",
      "bestRating": "5",
      "worstRating": "1",
      "reviewCount": "50"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.areebb.com/services",
      "seller": {
        "@type": "Organization",
        "name": "Areeb",
        "url": "https://www.areebb.com"
      },
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "0",
        "priceCurrency": "USD",
        "valueAddedTaxIncluded": true
      }
    },
    "provider": {
      "@type": "Organization",
      "name": "Areeb",
      "url": "https://www.areebb.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.areebb.com/opengraph.jpg"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+962-799-788-261",
        "contactType": "Customer Service",
        "email": "info@areebb.com",
        "availableLanguage": ["en", "ar"]
      }
    },
    "keywords": "Voice AI, AI Agent, Conversational AI, Natural Language Processing, Arabic AI, Customer Support AI, Jordan AI Solutions, Voice Recognition, Speech Synthesis, AI Automation",
    "inLanguage": ["ar", "en"],
    "isAccessibleForFree": true,
    "downloadUrl": "https://www.areebb.com/services",
    "installUrl": "https://www.areebb.com/services"
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": language === 'ar' ? "ما هي أفضل شركة تقنية معلومات في الأردن؟" : "What is the best IT company in Jordan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === 'ar' 
            ? "أريب هي شركة تقنية معلومات رائدة في الأردن متخصصة في حلول البرمجيات، التحول الرقمي، خدمات إدارة تكنولوجيا المعلومات، وحلول الذكاء الاصطناعي."
            : "Areeb is a leading IT company in Jordan specializing in Software Solutions, Digital Transformation, IT Managed Services, and AI solutions. Based in Amman, we provide comprehensive technology services to businesses across Jordan."
        }
      },
      {
        "@type": "Question",
        "name": language === 'ar' ? "ما هي أفضل شركة ذكاء اصطناعي في الأردن؟" : "What is the best AI company in Jordan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === 'ar'
            ? "أريب تقدم حلول ذكاء اصطناعي متقدمة بما في ذلك وكلاء الذكاء الاصطناعي الصوتي، وأدوات الذكاء الاصطناعي، وأتمتة ذكية للشركات في الأردن."
            : "Areeb provides advanced AI solutions including Voice AI agents, AI tools, and intelligent automation for businesses in Jordan. Our AI-powered services help companies automate processes and enhance customer experiences."
        }
      },
      {
        "@type": "Question",
        "name": language === 'ar' ? "أين يمكنني العثور على حلول مركز الاتصال في الأردن؟" : "Where can I find Call Center solutions in Jordan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === 'ar'
            ? "أريب توفر حلول مركز الاتصال المتقدمة المدعومة بالذكاء الاصطناعي لدعم العملاء الآلي، التوجيه الفعال، وتجربة عملاء محسنة في الأردن."
            : "Areeb offers advanced AI-powered call center solutions in Jordan. Our Agent Call Center Solutions provide automated customer support, efficient routing, and enhanced customer experience using Voice AI technology."
        }
      },
      {
        "@type": "Question",
        "name": language === 'ar' ? "أين يمكنني العثور على أنظمة نقاط البيع (POS) في الأردن؟" : "Where can I find Point of Sale (POS) systems in Jordan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === 'ar'
            ? "أريب تقدم حلول نقاط البيع الشاملة مع التكامل والتخصيص لتبسيط عمليات البيع بالتجزئة وتحسين تجربة دفع العملاء في الأردن."
            : "Areeb provides comprehensive Point of Sale (POS) solutions in Jordan. Our POS systems include integration solutions, payment processing, inventory management, and real-time reporting for retail and hospitality businesses."
        }
      },
      {
        "@type": "Question",
        "name": language === 'ar' ? "ما هي خدمات التحول الرقمي المتاحة في الأردن؟" : "What Digital Transformation services are available in Jordan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === 'ar'
            ? "أريب توفر خدمات التحول الرقمي الشاملة في الأردن تشمل الاستشارات والاستراتيجيات لأتمتة العمليات وسير العمل، ودفع الابتكار عبر المؤسسات."
            : "Areeb offers comprehensive Digital Transformation services in Jordan including consulting and strategy to digitize processes, automate workflows, and drive innovation across organizations."
        }
      }
    ]
  };

  // BreadcrumbList Schema (for Rich Snippets navigation)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": language === 'ar' ? "الرئيسية" : "Home",
        "item": "https://www.areebb.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": language === 'ar' ? "الخدمات" : "Services",
        "item": "https://www.areebb.com/services"
      }
    ]
  };

  // AI Technology Schema
  const aiTechnologySchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": language === 'ar' 
      ? "حلول الذكاء الاصطناعي المتقدمة في الأردن"
      : "Advanced AI Solutions in Jordan",
    "description": language === 'ar'
      ? "أريب تقدم حلول ذكاء اصطناعي متقدمة تشمل وكلاء الذكاء الاصطناعي الصوتي، معالجة اللغة الطبيعية، والتعلم الآلي للشركات في الأردن."
      : "Areeb provides advanced AI solutions including Voice AI agents, Natural Language Processing, and Machine Learning for businesses in Jordan.",
    "author": {
      "@type": "Organization",
      "name": "Areeb"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Areeb",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.areebb.com/opengraph.jpg"
      }
    },
    "about": {
      "@type": "Thing",
      "name": "Artificial Intelligence",
      "description": "AI solutions and services for businesses"
    },
    "keywords": "AI, Artificial Intelligence, Machine Learning, NLP, Voice AI, Jordan AI, AI Solutions"
  };

  // Combine all schemas - Enhanced for Rich Snippets
  const schemas = [
    organizationSchema,
    localBusinessSchema,
    serviceSchema,
    aiAgentCallCenterService,  // Individual service schema for Rich Snippets
    voiceAIAgentProduct,        // Enhanced product schema
    faqSchema,
    aiTechnologySchema,
    breadcrumbSchema            // Navigation breadcrumbs
  ];

  return schemas.map(schema => JSON.stringify(schema));
}

/**
 * Generate meta tags HTML string
 */
function generateMetaTags(seoData: SEOData): string {
  const { title, description, keywords, canonicalUrl, language, ogImage } = seoData;
  const localeValue = language === 'ar' ? 'ar_JO' : 'en_US';
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const metaTags: string[] = [];

  // HTML lang and dir attributes (will be handled in the HTML replacement)
  
  // Title
  metaTags.push(`<title>${escapeHtml(title)}</title>`);
  
  // Standard meta tags
  metaTags.push(`<meta name="description" content="${escapeHtml(description)}">`);
  if (keywords) {
    metaTags.push(`<meta name="keywords" content="${escapeHtml(keywords)}">`);
  }
  
  // Open Graph tags
  metaTags.push(`<meta property="og:title" content="${escapeHtml(title)}">`);
  metaTags.push(`<meta property="og:description" content="${escapeHtml(description)}">`);
  metaTags.push(`<meta property="og:url" content="${canonicalUrl}">`);
  metaTags.push(`<meta property="og:type" content="website">`);
  metaTags.push(`<meta property="og:site_name" content="Areeb">`);
  if (ogImage) {
    metaTags.push(`<meta property="og:image" content="${ogImage}">`);
    metaTags.push(`<meta property="og:image:width" content="1200">`);
    metaTags.push(`<meta property="og:image:height" content="630">`);
    metaTags.push(`<meta property="og:image:alt" content="${escapeHtml(title)}">`);
  }
  metaTags.push(`<meta property="og:locale" content="${localeValue}">`);
  metaTags.push(`<meta property="og:locale:alternate" content="${language === 'ar' ? 'en_US' : 'ar_JO'}">`);
  
  // Twitter Card tags
  metaTags.push(`<meta name="twitter:card" content="summary_large_image">`);
  metaTags.push(`<meta name="twitter:site" content="@areebtech">`);
  metaTags.push(`<meta name="twitter:creator" content="@areebtech">`);
  metaTags.push(`<meta name="twitter:title" content="${escapeHtml(title)}">`);
  metaTags.push(`<meta name="twitter:description" content="${escapeHtml(description)}">`);
  if (ogImage) {
    metaTags.push(`<meta name="twitter:image" content="${ogImage}">`);
    metaTags.push(`<meta name="twitter:image:alt" content="${escapeHtml(title)}">`);
  }
  
  // Canonical URL
  metaTags.push(`<link rel="canonical" href="${canonicalUrl}">`);
  
  // Hreflang tags
  const pathWithoutDomain = canonicalUrl.replace('https://www.areebb.com', '') || '/';
  const separator = pathWithoutDomain.includes('?') ? '&' : '?';
  metaTags.push(`<link rel="alternate" hreflang="en" href="https://www.areebb.com${pathWithoutDomain}${separator}lang=en">`);
  metaTags.push(`<link rel="alternate" hreflang="ar" href="https://www.areebb.com${pathWithoutDomain}${separator}lang=ar">`);
  metaTags.push(`<link rel="alternate" hreflang="x-default" href="https://www.areebb.com/?lang=ar">`);

  return metaTags.join('\n    ');
}

/**
 * Generate structured data HTML string
 */
function generateStructuredDataHTML(seoData: SEOData): string {
  const schemas = generateStructuredData(seoData);
  return schemas.map((schema, index) => 
    `    <script type="application/ld+json" id="structured-data-${index}">\n${schema}\n    </script>`
  ).join('\n');
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Inject SEO meta tags and structured data into HTML
 */
export function injectSEO(html: string, seoData: SEOData): string {
  let modifiedHtml = html;

  // Update HTML lang and dir attributes
  modifiedHtml = modifiedHtml.replace(
    /<html\s+([^>]*)>/i,
    (match, attrs) => {
      // Remove existing lang and dir
      attrs = attrs.replace(/\s*(lang|dir)=["'][^"']*["']/gi, '');
      const dir = seoData.language === 'ar' ? 'rtl' : 'ltr';
      return `<html lang="${seoData.language}" dir="${dir}" ${attrs.trim()}>`;
    }
  );

  // Replace title tag
  modifiedHtml = modifiedHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${escapeHtml(seoData.title)}</title>`
  );

  // Remove existing meta tags we'll replace
  const tagsToRemove = [
    'meta[name="description"]',
    'meta[name="keywords"]',
    'meta[property^="og:"]',
    'meta[name^="twitter:"]',
    'link[rel="canonical"]',
    'link[rel="alternate"][hreflang]',
    'script[type="application/ld+json"]'
  ];

  // Replace meta tags in head
  const metaTags = generateMetaTags(seoData);
  const structuredData = generateStructuredDataHTML(seoData);

  // Find the closing </head> tag and insert before it
  if (modifiedHtml.includes('</head>')) {
    // Remove old structured data scripts
    modifiedHtml = modifiedHtml.replace(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
      ''
    );

    // Inject new meta tags and structured data before </head>
    modifiedHtml = modifiedHtml.replace(
      '</head>',
      `    ${metaTags}\n${structuredData}\n  </head>`
    );
  }

  return modifiedHtml;
}
