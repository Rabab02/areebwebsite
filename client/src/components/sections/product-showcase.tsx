import { Button } from "@/components/ui/button";
import { Phone, Mic, Podcast, Sparkles, ExternalLink, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function ProductShowcase() {
  const { t } = useI18n();
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="product" className="py-12 sm:py-16 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-10 overflow-hidden relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center relative z-10">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">{t('product.badge')}</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                {t('product.title.prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">{t('product.title.suffix')}</span>
              </h2>
              
              <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                {t('product.description')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2">
                {[
                  { icon: Phone, text: t('product.feature.automated') },
                  { icon: Mic, text: t('product.feature.natural') },
                  { icon: Podcast, text: t('product.feature.dialect') },
                  { icon: Activity, text: t('product.feature.analytics') }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 sm:gap-3 text-white/80 bg-white/5 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/5">
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                    <span className="font-medium text-xs sm:text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 sm:pt-4">
                <Button 
                  onClick={scrollToContact} 
                  size="lg" 
                  className="w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-6 rounded-full text-sm sm:text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(132,204,22,0.4)] border border-white/20 flex items-center justify-center gap-2 group"
                >
                  {t('product.cta')}
                  <Phone className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              {/* Abstract Representation of AI Voice Agent */}
              <div className="relative aspect-square max-w-xs sm:max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-full blur-[60px] opacity-20 animate-pulse duration-[3000ms]" />
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center justify-center h-full gap-4 sm:gap-6"
                >
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary/20 flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(132,204,22,0.5)]">
                        <Mic className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-foreground" />
                      </div>
                    </div>
                    {/* Audio Wave Animation */}
                    <div className="absolute -inset-6 sm:-inset-8 flex items-center justify-center gap-1 opacity-50">
                       {[...Array(5)].map((_, i) => (
                         <motion.div
                           key={i}
                           animate={{ height: [20, 40 + Math.random() * 40, 20] }}
                           transition={{ duration: 0.8 + Math.random() * 0.5, repeat: Infinity, ease: "easeInOut" }}
                           className="w-1 bg-primary rounded-full"
                         />
                       ))}
                    </div>
                  </div>
                  
                  <div className="text-center space-y-1 sm:space-y-2">
                    <h4 className="font-bold text-white text-lg sm:text-xl">{t('product.demo.incoming')}</h4>
                    <p className="text-white/60 text-xs sm:text-sm">{t('product.demo.agent')}</p>
                    <div className="flex items-center justify-center gap-2 text-primary text-xs font-mono bg-primary/10 py-1 px-2 sm:px-3 rounded-full border border-primary/20">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                      00:24 • {t('product.demo.status')}
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4 w-full justify-center">
                     <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 rotate-[135deg]" />
                     </div>
                     <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center animate-bounce">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                     </div>
                  </div>

                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
