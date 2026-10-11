// Knowledge Base Seeder: Ingests Comprehensive GATE Curriculum, Topics, Target Questions (MCQ/MSQ/NAT), Clarity Resources, Formulas, and PYQs
import { globalVectorDb, VectorDocument } from './vectorDb';
import { globalGraphDb, GraphNode, GraphEdge } from './graphDb';
import { FORMULA_DECK } from '@/data/formulaDeck';
import { GATE_RESOURCES } from '@/data/resources';
import { SUBJECT_WEIGHTAGE_DATA, HIGH_YIELD_QA_SAMPLES } from '@/data/gate2027Info';
import { GATE_90_DAYS_CURRICULUM } from '@/data/curriculum';

export type QuestionTaxonomyType = 'MCQ' | 'MSQ' | 'NAT';

export interface TargetQuestion {
  id: string;
  questionType: QuestionTaxonomyType;
  marks: 1 | 2;
  title: string;
  problemStatement: string;
  options?: string[]; // For MCQ & MSQ
  correctAnswer: string;
  stepByStepSolution: string;
  trapExplanation: string; // Specific exam trap for this question type
  testedYear?: string;
}

export interface TopicResourceLink {
  title: string;
  type: 'Textbook' | 'GateOverflow' | 'GeeksforGeeks' | 'Video/NPTEL' | 'Visualizer';
  url: string;
  chapterOrTopic: string;
  clarityNotes: string; // What specific section to read for maximum clarity
}

export interface TopicDefinition {
  id: string;
  subjectId: string;
  subjectName: string;
  name: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very High';
  expectedMarks: number;
  questionTaxonomy: {
    primaryType: QuestionTaxonomyType;
    frequency: 'Annual Must-Ask' | 'High Frequency' | 'Moderate';
    typicalFormat: string;
  };
  prerequisites: string[]; // Topic IDs this topic depends on
  description: string;
  commonTrap: string;
  clarityResources: TopicResourceLink[];
  targetQuestions: TargetQuestion[];
  tags: string[];
}

// Core GATE CS Subjects
export const CORE_GATE_SUBJECTS = [
  { id: 'subj-math', name: 'Engineering Mathematics', expectedMarks: 13, book: 'Kenneth Rosen & Erwin Kreyszig' },
  { id: 'subj-ga', name: 'General Aptitude', expectedMarks: 15, book: 'R.S. Aggarwal & Official GATE Papers' },
  { id: 'subj-dl', name: 'Digital Logic', expectedMarks: 5, book: 'M. Morris Mano' },
  { id: 'subj-coa', name: 'Computer Organization & Architecture', expectedMarks: 9, book: 'Carl Hamacher / Hennessy & Patterson' },
  { id: 'subj-prog-ds', name: 'Programming & Data Structures', expectedMarks: 10, book: 'Kernighan & Ritchie (C) / Mark Allen Weiss' },
  { id: 'subj-algo', name: 'Algorithms', expectedMarks: 8, book: 'Thomas H. Cormen (CLRS)' },
  { id: 'subj-toc', name: 'Theory of Computation', expectedMarks: 9, book: 'Peter Linz / Michael Sipser' },
  { id: 'subj-cd', name: 'Compiler Design', expectedMarks: 4, book: 'Aho, Lam, Sethi, Ullman (Dragon Book)' },
  { id: 'subj-os', name: 'Operating Systems', expectedMarks: 9, book: 'Silberschatz, Galvin & Gagne' },
  { id: 'subj-dbms', name: 'Databases (DBMS)', expectedMarks: 8, book: 'Korth, Silberschatz & Sudarshan' },
  { id: 'subj-cn', name: 'Computer Networks', expectedMarks: 8, book: 'Kurose & Ross / Andrew S. Tanenbaum' }
];

