import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { About } from "@/components/sections/about";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WaveBackground } from "@/components/ui/wave-background";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { SEO } from "@/components/seo";
import { useToast } from "@/hooks/use-toast";

function CTA() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If not JSON, read as text for error message
        const text = await response.text();
        throw new Error(text || 'Server returned an invalid response');
      }

      if (response.ok && data.success) {
        toast({
          title: t('cta.form.success.title'),
          description: t('cta.form.success.description'),
          variant: "default",
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : t('cta.form.error.description');
      
      toast({
        title: t('cta.form.error.title'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
             <h2 className="text-3xl md:text-5xl font-bold font-heading text-white">{t('cta.title.prefix')} <span className="text-primary">{t('cta.title.suffix')}</span></h2>
             <p className="text-xl text-white/60 max-w-lg leading-relaxed">
               {t('cta.desc')}
             </p>
             
             <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-full border border-white/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg text-white/80">info@areebb.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-full border border-white/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg text-white/80" dir="ltr">+962 799 788 261</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-full border border-white/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg text-white/80">{t('footer.address')}</span>
                </div>
             </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">{t('cta.form.title')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">{t('cta.form.name')}</label>
                  <Input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('cta.form.name.ph')} 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">{t('cta.form.email')}</label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('cta.form.email.ph')} 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary" 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">{t('cta.form.phone')}</label>
                <Input 
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('cta.form.phone.ph')} 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary" 
                />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-white/70">{t('cta.form.subject')}</label>
                 <Input 
                   name="subject"
                   value={formData.subject}
                   onChange={handleChange}
                   placeholder={t('cta.form.subject.ph')} 
                   className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary" 
                   required
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-white/70">{t('cta.form.message')}</label>
                 <Textarea 
                   name="message"
                   value={formData.message}
                   onChange={handleChange}
                   placeholder={t('cta.form.message.ph')} 
                   className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary resize-none" 
                   required
                 />
              </div>
              <Button 
                type="submit"
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin rtl:mr-0 rtl:ml-2" />
                    {t('cta.form.submitting') || 'Sending...'}
                  </>
                ) : (
                  <>
                    {t('cta.form.submit')} <Send className="ml-2 w-4 h-4 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
                  </>
                )}
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const { language, t } = useI18n();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Handle hash navigation when coming from other pages
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1); // Remove the #
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const seoTitle = language === 'ar'
    ? 'أريب | شركة تقنية معلومات وحلول ذكاء اصطناعي في الأردن'
    : 'Areeb | IT & AI Company in Jordan';
  
  const seoDescription = language === 'ar'
    ? 'أريب - شركة تقنية معلومات وحلول ذكاء اصطناعي رائدة في الأردن. متخصصة في حلول البرمجيات، Odoo ERP، حلول مركز الاتصال، أنظمة نقاط البيع، والتحول الرقمي. أفضل شركات تقنية المعلومات في الأردن.'
    : 'Areeb - Leading IT and AI company in Jordan. Specializing in Software Solutions, Odoo ERP, Call Center solutions, Point of Sale (POS) systems, Digital Transformation, and AI-powered technology services. Best IT companies in Jordan.';
  
  const seoKeywords = language === 'ar'
    ? 'شركات تقنية معلومات الأردن، شركات ذكاء اصطناعي الأردن، خدمات تقنية معلومات الأردن، خدمات ذكاء اصطناعي الأردن، حلول برمجيات، Odoo ERP، حلول مركز الاتصال، أنظمة نقاط البيع، التحول الرقمي، خدمات إدارة تكنولوجيا المعلومات'
    : 'IT companies in Jordan, AI companies in Jordan, IT services Jordan, AI services Jordan, Software Solutions, Odoo ERP, Call Center solutions, Agent Call Center, Point of Sale, POS systems, Digital Transformation, IT Managed Services, Voice AI, AI Agents, Technology services Amman, Software development Jordan';

  return (
    <div className="min-h-screen bg-background font-sans relative">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonicalUrl="https://www.areebb.com/"
        language={language}
      />
      <WaveBackground />
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <Services />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
