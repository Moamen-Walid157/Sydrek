export const socials = {
  facebook: "https://www.facebook.com/profile.php?id=61595226661981",
  instagram: "https://www.instagram.com/sydrek_software/",
  whatsapp: "https://wa.me/+201092322282",
  phone: "https://wa.me/+201092322282",
  phoneLabel: "+20 109 232 2282",
} as const;

export const navLinks = [
  { href: "/#systems", id: "systems", label: "Systems" },
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/tools", id: "tools", label: "Tools" },
  { href: "/#about", id: "about", label: "About" },
] as const;

export const services = [
  {
    index: "01",
    title: "Websites",
    text: "Company and product sites with a real content model — fast, clear, and ready to grow into the next page.",
    icon: "globe",
  },
  {
    index: "02",
    title: "Landing pages",
    text: "One offer, one action. Campaign pages built to convert, then hand the lead to the system behind them.",
    icon: "panels",
  },
  {
    index: "03",
    title: "CRMs",
    text: "Contacts, pipeline, and the next action. A customer record the team actually opens in the morning.",
    icon: "users",
  },
  {
    index: "04",
    title: "ERPs",
    text: "Finance, inventory, and operations on one spine, with permissions that match how the company works.",
    icon: "workflow",
  },
  {
    index: "05",
    title: "Advanced dashboards",
    text: "Live numbers for operators and directors — thresholds, alerts, and a view worth trusting.",
    icon: "dashboard",
  },
  {
    index: "06",
    title: "SEO / GEO",
    text: "Structure and speed for classic search, and visibility when people ask an AI instead of a results page.",
    icon: "search",
  },
  {
    index: "07",
    title: "AI / Automation",
    text: "The repeated work, taken off the team. Assistants and workflows you can still explain.",
    icon: "spark",
  },
  {
    index: "08",
    title: "LMS",
    text: "Courses, progress, and roles for learners, instructors, and admins — on the web and on a phone.",
    icon: "learn",
  },
  {
    index: "09",
    title: "CMS",
    text: "Editors publish without waiting. Structured content that can feed the site, the app, and the landing page.",
    icon: "files",
  },
  {
    index: "10",
    title: "Mobile apps",
    text: "iOS and Android for the jobs people do away from a desk, sharing the system behind the website.",
    icon: "phone",
  },
  {
    index: "11",
    title: "+ 50 more",
    text: "Portals, booking, payments, integrations, and the internal tools that show up once the main system is real.",
    icon: "more",
  },
] as const;

export const interests = [
  "Websites",
  "Landing pages",
  "CRM",
  "ERP",
  "Advanced dashboards",
  "SEO / GEO",
  "AI / Automation",
  "LMS",
  "CMS",
  "Mobile apps",
  "Not sure",
] as const;

export const steps = [
  {
    index: "01",
    title: "Discover",
    text: "We map the offer, the users, and the system you already have. A website, a CRM, or an app — we start from what is already true.",
  },
  {
    index: "02",
    title: "Architect",
    text: "Pages, data, and roles drawn before the build. The site, the CRM, and the dashboard share one structure instead of three disconnected tools.",
  },
  {
    index: "03",
    title: "Build",
    text: "Thin slices you can click. A landing page, a pipeline, or a course — live early, with the dashboard already watching.",
  },
  {
    index: "04",
    title: "Launch",
    text: "We hand over the product, the content tools, and the habits that keep SEO, automation, and the next release moving.",
  },
] as const;