export const CORE_TOPICS: TopicDefinition[] = [
  // ==========================================
  // 1. OPERATING SYSTEMS
  // ==========================================
  {
    id: 'topic-paging-tlb',
    subjectId: 'subj-os',
    subjectName: 'Operating Systems',
    name: 'Virtual Memory, Multi-Level Paging & TLB',
    difficulty: 'Very High',
    expectedMarks: 4,
    questionTaxonomy: {
      primaryType: 'NAT',
      frequency: 'Annual Must-Ask',
      typicalFormat: '2-Mark NAT calculation on Effective Memory Access Time (EMAT) or page table size'
    },
    prerequisites: [],
    description: 'Hierarchical multi-level page tables, virtual address split (VPN bits vs Page Offset), TLB hit/miss penalties, Effective Memory Access Time (EMAT), Inverted Page Tables.',
    commonTrap: 'On TLB Miss in a k-level paging scheme, total memory access time is (k + 1) * t_m, NOT 2 * t_m! Each level of page table must be referenced in RAM before fetching the actual frame.',
    clarityResources: [
      {
        title: 'Silberschatz, Galvin & Gagne: Operating System Concepts',
        type: 'Textbook',
        url: 'https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/',
        chapterOrTopic: 'Chapter 9: Virtual Memory (Sections 9.2 - 9.4)',
        clarityNotes: 'Study Figure 9.8 for exact hardware address translation with TLB and multi-level page tables.'
      },
      {
        title: 'GateOverflow: Multi-Level Paging & TLB PYQs',
        type: 'GateOverflow',
        url: 'https://gateoverflow.in/tag/multi-level-paging',
        chapterOrTopic: 'GateOverflow Tag: Multi-Level Paging',
        clarityNotes: 'Solve past 15 years GATE questions; pay close attention to byte-addressed vs word-addressed memory.'
      },
      {
        title: 'GeeksforGeeks: Paging & TLB in Operating Systems',
        type: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/virtual-memory-in-operating-system/',
        chapterOrTopic: 'Virtual Memory Architecture',
        clarityNotes: 'Quick reference derivations for page table size = (Number of virtual pages) * (Page Table Entry size).'
      }
    ],
    targetQuestions: [
      {
        id: 'q-paging-emat-nat',
        questionType: 'NAT',
        marks: 2,
        title: '2-Level Paging EMAT with TLB',
        problemStatement: 'In a system with a 2-level hierarchical page table, memory access time t_m = 100 ns and TLB access time t_tlb = 10 ns. The TLB hit ratio is 90% (0.90). Assuming TLB is looked up simultaneously with the first memory access, what is the Effective Memory Access Time (EMAT) in nanoseconds?',
        correctAnswer: '130',
        stepByStepSolution: '1. On TLB hit (prob 0.9): Time = t_tlb + t_m = 10 + 100 = 110 ns.\n2. On TLB miss (prob 0.1): In a 2-level page table (k = 2), we access Outer Page Table, then Inner Page Table, then Actual Data Frame => Total 3 memory accesses + TLB check => Time = t_tlb + (2 + 1) * t_m = 10 + 3 * 100 = 310 ns.\n3. EMAT = 0.9 * 110 + 0.1 * 310 = 99 + 31 = 130 ns.',
        trapExplanation: 'NAT Trap: Forgetting that a 2-level page table requires 2 levels of page table lookup PLUS 1 final data reference (3 RAM accesses total on miss).',
        testedYear: 'GATE 2024'
      },
      {
        id: 'q-paging-msq',
        questionType: 'MSQ',
        marks: 2,
        title: 'Virtual Memory Architectural Properties',
        problemStatement: 'Which of the following statements regarding Virtual Memory and Paging are TRUE? (Select all that apply)',
        options: [
          'A: Multi-level paging reduces the total size of page tables required when the process address space is sparse.',
          'B: Increasing the page size always decreases internal fragmentation.',
          'C: An Inverted Page Table has one entry per physical frame rather than per virtual page.',
          'D: TLB hit ratio depends on the locality of reference exhibited by the process.'
        ],
        correctAnswer: 'A, C, D',
        stepByStepSolution: 'A is TRUE: Pages not allocated do not require inner page tables.\nB is FALSE: Increasing page size INCREASES internal fragmentation on average (half a page wasted per segment).\nC is TRUE: Inverted page table has exactly one entry per physical page frame.\nD is TRUE: High temporal and spatial locality increases TLB cache hits.',
        trapExplanation: 'MSQ Trap: Option B sounds appealing but is the exact opposite—larger pages increase internal fragmentation. Missing even one correct option in MSQ gives 0 marks with no negative marking.',
        testedYear: 'GATE 2023'
      }
    ],
    tags: ['OS', 'Paging', 'TLB', 'EMAT', 'Virtual Memory']
  },
  {
    id: 'topic-process-sync',
    subjectId: 'subj-os',
    subjectName: 'Operating Systems',
    name: 'Process Synchronization & Semaphores',
    difficulty: 'Hard',
    expectedMarks: 3,
    questionTaxonomy: {
      primaryType: 'MCQ',
      frequency: 'Annual Must-Ask',
      typicalFormat: '2-Mark MCQ on determining Mutual Exclusion, Progress, and Deadlock in concurrent code'
    },
    prerequisites: [],
    description: 'Critical Section requirements (Mutual Exclusion, Progress, Bounded Waiting), Peterson algorithm for 2 processes, counting and binary semaphores, classic synchronization problems.',
    commonTrap: 'Inverting wait(S) and signal(S) calls or calling wait() in the wrong order among nested semaphores, causing permanent deadlock.',
    clarityResources: [
      {
        title: 'Silberschatz & Galvin: Operating System Concepts',
        type: 'Textbook',
        url: 'https://codex.cs.yale.edu/avi/os-book/OS10/slide-dir/',
        chapterOrTopic: 'Chapter 6: Synchronization Tools & Chapter 7: Synchronization Examples',
        clarityNotes: 'Read Section 6.3 for proof of Peterson Algorithm satisfaction of Progress condition.'
      },
      {
        title: 'GateOverflow: Process Synchronization Questions',
        type: 'GateOverflow',
        url: 'https://gateoverflow.in/tag/process-synchronization',
        chapterOrTopic: 'GateOverflow Tag: Process Synchronization',
        clarityNotes: 'Focus on code tracing questions with interleaving execution sequences.'
      }
    ],
    targetQuestions: [
      {
        id: 'q-sync-semaphore-mcq',
        questionType: 'MCQ',
        marks: 2,
        title: 'Counting Semaphore Operation Sequence',
        problemStatement: 'A counting semaphore S is initialized to 7. Then 20 P (wait) operations and 15 V (signal) operations are executed on S. What is the resulting value of S?',
        options: [
          'A: 2',
          'B: 0',
          'C: 12',
          'D: -2'
        ],
        correctAnswer: 'A: 2',
        stepByStepSolution: 'Value of counting semaphore = Initial Value - Number of P operations + Number of V operations = 7 - 20 + 15 = 2.',
        trapExplanation: 'MCQ Trap: If the question states standard Dijkstra counting semaphore, the value can be positive or negative depending on whether blocked processes are counted in the integer value. When value is >= 0, it simply tracks available resources.',
        testedYear: 'GATE 2021'
      }
    ],
    tags: ['OS', 'Semaphores', 'Synchronization', 'Deadlock']
  },

  // ==========================================
  // 2. ALGORITHMS & DATA STRUCTURES
  // ==========================================
  {
    id: 'topic-asymptotics',
    subjectId: 'subj-algo',
    subjectName: 'Algorithms',
    name: 'Asymptotic Analysis & Recurrences (Master Theorem)',
    difficulty: 'Moderate',
    expectedMarks: 2,
    questionTaxonomy: {
      primaryType: 'MCQ',
      frequency: 'Annual Must-Ask',
      typicalFormat: '1 or 2-Mark MCQ or NAT on solving divide-and-conquer recurrence'
    },
    prerequisites: [],
    description: 'Big-O, Big-Omega, Big-Theta bounds, Master Theorem (standard and extended cases), Akra-Bazzi method, recursion tree analysis.',
    commonTrap: 'Applying Master Theorem when f(n) is not polynomially larger/smaller than n^(log_b a). For example, T(n) = 2T(n/2) + n/log n cannot be solved by standard Master Theorem!',
    clarityResources: [
      {
        title: 'Thomas H. Cormen (CLRS): Introduction to Algorithms',
        type: 'Textbook',
        url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
        chapterOrTopic: 'Chapter 4: Divide-and-Conquer (Sections 4.3 - 4.5)',
        clarityNotes: 'Read Section 4.5 thoroughly for Master Theorem proof and Extended Case 2 (k = -1 gives Theta(n log log n)).'
      },
      {
        title: 'GeeksforGeeks: Master Theorem for Divide and Conquer',
        type: 'GeeksforGeeks',
        url: 'https://www.geeksforgeeks.org/advanced-master-theorem-for-divide-and-conquer-recurrences/',
        chapterOrTopic: 'Extended Master Theorem',
        clarityNotes: 'Provides quick table of all 3 cases plus sub-cases with log terms.'
      }
    ],
    targetQuestions: [
      {
        id: 'q-master-thm-mcq',
        questionType: 'MCQ',
        marks: 2,
        title: 'Extended Master Theorem with Log Term',
        problemStatement: 'Consider the recurrence relation T(n) = 2*T(n/2) + n / log(n) for n > 2, with T(2) = 1. Which of the following represents the tight asymptotic bound for T(n)?',
        options: [
          'A: Theta(n)',
          'B: Theta(n * log(log(n)))',
          'C: Theta(n * log(n))',
          'D: Theta(n^2)'
        ],
        correctAnswer: 'B: Theta(n * log(log(n)))',
        stepByStepSolution: 'Here a = 2, b = 2. n^(log_b a) = n^(log_2 2) = n^1 = n.\nCompare f(n) = n / log(n) = n * (log n)^(-1) with n^1.\nThis matches Extended Master Theorem Case 2 with k = -1:\nWhen f(n) = Theta(n^(log_b a) * (log n)^(-1)), T(n) = Theta(n^(log_b a) * log(log n)) = Theta(n * log(log n)).',
        trapExplanation: 'MCQ Trap: Naively picking Theta(n log n) because students forget that dividing by log n in the work per level leads to the integral of 1/x dx = ln(ln(x)), giving Theta(n log log n).',
        testedYear: 'GATE 2022'
      }
    ],
    tags: ['Algorithms', 'Master Theorem', 'Recurrences', 'Complexity']
  },
  {
    id: 'topic-graph-algo',
    subjectId: 'subj-algo',
    subjectName: 'Algorithms',
    name: 'Graph Algorithms: Shortest Paths (Dijkstra, Bellman-Ford) & MST',
    difficulty: 'Hard',
    expectedMarks: 3,
    questionTaxonomy: {
      primaryType: 'MSQ',
      frequency: 'Annual Must-Ask',
      typicalFormat: '2-Mark MSQ on edge weights, cycle detection, or Kruskal/Prim cut property'
    },
    prerequisites: ['topic-asymptotics'],
    description: "BFS/DFS properties, topological sorting, Dijkstra's algorithm (min-heap implementation O((V+E)log V)), Bellman-Ford (O(VE)), Kruskal's & Prim's algorithms, cycle detection.",
    commonTrap: "Running Dijkstra's algorithm on graphs with negative edge weights. Dijkstra assumes once a vertex is finalized, its shortest distance cannot decrease. Negative edges violate this greedy property!",
    clarityResources: [
      {
        title: 'CLRS: Introduction to Algorithms',
        type: 'Textbook',
        url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
        chapterOrTopic: 'Chapter 24: Single-Source Shortest Paths & Chapter 23: Minimum Spanning Trees',
        clarityNotes: 'Read Section 23.1 for Cut Property of MST: lightest edge crossing any cut is always in some MST.'
      },
      {
        title: 'Visualgo: Graph Algorithms Visualizer',
        type: 'Visualizer',
        url: 'https://visualgo.net/en/sssp',
        chapterOrTopic: 'Interactive Dijkstra & Bellman-Ford Visualizer',
        clarityNotes: 'Step through Dijkstra execution to visualize priority queue relaxation.'
      }
    ],
    targetQuestions: [
      {
        id: 'q-dijkstra-msq',
        questionType: 'MSQ',
        marks: 2,
        title: 'Shortest Path & MST Invariants',
        problemStatement: 'Which of the following statements about graph algorithms are TRUE? (Select all that apply)',
        options: [
          'A: If all edge weights in a connected undirected graph are distinct, the Minimum Spanning Tree is unique.',
          'B: Adding a constant positive weight c to every edge in a graph changes the shortest path between any two vertices.',
          'C: Dijkstra algorithm always terminates even if the graph contains negative weight cycles.',
          'D: Bellman-Ford algorithm can detect negative weight cycles reachable from the source vertex.'
        ],
        correctAnswer: 'A, D',
        stepByStepSolution: 'A is TRUE: Distinct edge weights guarantee a unique MST (proved by Cut Property).\nB is FALSE: In general, adding c adds c * (number of edges on path). Paths with fewer edges become favored, so shortest path CAN change, but does NOT always change. More importantly, adding c does NOT preserve the shortest path in general.\nC is FALSE: With negative cycles, Dijkstra can enter an infinite loop or produce wrong answers depending on priority queue implementation.\nD is TRUE: If a distance relaxes on the V-th iteration, a negative cycle exists.',
        trapExplanation: 'MSQ Trap: Students often think adding c to every edge preserves shortest path (like in MST). In MST adding c preserves the tree; in Shortest Path it favors paths with fewer hops!',
        testedYear: 'GATE 2024'
      }
    ],
    tags: ['Algorithms', 'Dijkstra', 'MST', 'Graphs', 'Bellman-Ford']
  },

  // ==========================================
  // 3. COMPUTER ORGANIZATION & ARCHITECTURE
  // ==========================================
  {
    id: 'topic-cache-memory',
    subjectId: 'subj-coa',
    subjectName: 'Computer Organization & Architecture',
    name: 'Cache Memory Mapping (Set-Associative) & Performance',
    difficulty: 'Very High',
    expectedMarks: 4,
    questionTaxonomy: {
      primaryType: 'NAT',
      frequency: 'Annual Must-Ask',
      typicalFormat: '2-Mark NAT calculation on Tag bits or Set index bits'
    },
    prerequisites: [],
    description: 'Direct mapped, k-way set-associative, fully associative cache architectures. Address bit decomposition: Tag, Set Index, Word/Byte Offset. Write-through vs Write-back, cache hit/miss latency.',
    commonTrap: 'Failing to check whether memory is byte-addressed or word-addressed! If memory is 32-bit word-addressed, the word offset bits are log2(words per block), NOT log2(bytes per block)!',
    clarityResources: [
      {
        title: 'Carl Hamacher: Computer Organization and Embedded Systems',
        type: 'Textbook',
        url: 'https://www.mheducation.com',
        chapterOrTopic: 'Chapter 8: The Memory System (Sections 8.4 - 8.6)',
        clarityNotes: 'Read Section 8.4 for clear breakdown diagrams of Physical Address into Tag, Set, and Offset.'
      },
      {
        title: 'GateOverflow: Cache Organization Questions Collection',
        type: 'GateOverflow',
        url: 'https://gateoverflow.in/tag/cache-memory',
        chapterOrTopic: 'GateOverflow Tag: Cache Memory',
        clarityNotes: 'Filter by 2-Mark NAT questions; solve past 10 years papers.'
      }
    ],
    targetQuestions: [
      {
        id: 'q-cache-tag-nat',
        questionType: 'NAT',
        marks: 2,
        title: '4-Way Set-Associative Cache Tag Bits',
        problemStatement: 'A 32-bit byte-addressable processor has a 64 KB 4-way set-associative cache with a block size of 32 bytes. What is the number of TAG bits in the physical address?',
        correctAnswer: '18',
        stepByStepSolution: '1. Total address width = 32 bits (byte-addressable).\n2. Block size = 32 bytes = 2^5 bytes => Block Offset = 5 bits.\n3. Total cache size = 64 KB = 64 * 1024 bytes = 2^16 bytes.\n4. Total lines in cache = (Cache Size) / (Block Size) = 2^16 / 2^5 = 2^11 = 2048 lines.\n5. In 4-way set associative: Number of Sets = (Total lines) / 4 = 2048 / 4 = 512 sets = 2^9 sets => Set Index = 9 bits.\n6. Tag bits = Total address bits - (Set Index + Block Offset) = 32 - (9 + 5) = 32 - 14 = 18 bits.',
        trapExplanation: 'NAT Trap: Confusing number of sets with total number of lines. Dividing total cache size by 4 first or forgetting that Set Index = log2(Number of Sets).',
        testedYear: 'GATE 2023'
      }
    ],
    tags: ['COA', 'Cache', 'Set Associative', 'Tag Bits']
  },
  {
    id: 'topic-pipelining',
    subjectId: 'subj-coa',
    subjectName: 'Computer Organization & Architecture',
    name: 'Instruction Pipelining & Pipeline Hazards',
    difficulty: 'Hard',
    expectedMarks: 3,
    questionTaxonomy: {
      primaryType: 'NAT',
      frequency: 'Annual Must-Ask',
      typicalFormat: '2-Mark NAT calculation on pipeline speedup or execution cycles with stalls'
    },
    prerequisites: [],
    description: 'Pipeline speedup formula S = (k * n) / (k + n - 1), structural hazards, data hazards (RAW, WAR, WAW), control hazards (branch prediction), operand forwarding hardware bypass.',
    commonTrap: 'Pipeline clock cycle time is dictated by the slowest stage delay PLUS the intermediate pipeline register delay: Clock Cycle = max(stage_delays) + t_register.',
    clarityResources: [
      {
        title: 'Hennessy & Patterson: Computer Architecture A Quantitative Approach',
        type: 'Textbook',
        url: 'https://www.elsevier.com/books/computer-architecture/hennessy/978-0-12-811905-1',
        chapterOrTopic: 'Appendix C: Pipelining Basic and Intermediate Concepts',
        clarityNotes: 'Study operand forwarding data path diagrams to understand how RAW hazards are resolved without stalls.'
      }
    ],
    targetQuestions: [
      {
        id: 'q-pipe-speedup-nat',
        questionType: 'NAT',
        marks: 2,
        title: 'Pipeline Clock & Speedup Calculation',
        problemStatement: 'A 5-stage non-pipelined processor has stage delays of 150 ps, 120 ps, 160 ps, 140 ps, and 110 ps. The pipelined version adds an intermediate register delay of 10 ps between stages. For a program of 1000 independent instructions, what is the clock period of the pipelined processor in picoseconds (ps)?',
        correctAnswer: '170',
        stepByStepSolution: '1. In pipelined execution, clock cycle period = max(stage delays) + register delay.\n2. Slowest stage = 160 ps.\n3. Register delay = 10 ps.\n4. Clock period = 160 + 10 = 170 ps.',
        trapExplanation: 'NAT Trap: Taking the average of the stage delays instead of the maximum (bottleneck stage delay). The pipeline cannot clock faster than its slowest stage.',
        testedYear: 'GATE 2022'
      }
    ],
    tags: ['COA', 'Pipelining', 'Speedup', 'Hazards']
  },

  // ==========================================
  // 4. THEORY OF COMPUTATION
  // ==========================================
  {
    id: 'topic-dfa-nfa',
    subjectId: 'subj-toc',
    subjectName: 'Theory of Computation',
    name: 'Finite Automata & Regular Languages (DFA Minimization)',
    difficulty: 'Moderate',
    expectedMarks: 3,
    questionTaxonomy: {
      primaryType: 'MSQ',
      frequency: 'Annual Must-Ask',
      typicalFormat: '2-Mark MSQ on closure properties of Regular, DCFL, CFL, and Recursive languages'
    },
    prerequisites: [],
    description: 'DFA state minimization (Myhill-Nerode equivalence theorem, table-filling algorithm), regular expressions, Arden theorem, closure properties of regular languages.',
    commonTrap: 'Confusing closure of CFL vs Regular. Regular languages are closed under ALL boolean operations (Union, Intersection, Complement). CFLs are NOT closed under intersection or complement!',
    clarityResources: [
      {
        title: 'Peter Linz: An Introduction to Formal Languages and Automata',
        type: 'Textbook',
        url: 'https://www.jblearning.com',
        chapterOrTopic: 'Chapter 2: Finite Automata & Chapter 4: Properties of Regular Languages',
        clarityNotes: 'Review Table-Filling Algorithm in Section 2.4 for step-by-step state minimization.'
      },
      {
        title: 'GateOverflow: Closure Properties of Formal Languages Master Table',
        type: 'GateOverflow',
        url: 'https://gateoverflow.in/tag/closure-properties',
        chapterOrTopic: 'GateOverflow Tag: Closure Properties',
        clarityNotes: 'Memorize the closure table for Regular, DCFL, CFL, CSL, Recursive, and RE languages.'
      }
    ],
    targetQuestions: [
      {
        id: 'q-closure-msq',
        questionType: 'MSQ',
        marks: 2,
        title: 'Closure Properties of Language Classes',
        problemStatement: 'Which of the following statements are TRUE regarding language closure properties? (Select all that apply)',
        options: [
          'A: If L1 is Context-Free and L2 is Regular, then L1 ∩ L2 is always Context-Free.',
          'B: Deterministic Context-Free Languages (DCFL) are closed under complementation.',
          'C: Recursive Languages are closed under intersection.',
          'D: Recursively Enumerable (RE) languages are closed under complementation.'
        ],
        correctAnswer: 'A, B, C',
        stepByStepSolution: 'A is TRUE: CFL intersected with Regular is always CFL (pushdown automaton runs simultaneously with finite automaton).\nB is TRUE: DCFL is closed under complement by swapping final and non-final states in the DPDA.\nC is TRUE: Recursive languages (decidable) are closed under intersection, union, and complement.\nD is FALSE: If both L and its complement L\' were RE, L would be Recursive. Since non-recursive RE languages exist (e.g. Halting Problem), RE is NOT closed under complement.',
        trapExplanation: 'MSQ Trap: Forgetting option D is FALSE. RE is closed under union, intersection, concatenation, and Kleene star, but NOT complement!',
        testedYear: 'GATE 2024'
      }
    ],
    tags: ['TOC', 'DFA', 'Regular Languages', 'Closure Properties', 'DCFL']
  },

  // ==========================================
  // 5. COMPUTER NETWORKS
  // ==========================================
  {
    id: 'topic-ip-fragmentation',
    subjectId: 'subj-cn',
    subjectName: 'Computer Networks',
    name: 'IPv4 Addressing, Subnetting & IP Fragmentation',
    difficulty: 'Hard',
    expectedMarks: 3,
    questionTaxonomy: {
      primaryType: 'NAT',
      frequency: 'Annual Must-Ask',
      typicalFormat: '2-Mark NAT calculation on Fragment Offset or Number of Fragments'
    },
    prerequisites: [],
    description: 'CIDR subnet prefix matching, maximum transfer unit (MTU), IP header fields (Total Length, Identification, Flags DF/MF, Fragment Offset).',
    commonTrap: 'The Fragment Offset field is measured in 8-byte (64-bit) blocks! You MUST divide the payload byte offset by 8. Furthermore, payload in all fragments except the last must be a multiple of 8!',
    clarityResources: [
      {
        title: 'Kurose & Ross: Computer Networking A Top-Down Approach',
        type: 'Textbook',
        url: 'https://www.pearson.com',
        chapterOrTopic: 'Chapter 4: The Network Layer: Data Plane (Section 4.3)',
        clarityNotes: 'Read Section 4.3.2 for step-by-step example table of IP fragmentation with MTU = 1500.'
      },
      {
        title: 'GateOverflow: IP Fragmentation PYQs',
        type: 'GateOverflow',
        url: 'https://gateoverflow.in/tag/ip-fragmentation',
        chapterOrTopic: 'GateOverflow Tag: IP Fragmentation',
        clarityNotes: 'Practice questions where MTU payload is not cleanly divisible by 8.'
      }
    ],
    targetQuestions: [
      {
        id: 'q-frag-offset-nat',
        questionType: 'NAT',
        marks: 2,
        title: 'IP Fragment Offset Calculation',
        problemStatement: 'An IPv4 packet with a 20-byte IP header and a total length of 4000 bytes arrives at a router. The outgoing link has an MTU of 1500 bytes. What is the value of the Fragment Offset field in the SECOND fragment?',
        correctAnswer: '185',
        stepByStepSolution: '1. Original payload = 4000 - 20 = 3980 bytes.\n2. MTU = 1500 bytes. Max IP payload per fragment = 1500 - 20 (header) = 1480 bytes.\n3. Verify 1480 is divisible by 8: 1480 / 8 = 185 (exact integer).\n4. First fragment carries payload bytes 0 to 1479 (offset 0, MF = 1).\n5. Second fragment starts at payload byte index 1480.\n6. Fragment Offset field = (Byte Index) / 8 = 1480 / 8 = 185.',
        trapExplanation: 'NAT Trap: Entering 1480 instead of 185. The field in the header stores the number of 8-byte blocks, NOT the raw byte index!',
        testedYear: 'GATE 2023'
      }
    ],
    tags: ['Computer Networks', 'IPv4', 'Fragmentation', 'Offset', 'MTU']
  },

  // ==========================================
  // 6. DATABASES (DBMS)
  // ==========================================
  {
    id: 'topic-normal-forms',
    subjectId: 'subj-dbms',
    subjectName: 'Databases (DBMS)',
    name: 'Functional Dependencies & Normal Forms (3NF, BCNF)',
    difficulty: 'Very High',
    expectedMarks: 4,
    questionTaxonomy: {
      primaryType: 'MSQ',
      frequency: 'Annual Must-Ask',
      typicalFormat: '2-Mark MSQ or MCQ on identifying highest normal form and lossless decomposition'
    },
    prerequisites: [],
    description: 'Attribute closure algorithm, minimal canonical cover, candidate key determination, 1NF, 2NF, 3NF, BCNF, dependency preservation test, lossless join test.',
    commonTrap: 'BCNF decomposition is ALWAYS lossless, but it is NOT always dependency preserving! 3NF decomposition can always achieve BOTH lossless join and dependency preservation.',
    clarityResources: [
      {
        title: 'Silberschatz, Korth & Sudarshan: Database System Concepts',
        type: 'Textbook',
        url: 'https://www.db-book.com',
        chapterOrTopic: 'Chapter 7: Relational Database Design (Sections 7.3 - 7.5)',
        clarityNotes: 'Read Section 7.5 for clear definition of BCNF vs 3NF and algorithm for finding candidate keys.'
      },
      {
        title: 'GateOverflow: Normalization PYQs',
        type: 'GateOverflow',
        url: 'https://gateoverflow.in/tag/normalization',
        chapterOrTopic: 'GateOverflow Tag: Normalization',
        clarityNotes: 'Practice questions testing candidate key identification using attribute closure.'
      }
    ],
    targetQuestions: [
      {
        id: 'q-bcnf-msq',
        questionType: 'MSQ',
        marks: 2,
        title: 'Normalization & Decomposition Guarantees',
        problemStatement: 'Let R be a relational schema with functional dependencies F. Which of the following statements are ALWAYS TRUE? (Select all that apply)',
        options: [
          'A: Every relation in BCNF is also in 3NF.',
          'B: Any relation schema can be decomposed into 3NF such that the decomposition is both lossless join and dependency preserving.',
          'C: Any relation schema can be decomposed into BCNF such that the decomposition is both lossless join and dependency preserving.',
          'D: If a relation has only binary functional dependencies, it is in at least 2NF.'
        ],
        correctAnswer: 'A, B',
        stepByStepSolution: 'A is TRUE: BCNF is strictly stronger than 3NF. In BCNF, for every X -> Y, X must be a superkey. In 3NF, X can be a superkey OR Y can be a prime attribute.\nB is TRUE: 3NF synthesis algorithm guarantees both lossless join and dependency preservation.\nC is FALSE: Some relations cannot be decomposed into BCNF without losing dependencies (e.g. R(A,B,C) with AB -> C, C -> B).\nD is FALSE: A relation with binary FDs can still violate 2NF if partial dependencies exist on composite candidate keys.',
        trapExplanation: 'MSQ Trap: Option C is the famous classic GATE trap. BCNF cannot always preserve functional dependencies!',
        testedYear: 'GATE 2024'
      }
    ],
    tags: ['DBMS', 'Normalization', 'BCNF', '3NF', 'Functional Dependencies']
  },

  // ==========================================
  // 7. ENGINEERING MATHEMATICS
  // ==========================================
  {
    id: 'topic-graph-theory',
    subjectId: 'subj-math',
    subjectName: 'Engineering Mathematics',
    name: 'Graph Theory & Planarity (Euler Formula)',
    difficulty: 'Hard',
    expectedMarks: 3,
    questionTaxonomy: {
      primaryType: 'NAT',
      frequency: 'Annual Must-Ask',
      typicalFormat: '2-Mark NAT calculation on maximum edges in planar bipartite graph'
    },
    prerequisites: [],
    description: 'Bipartite graphs, planar graphs, Euler formula V - E + R = 2, maximum edge bounds (E <= 3V - 6 for general planar; E <= 2V - 4 for bipartite planar), Kuratowski theorem (K5 and K3,3 non-planarity).',
    commonTrap: 'Using E <= 3V - 6 on bipartite graphs! In a bipartite graph there are NO odd cycles, meaning every region is bounded by at least 4 edges (not 3), leading to 2E >= 4R => E <= 2V - 4.',
    clarityResources: [
      {
        title: 'Kenneth H. Rosen: Discrete Mathematics and Its Applications',
        type: 'Textbook',
        url: 'https://www.mheducation.com',
        chapterOrTopic: 'Chapter 10: Graphs (Sections 10.7 - 10.8)',
        clarityNotes: 'Read Section 10.7 for Euler Formula proof and derivations of maximum edge bounds.'
      }
    ],
    targetQuestions: [
      {
        id: 'q-euler-planar-nat',
        questionType: 'NAT',
        marks: 2,
        title: 'Max Edges in Connected Planar Bipartite Graph',
        problemStatement: 'What is the maximum number of edges in a simple connected planar bipartite graph with 10 vertices?',
        correctAnswer: '16',
        stepByStepSolution: '1. For planar graphs, Euler formula: V - E + R = 2.\n2. Since graph is bipartite, it contains NO odd cycles; minimum cycle length is 4.\n3. Each region is bounded by at least 4 edges => 2E >= 4R => R <= E/2.\n4. Substituting R <= E/2 into Euler formula:\nV - E + E/2 >= 2 => V - E/2 >= 2 => E <= 2V - 4.\n5. For V = 10 vertices: Max Edges E = 2*(10) - 4 = 20 - 4 = 16 edges.',
        trapExplanation: 'NAT Trap: Using E <= 3V - 6 gives 3(10) - 6 = 24, which is WRONG because triangles do not exist in bipartite graphs!',
        testedYear: 'GATE 2022'
      }
    ],
    tags: ['Discrete Math', 'Graph Theory', 'Planarity', 'Bipartite', 'Euler Formula']
  }
];

