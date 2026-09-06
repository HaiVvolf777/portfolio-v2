import type { Locale } from "./i18n";

export type RoomId = "lobby" | "about" | "skills" | "experience" | "projects" | "contact";
export type ProjectCategory = "ai" | "platform";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  eyebrow: string;
  description: string;
  tags: string[];
  year?: string;
  url?: string;
  featured?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Dictionary {
  meta: { title: string; description: string };
  common: {
    skipToContent: string;
    navigation: string;
    openMenu: string;
    closeMenu: string;
    theme: string;
    light: string;
    dark: string;
    system: string;
    language: string;
    immersiveView: string;
    staticView: string;
    viewMode: string;
    sceneLabel: string;
    sceneHint: string;
    sceneLoading: string;
    sceneUnavailable: string;
    enterOffice: string;
    exploreRoom: string;
    currentRoom: string;
    close: string;
    previous: string;
    next: string;
    viewProject: string;
    readCaseStudy: string;
    backToProjects: string;
    allProjects: string;
    resume: string;
    copyEmail: string;
    emailCopied: string;
    emailCopyError: string;
    openEmail: string;
    externalLink: string;
    scrollToExplore: string;
    backToTop: string;
    newWork: string;
    current: string;
    builtWith: string;
    room: string;
    visitWebsite: string;
    projectDetails: string;
    reducedMotion: string;
    loading: string;
    experienceYears: string;
    selectedWork: string;
    connect: string;
    contactSuccess: string;
    floor: string;
    officeMap: string;
    online: string;
    featuredProject: string;
    exploreProjects: string;
    startTour: string;
    pauseMotion: string;
    resumeMotion: string;
    technologies: string;
    filterProjects: string;
    selectedProject: string;
    capabilities: string;
    workflow: string;
    projectOverview: string;
  };
  nav: { id: RoomId; label: string; subtitle: string }[];
  hero: {
    eyebrow: string;
    title: [string, string];
    description: string;
    roles: string[];
    primaryCta: string;
    secondaryCta: string;
    status: string;
    location: string;
    scroll: string;
    greeting: string;
    officeLabel: string;
    edition: string;
    available: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    principles: { title: string; description: string }[];
    education: { degree: string; institution: string; period: string };
  };
  skills: {
    eyebrow: string;
    title: string;
    description: string;
    categories: { title: string; items: string[] }[];
  };
  experience: { eyebrow: string; title: string; items: Experience[] };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    filters: { all: string; ai: string; platform: string };
    items: Project[];
  };
  aiCaseStudy: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { number: string; title: string; description: string }[];
    capabilities: string[];
    outcome: string;
    reviewLabel: string;
    technologies: string[];
  };
  achievements: {
    eyebrow: string;
    title: string;
    items: { value: string; label: string; description: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    email: string;
    emailLabel: string;
    location: string;
    links: { label: string; url: string }[];
  };
  experiment: { eyebrow: string; title: string; description: string; tags: string[] };
  footer: { credit: string; backToLobby: string };
}

