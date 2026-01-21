import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicesDetailed } from "@/components/sections/services-detailed";
import { WaveBackground } from "@/components/ui/wave-background";
import { SEO } from "@/components/seo";
import { useI18n } from "@/lib/i18n";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ServicesPage() {
  const { language } = useI18n();
  const [location] = useLocation();

  useEffect(() => {
    // Handle hash navigation when coming from other pages or direct link
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1); // Remove the #
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);
  
  const seoTitle = language === 'ar'
    ? 'خدماتنا | أريب | شركة تقنية معلومات وحلول ذكاء اصطناعي في الأردن'
    : 'Our Services | Areeb | IT & AI Company in Jordan';
  
  const seoDescription = language === 'ar'
    ? 'اكتشف خدماتنا الشاملة: التحول الرقمي، إدارة تكنولوجيا المعلومات، حلول الذكاء الاصطناعي، المشاركة عبر قنوات متعددة، والتعهيد. حلول تقنية متطورة لتحويل أعمالك.'
    : 'Discover our comprehensive services: Digital Transformation, IT Managed Services, AI Solutions, Omnichannel Engagement, and Outsourcing. Cutting-edge technology solutions to transform your business.';
  
  const seoKeywords = language === 'ar'
    ? 'خدمات تقنية معلومات الأردن، خدمات ذكاء اصطناعي، التحول الرقمي، إدارة تكنولوجيا المعلومات، Call Center، Software Solutions'
    : 'IT services Jordan, AI services, Digital Transformation, IT Managed Services, Call Center solutions, Software Solutions, Technology services Amman';

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl="https://www.areebb.com/services"
        language={language}
      />
      <WaveBackground />
      <Navbar />
      <main>
        <ServicesDetailed />
      </main>
      <Footer />
    </div>
  );
}