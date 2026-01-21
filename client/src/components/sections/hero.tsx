import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Zap, Shield, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden bg-transparent">
      {/* Remove static background elements to let the canvas shine, keep subtle gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top gradient to blend with white navbar */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/5 to-transparent opacity-50"></div>
        
        {/* Bottom gradient mask for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Main Heading with Animated Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] pt-6 sm:pt-8 md:pt-10 drop-shadow-2xl px-2">
              <span className="text-white">{t('hero.title.prefix')}</span>
              <br />
              <span className="animate-text-shimmer bg-[linear-gradient(110deg,#84cc16,45%,#ffffff,55%,#84cc16)] bg-[length:250%_100%] bg-clip-text text-transparent">
                {t('hero.title.suffix')}
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons - Floating Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 px-4"
          >
            <Button size="lg" onClick={scrollToServices} className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 rounded-full text-base sm:text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(132,204,22,0.4)] border border-white/20 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                {t('hero.cta.services')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById("product")?.scrollIntoView({ behavior: "smooth" })} className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 rounded-full text-base sm:text-lg font-medium border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-primary/50 backdrop-blur-sm transition-all hover:scale-105">
              {t('hero.cta.product')}
            </Button>
          </motion.div>

          {/* Trust Metrics */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="relative pt-12 sm:pt-16 mt-12 sm:mt-16 px-4"
          >
             {/* Gradient Divider Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-8">
              {[
                { icon: Globe, title: t('hero.trust.global'), subtitle: t('hero.trust.global.desc') },
                { icon: Zap, title: t('hero.trust.rapid'), subtitle: t('hero.trust.rapid.desc') },
                { icon: Shield, title: t('hero.trust.secure'), subtitle: t('hero.trust.secure.desc') }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="flex justify-center mb-2 sm:mb-3 md:mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="p-1.5 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_20px_rgba(132,204,22,0.2)]">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-0.5 sm:mb-1">{item.title}</h4>
                  <p className="text-[10px] sm:text-xs md:text-sm text-white/50 font-medium px-1 sm:px-2">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
