import { 
  Rocket, 
  Server, 
  Bot, 
  MessageSquare, 
  Users,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";

export function Services() {
  const { t } = useI18n();

  const services = [
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 bg-background relative">
       {/* Background accent */}
       <div className="absolute left-0 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-primary font-bold tracking-wider uppercase mb-2 text-sm sm:text-base">{t('services.subtitle')}</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {t('services.title.prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">{t('services.title.suffix')}</span>
            </h3>
          </div>
          <p className="text-white/60 max-w-md text-base sm:text-lg">
             {t('services.description')}
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item} id={service.id} className="scroll-mt-24">
              <Card className="glass-card border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer h-full hover:scale-105">
                <CardHeader className="p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-secondary/50 flex items-center justify-center mb-4 sm:mb-6 border border-white/5 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-300">
                    <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white group-hover:text-primary transition-colors" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-white/50 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
          
          {/* More Button */}
          <motion.div variants={item} className="flex items-center justify-center">
            <Link href="/services">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-6 sm:px-8 py-3 sm:py-4 flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105">
                <span className="text-sm sm:text-base">{t('nav.more')}</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
