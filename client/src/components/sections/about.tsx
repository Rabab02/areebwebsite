import { Button } from "@/components/ui/button";
import { Check, Lightbulb, Brain, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 bg-black/20 border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
             <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-600 opacity-20 blur-3xl rounded-full" />
             <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-card">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay" />
                <div className="p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
                    {/* Meaning of Areeb Card */}
                    <div className="bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 relative overflow-hidden group hover:border-primary/30 transition-colors">
                      <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10">
                        <Brain className="w-16 h-16 sm:w-24 sm:h-24 text-primary" />
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-primary text-2xl sm:text-3xl">{t('about.areeb.title')}</span>
                      </h4>
                      <p className="text-white/80 italic font-medium mb-2 text-sm sm:text-base">
                        "{t('about.areeb.meaning')}"
                      </p>
                      <p className="text-xs sm:text-sm text-white/50 leading-relaxed">
                        {t('about.areeb.desc')}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4">
                      {[
                        { title: t('about.feature.design'), text: t('about.feature.design.desc') },
                        { title: t('about.feature.strategy'), text: t('about.feature.strategy.desc') },
                        { title: t('about.feature.execution'), text: t('about.feature.execution.desc') }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="mt-1 bg-primary/20 p-2 rounded-lg">
                              <Sparkles className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                              <h4 className="text-base font-bold text-white">{item.title}</h4>
                              <p className="text-sm text-white/60">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 space-y-6 sm:space-y-8"
          >
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm sm:text-base">{t('about.why.subtitle')}</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {t('about.why.title')}
            </h3>
            <p className="text-lg sm:text-xl text-white/60 leading-relaxed">
              {t('about.why.p1')}
            </p>
             <p className="text-base sm:text-lg text-white/50 leading-relaxed">
              {t('about.why.p2')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5 hover:text-white transition-all hover:scale-105 text-sm sm:text-base">{t('about.btn.philosophy')}</Button>
                <Button variant="ghost" onClick={scrollToContact} className="rounded-full text-white hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2 text-sm sm:text-base">
                  {t('about.btn.start')} 
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
