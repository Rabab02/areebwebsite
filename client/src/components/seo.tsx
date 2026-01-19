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
 * 
 * NOTE: Meta tags are now injected server-side (see server/seo-injector.ts)
 * This component serves as a hydration updater for:
 * - Dynamic language changes
 * - Client-side route changes
 * - Runtime SEO updates
 * 
 * It safely updates existing tags (from server) or creates them if missing.
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
      
      // Update Twitter title
      // const twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
      // if (twitterTitle) {
      //   twitterTitle.content = title;
      // } else {
      //   const meta = document.createElement('meta');
      //   meta.name = 'twitter:title';
      //   meta.content = title;
      //   document.head.appendChild(meta);
      // }
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

      // Update Twitter description
      // const twitterDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement;
      // if (twitterDesc) {
      //   twitterDesc.content = description;
      // } else {
      //   const meta = document.createElement('meta');
      //   meta.name = 'twitter:description';
      //   meta.content = description;
      //   document.head.appendChild(meta);
      // }
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
      ogSiteName.content = 'Areeb Tech';
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:site_name');
      meta.content = 'Areeb Tech';
      document.head.appendChild(meta);
    }

    // Inject Structured Data (JSON-LD)
    const injectStructuredData = () => {
      try {
        // Remove existing structured data
        const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
        existingScripts.forEach(script => script.remove());

      // Organization Schema
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Areeb Tech",
        "alternateName": "Areebb Technology",
        "url": "https://www.areebb.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.areebb.com/opengraph.jpg",
          "width": 1200,
          "height": 630
        },
        "description": language === 'ar' 
          ? "أريب تك - شركة تقنية معلومات وحلول ذكاء اصطناعي رائدة في الأردن. نقدم خدمات تقنية ذكية وماهرة تشمل وكلاء الذكاء الاصطناعي الصوتي، التحول الرقمي، خدمات إدارة تكنولوجيا المعلومات، وحلول مركز الاتصال ونقاط البيع."
          : "Areeb Tech - Leading IT and AI company in Jordan. Specializing in Software Solutions, Odoo ERP, Call Center solutions, Point of Sale (POS) systems, Digital Transformation, and AI-powered technology services.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Al-Madina Al-Monawara St 219",
          "addressLocality": "Amman",
          "addressCountry": "JO",
          "postalCode": "XVV9+7R"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+962-777-470-302",
          "contactType": "Customer Service",
          "email": "info@areebtech.com",
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
        "name": "Areeb Tech",
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
        "telephone": "+962-777-470-302",
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      };

      // Service Schema
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "IT Services",
        "provider": {
          "@type": "Organization",
          "name": "Areeb Tech",
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
                ? "أريب تك هي شركة تقنية معلومات رائدة في الأردن متخصصة في حلول البرمجيات، التحول الرقمي، خدمات إدارة تكنولوجيا المعلومات، وحلول الذكاء الاصطناعي."
                : "Areeb Tech is a leading IT company in Jordan specializing in Software Solutions, Digital Transformation, IT Managed Services, and AI solutions. Based in Amman, we provide comprehensive technology services to businesses across Jordan."
            }
          },
          {
            "@type": "Question",
            "name": language === 'ar' ? "ما هي أفضل شركة ذكاء اصطناعي في الأردن؟" : "What is the best AI company in Jordan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'ar'
                ? "أريب تك تقدم حلول ذكاء اصطناعي متقدمة بما في ذلك وكلاء الذكاء الاصطناعي الصوتي، وأدوات الذكاء الاصطناعي، وأتمتة ذكية للشركات في الأردن."
                : "Areeb Tech provides advanced AI solutions including Voice AI agents, AI tools, and intelligent automation for businesses in Jordan. Our AI-powered services help companies automate processes and enhance customer experiences."
            }
          },
          {
            "@type": "Question",
            "name": language === 'ar' ? "أين يمكنني العثور على حلول مركز الاتصال في الأردن؟" : "Where can I find Call Center solutions in Jordan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'ar'
                ? "أريب تك توفر حلول مركز الاتصال المتقدمة المدعومة بالذكاء الاصطناعي لدعم العملاء الآلي، التوجيه الفعال، وتجربة عملاء محسنة في الأردن."
                : "Areeb Tech offers advanced AI-powered call center solutions in Jordan. Our Agent Call Center Solutions provide automated customer support, efficient routing, and enhanced customer experience using Voice AI technology."
            }
          },
          {
            "@type": "Question",
            "name": language === 'ar' ? "أين يمكنني العثور على أنظمة نقاط البيع (POS) في الأردن؟" : "Where can I find Point of Sale (POS) systems in Jordan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'ar'
                ? "أريب تك تقدم حلول نقاط البيع الشاملة مع التكامل والتخصيص لتبسيط عمليات البيع بالتجزئة وتحسين تجربة دفع العملاء في الأردن."
                : "Areeb Tech provides comprehensive Point of Sale (POS) solutions in Jordan. Our POS systems include integration solutions, payment processing, inventory management, and real-time reporting for retail and hospitality businesses."
            }
          },
          {
            "@type": "Question",
            "name": language === 'ar' ? "ما هي خدمات التحول الرقمي المتاحة في الأردن؟" : "What Digital Transformation services are available in Jordan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": language === 'ar'
                ? "أريب تك توفر خدمات التحول الرقمي الشاملة في الأردن تشمل الاستشارات والاستراتيجيات لأتمتة العمليات وسير العمل، ودفع الابتكار عبر المؤسسات."
                : "Areeb Tech offers comprehensive Digital Transformation services in Jordan including consulting and strategy to digitize processes, automate workflows, and drive innovation across organizations."
            }
          }
        ]
      };

      // Product Schema (Voice AI Agent) - Enhanced for AI SEO
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Areeb Voice AI Agent",
        "alternateName": "Areeb AI Voice Assistant",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "AI Customer Service",
        "operatingSystem": "Cloud-based",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "description": language === 'ar'
          ? "وكيل ذكاء اصطناعي صوتي متقدم يدعم اللهجة الأردنية والعربية، يوفر دعم عملاء آلي طبيعي وتفاعلي. يستخدم تقنيات معالجة اللغة الطبيعية والتعلم الآلي لتقديم تجربة محادثة طبيعية."
          : "Advanced Voice AI Agent supporting Jordanian and Arabic dialects, providing natural and interactive automated customer support. Uses Natural Language Processing and Machine Learning technologies for natural conversation experiences.",
        "featureList": [
          "Natural Language Processing",
          "Arabic and Jordanian Dialect Support",
          "Voice Recognition",
          "Conversational AI",
          "24/7 Automated Customer Support",
          "Multi-language Support",
          "Machine Learning Integration"
        ],
        "screenshot": "https://www.areebb.com/opengraph.jpg",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "50"
        },
        "provider": {
          "@type": "Organization",
          "name": "Areeb Tech",
          "url": "https://www.areebb.com"
        },
        "keywords": "Voice AI, AI Agent, Conversational AI, Natural Language Processing, Arabic AI, Customer Support AI, Jordan AI Solutions"
      };

      // AI Technology Schema - Additional structured data for AI SEO
      const aiTechnologySchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": language === 'ar' 
          ? "حلول الذكاء الاصطناعي المتقدمة في الأردن"
          : "Advanced AI Solutions in Jordan",
        "description": language === 'ar'
          ? "أريب تك تقدم حلول ذكاء اصطناعي متقدمة تشمل وكلاء الذكاء الاصطناعي الصوتي، معالجة اللغة الطبيعية، والتعلم الآلي للشركات في الأردن."
          : "Areeb Tech provides advanced AI solutions including Voice AI agents, Natural Language Processing, and Machine Learning for businesses in Jordan.",
        "author": {
          "@type": "Organization",
          "name": "Areeb Tech"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Areeb Tech",
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

      // Inject all schemas
      const schemas = [organizationSchema, localBusinessSchema, serviceSchema, faqSchema, productSchema, aiTechnologySchema];
      
      schemas.forEach((schema, index) => {
        try {
          // Validate schema before stringifying
          const schemaString = JSON.stringify(schema);
          
          // Check if script already exists
          let script = document.getElementById(`structured-data-${index}`) as HTMLScriptElement;
          if (script) {
            script.textContent = schemaString;
          } else {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = `structured-data-${index}`;
            script.textContent = schemaString;
            document.head.appendChild(script);
          }
        } catch (error) {
          console.error(`Failed to inject structured data schema ${index}:`, error);
        }
      });
      } catch (error) {
        console.error('Failed to inject structured data:', error);
      }
    };

    injectStructuredData();
  }, [title, description, keywords, canonicalUrl, language]);

  return null;
}