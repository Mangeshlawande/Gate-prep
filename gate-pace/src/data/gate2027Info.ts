// Official GATE 2027 CS & IT Information, Subject Weightage, Exam Patterns, and High-Yield Q&A

export interface SubjectWeightage {
  subject: string;
  expectedMarks: number;
  percentage: number;
  difficulty: 'Easy' | 'Moderate' | 'High' | 'Very High';
  highYieldTopics: string[];
  referenceBook: string;
}

export interface GateQA {
  id: string;
  subject: string;
  topic: string;
  questionType: 'MCQ' | 'MSQ' | 'NAT';
  marks: 1 | 2;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  examTrap: string;
}

export const GATE_2027_EXAM_OVERVIEW = {
  organizingInstitute: "IIT Madras",
  examinationMode: "Computer Based Test (CBT)",
  language: "English",
  durationMinutes: 180,
  totalQuestions: 65,
  totalMarks: 100,
  examDates: "February 6, 7, 13, 14, 20 & 21, 2027",
  scoreValidityYears: 3,
  sectionsBreakdown: [
    { section: "General Aptitude (GA)", questions: 10, marks: 15, weightagePct: 15 },
    { section: "Engineering Mathematics & Discrete Math", questions: 10, marks: 13, weightagePct: 13 },
    { section: "Core Computer Science Technical Subjects", questions: 45, marks: 72, weightagePct: 72 }
  ],
  questionTypes: [
    {
      type: "Multiple Choice Questions (MCQ)",
      description: "Objective type with 4 options and exactly 1 correct option.",
      marking: "+1 for 1-mark (Negative: -0.33) | +2 for 2-mark (Negative: -0.66)",
      strategy: "Zero wild guessing! 3 wrong 2-markers cost 8 marks total."
    },
    {
      type: "Multiple Select Questions (MSQ)",
      description: "One or more than one choices may be correct out of 4 options.",
      marking: "+1 or +2 marks for all correct choices selected. NO negative marking. NO partial marking.",
      strategy: "Check each option independently like a True/False statement."
    },
    {
      type: "Numerical Answer Type (NAT)",
      description: "Enter decimal/integer answer using on-screen virtual keyboard.",
      marking: "+1 or +2 marks. ZERO negative marking.",
      strategy: "Never leave blank if within mathematical bounds. Compute with on-screen Virtual Calculator."
    }
  ]
};

