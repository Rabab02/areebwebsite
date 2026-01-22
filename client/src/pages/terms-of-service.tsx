import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WaveBackground } from "@/components/ui/wave-background";
import { SEO } from "@/components/seo";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function TermsOfServicePage() {
  const { t, language } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <SEO 
        title={t('terms.seo.title')}
        description={t('terms.seo.description')}
        language={language}
      />
      <WaveBackground />
      <Navbar />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Back Button */}
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mb-8 text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              {t('terms.back')}
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('terms.title')}
            </h1>
            <p className="text-white/60 text-sm md:text-base">
              {t('terms.lastUpdated')}: {t('terms.lastUpdatedDate')}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 text-white/80 leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. {t('terms.section1.title')}</h2>
              <p className="mb-4">{t('terms.section1.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. {t('terms.section2.title')}</h2>
              <p className="mb-4">{t('terms.section2.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. {t('terms.section3.title')}</h2>
              <p className="mb-4">{t('terms.section3.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. {t('terms.section4.title')}</h2>
              <p className="mb-4">{t('terms.section4.content')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('terms.section4.item1')}</li>
                <li>{t('terms.section4.item2')}</li>
                <li>{t('terms.section4.item3')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. {t('terms.section5.title')}</h2>
              <p className="mb-4">{t('terms.section5.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. {t('terms.section6.title')}</h2>
              <p className="mb-4">{t('terms.section6.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. {t('terms.section7.title')}</h2>
              <p className="mb-4">{t('terms.section7.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. {t('terms.section8.title')}</h2>
              <p className="mb-4">{t('terms.section8.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. {t('terms.section9.title')}</h2>
              <p className="mb-4">{t('terms.section9.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. {t('terms.section10.title')}</h2>
              <p className="mb-4">{t('terms.section10.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. {t('terms.section11.title')}</h2>
              <p className="mb-4">{t('terms.section11.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. {t('terms.section12.title')}</h2>
              <p className="mb-4">{t('terms.section12.content')}</p>
              <p className="mt-4">
                <strong className="text-white">{t('terms.section12.contact')}:</strong><br />
                <a href="mailto:info@areebb.com" className="text-primary hover:underline">info@areebb.com</a>
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
