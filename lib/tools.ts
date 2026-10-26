import { interests } from "@/lib/content";

export type Interest = (typeof interests)[number];
export type Currency = "USD" | "EGP";

/** Fixed planning rate for display only. It is not a live exchange rate. */
export const PLANNING_EGP_PER_USD = 50;

export const toolCategories = [
  {
    id: "planning",
    title: "Planning tools",
    text: "Find the gap, see what it costs, then send Sydrek the result. Nothing here is a quotation.",
  },
  {
    id: "design",
    title: "Design Tools",
    text: "Image work that runs in the browser. The file stays on this device.",
  },
] as const;

export type ToolCategoryId = (typeof toolCategories)[number]["id"];

export const toolCatalog = [
  {
    slug: "roi",
    href: "/tools/roi",
    index: "01",
    stage: "Understand",
    short: "ROI",
    title: "AI & automation ROI",
    text: "Hours, wage cost, and a monthly figure you can take into a meeting.",
    category: "planning",
  },
  {
    slug: "readiness",
    href: "/tools/readiness",
    index: "02",
    stage: "Discover",
    short: "Readiness",
    title: "AI readiness",
    text: "A score, three automations, and a 30-day plan from how the work actually runs.",
    category: "planning",
  },
  {
    slug: "crm",
    href: "/tools/crm",
    index: "03",
    stage: "Discover",
    short: "CRM",
    title: "CRM & sales health",
    text: "Where leads go quiet, who owns the next step, and which follow-ups are missing.",
    category: "planning",
  },
  {
    slug: "estimate",
    href: "/tools/estimate",
    index: "04",
    stage: "Understand",
    short: "Estimate",
    title: "Project cost estimate",
    text: "A budget range and a timeline range. A planning figure, not a quotation.",
    category: "planning",
  },
  {
    slug: "background",
    href: "/tools/background",
    index: "01",
    stage: "Design",
    short: "Background",
    title: "Background removal",
    text: "Drop a photo. The subject stays, the background goes, and the file never leaves this browser.",
    category: "design",
  },
] as const;

export type ToolSlug = (typeof toolCatalog)[number]["slug"];

const toolLabels: Record<ToolSlug, string> = {
  roi: "ROI calculator",
  readiness: "AI readiness check",
  crm: "CRM health check",
  estimate: "cost estimate",
  background: "background removal",
};

export function toolLabel(slug: string | null) {
  if (!slug || !(slug in toolLabels)) return null;
  return toolLabels[slug as ToolSlug];
}

export function isInterest(value: string | null): value is Interest {
  return Boolean(value && (interests as readonly string[]).includes(value));
}

export function contactBrief(input: { tool: ToolSlug; interest: Interest; message: string }) {
  let message = input.message.trim();
  if (message.length > 1800) {
    const cut = message.lastIndexOf("\n", 1800);
    message = message.slice(0, cut > 400 ? cut : 1800).trim();
  }
  const params = new URLSearchParams({
    tool: input.tool,
    interest: input.interest,
    message,
  });
  return `/contact/?${params.toString()}`;
}