export const projects = [
  {
    slug: "its-site",
    tag: "Delivery",
    title: "ITS Site",
    summary: "Last-mile delivery for Greater Cairo. The page people meet first.",
    story:
      "The public page is the courier, the box, and same-day delivery from warehouse to door. The phone keeps the same promise.",
    image: "/work/its-desktop.jpg",
    mobile: "/work/its-mobile.jpg",
    alt: "ITS delivery homepage on a desktop, a courier in red holding a parcel",
    mobileAlt: "ITS delivery homepage on a phone",
    glow: "#f43f5e",
  },
  {
    slug: "its-system",
    tag: "Operations",
    title: "ITS System",
    summary: "The desk that runs the day. Orders, riders, merchants, and cash on delivery.",
    story:
      "Behind the public page, the operations desk tracks orders, riders, merchants, and cash on delivery. The phone carries the same desk.",
    image: "/work/its-system.jpg",
    mobile: "/work/its-system-mobile.jpg",
    alt: "ITS operations dashboard with orders, riders, merchants, and cash on delivery",
    mobileAlt: "ITS operations dashboard on a phone, with deliveries, orders, and revenue",
    glow: "#f43f5e",
  },
  {
    slug: "makan",
    tag: "Investment",
    title: "Makan Investment",
    summary: "A quiet landing. The building carries the offer, and the numbers sit along the floor.",
    story:
      "One photograph, one promise, and the figures underneath: a fixed return, the investments, the partners, the countries. The phone keeps the same invitation, with the menu folded away.",
    image: "/work/makan-desktop.jpg",
    mobile: "/work/makan-mobile.jpg",
    alt: "Makan Investment homepage on a desktop, a glass tower against a pale sky",
    mobileAlt: "Makan Investment homepage on a phone",
    glow: "#7dd3fc",
  },
  {
    slug: "four-weeks",
    tag: "Travel",
    title: "Four Weeks",
    summary: "A travel brand set at night. The desert holds the headline. The phone holds the same sky.",
    story:
      "Explore, then the world. Packages, a journal, and a way to talk, laid over a photograph that does the selling. The mobile frame keeps the figure, the torch, and the line.",
    image: "/work/weeks-desktop.jpg",
    mobile: "/work/weeks-mobile.jpg",
    alt: "Four Weeks travel homepage at night, a figure with a torch in the desert",
    mobileAlt: "Four Weeks travel homepage on a phone",
    glow: "#38bdf8",
  },
  {
    slug: "sydrek",
    tag: "Systems",
    title: "Sydrek",
    summary: "The studio, drawn as a system. A catalogue you can move through, on a desk and in a hand.",
    story:
      "The public site is the same machine as the work: a live index of systems, and a path from the first line to a project. The phone keeps that catalogue within reach.",
    image: "/work/sydrek-desktop.jpg",
    mobile: "/work/sydrek-mobile.jpg",
    alt: "Sydrek homepage on a desktop, with the operating catalogue open",
    mobileAlt: "Sydrek homepage on a phone, with the operating catalogue",
    glow: "#2563ff",
  },
] as const;

export const showcase = projects;

export type PeriodId = "today" | "week" | "month";

export const periods: {
  id: PeriodId;
  label: string;
  health: number;
  caption: string;
  metrics: {
    name: string;
    value: number;
    prefix?: string;
    suffix?: string;
    digits?: number;
    delta: string;
    tone: "good" | "bad";
  }[];
}[] = [
  {
    id: "today",
    label: "Today",
    health: 72,
    caption: "12 of 16 regions fully synced",
    metrics: [
      { name: "Revenue", value: 128, prefix: "$", suffix: "k", delta: "+18.2%", tone: "good" },
      { name: "Active users", value: 9402, delta: "+4.1%", tone: "good" },
      { name: "Churn", value: 1.2, suffix: "%", digits: 1, delta: "+0.3%", tone: "bad" },
    ],
  },
  {
    id: "week",
    label: "Week",
    health: 81,
    caption: "14 of 16 regions fully synced",
    metrics: [
      { name: "Revenue", value: 842, prefix: "$", suffix: "k", delta: "+9.4%", tone: "good" },
      { name: "Active users", value: 41208, delta: "+6.8%", tone: "good" },
      { name: "Churn", value: 1.1, suffix: "%", digits: 1, delta: "−0.2%", tone: "good" },
    ],
  },
  {
    id: "month",
    label: "Month",
    health: 88,
    caption: "16 of 16 regions fully synced",
    metrics: [
      { name: "Revenue", value: 3.4, prefix: "$", suffix: "m", digits: 1, delta: "+12.1%", tone: "good" },
      { name: "Active users", value: 128440, delta: "+11.6%", tone: "good" },
      { name: "Churn", value: 0.9, suffix: "%", digits: 1, delta: "−0.4%", tone: "good" },
    ],
  },
];

