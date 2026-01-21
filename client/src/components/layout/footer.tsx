import { Mail, MapPin, Phone } from "lucide-react";
import logo from "@assets/Areeb_White-green_1768388319561.png";
import { useI18n } from "@/lib/i18n";
import { useLocation, Link } from "wouter";
import { useCallback } from "react";
import { socialMediaLinks } from "@/lib/social-media";

export function Footer() {
  const { t } = useI18n();
  const [location] = useLocation();

  const scrollToService = useCallback((serviceId: string) => {
    // Try to find the element on the current page
    const element = document.getElementById(serviceId);
    
    if (element) {
      // Element found, scroll to it smoothly
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return;
    }

    // Element not found on current page, navigate to services page
    // Services exist on both pages, but we'll navigate to services page for consistency
    if (location !== '/services') {
      window.location.href = `/services#${serviceId}`;
    } else {
      // Already on services page, element might not be rendered yet
      // Wait a bit and try again
      setTimeout(() => {
        const element = document.getElementById(serviceId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    }
  }, [location]);
  return (
    <footer className="bg-black border-t border-white/10 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          
          <div className="space-y-4 sm:space-y-6">
            <div className="w-fit">
               <img 
                src={logo} 
                alt="Areeb" 
                className="h-8 sm:h-10 w-auto object-contain" 
              />
            </div>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-4">
              {socialMediaLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-white/40 hover:text-primary transition-colors"
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">{t('footer.col.services')}</h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/50">
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToService('service-digital');
                  }}
                  className="hover:text-primary transition-colors block py-1 cursor-pointer"
                >
                  {t('services.card.digital')}
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToService('service-managed');
                  }}
                  className="hover:text-primary transition-colors block py-1 cursor-pointer"
                >
                  {t('services.card.managed')}
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToService('service-ai');
                  }}
                  className="hover:text-primary transition-colors block py-1 cursor-pointer"
                >
                  {t('services.card.ai')}
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToService('service-omni');
                  }}
                  className="hover:text-primary transition-colors block py-1 cursor-pointer"
                >
                  {t('services.card.omni')}
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToService('service-outsource');
                  }}
                  className="hover:text-primary transition-colors block py-1 cursor-pointer"
                >
                  {t('services.card.outsource')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">{t('footer.col.products')}</h4>
             <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/50">
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToService('service-callcenter');
                  }}
                  className="hover:text-primary transition-colors block py-1 cursor-pointer"
                >
                  {t('footer.product.voice')}
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToService('service-ecommerce');
                  }}
                  className="hover:text-primary transition-colors block py-1 cursor-pointer"
                >
                  {t('footer.product.ecommerce')}
                </a>
              </li>
              <li>
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToService('service-pos');
                  }}
                  className="hover:text-primary transition-colors block py-1 cursor-pointer"
                >
                  {t('footer.product.pos')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">{t('footer.col.contact')}</h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/50">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                <span className="break-words">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <a href="mailto:info@areebb.com" className="hover:text-primary transition-colors break-all">info@areebb.com</a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <a href="tel:+962799788261" className="hover:text-primary transition-colors" dir="ltr">+962 799 788 261</a>
              </li>
            </ul>
            <div className="mt-4 sm:mt-6 rounded-lg overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps?q=Al-Madina+Al-Monawara+St+219,+Amman,+Jordan,+XVV9%2B7R&output=embed"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-40 sm:h-48 md:h-56"
                title="Areeb Location"
              ></iframe>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-white/30 gap-4 sm:gap-0">
          <p>&copy; {new Date().getFullYear()} {t('nav.rights')}</p>
          <div className="flex space-x-6 sm:space-x-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">{t('nav.privacy')}</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">{t('nav.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
