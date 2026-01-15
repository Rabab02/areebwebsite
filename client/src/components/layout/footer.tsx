import { Terminal, Github, Twitter, Linkedin, Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react";
import logo from "@assets/Areeb_White-green_1768388319561.png";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-black border-t border-white/10 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          
          <div className="space-y-4 sm:space-y-6">
            <div className="w-fit">
               <img 
                src={logo} 
                alt="Areeb Tech" 
                className="h-8 sm:h-10 w-auto object-contain" 
              />
            </div>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/40 hover:text-primary transition-colors"><Facebook className="h-4 w-4 sm:h-5 sm:w-5" /></a>
              <a href="#" className="text-white/40 hover:text-primary transition-colors"><Instagram className="h-4 w-4 sm:h-5 sm:w-5" /></a>
              <a href="#" className="text-white/40 hover:text-primary transition-colors"><Linkedin className="h-4 w-4 sm:h-5 sm:w-5" /></a>
              <a href="#" className="text-white/40 hover:text-primary transition-colors"><Twitter className="h-4 w-4 sm:h-5 sm:w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">{t('footer.col.services')}</h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors block py-1">{t('services.card.digital')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block py-1">{t('services.card.managed')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block py-1">{t('services.card.ai')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block py-1">{t('services.card.omni')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block py-1">{t('services.card.outsource')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base">{t('footer.col.products')}</h4>
             <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/50">
              <li><a href="#product" className="hover:text-primary transition-colors block py-1">{t('footer.product.voice')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block py-1">{t('footer.product.ecommerce')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block py-1">{t('footer.product.pos')}</a></li>
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
                <a href="mailto:info@areebtech.com" className="hover:text-primary transition-colors break-all">info@areebtech.com</a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <a href="tel:+962777470302" className="hover:text-primary transition-colors">+962 777 470 302</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-white/30 gap-4 sm:gap-0">
          <p>&copy; {new Date().getFullYear()} {t('nav.rights')}</p>
          <div className="flex space-x-6 sm:space-x-8">
            <a href="#" className="hover:text-white transition-colors">{t('nav.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('nav.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