export const team = [
  { initials: "NA", name: "Nadia Ahmed", role: "owner", bg: "linear-gradient(135deg,#2563ff,#22d3ee)", fg: "#fff" },
  { initials: "TK", name: "Tom Keller", role: "editor", bg: "#2563ff", fg: "#fff" },
  { initials: "YS", name: "Yuki Sato", role: "viewer", bg: "#22d3ee", fg: "#070b1a" },
] as const;

export const systems = [
  {
    id: "websites",
    index: "01",
    title: "Websites",
    lead: "A company or product site with a content model, a design system, and room for the page you have not written yet.",
    points: [
      "Clear structure from the first screen to the last",
      "Fast on a phone, considered on a desktop",
      "Ready to connect to a CMS, CRM, or dashboard",
      "Built so the next page is not a one-off",
    ],
    signal: "A site that can grow into a system",
  },
  {
    id: "landing",
    index: "02",
    title: "Landing pages",
    lead: "A single offer with a single action. Campaign pages that convert, then pass the lead into the system behind them.",
    points: [
      "One promise, measured against the click",
      "Forms that land in the CRM, not a spreadsheet",
      "Speed and structure treated as part of the offer",
      "Easy to launch the next campaign without a rebuild",
    ],
    signal: "A page with a job",
  },
  {
    id: "crm",
    index: "03",
    title: "CRMs",
    lead: "The customer record your team lives in: pipeline, history, and the next action, without a second tool for the truth.",
    points: [
      "Contacts, deals, and the real sales process",
      "Roles for sales, success, and leadership",
      "Automations that follow the way you already work",
      "A morning view the team will actually open",
    ],
    signal: "The customer, in one place",
  },
  {
    id: "erp",
    index: "04",
    title: "ERPs",
    lead: "Finance, inventory, and operations on one spine. Permissions match the company, and the reports match the books.",
    points: [
      "The workflows the business already runs",
      "Access that follows roles, not a shared login",
      "Reports leadership can defend",
      "Room to connect the website, CRM, and mobile app",
    ],
    signal: "The business, on one system",
  },
  {
    id: "dashboards",
    index: "05",
    title: "Advanced dashboards",
    lead: "A control room for the work: live numbers, the threshold that matters, and the people allowed to change it.",
    points: [
      "An operator view and a director view",
      "Thresholds and alerts, not a monthly export",
      "The same data the CRM or ERP already trusts",
      "Dense enough for power users, calm enough for Monday",
    ],
    signal: "Numbers you can act on",
  },
  {
    id: "seo",
    index: "06",
    title: "SEO / GEO",
    lead: "Found in classic search, and present when someone asks an AI. Structure, speed, and content that stay consistent as you publish.",
    points: [
      "Pages search engines can actually understand",
      "Content models that do not decay after launch",
      "Visibility in AI answers, not only blue links",
      "Measurement tied to leads, not vanity traffic",
    ],
    signal: "Found by the people you want",
  },
  {
    id: "ai",
    index: "07",
    title: "AI / Automation",
    lead: "The repeated work leaves the team. Assistants and workflows sit inside the CRM, CMS, or dashboard — with a human on the step that matters.",
    points: [
      "Automation mapped to a real process",
      "Assistants inside the tools people already use",
      "A log of what the system did",
      "The important decision stays with a person",
    ],
    signal: "Automation you can explain",
  },
  {
    id: "lms",
    index: "08",
    title: "LMS",
    lead: "Courses, progress, and a record of who learned what. Learners, instructors, and admins each get the screen they need.",
    points: [
      "Programs, lessons, and a clear path through them",
      "Progress the instructor and the learner can both see",
      "Assessments and certificates when the program needs them",
      "A path that works on the web and on a phone",
    ],
    signal: "Learning with a record",
  },
  {
    id: "cms",
    index: "09",
    title: "CMS",
    lead: "Editors publish without waiting on a developer. The same structured content can feed the website, the app, and the landing page.",
    points: [
      "Drafts, review, and a safe publish",
      "Structured fields, not a pile of free pages",
      "One source for site, app, and campaign",
      "Permissions that match who should touch the words",
    ],
    signal: "Content with a system behind it",
  },
  {
    id: "mobile",
    index: "10",
    title: "Mobile apps",
    lead: "iOS and Android for the jobs people do away from a desk, sharing accounts and data with the website and the system behind it.",
    points: [
      "The task, designed for a hand, not a shrunk website",
      "Accounts and notifications that belong to the same product",
      "Offline where the work cannot wait on a signal",
      "A release path for the version after this one",
    ],
    signal: "The product, in the hand",
  },
  {
    id: "more",
    index: "11",
    title: "+ 50 more",
    lead: "Portals, booking, payments, integrations, and the internal tools that appear once the main system is real. Scoped as their own slice.",
    points: [
      "Customer portals and partner portals",
      "Booking, payments, and the flows around them",
      "Integrations between the systems you already run",
      "The second product after the first one lands",
    ],
    signal: "If it is software, ask",
  },
] as const;