const en: Dictionary = {
  meta: {
    title: "Haider Ali — Full-stack & AI Developer",
    description: "Enter Haider’s Verse, a walkable 3D portfolio. Full-stack JavaScript engineering, AI products, no-code automation, and system architecture. Currently building at DubiCars.",
  },
  common: {
    skipToContent: "Skip to content",
    navigation: "Office navigation",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    theme: "Appearance",
    light: "Light",
    dark: "Dark",
    system: "System",
    language: "Language",
    immersiveView: "3D office",
    staticView: "Simple view",
    viewMode: "Viewing mode",
    sceneLabel: "Interactive virtual office. Select a room to explore Haider’s work.",
    sceneHint: "Select a room to explore",
    sceneLoading: "Preparing the office…",
    sceneUnavailable: "The simple office view is ready. Explore every section using the navigation.",
    enterOffice: "Enter the office",
    exploreRoom: "Explore room",
    currentRoom: "You are here",
    close: "Close",
    previous: "Previous",
    next: "Next",
    viewProject: "View project",
    readCaseStudy: "Explore the case study",
    backToProjects: "Back to projects",
    allProjects: "All projects",
    resume: "Download résumé",
    copyEmail: "Copy email",
    emailCopied: "Email address copied",
    emailCopyError: "Couldn’t copy the address. You can select it or open your email app.",
    openEmail: "Send an email",
    externalLink: "Opens in a new tab",
    scrollToExplore: "Scroll to explore",
    backToTop: "Back to top",
    newWork: "Recently delivered",
    current: "Current",
    builtWith: "Built with intention",
    room: "Room",
    visitWebsite: "Visit website",
    projectDetails: "Project details",
    reducedMotion: "Reduced motion enabled",
    loading: "Loading…",
    experienceYears: "Years building products",
    selectedWork: "Selected work",
    connect: "Let’s connect",
    contactSuccess: "Your email app is ready to start the conversation.",
    floor: "FLOOR 01",
    officeMap: "Office directory",
    online: "Interactive workspace",
    featuredProject: "FEATURED PROJECT",
    exploreProjects: "Explore projects",
    startTour: "Take a look around",
    pauseMotion: "Reduce motion",
    resumeMotion: "Enable motion",
    technologies: "Technologies",
    filterProjects: "Filter projects",
    selectedProject: "Selected project",
    capabilities: "What I bring",
    workflow: "The experience",
    projectOverview: "Project overview",
  },
  nav: [
    { id: "lobby", label: "The Lobby", subtitle: "Home" },
    { id: "about", label: "My Workspace", subtitle: "About" },
    { id: "skills", label: "Development Lab", subtitle: "Skills" },
    { id: "experience", label: "Experience Wall", subtitle: "Experience" },
    { id: "projects", label: "Project Gallery", subtitle: "Projects" },
    { id: "contact", label: "Let’s Talk", subtitle: "Contact" },
  ],
  hero: {
    eyebrow: "HAIDER ALI / DIGITAL WORKSPACE",
    title: ["Engineering ideas.", "Into reality."],
    description: "I build the systems behind meaningful digital experiences. From full-stack products to AI agents and intelligent automation.",
    roles: ["Full-stack JavaScript developer", "AI developer", "No-code automation developer", "System architect"],
    primaryCta: "Explore my work",
    secondaryCta: "Let’s build something",
    status: "Building at DubiCars · AI Ambassador",
    location: "Islamabad, Pakistan",
    scroll: "A workspace worth exploring",
    greeting: "Hi, I’m Haider.",
    officeLabel: "THE VIRTUAL OFFICE",
    edition: "PORTFOLIO / 2026",
    available: "Let’s build something meaningful",
  },
  about: {
    eyebrow: "01 / MY WORKSPACE",
    title: "From the first idea to the final deploy.",
    paragraphs: [
      "I’m Haider, a full-stack JavaScript and AI developer based in Islamabad. I work across product interfaces, APIs, databases, automation, and system architecture to turn complex requirements into useful software.",
      "At DubiCars, I build for a high-traffic automotive marketplace and serve as the engineering team’s AI Ambassador. My work spans AI-assisted vehicle listings, payments, seller journeys, platform modernization, and web performance.",
      "I care about the entire system: how it feels to use, how it behaves under pressure, and how confidently the next engineer can change it.",
    ],
    principles: [
      { title: "Own the whole journey", description: "Connect the interface, backend, and delivery pipeline around a clear product outcome." },
      { title: "Make intelligence useful", description: "Build AI and automation around real workflows, with people in control of the decisions." },
      { title: "Design for what comes next", description: "Keep systems modular, observable, and practical to maintain." },
    ],
    education: { degree: "BS Software Engineering", institution: "COMSATS University Islamabad, Abbottabad Campus", period: "2018 — 2022" },
  },
  skills: {
    eyebrow: "02 / DEVELOPMENT LAB",
    title: "The tools behind the thinking.",
    description: "A connected stack for shipping products, integrating intelligence, and keeping systems moving.",
    categories: [
      { title: "Interfaces & experiences", items: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular", "React Native", "Electron", "Tailwind CSS", "Core Web Vitals"] },
      { title: "Backend & system architecture", items: ["Node.js", "Express", "FastAPI", "REST APIs", "Microservices", "SSR / CSR", "WebSockets", "Prisma", "Sequelize"] },
      { title: "AI & workflow automation", items: ["AI agents", "RAG pipelines", "Prompt engineering", "Google ADK · familiarity", "n8n", "Make.com", "Opal", "Custom connectors"] },
      { title: "Data & infrastructure", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "AWS", "Google Cloud Run", "DigitalOcean", "Docker · working knowledge", "GitHub Actions", "Cloudflare"] },
    ],
  },
  experience: {
    eyebrow: "03 / EXPERIENCE WALL",
    title: "Built in the real world.",
    items: [
      { company: "DubiCars", role: "Software Engineer · AI Ambassador", period: "Jul 2025 — Present", location: "Dubai, UAE · Hybrid", description: "Production engineering for a high-traffic GCC automotive marketplace.", highlights: ["Delivered AI-assisted ad posting that turns vehicle photos into an editable listing.", "Led Checkout.com integration and added Tabby and Apple Pay, contributing to an approximately 10% increase in organizational revenue.", "Modernized legacy JavaScript into modular React services and improved Core Web Vitals across key journeys.", "Built seller onboarding, ad import, VIP listing, and authentication experiences while championing AI adoption across engineering."] },
      { company: "9D Technologies", role: "Software Engineer", period: "May 2023 — Jul 2025", location: "Rawalpindi, Pakistan", description: "Full-stack web products, real-time systems, and cross-platform desktop applications.", highlights: ["Reduced web application page load time by 45% and increased user engagement by 25% through performance improvements.", "Built a Node.js and WebSocket backend for family location sharing and group chat.", "Shipped an Electron and OpenVPN desktop application across Windows, macOS, and Linux, plus a companion Chrome extension.", "Completed CASA security assessment work for an Android gallery app integrating cloud storage."] },
      { company: "Status200", role: "Associate Software Engineer", period: "Dec 2022 — Jul 2023", location: "Lahore, Pakistan", description: "Full-stack JavaScript delivery across multiple frameworks and client projects.", highlights: ["Built frontend and backend features and integrated REST APIs.", "Contributed to code reviews, technical documentation, and collaborative Git workflows."] },
      { company: "The Skynth", role: "Web 3.0 Intern", period: "Aug 2022 — Dec 2022", location: "Remote", description: "Early product work at the intersection of React, Next.js, and Web3.", highlights: ["Developed Ethereum dApp features and wallet integration for an NFT project.", "Built React and Next.js interfaces and worked with smart-contract interactions."] },
    ],
  },
  projects: {
    eyebrow: "04 / PROJECT GALLERY",
    title: "Ideas, shipped.",
    description: "A selection of platforms, intelligent workflows, and experiences I’ve helped bring to life.",
    filters: { all: "All work", ai: "AI & automation", platform: "Platforms & experiences" },
    items: [
      { id: "dubicars-ai", title: "AI Ad Posting", category: "ai", eyebrow: "DUBICARS / PRODUCTION FEATURE", description: "From vehicle photos to a ready-to-review listing. AI identifies vehicle details, suggests features, and helps dealers create ads while keeping every field editable.", tags: ["AI image analysis", "Vehicle listings", "English / Arabic", "Human review"], url: "https://www.dubicars.com/", featured: true },
      { id: "kyc-agent", title: "KYC Onboarding Agent", category: "ai", eyebrow: "AI / DOCUMENT WORKFLOWS", description: "An end-to-end onboarding agent with retrieval over identity documents, an operator interface, and a FastAPI backend deployed on Google Cloud Run.", tags: ["RAG", "FastAPI", "Streamlit", "Google Cloud Run"], url: "https://kyc-ui-424105745513.asia-southeast1.run.app/" },
      { id: "n8n", title: "Workflow Automations", category: "ai", eyebrow: "AUTOMATION / CONNECTED SYSTEMS", description: "Production n8n workflows and a custom connector for business processes across services, with idempotency, retry handling, and reliable data synchronization.", tags: ["n8n", "Custom connectors", "Webhooks", "REST APIs"] },
      { id: "sober-house", title: "Sober House Hub", category: "platform", eyebrow: "FULL-STACK / MARKETPLACE", description: "A marketplace for sober living communities, connecting a React interface and PostgreSQL backend with Stripe payments and automated delivery.", tags: ["React", "Vite", "PostgreSQL", "Stripe", "DigitalOcean"], url: "https://dev.soberhousehub.com/home" },
      { id: "bolt-vpn", title: "Bolt VPN", category: "platform", eyebrow: "DESKTOP / CONNECTIVITY", description: "A cross-platform consumer VPN with an Electron desktop app, a Laravel and SQL backend, a companion Chrome extension, and automated builds and releases.", tags: ["React", "Electron", "Laravel", "Chrome APIs", "CI/CD"], url: "https://boltvpn.org/" },
      { id: "al-khalijia", title: "Al Khalijia", category: "platform", eyebrow: "FULL-STACK / COMMERCE", description: "A marketing and commerce platform built with React and Vite, backed by PostgreSQL and an ORM, with a repeatable CI/CD deployment pipeline.", tags: ["React", "Vite", "PostgreSQL", "ORM", "CI/CD"], url: "https://khalijiah.com/" },
      { id: "c-parker", title: "C-Parker", category: "platform", eyebrow: "WEB3 / MARKETPLACE", description: "A decentralized marketplace with wallet integration and interfaces that stay in sync with live smart-contract events.", tags: ["React", "Web3", "Wallet integration", "Smart contracts"], url: "https://c-parker-omega.vercel.app/" },
      { id: "empyryal", title: "Empyryal Exchange", category: "platform", eyebrow: "CREATIVE DEVELOPMENT / 3D", description: "An animated 3D website exploring expressive interfaces and spatial interaction through React and Three.js.", tags: ["React", "Three.js", "3D interaction", "Animation"] },
    ],
  },
  aiCaseStudy: {
    eyebrow: "FEATURED / RECENTLY DELIVERED AT DUBICARS",
    title: "The next listing starts with a photo.",
    description: "An AI-assisted ad posting experience for dealers. Vehicle images become structured listing information, with a clear review process and a manual route throughout.",
    steps: [
      { number: "01", title: "Upload & set the context", description: "Start from Inventory, upload vehicle photos, and select regional specs and model year. Preview, edit, and reorder images with photography guidance close at hand." },
      { number: "02", title: "Let AI do the groundwork", description: "Image analysis identifies vehicle details and trim while the dealer continues with available fields. Progress and completion messages make the process visible." },
      { number: "03", title: "Review with confidence", description: "Review pre-filled details, specifications, features, pricing, and description. Confidence indicators and market valuation support informed decisions." },
      { number: "04", title: "Stay in control & publish", description: "Edit or override any value, save a draft, or publish. If detection falls short, manual selection keeps the listing moving without restarting." },
    ],
    capabilities: ["Vehicle and trim detection", "JATO data and AI-inferred features", "Confidence indicators", "Market valuation support", "Manual fallback at any stage", "English and Arabic with RTL support", "Additional information auto-translation", "Responsive dealer workflow"],
    outcome: "A guided path from photos to publishing that reduces repetitive data entry and keeps the dealer in control of the final listing.",
    reviewLabel: "AI assists. The dealer decides.",
    technologies: ["Image analysis", "Structured vehicle data", "JATO", "Human-in-the-loop", "Localization"],
  },
  achievements: {
    eyebrow: "PROOF / SELECTED IMPACT",
    title: "Engineering that makes a difference.",
    items: [
      { value: "≈10%", label: "Revenue lift contribution", description: "Payments modernization at DubiCars: Checkout.com, Tabby, and Apple Pay expanded coverage and improved conversion." },
      { value: "45%", label: "Less page load time", description: "Performance improvements at 9D Technologies through code splitting, lazy loading, and asset optimization." },
      { value: "4+", label: "Years building products", description: "Experience across marketplaces, desktop applications, Web3, AI agents, and production automation." },
    ],
  },
  contact: {
    eyebrow: "05 / CONTACT ROOM",
    title: "Let’s build what’s next.",
    description: "Have a product to bring to life, a system to rethink, or a workflow that could work smarter? Let’s talk.",
    email: "haiderali7102k@gmail.com",
    emailLabel: "Drop me a line",
    location: "Based in Islamabad, Pakistan",
    links: [ { label: "GitHub", url: "https://github.com/HaiVvolf777" }, { label: "LinkedIn", url: "https://linkedin.com/in/haider---ali" } ],
  },
  experiment: {
    eyebrow: "THE EXPLORATION CORNER",
    title: "Always making room for the next idea.",
    description: "My current interests include useful AI agents, retrieval-augmented systems, prompt engineering, and automation that gives people more time for meaningful work.",
    tags: ["Agent architectures", "RAG", "AI-first workflows"],
  },
  footer: { credit: "Haider Ali. A personal workspace on the web.", backToLobby: "Back to the lobby" },
};

