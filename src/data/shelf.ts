export type BookItem = {
  title: string;
  author: string;
  isbn?: string;
  type: "book" | "paper";
  source?: string;
  readCount?: number;
};

export type ShelfCategory = {
  name: string;
  items: BookItem[];
};

export const shelfCategories: ShelfCategory[] = [
  {
    name: "Distributed Systems & Databases",
    items: [
      { title: "Database Internals", author: "Alex Petrov", type: "book", isbn: "978-1492040347", readCount: 13 },
      { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", type: "book", isbn: "978-1449373320", readCount: 13 },
      { title: "Designing Distributed Systems", author: "Brendan Burns", type: "book", isbn: "978-1491983645", readCount: 8 },
      { title: "Streaming Systems", author: "Tyler Akidau", type: "book", isbn: "978-1491983874", readCount: 6 },
      { title: "Kafka: The Definitive Guide", author: "Neha Narkhede", type: "book", isbn: "978-1491936160", readCount: 5 },
      { title: "The Raft Paper", author: "Diego Ongaro", type: "paper", source: "Stanford / USENIX", readCount: 9 },
      { title: "The Chubby lock service", author: "Mike Burrows", type: "paper", source: "Google Research", readCount: 6 },
      { title: "Dynamo", author: "Giuseppe DeCandia", type: "paper", source: "Amazon", readCount: 7 },
      { title: "Bigtable", author: "Fay Chang", type: "paper", source: "Google Research", readCount: 7 },
      { title: "Spanner", author: "James C. Corbett", type: "paper", source: "Google Research", readCount: 8 },
      { title: "RocksDB Tuning Guide", author: "Meta", type: "paper", source: "Meta Engineering", readCount: 4 },
      { title: "ClickHouse in Practice", author: "ClickHouse", type: "paper", source: "ClickHouse Docs", readCount: 3 },
      { title: "Locks, Latches, and Storage Engine Concurrency", author: "Various", type: "paper", source: "CMU Database Group", readCount: 11 },
    ],
  },
  {
    name: "Languages & Systems",
    items: [
      { title: "Rust for Rustaceans", author: "Jon Gjengset", type: "book", isbn: "978-1718501850", readCount: 9 },
      { title: "Advanced Programming in the UNIX Environment", author: "W. Richard Stevens", type: "book", isbn: "978-0321637734", readCount: 4 },
      { title: "Go Programming Language", author: "Alan Donovan", type: "book", isbn: "978-0134190440", readCount: 6 },
      { title: "Operating Systems: Three Easy Pieces", author: "Remzi Arpaci-Dusseau", type: "book", isbn: "978-1985086593", readCount: 7 },
    ],
  },
  {
    name: "CS & Compilers",
    items: [
      { title: "Crafting Interpreters", author: "Robert Nystrom", type: "book", isbn: "978-0990582939", readCount: 4 },
      { title: "Compilers: Principles, Techniques, and Tools", author: "Aho, Lam, Sethi, Ullman", type: "book", isbn: "978-0321486813", readCount: 3 },
      { title: "Computer Systems: A Programmer's Perspective", author: "Bryant and O'Hallaron", type: "book", isbn: "978-0134092669", readCount: 5 },
    ],
  },
  {
    name: "Networking & Reliability",
    items: [{ title: "Site Reliability Engineering", author: "Google", type: "book", isbn: "978-1491929124", readCount: 4 }],
  },
];

export const flatReadingList = shelfCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, category: category.name })),
);
