import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@assets/Areeb-01_1768386546804.png";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage } = useI18n();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location !== '/') {
      // If not on home page, navigate to home with hash
      window.location.href = `/#${sectionId}`;
      // Scroll will happen after navigation via hash in URL
    } else {
      // If already on home page, scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const scrollToContact = () => {
    if (location !== '/') {
      // If not on home page, navigate to home with contact hash
      window.location.href = '/#contact';
    } else {
      // If already on home page, scroll to contact
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleHomeClick = () => {
    if (location === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleServicesClick = () => {
    if (location === '/services') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 sm:py-4`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <img 
              src={logo} 
              alt="Areeb Technology" 
              className="h-8 sm:h-10 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" onClick={handleHomeClick} className="text-xs lg:text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase tracking-wide">{t('nav.home')}</Link>
            <Link href="/services" onClick={handleServicesClick} className="text-xs lg:text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase tracking-wide">{t('nav.services')}</Link>
            <a onClick={() => scrollToSection('about')} className="text-xs lg:text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase tracking-wide cursor-pointer">{t('nav.about')}</a>
            <a onClick={() => scrollToSection('contact')} className="text-xs lg:text-sm font-bold text-gray-700 hover:text-primary transition-colors uppercase tracking-wide cursor-pointer">{t('nav.contact')}</a>
            
            <Button 
              onClick={scrollToContact}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full px-4 lg:px-6 text-sm transition-transform hover:scale-105"
            >
              {t('nav.getStarted')}
            </Button>

            <div className="w-px h-6 bg-gray-200 mx-2"></div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-bold flex items-center gap-2 text-gray-700 hover:text-primary text-sm"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden lg:inline">{language === 'en' ? 'العربية' : 'English'}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-bold text-gray-700 hover:text-primary"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

          {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 absolute w-full top-full left-0 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
            <Link href="/" onClick={() => { setIsOpen(false); handleHomeClick(); }} className="block text-base sm:text-lg font-bold text-gray-700 hover:text-primary py-2">{t('nav.home')}</Link>
            <Link href="/services" onClick={() => { setIsOpen(false); handleServicesClick(); }} className="block text-base sm:text-lg font-bold text-gray-700 hover:text-primary py-2">{t('nav.services')}</Link>
            <a onClick={() => { scrollToSection('about'); setIsOpen(false); }} className="block text-base sm:text-lg font-bold text-gray-700 hover:text-primary py-2 cursor-pointer">{t('nav.about')}</a>
            <a onClick={() => { scrollToSection('contact'); setIsOpen(false); }} className="block text-base sm:text-lg font-bold text-gray-700 hover:text-primary py-2 cursor-pointer">{t('nav.contact')}</a>
            <Button onClick={() => { scrollToContact(); setIsOpen(false); }} className="w-full rounded-full font-bold text-sm sm:text-base py-6">{t('nav.getStarted')}</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
