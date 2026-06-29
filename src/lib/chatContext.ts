import { getAllPosts } from "@/lib/mdx";
import { projects } from "@/data/projects";
import { experience, featuredProjects } from "@/data/work";
import { shelfInteractiveSections } from "@/data/shelfInteractive";
import { nowData } from "@/data/now";
import type { ChatContextChunk, ChatSource, RankedChunk } from "@/lib/chatTypes";

const ABOUT_SUMMARY = [
  "Amogh Nagaraj (nrupa) is a backend-focused engineer based in Bengaluru.",
  "Core focus areas include distributed systems, databases, observability, APIs, and reliable backend architecture.",
  "Primary stack includes Go, Rust, TypeScript, PostgreSQL, Redis, Docker, Kafka, and cloud-native tooling.",
];

const PROFILE_FACTS = [
  {
    title: "Tech Stack",
    text:
      "Backend & APIs: Go, Rust, TypeScript, Express, Hono, gRPC, REST, WebSockets, tRPC, Node.js. " +
      "Data & Storage: PostgreSQL, Redis, MongoDB, Prisma, Drizzle, GORM, sqlC, sqlX. " +
      "Infrastructure: Docker, Kafka, NATS, RabbitMQ, Pulsar, Prometheus, Grafana. " +
      "Frontend: React, Next.js, TypeScript, JavaScript.",
    keywords: ["stack", "tech stack", "backend", "api", "database", "infrastructure", "frontend", "go", "rust", "typescript"],
  },
  {
    title: "Location and profile",
    text: "Amogh Nagaraj (nrupa) is based in Bengaluru, India and focuses on backend and distributed systems engineering.",
    keywords: ["location", "based", "bengaluru", "india", "who are you", "profile"],
  },
  {
    title: "Education",
    text:
      "Education: B.Tech in Computer Science and Engineering from Ramaiah Institute of Technology, Bengaluru. " +
      "Pre-university: PCME at Vidya Mandir Ind. PU College, Bengaluru.",
    keywords: ["education", "college", "degree", "btech", "ramaiah", "vidya mandir", "pcme", "study", "studied", "academic"],
  },
];

