import { 
  Rocket, 
  Server, 
  Bot, 
  MessageSquare, 
  Users,
  CreditCard,
  PhoneCall,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function ServicesDetailed() {
  const { t, language } = useI18n();

  // Regular services
  const regularServices = [
    {
      id: 'service-digital',
      icon: Rocket,
      title: t('services.card.digital'),
      description: t('services.card.digital.desc')
    },
    {
      id: 'service-managed',
      icon: Server,
      title: t('services.card.managed'),
      description: t('services.card.managed.desc')
    },
    {
      id: 'service-ai',
      icon: Bot,
      title: t('services.card.ai'),
      description: t('services.card.ai.desc')
    },
    {
      id: 'service-omni',
      icon: MessageSquare,
      title: t('services.card.omni'),
      description: t('services.card.omni.desc')
    },
    {
      id: 'service-outsource',
      icon: Users,
      title: t('services.card.outsource'),
      description: t('services.card.outsource.desc')
    },
    {
      id: 'service-ecommerce',
      icon: ShoppingCart,
      title: t('services.card.ecommerce'),
      description: t('services.card.ecommerce.desc')
    }
  ];

  // Featured services (POS and Call Center) - displayed differently
  const featuredServices = [
    {
      id: 'service-callcenter',
      icon: PhoneCall,
      title: t('services.card.callcenter'),
      description: t('services.card.callcenter.desc'),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconBg: "from-blue-500/30 to-cyan-500/30",
      features: [
        t('product.feature.automated'),
        t('product.feature.natural'),
        t('product.feature.dialect'),
        t('product.feature.analytics')
      ]
    },
    {
      id: 'service-pos',
      icon: CreditCard,
      title: t('services.card.pos'),
      description: t('services.card.pos.desc'),
      gradient: "from-emerald-500/20 to-green-500/20",
      iconBg: "from-emerald-500/30 to-green-500/30",
      features: [
        t('services.card.pos.feature.integration'),
        t('services.card.pos.feature.payment'),
        t('services.card.pos.feature.inventory'),
        t('services.card.pos.feature.reporting')
      ]
    }
  ];

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-transparent relative">

      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-primary font-bold tracking-wider uppercase mb-4 text-sm sm:text-base">{t('services.subtitle')}</h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            {t('services.title.prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">{t('services.title.suffix')}</span>
          </h1>
          <p className="text-white/60 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Regular Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20">
          {regularServices.map((service, index) => (
            <motion.div
              key={index}
              id={service.id}
              className="scroll-mt-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer h-full hover:scale-[1.02] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                <CardHeader className="p-8 sm:p-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 border border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110">
                    <service.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-white mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-white/60 text-base sm:text-lg leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Services Section - POS and Call Center in unique layout */}
        <div className="space-y-12 sm:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {language === 'ar' ? 'حلولنا المميزة' : 'Featured Solutions'}
            </h3>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'حلول متقدمة مصممة خصيصاً لتلبية احتياجاتك' 
                : 'Advanced solutions designed specifically for your needs'}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                id={service.id}
                className="scroll-mt-24"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
              >
                <Card className={`relative overflow-hidden border-2 border-white/20 bg-gradient-to-br ${service.gradient} backdrop-blur-md group cursor-pointer h-full hover:scale-[0.92] hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20`}>
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <CardHeader className="relative p-10 sm:p-12">
                    {/* Large Icon */}
                    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center mb-8 border-2 border-white/20 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 shadow-xl`}>
                      <service.icon className="h-12 w-12 sm:h-14 sm:w-14 text-white group-hover:scale-110 transition-transform" />
                    </div>

                    {/* Title */}
                    <CardTitle className="text-2xl sm:text-3xl text-white mb-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-white/70 text-lg sm:text-xl leading-relaxed mb-6">
                      {service.description}
                    </CardDescription>

                    {/* Features List */}
                    <div className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/80">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-base sm:text-lg">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a href="/#contact">
                      <Button className="w-full bg-white/10 hover:bg-primary text-white border border-white/20 hover:border-primary font-bold rounded-full py-6 text-base sm:text-lg group/btn">
                        <span>{language === 'ar' ? 'اطلب الآن' : 'Get Started'}</span>
                        <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                      </Button>
                    </a>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 sm:p-12 border border-primary/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t('cta.title.prefix')} <span className="text-primary">{t('cta.title.suffix')}</span>
            </h3>
            <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
              {t('cta.desc')}
            </p>
            <a href="/#contact">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-full px-8 py-4 text-lg transition-transform hover:scale-105">
                {t('nav.getStarted')}
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}