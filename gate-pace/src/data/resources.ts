export interface ResourceLink {
  id: string;
  subject: string;
  title: string;
  category: 'GeeksforGeeks' | 'GateOverflow' | 'Textbook Guide' | 'Official Tool';
  url: string;
  description: string;
  tags: string[];
}

export const GATE_RESOURCES: ResourceLink[] = [
  // GeeksforGeeks Tracks
  {
    id: "gfg-ds-algo",
    subject: "Data Structures & Algorithms",
    title: "GeeksforGeeks: Data Structures & Algorithms for GATE",
    category: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/gate-cs-notes-gq/",
    description: "Complete chapter-by-chapter theory notes, recursion trees, sorting stability derivations, and graph algorithm questions.",
    tags: ["DS", "Algorithms", "Trees", "Graphs", "Sorting"]
  },
  {
    id: "gfg-toc",
    subject: "Theory of Computation",
    title: "GeeksforGeeks: Theory of Computation GATE Notes",
    category: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/toc-theory-of-computation-gate-notes/",
    description: "DFA state minimization tricks, Pumping Lemma step-by-step guides, Chomsky hierarchy and undecidability tables.",
    tags: ["TOC", "Automata", "CFG", "Turing Machines", "Decidability"]
  },
  {
    id: "gfg-os",
    subject: "Operating Systems",
    title: "GeeksforGeeks: Operating Systems GATE Notes",
    category: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/operating-systems-gate-notes/",
    description: "Multi-level paging numericals, TLB hit ratio EMAT calculations, Peterson's algorithm proofs, and Semaphore barrier patterns.",
    tags: ["OS", "Paging", "Semaphores", "Deadlocks", "Virtual Memory"]
  },
  {
    id: "gfg-dbms",
    subject: "Databases (DBMS)",
    title: "GeeksforGeeks: DBMS GATE Notes & SQL Queries",
    category: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/dbms-gate-notes/",
    description: "Functional dependency closure algorithm, minimal cover derivation, B+ Tree node order arithmetic, and ACID serializability.",
    tags: ["DBMS", "Normalization", "B+ Trees", "SQL", "Transactions"]
  },
  {
    id: "gfg-cn",
    subject: "Computer Networks",
    title: "GeeksforGeeks: Computer Networks GATE Notes",
    category: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/computer-networks-gate-notes/",
    description: "Sliding window protocol efficiency derivations, IPv4 subnetting and CIDR tables, TCP Congestion window AIMD graphs.",
    tags: ["Networks", "Sliding Window", "Subnetting", "TCP", "Routing"]
  },
  {
    id: "gfg-coa",
    subject: "Computer Organization and Architecture",
    title: "GeeksforGeeks: Computer Organization & Architecture",
    category: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/computer-organization-and-architecture-gate-notes/",
    description: "Cache mapping (Direct, Set-Associative) formulas, Pipeline hazard speedup derivations, IEEE-754 floating point arithmetic.",
    tags: ["COA", "Cache", "Pipelining", "Addressing Modes", "IEEE-754"]
  },
  {
    id: "gfg-dl",
    subject: "Digital Logic",
    title: "GeeksforGeeks: Digital Logic GATE Notes",
    category: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/digital-logic-gate-notes/",
    description: "K-map prime implicant shortcuts, Multiplexer tree sizing, Synchronous/Asynchronous counter Modulus calculations.",
    tags: ["Digital Logic", "K-Map", "Multiplexers", "Flip-Flops", "Counters"]
  },
  {
    id: "gfg-dm",
    subject: "Discrete Mathematics",
    title: "GeeksforGeeks: Engineering & Discrete Mathematics",
    category: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/engineering-mathematics-gate-notes/",
    description: "Euler's planar graph formula proofs, Combinatorics derangements, Posets & Lattices, Eigenvalues and Cayley-Hamilton.",
    tags: ["Discrete Math", "Graph Theory", "Linear Algebra", "Probability"]
  },

  // GateOverflow PYQ Archive
  {
    id: "go-archive",
    subject: "All Subjects",
    title: "GateOverflow Official Question Bank (1987–2026)",
    category: "GateOverflow",
    url: "https://gateoverflow.in/",
    description: "The gold standard community-vetted solutions for every single GATE CS question from 1987 to 2026 with detailed discussion threads.",
    tags: ["PYQs", "GateOverflow", "Solutions", "Discussion"]
  },
  {
    id: "go-tests",
    subject: "Mocks & Quizzes",
    title: "GateOverflow Timed Sectional & Subject Tests",
    category: "GateOverflow",
    url: "https://gateoverflow.in/exams",
    description: "Take timed official past paper tests in real exam environment with negative marking analysis.",
    tags: ["Practice Tests", "Sectional Tests", "Simulations"]
  },

  // Official Tools
  {
    id: "tcs-calc",
    subject: "General Aptitude & Math",
    title: "Official TCS Virtual Calculator Online Simulator",
    category: "Official Tool",
    url: "https://www.tcsion.com/OnlineAssessment/ScientificCalculator/Calculator.html",
    description: "Practice exclusively with the official on-screen virtual calculator to build muscle memory for exponents, logs, and trigonometry.",
    tags: ["Virtual Calculator", "TCS iON", "Calculation Speed"]
  },

  // Standard Textbook Readings
  {
    id: "book-clrs",
    subject: "Algorithms",
    title: "CLRS (Introduction to Algorithms) Reading Blueprint",
    category: "Textbook Guide",
    url: "https://gateoverflow.in/blog/14/recommended-books-for-gate-cse",
    description: "High-yield chapters: Ch 1-4 (Foundations & Recurrences), Ch 11 (Hashing), Ch 12 (BST), Ch 15 (DP), Ch 16 (Greedy), Ch 22-24 (Graphs).",
    tags: ["CLRS", "Standard Book", "Algorithms"]
  },
  {
    id: "book-galvin",
    subject: "Operating Systems",
    title: "Silberschatz, Galvin, Gagne (Operating System Concepts)",
    category: "Textbook Guide",
    url: "https://gateoverflow.in/blog/14/recommended-books-for-gate-cse",
    description: "Read Process Synchronization (Ch 5), Deadlocks (Ch 6), Main Memory & Virtual Memory (Ch 7-8).",
    tags: ["Galvin", "Operating Systems", "Standard Book"]
  }
];