const ar: Dictionary = {
  meta: {
    title: "حيدر علي — مطور متكامل ومطور ذكاء اصطناعي",
    description: "استكشف المكتب الافتراضي لحيدر علي. تطوير JavaScript المتكامل ومنتجات الذكاء الاصطناعي والأتمتة دون برمجة وهندسة الأنظمة. يعمل حاليًا في DubiCars.",
  },
  common: {
    floor: "الطابق 01", officeMap: "دليل المكتب", online: "مساحة عمل تفاعلية", featuredProject: "مشروع مميز", exploreProjects: "استكشف المشاريع", startTour: "ألقِ نظرة حولك", pauseMotion: "تقليل الحركة", resumeMotion: "تفعيل الحركة", technologies: "التقنيات", filterProjects: "تصفية المشاريع", selectedProject: "المشروع المحدد", capabilities: "ما أقدمه", workflow: "التجربة", projectOverview: "نظرة عامة على المشروع",
    skipToContent: "انتقل إلى المحتوى", navigation: "التنقل في المكتب", openMenu: "فتح قائمة التنقل", closeMenu: "إغلاق قائمة التنقل", theme: "المظهر", light: "فاتح", dark: "داكن", system: "النظام", language: "اللغة", immersiveView: "مكتب ثلاثي الأبعاد", staticView: "عرض مبسط", viewMode: "وضع العرض", sceneLabel: "مكتب افتراضي تفاعلي. اختر غرفة لاستكشاف أعمال حيدر.", sceneHint: "اختر غرفة للاستكشاف", sceneLoading: "جارٍ تجهيز المكتب…", sceneUnavailable: "العرض المبسط جاهز. استكشف جميع الأقسام عبر قائمة التنقل.", enterOffice: "ادخل المكتب", exploreRoom: "استكشف الغرفة", currentRoom: "أنت هنا", close: "إغلاق", previous: "السابق", next: "التالي", viewProject: "عرض المشروع", readCaseStudy: "استكشف دراسة الحالة", backToProjects: "العودة إلى المشاريع", allProjects: "جميع المشاريع", resume: "تنزيل السيرة الذاتية", copyEmail: "نسخ البريد الإلكتروني", emailCopied: "تم نسخ البريد الإلكتروني", emailCopyError: "تعذر نسخ العنوان. يمكنك تحديده أو فتح تطبيق البريد الإلكتروني.", openEmail: "أرسل بريدًا إلكترونيًا", externalLink: "يفتح في علامة تبويب جديدة", scrollToExplore: "مرر للاستكشاف", backToTop: "العودة إلى الأعلى", newWork: "تم إنجازه مؤخرًا", current: "حاليًا", builtWith: "بُني بعناية", room: "غرفة", visitWebsite: "زيارة الموقع", projectDetails: "تفاصيل المشروع", reducedMotion: "الحركة المخففة مفعلة", loading: "جارٍ التحميل…", experienceYears: "سنوات في بناء المنتجات", selectedWork: "أعمال مختارة", connect: "لنتواصل", contactSuccess: "تطبيق البريد جاهز لبدء المحادثة.",
  },
  nav: [
    { id: "lobby", label: "الردهة", subtitle: "الرئيسية" }, { id: "about", label: "مساحة عملي", subtitle: "نبذة عني" }, { id: "skills", label: "مختبر التطوير", subtitle: "المهارات" }, { id: "experience", label: "جدار الخبرات", subtitle: "الخبرة" }, { id: "projects", label: "معرض المشاريع", subtitle: "المشاريع" }, { id: "contact", label: "لنتحدث", subtitle: "تواصل" },
  ],
  hero: {
    greeting: "مرحبًا، أنا حيدر.", officeLabel: "المكتب الافتراضي", edition: "ملف الأعمال / 2026", available: "لنبنِ شيئًا ذا قيمة",
    eyebrow: "حيدر علي / مساحة عمل رقمية", title: ["أهندس الأفكار.", "وأحوّلها إلى واقع."], description: "أبني الأنظمة التي تدعم تجارب رقمية مفيدة، من المنتجات المتكاملة إلى وكلاء الذكاء الاصطناعي والأتمتة الذكية.", roles: ["مطور JavaScript متكامل", "مطور ذكاء اصطناعي", "مطور أتمتة دون برمجة", "مهندس معماري للأنظمة"], primaryCta: "استكشف أعمالي", secondaryCta: "لنبنِ شيئًا معًا", status: "أعمل في DubiCars · سفير الذكاء الاصطناعي", location: "إسلام آباد، باكستان", scroll: "مساحة عمل تستحق الاستكشاف",
  },
  about: {
    eyebrow: "01 / مساحة عملي", title: "من الفكرة الأولى إلى الإطلاق النهائي.",
    paragraphs: ["أنا حيدر، مطور JavaScript متكامل ومطور ذكاء اصطناعي مقيم في إسلام آباد. أعمل على الواجهات وواجهات API وقواعد البيانات والأتمتة وهندسة الأنظمة لتحويل المتطلبات المعقدة إلى برمجيات مفيدة.", "في DubiCars، أبني حلولًا لسوق سيارات ذي زيارات كثيفة وأعمل سفيرًا للذكاء الاصطناعي في الفريق الهندسي. يشمل عملي إعلانات السيارات بمساعدة الذكاء الاصطناعي والمدفوعات وتجارب البائعين وتحديث المنصة وأداء الويب.", "أهتم بالنظام كاملًا: سهولة استخدامه، وسلوكه تحت الضغط، وقدرة المهندس التالي على تطويره بثقة."],
    principles: [ { title: "امتلاك الرحلة كاملة", description: "ربط الواجهة والخدمات الخلفية ومسار الإطلاق بهدف واضح للمنتج." }, { title: "ذكاء يخدم الاستخدام", description: "بناء الذكاء الاصطناعي والأتمتة حول سير عمل حقيقي، مع بقاء القرارات بيد الإنسان." }, { title: "تصميم قابل للتطور", description: "أنظمة معيارية يسهل مراقبتها وصيانتها وتطويرها." } ],
    education: { degree: "بكالوريوس هندسة البرمجيات", institution: "جامعة COMSATS إسلام آباد، حرم أبوت آباد", period: "2018 — 2022" },
  },
  skills: {
    eyebrow: "02 / مختبر التطوير", title: "الأدوات وراء الأفكار.", description: "مجموعة تقنيات مترابطة لإطلاق المنتجات ودمج الذكاء وضمان استمرارية الأنظمة.",
    categories: [
      { title: "الواجهات والتجارب", items: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular", "React Native", "Electron", "Tailwind CSS", "مؤشرات أداء الويب الأساسية"] },
      { title: "الخدمات الخلفية وهندسة الأنظمة", items: ["Node.js", "Express", "FastAPI", "REST APIs", "الخدمات المصغرة", "SSR / CSR", "WebSockets", "Prisma", "Sequelize"] },
      { title: "الذكاء الاصطناعي وأتمتة سير العمل", items: ["وكلاء الذكاء الاصطناعي", "مسارات RAG", "هندسة الأوامر", "Google ADK · إلمام", "n8n", "Make.com", "Opal", "موصلات مخصصة"] },
      { title: "البيانات والبنية التحتية", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "AWS", "Google Cloud Run", "DigitalOcean", "Docker · معرفة عملية", "GitHub Actions", "Cloudflare"] },
    ],
  },
  experience: {
    eyebrow: "03 / جدار الخبرات", title: "خبرة تصنعها المشاريع الحقيقية.",
    items: [
      { company: "DubiCars", role: "مهندس برمجيات · سفير الذكاء الاصطناعي", period: "يوليو 2025 — الآن", location: "دبي، الإمارات · عمل هجين", description: "هندسة أنظمة إنتاج لسوق سيارات يخدم الخليج ويستقبل زيارات كثيفة.", highlights: ["أنجزت نشر الإعلانات بمساعدة الذكاء الاصطناعي لتحويل صور السيارات إلى إعلانات قابلة للتعديل.", "قدت دمج Checkout.com وإضافة Tabby وApple Pay، بما ساهم في زيادة تقارب 10% في إيرادات المؤسسة.", "حدّثت JavaScript القديم إلى خدمات React معيارية وحسّنت مؤشرات أداء الويب في المسارات الأساسية.", "طورت تجارب تسجيل البائعين واستيراد الإعلانات وقوائم VIP والمصادقة، مع دعم تبني الذكاء الاصطناعي في الفريق."] },
      { company: "9D Technologies", role: "مهندس برمجيات", period: "مايو 2023 — يوليو 2025", location: "راولبندي، باكستان", description: "منتجات ويب متكاملة وأنظمة فورية وتطبيقات سطح مكتب متعددة المنصات.", highlights: ["خفضت زمن تحميل تطبيق ويب بنسبة 45% وزدت تفاعل المستخدمين بنسبة 25% عبر تحسينات الأداء.", "بنيت خدمات خلفية باستخدام Node.js وWebSockets لمشاركة مواقع أفراد العائلة والمحادثات الجماعية.", "أطلقت تطبيق Electron وOpenVPN على Windows وmacOS وLinux مع إضافة Chrome مرافقة.", "أكملت أعمال تقييم أمان CASA لتطبيق معرض صور Android يدمج خدمات التخزين السحابي."] },
      { company: "Status200", role: "مهندس برمجيات مساعد", period: "ديسمبر 2022 — يوليو 2023", location: "لاهور، باكستان", description: "تطوير JavaScript متكامل باستخدام أطر متعددة لمشاريع العملاء.", highlights: ["طورت ميزات للواجهات والخدمات الخلفية ودمجت واجهات REST API.", "ساهمت في مراجعة الشيفرة والتوثيق التقني وسير العمل التعاوني باستخدام Git."] },
      { company: "The Skynth", role: "متدرب Web 3.0", period: "أغسطس 2022 — ديسمبر 2022", location: "عن بُعد", description: "بدايات عملية تجمع بين React وNext.js وWeb3.", highlights: ["طورت ميزات لتطبيقات Ethereum اللامركزية ودمج المحافظ لمشروع NFT.", "بنيت واجهات React وNext.js وعملت على التفاعل مع العقود الذكية."] },
    ],
  },
  projects: {
    eyebrow: "04 / معرض المشاريع", title: "أفكار وصلت إلى المستخدمين.", description: "مجموعة من المنصات وسير العمل الذكي والتجارب التي ساهمت في بنائها.", filters: { all: "جميع الأعمال", ai: "الذكاء الاصطناعي والأتمتة", platform: "المنصات والتجارب" },
    items: [
      { id: "dubicars-ai", title: "نشر الإعلانات بالذكاء الاصطناعي", category: "ai", eyebrow: "DUBICARS / ميزة قيد الاستخدام", description: "من صور السيارة إلى إعلان جاهز للمراجعة. يحدد الذكاء الاصطناعي تفاصيل السيارة ويقترح الميزات ويساعد التجار على إنشاء إعلانات تظل جميع حقولها قابلة للتعديل.", tags: ["تحليل الصور بالذكاء الاصطناعي", "إعلانات السيارات", "العربية / الإنجليزية", "مراجعة بشرية"], url: "https://www.dubicars.com/", featured: true },
      { id: "kyc-agent", title: "وكيل التحقق من هوية العملاء", category: "ai", eyebrow: "ذكاء اصطناعي / معالجة المستندات", description: "وكيل متكامل لبدء إجراءات التحقق، مع استرجاع معلومات من وثائق الهوية وواجهة للمشغل وخدمات FastAPI منشورة على Google Cloud Run.", tags: ["RAG", "FastAPI", "Streamlit", "Google Cloud Run"], url: "https://kyc-ui-424105745513.asia-southeast1.run.app/" },
      { id: "n8n", title: "أتمتة سير العمل", category: "ai", eyebrow: "أتمتة / أنظمة مترابطة", description: "مسارات n8n وموصل مخصص لأتمتة العمليات بين الخدمات، مع منع التكرار ومعالجة إعادة المحاولة ومزامنة موثوقة للبيانات.", tags: ["n8n", "موصلات مخصصة", "Webhooks", "REST APIs"] },
      { id: "sober-house", title: "Sober House Hub", category: "platform", eyebrow: "تطوير متكامل / سوق إلكتروني", description: "منصة لمجتمعات السكن الداعم للتعافي، تربط واجهة React وقاعدة PostgreSQL بمدفوعات Stripe ومسار إطلاق آلي.", tags: ["React", "Vite", "PostgreSQL", "Stripe", "DigitalOcean"], url: "https://dev.soberhousehub.com/home" },
      { id: "bolt-vpn", title: "Bolt VPN", category: "platform", eyebrow: "سطح المكتب / الاتصال", description: "منتج VPN متعدد المنصات يضم تطبيق Electron وخدمات Laravel وSQL وإضافة Chrome مرافقة مع أتمتة البناء والإصدارات.", tags: ["React", "Electron", "Laravel", "Chrome APIs", "CI/CD"], url: "https://boltvpn.org/" },
      { id: "al-khalijia", title: "الخليجية", category: "platform", eyebrow: "تطوير متكامل / تجارة", description: "منصة تسويق وتجارة مبنية باستخدام React وVite، تدعمها PostgreSQL وORM ومسار CI/CD لإطلاقات قابلة للتكرار.", tags: ["React", "Vite", "PostgreSQL", "ORM", "CI/CD"], url: "https://khalijiah.com/" },
      { id: "c-parker", title: "C-Parker", category: "platform", eyebrow: "WEB3 / سوق إلكتروني", description: "سوق لامركزي يدمج المحافظ ويحدّث الواجهات فورًا لتبقى متزامنة مع أحداث العقود الذكية.", tags: ["React", "Web3", "دمج المحافظ", "العقود الذكية"], url: "https://c-parker-omega.vercel.app/" },
      { id: "empyryal", title: "Empyryal Exchange", category: "platform", eyebrow: "تطوير إبداعي / ثلاثي الأبعاد", description: "موقع متحرك ثلاثي الأبعاد يستكشف الواجهات التعبيرية والتفاعل المكاني باستخدام React وThree.js.", tags: ["React", "Three.js", "تفاعل ثلاثي الأبعاد", "رسوم متحركة"] },
    ],
  },
  aiCaseStudy: {
    eyebrow: "مشروع مميز / أُنجز مؤخرًا في DUBICARS", title: "الإعلان التالي يبدأ بصورة.", description: "تجربة نشر إعلانات بمساعدة الذكاء الاصطناعي للتجار. تتحول صور السيارة إلى بيانات منظمة، مع مراجعة واضحة وإمكانية الإدخال اليدوي طوال العملية.",
    steps: [
      { number: "01", title: "ارفع الصور وحدد السياق", description: "ابدأ من المخزون وارفع صور السيارة وحدد المواصفات الإقليمية وسنة الموديل. عاين الصور وعدّلها وأعد ترتيبها مع إرشادات تصوير متاحة بسهولة." },
      { number: "02", title: "دع الذكاء الاصطناعي يبدأ العمل", description: "يحدد تحليل الصور تفاصيل السيارة وفئتها بينما يواصل التاجر تعبئة الحقول المتاحة. توضح مؤشرات التقدم والإشعارات حالة العملية." },
      { number: "03", title: "راجع المعلومات بثقة", description: "راجع التفاصيل والمواصفات والميزات والتسعير والوصف المعبأة تلقائيًا. تدعم مؤشرات الثقة والتقييم السوقي اتخاذ القرار." },
      { number: "04", title: "تحكم في النتيجة وانشر", description: "عدّل أي قيمة أو استبدلها واحفظ مسودة أو انشر. إذا لم ينجح التعرف، يتيح الاختيار اليدوي متابعة الإعلان دون البدء مجددًا." },
    ],
    capabilities: ["التعرف على السيارة وفئتها", "ميزات من بيانات JATO واستنتاجات الذكاء الاصطناعي", "مؤشرات الثقة", "دعم التقييم السوقي", "مسار يدوي في أي مرحلة", "العربية والإنجليزية مع دعم RTL", "ترجمة آلية للمعلومات الإضافية", "تجربة متجاوبة للتجار"], outcome: "مسار موجه من الصور إلى النشر، يقلل إدخال البيانات المتكرر ويبقي القرار النهائي بيد التاجر.", reviewLabel: "الذكاء الاصطناعي يساعد. والتاجر يقرر.", technologies: ["تحليل الصور", "بيانات سيارات منظمة", "JATO", "مراجعة بشرية", "توطين"],
  },
  achievements: {
    eyebrow: "نتائج / أثر مختار", title: "هندسة تحدث فرقًا.",
    items: [
      { value: "≈10%", label: "مساهمة في زيادة الإيرادات", description: "تحديث المدفوعات في DubiCars عبر Checkout.com وTabby وApple Pay وسّع التغطية وحسّن التحويل." },
      { value: "45%", label: "انخفاض زمن تحميل الصفحات", description: "تحسينات أداء في 9D Technologies باستخدام تقسيم الشيفرة والتحميل الكسول وتحسين الأصول." },
      { value: "4+", label: "سنوات في بناء المنتجات", description: "خبرة في الأسواق الإلكترونية وتطبيقات سطح المكتب وWeb3 ووكلاء الذكاء الاصطناعي والأتمتة الإنتاجية." },
    ],
  },
  contact: { eyebrow: "05 / غرفة التواصل", title: "لنبنِ ما يأتي بعد ذلك.", description: "لديك فكرة منتج أو نظام يحتاج إلى إعادة تفكير أو سير عمل يمكن تحسينه؟ لنتحدث.", email: "haiderali7102k@gmail.com", emailLabel: "أرسل لي رسالة", location: "مقيم في إسلام آباد، باكستان", links: [ { label: "GitHub", url: "https://github.com/HaiVvolf777" }, { label: "LinkedIn", url: "https://linkedin.com/in/haider---ali" } ] },
  experiment: { eyebrow: "ركن الاستكشاف", title: "دائمًا مساحة للفكرة التالية.", description: "تشمل اهتماماتي الحالية وكلاء ذكاء اصطناعي مفيدين وأنظمة معززة بالاسترجاع وهندسة الأوامر وأتمتة تمنح الناس وقتًا أكبر للعمل ذي القيمة.", tags: ["معماريات الوكلاء", "RAG", "سير عمل مدعوم بالذكاء الاصطناعي"] },
  footer: { credit: "حيدر علي. مساحة عمل شخصية على الويب.", backToLobby: "العودة إلى الردهة" },
};

