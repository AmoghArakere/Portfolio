export type ChatSource = {
  title: string;
  url: string;
  section: string;
};

export type ChatRequestBody = {
  message: string;
};

export type ChatResponseBody = {
  answer: string;
  sources: ChatSource[];
};

export type ChatContextChunk = {
  id: string;
  section: string;
  title: string;
  text: string;
  url?: string;
  keywords: string[];
};

export type RankedChunk = {
  chunk: ChatContextChunk;
  score: number;
};
