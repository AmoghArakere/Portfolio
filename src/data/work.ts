type Role = {
  title: string;
  company: string;
  location: string;
  period: string;
  tags: string[];
  bullets: string[];
};

type FeaturedWork = {
  title: string;
  period: string;
  subtitle: string;
  tags: string[];
  summary: string;
  details: string[];
};

export const experience: Role[] = [
  {
    title: "Software Engineer",
    company: "Polaris Inc.",
    location: "Bengaluru",
    period: "Jul 2025 - Present",
    tags: [".Net Core", "C#", "Azure", "Postman", "Git"],
    bullets: [
      "Built and maintained backend APIs for internal and client-facing workflows.",
      "Worked on auth flows, role checks, and safe tenant data boundaries.",
      "Improved endpoint performance with query/index tuning and payload cleanups.",
      "Added observability with traces and metrics for faster issue debugging.",
    ],
  },
  {
    title: "Freelance Developer",
    company: "Freelance",
    location: "Bengaluru",
    period: "Sep 2024 - Dec 2024",
    tags: ["Python", "React", "Crew AI", "FastAPI", "Pinecone"],
    bullets: [
      "Delivered custom full-stack features for small business and portfolio products.",
      "Implemented API + database changes with migration-safe rollout steps.",
      "Set up deployment pipelines and production bug-fix cycles for clients.",
      "Collaborated on scope, timeline, and iterative delivery with weekly milestones.",
    ],
  },
];

export const featuredProjects: FeaturedWork[] = [
  {
    title: "Redis Server in Rust",
    period: "2025",
    subtitle: "Protocol-compatible Redis clone with async internals.",
    tags: ["Rust", "Tokio", "RESP Protocol", "TCP"],
    summary: "Building a low-latency in-memory key-value server with persistence experiments.",
    details: [
      "Implemented RESP parser and command execution layer.",
      "Added pub/sub primitives and key expiration handling.",
      "Benchmarked throughput against baseline Redis operations.",
    ],
  },
  {
    title: "UptimeX - Real-Time Server Monitoring",
    period: "2025",
    subtitle: "Multi-tenant monitoring and incident workflows.",
    tags: ["Node.js", "Next.js", "PostgreSQL", "GraphQL", "WebSockets"],
    summary: "A SaaS to monitor service health, alerts, and uptime analytics.",
    details: [
      "Built real-time metrics streaming over WebSockets.",
      "Implemented alert policies and incident notifications.",
      "Designed schema for tenant-aware data retention.",
    ],
  },
  {
    title: "PixTorrent - Distributed P2P File Sharing",
    period: "2025",
    subtitle: "BitTorrent-inspired peer coordination and transfer engine.",
    tags: ["Go", "Redis", "Docker", "BitTorrent Protocol"],
    summary: "A practical distributed systems project focused on data exchange reliability.",
    details: [
      "Implemented peer discovery and piece scheduling.",
      "Added swarm-state tracking and retry mechanisms.",
      "Containerized local clusters for load testing.",
    ],
  },
];