let isInitialized = false;

/**
 * Ingest all curriculum, topics, target questions (MCQ/MSQ/NAT), and clarity resources into Vector DB and Graph DB
 */
export function initializeKnowledgeBases(force: boolean = false): {
  vectorCount: number;
  nodeCount: number;
  edgeCount: number;
} {
  if (isInitialized && !force) {
    return {
      vectorCount: globalVectorDb.count(),
      nodeCount: globalGraphDb.getAllNodes().length,
      edgeCount: globalGraphDb.getAllEdges().length
    };
  }

  if (force) {
    globalVectorDb.clear();
    globalGraphDb.importState(JSON.stringify({ nodes: [], edges: [] }));
  }

  // 1. Ingest Subjects
  for (const s of CORE_GATE_SUBJECTS) {
    globalGraphDb.addNode({
      id: s.id,
      label: 'Subject',
      name: s.name,
      properties: {
        expectedMarks: s.expectedMarks,
        book: s.book,
        description: `GATE CS Subject: ${s.name} (~${s.expectedMarks} Marks expected). Recommended textbook: ${s.book}.`
      }
    });

    globalVectorDb.insert({
      id: `vec-${s.id}`,
      title: `${s.name} (GATE Subject Overview)`,
      content: `Subject: ${s.name}. Expected marks in GATE: ~${s.expectedMarks} Marks. Reference Standard Textbook: ${s.book}.`,
      category: 'topic',
      metadata: {
        subject: s.name,
        expectedMarks: s.expectedMarks
      }
    });
  }

  // 2. Ingest Topics, Clarity Resources, and Target Questions
  for (const t of CORE_TOPICS) {
    // Topic Graph Node
    globalGraphDb.addNode({
      id: t.id,
      label: 'Topic',
      name: t.name,
      properties: {
        subject: t.subjectName,
        difficulty: t.difficulty,
        expectedMarks: t.expectedMarks,
        questionTaxonomy: t.questionTaxonomy,
        description: t.description,
        examTrap: t.commonTrap,
        clarityResources: t.clarityResources,
        targetQuestions: t.targetQuestions,
        tags: t.tags
      }
    });

    // Subtopic edge
    globalGraphDb.addEdge({
      id: `edge-sub-${t.id}`,
      source: t.id,
      target: t.subjectId,
      type: 'SUBTOPIC_OF'
    });

    // Prerequisite edges
    for (const prereqId of t.prerequisites) {
      globalGraphDb.addEdge({
        id: `edge-prereq-${prereqId}-${t.id}`,
        source: prereqId,
        target: t.id,
        type: 'PREREQUISITE_OF'
      });
      globalGraphDb.addEdge({
        id: `edge-dep-${t.id}-${prereqId}`,
        source: t.id,
        target: prereqId,
        type: 'DEPENDS_ON'
      });
    }

    // Ingest Topic in Vector DB
    globalVectorDb.insert({
      id: `vec-${t.id}`,
      title: `${t.name} (${t.subjectName})`,
      content: `${t.name} in ${t.subjectName}. Difficulty: ${t.difficulty}. Weightage: ~${t.expectedMarks} Marks. Question Type Taxonomy: ${t.questionTaxonomy.primaryType} (${t.questionTaxonomy.typicalFormat}). Description: ${t.description}. Exam Trap Warning: ${t.commonTrap}. Clarity Resources: ${t.clarityResources.map((r) => `${r.title} (${r.chapterOrTopic})`).join('; ')}.`,
      category: 'topic',
      metadata: {
        subject: t.subjectName,
        difficulty: t.difficulty,
        expectedMarks: t.expectedMarks,
        questionType: t.questionTaxonomy.primaryType,
        trapWarning: t.commonTrap,
        tags: t.tags
      }
    });

    // Ingest Clarity Resources as Graph Nodes & Vector Chunks
    for (const res of t.clarityResources) {
      const resId = `res-${t.id}-${res.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
      globalGraphDb.addNode({
        id: resId,
        label: 'Resource',
        name: res.title,
        properties: {
          subject: t.subjectName,
          type: res.type,
          url: res.url,
          chapterOrTopic: res.chapterOrTopic,
          clarityNotes: res.clarityNotes,
          description: `${res.title} - ${res.chapterOrTopic}. Clarity Notes: ${res.clarityNotes}`
        }
      });

      globalGraphDb.addEdge({
        id: `edge-res-${t.id}-${resId}`,
        source: resId,
        target: t.id,
        type: 'RECOMMENDED_FOR'
      });

      globalVectorDb.insert({
        id: `vec-${resId}`,
        title: `Resource: ${res.title} (${res.type})`,
        content: `Clarity Resource for ${t.name}: ${res.title}. Section/Chapter: ${res.chapterOrTopic}. Resource Type: ${res.type}. URL: ${res.url}. Guidance Notes: ${res.clarityNotes}.`,
        category: 'resource',
        metadata: {
          subject: t.subjectName,
          topicId: t.id,
          url: res.url,
          resourceType: res.type
        }
      });
    }

    // Ingest Target Questions as Graph Nodes & Vector Chunks
    for (const q of t.targetQuestions) {
      const qId = `tq-${q.id}`;
      globalGraphDb.addNode({
        id: qId,
        label: 'Problem',
        name: `Target Question: ${q.title} [${q.questionType} - ${q.marks}M]`,
        properties: {
          subject: t.subjectName,
          topic: t.name,
          questionType: q.questionType,
          marks: q.marks,
          problemStatement: q.problemStatement,
          options: q.options,
          correctAnswer: q.correctAnswer,
          stepByStepSolution: q.stepByStepSolution,
          trapExplanation: q.trapExplanation,
          testedYear: q.testedYear,
          description: `GATE ${q.questionType} (${q.marks} Marks): ${q.problemStatement}`
        }
      });

      globalGraphDb.addEdge({
        id: `edge-tq-${t.id}-${qId}`,
        source: qId,
        target: t.id,
        type: 'TESTED_IN'
      });

      globalVectorDb.insert({
        id: `vec-${qId}`,
        title: `Target ${q.questionType} Question: ${q.title} (${q.marks}M)`,
        content: `Target ${q.questionType} Question on ${t.name} (${t.subjectName}, ${q.marks} Marks). Problem: ${q.problemStatement}. Options: ${(q.options || []).join(' | ')}. Correct Answer: ${q.correctAnswer}. Step-by-Step Solution: ${q.stepByStepSolution}. Specific Question Type Trap: ${q.trapExplanation}. Tested Year: ${q.testedYear || 'Official Pattern'}.`,
        category: 'problem',
        metadata: {
          subject: t.subjectName,
          topicId: t.id,
          questionType: q.questionType,
          marks: q.marks,
          trapWarning: q.trapExplanation
        }
      });
    }
  }

  // 3. Ingest Formula Deck
  for (const f of FORMULA_DECK) {
    const fNodeId = `formula-${f.id}`;
    globalGraphDb.addNode({
      id: fNodeId,
      label: 'Formula',
      name: f.title,
      properties: {
        subject: f.subject,
        topic: f.topic,
        formulaText: f.formula,
        importance: f.importance,
        examTrap: f.exampleTrap,
        description: `Formula for ${f.title}: ${f.formula}. Key points: ${f.keyPoints.join('; ')}`
      }
    });

    const matchingTopic = CORE_TOPICS.find(
      (t) => t.subjectName.toLowerCase().includes(f.subject.toLowerCase()) || f.topic.toLowerCase().includes(t.name.toLowerCase())
    );
    if (matchingTopic) {
      globalGraphDb.addEdge({
        id: `edge-formula-${matchingTopic.id}-${f.id}`,
        source: matchingTopic.id,
        target: fNodeId,
        type: 'HAS_FORMULA'
      });
    }

    globalVectorDb.insert({
      id: `vec-formula-${f.id}`,
      title: `Formula: ${f.title} (${f.subject})`,
      content: `Formula & Derivation for ${f.title} (${f.subject} - ${f.topic}). Formula: ${f.formula}. Key points: ${f.keyPoints.join(' ')}. Exam Trap: ${f.exampleTrap}.`,
      category: 'formula',
      metadata: {
        subject: f.subject,
        importance: f.importance,
        trapWarning: f.exampleTrap
      }
    });
  }

  // 4. Ingest General GATE Resources
  for (const r of GATE_RESOURCES) {
    const rNodeId = `res-gen-${r.id}`;
    globalGraphDb.addNode({
      id: rNodeId,
      label: 'Resource',
      name: r.title,
      properties: {
        subject: r.subject,
        category: r.category,
        url: r.url,
        description: r.description,
        tags: r.tags
      }
    });

    globalVectorDb.insert({
      id: `vec-res-gen-${r.id}`,
      title: `${r.title} (${r.category})`,
      content: `General Resource: ${r.title}. Category: ${r.category}. Subject: ${r.subject}. Link: ${r.url}. Description: ${r.description}.`,
      category: 'resource',
      metadata: {
        subject: r.subject,
        url: r.url,
        category: r.category
      }
    });
  }

  isInitialized = true;
  return {
    vectorCount: globalVectorDb.count(),
    nodeCount: globalGraphDb.getAllNodes().length,
    edgeCount: globalGraphDb.getAllEdges().length
  };
}
