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
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.services": { en: "Services", ar: "خدماتنا" },
  "nav.about": { en: "About", ar: "من نحن" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },
  "nav.getStarted": { en: "Get Started", ar: "ابدأ الآن" },
  "nav.more": { en: "More", ar: "المزيد" },
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
  "product.title.suffix": { en: "Voice Agent", ar: "الذكي" },
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
  "services.card.digital.desc": { en: "Consulting and strategy to digitize processes, automate workflows, and drive innovation across your organization.", ar: "الاستشارات والاستراتيجيات لأتمتة العمليات وسير العمل، ودفع الابتكار عبر مؤسستك." },
  "services.card.managed": { en: "IT Managed Services", ar: "خدمات إدارة تكنولوجيا المعلومات" },
  "services.card.managed.desc": { en: "Reliable, 24/7 technical support, system maintenance, and infrastructure management to ensure business continuity.", ar: "دعم فني موثوق على مدار الساعة، وصيانة النظام، وإدارة البنية التحتية لضمان استمرارية العمل." },
  "services.card.ai": { en: "AI Tools & Solutions", ar: "أدوات وحلول الذكاء الاصطناعي" },
  "services.card.ai.desc": { en: "Deploy cutting-edge AI agents and automation tools to enhance efficiency and modernize operations.", ar: "نشر وكلاء الذكاء الاصطناعي المتطورين وأدوات الأتمتة لتعزيز الكفاءة وتحديث العمليات." },
  "services.card.omni": { en: "Omnichannel Engagement", ar: "المشاركة عبر قنوات متعددة" },
  "services.card.omni.desc": { en: "Seamless customer support experiences across all channels, powered by human-like AI agents.", ar: "تجارب دعم عملاء سلسة عبر جميع القنوات، مدعومة بوكلاء ذكاء اصطناعي يشبهون البشر." },
  "services.card.outsource": { en: "Outsourcing & Staff Augmentation", ar: "التعهيد وزيادة الموظفين" },
  "services.card.outsource.desc": { en: "Scale your team with our skilled IT experts and developers to meet project demands and business goals.", ar: "وسع فريقك بخبراء ومطوري تكنولوجيا المعلومات المهرة لدينا لتلبية متطلبات المشروع وأهداف العمل." },
  "services.card.ecommerce": { en: "eCommerce Solutions", ar: "حلول التجارة الإلكترونية" },
  "services.card.ecommerce.desc": { en: "Comprehensive eCommerce platform development and integration to establish and grow your online business presence.", ar: "تطوير وتكامل شامل لمنصة التجارة الإلكترونية لإنشاء ونمو وجودك التجاري عبر الإنترنت." },
  "services.card.pos": { en: "Point of Sale (POS) Solutions", ar: "حلول نقاط البيع" },
  "services.card.pos.desc": { en: "Comprehensive POS systems integration and customization to streamline your retail operations and enhance customer checkout experience.", ar: "تكامل وتخصيص شامل لأنظمة نقاط البيع لتبسيط عمليات البيع بالتجزئة وتحسين تجربة دفع العملاء." },
  "services.card.pos.feature.integration": { en: "Integration Solutions", ar: "حلول التكامل" },
  "services.card.pos.feature.payment": { en: "Payment Processing", ar: "معالجة المدفوعات" },
  "services.card.pos.feature.inventory": { en: "Inventory Management", ar: "إدارة المخزون" },
  "services.card.pos.feature.reporting": { en: "Real-time Reporting", ar: "التقارير الفورية" },
  "services.card.callcenter": { en: "Agent Call Center Solutions", ar: "حلول مراكز الاتصال" },
  "services.card.callcenter.desc": { en: "Advanced call center solutions with AI-powered voice agents for automated customer support, appointment scheduling, and inquiry handling.", ar: "حلول متقدمة لمراكز الاتصال مع وكلاء صوت ذكاء اصطناعي لدعم العملاء الآلي، وجدولة المواعيد، والتعامل مع الاستفسارات." },

  // About Section
  "about.areeb.title": { en: "Areeb", ar: "أريب" },
  "about.areeb.meaning": { en: "\"The intelligent, the wise, the skillful.\"", ar: " الذكي، العاقل، الماهر " },
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
  "cta.desc": { en: "Let's discuss how Areeb can help transform your business with our cutting-edge IT solutions.", ar: "دعنا نناقش كيف يمكن لأريب المساعدة في تحويل عملك من خلال حلولنا التقنية المتطورة." },
  "cta.form.title": { en: "Send us a message", ar: "أرسل لنا رسالة" },
  "cta.form.name": { en: "Name", ar: "الاسم" },
  "cta.form.name.ph": { en: "John Doe", ar: "الاسم الكامل" },
  "cta.form.email": { en: "Email", ar: "البريد الإلكتروني" },
  "cta.form.email.ph": { en: "john@example.com", ar: "name@example.com" },
  "cta.form.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "cta.form.phone.ph": { en: "+962 7X XXX XXXX", ar: "+962 7X XXX XXXX" },
  "cta.form.subject": { en: "Subject", ar: "الموضوع" },
  "cta.form.subject.ph": { en: "Project Inquiry", ar: "استفسار عن مشروع" },
  "cta.form.message": { en: "Message", ar: "الرسالة" },
  "cta.form.message.ph": { en: "Tell us about your project...", ar: "أخبرنا عن مشروعك..." },
  "cta.form.submit": { en: "Send Message", ar: "إرسال الرسالة" },
  "cta.form.submitting": { en: "Sending...", ar: "جاري الإرسال..." },
  "cta.form.success.title": { en: "Message Sent!", ar: "تم إرسال الرسالة!" },
  "cta.form.success.description": { en: "Thank you for your message. We'll get back to you soon!", ar: "شكرًا لك على رسالتك. سنتواصل معك قريبًا!" },
  "cta.form.error.title": { en: "Error", ar: "خطأ" },
  "cta.form.error.description": { en: "Failed to send message. Please try again later.", ar: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقًا." },

  // Footer
  "footer.desc": { en: "Empowering seamless customer experiences through technology.", ar: "تمكين تجارب عملاء سلسة من خلال التكنولوجيا." },
  "footer.col.services": { en: "Services", ar: "الخدمات" },
  "footer.col.products": { en: "Products", ar: "المنتجات" },
  "footer.col.contact": { en: "Contact", ar: "اتصل بنا" },
  "footer.address": { en: "Al-Madina Al-Monawara St 219, Amman, XVV9+7R", ar: "شارع المدينة المنورة 219، عمان، XVV9+7R" },
  "footer.product.voice": { en: "Voice Agent", ar: "الوكيل الصوتي" },
  "footer.product.ecommerce": { en: "eCommerce Solutions", ar: "حلول التجارة الإلكترونية" },
  "footer.product.pos": { en: "POS Integration", ar: "تكامل نقاط البيع" },

  // Privacy Policy
  "privacy.seo.title": { en: "Privacy Policy | Areeb", ar: "سياسة الخصوصية | أريب" },
  "privacy.seo.description": { en: "Read our privacy policy to understand how Areeb collects, uses, and protects your personal information.", ar: "اقرأ سياسة الخصوصية الخاصة بنا لفهم كيفية جمع أريب واستخدامها وحماية معلوماتك الشخصية." },
  "privacy.title": { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  "privacy.lastUpdated": { en: "Last Updated", ar: "آخر تحديث" },
  "privacy.lastUpdatedDate": { en: "January 2025", ar: "يناير 2025" },
  "privacy.back": { en: "Back to Home", ar: "العودة للصفحة الرئيسية" },
  "privacy.section1.title": { en: "Introduction", ar: "مقدمة" },
  "privacy.section1.content": { en: "Areeb Technology ('we', 'our', or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.", ar: "أريب للتكنولوجيا ('نحن'، 'لنا'، أو 'خاصتنا') ملتزمة بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وكشفنا وحماية معلوماتك عند زيارة موقعنا الإلكتروني أو استخدام خدماتنا." },
  "privacy.section2.title": { en: "Information We Collect", ar: "المعلومات التي نجمعها" },
  "privacy.section2.content": { en: "We collect information that you provide directly to us, including:", ar: "نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك:" },
  "privacy.section2.item1": { en: "Personal information such as name, email address, and phone number when you contact us", ar: "المعلومات الشخصية مثل الاسم وعنوان البريد الإلكتروني ورقم الهاتف عند التواصل معنا" },
  "privacy.section2.item2": { en: "Information about your business and requirements when requesting services", ar: "معلومات عن عملك ومتطلباتك عند طلب الخدمات" },
  "privacy.section2.item3": { en: "Automatically collected data including IP address, browser type, and usage patterns", ar: "البيانات التي يتم جمعها تلقائيًا بما في ذلك عنوان IP ونوع المتصفح وأنماط الاستخدام" },
  "privacy.section2.item4": { en: "Cookies and similar tracking technologies", ar: "ملفات تعريف الارتباط وتقنيات التتبع المماثلة" },
  "privacy.section3.title": { en: "How We Use Your Information", ar: "كيف نستخدم معلوماتك" },
  "privacy.section3.content": { en: "We use the collected information for various purposes:", ar: "نستخدم المعلومات المجمعة لأغراض متنوعة:" },
  "privacy.section3.item1": { en: "To provide, maintain, and improve our services", ar: "لتقديم خدماتنا والحفاظ عليها وتحسينها" },
  "privacy.section3.item2": { en: "To respond to your inquiries and provide customer support", ar: "للرد على استفساراتك وتقديم دعم العملاء" },
  "privacy.section3.item3": { en: "To send you updates, marketing communications (with your consent), and service-related information", ar: "لإرسال التحديثات والاتصالات التسويقية (بموافقتك) والمعلومات المتعلقة بالخدمة" },
  "privacy.section3.item4": { en: "To comply with legal obligations and protect our rights", ar: "للامتثال للالتزامات القانونية وحماية حقوقنا" },
  "privacy.section4.title": { en: "Information Sharing", ar: "مشاركة المعلومات" },
  "privacy.section4.content": { en: "We do not sell your personal information. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as required by law, or to protect our rights and safety.", ar: "نحن لا نبيع معلوماتك الشخصية. قد نشارك معلوماتك مع مقدمي الخدمات الموثوق بهم الذين يساعدوننا في تشغيل موقعنا وإدارة أعمالنا، أو حسبما يتطلب القانون، أو لحماية حقوقنا وسلامتنا." },
  "privacy.section5.title": { en: "Data Security", ar: "أمن البيانات" },
  "privacy.section5.content": { en: "We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.", ar: "نطبق تدابير أمنية فنية وتنظيمية مناسبة لحماية معلوماتك الشخصية. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100٪، ولا يمكننا ضمان الأمان المطلق." },
  "privacy.section6.title": { en: "Your Rights", ar: "حقوقك" },
  "privacy.section6.content": { en: "You have the right to:", ar: "لديك الحق في:" },
  "privacy.section6.item1": { en: "Access and receive a copy of your personal information", ar: "الوصول والحصول على نسخة من معلوماتك الشخصية" },
  "privacy.section6.item2": { en: "Request correction or deletion of your personal information", ar: "طلب تصحيح أو حذف معلوماتك الشخصية" },
  "privacy.section6.item3": { en: "Opt-out of marketing communications at any time", ar: "إلغاء الاشتراك في الاتصالات التسويقية في أي وقت" },
  "privacy.section7.title": { en: "Cookies and Tracking", ar: "ملفات تعريف الارتباط والتتبع" },
  "privacy.section7.content": { en: "We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookies through your browser settings, but disabling cookies may affect website functionality.", ar: "نستخدم ملفات تعريف الارتباط وتقنيات التتبع المماثلة لتعزيز تجربتك على موقعنا. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح، ولكن تعطيل ملفات تعريف الارتباط قد يؤثر على وظائف الموقع." },
  "privacy.section8.title": { en: "Third-Party Links", ar: "روابط الطرف الثالث" },
  "privacy.section8.content": { en: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.", ar: "قد يحتوي موقعنا على روابط لمواقع الويب التابعة لجهات خارجية. نحن لسنا مسؤولين عن ممارسات الخصوصية لهذه المواقع الخارجية. نشجعك على مراجعة سياسات الخصوصية الخاصة بهم." },
  "privacy.section9.title": { en: "Children's Privacy", ar: "خصوصية الأطفال" },
  "privacy.section9.content": { en: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.", ar: "خدماتنا ليست موجهة للأفراد دون سن 18 عامًا. نحن لا نجمع معلومات شخصية من الأطفال عن علم. إذا كنت تعتقد أننا جمعنا معلومات من طفل، يرجى الاتصال بنا على الفور." },
  "privacy.section10.title": { en: "Updates to This Policy", ar: "تحديثات هذه السياسة" },
  "privacy.section10.content": { en: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date. You are advised to review this policy periodically.", ar: "قد نحدث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات من خلال نشر سياسة الخصوصية الجديدة على هذه الصفحة وتحديث تاريخ 'آخر تحديث'. يُنصح بمراجعة هذه السياسة بشكل دوري." },
  "privacy.section11.title": { en: "Contact Us", ar: "اتصل بنا" },
  "privacy.section11.content": { en: "If you have any questions about this Privacy Policy or our data practices, please contact us.", ar: "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات البيانات الخاصة بنا، يرجى الاتصال بنا." },
  "privacy.section11.contact": { en: "Email", ar: "البريد الإلكتروني" },

  // Terms of Service
  "terms.seo.title": { en: "Terms of Service | Areeb", ar: "شروط الخدمة | أريب" },
  "terms.seo.description": { en: "Read our terms of service to understand the rules and guidelines for using Areeb's services and website.", ar: "اقرأ شروط الخدمة الخاصة بنا لفهم القواعد والإرشادات لاستخدام خدمات أريب وموقعه الإلكتروني." },
  "terms.title": { en: "Terms of Service", ar: "شروط الخدمة" },
  "terms.lastUpdated": { en: "Last Updated", ar: "آخر تحديث" },
  "terms.lastUpdatedDate": { en: "January 2025", ar: "يناير 2025" },
  "terms.back": { en: "Back to Home", ar: "العودة للصفحة الرئيسية" },
  "terms.section1.title": { en: "Acceptance of Terms", ar: "قبول الشروط" },
  "terms.section1.content": { en: "By accessing and using Areeb Technology's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.", ar: "من خلال الوصول إلى موقع أريب للتكنولوجيا واستخدامه وخدماته، تقبل وتوافق على الالتزام بهذه شروط الخدمة. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا." },
  "terms.section2.title": { en: "Service Description", ar: "وصف الخدمة" },
  "terms.section2.content": { en: "Areeb Technology provides IT services, software solutions, AI services, call center solutions, POS integration, and digital transformation services. We reserve the right to modify, suspend, or discontinue any part of our services at any time.", ar: "توفر أريب للتكنولوجيا خدمات تكنولوجيا المعلومات وحلول البرمجيات وخدمات الذكاء الاصطناعي وحلول مراكز الاتصال وتكامل نقاط البيع وخدمات التحول الرقمي. نحتفظ بالحق في تعديل أو تعليق أو إنهاء أي جزء من خدماتنا في أي وقت." },
  "terms.section3.title": { en: "User Accounts and Registration", ar: "حسابات المستخدمين والتسجيل" },
  "terms.section3.content": { en: "When you create an account or provide information to us, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.", ar: "عند إنشاء حساب أو توفير معلومات لنا، فإنك توافق على توفير معلومات دقيقة وحديثة وكاملة. أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك وعن جميع الأنشطة التي تحدث تحت حسابك." },
  "terms.section4.title": { en: "User Conduct", ar: "سلوك المستخدم" },
  "terms.section4.content": { en: "You agree not to:", ar: "أنت توافق على عدم:" },
  "terms.section4.item1": { en: "Use our services for any illegal purpose or in violation of any laws", ar: "استخدام خدماتنا لأي غرض غير قانوني أو انتهاك أي قوانين" },
  "terms.section4.item2": { en: "Interfere with or disrupt our services or servers", ar: "التدخل في خدماتنا أو خوادمنا أو تعطيلها" },
  "terms.section4.item3": { en: "Attempt to gain unauthorized access to any part of our services", ar: "محاولة الحصول على وصول غير مصرح به إلى أي جزء من خدماتنا" },
  "terms.section5.title": { en: "Intellectual Property", ar: "الملكية الفكرية" },
  "terms.section5.content": { en: "All content, trademarks, logos, and intellectual property on our website are owned by Areeb Technology or our licensors. You may not copy, reproduce, or use any content without our express written permission.", ar: "جميع المحتويات والعلامات التجارية والشعارات والملكية الفكرية على موقعنا مملوكة لأريب للتكنولوجيا أو المُرخصين لدينا. لا يجوز لك نسخ أو إعادة إنتاج أو استخدام أي محتوى دون إذننا الكتابي الصريح." },
  "terms.section6.title": { en: "Payment Terms", ar: "شروط الدفع" },
  "terms.section6.content": { en: "Payment terms for our services will be specified in individual service agreements. All fees are non-refundable unless otherwise stated in writing. We reserve the right to change our pricing at any time with notice.", ar: "سيتم تحديد شروط الدفع لخدماتنا في اتفاقيات الخدمة الفردية. جميع الرسوم غير قابلة للاسترداد ما لم يُنص على خلاف ذلك كتابيًا. نحتفظ بالحق في تغيير أسعارنا في أي وقت مع إشعار." },
  "terms.section7.title": { en: "Service Availability", ar: "توفر الخدمة" },
  "terms.section7.content": { en: "We strive to provide reliable services but do not guarantee uninterrupted access. Our services may be unavailable due to maintenance, technical issues, or circumstances beyond our control. We are not liable for any losses resulting from service unavailability.", ar: "نسعى جاهدين لتقديم خدمات موثوقة ولكننا لا نضمن الوصول دون انقطاع. قد تكون خدماتنا غير متاحة بسبب الصيانة أو المشاكل التقنية أو الظروف الخارجة عن سيطرتنا. نحن لسنا مسؤولين عن أي خسائر ناتجة عن عدم توفر الخدمة." },
  "terms.section8.title": { en: "Limitation of Liability", ar: "تقييد المسؤولية" },
  "terms.section8.content": { en: "To the maximum extent permitted by law, Areeb Technology shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount you paid for the specific service in question.", ar: "إلى أقصى حد يسمح به القانون، لن تكون أريب للتكنولوجيا مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية ناتجة عن استخدامك لخدماتنا. لا يجب أن تتجاوز مسؤوليتنا الإجمالية المبلغ الذي دفعته للخدمة المحددة المعنية." },
  "terms.section9.title": { en: "Indemnification", ar: "التعويض" },
  "terms.section9.content": { en: "You agree to indemnify and hold harmless Areeb Technology from any claims, damages, losses, or expenses (including legal fees) arising from your use of our services, violation of these terms, or infringement of any rights of another party.", ar: "أنت توافق على تعويض أريب للتكنولوجيا والدفاع عنها من أي مطالبات أو أضرار أو خسائر أو نفقات (بما في ذلك الرسوم القانونية) الناشئة عن استخدامك لخدماتنا أو انتهاك هذه الشروط أو انتهاك أي حقوق لأطراف أخرى." },
  "terms.section10.title": { en: "Termination", ar: "إنهاء الخدمة" },
  "terms.section10.content": { en: "We reserve the right to suspend or terminate your access to our services at any time, with or without cause, with or without notice. Upon termination, your right to use our services will immediately cease.", ar: "نحتفظ بالحق في تعليق أو إنهاء وصولك إلى خدماتنا في أي وقت، مع أو بدون سبب، مع أو بدون إشعار. عند الإنهاء، سيتوقف حقك في استخدام خدماتنا فورًا." },
  "terms.section11.title": { en: "Governing Law", ar: "القانون الحاكم" },
  "terms.section11.content": { en: "These Terms of Service shall be governed by and construed in accordance with the laws of the Hashemite Kingdom of Jordan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Jordan.", ar: "يجب أن تحكم هذه شروط الخدمة وتفسر وفقًا لقوانين المملكة الأردنية الهاشمية. أي نزاعات تنشأ عن هذه الشروط تخضع للاختصاص الحصري لمحاكم الأردن." },
  "terms.section12.title": { en: "Contact Information", ar: "معلومات الاتصال" },
  "terms.section12.content": { en: "If you have any questions about these Terms of Service, please contact us.", ar: "إذا كان لديك أي أسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا." },
  "terms.section12.contact": { en: "Email", ar: "البريد الإلكتروني" },
};

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Load language from localStorage, default to 'ar' if not set
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('areeb-language') as Language;
      return savedLanguage || 'ar';
    }
    return 'ar';
  });

  // Save language to localStorage whenever it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('areeb-language', lang);
    }
  };

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
