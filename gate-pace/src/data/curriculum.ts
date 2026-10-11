// 90-Day GATE CS & IT Curriculum Data Blueprint
export interface DayCurriculum {
  dayNumber: number;
  phase: 'CORE_FOUNDATION' | 'SYSTEMS_AND_THEORY' | 'WAR_ROOM_MOCKS';
  phaseName: string;
  subject: string;
  techFocus: string;
  eveningFocus: string;
  pyqTarget: number;
  block1: {
    time: string;
    title: string;
    focus: string;
  };
  block2: {
    time: string;
    title: string;
    focus: string;
  };
  block3: {
    time: string;
    title: string;
    focus: string;
  };
  suggestedTasks: string[];
  gfgSearchQuery: string;
  gateOverflowTag: string;
}

export const GATE_90_DAYS_CURRICULUM: DayCurriculum[] = [
  {
    "dayNumber": 1,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "C Programming & Linear DS",
    "techFocus": "C Data Types, Memory Layout, Operators, Pointer Arithmetic, Pointer to Arrays",
    "eveningFocus": "Quantitative Aptitude: Ratios, Proportions, Percentages",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "C Data Types, Memory Layout, Operators, Pointer Arithmetic, Pointer to Arrays"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on C Data Types, Memory Layout, Operators, Pointer Arithmetic, Pointer to Arrays"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Ratios, Proportions, Percentages"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - C Data Types, Memory Layout, Operators, Pointer Arithmetic, Pointer to Arrays",
      "Block 2: Solve 25 GateOverflow PYQs on C Data Types, Memory Layout, Operators, Pointer Arithmetic, Pointer to Arrays",
      "Block 3: Evening Drill - Quantitative Aptitude: Ratios, Proportions, Percentages",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs C Data Types, Memory Layout, Operators, Pointer Arithmetic, Pointer to Arrays",
    "gateOverflowTag": "c-programming"
  },
  {
    "dayNumber": 2,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "C Programming & Linear DS",
    "techFocus": "Parameter Passing, Functions, Recursion Tracing, Stack Activation Records",
    "eveningFocus": "Linear Algebra: Matrices, Determinants, Multiplications",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Parameter Passing, Functions, Recursion Tracing, Stack Activation Records"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Parameter Passing, Functions, Recursion Tracing, Stack Activation Records"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Linear Algebra: Matrices, Determinants, Multiplications"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Parameter Passing, Functions, Recursion Tracing, Stack Activation Records",
      "Block 2: Solve 25 GateOverflow PYQs on Parameter Passing, Functions, Recursion Tracing, Stack Activation Records",
      "Block 3: Evening Drill - Linear Algebra: Matrices, Determinants, Multiplications",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Parameter Passing, Functions, Recursion Tracing, Stack Activation Records",
    "gateOverflowTag": "c-programming"
  },
  {
    "dayNumber": 3,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "C Programming & Linear DS",
    "techFocus": "1D & 2D Arrays (Row/Column-major addressing), Dynamic Memory (malloc, free)",
    "eveningFocus": "Quantitative Aptitude: Powers, Exponents, Logarithms",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "1D & 2D Arrays (Row/Column-major addressing), Dynamic Memory (malloc, free)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on 1D & 2D Arrays (Row/Column-major addressing), Dynamic Memory (malloc, free)"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Powers, Exponents, Logarithms"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - 1D & 2D Arrays (Row/Column-major addressing), Dynamic Memory (malloc, free)",
      "Block 2: Solve 25 GateOverflow PYQs on 1D & 2D Arrays (Row/Column-major addressing), Dynamic Memory (malloc, free)",
      "Block 3: Evening Drill - Quantitative Aptitude: Powers, Exponents, Logarithms",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs 1D & 2D Arrays (Row/Column-major addressing), Dynamic Memory (malloc, free)",
    "gateOverflowTag": "c-programming"
  },
  {
    "dayNumber": 4,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "C Programming & Linear DS",
    "techFocus": "Singly, Doubly, Circular Linked Lists, Floyd's Cycle Detection",
    "eveningFocus": "Linear Algebra: Rank, Row Echelon, System of Equations AX=B",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Singly, Doubly, Circular Linked Lists, Floyd's Cycle Detection"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Singly, Doubly, Circular Linked Lists, Floyd's Cycle Detection"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Linear Algebra: Rank, Row Echelon, System of Equations AX=B"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Singly, Doubly, Circular Linked Lists, Floyd's Cycle Detection",
      "Block 2: Solve 25 GateOverflow PYQs on Singly, Doubly, Circular Linked Lists, Floyd's Cycle Detection",
      "Block 3: Evening Drill - Linear Algebra: Rank, Row Echelon, System of Equations AX=B",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Singly, Doubly, Circular Linked Lists, Floyd's Cycle Detection",
    "gateOverflowTag": "c-programming"
  },
  {
    "dayNumber": 5,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "C Programming & Linear DS",
    "techFocus": "Stacks: Implementations, Infix to Postfix/Prefix, Expression Evaluation",
    "eveningFocus": "Verbal Aptitude: English Grammar & Verb-Noun Agreement",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Stacks: Implementations, Infix to Postfix/Prefix, Expression Evaluation"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Stacks"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Verbal Aptitude: English Grammar & Verb-Noun Agreement"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Stacks: Implementations, Infix to Postfix/Prefix, Expression Evaluation",
      "Block 2: Solve 25 GateOverflow PYQs on Stacks",
      "Block 3: Evening Drill - Verbal Aptitude: English Grammar & Verb-Noun Agreement",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Stacks",
    "gateOverflowTag": "c-programming"
  },
  {
    "dayNumber": 6,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "C Programming & Linear DS",
    "techFocus": "Queues: Circular Queue Boundary Checks, Deques, Stacks via Queues",
    "eveningFocus": "Linear Algebra: Eigenvalues, Eigenvectors, Cayley-Hamilton",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Queues: Circular Queue Boundary Checks, Deques, Stacks via Queues"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Queues"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Linear Algebra: Eigenvalues, Eigenvectors, Cayley-Hamilton"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Queues: Circular Queue Boundary Checks, Deques, Stacks via Queues",
      "Block 2: Solve 25 GateOverflow PYQs on Queues",
      "Block 3: Evening Drill - Linear Algebra: Eigenvalues, Eigenvectors, Cayley-Hamilton",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Queues",
    "gateOverflowTag": "c-programming"
  },
  {
    "dayNumber": 7,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Mock Test & Analysis",
    "techFocus": "Consolidation Test: 30-Question Timed Test on C Programming & Linear DS",
    "eveningFocus": "Analytical Aptitude: Series, Deductions, Analogy",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Consolidation Test: 30-Question Timed Test on C Programming & Linear DS"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Consolidation Test"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Analytical Aptitude: Series, Deductions, Analogy"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Consolidation Test: 30-Question Timed Test on C Programming & Linear DS",
      "Block 2: Solve 25 GateOverflow PYQs on Consolidation Test",
      "Block 3: Evening Drill - Analytical Aptitude: Series, Deductions, Analogy",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Consolidation Test",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 8,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Data Structures & Algorithms",
    "techFocus": "Binary Trees: Properties, Traversals (Inorder, Preorder, Postorder)",
    "eveningFocus": "Quantitative Aptitude: Permutations & Combinations",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Binary Trees: Properties, Traversals (Inorder, Preorder, Postorder)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Binary Trees"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Permutations & Combinations"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Binary Trees: Properties, Traversals (Inorder, Preorder, Postorder)",
      "Block 2: Solve 25 GateOverflow PYQs on Binary Trees",
      "Block 3: Evening Drill - Quantitative Aptitude: Permutations & Combinations",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Binary Trees",
    "gateOverflowTag": "data-structures"
  },
  {
    "dayNumber": 9,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Data Structures & Algorithms",
    "techFocus": "Binary Search Trees (BST): Insertion, Deletion cases, Successor/Predecessor",
    "eveningFocus": "Calculus: Limits, Continuity, Differentiability",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Binary Search Trees (BST): Insertion, Deletion cases, Successor/Predecessor"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Binary Search Trees (BST)"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Calculus: Limits, Continuity, Differentiability"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Binary Search Trees (BST): Insertion, Deletion cases, Successor/Predecessor",
      "Block 2: Solve 25 GateOverflow PYQs on Binary Search Trees (BST)",
      "Block 3: Evening Drill - Calculus: Limits, Continuity, Differentiability",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Binary Search Trees (BST)",
    "gateOverflowTag": "data-structures"
  },
  {
    "dayNumber": 10,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Data Structures & Algorithms",
    "techFocus": "Binary Heaps: Min/Max Heap, O(n) Heapify derivation, Priority Queues",
    "eveningFocus": "Spatial Aptitude: Transformation, Rotation, Mirroring",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Binary Heaps: Min/Max Heap, O(n) Heapify derivation, Priority Queues"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Binary Heaps"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Spatial Aptitude: Transformation, Rotation, Mirroring"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Binary Heaps: Min/Max Heap, O(n) Heapify derivation, Priority Queues",
      "Block 2: Solve 25 GateOverflow PYQs on Binary Heaps",
      "Block 3: Evening Drill - Spatial Aptitude: Transformation, Rotation, Mirroring",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Binary Heaps",
    "gateOverflowTag": "data-structures"
  },
  {
    "dayNumber": 11,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Data Structures & Algorithms",
    "techFocus": "Asymptotic Analysis: Big-O, Omega, Theta, Master Theorem & Edge cases",
    "eveningFocus": "Calculus: Maxima & Minima, Mean Value Theorem",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Asymptotic Analysis: Big-O, Omega, Theta, Master Theorem & Edge cases"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Asymptotic Analysis"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Calculus: Maxima & Minima, Mean Value Theorem"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Asymptotic Analysis: Big-O, Omega, Theta, Master Theorem & Edge cases",
      "Block 2: Solve 25 GateOverflow PYQs on Asymptotic Analysis",
      "Block 3: Evening Drill - Calculus: Maxima & Minima, Mean Value Theorem",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Asymptotic Analysis",
    "gateOverflowTag": "data-structures"
  },
  {
    "dayNumber": 12,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Data Structures & Algorithms",
    "techFocus": "Divide & Conquer: Merge Sort, Quick Sort (Pivots, Inversions)",
    "eveningFocus": "Quantitative Aptitude: Elementary Statistics",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Divide & Conquer: Merge Sort, Quick Sort (Pivots, Inversions)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Divide & Conquer"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Elementary Statistics"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Divide & Conquer: Merge Sort, Quick Sort (Pivots, Inversions)",
      "Block 2: Solve 25 GateOverflow PYQs on Divide & Conquer",
      "Block 3: Evening Drill - Quantitative Aptitude: Elementary Statistics",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Divide & Conquer",
    "gateOverflowTag": "data-structures"
  },
  {
    "dayNumber": 13,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Data Structures & Algorithms",
    "techFocus": "Searching & Hashing: Collision handling (Chaining, Linear/Quadratic probing)",
    "eveningFocus": "Calculus: Definite & Indefinite Integration",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Searching & Hashing: Collision handling (Chaining, Linear/Quadratic probing)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Searching & Hashing"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Calculus: Definite & Indefinite Integration"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Searching & Hashing: Collision handling (Chaining, Linear/Quadratic probing)",
      "Block 2: Solve 25 GateOverflow PYQs on Searching & Hashing",
      "Block 3: Evening Drill - Calculus: Definite & Indefinite Integration",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Searching & Hashing",
    "gateOverflowTag": "data-structures"
  },
  {
    "dayNumber": 14,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Mock Test & Analysis",
    "techFocus": "Consolidation Test: 30-Question Timed Test on Trees, Heaps, Sorting, Hashing",
    "eveningFocus": "Analytical Aptitude: Syllogisms & Logic Deduction",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Consolidation Test: 30-Question Timed Test on Trees, Heaps, Sorting, Hashing"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Consolidation Test"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Analytical Aptitude: Syllogisms & Logic Deduction"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Consolidation Test: 30-Question Timed Test on Trees, Heaps, Sorting, Hashing",
      "Block 2: Solve 25 GateOverflow PYQs on Consolidation Test",
      "Block 3: Evening Drill - Analytical Aptitude: Syllogisms & Logic Deduction",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Consolidation Test",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 15,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Algorithms & Logic",
    "techFocus": "Greedy: Fractional Knapsack, Huffman Coding, Activity Selection",
    "eveningFocus": "Discrete Math: Propositional Logic, Truth Tables, CNF/DNF",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Greedy: Fractional Knapsack, Huffman Coding, Activity Selection"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Greedy"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Discrete Math: Propositional Logic, Truth Tables, CNF/DNF"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Greedy: Fractional Knapsack, Huffman Coding, Activity Selection",
      "Block 2: Solve 25 GateOverflow PYQs on Greedy",
      "Block 3: Evening Drill - Discrete Math: Propositional Logic, Truth Tables, CNF/DNF",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Greedy",
    "gateOverflowTag": "algorithms"
  },
  {
    "dayNumber": 16,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Algorithms & Logic",
    "techFocus": "Dynamic Programming 1: 0/1 Knapsack, Matrix Chain Multiplication, LCS",
    "eveningFocus": "Discrete Math: First-Order Logic, Quantifiers, Scope",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Dynamic Programming 1: 0/1 Knapsack, Matrix Chain Multiplication, LCS"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Dynamic Programming 1"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Discrete Math: First-Order Logic, Quantifiers, Scope"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Dynamic Programming 1: 0/1 Knapsack, Matrix Chain Multiplication, LCS",
      "Block 2: Solve 25 GateOverflow PYQs on Dynamic Programming 1",
      "Block 3: Evening Drill - Discrete Math: First-Order Logic, Quantifiers, Scope",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Dynamic Programming 1",
    "gateOverflowTag": "algorithms"
  },
  {
    "dayNumber": 17,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Algorithms & Logic",
    "techFocus": "Dynamic Programming 2: Optimal BST, Subset Sum, Bellman-Ford, Floyd-Warshall",
    "eveningFocus": "Discrete Math: Sets, Relations, Inclusion-Exclusion",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Dynamic Programming 2: Optimal BST, Subset Sum, Bellman-Ford, Floyd-Warshall"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Dynamic Programming 2"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Discrete Math: Sets, Relations, Inclusion-Exclusion"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Dynamic Programming 2: Optimal BST, Subset Sum, Bellman-Ford, Floyd-Warshall",
      "Block 2: Solve 25 GateOverflow PYQs on Dynamic Programming 2",
      "Block 3: Evening Drill - Discrete Math: Sets, Relations, Inclusion-Exclusion",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Dynamic Programming 2",
    "gateOverflowTag": "algorithms"
  },
  {
    "dayNumber": 18,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Algorithms & Logic",
    "techFocus": "Graph Traversals: BFS, DFS, Topological Sorting, Dijkstra's Algorithm",
    "eveningFocus": "Discrete Math: Equivalence Relations & Classes",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Graph Traversals: BFS, DFS, Topological Sorting, Dijkstra's Algorithm"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Graph Traversals"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Discrete Math: Equivalence Relations & Classes"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Graph Traversals: BFS, DFS, Topological Sorting, Dijkstra's Algorithm",
      "Block 2: Solve 25 GateOverflow PYQs on Graph Traversals",
      "Block 3: Evening Drill - Discrete Math: Equivalence Relations & Classes",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Graph Traversals",
    "gateOverflowTag": "algorithms"
  },
  {
    "dayNumber": 19,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Algorithms & Logic",
    "techFocus": "Minimum Spanning Trees: Prim's, Kruskal's, DSU, Cut & Cycle properties",
    "eveningFocus": "Discrete Math: Posets, Hasse Diagrams, Lattices",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Minimum Spanning Trees: Prim's, Kruskal's, DSU, Cut & Cycle properties"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Minimum Spanning Trees"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Discrete Math: Posets, Hasse Diagrams, Lattices"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Minimum Spanning Trees: Prim's, Kruskal's, DSU, Cut & Cycle properties",
      "Block 2: Solve 25 GateOverflow PYQs on Minimum Spanning Trees",
      "Block 3: Evening Drill - Discrete Math: Posets, Hasse Diagrams, Lattices",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Minimum Spanning Trees",
    "gateOverflowTag": "algorithms"
  },
  {
    "dayNumber": 20,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Algorithms & Logic",
    "techFocus": "Algebraic Structures: Semigroups, Monoids, Groups, Lagrange's Theorem",
    "eveningFocus": "Verbal Aptitude: Reading Comprehension & Sequencing",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Algebraic Structures: Semigroups, Monoids, Groups, Lagrange's Theorem"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Algebraic Structures"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Verbal Aptitude: Reading Comprehension & Sequencing"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Algebraic Structures: Semigroups, Monoids, Groups, Lagrange's Theorem",
      "Block 2: Solve 25 GateOverflow PYQs on Algebraic Structures",
      "Block 3: Evening Drill - Verbal Aptitude: Reading Comprehension & Sequencing",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Algebraic Structures",
    "gateOverflowTag": "algorithms"
  },
  {
    "dayNumber": 21,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Mock Test & Analysis",
    "techFocus": "Consolidation Test: Timed Test on Algorithms & Mathematical Logic",
    "eveningFocus": "Spatial Aptitude: Paper Folding & 2D/3D Patterns",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Consolidation Test: Timed Test on Algorithms & Mathematical Logic"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Consolidation Test"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Spatial Aptitude: Paper Folding & 2D/3D Patterns"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Consolidation Test: Timed Test on Algorithms & Mathematical Logic",
      "Block 2: Solve 25 GateOverflow PYQs on Consolidation Test",
      "Block 3: Evening Drill - Spatial Aptitude: Paper Folding & 2D/3D Patterns",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Consolidation Test",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 22,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Discrete Mathematics",
    "techFocus": "Combinatorics: Pigeonhole Principle, Permutations, Derangements",
    "eveningFocus": "Quantitative Aptitude: Mensuration & Geometry",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Combinatorics: Pigeonhole Principle, Permutations, Derangements"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Combinatorics"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Mensuration & Geometry"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Combinatorics: Pigeonhole Principle, Permutations, Derangements",
      "Block 2: Solve 25 GateOverflow PYQs on Combinatorics",
      "Block 3: Evening Drill - Quantitative Aptitude: Mensuration & Geometry",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Combinatorics",
    "gateOverflowTag": "discrete-mathematics"
  },
  {
    "dayNumber": 23,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Discrete Mathematics",
    "techFocus": "Recurrence Relations & Generating Functions: Solving Linear Recurrences",
    "eveningFocus": "Verbal Aptitude: Vocabulary, Idioms & Phrases",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Recurrence Relations & Generating Functions: Solving Linear Recurrences"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Recurrence Relations & Generating Functions"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Verbal Aptitude: Vocabulary, Idioms & Phrases"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Recurrence Relations & Generating Functions: Solving Linear Recurrences",
      "Block 2: Solve 25 GateOverflow PYQs on Recurrence Relations & Generating Functions",
      "Block 3: Evening Drill - Verbal Aptitude: Vocabulary, Idioms & Phrases",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Recurrence Relations & Generating Functions",
    "gateOverflowTag": "discrete-mathematics"
  },
  {
    "dayNumber": 24,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Discrete Mathematics",
    "techFocus": "Graph Theory 1: Degree Sequences, Handshaking Lemma, Connectivity",
    "eveningFocus": "Quantitative Aptitude: Speed, Time, Distance, Work",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Graph Theory 1: Degree Sequences, Handshaking Lemma, Connectivity"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Graph Theory 1"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Speed, Time, Distance, Work"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Graph Theory 1: Degree Sequences, Handshaking Lemma, Connectivity",
      "Block 2: Solve 25 GateOverflow PYQs on Graph Theory 1",
      "Block 3: Evening Drill - Quantitative Aptitude: Speed, Time, Distance, Work",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Graph Theory 1",
    "gateOverflowTag": "discrete-mathematics"
  },
  {
    "dayNumber": 25,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Discrete Mathematics",
    "techFocus": "Graph Theory 2: Eulerian & Hamiltonian Graphs, Spanning Trees",
    "eveningFocus": "Analytical Aptitude: Numerical Relations & Family Trees",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Graph Theory 2: Eulerian & Hamiltonian Graphs, Spanning Trees"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Graph Theory 2"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Analytical Aptitude: Numerical Relations & Family Trees"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Graph Theory 2: Eulerian & Hamiltonian Graphs, Spanning Trees",
      "Block 2: Solve 25 GateOverflow PYQs on Graph Theory 2",
      "Block 3: Evening Drill - Analytical Aptitude: Numerical Relations & Family Trees",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Graph Theory 2",
    "gateOverflowTag": "discrete-mathematics"
  },
  {
    "dayNumber": 26,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Discrete Mathematics",
    "techFocus": "Graph Theory 3: Planar Graphs (Euler's formula), Matching, Colouring",
    "eveningFocus": "Quantitative Aptitude: Data Interpretation (Charts)",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Graph Theory 3: Planar Graphs (Euler's formula), Matching, Colouring"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Graph Theory 3"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Data Interpretation (Charts)"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Graph Theory 3: Planar Graphs (Euler's formula), Matching, Colouring",
      "Block 2: Solve 25 GateOverflow PYQs on Graph Theory 3",
      "Block 3: Evening Drill - Quantitative Aptitude: Data Interpretation (Charts)",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Graph Theory 3",
    "gateOverflowTag": "discrete-mathematics"
  },
  {
    "dayNumber": 27,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Discrete Mathematics",
    "techFocus": "Discrete Mathematics Full PYQ Drill (GateOverflow 2-markers)",
    "eveningFocus": "Aptitude Drill: 20 Mixed Questions",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Discrete Mathematics Full PYQ Drill (GateOverflow 2-markers)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Discrete Mathematics Full PYQ Drill (GateOverflow 2-markers)"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Aptitude Drill: 20 Mixed Questions"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Discrete Mathematics Full PYQ Drill (GateOverflow 2-markers)",
      "Block 2: Solve 25 GateOverflow PYQs on Discrete Mathematics Full PYQ Drill (GateOverflow 2-markers)",
      "Block 3: Evening Drill - Aptitude Drill: 20 Mixed Questions",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Discrete Mathematics Full PYQ Drill (GateOverflow 2-markers)",
    "gateOverflowTag": "discrete-mathematics"
  },
  {
    "dayNumber": 28,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Discrete Mathematics",
    "techFocus": "Comprehensive Revision of C, DS, Algorithms & Math Formulas",
    "eveningFocus": "Mistake Diary Review & Correction",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Comprehensive Revision of C, DS, Algorithms & Math Formulas"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Comprehensive Revision of C, DS, Algorithms & Math Formulas"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Mistake Diary Review & Correction"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Comprehensive Revision of C, DS, Algorithms & Math Formulas",
      "Block 2: Solve 25 GateOverflow PYQs on Comprehensive Revision of C, DS, Algorithms & Math Formulas",
      "Block 3: Evening Drill - Mistake Diary Review & Correction",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Comprehensive Revision of C, DS, Algorithms & Math Formulas",
    "gateOverflowTag": "discrete-mathematics"
  },
  {
    "dayNumber": 29,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full Subject Mock 1: Programming, DS & Algorithms (65 Marks, 90 mins)",
    "eveningFocus": "Mock 1 In-depth Analysis & Error Remediation",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full Subject Mock 1: Programming, DS & Algorithms (65 Marks, 90 mins)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full Subject Mock 1"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Mock 1 In-depth Analysis & Error Remediation"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full Subject Mock 1: Programming, DS & Algorithms (65 Marks, 90 mins)",
      "Block 2: Solve 25 GateOverflow PYQs on Full Subject Mock 1",
      "Block 3: Evening Drill - Mock 1 In-depth Analysis & Error Remediation",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full Subject Mock 1",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 30,
    "phase": "CORE_FOUNDATION",
    "phaseName": "Phase 1: High-Yield Scoring Core",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full Subject Mock 2: Discrete Mathematics & Engg Math (65 Marks, 90 mins)",
    "eveningFocus": "Mock 2 In-depth Analysis & Error Remediation",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full Subject Mock 2: Discrete Mathematics & Engg Math (65 Marks, 90 mins)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full Subject Mock 2"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Mock 2 In-depth Analysis & Error Remediation"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full Subject Mock 2: Discrete Mathematics & Engg Math (65 Marks, 90 mins)",
      "Block 2: Solve 25 GateOverflow PYQs on Full Subject Mock 2",
      "Block 3: Evening Drill - Mock 2 In-depth Analysis & Error Remediation",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full Subject Mock 2",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 31,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Theory of Computation",
    "techFocus": "Finite Automata: DFA Design, NFA to DFA Conversion, Epsilon-NFA",
    "eveningFocus": "Probability: Sample Space, Conditional, Product Rule",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Finite Automata: DFA Design, NFA to DFA Conversion, Epsilon-NFA"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Finite Automata"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Probability: Sample Space, Conditional, Product Rule"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Finite Automata: DFA Design, NFA to DFA Conversion, Epsilon-NFA",
      "Block 2: Solve 25 GateOverflow PYQs on Finite Automata",
      "Block 3: Evening Drill - Probability: Sample Space, Conditional, Product Rule",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Finite Automata",
    "gateOverflowTag": "theory-of-computation"
  },
  {
    "dayNumber": 32,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Theory of Computation",
    "techFocus": "Regular Expressions, DFA State Minimization (Myhill-Nerode)",
    "eveningFocus": "Probability: Bayes' Theorem & Total Probability",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Regular Expressions, DFA State Minimization (Myhill-Nerode)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Regular Expressions, DFA State Minimization (Myhill-Nerode)"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Probability: Bayes' Theorem & Total Probability"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Regular Expressions, DFA State Minimization (Myhill-Nerode)",
      "Block 2: Solve 25 GateOverflow PYQs on Regular Expressions, DFA State Minimization (Myhill-Nerode)",
      "Block 3: Evening Drill - Probability: Bayes' Theorem & Total Probability",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Regular Expressions, DFA State Minimization (Myhill-Nerode)",
    "gateOverflowTag": "theory-of-computation"
  },
  {
    "dayNumber": 33,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Theory of Computation",
    "techFocus": "Pumping Lemma for Regular Languages, Non-regularity proofs",
    "eveningFocus": "Probability: Discrete Random Variables, Expectation",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Pumping Lemma for Regular Languages, Non-regularity proofs"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Pumping Lemma for Regular Languages, Non-regularity proofs"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Probability: Discrete Random Variables, Expectation"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Pumping Lemma for Regular Languages, Non-regularity proofs",
      "Block 2: Solve 25 GateOverflow PYQs on Pumping Lemma for Regular Languages, Non-regularity proofs",
      "Block 3: Evening Drill - Probability: Discrete Random Variables, Expectation",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Pumping Lemma for Regular Languages, Non-regularity proofs",
    "gateOverflowTag": "theory-of-computation"
  },
  {
    "dayNumber": 34,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Theory of Computation",
    "techFocus": "CFG & CFL: Derivations, Ambiguity, Pushdown Automata (DPDA/NPDA)",
    "eveningFocus": "Probability: Continuous Variables, PDF, CDF",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "CFG & CFL: Derivations, Ambiguity, Pushdown Automata (DPDA/NPDA)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on CFG & CFL"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Probability: Continuous Variables, PDF, CDF"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - CFG & CFL: Derivations, Ambiguity, Pushdown Automata (DPDA/NPDA)",
      "Block 2: Solve 25 GateOverflow PYQs on CFG & CFL",
      "Block 3: Evening Drill - Probability: Continuous Variables, PDF, CDF",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs CFG & CFL",
    "gateOverflowTag": "theory-of-computation"
  },
  {
    "dayNumber": 35,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Theory of Computation",
    "techFocus": "Pumping Lemma for CFLs, Non-CFL Identification, Chomsky Hierarchy",
    "eveningFocus": "Probability: Uniform & Exponential Distributions",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Pumping Lemma for CFLs, Non-CFL Identification, Chomsky Hierarchy"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Pumping Lemma for CFLs, Non-CFL Identification, Chomsky Hierarchy"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Probability: Uniform & Exponential Distributions"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Pumping Lemma for CFLs, Non-CFL Identification, Chomsky Hierarchy",
      "Block 2: Solve 25 GateOverflow PYQs on Pumping Lemma for CFLs, Non-CFL Identification, Chomsky Hierarchy",
      "Block 3: Evening Drill - Probability: Uniform & Exponential Distributions",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Pumping Lemma for CFLs, Non-CFL Identification, Chomsky Hierarchy",
    "gateOverflowTag": "theory-of-computation"
  },
  {
    "dayNumber": 36,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Theory of Computation",
    "techFocus": "Turing Machines: Recursive/RE Languages, Undecidability, Rice's Theorem",
    "eveningFocus": "Probability: Poisson, Binomial, Normal Distributions",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Turing Machines: Recursive/RE Languages, Undecidability, Rice's Theorem"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Turing Machines"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Probability: Poisson, Binomial, Normal Distributions"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Turing Machines: Recursive/RE Languages, Undecidability, Rice's Theorem",
      "Block 2: Solve 25 GateOverflow PYQs on Turing Machines",
      "Block 3: Evening Drill - Probability: Poisson, Binomial, Normal Distributions",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Turing Machines",
    "gateOverflowTag": "theory-of-computation"
  },
  {
    "dayNumber": 37,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Theory of Computation",
    "techFocus": "Consolidation Day: TOC Closure & Decidability Master Matrix + Timed Test",
    "eveningFocus": "General Aptitude: 15-Mark Full Sectional Test",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Consolidation Day: TOC Closure & Decidability Master Matrix + Timed Test"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Consolidation Day"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "General Aptitude: 15-Mark Full Sectional Test"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Consolidation Day: TOC Closure & Decidability Master Matrix + Timed Test",
      "Block 2: Solve 25 GateOverflow PYQs on Consolidation Day",
      "Block 3: Evening Drill - General Aptitude: 15-Mark Full Sectional Test",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Consolidation Day",
    "gateOverflowTag": "theory-of-computation"
  },
  {
    "dayNumber": 38,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Compiler Design",
    "techFocus": "Compiler Design: Lexical Analysis, Token generation, Lex regular rules",
    "eveningFocus": "Quantitative Aptitude: Profit, Loss, Interest",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Compiler Design: Lexical Analysis, Token generation, Lex regular rules"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Compiler Design"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Profit, Loss, Interest"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Compiler Design: Lexical Analysis, Token generation, Lex regular rules",
      "Block 2: Solve 25 GateOverflow PYQs on Compiler Design",
      "Block 3: Evening Drill - Quantitative Aptitude: Profit, Loss, Interest",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Compiler Design",
    "gateOverflowTag": "compiler-design"
  },
  {
    "dayNumber": 39,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Compiler Design",
    "techFocus": "Parsing 1: Top-down, First & Follow Sets, LL(1) Table & Conflicts",
    "eveningFocus": "Spatial Aptitude: 2D/3D Rotation & Transformations",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Parsing 1: Top-down, First & Follow Sets, LL(1) Table & Conflicts"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Parsing 1"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Spatial Aptitude: 2D/3D Rotation & Transformations"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Parsing 1: Top-down, First & Follow Sets, LL(1) Table & Conflicts",
      "Block 2: Solve 25 GateOverflow PYQs on Parsing 1",
      "Block 3: Evening Drill - Spatial Aptitude: 2D/3D Rotation & Transformations",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Parsing 1",
    "gateOverflowTag": "compiler-design"
  },
  {
    "dayNumber": 40,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Compiler Design",
    "techFocus": "Parsing 2: Bottom-up, LR(0), SLR(1), CLR(1), LALR(1) Item Sets & Conflicts",
    "eveningFocus": "Analytical Aptitude: Seating & Direction Sense",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Parsing 2: Bottom-up, LR(0), SLR(1), CLR(1), LALR(1) Item Sets & Conflicts"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Parsing 2"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Analytical Aptitude: Seating & Direction Sense"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Parsing 2: Bottom-up, LR(0), SLR(1), CLR(1), LALR(1) Item Sets & Conflicts",
      "Block 2: Solve 25 GateOverflow PYQs on Parsing 2",
      "Block 3: Evening Drill - Analytical Aptitude: Seating & Direction Sense",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Parsing 2",
    "gateOverflowTag": "compiler-design"
  },
  {
    "dayNumber": 41,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Compiler Design",
    "techFocus": "Syntax-Directed Translation (SDT), S/L-attributed, 3-Address Code",
    "eveningFocus": "General Aptitude: Complex Tables Data Interpretation",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Syntax-Directed Translation (SDT), S/L-attributed, 3-Address Code"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Syntax-Directed Translation (SDT), S/L-attributed, 3-Address Code"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "General Aptitude: Complex Tables Data Interpretation"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Syntax-Directed Translation (SDT), S/L-attributed, 3-Address Code",
      "Block 2: Solve 25 GateOverflow PYQs on Syntax-Directed Translation (SDT), S/L-attributed, 3-Address Code",
      "Block 3: Evening Drill - General Aptitude: Complex Tables Data Interpretation",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Syntax-Directed Translation (SDT), S/L-attributed, 3-Address Code",
    "gateOverflowTag": "compiler-design"
  },
  {
    "dayNumber": 42,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Compiler Design",
    "techFocus": "Optimization: Basic Blocks, Flow Graphs, Liveness, Common Subexpressions",
    "eveningFocus": "Linear Algebra & Probability: Mixed Revision Set",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Optimization: Basic Blocks, Flow Graphs, Liveness, Common Subexpressions"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Optimization"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Linear Algebra & Probability: Mixed Revision Set"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Optimization: Basic Blocks, Flow Graphs, Liveness, Common Subexpressions",
      "Block 2: Solve 25 GateOverflow PYQs on Optimization",
      "Block 3: Evening Drill - Linear Algebra & Probability: Mixed Revision Set",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Optimization",
    "gateOverflowTag": "compiler-design"
  },
  {
    "dayNumber": 43,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Operating Systems",
    "techFocus": "OS: System Calls, Fork Tracing, Threads, Scheduling (FCFS, SJF, RR)",
    "eveningFocus": "Verbal Aptitude: Sentence Completion & Error Spotting",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "OS: System Calls, Fork Tracing, Threads, Scheduling (FCFS, SJF, RR)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on OS"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Verbal Aptitude: Sentence Completion & Error Spotting"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - OS: System Calls, Fork Tracing, Threads, Scheduling (FCFS, SJF, RR)",
      "Block 2: Solve 25 GateOverflow PYQs on OS",
      "Block 3: Evening Drill - Verbal Aptitude: Sentence Completion & Error Spotting",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs OS",
    "gateOverflowTag": "operating-system"
  },
  {
    "dayNumber": 44,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Operating Systems",
    "techFocus": "OS Synchronization: Critical Sections, Peterson's, Semaphores, Classics",
    "eveningFocus": "Consolidation Test: Compiler & Synchronization Drill",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "OS Synchronization: Critical Sections, Peterson's, Semaphores, Classics"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on OS Synchronization"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Consolidation Test: Compiler & Synchronization Drill"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - OS Synchronization: Critical Sections, Peterson's, Semaphores, Classics",
      "Block 2: Solve 25 GateOverflow PYQs on OS Synchronization",
      "Block 3: Evening Drill - Consolidation Test: Compiler & Synchronization Drill",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs OS Synchronization",
    "gateOverflowTag": "operating-system"
  },
  {
    "dayNumber": 45,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Operating Systems",
    "techFocus": "Deadlocks: Necessary Conditions, RAG, Banker's Algorithm, Recovery",
    "eveningFocus": "Engineering Math: Determinants & Limits Drill",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Deadlocks: Necessary Conditions, RAG, Banker's Algorithm, Recovery"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Deadlocks"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Engineering Math: Determinants & Limits Drill"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Deadlocks: Necessary Conditions, RAG, Banker's Algorithm, Recovery",
      "Block 2: Solve 25 GateOverflow PYQs on Deadlocks",
      "Block 3: Evening Drill - Engineering Math: Determinants & Limits Drill",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Deadlocks",
    "gateOverflowTag": "operating-system"
  },
  {
    "dayNumber": 46,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Operating Systems",
    "techFocus": "Memory Management: Paging, Page Table Size, Multi-Level Paging Math",
    "eveningFocus": "Quantitative Aptitude: Mixtures, Clocks, Calendars",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Memory Management: Paging, Page Table Size, Multi-Level Paging Math"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Memory Management"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Mixtures, Clocks, Calendars"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Memory Management: Paging, Page Table Size, Multi-Level Paging Math",
      "Block 2: Solve 25 GateOverflow PYQs on Memory Management",
      "Block 3: Evening Drill - Quantitative Aptitude: Mixtures, Clocks, Calendars",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Memory Management",
    "gateOverflowTag": "operating-system"
  },
  {
    "dayNumber": 47,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Operating Systems",
    "techFocus": "Virtual Memory: TLB Hit/Miss (EMAT), Inverted Tables, Page Replacement",
    "eveningFocus": "Spatial Aptitude: Mirror Imaging & Paper Cutting",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Virtual Memory: TLB Hit/Miss (EMAT), Inverted Tables, Page Replacement"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Virtual Memory"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Spatial Aptitude: Mirror Imaging & Paper Cutting"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Virtual Memory: TLB Hit/Miss (EMAT), Inverted Tables, Page Replacement",
      "Block 2: Solve 25 GateOverflow PYQs on Virtual Memory",
      "Block 3: Evening Drill - Spatial Aptitude: Mirror Imaging & Paper Cutting",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Virtual Memory",
    "gateOverflowTag": "operating-system"
  },
  {
    "dayNumber": 48,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Operating Systems",
    "techFocus": "File Systems & Disk Scheduling: i-nodes, SCAN, C-SCAN, LOOK, C-LOOK",
    "eveningFocus": "Analytical Aptitude: Logical Deductions",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "File Systems & Disk Scheduling: i-nodes, SCAN, C-SCAN, LOOK, C-LOOK"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on File Systems & Disk Scheduling"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Analytical Aptitude: Logical Deductions"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - File Systems & Disk Scheduling: i-nodes, SCAN, C-SCAN, LOOK, C-LOOK",
      "Block 2: Solve 25 GateOverflow PYQs on File Systems & Disk Scheduling",
      "Block 3: Evening Drill - Analytical Aptitude: Logical Deductions",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs File Systems & Disk Scheduling",
    "gateOverflowTag": "operating-system"
  },
  {
    "dayNumber": 49,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Databases (DBMS)",
    "techFocus": "DBMS: ER-Model, Cardinality, Relational Schema Mapping",
    "eveningFocus": "Discrete Math: Logic & Lattices Quick Review",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "DBMS: ER-Model, Cardinality, Relational Schema Mapping"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on DBMS"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Discrete Math: Logic & Lattices Quick Review"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - DBMS: ER-Model, Cardinality, Relational Schema Mapping",
      "Block 2: Solve 25 GateOverflow PYQs on DBMS",
      "Block 3: Evening Drill - Discrete Math: Logic & Lattices Quick Review",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs DBMS",
    "gateOverflowTag": "dbms"
  },
  {
    "dayNumber": 50,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Databases (DBMS)",
    "techFocus": "Relational Algebra, Tuple Calculus (TRC/DRC), Nested SQL Queries",
    "eveningFocus": "Quantitative Aptitude: Permutations & Probability",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Relational Algebra, Tuple Calculus (TRC/DRC), Nested SQL Queries"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Relational Algebra, Tuple Calculus (TRC/DRC), Nested SQL Queries"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Permutations & Probability"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Relational Algebra, Tuple Calculus (TRC/DRC), Nested SQL Queries",
      "Block 2: Solve 25 GateOverflow PYQs on Relational Algebra, Tuple Calculus (TRC/DRC), Nested SQL Queries",
      "Block 3: Evening Drill - Quantitative Aptitude: Permutations & Probability",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Relational Algebra, Tuple Calculus (TRC/DRC), Nested SQL Queries",
    "gateOverflowTag": "dbms"
  },
  {
    "dayNumber": 51,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Databases (DBMS)",
    "techFocus": "Functional Dependencies, Keys, Normal Forms (1NF to BCNF), Lossless Joins",
    "eveningFocus": "Consolidation Test: Operating Systems Timed Test",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Functional Dependencies, Keys, Normal Forms (1NF to BCNF), Lossless Joins"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Functional Dependencies, Keys, Normal Forms (1NF to BCNF), Lossless Joins"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Consolidation Test: Operating Systems Timed Test"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Functional Dependencies, Keys, Normal Forms (1NF to BCNF), Lossless Joins",
      "Block 2: Solve 25 GateOverflow PYQs on Functional Dependencies, Keys, Normal Forms (1NF to BCNF), Lossless Joins",
      "Block 3: Evening Drill - Consolidation Test: Operating Systems Timed Test",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Functional Dependencies, Keys, Normal Forms (1NF to BCNF), Lossless Joins",
    "gateOverflowTag": "dbms"
  },
  {
    "dayNumber": 52,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Databases (DBMS)",
    "techFocus": "File Organization & Indexing: B & B+ Trees (Node Order, Record Pointers)",
    "eveningFocus": "Engineering Math: Linear Equations & Bayes' Review",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "File Organization & Indexing: B & B+ Trees (Node Order, Record Pointers)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on File Organization & Indexing"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Engineering Math: Linear Equations & Bayes' Review"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - File Organization & Indexing: B & B+ Trees (Node Order, Record Pointers)",
      "Block 2: Solve 25 GateOverflow PYQs on File Organization & Indexing",
      "Block 3: Evening Drill - Engineering Math: Linear Equations & Bayes' Review",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs File Organization & Indexing",
    "gateOverflowTag": "dbms"
  },
  {
    "dayNumber": 53,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Databases (DBMS)",
    "techFocus": "Transactions: ACID, Conflict vs View Serializability, Precedence Graphs",
    "eveningFocus": "General Aptitude: 15-Mark Full Sectional Test",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Transactions: ACID, Conflict vs View Serializability, Precedence Graphs"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Transactions"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "General Aptitude: 15-Mark Full Sectional Test"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Transactions: ACID, Conflict vs View Serializability, Precedence Graphs",
      "Block 2: Solve 25 GateOverflow PYQs on Transactions",
      "Block 3: Evening Drill - General Aptitude: 15-Mark Full Sectional Test",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Transactions",
    "gateOverflowTag": "dbms"
  },
  {
    "dayNumber": 54,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Databases (DBMS)",
    "techFocus": "Concurrency Control: 2PL, Strict 2PL, Timestamp Ordering Protocol",
    "eveningFocus": "Analytical Aptitude: Numerical Reasoning Drills",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Concurrency Control: 2PL, Strict 2PL, Timestamp Ordering Protocol"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Concurrency Control"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Analytical Aptitude: Numerical Reasoning Drills"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Concurrency Control: 2PL, Strict 2PL, Timestamp Ordering Protocol",
      "Block 2: Solve 25 GateOverflow PYQs on Concurrency Control",
      "Block 3: Evening Drill - Analytical Aptitude: Numerical Reasoning Drills",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Concurrency Control",
    "gateOverflowTag": "dbms"
  },
  {
    "dayNumber": 55,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Digital Logic",
    "techFocus": "Digital Logic 1: Boolean Algebra, K-Maps, Tabular Method (Quine-McCluskey)",
    "eveningFocus": "Calculus & Probability: Formula Review Set",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Digital Logic 1: Boolean Algebra, K-Maps, Tabular Method (Quine-McCluskey)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Digital Logic 1"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Calculus & Probability: Formula Review Set"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Digital Logic 1: Boolean Algebra, K-Maps, Tabular Method (Quine-McCluskey)",
      "Block 2: Solve 25 GateOverflow PYQs on Digital Logic 1",
      "Block 3: Evening Drill - Calculus & Probability: Formula Review Set",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Digital Logic 1",
    "gateOverflowTag": "digital-logic"
  },
  {
    "dayNumber": 56,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Digital Logic",
    "techFocus": "Digital Logic 2: Number Representations, 2's Complement, IEEE 754 Floating",
    "eveningFocus": "Spatial Aptitude: 3D Assembling from 2D Nets",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Digital Logic 2: Number Representations, 2's Complement, IEEE 754 Floating"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Digital Logic 2"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Spatial Aptitude: 3D Assembling from 2D Nets"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Digital Logic 2: Number Representations, 2's Complement, IEEE 754 Floating",
      "Block 2: Solve 25 GateOverflow PYQs on Digital Logic 2",
      "Block 3: Evening Drill - Spatial Aptitude: 3D Assembling from 2D Nets",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Digital Logic 2",
    "gateOverflowTag": "digital-logic"
  },
  {
    "dayNumber": 57,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Digital Logic",
    "techFocus": "Combinational Circuits: Adders, MUX, Decoders, Circuit Implementations",
    "eveningFocus": "Quantitative Aptitude: Advanced DI Test",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Combinational Circuits: Adders, MUX, Decoders, Circuit Implementations"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Combinational Circuits"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Advanced DI Test"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Combinational Circuits: Adders, MUX, Decoders, Circuit Implementations",
      "Block 2: Solve 25 GateOverflow PYQs on Combinational Circuits",
      "Block 3: Evening Drill - Quantitative Aptitude: Advanced DI Test",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Combinational Circuits",
    "gateOverflowTag": "digital-logic"
  },
  {
    "dayNumber": 58,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Digital Logic",
    "techFocus": "Sequential Circuits: Flip-Flops (JK, D, T), Counters (Mod-N), State Diagrams",
    "eveningFocus": "Consolidation Test: DBMS & Digital Logic Test",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Sequential Circuits: Flip-Flops (JK, D, T), Counters (Mod-N), State Diagrams"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Sequential Circuits"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Consolidation Test: DBMS & Digital Logic Test"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Sequential Circuits: Flip-Flops (JK, D, T), Counters (Mod-N), State Diagrams",
      "Block 2: Solve 25 GateOverflow PYQs on Sequential Circuits",
      "Block 3: Evening Drill - Consolidation Test: DBMS & Digital Logic Test",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Sequential Circuits",
    "gateOverflowTag": "digital-logic"
  },
  {
    "dayNumber": 59,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full Subject Mock 3: Operating Systems & Compiler Design (65 Marks)",
    "eveningFocus": "Mock 3 In-depth Analysis & Error Remediation",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full Subject Mock 3: Operating Systems & Compiler Design (65 Marks)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full Subject Mock 3"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Mock 3 In-depth Analysis & Error Remediation"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full Subject Mock 3: Operating Systems & Compiler Design (65 Marks)",
      "Block 2: Solve 25 GateOverflow PYQs on Full Subject Mock 3",
      "Block 3: Evening Drill - Mock 3 In-depth Analysis & Error Remediation",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full Subject Mock 3",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 60,
    "phase": "SYSTEMS_AND_THEORY",
    "phaseName": "Phase 2: Systems, Theory & Databases",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full Subject Mock 4: DBMS & Theory of Computation (65 Marks)",
    "eveningFocus": "Mock 4 In-depth Analysis & Error Remediation",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full Subject Mock 4: DBMS & Theory of Computation (65 Marks)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full Subject Mock 4"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Mock 4 In-depth Analysis & Error Remediation"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full Subject Mock 4: DBMS & Theory of Computation (65 Marks)",
      "Block 2: Solve 25 GateOverflow PYQs on Full Subject Mock 4",
      "Block 3: Evening Drill - Mock 4 In-depth Analysis & Error Remediation",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full Subject Mock 4",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 61,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Computer Organization & Architecture",
    "techFocus": "COA 1: Machine Instructions, Addressing Modes, Hardwired/Microprogrammed CU",
    "eveningFocus": "Verbal Aptitude: Reading Comprehension",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "COA 1: Machine Instructions, Addressing Modes, Hardwired/Microprogrammed CU"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on COA 1"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Verbal Aptitude: Reading Comprehension"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - COA 1: Machine Instructions, Addressing Modes, Hardwired/Microprogrammed CU",
      "Block 2: Solve 25 GateOverflow PYQs on COA 1",
      "Block 3: Evening Drill - Verbal Aptitude: Reading Comprehension",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs COA 1",
    "gateOverflowTag": "computer-organization"
  },
  {
    "dayNumber": 62,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Computer Organization & Architecture",
    "techFocus": "COA 2: Memory Hierarchy, Cache Mapping (Direct, Set-Assoc), AMAT Math",
    "eveningFocus": "Quantitative Aptitude: Probability Drills",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "COA 2: Memory Hierarchy, Cache Mapping (Direct, Set-Assoc), AMAT Math"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on COA 2"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Probability Drills"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - COA 2: Memory Hierarchy, Cache Mapping (Direct, Set-Assoc), AMAT Math",
      "Block 2: Solve 25 GateOverflow PYQs on COA 2",
      "Block 3: Evening Drill - Quantitative Aptitude: Probability Drills",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs COA 2",
    "gateOverflowTag": "computer-organization"
  },
  {
    "dayNumber": 63,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Computer Organization & Architecture",
    "techFocus": "COA 3: Instruction Pipelining, Structural/Data/Control Hazards, Speedup",
    "eveningFocus": "Engineering Math: Matrices & Calculus",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "COA 3: Instruction Pipelining, Structural/Data/Control Hazards, Speedup"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on COA 3"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Engineering Math: Matrices & Calculus"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - COA 3: Instruction Pipelining, Structural/Data/Control Hazards, Speedup",
      "Block 2: Solve 25 GateOverflow PYQs on COA 3",
      "Block 3: Evening Drill - Engineering Math: Matrices & Calculus",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs COA 3",
    "gateOverflowTag": "computer-organization"
  },
  {
    "dayNumber": 64,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Computer Organization & Architecture",
    "techFocus": "COA 4: I/O Interface: Programmed, Interrupt-Driven, DMA Cycle Stealing",
    "eveningFocus": "Spatial Aptitude: Mixed Spatial Paper Test",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "COA 4: I/O Interface: Programmed, Interrupt-Driven, DMA Cycle Stealing"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on COA 4"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Spatial Aptitude: Mixed Spatial Paper Test"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - COA 4: I/O Interface: Programmed, Interrupt-Driven, DMA Cycle Stealing",
      "Block 2: Solve 25 GateOverflow PYQs on COA 4",
      "Block 3: Evening Drill - Spatial Aptitude: Mixed Spatial Paper Test",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs COA 4",
    "gateOverflowTag": "computer-organization"
  },
  {
    "dayNumber": 65,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Computer Networks",
    "techFocus": "Networks 1: Switching, Framing, Delays (Tx, Prop), CRC & Checksums",
    "eveningFocus": "Analytical Aptitude: Syllogisms & Logic",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Networks 1: Switching, Framing, Delays (Tx, Prop), CRC & Checksums"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Networks 1"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Analytical Aptitude: Syllogisms & Logic"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Networks 1: Switching, Framing, Delays (Tx, Prop), CRC & Checksums",
      "Block 2: Solve 25 GateOverflow PYQs on Networks 1",
      "Block 3: Evening Drill - Analytical Aptitude: Syllogisms & Logic",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Networks 1",
    "gateOverflowTag": "computer-networks"
  },
  {
    "dayNumber": 66,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Computer Networks",
    "techFocus": "Networks 2: Flow Control (Stop & Wait, GBN, SR), CSMA/CD, Ethernet",
    "eveningFocus": "General Aptitude: 15-Mark Full Sectional",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Networks 2: Flow Control (Stop & Wait, GBN, SR), CSMA/CD, Ethernet"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Networks 2"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "General Aptitude: 15-Mark Full Sectional"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Networks 2: Flow Control (Stop & Wait, GBN, SR), CSMA/CD, Ethernet",
      "Block 2: Solve 25 GateOverflow PYQs on Networks 2",
      "Block 3: Evening Drill - General Aptitude: 15-Mark Full Sectional",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Networks 2",
    "gateOverflowTag": "computer-networks"
  },
  {
    "dayNumber": 67,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Computer Networks",
    "techFocus": "Networks 3: IPv4 Header, Fragmentation Offsets, CIDR, Subnetting, Routing",
    "eveningFocus": "Consolidation Test: COA & Networks Timed Drill",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Networks 3: IPv4 Header, Fragmentation Offsets, CIDR, Subnetting, Routing"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Networks 3"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Consolidation Test: COA & Networks Timed Drill"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Networks 3: IPv4 Header, Fragmentation Offsets, CIDR, Subnetting, Routing",
      "Block 2: Solve 25 GateOverflow PYQs on Networks 3",
      "Block 3: Evening Drill - Consolidation Test: COA & Networks Timed Drill",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Networks 3",
    "gateOverflowTag": "computer-networks"
  },
  {
    "dayNumber": 68,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Computer Networks",
    "techFocus": "Networks 4: TCP Congestion Control (Slow Start, Congestion Avoidance, AIMD)",
    "eveningFocus": "Quantitative Aptitude: Full Speed Drill",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Networks 4: TCP Congestion Control (Slow Start, Congestion Avoidance, AIMD)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Networks 4"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Quantitative Aptitude: Full Speed Drill"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Networks 4: TCP Congestion Control (Slow Start, Congestion Avoidance, AIMD)",
      "Block 2: Solve 25 GateOverflow PYQs on Networks 4",
      "Block 3: Evening Drill - Quantitative Aptitude: Full Speed Drill",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Networks 4",
    "gateOverflowTag": "computer-networks"
  },
  {
    "dayNumber": 69,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Computer Networks",
    "techFocus": "Networks 5: Application Layer: DNS, HTTP Persistent/Non-persistent RTT",
    "eveningFocus": "Discrete Math: Monoids & Graphs Quick Review",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Networks 5: Application Layer: DNS, HTTP Persistent/Non-persistent RTT"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Networks 5"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Discrete Math: Monoids & Graphs Quick Review"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Networks 5: Application Layer: DNS, HTTP Persistent/Non-persistent RTT",
      "Block 2: Solve 25 GateOverflow PYQs on Networks 5",
      "Block 3: Evening Drill - Discrete Math: Monoids & Graphs Quick Review",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Networks 5",
    "gateOverflowTag": "computer-networks"
  },
  {
    "dayNumber": 70,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full Subject Mock 5: COA & Digital Logic (65 Marks, 90 mins)",
    "eveningFocus": "Mock 5 Detailed Analysis & Error Log Scrub",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full Subject Mock 5: COA & Digital Logic (65 Marks, 90 mins)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full Subject Mock 5"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Mock 5 Detailed Analysis & Error Log Scrub"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full Subject Mock 5: COA & Digital Logic (65 Marks, 90 mins)",
      "Block 2: Solve 25 GateOverflow PYQs on Full Subject Mock 5",
      "Block 3: Evening Drill - Mock 5 Detailed Analysis & Error Log Scrub",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full Subject Mock 5",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 71,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full Subject Mock 6: Networks & General Aptitude (65 Marks, 90 mins)",
    "eveningFocus": "Mock 6 Detailed Analysis & Error Log Scrub",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full Subject Mock 6: Networks & General Aptitude (65 Marks, 90 mins)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full Subject Mock 6"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Mock 6 Detailed Analysis & Error Log Scrub"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full Subject Mock 6: Networks & General Aptitude (65 Marks, 90 mins)",
      "Block 2: Solve 25 GateOverflow PYQs on Full Subject Mock 6",
      "Block 3: Evening Drill - Mock 6 Detailed Analysis & Error Log Scrub",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full Subject Mock 6",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 72,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Multi-Subject Test 1: Programming + DS + Algorithms + OS (50 Marks)",
    "eveningFocus": "Multi-Subject 1 Error Review",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Multi-Subject Test 1: Programming + DS + Algorithms + OS (50 Marks)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Multi-Subject Test 1"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Multi-Subject 1 Error Review"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Multi-Subject Test 1: Programming + DS + Algorithms + OS (50 Marks)",
      "Block 2: Solve 25 GateOverflow PYQs on Multi-Subject Test 1",
      "Block 3: Evening Drill - Multi-Subject 1 Error Review",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Multi-Subject Test 1",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 73,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Multi-Subject Test 2: TOC + Compiler + DBMS + Networks (50 Marks)",
    "eveningFocus": "Multi-Subject 2 Error Review",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Multi-Subject Test 2: TOC + Compiler + DBMS + Networks (50 Marks)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Multi-Subject Test 2"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Multi-Subject 2 Error Review"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Multi-Subject Test 2: TOC + Compiler + DBMS + Networks (50 Marks)",
      "Block 2: Solve 25 GateOverflow PYQs on Multi-Subject Test 2",
      "Block 3: Evening Drill - Multi-Subject 2 Error Review",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Multi-Subject Test 2",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 74,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Multi-Subject Test 3: Discrete Math + Engg Math + Digital + COA (50 Marks)",
    "eveningFocus": "Master Formula Sheet Consolidation",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Multi-Subject Test 3: Discrete Math + Engg Math + Digital + COA (50 Marks)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Multi-Subject Test 3"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Master Formula Sheet Consolidation"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Multi-Subject Test 3: Discrete Math + Engg Math + Digital + COA (50 Marks)",
      "Block 2: Solve 25 GateOverflow PYQs on Multi-Subject Test 3",
      "Block 3: Evening Drill - Master Formula Sheet Consolidation",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Multi-Subject Test 3",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 75,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full-Length Mock 1 (FLT 1) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
    "eveningFocus": "Full Root-Cause Analysis (3.5 hrs)",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full-Length Mock 1 (FLT 1) \u2014 65 Questions / 100 Marks (09:30 - 12:30)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full-Length Mock 1 (FLT 1) \u2014 65 Questions / 100 Marks (09"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Full Root-Cause Analysis (3.5 hrs)"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full-Length Mock 1 (FLT 1) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
      "Block 2: Solve 25 GateOverflow PYQs on Full-Length Mock 1 (FLT 1) \u2014 65 Questions / 100 Marks (09",
      "Block 3: Evening Drill - Full Root-Cause Analysis (3.5 hrs)",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full-Length Mock 1 (FLT 1) \u2014 65 Questions / 100 Marks (09",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 76,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Full-Length Simulation & Revision",
    "techFocus": "Weakness Remediation: Revision of bottom 2 subjects from FLT 1",
    "eveningFocus": "Aptitude & Math Timed Speed Drill",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Weakness Remediation: Revision of bottom 2 subjects from FLT 1"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Weakness Remediation"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Aptitude & Math Timed Speed Drill"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Weakness Remediation: Revision of bottom 2 subjects from FLT 1",
      "Block 2: Solve 25 GateOverflow PYQs on Weakness Remediation",
      "Block 3: Evening Drill - Aptitude & Math Timed Speed Drill",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Weakness Remediation",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 77,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full-Length Mock 2 (FLT 2) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
    "eveningFocus": "Full Root-Cause Analysis & Log Update",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full-Length Mock 2 (FLT 2) \u2014 65 Questions / 100 Marks (09:30 - 12:30)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full-Length Mock 2 (FLT 2) \u2014 65 Questions / 100 Marks (09"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Full Root-Cause Analysis & Log Update"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full-Length Mock 2 (FLT 2) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
      "Block 2: Solve 25 GateOverflow PYQs on Full-Length Mock 2 (FLT 2) \u2014 65 Questions / 100 Marks (09",
      "Block 3: Evening Drill - Full Root-Cause Analysis & Log Update",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full-Length Mock 2 (FLT 2) \u2014 65 Questions / 100 Marks (09",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 78,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Full-Length Simulation & Revision",
    "techFocus": "Master Formula Review (Paging, Caching, Pipelining, Master Theorem)",
    "eveningFocus": "Solve 15 NATs on GateOverflow with timer",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Master Formula Review (Paging, Caching, Pipelining, Master Theorem)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Master Formula Review (Paging, Caching, Pipelining, Master Theorem)"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Solve 15 NATs on GateOverflow with timer"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Master Formula Review (Paging, Caching, Pipelining, Master Theorem)",
      "Block 2: Solve 25 GateOverflow PYQs on Master Formula Review (Paging, Caching, Pipelining, Master Theorem)",
      "Block 3: Evening Drill - Solve 15 NATs on GateOverflow with timer",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Master Formula Review (Paging, Caching, Pipelining, Master Theorem)",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 79,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full-Length Mock 3 (FLT 3) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
    "eveningFocus": "Full Root-Cause Analysis (3.5 hrs)",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full-Length Mock 3 (FLT 3) \u2014 65 Questions / 100 Marks (09:30 - 12:30)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full-Length Mock 3 (FLT 3) \u2014 65 Questions / 100 Marks (09"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Full Root-Cause Analysis (3.5 hrs)"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full-Length Mock 3 (FLT 3) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
      "Block 2: Solve 25 GateOverflow PYQs on Full-Length Mock 3 (FLT 3) \u2014 65 Questions / 100 Marks (09",
      "Block 3: Evening Drill - Full Root-Cause Analysis (3.5 hrs)",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full-Length Mock 3 (FLT 3) \u2014 65 Questions / 100 Marks (09",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 80,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Full-Length Simulation & Revision",
    "techFocus": "TOC Closure Table, Decidability, and Compiler Parsing Tables Revision",
    "eveningFocus": "Spatial & Analytical Aptitude Review",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "TOC Closure Table, Decidability, and Compiler Parsing Tables Revision"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on TOC Closure Table, Decidability, and Compiler Parsing Tables Revision"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Spatial & Analytical Aptitude Review"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - TOC Closure Table, Decidability, and Compiler Parsing Tables Revision",
      "Block 2: Solve 25 GateOverflow PYQs on TOC Closure Table, Decidability, and Compiler Parsing Tables Revision",
      "Block 3: Evening Drill - Spatial & Analytical Aptitude Review",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs TOC Closure Table, Decidability, and Compiler Parsing Tables Revision",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 81,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full-Length Mock 4 (FLT 4) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
    "eveningFocus": "Full Root-Cause Analysis (3.5 hrs)",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full-Length Mock 4 (FLT 4) \u2014 65 Questions / 100 Marks (09:30 - 12:30)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full-Length Mock 4 (FLT 4) \u2014 65 Questions / 100 Marks (09"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Full Root-Cause Analysis (3.5 hrs)"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full-Length Mock 4 (FLT 4) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
      "Block 2: Solve 25 GateOverflow PYQs on Full-Length Mock 4 (FLT 4) \u2014 65 Questions / 100 Marks (09",
      "Block 3: Evening Drill - Full Root-Cause Analysis (3.5 hrs)",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full-Length Mock 4 (FLT 4) \u2014 65 Questions / 100 Marks (09",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 82,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Full-Length Simulation & Revision",
    "techFocus": "Operating Systems Concurrency, Deadlocks & B+ Tree Indexing Review",
    "eveningFocus": "Engineering Math High-Yield Formulas",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Operating Systems Concurrency, Deadlocks & B+ Tree Indexing Review"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Operating Systems Concurrency, Deadlocks & B+ Tree Indexing Review"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Engineering Math High-Yield Formulas"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Operating Systems Concurrency, Deadlocks & B+ Tree Indexing Review",
      "Block 2: Solve 25 GateOverflow PYQs on Operating Systems Concurrency, Deadlocks & B+ Tree Indexing Review",
      "Block 3: Evening Drill - Engineering Math High-Yield Formulas",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Operating Systems Concurrency, Deadlocks & B+ Tree Indexing Review",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 83,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full-Length Mock 5 (FLT 5) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
    "eveningFocus": "Full Root-Cause Analysis (3.5 hrs)",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full-Length Mock 5 (FLT 5) \u2014 65 Questions / 100 Marks (09:30 - 12:30)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full-Length Mock 5 (FLT 5) \u2014 65 Questions / 100 Marks (09"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Full Root-Cause Analysis (3.5 hrs)"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full-Length Mock 5 (FLT 5) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
      "Block 2: Solve 25 GateOverflow PYQs on Full-Length Mock 5 (FLT 5) \u2014 65 Questions / 100 Marks (09",
      "Block 3: Evening Drill - Full Root-Cause Analysis (3.5 hrs)",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full-Length Mock 5 (FLT 5) \u2014 65 Questions / 100 Marks (09",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 84,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Full-Length Simulation & Revision",
    "techFocus": "NAT-Only Speed Drill: 40 Numerical Answer Type questions timed",
    "eveningFocus": "Verbal & Quantitative Final Polish",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "NAT-Only Speed Drill: 40 Numerical Answer Type questions timed"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on NAT-Only Speed Drill"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Verbal & Quantitative Final Polish"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - NAT-Only Speed Drill: 40 Numerical Answer Type questions timed",
      "Block 2: Solve 25 GateOverflow PYQs on NAT-Only Speed Drill",
      "Block 3: Evening Drill - Verbal & Quantitative Final Polish",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs NAT-Only Speed Drill",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 85,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full-Length Mock 6 (FLT 6) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
    "eveningFocus": "Full Root-Cause Analysis (3.5 hrs)",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full-Length Mock 6 (FLT 6) \u2014 65 Questions / 100 Marks (09:30 - 12:30)"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full-Length Mock 6 (FLT 6) \u2014 65 Questions / 100 Marks (09"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Full Root-Cause Analysis (3.5 hrs)"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full-Length Mock 6 (FLT 6) \u2014 65 Questions / 100 Marks (09:30 - 12:30)",
      "Block 2: Solve 25 GateOverflow PYQs on Full-Length Mock 6 (FLT 6) \u2014 65 Questions / 100 Marks (09",
      "Block 3: Evening Drill - Full Root-Cause Analysis (3.5 hrs)",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full-Length Mock 6 (FLT 6) \u2014 65 Questions / 100 Marks (09",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 86,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Full-Length Simulation & Revision",
    "techFocus": "Complete Mistake Diary Scrub: Re-solve every logged error",
    "eveningFocus": "Re-attempt all negative marks from FLTs",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Complete Mistake Diary Scrub: Re-solve every logged error"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Complete Mistake Diary Scrub"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Re-attempt all negative marks from FLTs"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Complete Mistake Diary Scrub: Re-solve every logged error",
      "Block 2: Solve 25 GateOverflow PYQs on Complete Mistake Diary Scrub",
      "Block 3: Evening Drill - Re-attempt all negative marks from FLTs",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Complete Mistake Diary Scrub",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 87,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Mock Test & Analysis",
    "techFocus": "Full-Length Mock 7 (FLT 7 \u2014 Final Simulation) \u2014 65 Qs / 100 Marks",
    "eveningFocus": "Final Strategy & Question Skip Check",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Full-Length Mock 7 (FLT 7 \u2014 Final Simulation) \u2014 65 Qs / 100 Marks"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Full-Length Mock 7 (FLT 7 \u2014 Final Simulation) \u2014 65 Qs / 100 Marks"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Final Strategy & Question Skip Check"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Full-Length Mock 7 (FLT 7 \u2014 Final Simulation) \u2014 65 Qs / 100 Marks",
      "Block 2: Solve 25 GateOverflow PYQs on Full-Length Mock 7 (FLT 7 \u2014 Final Simulation) \u2014 65 Qs / 100 Marks",
      "Block 3: Evening Drill - Final Strategy & Question Skip Check",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Full-Length Mock 7 (FLT 7 \u2014 Final Simulation) \u2014 65 Qs / 100 Marks",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 88,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Full-Length Simulation & Revision",
    "techFocus": "Final Comprehensive Formula & Identity Review across all 10 subjects",
    "eveningFocus": "Zero new problems; consolidate memory",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Final Comprehensive Formula & Identity Review across all 10 subjects"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Final Comprehensive Formula & Identity Review across all 10 subjects"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Zero new problems; consolidate memory"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Final Comprehensive Formula & Identity Review across all 10 subjects",
      "Block 2: Solve 25 GateOverflow PYQs on Final Comprehensive Formula & Identity Review across all 10 subjects",
      "Block 3: Evening Drill - Zero new problems; consolidate memory",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Final Comprehensive Formula & Identity Review across all 10 subjects",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 89,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Full-Length Simulation & Revision",
    "techFocus": "Light Mistake Diary Review & Virtual Calculator Shortcuts Refresh",
    "eveningFocus": "Mental Relaxation & Sleep Optimization",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Light Mistake Diary Review & Virtual Calculator Shortcuts Refresh"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Light Mistake Diary Review & Virtual Calculator Shortcuts Refresh"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Mental Relaxation & Sleep Optimization"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Light Mistake Diary Review & Virtual Calculator Shortcuts Refresh",
      "Block 2: Solve 25 GateOverflow PYQs on Light Mistake Diary Review & Virtual Calculator Shortcuts Refresh",
      "Block 3: Evening Drill - Mental Relaxation & Sleep Optimization",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Light Mistake Diary Review & Virtual Calculator Shortcuts Refresh",
    "gateOverflowTag": "gate-cse"
  },
  {
    "dayNumber": 90,
    "phase": "WAR_ROOM_MOCKS",
    "phaseName": "Phase 3: Architecture, Networks & Full Mocks",
    "subject": "Full-Length Simulation & Revision",
    "techFocus": "Exam Logistics: Verify Admit Card, Original Photo ID, Center Route",
    "eveningFocus": "Rest & High Performance Priming",
    "pyqTarget": 25,
    "block1": {
      "time": "07:00 AM - 10:00 AM",
      "title": "Core Technical Breakdown",
      "focus": "Exam Logistics: Verify Admit Card, Original Photo ID, Center Route"
    },
    "block2": {
      "time": "11:30 AM - 02:00 PM",
      "title": "PYQ Timed Drill (25 Questions)",
      "focus": "Rigorous timed practice on Exam Logistics"
    },
    "block3": {
      "time": "05:00 PM - 07:00 PM",
      "title": "Aptitude & Error Scrub",
      "focus": "Rest & High Performance Priming"
    },
    "suggestedTasks": [
      "Block 1: Deep Study & Derivations - Exam Logistics: Verify Admit Card, Original Photo ID, Center Route",
      "Block 2: Solve 25 GateOverflow PYQs on Exam Logistics",
      "Block 3: Evening Drill - Rest & High Performance Priming",
      "Mistake Diary Scrub: Log any missed concepts or traps"
    ],
    "gfgSearchQuery": "gate cs Exam Logistics",
    "gateOverflowTag": "gate-cse"
  }
];