export const SUBJECT_WEIGHTAGE_DATA: SubjectWeightage[] = [
  {
    subject: "General Aptitude (GA)",
    expectedMarks: 15,
    percentage: 15,
    difficulty: "Easy",
    highYieldTopics: [
      "Quantitative: Ratios, Percentages, Work & Time, Speed-Distance",
      "Analytical: Deductions, Syllogisms, Numerical Series",
      "Spatial: 2D/3D Rotations, Paper Folding, Mirror Images",
      "Verbal: Grammar, Concord, Vocabulary in context"
    ],
    referenceBook: "R.S. Aggarwal & Official Past GATE Papers"
  },
  {
    subject: "Engineering Mathematics & Discrete Math",
    expectedMarks: 15,
    percentage: 15,
    difficulty: "Moderate",
    highYieldTopics: [
      "Discrete Math: Propositional Logic, Equivalence Relations, Partial Orders & Lattices",
      "Graph Theory: Planar graphs (Euler's formula), Chromatic numbers, Matching",
      "Combinatorics: Pigeonhole Principle, Derangements, Generating functions",
      "Linear Algebra: Eigenvalues, Cayley-Hamilton, Rank, System AX=B",
      "Probability: Bayes' Theorem, Poisson, Exponential, Expectation & Variance",
      "Calculus: Limits, Maxima & Minima"
    ],
    referenceBook: "Kenneth H. Rosen (Discrete) & Erwin Kreyszig (Engg Math)"
  },
  {
    subject: "Programming & Data Structures",
    expectedMarks: 10,
    percentage: 10,
    difficulty: "Moderate",
    highYieldTopics: [
      "C Pointers, Double Pointers, Memory Layout & Operator Precedence",
      "Recursion Tracing, Stack Activation Records",
      "Binary Trees: Traversals, Height, Degree-2 relation (n0 = n2 + 1)",
      "Binary Search Trees: Predecessor/Successor, Deletion cases",
      "Binary Heaps: O(n) Heapify derivation, Priority Queues"
    ],
    referenceBook: "Kernighan & Ritchie (C) and Mark Allen Weiss (Data Structures)"
  },
  {
    subject: "Algorithms",
    expectedMarks: 9,
    percentage: 9,
    difficulty: "High",
    highYieldTopics: [
      "Asymptotic Analysis & Master Theorem (including non-polynomial edge cases)",
      "Divide & Conquer: Merge Sort inversions, Quick Sort pivot analysis",
      "Dynamic Programming: 0/1 Knapsack, Matrix Chain, LCS, Bellman-Ford",
      "Greedy Algorithms: Huffman coding tree, Fractional Knapsack",
      "Graph Algorithms: Dijkstra, Prim's, Kruskal's, Topological Sort"
    ],
    referenceBook: "CLRS (Introduction to Algorithms)"
  },
  {
    subject: "Operating Systems",
    expectedMarks: 9,
    percentage: 9,
    difficulty: "Moderate",
    highYieldTopics: [
      "Processes & CPU Scheduling: SJF, Round Robin, Gantt chart Turnaround time",
      "Synchronization: Peterson's algorithm, Semaphores (Counting & Binary)",
      "Deadlocks: Banker's safety algorithm, Resource Allocation Graph",
      "Memory Management: Multi-level Paging, EMAT with TLB, Inverted Page Tables",
      "Virtual Memory: Page Replacement (FIFO, LRU, Optimal), Belady's anomaly",
      "File Systems & Disk Scheduling: i-nodes, SCAN, C-SCAN, LOOK"
    ],
    referenceBook: "Silberschatz, Galvin, Gagne (Operating System Concepts)"
  },
  {
    subject: "Theory of Computation (TOC)",
    expectedMarks: 9,
    percentage: 9,
    difficulty: "High",
    highYieldTopics: [
      "DFA Design & State Minimization (Myhill-Nerode equivalence)",
      "Regular Expressions, Pumping Lemma for Regular Languages",
      "Context-Free Grammars, Ambiguity, DPDA vs NPDA",
      "Chomsky Hierarchy: Regular vs CFL vs CSL vs REC vs RE",
      "Closure Properties Master Table",
      "Decidability & Rice's Theorem on semantic properties"
    ],
    referenceBook: "Peter Linz (Formal Languages and Automata)"
  },
  {
    subject: "Computer Organization & Architecture (COA)",
    expectedMarks: 8,
    percentage: 8,
    difficulty: "High",
    highYieldTopics: [
      "Instruction Pipelining: Pipeline speedup, RAW/WAR/WAW hazards, branch penalty",
      "Memory Hierarchy: Cache Mapping (Direct, Set-Associative, Fully-Associative)",
      "Average Memory Access Time (AMAT) and Tag Directory size calculations",
      "Addressing Modes & Machine Instructions",
      "IEEE 754 Floating Point Representation (Single & Double precision)",
      "I/O Interfaces: Interrupt driven, DMA cycle stealing"
    ],
    referenceBook: "Carl Hamacher & David A. Patterson / John L. Hennessy"
  },
  {
    subject: "Databases (DBMS)",
    expectedMarks: 8,
    percentage: 8,
    difficulty: "Moderate",
    highYieldTopics: [
      "Relational Algebra & SQL: Nested subqueries, joins, aggregation",
      "Functional Dependencies & Candidate Keys derivation",
      "Normalization: 1NF, 2NF, 3NF, BCNF, Lossless joins, Dependency preservation",
      "B and B+ Trees: Order of node, max/min records, height calculations",
      "Transactions & Concurrency: Conflict serializability precedence graph, 2PL & Strict 2PL"
    ],
    referenceBook: "Silberschatz, Korth, Sudarshan (Database System Concepts)"
  },
  {
    subject: "Computer Networks",
    expectedMarks: 8,
    percentage: 8,
    difficulty: "High",
    highYieldTopics: [
      "Flow Control: Stop-and-Wait, Go-Back-N, Selective Repeat window sizing & efficiency",
      "Data Link: Framing, CRC polynomial division, CSMA/CD minimum frame size",
      "Network Layer: IPv4 header, Fragment Offset (/8 rule), CIDR Subnetting",
      "Routing Algorithms: Distance Vector (Count to Infinity), Link State (Dijkstra)",
      "Transport Layer: TCP Congestion Control (Slow start, Congestion avoidance, AIMD)",
      "Application Layer: DNS, HTTP Persistent vs Non-Persistent RTT"
    ],
    referenceBook: "Kurose & Ross (Computer Networking: A Top-Down Approach)"
  },
  {
    subject: "Digital Logic",
    expectedMarks: 5,
    percentage: 5,
    difficulty: "Easy",
    highYieldTopics: [
      "Boolean Algebra, Minimization, De Morgan's laws",
      "K-Maps: Prime Implicants, Essential Prime Implicants, Don't care conditions",
      "Combinational Circuits: Multiplexers, Decoders, Half/Full Adders",
      "Sequential Circuits: JK, T, D Flip-flops, Synchronous/Asynchronous Counters",
      "Number Systems: 2's complement arithmetic, Overflow conditions"
    ],
    referenceBook: "M. Morris Mano (Digital Design)"
  },
  {
    subject: "Compiler Design",
    expectedMarks: 4,
    percentage: 4,
    difficulty: "Moderate",
    highYieldTopics: [
      "Lexical Analysis: Token counting, regular expressions",
      "Parsing: First & Follow sets, LL(1) table conflicts",
      "Bottom-Up Parsing: LR(0), SLR(1), LALR(1), CLR(1) item sets and conflicts",
      "Syntax Directed Translation (SDT): S-attributed vs L-attributed definitions",
      "Intermediate Code Generation & Basic Blocks: Control flow graphs, liveness"
    ],
    referenceBook: "Aho, Lam, Sethi, Ullman (Dragon Book)"
  }
];