const STATIC_LINKS: ChatSource[] = [
  { title: "Home", url: "/", section: "home" },
  { title: "About", url: "/about", section: "about" },
  { title: "Projects", url: "/projects", section: "projects" },
  { title: "Shelf", url: "/shelf", section: "shelf" },
  { title: "Contact", url: "/contact", section: "contact" },
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function words(text: string): string[] {
  return normalize(text).split(" ").filter(Boolean);
}

function makeTrigrams(text: string): Set<string> {
  const n = normalize(text).replace(/\s+/g, "");
  const out = new Set<string>();
  if (n.length < 3) {
    if (n) out.add(n);
    return out;
  }
  for (let i = 0; i <= n.length - 3; i += 1) out.add(n.slice(i, i + 3));
  return out;
}

function trigramSimilarity(a: string, b: string): number {
  const A = makeTrigrams(a);
  const B = makeTrigrams(b);
  if (A.size === 0 || B.size === 0) return 0;
  let overlap = 0;
  A.forEach((token) => {
    if (B.has(token)) overlap += 1;
  });
  return (2 * overlap) / (A.size + B.size);
}

function tokenOverlapScore(queryTokens: string[], textTokens: string[]): number {
  if (queryTokens.length === 0 || textTokens.length === 0) return 0;
  const textSet = new Set(textTokens);
  const hits = queryTokens.filter((t) => textSet.has(t)).length;
  return hits / queryTokens.length;
}

function toSources(chunks: ChatContextChunk[]): ChatSource[] {
  const seen = new Set<string>();
  const sources: ChatSource[] = [];
  for (const chunk of chunks) {
    if (!chunk.url) continue;
    const key = `${chunk.section}:${chunk.url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    sources.push({
      title: chunk.title,
      url: chunk.url,
      section: chunk.section,
    });
  }
  for (const fallback of STATIC_LINKS) {
    if (sources.length >= 6) break;
    if (!sources.some((s) => s.url === fallback.url)) sources.push(fallback);
  }
  return sources;
}

function rankChunk(query: string, chunk: ChatContextChunk): RankedChunk {
  const queryTokens = words(query);
  const chunkTokens = words(`${chunk.title} ${chunk.text} ${chunk.keywords.join(" ")}`);
  const overlap = tokenOverlapScore(queryTokens, chunkTokens);
  const fuzzy = trigramSimilarity(query, `${chunk.title} ${chunk.text}`);
  const keywordBoost =
    queryTokens.length > 0
      ? queryTokens.filter((qt) => chunk.keywords.some((kw) => kw.includes(qt) || qt.includes(kw))).length /
        queryTokens.length
      : 0;

  const isStackIntent = queryTokens.some((t) => ["stack", "tech", "technology", "tools"].includes(t));
  const isProjectIntent = queryTokens.some((t) => ["project", "projects", "build", "built", "github"].includes(t));
  const isContactIntent = queryTokens.some((t) =>
    ["contact", "reach", "mail", "email", "hire", "linkedin", "twitter", "social", "socials", "connect"].includes(t),
  );
  const isNowIntent = queryTokens.some((t) =>
    ["now", "currently", "building", "reading", "thoughts", "working"].includes(t),
  );

  let sectionBoost = 0;
  if (isStackIntent && (chunk.section === "about" || chunk.section === "experience")) sectionBoost += 0.2;
  if (isProjectIntent && chunk.section === "projects") sectionBoost += 0.2;
  if (isContactIntent && chunk.section === "contact") sectionBoost += 0.25;
  if (isNowIntent && chunk.section === "now") sectionBoost += 0.25;
  if (chunk.section.startsWith("shelf-") && (isStackIntent || isProjectIntent)) sectionBoost -= 0.1;

  const score = overlap * 0.5 + fuzzy * 0.35 + keywordBoost * 0.15 + sectionBoost;
  return { chunk, score };
}

let chunksPromise: Promise<ChatContextChunk[]> | null = null;

async function buildChunks(): Promise<ChatContextChunk[]> {
  const chunks: ChatContextChunk[] = [];

  ABOUT_SUMMARY.forEach((line, idx) => {
    chunks.push({
      id: `about-summary-${idx}`,
      section: "about",
      title: "About",
      text: line,
      url: "/about",
      keywords: ["about", "nrupa", "amogh", "backend", "bengaluru"],
    });
  });

  PROFILE_FACTS.forEach((fact, idx) => {
    chunks.push({
      id: `profile-fact-${idx}`,
      section: "about",
      title: fact.title,
      text: fact.text,
      url: "/about",
      keywords: fact.keywords,
    });
  });

  chunks.push({
    id: "contact-info",
    section: "contact",
    title: "Contact and socials",
    text:
      "You can reach me by email at amogh.nagaraj03@gmail.com. I'm on GitHub, Twitter/X, and LinkedIn, " +
      "and you can schedule a quick call from the contact page. I'm based in Bengaluru, India and open to " +
      "collaborations, freelance work, and new opportunities.",
    url: "/contact",
    keywords: [
      "contact",
      "email",
      "mail",
      "reach",
      "hire",
      "freelance",
      "github",
      "twitter",
      "linkedin",
      "social",
      "socials",
      "connect",
      "collaborate",
      "call",
      "meeting",
    ],
  });

  chunks.push({
    id: "now-building",
    section: "now",
    title: "What I am building now",
    text: `Right now I am building ${nowData.building.title}: ${nowData.building.description} Stack: ${nowData.building.tags.join(", ")}.`,
    url: "/",
    keywords: ["now", "building", "current", "currently", "working on", "latest", nowData.building.title.toLowerCase(), ...nowData.building.tags.map((t) => t.toLowerCase())],
  });

  chunks.push({
    id: "now-reading",
    section: "now",
    title: "What I am reading now",
    text: `Currently reading: ${nowData.reading.join("; ")}.`,
    url: "/",
    keywords: ["now", "reading", "books", "currently reading", "book"],
  });

  chunks.push({
    id: "now-thoughts",
    section: "now",
    title: "What is on my mind",
    text: `Some things on my mind lately: ${nowData.thoughts.join(" ")}`,
    url: "/",
    keywords: ["now", "thoughts", "thinking", "ideas", "mind"],
  });

  projects.forEach((project) => {
    chunks.push({
      id: `project-${project.slug}`,
      section: "projects",
      title: project.name,
      text: `${project.tagline}. ${project.description}`,
      url: `/projects/${project.slug}`,
      keywords: [...project.tags, project.language, "project", "github"],
    });

    chunks.push({
      id: `project-link-${project.slug}`,
      section: "projects",
      title: `${project.name} links`,
      text: `GitHub: ${project.github}${project.live ? ` Live: ${project.live}` : ""}`,
      url: project.github,
      keywords: [...project.tags, "github", "repo", "code"],
    });
  });

  experience.forEach((role, idx) => {
    chunks.push({
      id: `experience-${idx}`,
      section: "experience",
      title: `${role.title} at ${role.company}`,
      text: `${role.period}. ${role.location}. ${role.bullets.join(" ")}`,
      url: "/about",
      keywords: [...role.tags, role.company, role.title, "experience", "work"],
    });
  });

  featuredProjects.forEach((item, idx) => {
    chunks.push({
      id: `featured-${idx}`,
      section: "about-projects",
      title: item.title,
      text: `${item.subtitle}. ${item.summary}. ${item.details.join(" ")}`,
      url: "/about",
      keywords: [...item.tags, "featured", "project"],
    });
  });

  shelfInteractiveSections.forEach((section) => {
    section.items.forEach((item, idx) => {
      chunks.push({
        id: `shelf-${section.id}-${idx}`,
        section: `shelf-${section.id}`,
        title: item.title,
        text: `${section.label}. ${item.sub}. ${item.desc}`,
        url: item.url ?? "/shelf",
        keywords: [...item.tags, item.type, section.label, "shelf", "reading"],
      });
    });
  });

  const posts = await getAllPosts();
  posts.forEach((post) => {
    chunks.push({
      id: `blog-${post.slug}`,
      section: "blog",
      title: post.title,
      text: `${post.excerpt} Tags: ${post.tags.join(", ")} Date: ${post.date}`,
      url: `/blog/${post.slug}`,
      keywords: [...post.tags, "blog", "writing", post.slug],
    });
  });

  return chunks;
}

async function getChatContextChunks(): Promise<ChatContextChunk[]> {
  if (!chunksPromise) chunksPromise = buildChunks();
  return chunksPromise;
}

export async function retrieveRelevantContext(query: string, limit = 6): Promise<{
  chunks: ChatContextChunk[];
  sources: ChatSource[];
}> {
  const allChunks = await getChatContextChunks();
  const ranked = allChunks
    .map((chunk) => rankChunk(query, chunk))
    .filter((entry) => entry.score > 0.08)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.chunk);

  const chunks = ranked.length > 0 ? ranked : allChunks.slice(0, Math.min(limit, allChunks.length));
  return {
    chunks,
    sources: toSources(chunks),
  };
}