const ur: Dictionary = {
  meta: { title: "حیدر علی — فل اسٹیک اور AI ڈویلپر", description: "حیدر علی کا ورچوئل دفتر دریافت کریں۔ فل اسٹیک JavaScript انجینئرنگ، AI مصنوعات، نو کوڈ آٹومیشن اور سسٹم آرکیٹیکچر۔ فی الحال DubiCars میں خدمات انجام دے رہے ہیں۔" },
  common: {
    floor: "منزل 01", officeMap: "دفتر کی رہنمائی", online: "تفاعلی ورک اسپیس", featuredProject: "نمایاں پروجیکٹ", exploreProjects: "پروجیکٹس دیکھیں", startTour: "آس پاس کا جائزہ لیں", pauseMotion: "حرکت کم کریں", resumeMotion: "حرکت فعال کریں", technologies: "ٹیکنالوجیز", filterProjects: "پروجیکٹس فلٹر کریں", selectedProject: "منتخب پروجیکٹ", capabilities: "میں کیا پیش کرتا ہوں", workflow: "تجربہ", projectOverview: "پروجیکٹ کا تعارف",
    skipToContent: "مواد پر جائیں", navigation: "دفتر میں رہنمائی", openMenu: "مینو کھولیں", closeMenu: "مینو بند کریں", theme: "ظاہری انداز", light: "روشن", dark: "تاریک", system: "سسٹم کے مطابق", language: "زبان", immersiveView: "تھری ڈی دفتر", staticView: "سادہ منظر", viewMode: "دیکھنے کا انداز", sceneLabel: "تفاعلی ورچوئل دفتر۔ حیدر کا کام دیکھنے کے لیے کوئی کمرہ منتخب کریں۔", sceneHint: "دریافت کرنے کے لیے کمرہ منتخب کریں", sceneLoading: "دفتر تیار ہو رہا ہے…", sceneUnavailable: "سادہ منظر تیار ہے۔ مینو سے تمام حصے دیکھ سکتے ہیں۔", enterOffice: "دفتر میں آئیں", exploreRoom: "کمرہ دریافت کریں", currentRoom: "آپ یہاں ہیں", close: "بند کریں", previous: "پچھلا", next: "اگلا", viewProject: "پروجیکٹ دیکھیں", readCaseStudy: "کیس اسٹڈی دیکھیں", backToProjects: "پروجیکٹس پر واپس", allProjects: "تمام پروجیکٹس", resume: "سی وی ڈاؤن لوڈ کریں", copyEmail: "ای میل کاپی کریں", emailCopied: "ای میل ایڈریس کاپی ہو گیا", emailCopyError: "ایڈریس کاپی نہیں ہو سکا۔ اسے منتخب کریں یا اپنی ای میل ایپ کھولیں۔", openEmail: "ای میل بھیجیں", externalLink: "نئے ٹیب میں کھلتا ہے", scrollToExplore: "دیکھنے کے لیے اسکرول کریں", backToTop: "اوپر واپس جائیں", newWork: "حال ہی میں مکمل", current: "موجودہ", builtWith: "سوچ سمجھ کر بنایا گیا", room: "کمرہ", visitWebsite: "ویب سائٹ دیکھیں", projectDetails: "پروجیکٹ کی تفصیلات", reducedMotion: "کم حرکت کا انداز فعال ہے", loading: "لوڈ ہو رہا ہے…", experienceYears: "مصنوعات بنانے کا تجربہ", selectedWork: "منتخب کام", connect: "رابطہ کریں", contactSuccess: "گفتگو شروع کرنے کے لیے آپ کی ای میل ایپ تیار ہے۔",
  },
  nav: [ { id: "lobby", label: "استقبالیہ", subtitle: "ہوم" }, { id: "about", label: "میری ورک اسپیس", subtitle: "تعارف" }, { id: "skills", label: "ڈیولپمنٹ لیب", subtitle: "مہارتیں" }, { id: "experience", label: "تجربے کی دیوار", subtitle: "تجربہ" }, { id: "projects", label: "پروجیکٹ گیلری", subtitle: "پروجیکٹس" }, { id: "contact", label: "آئیے بات کریں", subtitle: "رابطہ" } ],
  hero: { greeting: "سلام، میں حیدر ہوں۔", officeLabel: "ورچوئل دفتر", edition: "پورٹ فولیو / 2026", available: "مل کر کچھ بامقصد بنائیں", eyebrow: "حیدر علی / ڈیجیٹل ورک اسپیس", title: ["خیالات کی انجینئرنگ۔", "حقیقت کی تعمیر۔"], description: "میں بامقصد ڈیجیٹل تجربات کے پیچھے موجود نظام بناتا ہوں۔ فل اسٹیک مصنوعات سے لے کر AI ایجنٹس اور ذہین آٹومیشن تک۔", roles: ["فل اسٹیک JavaScript ڈویلپر", "AI ڈویلپر", "نو کوڈ آٹومیشن ڈویلپر", "سسٹم آرکیٹیکٹ"], primaryCta: "میرا کام دیکھیں", secondaryCta: "مل کر کچھ بنائیں", status: "DubiCars میں خدمات · AI ایمبیسیڈر", location: "اسلام آباد، پاکستان", scroll: "ایک ورک اسپیس جسے دریافت کرنا چاہیے" },
  about: {
    eyebrow: "01 / میری ورک اسپیس", title: "پہلے خیال سے آخری تعیناتی تک۔", paragraphs: ["میں حیدر ہوں، اسلام آباد میں مقیم فل اسٹیک JavaScript اور AI ڈویلپر۔ میں انٹرفیس، APIs، ڈیٹابیس، آٹومیشن اور سسٹم آرکیٹیکچر پر کام کر کے پیچیدہ ضروریات کو مفید سافٹ ویئر میں بدلتا ہوں۔", "DubiCars میں، میں زیادہ ٹریفک والی گاڑیوں کی مارکیٹ پلیس کے لیے کام کرتا ہوں اور انجینئرنگ ٹیم کا AI ایمبیسیڈر بھی ہوں۔ میرے کام میں AI کی مدد سے گاڑیوں کے اشتہارات، ادائیگیاں، فروخت کنندگان کے تجربات، پلیٹ فارم کی جدید کاری اور ویب پرفارمنس شامل ہیں۔", "میرے لیے پورا نظام اہم ہے: اسے استعمال کرنا کیسا محسوس ہوتا ہے، دباؤ میں یہ کیسے کام کرتا ہے، اور اگلا انجینئر کتنے اعتماد سے اسے بہتر بنا سکتا ہے۔"],
    principles: [ { title: "پورے سفر کی ذمہ داری", description: "انٹرفیس، بیک اینڈ اور تعیناتی کے عمل کو ایک واضح مقصد سے جوڑنا۔" }, { title: "ذہانت کو مفید بنانا", description: "حقیقی کام کے لیے AI اور آٹومیشن بنانا، جہاں فیصلوں کا اختیار انسان کے پاس رہے۔" }, { title: "آگے کی ضرورتوں کے لیے ڈیزائن", description: "ایسے ماڈیولر نظام بنانا جن کی نگرانی، دیکھ بھال اور ترقی آسان ہو۔" } ],
    education: { degree: "بی ایس سافٹ ویئر انجینئرنگ", institution: "کامسیٹس یونیورسٹی اسلام آباد، ایبٹ آباد کیمپس", period: "2018 — 2022" },
  },
  skills: {
    eyebrow: "02 / ڈیولپمنٹ لیب", title: "سوچ کے پیچھے موجود ٹولز۔", description: "مصنوعات جاری کرنے، ذہانت شامل کرنے اور نظام چلانے کے لیے ایک مربوط ٹیکنالوجی اسٹیک۔",
    categories: [
      { title: "انٹرفیس اور تجربات", items: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular", "React Native", "Electron", "Tailwind CSS", "ویب کی بنیادی پرفارمنس پیمائشیں"] },
      { title: "بیک اینڈ اور سسٹم آرکیٹیکچر", items: ["Node.js", "Express", "FastAPI", "REST APIs", "مائیکرو سروسز", "SSR / CSR", "WebSockets", "Prisma", "Sequelize"] },
      { title: "AI اور ورک فلو آٹومیشن", items: ["AI ایجنٹس", "RAG پائپ لائنز", "پرامپٹ انجینئرنگ", "Google ADK · واقفیت", "n8n", "Make.com", "Opal", "کسٹم کنیکٹرز"] },
      { title: "ڈیٹا اور انفراسٹرکچر", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "AWS", "Google Cloud Run", "DigitalOcean", "Docker · عملی واقفیت", "GitHub Actions", "Cloudflare"] },
    ],
  },
  experience: {
    eyebrow: "03 / تجربے کی دیوار", title: "حقیقی دنیا میں حاصل کردہ تجربہ۔",
    items: [
      { company: "DubiCars", role: "سافٹ ویئر انجینئر · AI ایمبیسیڈر", period: "جولائی 2025 — تاحال", location: "دبئی، متحدہ عرب امارات · ہائبرڈ", description: "خلیجی خطے کی زیادہ ٹریفک والی گاڑیوں کی مارکیٹ پلیس کے لیے پروڈکشن انجینئرنگ۔", highlights: ["AI کی مدد سے اشتہارات بنانے کا فیچر مکمل کیا، جو گاڑی کی تصاویر سے قابلِ ترمیم لسٹنگ بناتا ہے۔", "Checkout.com کا انضمام اور Tabby اور Apple Pay کی شمولیت کی قیادت کی، جس نے ادارے کی آمدنی میں تقریباً 10% اضافے میں حصہ ڈالا۔", "پرانے JavaScript کو ماڈیولر React سروسز میں منتقل کیا اور اہم صفحات کی ویب پرفارمنس بہتر بنائی۔", "فروخت کنندگان کی آن بورڈنگ، اشتہار امپورٹ، VIP لسٹنگ اور تصدیق کے تجربات بنائے، اور ٹیم میں AI کے استعمال کو آگے بڑھایا۔"] },
      { company: "9D Technologies", role: "سافٹ ویئر انجینئر", period: "مئی 2023 — جولائی 2025", location: "راولپنڈی، پاکستان", description: "فل اسٹیک ویب مصنوعات، ریئل ٹائم نظام اور مختلف پلیٹ فارمز کے لیے ڈیسک ٹاپ ایپس۔", highlights: ["پرفارمنس میں بہتری کے ذریعے ویب ایپ کا لوڈ ٹائم 45% کم اور صارفین کی مشغولیت 25% زیادہ کی۔", "خاندان کے افراد کی لوکیشن شیئرنگ اور گروپ چیٹ کے لیے Node.js اور WebSockets بیک اینڈ بنایا۔", "Windows، macOS اور Linux کے لیے Electron اور OpenVPN ایپ اور ساتھ Chrome ایکسٹینشن جاری کی۔", "کلاؤڈ اسٹوریج استعمال کرنے والی Android گیلری ایپ کے لیے CASA سکیورٹی اسیسمنٹ کا کام مکمل کیا۔"] },
      { company: "Status200", role: "ایسوسی ایٹ سافٹ ویئر انجینئر", period: "دسمبر 2022 — جولائی 2023", location: "لاہور، پاکستان", description: "مختلف فریم ورکس اور کلائنٹ پروجیکٹس میں فل اسٹیک JavaScript ڈیولپمنٹ۔", highlights: ["فرنٹ اینڈ اور بیک اینڈ فیچرز بنائے اور REST APIs مربوط کیں۔", "کوڈ ریویوز، تکنیکی دستاویزات اور Git کے اشتراکی طریقوں میں حصہ لیا۔"] },
      { company: "The Skynth", role: "Web 3.0 انٹرن", period: "اگست 2022 — دسمبر 2022", location: "ریموٹ", description: "React، Next.js اور Web3 کو یکجا کرنے والے ابتدائی پروڈکٹ تجربات۔", highlights: ["Ethereum کی غیر مرکزی ایپس کے فیچرز اور NFT پروجیکٹ کے لیے والٹ انٹیگریشن تیار کی۔", "React اور Next.js انٹرفیس بنائے اور اسمارٹ کانٹریکٹ انٹریکشنز پر کام کیا۔"] },
    ],
  },
  projects: {
    eyebrow: "04 / پروجیکٹ گیلری", title: "خیالات جو حقیقت بنے۔", description: "منتخب پلیٹ فارمز، ذہین ورک فلوز اور تجربات جن کی تعمیر میں میرا حصہ رہا۔", filters: { all: "تمام کام", ai: "AI اور آٹومیشن", platform: "پلیٹ فارمز اور تجربات" },
    items: [
      { id: "dubicars-ai", title: "AI اشتہار پوسٹنگ", category: "ai", eyebrow: "DUBICARS / جاری کردہ فیچر", description: "گاڑی کی تصاویر سے جائزے کے لیے تیار لسٹنگ تک۔ AI گاڑی کی تفصیلات پہچانتا، خصوصیات تجویز کرتا اور ڈیلرز کو اشتہار بنانے میں مدد دیتا ہے، جبکہ ہر فیلڈ قابلِ ترمیم رہتی ہے۔", tags: ["AI تصویری تجزیہ", "گاڑیوں کی لسٹنگز", "انگریزی / عربی", "انسانی جائزہ"], url: "https://www.dubicars.com/", featured: true },
      { id: "kyc-agent", title: "KYC آن بورڈنگ ایجنٹ", category: "ai", eyebrow: "AI / دستاویزاتی ورک فلوز", description: "شناختی دستاویزات سے معلومات بازیافت کرنے والا مکمل آن بورڈنگ ایجنٹ، آپریٹر انٹرفیس اور Google Cloud Run پر تعینات FastAPI بیک اینڈ کے ساتھ۔", tags: ["RAG", "FastAPI", "Streamlit", "Google Cloud Run"], url: "https://kyc-ui-424105745513.asia-southeast1.run.app/" },
      { id: "n8n", title: "ورک فلو آٹومیشن", category: "ai", eyebrow: "آٹومیشن / مربوط نظام", description: "مختلف سروسز کے کاروباری عمل کے لیے پروڈکشن n8n ورک فلوز اور کسٹم کنیکٹر، جن میں تکرار سے تحفظ، دوبارہ کوشش اور قابلِ اعتماد ڈیٹا سنک شامل ہیں۔", tags: ["n8n", "کسٹم کنیکٹرز", "Webhooks", "REST APIs"] },
      { id: "sober-house", title: "Sober House Hub", category: "platform", eyebrow: "فل اسٹیک / مارکیٹ پلیس", description: "بحالی میں مدد دینے والی رہائشی کمیونٹیز کے لیے مارکیٹ پلیس، جس میں React انٹرفیس، PostgreSQL بیک اینڈ، Stripe ادائیگیاں اور خودکار تعیناتی شامل ہیں۔", tags: ["React", "Vite", "PostgreSQL", "Stripe", "DigitalOcean"], url: "https://dev.soberhousehub.com/home" },
      { id: "bolt-vpn", title: "Bolt VPN", category: "platform", eyebrow: "ڈیسک ٹاپ / کنیکٹیویٹی", description: "متعدد پلیٹ فارمز کے لیے VPN پروڈکٹ، Electron ڈیسک ٹاپ ایپ، Laravel اور SQL بیک اینڈ، Chrome ایکسٹینشن اور خودکار بلڈز اور ریلیزز کے ساتھ۔", tags: ["React", "Electron", "Laravel", "Chrome APIs", "CI/CD"], url: "https://boltvpn.org/" },
      { id: "al-khalijia", title: "الخلیجیہ", category: "platform", eyebrow: "فل اسٹیک / تجارت", description: "React اور Vite پر بنایا گیا مارکیٹنگ اور تجارت کا پلیٹ فارم، PostgreSQL اور ORM بیک اینڈ اور قابلِ تکرار CI/CD تعیناتی کے ساتھ۔", tags: ["React", "Vite", "PostgreSQL", "ORM", "CI/CD"], url: "https://khalijiah.com/" },
      { id: "c-parker", title: "C-Parker", category: "platform", eyebrow: "WEB3 / مارکیٹ پلیس", description: "والٹ انٹیگریشن والی غیر مرکزی مارکیٹ پلیس، جس کا انٹرفیس اسمارٹ کانٹریکٹ کے براہِ راست ایونٹس کے ساتھ ہم آہنگ رہتا ہے۔", tags: ["React", "Web3", "والٹ انٹیگریشن", "اسمارٹ کانٹریکٹس"], url: "https://c-parker-omega.vercel.app/" },
      { id: "empyryal", title: "Empyryal Exchange", category: "platform", eyebrow: "تخلیقی ڈیولپمنٹ / تھری ڈی", description: "React اور Three.js کے ذریعے متحرک تھری ڈی ویب سائٹ، جو بامعنی انٹرفیس اور سہ جہتی تعامل کو دریافت کرتی ہے۔", tags: ["React", "Three.js", "تھری ڈی تعامل", "اینی میشن"] },
    ],
  },
  aiCaseStudy: {
    eyebrow: "نمایاں کام / حال ہی میں DUBICARS میں مکمل", title: "اگلی لسٹنگ ایک تصویر سے شروع ہوتی ہے۔", description: "ڈیلرز کے لیے AI کی مدد سے اشتہار بنانے کا تجربہ۔ گاڑی کی تصاویر منظم معلومات میں بدلتی ہیں، واضح جائزے اور ہر مرحلے پر دستی اندراج کے راستے کے ساتھ۔",
    steps: [
      { number: "01", title: "تصاویر اور بنیادی معلومات", description: "انوینٹری سے شروع کریں، گاڑی کی تصاویر اپ لوڈ کریں اور علاقائی تصریحات اور ماڈل سال منتخب کریں۔ تصاویر دیکھیں، ایڈٹ کریں اور ترتیب بدلیں، جبکہ فوٹوگرافی کی رہنمائی بھی دستیاب ہو۔" },
      { number: "02", title: "ابتدائی کام AI کے سپرد", description: "تصویری تجزیہ گاڑی کی تفصیلات اور ٹرم پہچانتا ہے، جبکہ ڈیلر دستیاب فیلڈز بھرتا رہتا ہے۔ پیش رفت اور تکمیل کے پیغامات عمل کو واضح رکھتے ہیں۔" },
      { number: "03", title: "اعتماد کے ساتھ جائزہ", description: "خودکار طور پر بھری گئی تفصیلات، تصریحات، خصوصیات، قیمت اور تفصیل کا جائزہ لیں۔ اعتماد کے اشارے اور مارکیٹ ویلیو فیصلہ کرنے میں مدد دیتے ہیں۔" },
      { number: "04", title: "اختیار برقرار رکھیں اور شائع کریں", description: "کوئی بھی قدر تبدیل کریں، ڈرافٹ محفوظ کریں یا شائع کریں۔ شناخت کامیاب نہ ہو تو دستی انتخاب سے دوبارہ شروع کیے بغیر آگے بڑھیں۔" },
    ],
    capabilities: ["گاڑی اور ٹرم کی شناخت", "JATO ڈیٹا اور AI کی تجویز کردہ خصوصیات", "اعتماد کے اشارے", "مارکیٹ ویلیو کی رہنمائی", "ہر مرحلے پر دستی طریقہ", "انگریزی اور عربی، RTL سپورٹ کے ساتھ", "اضافی معلومات کا خودکار ترجمہ", "ڈیلرز کے لیے ریسپانسیو ورک فلو"], outcome: "تصاویر سے اشاعت تک رہنمائی والا راستہ، جو بار بار ڈیٹا درج کرنے کی ضرورت کم کرتا ہے اور حتمی لسٹنگ کا اختیار ڈیلر کے پاس رکھتا ہے۔", reviewLabel: "AI مدد کرتا ہے۔ ڈیلر فیصلہ کرتا ہے۔", technologies: ["تصویری تجزیہ", "گاڑیوں کا منظم ڈیٹا", "JATO", "انسانی جائزہ", "مقامی زبانوں کی سپورٹ"],
  },
  achievements: {
    eyebrow: "نتائج / منتخب اثرات", title: "ایسی انجینئرنگ جو فرق ڈالے۔",
    items: [
      { value: "≈10%", label: "آمدنی بڑھانے میں حصہ", description: "DubiCars میں Checkout.com، Tabby اور Apple Pay کے ذریعے ادائیگیوں کی جدید کاری نے کوریج اور تبدیلی کی شرح بہتر بنائی۔" },
      { value: "45%", label: "صفحے کے لوڈ ٹائم میں کمی", description: "9D Technologies میں کوڈ اسپلٹنگ، لیزی لوڈنگ اور اثاثوں کی اصلاح کے ذریعے کارکردگی بہتر ہوئی۔" },
      { value: "4+", label: "مصنوعات بنانے کے سال", description: "مارکیٹ پلیسز، ڈیسک ٹاپ ایپس، Web3، AI ایجنٹس اور پروڈکشن آٹومیشن کا تجربہ۔" },
    ],
  },
  contact: { eyebrow: "05 / رابطے کا کمرہ", title: "آئیے، اگلا قدم مل کر بنائیں۔", description: "کوئی پروڈکٹ بنانی ہے، کسی نظام کو بہتر کرنا ہے، یا کسی ورک فلو کو زیادہ ذہین بنانا ہے؟ آئیے بات کریں۔", email: "haiderali7102k@gmail.com", emailLabel: "مجھے پیغام بھیجیں", location: "اسلام آباد، پاکستان میں مقیم", links: [ { label: "GitHub", url: "https://github.com/HaiVvolf777" }, { label: "LinkedIn", url: "https://linkedin.com/in/haider---ali" } ] },
  experiment: { eyebrow: "تجربات کا گوشہ", title: "اگلے خیال کے لیے ہمیشہ جگہ۔", description: "میری موجودہ دلچسپیوں میں مفید AI ایجنٹس، معلومات کی بازیافت سے بہتر بنائے گئے نظام، پرامپٹ انجینئرنگ اور ایسی آٹومیشن شامل ہے جو لوگوں کو بامقصد کام کے لیے زیادہ وقت دے۔", tags: ["ایجنٹ آرکیٹیکچر", "RAG", "AI پر مبنی ورک فلوز"] },
  footer: { credit: "حیدر علی۔ ویب پر ایک ذاتی ورک اسپیس۔", backToLobby: "استقبالیے پر واپس" },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ar, ur };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
