export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  problem: string;
  hardPart: string;
  stats: { label: string; value: string }[];
  stack: string[];
  flow: string[]; // architecture diagram node labels, in order
  links: { github?: string; demo?: string };
  accent: "signal" | "success";
};

export const projects: Project[] = [
  {
    slug: "crowdsense-ai",
    name: "CrowdSense AI",
    tagline: "Predictive crowd management for Mumbai's transit network",
    period: "Mar 2026 — Apr 2026",
    problem:
      "Mumbai's suburban platforms carry 7.5M+ commuters daily. Existing CCTV systems are reactive — they document incidents after they happen, not before. CrowdSense predicts density surges 10-15 minutes ahead and recommends action before platforms become unsafe.",
    hardPart:
      "Keeping the YOLOv8 vision engine from blocking the main request thread while serving 5+ concurrent video feeds meant decoupling computer vision entirely from the Express API layer and streaming results back over Redis Pub/Sub instead of direct calls.",
    stats: [
      { label: "Concurrent feeds", value: "5+" },
      { label: "Stream latency", value: "<50ms" },
      { label: "Alert dispatch", value: "<2s" },
    ],
    stack: ["Python", "YOLOv8", "OpenCV", "Node.js", "Express", "Redis Pub/Sub", "WebSockets", "React", "MongoDB", "Twilio"],
    flow: ["CCTV / BLE / WiFi feeds", "YOLOv8 detection engine", "Kalman filter + Z-score risk model", "Redis Pub/Sub", "Command center + SMS alerts"],
    links: { github: "https://github.com/nachiketkale24-png" },
    accent: "signal",
  },
  {
    slug: "lablink",
    name: "LabLink",
    tagline: "Multi-tenant blood bank & lab coordination platform",
    period: "Jan 2026 — Feb 2026",
    problem:
      "Blood banks, hospitals, and donors operate as disconnected systems, so critical shortages surface too late. LabLink unifies all three into one platform with real-time proximity matching and automated shortage alerts.",
    hardPart:
      "Matching compatible donors within a live 10km radius fast enough to matter in an emergency meant building spatial queries on MongoDB GeoJSON indexes rather than computing distance in application code — the difference between a 3-second and a 30-second response.",
    stats: [
      { label: "Donor match radius", value: "10km" },
      { label: "Match response", value: "<3s" },
      { label: "Stock sync accuracy", value: "99.9%" },
    ],
    stack: ["React 19", "Node.js", "MongoDB", "GeoJSON", "JWT", "eRaktKosh API", "Gemini API"],
    flow: ["Donor / hospital request", "GeoJSON spatial index query", "Ranked match engine", "Real-time notification", "eRaktKosh stock sync"],
    links: { github: "https://github.com/nachiketkale24-png" },
    accent: "success",
  },
  {
    slug: "weapon-alert-system",
    name: "Weapon Alert System",
    tagline: "Real-time threat detection across live CCTV infrastructure",
    period: "May 2026 — Present",
    problem:
      "Standard object detection models degrade sharply as subjects move further from camera. This ongoing internship project isolates and corrects for distance-based detection decay across live CCTV streams, from initial detection through to instant alert dispatch.",
    hardPart:
      "Sub-second alert latency required a fault-tolerant socket-based frame pipeline that keeps tracking continuous across dropped frames and lighting shifts — evaluated against benchmark datasets (USRT, CCTV-Gun) rather than a single clean test set.",
    stats: [
      { label: "Alert latency", value: "<1s" },
      { label: "Benchmark sets", value: "2" },
      { label: "Team size", value: "6" },
    ],
    stack: ["Python", "YOLOv8", "CNNs", "DeepSORT", "Sockets"],
    flow: ["Live CCTV stream", "YOLOv8 + DeepSORT tracking", "Threshold decision logic", "Socket alert pipeline", "SMS / Email dispatch"],
    links: {},
    accent: "signal",
  },
];

export const stats = [
  { label: "Hackathons led", value: "15+" },
  { label: "VESIT ranking", value: "Top 40 / 2000+" },
  { label: "Stream latency", value: "<50ms" },
  { label: "Sync accuracy", value: "99.9%" },
];

export type TechCategory = {
  layer: string;
  description: string;
  items: string[];
};

export const techDepth: TechCategory[] = [
  {
    layer: "Detection & Vision",
    description: "Where raw signal becomes structured understanding",
    items: ["YOLOv8", "OpenCV", "DeepSORT", "CNNs"],
  },
  {
    layer: "Real-time Infrastructure",
    description: "Moving state between systems without anyone waiting",
    items: ["Redis Pub/Sub", "WebSockets", "Socket pipelines", "Express.js"],
  },
  {
    layer: "Data & Persistence",
    description: "Where correctness has to survive scale",
    items: ["MongoDB", "GeoJSON indexing", "SQL", "JWT auth"],
  },
  {
    layer: "Interface",
    description: "Where all of the above becomes legible to a human",
    items: ["React", "Next.js", "React Native", "Tailwind CSS"],
  },
];

export type TimelineEntry = {
  date: string;
  title: string;
  detail: string;
};

export const timeline: TimelineEntry[] = [
  {
    date: "2025",
    title: "Google 'Build with AI' Bootcamp",
    detail: "Certified in generative AI workflows and production-ready agent deployment.",
  },
  {
    date: "Jan 2026",
    title: "23 Ventures Pitchathon",
    detail: "4th position among 200+ startups for system design and execution.",
  },
  {
    date: "Feb 2026",
    title: "VESIT Hackathon",
    detail: "Top 40 of 2,000+ teams.",
  },
  {
    date: "Feb 2026",
    title: "GDG Mumbai",
    detail: "Top 50 of 1,000+ teams for applied tech solutions.",
  },
  {
    date: "Mar 2026",
    title: "Vasantdada Patil National Hackathon",
    detail: "Top 60 of 3,000+ teams nationwide.",
  },
  {
    date: "Mar 2026",
    title: "Barclays Hack-o-Hire",
    detail: "Delivered a full-stack solution within a 36-hour deadline.",
  },
  {
    date: "Apr 2026",
    title: "Hack4Innovation, VESIT",
    detail: "CrowdSense AI placed top 45 of 375 teams — later evolved into a 9-sensor fusion platform.",
  },
  {
    date: "May 2026",
    title: "SPTBI Internship",
    detail: "Began building the Weapon Alert Surveillance System as Software Engineering Intern.",
  },
];

export const profile = {
  name: "Nachiket Kale",
  role: "Software Engineer",
  subrole: "Systems, ML infra, and real-time architecture",
  location: "Mumbai, India",
  email: "nachiket.kale24@spit.ac.in",
  github: "https://github.com/nachiketkale24-png",
  linkedin: "https://linkedin.com/in/nachiket-kale-5363001b3",
  ticker: ["Python", "React", "YOLOv8", "Redis", "Node.js", "MongoDB"],
};