export const HIGH_YIELD_QA_SAMPLES: GateQA[] = [
  {
    id: "qa-1",
    subject: "Theory of Computation",
    topic: "Closure Properties",
    questionType: "MSQ",
    marks: 2,
    questionText: "Which of the following statements is/are TRUE regarding the closure properties of formal language classes?",
    options: [
      "A. The class of Context-Free Languages is closed under intersection with Regular Languages.",
      "B. The class of Deterministic Context-Free Languages (DCFL) is closed under complementation.",
      "C. The class of Recursive Languages is closed under intersection.",
      "D. The class of Recursively Enumerable (RE) languages is closed under complementation."
    ],
    correctAnswer: "A, B, C",
    explanation: "A is TRUE: CFL intersected with Regular is always CFL. B is TRUE: DCFL is closed under complement (flip final and non-final states of DPDA). C is TRUE: Recursive languages are closed under intersection, union, and complement. D is FALSE: If both L and L' are RE, then L is Recursive; hence RE is not closed under complement.",
    examTrap: "Many students confuse CFL with DCFL; CFL is NOT closed under complement, but DCFL IS closed under complement."
  },
  {
    id: "qa-2",
    subject: "Operating Systems",
    topic: "Paging & EMAT",
    questionType: "NAT",
    marks: 2,
    questionText: "Consider a two-level paging system with a TLB. The TLB search time is 10 ns, and the main memory access time is 100 ns. The TLB hit ratio is 90%. What is the Effective Memory Access Time (EMAT) in nanoseconds?",
    correctAnswer: "130",
    explanation: "For a k-level page table (here k = 2):\\nOn TLB hit (prob 0.9): Time = t_tlb + t_m = 10 + 100 = 110 ns.\\nOn TLB miss (prob 0.1): Time = t_tlb + (k + 1) * t_m = 10 + (2 + 1) * 100 = 10 + 300 = 310 ns.\\nEMAT = 0.9 * 110 + 0.1 * 310 = 99 + 31 = 130 ns.",
    examTrap: "Common blunder: Forgetting the final memory access to read the actual data frame on a TLB miss, mistakenly using 2 accesses instead of 3."
  },
  {
    id: "qa-3",
    subject: "Computer Organization & Architecture",
    topic: "Cache Mapping",
    questionType: "NAT",
    marks: 2,
    questionText: "A 4-way set-associative cache memory has a total size of 64 KB with a cache block size of 32 bytes. The CPU generates a 32-bit physical address. What is the number of bits in the TAG field of the physical address?",
    correctAnswer: "18",
    explanation: "1. Block size = 32 bytes = 2^5 bytes => Word Offset = 5 bits.\\n2. Total cache size = 64 KB = 2^16 bytes.\\n3. Number of lines = 2^16 / 2^5 = 2^11 = 2048 lines.\\n4. In 4-way set associative: Number of Sets = 2048 / 4 = 512 sets = 2^9 sets => Set Index = 9 bits.\\n5. Tag bits = 32 - (Set Index + Word Offset) = 32 - (9 + 5) = 32 - 14 = 18 bits.",
    examTrap: "Dividing total bytes by 4 instead of dividing number of lines by associativity to find the number of sets."
  },
  {
    id: "qa-4",
    subject: "Computer Networks",
    topic: "IP Fragmentation",
    questionType: "MCQ",
    marks: 2,
    questionText: "An IPv4 datagram of total length 4000 bytes (including a 20-byte IP header) arrives at a router and must be forwarded over an MTU of 1500 bytes. What is the fragment offset value of the second fragment?",
    options: [
      "A. 185",
      "B. 1480",
      "C. 370",
      "D. 187"
    ],
    correctAnswer: "A",
    explanation: "MTU = 1500 bytes. Header = 20 bytes. Max payload per fragment = 1500 - 20 = 1480 bytes (which is a multiple of 8: 1480 / 8 = 185).\\nFirst fragment carries payload bytes 0 to 1479.\\nSecond fragment begins at payload byte index 1480.\\nFragment Offset field = Start Byte / 8 = 1480 / 8 = 185.",
    examTrap: "Selecting 1480 (Option B) by forgetting that the IPv4 Fragment Offset field is scaled by 8 bytes."
  },
  {
    id: "qa-5",
    subject: "Algorithms",
    topic: "Recurrence & Master Theorem",
    questionType: "MCQ",
    marks: 1,
    questionText: "What is the asymptotic time complexity of the recurrence relation T(n) = 2T(n/2) + n / log n?",
    options: [
      "A. Theta(n log n)",
      "B. Theta(n log(log n))",
      "C. Theta(n)",
      "D. Theta(n^2)"
    ],
    correctAnswer: "B",
    explanation: "Here a = 2, b = 2. n^(log_b a) = n^1 = n. f(n) = n / log n = n * (log n)^(-1).\\nThis matches the Extended Master Theorem Case 2 with k = -1:\\nWhen f(n) = Theta(n^(log_b a) * (log n)^(-1)), T(n) = Theta(n^(log_b a) * log(log n)) = Theta(n log(log n)).",
    examTrap: "Blindly using standard Case 1 or Case 3 without verifying polynomial difference."
  },
  {
    id: "qa-6",
    subject: "Discrete Mathematics",
    topic: "Planar Graphs",
    questionType: "NAT",
    marks: 2,
    questionText: "A connected planar bipartite simple graph has 10 vertices. What is the MAXIMUM possible number of edges in this graph?",
    correctAnswer: "16",
    explanation: "For any planar graph, Euler's formula states V - E + R = 2.\\nSince the graph is bipartite, it contains NO odd cycles (minimum cycle length is 4: each region has at least 4 boundary edges => 2E >= 4R => R <= E/2).\\nSubstituting into Euler's formula: V - E + E/2 >= 2 => V - E/2 >= 2 => E <= 2V - 4.\\nFor V = 10 vertices: Max Edges E = 2*(10) - 4 = 20 - 4 = 16 edges.",
    examTrap: "Using the general planar graph bound E <= 3V - 6 (which yields 24), which is invalid for bipartite (triangle-free) graphs!"
  }
];
