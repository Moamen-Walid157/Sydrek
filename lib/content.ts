export const navLinks = [
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#process", id: "process", label: "Process" },
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#about", id: "about", label: "About" },
] as const;

export const services = [
  {
    index: "01",
    title: "Product platforms",
    text: "The surfaces people actually live in — calm, dense, and fast enough to trust on a Monday morning.",
    icon: "layers",
  },
  {
    index: "02",
    title: "Cloud & scale",
    text: "Regions, autoscaling, and the quiet machinery behind a number that stays at 99.99.",
    icon: "cloud",
  },
  {
    index: "03",
    title: "Security",
    text: "Zero-trust access, key rotation, and audit trails that read like a system, not a scramble.",
    icon: "shield",
  },
  {
    index: "04",
    title: "Data systems",
    text: "Pipelines, search, and warehouses that stay sharp when the volume stops being polite.",
    icon: "database",
  },
  {
    index: "05",
    title: "Observability",
    text: "Signals, traces, and alerts that explain themselves before anyone opens a bridge.",
    icon: "activity",
  },
  {
    index: "06",
    title: "Launch",
    text: "From the first deploy to the habits that keep the estate healthy after we step back.",
    icon: "rocket",
  },
] as const;

export const steps = [
  {
    index: "01",
    title: "Discover",
    text: "We map the system, the constraints, and the people who keep it alive. No theatre — a clear picture of what is already true.",
  },
  {
    index: "02",
    title: "Architect",
    text: "A lattice of services, data, and trust boundaries. The mark on our work is the same idea: structure on one side, live signal on the other.",
  },
  {
    index: "03",
    title: "Build",
    text: "Thin slices, watched from day one. The control room exists before the launch post does.",
  },
  {
    index: "04",
    title: "Launch",
    text: "We hand over the habits, the runbooks, and the dashboard — not a repository and a farewell.",
  },
] as const;

export const projects = [
  {
    slug: "synapse",
    tag: "Platforms",
    title: "Synapse desk",
    summary:
      "An operations surface for teams shipping intelligent systems — parameters, traces, and the network in one dark field.",
    story:
      "We shaped a desk that feels like a control room, not a settings page. The network stays visible. The parameters stay close. The mark sits on the machine the way a tool should: present, physical, quiet.",
    image: "/images/mockup-desk.jpg",
    alt: "Laptop on a studio desk showing a dark Sydrek operations dashboard, with the signal mark resting on the palm rest",
  },
  {
    slug: "signal",
    tag: "Product",
    title: "Signal in hand",
    summary:
      "The Sydrek mark, carried onto a phone — white structure, blue live state, readable at the size of a thumb.",
    story:
      "Identity has to survive the smallest screen. The arcs stay thick, the nodes stay clear, and the dark field keeps the signal bright without shouting.",
    image: "/images/mockup-phone.jpg",
    alt: "A phone floating above folded paper, its screen showing the Sydrek signal mark",
  },
  {
    slug: "field",
    tag: "Brand",
    title: "Field identity",
    summary:
      "The mark leaves the interface and goes into the world — same geometry, same blue, worn rather than displayed.",
    story:
      "A system brand should still feel human when it is printed, stitched, or held. The signal reads from across a room and up close.",
    image: "/images/mockup-identity.jpg",
    alt: "A person wearing a slate t-shirt printed with the large Sydrek signal mark",
  },
  {
    slug: "core",
    tag: "Infrastructure",
    title: "Core network",
    summary:
      "The wide field: code, throughput, and a living mesh around the mark. This is the picture we build toward.",
    story:
      "Infrastructure work is invisible until it isn't. The cover is our promise of that moment — a network you can see, a core you can name, a signal that stays in sync.",
    image: "/images/cover.jpg",
    alt: "Wide cinematic artwork of the glowing Sydrek mark inside a blue network of nodes, code, and dashboards",
  },
] as const;

export const showcase = [
  ...projects,
  {
    slug: "mark",
    tag: "Mark",
    title: "The core, up close",
    summary:
      "White arcs for structure. Blue arcs for live state. Two nodes, one path — the lattice under everything we ship.",
    story: "",
    image: "/images/mark-full.jpg",
    alt: "Close photograph of the physical Sydrek signal mark on a dark textured field",
  },
] as const;

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

export const logs = [
  "12:04:11  deploy  sydrek-api@v2.14.0 → eu-west-1  ✓ healthy",
  "12:04:14  scale   workers 8 → 12  (cpu 71%)",
  "12:04:19  cache   warm 4,412 keys in 240ms",
  "12:04:22  auth    rotated signing keys  ✓",
  "12:04:30  alert   p95 > 80ms on /search — auto-resolved",
];
