import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WaveBackground } from "@/components/ui/wave-background";
import { SEO } from "@/components/seo";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicyPage() {
  const { t, language } = useI18n();

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <SEO 
        title={t('privacy.seo.title')}
        description={t('privacy.seo.description')}
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
              {t('privacy.back')}
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-white/60 text-sm md:text-base">
              {t('privacy.lastUpdated')}: {t('privacy.lastUpdatedDate')}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 text-white/80 leading-relaxed">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. {t('privacy.section1.title')}</h2>
              <p className="mb-4">{t('privacy.section1.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. {t('privacy.section2.title')}</h2>
              <p className="mb-4">{t('privacy.section2.content')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.section2.item1')}</li>
                <li>{t('privacy.section2.item2')}</li>
                <li>{t('privacy.section2.item3')}</li>
                <li>{t('privacy.section2.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. {t('privacy.section3.title')}</h2>
              <p className="mb-4">{t('privacy.section3.content')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.section3.item1')}</li>
                <li>{t('privacy.section3.item2')}</li>
                <li>{t('privacy.section3.item3')}</li>
                <li>{t('privacy.section3.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. {t('privacy.section4.title')}</h2>
              <p className="mb-4">{t('privacy.section4.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. {t('privacy.section5.title')}</h2>
              <p className="mb-4">{t('privacy.section5.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. {t('privacy.section6.title')}</h2>
              <p className="mb-4">{t('privacy.section6.content')}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>{t('privacy.section6.item1')}</li>
                <li>{t('privacy.section6.item2')}</li>
                <li>{t('privacy.section6.item3')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. {t('privacy.section7.title')}</h2>
              <p className="mb-4">{t('privacy.section7.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. {t('privacy.section8.title')}</h2>
              <p className="mb-4">{t('privacy.section8.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. {t('privacy.section9.title')}</h2>
              <p className="mb-4">{t('privacy.section9.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. {t('privacy.section10.title')}</h2>
              <p className="mb-4">{t('privacy.section10.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. {t('privacy.section11.title')}</h2>
              <p className="mb-4">{t('privacy.section11.content')}</p>
              <p className="mt-4">
                <strong className="text-white">{t('privacy.section11.contact')}:</strong><br />
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