export const stackGroups = [
  {
    id: "build",
    label: "Build",
    note: "Sites, dashboards, and the apps in front of them.",
    items: ["TypeScript", "React", "Next.js", "React Native", "Node.js", "Python"],
  },
  {
    id: "run",
    label: "Run",
    note: "Where a CRM, ERP, LMS, or site lives once it is real.",
    items: ["AWS", "GCP", "Kubernetes", "Docker", "Terraform", "PostgreSQL"],
  },
  {
    id: "secure",
    label: "Secure",
    note: "Who can see a customer, a course, or a ledger.",
    items: ["OAuth / OIDC", "Zero trust", "Key rotation", "Audit trails", "WAF", "Secrets vaults"],
  },
  {
    id: "watch",
    label: "Watch",
    note: "How a dashboard stays honest after launch.",
    items: ["OpenTelemetry", "Grafana", "SLO budgets", "Tracing", "Error budgets", "On-call runbooks"],
  },
] as const;

export const engagements = [
  {
    name: "First slice",
    time: "2–6 weeks",
    text: "A landing page, a CRM slice, or the first dashboard. Enough to prove the product and the way we work.",
    items: ["One offer or one workflow", "Working software people can use", "The number we will watch", "A clear next step"],
  },
  {
    name: "System build",
    time: "One quarter",
    text: "A website with a CMS, an ERP, an LMS, or a mobile app. Designed, built, and handed over with the tools to run it.",
    items: ["The product and the system under it", "Delivery in thin slices", "SEO, roles, and data in the same plan", "Editors and admins can take it from here"],
    featured: true,
  },
  {
    name: "Retained signal",
    time: "Ongoing",
    text: "We stay after launch — the next campaign, the next automation, the next screen in the app.",
    items: ["A named partner on the product", "SEO, automation, and new releases", "A roadmap tied to what people use", "No mystery retainers"],
  },
] as const;

export const faqs = [
  {
    q: "Do you only design, or do you ship the software?",
    a: "We ship. A website, a CRM, an ERP, a dashboard, an LMS, a CMS, or a mobile app — the deliverable is the working product, plus the people on your side who can change it.",
  },
  {
    q: "What do you actually build?",
    a: "Websites, landing pages, CRMs, ERPs, advanced dashboards, SEO and GEO, AI and automation, LMS, CMS, and mobile apps. Beyond those ten, there are more than fifty adjacent builds: portals, booking, payments, integrations, and internal tools.",
  },
  {
    q: "Can a landing page be the whole project?",
    a: "Yes. A landing page can be the first slice, with the form already aimed at the CRM you have or the one we build next. It does not have to start as a full system.",
  },
  {
    q: "Can you work with the tools we already use?",
    a: "Yes. Most serious work sits beside a current site, CRM, or ERP. We read what is already true, then connect, replace, or extend it.",
  },
  {
    q: "Where does the team sit?",
    a: "Remote-first. Reviews and decisions happen in the open, overlapping your hours for the calls that should not wait.",
  },
  {
    q: "What do we leave with?",
    a: "The product, the content tools, the dashboard, and the access. The site, the app, and the data stay yours.",
  },
] as const;

export const logs = [
  "12:04:11  deploy  sydrek-api@v2.14.0 → eu-west-1  ✓ healthy",
  "12:04:14  scale   workers 8 → 12  (cpu 71%)",
  "12:04:19  cache   warm 4,412 keys in 240ms",
  "12:04:22  auth    rotated signing keys  ✓",
  "12:04:30  alert   p95 > 80ms on /search — auto-resolved",
];
