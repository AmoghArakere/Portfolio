type ProjectLanguage = "rust" | "go" | "typescript";

export type ProjectCategory =
  | "ai"
  | "ml"
  | "full-stack"
  | "backend"
  | "databases"
  | "distributed-systems";

export type Project = {
  slug: string;
  name: string;
  language: ProjectLanguage;
  tagline: string;
  description: string;
  github: string;
  live?: string;
  tags: string[];
  categories: ProjectCategory[];
};

export const projects: Project[] = [
  { slug: "juzfs", name: "juzfs", language: "rust", tagline: "Google's File System paper, in Rust.", description: "A comprehensive implementation of GFS with master-chunk coordination and replication workflows.", github: "https://github.com/nrupa/juzfs", tags: ["Rust", "Distributed Systems"], categories: ["backend", "distributed-systems", "databases"] },
  { slug: "cineyma", name: "cineyma", language: "rust", tagline: "Actor runtime inspired by Erlang.", description: "An actor-based concurrency runtime focused on supervision trees and fault-tolerance.", github: "https://github.com/nrupa/cineyma", live: "https://cineyma.vercel.app", tags: ["Rust", "Actors", "Concurrency"], categories: ["backend", "distributed-systems"] },
  { slug: "chug", name: "chug", language: "go", tagline: "Streaming ETL from Postgres to ClickHouse.", description: "Pipeline for incremental extraction and near real-time analytics sync.", github: "https://github.com/nrupa/chug", tags: ["Go", "ETL", "ClickHouse"], categories: ["backend", "databases"] },
  { slug: "lowkey", name: "lowkey", language: "go", tagline: "Distributed lock service on Raft.", description: "A consistency-first lock manager for clustered workloads.", github: "https://github.com/nrupa/lowkey", tags: ["Go", "Raft", "Distributed Systems"], categories: ["backend", "distributed-systems", "databases"] },
  { slug: "grit", name: "grit", language: "rust", tagline: "Git-style VCS for playlists.", description: "Versioned playlist history with snapshots, diffs, and branching.", github: "https://github.com/nrupa/grit", tags: ["Rust", "Storage", "CLI"], categories: ["backend", "databases"] },
  { slug: "pixtorrent", name: "pixtorrent", language: "go", tagline: "BitTorrent implementation in Go.", description: "Peer-to-peer file sharing primitives with piece exchange strategy.", github: "https://github.com/nrupa/pixtorrent", tags: ["Go", "P2P", "Networking"], categories: ["backend", "distributed-systems"] },
  { slug: "vaultify", name: "vaultify", language: "go", tagline: "Secrets management for small teams.", description: "Encrypted secrets storage with scoped access control and audit logs.", github: "https://github.com/nrupa/vaultify", tags: ["Go", "Security", "Infra"], categories: ["backend"] },
  { slug: "redis-in-rust", name: "redis in rust", language: "rust", tagline: "A tiny Redis clone.", description: "RESP, in-memory structures, and command execution in async Rust.", github: "https://github.com/nrupa/redis-in-rust", tags: ["Rust", "Tokio", "Databases"], categories: ["backend", "databases"] },
  { slug: "uptimex", name: "uptimex", language: "typescript", tagline: "Server monitoring SaaS.", description: "Track uptime, incidents, and service trends with alerting hooks.", github: "https://github.com/nrupa/uptimex", tags: ["TypeScript", "SaaS", "Monitoring"], categories: ["full-stack", "backend"] },
  { slug: "pixie-blog", name: "pixie blog", language: "typescript", tagline: "AI-powered publishing platform.", description: "A blogging workflow with AI-assisted drafting and smart content indexing.", github: "https://github.com/nrupa/pixie-blog", tags: ["TypeScript", "Next.js", "AI"], categories: ["ai", "ml", "full-stack"] },
];

export const githubExperiments = [
  ["raft-notes", "playground implementation notes for consensus internals"],
  ["mini-kafka", "event log experiments in go"],
  ["tiny-sql", "parser and planner explorations"],
  ["otel-lab", "distributed tracing instrumentation patterns"],
  ["cache-bench", "cache eviction benchmark scripts"],
  ["lua-locks", "atomic lock patterns with redis and lua"],
  ["tcp-snippets", "socket-level reliability snippets"],
  ["actor-mailbox", "mailbox scheduling strategies in rust"],
  ["cron-safe", "idempotent scheduler patterns"],
  ["retry-budget", "retry and circuit breaker math examples"],
  ["bloom-kit", "probabilistic structures in practice"],
  ["sql-index-playbook", "indexing patterns and anti-patterns"],
  ["grpc-auth", "gRPC auth interceptor templates"],
  ["pprof-cookbook", "performance profiling reference snippets"],
  ["queue-kit", "job queue edge-case simulations"],
  ["mmap-notes", "mmap and page-cache experiments"],
  ["tiny-redis-bench", "redis benchmark tooling notes"],
  ["stream-shapes", "stream processing operator experiments"],
  ["tx-patterns", "transaction consistency patterns"],
  ["saga-lab", "saga orchestration sample flows"],
] as const;