export function money(amount: number, currency: Currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export type Stat = { label: string; value: string };
export type Block = { title: string; items: string[] };

export type ToolResult = {
  kicker: string;
  title: string;
  summary: string;
  score?: number;
  stats: Stat[];
  blocks: Block[];
  note: string;
  message: string;
  interest: Interest;
  next: { href: string; label: string };
};

export type RoiInput = {
  people: number;
  hoursPerWeek: number;
  hourly: number;
  automation: number;
  currency: Currency;
};

export function roiResult(input: RoiInput): ToolResult | null {
  const people = clamp(input.people, 0, 500);
  const hoursPerWeek = clamp(input.hoursPerWeek, 0, 80);
  const hourly = clamp(input.hourly, 0, 100000);
  const automation = clamp(input.automation, 10, 80);
  if (people < 1 || hoursPerWeek <= 0 || hourly <= 0) return null;

  const monthlyHours = people * hoursPerWeek * (automation / 100) * (52 / 12);
  const monthly = monthlyHours * hourly;
  const yearly = monthly * 12;
  const hoursLabel = new Intl.NumberFormat("en-US", { maximumFractionDigits: monthlyHours < 10 ? 1 : 0 }).format(monthlyHours);
  const monthlyLabel = money(monthly, input.currency);
  const yearlyLabel = money(yearly, input.currency);

  const message = [
    "Tool: AI & automation ROI calculator",
    `People on the task: ${people}`,
    `Hours each, per week: ${hoursPerWeek}`,
    `Hourly cost: ${money(hourly, input.currency)}`,
    `Share of the work automation might take: ${automation}%`,
    `Hours recovered per month: ${hoursLabel}`,
    `Monthly savings: ${monthlyLabel}`,
    `Yearly savings: ${yearlyLabel}`,
    "This is a planning figure. It counts paid time only, and it is not a quote. We want to talk about automating this work.",
  ].join("\n");

  return {
    kicker: "Planning figure",
    title: `${monthlyLabel} / month`,
    summary: `${hoursLabel} hours a month come back if ${automation}% of this task is automated. Over a year that is ${yearlyLabel}, before the cost of building it.`,
    stats: [
      { label: "Hours recovered", value: `${hoursLabel} / mo` },
      { label: "Monthly savings", value: monthlyLabel },
      { label: "Yearly savings", value: yearlyLabel },
    ],
    blocks: [
      {
        title: "What this counts",
        items: [
          `${people} ${people === 1 ? "person" : "people"} × ${hoursPerWeek} hours a week × ${automation}% automated.`,
          "A month is counted as 52 weeks ÷ 12, so the figure is not a four-week shortcut.",
          "Software cost, exceptions, and setup time are not included.",
        ],
      },
    ],
    note: "Most first automations land between 10% and 80% of a task. Full removal is rare, so the slider stops at 80%.",
    message,
    interest: "AI / Automation",
    next: { href: "/tools/readiness", label: "Check AI readiness" },
  };
}

type Choice = { label: string; score: number; risk?: string };

type Question = {
  id: string;
  prompt: string;
  recommend: string;
  workflow: string;
  options: Choice[];
};

export const readinessQuestions: Question[] = [
  {
    id: "data",
    prompt: "Where do the records live?",
    recommend: "Gather the records for one workflow into the system people already open.",
    workflow: "Put one workflow's records in a single place before adding a model.",
    options: [
      { label: "In chats, inboxes, and people's heads", score: 0 },
      { label: "In spreadsheets the team shares", score: 1 },
      { label: "In a system, with gaps the team works around", score: 2 },
      { label: "In records the team trusts and updates", score: 3 },
    ],
  },
  {
    id: "repetition",
    prompt: "How much of the week repeats?",
    recommend: "Pick the task that repeats every week and remove the copy-paste before adding a model.",
    workflow: "Automate the weekly copy-paste first.",
    options: [
      { label: "Almost every job is different", score: 0 },
      { label: "A few tasks show up again", score: 1 },
      { label: "Several tasks repeat every week", score: 2 },
      { label: "Whole workflows repeat, and the team can name the steps", score: 3 },
    ],
  },
  {
    id: "software",
    prompt: "What software is actually in use?",
    recommend: "Connect the tools you already pay for before adding another one.",
    workflow: "Connect the current tools instead of buying a new one.",
    options: [
      { label: "Email and chat do most of the work", score: 0 },
      { label: "A website plus office tools", score: 1 },
      { label: "A CRM or operations tool, used lightly", score: 2 },
      { label: "Systems the team opens every working day", score: 3 },
    ],
  },
  {
    id: "process",
    prompt: "Are the steps written down?",
    recommend: "Write one page for the happy path, including what happens when it fails.",
    workflow: "Write the happy path and the exceptions on one page.",
    options: [
      { label: "They live with one person", score: 0 },
      { label: "A few notes exist, and they drift", score: 1 },
      { label: "The main path is written", score: 2 },
      { label: "Steps, owners, and exceptions are written", score: 3 },
    ],
  },
  {
    id: "adoption",
    prompt: "What has the team already tried with AI?",
    recommend: "Run one assisted task with a person still checking the result.",
    workflow: "Pilot one task with a person checking every result.",
    options: [
      { label: "Nothing yet", score: 0 },
      { label: "A few people use a chat tool on their own", score: 1 },
      { label: "One real task has been tried, with a person checking it", score: 2 },
      { label: "An assistant or automation already runs in the business", score: 3 },
    ],
  },
  {
    id: "owner",
    prompt: "Who would own a first automation?",
    recommend: "Name one owner. A workflow without an owner stalls in the first month.",
    workflow: "Name an owner and a daily user before the build starts.",
    options: [
      { label: "Nobody has room for it", score: 0 },
      { label: "Someone could try it between other jobs", score: 1 },
      { label: "A person can sponsor a short pilot", score: 2 },
      { label: "An owner and a daily user are already named", score: 3 },
    ],
  },
];

const readinessPlans: Record<"early" | "pilot" | "build", string[]> = {
  early: [
    "Week 1 — Name one repeated task and the person who does it.",
    "Week 2 — Write the steps, the exceptions, and where the data lives.",
    "Week 3 — Count the hours for two real weeks.",
    "Week 4 — Choose a pilot that still has a human check.",
  ],
  pilot: [
    "Week 1 — Confirm the system that already holds the records.",
    "Week 2 — Map the trigger, the steps, and the handoff.",
    "Week 3 — Try the automation on a copy of real work.",
    "Week 4 — Compare hours, then decide what stays manual.",
  ],
  build: [
    "Week 1 — Pick the workflow with a named owner.",
    "Week 2 — Define the trigger, the actions, and the fallback.",
    "Week 3 — Ship a thin version the team can use this month.",
    "Week 4 — Watch the hours and tighten the exceptions.",
  ],
};

function band(score: number, cuts: [number, number], labels: [string, string, string]) {
  if (score < cuts[0]) return labels[0];
  if (score < cuts[1]) return labels[1];
  return labels[2];
}

function weakest(questions: Question[], answers: Record<string, number>, count: number) {
  return [...questions].sort((a, b) => answers[a.id] - answers[b.id] || questions.indexOf(a) - questions.indexOf(b)).slice(0, count);
}

export function readinessResult(answers: Record<string, number>): ToolResult | null {
  if (readinessQuestions.some((question) => answers[question.id] === undefined)) return null;
  const total = readinessQuestions.reduce((sum, question) => sum + question.options[answers[question.id]].score, 0);
  const score = Math.round((total / (readinessQuestions.length * 3)) * 100);
  const level = score < 45 ? "early" : score < 75 ? "pilot" : "build";
  const label = level === "early" ? "Early" : level === "pilot" ? "Ready to pilot" : "Ready to build";
  const moves = weakest(readinessQuestions, answers, 3).map((question) => question.recommend);
  const plan = readinessPlans[level];
  const summary =
    level === "early"
      ? "The work is real, and the foundation is thin. Start with one task, written down, before a model."
      : level === "pilot"
        ? "One workflow can be tried with a person still in the loop. Connect what you have before buying more."
        : "Records, repetition, and an owner are in place. A thin automation can ship this month.";

  const message = [
    "Tool: AI readiness assessment",
    `Score: ${score} / 100 (${label})`,
    summary,
    "Three moves:",
    ...moves.map((item, index) => `${index + 1}. ${item}`),
    "30-day plan:",
    ...plan,
    "We want a first slice based on this score.",
  ].join("\n");

  return {
    kicker: label,
    title: String(score),
    summary,
    score,
    stats: [
      { label: "Readiness", value: `${score} / 100` },
      { label: "Band", value: label },
      { label: "First month", value: "30 days" },
    ],
    blocks: [
      { title: "Three moves", items: moves },
      { title: "30-day plan", items: plan },
    ],
    note: "The score is from your answers. It is not a measure of models, vendors, or citations.",
    message,
    interest: "AI / Automation",
    next: { href: "/tools/roi", label: "Put a number on the hours" },
  };
}

export const crmQuestions: Question[] = [
  {
    id: "arrival",
    prompt: "Where do new leads arrive?",
    recommend: "Send every new lead into one pipeline and save where it came from.",
    workflow: "One pipeline for every new lead, with the source saved on the record.",
    options: [
      { label: "Personal inboxes and private chats", score: 0, risk: "A lead can sit unseen because it never left one person's inbox." },
      { label: "A shared inbox, then someone copies them across", score: 1, risk: "The copy from inbox to pipeline is manual, so new leads wait." },
      { label: "A form that drops them on a list", score: 2 },
      { label: "Straight into one pipeline", score: 3 },
    ],
  },
  {
    id: "owner",
    prompt: "Who takes the next step?",
    recommend: "Assign an owner the day the lead arrives, and show that name on the record.",
    workflow: "Same-day assignment, with the owner visible on the lead.",
    options: [
      { label: "Whoever notices the lead", score: 0, risk: "Leads have no owner, so follow-up depends on memory." },
      { label: "A manager assigns them when they remember", score: 1, risk: "Assignment waits on one person, and the first day is often lost." },
      { label: "Rules exist, with exceptions handled by hand", score: 2 },
      { label: "Every lead has an owner the same day", score: 3 },
    ],
  },
  {
    id: "followup",
    prompt: "How does follow-up happen?",
    recommend: "Put the next action and a due date on every open lead.",
    workflow: "A due date and a next action on every open lead.",
    options: [
      { label: "When someone remembers", score: 0, risk: "Follow-up has no date, so warm leads go quiet." },
      { label: "A reminder on a personal calendar", score: 1, risk: "Reminders live on private calendars, so the team cannot see who is late." },
      { label: "A shared list of people to call", score: 2 },
      { label: "The record carries the next action and the date", score: 3 },
    ],
  },
  {
    id: "deals",
    prompt: "How are deals tracked?",
    recommend: "Give each deal a stage, a value, and a next step the team updates.",
    workflow: "Stage, value, and next step kept current on each deal.",
    options: [
      { label: "In conversation", score: 0, risk: "Deal status lives in conversation, so the pipeline is a guess." },
      { label: "A spreadsheet of names", score: 1, risk: "A name list cannot show which deals are stuck." },
      { label: "Stages exist, and updates are uneven", score: 2 },
      { label: "Stage, value, and next step stay current", score: 3 },
    ],
  },
  {
    id: "report",
    prompt: "What can you see at the end of the week?",
    recommend: "Review pipeline, overdue follow-up, and close rate once a week.",
    workflow: "A weekly view of pipeline, overdue follow-up, and close rate.",
    options: [
      { label: "We do not report it", score: 0, risk: "Without a weekly view, missed follow-up stays invisible." },
      { label: "Someone counts wins at month end", score: 1, risk: "A month-end count is too late to save a quiet lead." },
      { label: "A sheet of open deals", score: 2 },
      { label: "A live view of pipeline, follow-up, and close rate", score: 3 },
    ],
  },
];

export function crmResult(answers: Record<string, number>): ToolResult | null {
  if (crmQuestions.some((question) => answers[question.id] === undefined)) return null;
  const chosen = crmQuestions.map((question) => ({ question, option: question.options[answers[question.id]] }));
  const total = chosen.reduce((sum, item) => sum + item.option.score, 0);
  const score = Math.round((total / (crmQuestions.length * 3)) * 100);
  const label = band(score, [45, 75], ["At risk", "Uneven", "In hand"]);
  const risks = chosen.flatMap((item) => (item.option.risk ? [item.option.risk] : []));
  const moves = weakest(crmQuestions, answers, 3).map((question) => question.workflow);
  const summary =
    label === "At risk"
      ? "Leads can arrive and go quiet without the team seeing it. The first fix is one pipeline and a due date."
      : label === "Uneven"
        ? "Parts of the process exist. The gaps are ownership, follow-up, or a view the team can trust each week."
        : "The handoffs are in place. The gain from here is speed and a weekly view, not a rescue.";

  const message = [
    "Tool: CRM & sales health check",
    `Score: ${score} / 100 (${label})`,
    summary,
    risks.length ? "Follow-up risks:" : "Follow-up risks: none flagged from these answers.",
    ...risks.map((item) => `- ${item}`),
    "Workflows to put in place:",
    ...moves.map((item, index) => `${index + 1}. ${item}`),
    "We want to talk about a CRM that matches this process.",
  ].join("\n");

  return {
    kicker: label,
    title: String(score),
    summary,
    score,
    stats: [
      { label: "Sales process", value: `${score} / 100` },
      { label: "Band", value: label },
      { label: "Risks flagged", value: String(risks.length) },
    ],
    blocks: [
      { title: risks.length ? "Where follow-up fails" : "What is holding", items: risks.length ? risks : ["No quiet-lead risk showed up in these answers."] },
      { title: "Workflows to add", items: moves },
    ],
    note: "A high score still leaves room for a faster handoff. The check only sees the answers you gave.",
    message,
    interest: "CRM",
    next: { href: "/tools/estimate", label: "Estimate a CRM build" },
  };
}

export const estimateProjects = [
  {
    id: "website",
    label: "Marketing website",
    interest: "Websites",
    weeks: [3, 8],
    usd: [3000, 14000],
    approach: "A content-led site with a page model the team can extend.",
    first: "Decide the pages and who is allowed to publish them.",
  },
  {
    id: "landing",
    label: "Landing page",
    interest: "Landing pages",
    weeks: [1, 4],
    usd: [1200, 5000],
    approach: "One offer, one action, then a handoff into the system that receives the lead.",
    first: "Write the offer, the proof, and the single action on the page.",
  },
  {
    id: "crm",
    label: "CRM",
    interest: "CRM",
    weeks: [6, 16],
    usd: [8000, 35000],
    approach: "Contacts, a pipeline, and the next action — a record the team opens in the morning.",
    first: "Define the stages, the owner, and the follow-up date.",
  },
  {
    id: "erp",
    label: "ERP slice",
    interest: "ERP",
    weeks: [10, 24],
    usd: [15000, 70000],
    approach: "One operational spine — finance, inventory, or the workflow that currently breaks — with permissions that match the company.",
    first: "Name the one operation the first release must run.",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    interest: "Advanced dashboards",
    weeks: [4, 12],
    usd: [6000, 24000],
    approach: "Live numbers for operators and directors, with the thresholds that make the view worth trusting.",
    first: "List the decisions the dashboard has to support each week.",
  },
  {
    id: "ai",
    label: "AI / automation",
    interest: "AI / Automation",
    weeks: [3, 12],
    usd: [4000, 22000],
    approach: "One repeated workflow, with a trigger, a fallback, and a person who can still explain it.",
    first: "Name the task, the hours, and the person who checks the output.",
  },
  {
    id: "lms",
    label: "LMS",
    interest: "LMS",
    weeks: [8, 20],
    usd: [12000, 48000],
    approach: "Courses, progress, and roles for learners, instructors, and admins.",
    first: "Decide who teaches, who learns, and what “finished” means.",
  },
  {
    id: "cms",
    label: "CMS",
    interest: "CMS",
    weeks: [4, 14],
    usd: [5000, 22000],
    approach: "Structured content editors can publish without waiting on a developer.",
    first: "List the content types and who approves them.",
  },
  {
    id: "mobile",
    label: "Mobile app",
    interest: "Mobile apps",
    weeks: [8, 22],
    usd: [14000, 55000],
    approach: "iOS and Android for work done away from a desk, sharing the system behind the website.",
    first: "Name the job people do on the phone, and the data it shares with the web.",
  },
] as const;

export type ProjectId = (typeof estimateProjects)[number]["id"];

export const estimateExtras = [
  { id: "accounts", label: "Accounts and permissions", weight: 0.12 },
  { id: "payments", label: "Payments", weight: 0.16 },
  { id: "portal", label: "A portal for customers", weight: 0.18 },
  { id: "reporting", label: "Reporting", weight: 0.1 },
  { id: "alerts", label: "Email or WhatsApp alerts", weight: 0.08 },
  { id: "bilingual", label: "Arabic and English", weight: 0.12 },
  { id: "assistant", label: "An assistant on one task", weight: 0.18 },
] as const;

export type ExtraId = (typeof estimateExtras)[number]["id"];

export const roleOptions = [
  { id: "team", label: "One team", factor: 1 },
  { id: "two", label: "Staff and customers", factor: 1.12 },
  { id: "many", label: "Several roles", factor: 1.28 },
] as const;

export const integrationOptions = [
  { id: "none", label: "None", factor: 1 },
  { id: "one", label: "One", factor: 1.1 },
  { id: "few", label: "Two or three", factor: 1.24 },
  { id: "many", label: "Four or more", factor: 1.42 },
] as const;

export const platformOptions = [
  { id: "web", label: "Web", web: 1, mobile: 1.12 },
  { id: "both", label: "Web and mobile", web: 1.48, mobile: 1.28 },
  { id: "mobile", label: "Mobile", web: 1.32, mobile: 1 },
] as const;

export const complexityOptions = [
  { id: "plain", label: "Straightforward", factor: 0.85 },
  { id: "typical", label: "Typical", factor: 1 },
  { id: "complex", label: "Complex", factor: 1.35 },
] as const;

export type EstimateInput = {
  project: ProjectId;
  extras: ExtraId[];
  role: (typeof roleOptions)[number]["id"];
  integrations: (typeof integrationOptions)[number]["id"];
  platform: (typeof platformOptions)[number]["id"];
  complexity: (typeof complexityOptions)[number]["id"];
  currency: Currency;
};

function roundMoney(usd: number, currency: Currency) {
  const amount = currency === "EGP" ? usd * PLANNING_EGP_PER_USD : usd;
  const step = currency === "EGP" ? 5000 : amount < 10000 ? 100 : 500;
  return Math.max(step, Math.round(amount / step) * step);
}

export function estimateResult(input: EstimateInput): ToolResult {
  const project = estimateProjects.find((item) => item.id === input.project) ?? estimateProjects[0];
  const role = roleOptions.find((item) => item.id === input.role) ?? roleOptions[0];
  const integrations = integrationOptions.find((item) => item.id === input.integrations) ?? integrationOptions[0];
  const platform = platformOptions.find((item) => item.id === input.platform) ?? platformOptions[0];
  const complexity = complexityOptions.find((item) => item.id === input.complexity) ?? complexityOptions[1];
  const selectedExtras = estimateExtras.filter((item) => input.extras.includes(item.id));
  const extraSum = selectedExtras.reduce((sum, item) => sum + item.weight, 0);
  const platformFactor = project.id === "mobile" ? platform.mobile : platform.web;
  const priceFactor = Math.min(3.5, role.factor * integrations.factor * platformFactor * complexity.factor * (1 + extraSum));
  const timeFactor = clamp(
    complexity.factor * (1 + (platformFactor - 1) * 0.7) * (1 + (integrations.factor - 1) * 0.55) * (1 + extraSum * 0.25),
    0.75,
    2.2,
  );

  let low = roundMoney(project.usd[0] * priceFactor, input.currency);
  let high = roundMoney(project.usd[1] * priceFactor, input.currency);
  const step = input.currency === "EGP" ? 5000 : 500;
  if (high <= low) high = low + step;

  let weeksLow = Math.max(1, Math.round(project.weeks[0] * timeFactor));
  let weeksHigh = Math.max(weeksLow + 1, Math.round(project.weeks[1] * timeFactor));

  const budget = `${money(low, input.currency)} – ${money(high, input.currency)}`;
  const timeline = `${weeksLow}–${weeksHigh} weeks`;
  const extraLine = selectedExtras.length ? ` Included here: ${selectedExtras.map((item) => item.label.toLowerCase()).join(", ")}.` : "";
  const approach = `${project.approach}${extraLine}`;
  const checklist = [
    project.first,
    "Name the integrations that have to work on day one.",
    "Treat this range as a first conversation. Sydrek confirms scope before any number is binding.",
  ];

  const message = [
    "Tool: Software project cost estimator",
    `Project: ${project.label}`,
    `Roles: ${role.label}`,
    `Integrations: ${integrations.label}`,
    `Platform: ${platform.label}`,
    `Complexity: ${complexity.label}`,
    `Extras: ${selectedExtras.length ? selectedExtras.map((item) => item.label).join(", ") : "None"}`,
    `Budget range: ${budget}`,
    `Timeline range: ${timeline}`,
    `Approach: ${approach}`,
    "The visitor was told this is a planning range, not a quotation.",
  ].join("\n");

  return {
    kicker: "Planning range",
    title: budget,
    summary: `${project.label} lands around ${timeline}. ${approach}`,
    stats: [
      { label: "Budget range", value: budget },
      { label: "Timeline", value: timeline },
      { label: "Shape", value: complexity.label },
    ],
    blocks: [
      { title: "Suggested approach", items: [approach] },
      { title: "Before a quote", items: checklist },
    ],
    note: `Shown in ${input.currency}. EGP uses a fixed planning rate of ${PLANNING_EGP_PER_USD} per USD, not a live rate. This is not a quotation.`,
    message,
    interest: project.interest,
    next: { href: "/tools/crm", label: "Check the sales process" },
  };
}
