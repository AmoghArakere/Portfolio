export type Role = {
  title: string;
  company: string;
  location: string;
  period: string;
  tags: string[];
  bullets: string[];
};

export type FeaturedWork = {
  title: string;
  period: string;
  subtitle: string;
  tags: string[];
  summary: string;
  details: string[];
};

export const experience: Role[] = [
  {
    title: "Associate Software Engineer",
    company: "Polaris Inc.",
    location: "Bengaluru",
    period: "July 2025 - Present",
    tags: ["Go", "Microsoft Azure", "NUnit", "Postman", "Git"],
    bullets: [
      "Building backend for a multi-tenant SaaS platform with secure service boundaries.",
      "Designed JWT auth with RBAC and tenant-aware isolation.",
      "Shipped high-throughput APIs in Go and Echo with PostgreSQL.",
      "Integrated OpenTelemetry traces and metrics across critical services.",
      "Built migration-safe data workflows and internal admin tooling.",
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
