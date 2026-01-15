import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.services": { en: "Services", ar: "خدماتنا" },
  "nav.about": { en: "About", ar: "من نحن" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.getStarted": { en: "Get Started", ar: "ابدأ الآن" },
  "nav.privacy": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "nav.terms": { en: "Terms of Service", ar: "شروط الخدمة" },
  "nav.rights": { en: "Areeb Technology. All rights reserved.", ar: "أريب للتكنولوجيا. جميع الحقوق محفوظة." },

  // Hero Section
  "hero.title.prefix": { en: "Intelligent Tech, ", ar: "تكنولوجيا متطورة، " },
  "hero.title.suffix": { en: "Smart Solutions", ar: "حلول ذكية" },
  "hero.subtitle": { en: "True to our name, we deliver smart, insightful, and skillful technology services that empower your digital transformation.", ar: "اسم على مسمى، نقدم خدمات تقنية ذكية وماهرة لتمكين تحولك الرقمي." },
  "hero.cta.services": { en: "Our Services", ar: "خدماتنا" },
  "hero.cta.product": { en: "Discover Our Voice Agent", ar: "اكتشف الوكيل الصوتي" },
  "hero.trust.global": { en: "Global", ar: "عالمي" },
  "hero.trust.global.desc": { en: "Smart Reach", ar: "وصول ذكي" },
  "hero.trust.rapid": { en: "Rapid", ar: "سريع" },
  "hero.trust.rapid.desc": { en: "Quick Wit", ar: "بديهة حاضرة" },
  "hero.trust.secure": { en: "Secure", ar: "آمن" },
  "hero.trust.secure.desc": { en: "Wise Protection", ar: "حماية حكيمة" },

  // Product Showcase
  "product.badge": { en: "Voice AI Solution", ar: "حلول الذكاء الاصطناعي الصوتي" },
  "product.title.prefix": { en: "Your Intelligent ", ar: "وكيلك الصوتي " },
  "product.title.suffix": { en: "Voice Agent", ar: "الذكية" },
  "product.description": { en: "Transform your customer communication with localized, human-like voice AI agents. Automate calls, schedule appointments, and handle inquiries with natural-sounding conversations in your local dialect.", ar: "حول اتصالات العملاء مع وكلاء الذكاء الاصطناعي الصوتي المحليين. أتمتة المكالمات، وجدولة المواعيد، والتعامل مع الاستفسارات بمحادثات طبيعية بلهجتك المحلية." },
  "product.feature.automated": { en: "Automated Calls", ar: "مكالمات آلية" },
  "product.feature.natural": { en: "Natural Voice", ar: "صوت طبيعي" },
  "product.feature.dialect": { en: "Dialect Support", ar: "دعم اللهجات" },
  "product.feature.analytics": { en: "Real-time Analytics", ar: "تحليلات فورية" },
  "product.cta": { en: "Request Demo", ar: "اطلب عرض توضيحي" },
  "product.demo.incoming": { en: "Incoming Call...", ar: "مكالمة واردة..." },
  "product.demo.agent": { en: "Voice Agent (Localized)", ar: "وكيل صوتي (محلي)" },
  "product.demo.status": { en: "Active Call", ar: "مكالمة نشطة" },

  // Services Section
  "services.subtitle": { en: "Our Capabilities", ar: "قدراتنا" },
  "services.title.prefix": { en: "Innovation ", ar: "الابتكار " },
  "services.title.suffix": { en: "Unleashed", ar: "بلا حدود" },
  "services.description": { en: "We specialize in high-performance digital solutions tailored to evolving market needs.", ar: "نحن متخصصون في الحلول الرقمية عالية الأداء المصممة لتلبية احتياجات السوق المتطورة." },
  "services.card.digital": { en: "Digital Transformation", ar: "التحول الرقمي" },
  "services.card.digital.desc": { en: "Consulting and strategy to digitize processes, automate workflows, and drive innovation across your organization.", ar: "الاستشارات والاستراتيجيات لرقمنة العمليات، وأتمتة سير العمل، ودفع الابتكار عبر مؤسستك." },
  "services.card.managed": { en: "IT Managed Services", ar: "خدمات تكنولوجيا المعلومات المدارة" },
  "services.card.managed.desc": { en: "Reliable, 24/7 technical support, system maintenance, and infrastructure management to ensure business continuity.", ar: "دعم فني موثوق على مدار الساعة، وصيانة النظام، وإدارة البنية التحتية لضمان استمرارية العمل." },
  "services.card.ai": { en: "AI Tools & Solutions", ar: "أدوات وحلول الذكاء الاصطناعي" },
  "services.card.ai.desc": { en: "Deploy cutting-edge AI agents and automation tools to enhance efficiency and modernize operations.", ar: "نشر وكلاء الذكاء الاصطناعي المتطورين وأدوات الأتمتة لتعزيز الكفاءة وتحديث العمليات." },
  "services.card.omni": { en: "Omnichannel Engagement", ar: "المشاركة عبر قنوات متعددة" },
  "services.card.omni.desc": { en: "Seamless customer support experiences across all channels, powered by human-like AI agents.", ar: "تجارب دعم عملاء سلسة عبر جميع القنوات، مدعومة بوكلاء ذكاء اصطناعي يشبهون البشر." },
  "services.card.outsource": { en: "Outsourcing & Staff Augmentation", ar: "التعهيد وزيادة الموظفين" },
  "services.card.outsource.desc": { en: "Scale your team with our skilled IT experts and developers to meet project demands and business goals.", ar: "وسع فريقك بخبراء ومطوري تكنولوجيا المعلومات المهرة لدينا لتلبية متطلبات المشروع وأهداف العمل." },

  // About Section
  "about.areeb.title": { en: "Areeb", ar: "أريب" },
  "about.areeb.meaning": { en: "\"The intelligent, the wise, the skillful.\"", ar: "\"الذكي، العاقل، الماهر.\"" },
  "about.areeb.desc": { en: "Our name reflects our core philosophy. We don't just write code; we apply wisdom, foresight, and sharp intelligence to solve complex challenges.", ar: "اسمنا يعكس فلسفتنا الجوهرية. نحن لا نكتب الكود فقط؛ نحن نطبق الحكمة، وبعد النظر، والذكاء الحاد لحل التحديات المعقدة." },
  "about.feature.design": { en: "Intelligent Design", ar: "تصميم ذكي" },
  "about.feature.design.desc": { en: "Smart solutions that adapt to your business needs.", ar: "حلول ذكية تتكيف مع احتياجات عملك." },
  "about.feature.strategy": { en: "Wise Strategy", ar: "استراتيجية حكيمة" },
  "about.feature.strategy.desc": { en: "Long-term vision over short-term fixes.", ar: "رؤية طويلة المدى بدلاً من الحلول قصيرة المدى." },
  "about.feature.execution": { en: "Skillful Execution", ar: "تنفيذ ماهر" },
  "about.feature.execution.desc": { en: "Precision engineering by expert developers.", ar: "هندسة دقيقة من قبل مطورين خبراء." },
  "about.why.subtitle": { en: "Why \"Areeb\"?", ar: "لماذا \"أريب\"؟" },
  "about.why.title": { en: "Intelligence in Every Interaction", ar: "ذكاء في كل تفاعل" },
  "about.why.p1": { en: "Just as an \"Areeb\" person is quick-witted and handles difficult situations with wisdom, our technology is built to be smart, adaptive, and resilient.", ar: "تمامًا كما أن الشخص \"الأريب\" سريع البديهة ويتعامل مع المواقف الصعبة بحكمة، تم بناء تقنيتنا لتكون ذكية، وقابلة للتكيف، ومرنة." },
  "about.why.p2": { en: "We bring the meaning of our name to life by delivering digital solutions that are not just functional, but truly intelligent—anticipating needs and driving efficiency.", ar: "نحن نجسد معنى اسمنا من خلال تقديم حلول رقمية ليست فقط وظيفية، بل ذكية حقًا - تتوقع الاحتياجات وتدفع الكفاءة." },
  "about.btn.philosophy": { en: "Our Philosophy", ar: "فلسفتنا" },
  "about.btn.start": { en: "Start a Project", ar: "ابدأ مشروعًا" },

  // CTA Section
  "cta.title.prefix": { en: "Ready to ", ar: "مستعد " },
  "cta.title.suffix": { en: "Innovate?", ar: "للابتكار؟" },
  "cta.desc": { en: "Let's discuss how Areeb Tech can help transform your business with our cutting-edge IT solutions.", ar: "دعنا نناقش كيف يمكن لأريب تك المساعدة في تحويل عملك من خلال حلولنا التقنية المتطورة." },
  "cta.form.title": { en: "Send us a message", ar: "أرسل لنا رسالة" },
  "cta.form.name": { en: "Name", ar: "الاسم" },
  "cta.form.name.ph": { en: "John Doe", ar: "الاسم الكامل" },
  "cta.form.email": { en: "Email", ar: "البريد الإلكتروني" },
  "cta.form.email.ph": { en: "john@example.com", ar: "name@example.com" },
  "cta.form.subject": { en: "Subject", ar: "الموضوع" },
  "cta.form.subject.ph": { en: "Project Inquiry", ar: "استفسار عن مشروع" },
  "cta.form.message": { en: "Message", ar: "الرسالة" },
  "cta.form.message.ph": { en: "Tell us about your project...", ar: "أخبرنا عن مشروعك..." },
  "cta.form.submit": { en: "Send Message", ar: "إرسال الرسالة" },

  // Footer
  "footer.desc": { en: "Empowering seamless customer experiences through technology.", ar: "تمكين تجارب عملاء سلسة من خلال التكنولوجيا." },
  "footer.col.services": { en: "Services", ar: "الخدمات" },
  "footer.col.products": { en: "Products", ar: "المنتجات" },
  "footer.col.contact": { en: "Contact", ar: "اتصل بنا" },
  "footer.address": { en: "XVPG+4WH, Abdallah Ben Kaeb St., Amman, Jordan", ar: "XVPG+4WH، شارع عبدالله بن كعب، عمان، الأردن" },
  "footer.product.voice": { en: "Voice Agent", ar: "الوكيل الصوتي" },
  "footer.product.ecommerce": { en: "eCommerce Solutions", ar: "حلول التجارة الإلكترونية" },
  "footer.product.pos": { en: "POS Integration", ar: "تكامل نقاط البيع" },
};

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
