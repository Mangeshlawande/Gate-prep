// Comprehensive 90-Day Weekly Execution Plan & Hourly Task Architecture
// Breaks down Phase 1 (Month 1), Phase 2 (Month 2), and Phase 3 (Month 3) into granular weekly build targets and 4-slot daily tasks
import { GATE_90_DAYS_CURRICULUM } from './curriculum';

export interface DailyHourlyTask {
  dayNumber: number;
  dayTitle: string;
  subject: string;
  theorySlot: {
    time: string; // "07:00 AM – 10:00 AM (Theory)"
    topics: string[];
    keyFormulasOrConcepts?: string[];
  };
  practiceSlot: {
    time: string; // "11:30 AM – 02:00 PM (Practice)"
    target: string;
    problemTypes: string[];
    timeTarget: string; // "Max 2 minutes per code snippet"
  };
  aptitudeMathSlot: {
    time: string; // "05:00 PM – 06:15 PM (Aptitude & Math)"
    focus: string;
    targetCount: string;
  };
  reviewSlot: {
    time: string; // "06:30 PM – 07:15 PM (Review)"
    goal: string;
    trapFocus: string;
  };
}

export interface WeekBlueprint {
  weekNumber: number;
  weekTitle: string;
  phaseId: 'PHASE_1' | 'PHASE_2' | 'PHASE_3';
  phaseName: string;
  monthName: string;
  dayRange: string;
  primarySubjects: string[];
  weekGoal: string;
  expectedMarksTarget: string;
  days: DailyHourlyTask[];
}

export interface PhaseBlueprint {
  id: 'PHASE_1' | 'PHASE_2' | 'PHASE_3';
  name: string;
  month: string;
  dayRange: string;
  description: string;
  targetMarks: string;
  weeks: WeekBlueprint[];
}

export const PHASE_WEEKLY_BLUEPRINT: PhaseBlueprint[] = [
  // =========================================================================
  // PHASE 1: HIGH-YIELD SCORING CORE (MONTH 1 / DAYS 1 TO 30)
  // =========================================================================
  {
    id: 'PHASE_1',
    name: 'Phase 1: High-Yield Scoring Core',
    month: 'Month 1',
    dayRange: 'Days 1 to 30',
    description: 'Foundation in C Programming, Linear & Non-Linear Data Structures, Asymptotics, Graph Algorithms, Greedy, Dynamic Programming, Combinatorics, and Discrete Mathematics.',
    targetMarks: '35–40 Marks (Solidified)',
    weeks: [
      {
        weekNumber: 1,
        weekTitle: 'Week 1: C Pointers, Memory Model & Linear Data Structures',
        phaseId: 'PHASE_1',
        phaseName: 'Phase 1: High-Yield Scoring Core',
        monthName: 'Month 1',
        dayRange: 'Days 1 to 7',
        primarySubjects: ['C Programming\', \'Data Structures (Stacks, Queues, Linked Lists)\', \'General Aptitude'],
        weekGoal: 'Master pointer arithmetic, stack frames, recursion tracing, expression evaluation, and circular queues with 0 arithmetic errors.',
        expectedMarksTarget: '8–10 Marks',
        days: [
          {
            dayNumber: 1,
            dayTitle: 'C Pointers, Memory Model & Parameter Passing',
            subject: 'C Programming',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'C Memory Layout (Code segment, Initialized/Uninitialized Data, Heap, Stack frames).',
                'Pointer arithmetic, * vs &, pointer to arrays (int (*p)[5]) vs array of pointers (int *p[5]), function pointers.',
                'Pass-by-value vs simulating pass-by-reference. Scope rules (static, extern, auto, register).'
              ],
              keyFormulasOrConcepts: [
                'Address calculation: *(p + i) equivalent to p[i]',
                'Array decay rule: name of array decays into pointer to first element (except with sizeof and &)'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on pointer dereferencing, multi-dimensional array pointer arithmetic, and string pointer manipulation.',
              problemTypes: [
                'Tricky pointer arithmetic expressions (e.g., *p++, (*p)++, *(p++))',
                '2D array indexing via pointers (e.g., *(*(arr + i) + j))',
                'Function pointer invocation tables'
              ],
              timeTarget: 'Max 2 minutes per code snippet.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'General Aptitude: Ratios, Proportions, Percentages, and Variations.',
              targetCount: 'Solve 15 standard aptitude problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document all pointer traps encountered (e.g., precedence of *p++ vs (*p)++).',
              trapFocus: 'Precedence: Postfix ++ has higher precedence than unary * dereference operator.'
            }
          },
          {
            dayNumber: 2,
            dayTitle: 'Functions, Recursion Tracing & Stack Activation Records',
            subject: 'C Programming',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Function call mechanics: Return addresses, caller vs callee saved registers, stack frames (EBP, ESP).',
                'Recursion call trees: Head recursion vs Tail recursion, recursion depth and space complexity.',
                'Static variables in recursive functions: Persistent values across activation records.'
              ],
              keyFormulasOrConcepts: [
                'Static variable retained across calls: static int count initialized once at program load',
                'Call stack unwinding order: statements before recursive call execute top-down; statements after execute bottom-up'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on tracing complex nested recursive functions and static counter mutations.',
              problemTypes: [
                'Multiple recursive branch tracing (e.g., f(n) calling f(n-1) and f(n-2))',
                'Static and global variable side-effects during recursion',
                'Tail recursion elimination'
              ],
              timeTarget: 'Max 2 minutes per recursive trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Linear Algebra: Matrices, Determinants, Matrix Inverses, and Matrix Multiplication Properties.',
              targetCount: 'Solve 15 problems on 2x2 and 3x3 determinants and ranks.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record recursion static mutation pitfalls in Mistake Diary.',
              trapFocus: 'Static variables are NOT reset when returning from recursive calls. Always preserve their updated values!'
            }
          },
          {
            dayNumber: 3,
            dayTitle: 'Structures, Dynamic Memory Allocation & Memory Leaks',
            subject: 'C Programming',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Structure padding, member alignment rules, and sizeof structure calculations.',
                'Self-referential structures (linked lists nodes, binary tree nodes).',
                'Dynamic memory allocation: malloc, calloc, realloc, and free mechanics on Heap.',
                'Dangling pointers, double free errors, and memory leak vulnerabilities.'
              ],
              keyFormulasOrConcepts: [
                'Structure size alignment: Size is always a multiple of the largest primitive member',
                'calloc initializes allocated memory to zero bytes, malloc leaves garbage values'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on structure memory padding, union storage overlaps, and dynamic heap allocation.',
              problemTypes: [
                'NAT questions calculating exact sizeof(struct)',
                'Union member overwrites and memory overlap MCQs',
                'realloc pointer relocation traces'
              ],
              timeTarget: 'Max 2 minutes per structure alignment calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Quantitative Aptitude: Profit & Loss, Marked Price, and Successive Discounts.',
              targetCount: 'Solve 15 standard profit and discount problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document padding rules: Data alignment boundaries depend on architecture word size.',
              trapFocus: 'Packing directives (#pragma pack) alter structure sizes drastically!'
            }
          },
          {
            dayNumber: 4,
            dayTitle: 'Arrays, Strings & Linked Lists: Singly, Doubly & Circular',
            subject: 'Data Structures',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Row-major vs Column-major 1D, 2D, and 3D array address calculation formulas.',
                'Singly Linked Lists: Node insertion, deletion at head/tail/k-th position, reverse in O(n) time and O(1) space.',
                'Doubly and Circular Linked Lists: Sentinel nodes, XOR linked lists.',
                'Floyd\'s Cycle Finding Algorithm (Tortoise and Hare proof for loop detection and start of cycle).'
              ],
              keyFormulasOrConcepts: [
                'Row-Major 2D address: Base + [i * cols + j] * sizeof(elem)',
                'Column-Major 2D address: Base + [j * rows + i] * sizeof(elem)',
                'Loop start formula: Meeting point distance to loop head equals head distance to loop start'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on 2D array address formulas (Row vs Column major) and pointer updates in linked lists.',
              problemTypes: [
                'NAT questions on base address offset in arbitrary index ranges [L1..U1, L2..U2]',
                'Number of pointer swaps required to reverse a sublist',
                'Detecting cycle length and loop entry point'
              ],
              timeTarget: 'Max 2 minutes per calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Linear Algebra: System of Linear Equations, Gaussian Elimination, Consistent vs Inconsistent systems.',
              targetCount: 'Solve 15 problems on rank(A) vs rank(A|B) and infinite/unique solutions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Lock row-major vs column-major index bounds into flashcards.',
              trapFocus: 'GATE questions frequently use 1-based indexing for arrays! Always check if lower bound L = 0 or 1!'
            }
          },
          {
            dayNumber: 5,
            dayTitle: 'Stacks: Infix to Postfix Conversion & Expression Evaluation',
            subject: 'Data Structures',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Stack ADT: LIFO principle, array vs linked list implementations, overflow/underflow conditions.',
                'Infix, Prefix, and Postfix notations: Operator precedence and associativity tables.',
                'Shunting-Yard algorithm: Infix to Postfix conversion using operator stack.',
                'Evaluating Postfix expressions using operand stack; Minimum stack size required during evaluation.'
              ],
              keyFormulasOrConcepts: [
                'Number of valid stack permutations with n items = Catalan number C(n) = (2n)! / ((n+1)! * n!)',
                'Operator associativity: Right-to-left for ^ (exponentiation), Left-to-right for +, -, *, /'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on maximum stack depth during expression parsing and valid output permutation sequences.',
              problemTypes: [
                'Evaluating tricky postfix expressions with unary operators and exponentiation',
                'Catalan number count of valid push/pop sequences',
                'Infix to Prefix conversion with parenthesization'
              ],
              timeTarget: 'Max 2 minutes per expression trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Quantitative Aptitude: Simple & Compound Interest, Annual compounding vs Half-yearly.',
              targetCount: 'Solve 15 interest rate numerical problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record exponentiation associativity trap: 2 ^ 3 ^ 2 evaluates right-to-left as 2 ^ (3 ^ 2) = 512, not (2^3)^2 = 64!',
              trapFocus: '^ is right-associative; operators of equal precedence pop from stack only if left-associative!'
            }
          },
          {
            dayNumber: 6,
            dayTitle: 'Queues: Circular Queues, Deques & Priority Queue Basics',
            subject: 'Data Structures',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Queue ADT: FIFO principle, linear array limitation (false overflow).',
                'Circular Queue: Modulo arithmetic formulas for enqueue: rear = (rear + 1) % capacity, dequeue: front = (front + 1) % capacity.',
                'Queue Full condition: (rear + 1) % capacity == front (sacrificing 1 empty slot) vs using a count variable.',
                'Double-Ended Queue (Deque): Input-restricted and output-restricted deques.',
                'Implementing queues using two stacks and stacks using two queues.'
              ],
              keyFormulasOrConcepts: [
                'Circular queue number of elements: (rear - front + capacity) % capacity',
                'Amortized cost of queue enqueue/dequeue using 2 stacks = O(1)'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on circular queue pointer manipulations and stack-based queue simulations.',
              problemTypes: [
                'NAT questions calculating final values of front and rear after k operations',
                'Number of push/pop operations needed to reverse a queue using a stack',
                'Circular queue condition checking with 0-based and 1-based indexing'
              ],
              timeTarget: 'Max 2 minutes per circular buffer calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Linear Algebra: Eigenvalues and Eigenvectors: Characteristic Equation det(A - lambda*I) = 0.',
              targetCount: 'Solve 15 problems on trace(A) = sum(eigenvalues) and det(A) = product(eigenvalues).'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document circular queue front/rear pointer initialization traps in Mistake Diary.',
              trapFocus: 'When front and rear start at -1, first enqueue sets BOTH front and rear to 0!'
            }
          },
          {
            dayNumber: 7,
            dayTitle: 'Week 1 Consolidation: 30-Question Timed Sectional Test',
            subject: 'C Programming & Linear DS',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Comprehensive 3-hour rapid review of C pointers, memory model, recursion, structures, stacks, and circular queues.',
                'Review of all 150 PYQs solved during Days 1 to 6.',
                'Formula scrub: Catalan numbers, row/column major offset, operator precedence chart.'
              ],
              keyFormulasOrConcepts: [
                'Catalan numbers: C(n) = (2n)! / ((n+1)! * n!)',
                'Trace = sum of eigenvalues; Determinant = product of eigenvalues'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Take a rigorous, timed 30-Question Sectional Test on C Programming and Linear Data Structures.',
              problemTypes: [
                '10 1-Mark MCQs / NATs on pointer expressions and queue formulas',
                '20 2-Mark questions on recursion traces, dynamic allocation, and expression parsing'
              ],
              timeTarget: 'Total 75 minutes timed test followed by 75 minutes detailed error analysis.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'General Aptitude: Time, Work & Wages, Pipes and Cisterns.',
              targetCount: 'Solve 15 standard aptitude problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Week 1 Error Scrub: Calculate Week 1 PYQ accuracy percentage and log all mistakes into the Mistake Diary.',
              trapFocus: 'Re-solve every single problem missed during the timed test with 100% conceptual clarity.'
            }
          }
        ]
      },
      {
        weekNumber: 2,
        weekTitle: 'Week 2: Trees, Heaps, Asymptotic Notation & Sorting Algorithms',
        phaseId: 'PHASE_1',
        phaseName: 'Phase 1: High-Yield Scoring Core',
        monthName: 'Month 1',
        dayRange: 'Days 8 to 14',
        primarySubjects: ['Data Structures (Trees, BSTs, Heaps)\', \'Algorithms (Asymptotics, Sorting, Hashing)\', \'Calculus & Aptitude'],
        weekGoal: 'Attain flawless mastery of tree traversals, BST insertion/deletion, Heapify math, Master Theorem cases, and Hash table probing.',
        expectedMarksTarget: '9–11 Marks',
        days: [
          {
            dayNumber: 8,
            dayTitle: 'Binary Trees: Properties, Strict/Complete Trees & Traversals',
            subject: 'Data Structures',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Binary Tree properties: Maximum nodes at height h = 2^(h+1) - 1, Minimum height for n nodes = ceil(log2(n+1)) - 1.',
                'Full/Strict Binary Tree theorem: Number of leaf nodes L = Internal nodes I + 1 (for degree 2).',
                'Complete Binary Tree and Almost Complete Binary Tree: Array representation (left child = 2i, right = 2i+1, parent = floor(i/2)).',
                'Traversals: Inorder, Preorder, Postorder, Level-order. Constructing unique binary tree from Inorder + (Preorder or Postorder).'
              ],
              keyFormulasOrConcepts: [
                'Sum of degrees = 2 * (Number of edges) = 2 * (n - 1)',
                'n0 = n2 + 1 for any binary tree where n0 is leaves and n2 is degree-2 nodes',
                'A unique binary tree CANNOT be constructed from Preorder + Postorder alone without knowing tree is full'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on tree traversals, constructing unique trees, and degree-property NATs.',
              problemTypes: [
                'Reconstructing tree from Inorder and Postorder and finding Preorder traversal',
                'NAT questions on minimum/maximum nodes in complete binary trees',
                'Threaded binary tree pointer counts'
              ],
              timeTarget: 'Max 2 minutes per tree reconstruction.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Calculus: Limits, Continuity, Differentiability, and L\'Hôpital\'s Rule for indeterminate forms.',
              targetCount: 'Solve 15 standard calculus problems on 0/0 and inf/inf limits.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record Preorder + Postorder ambiguity trap in Mistake Diary.',
              trapFocus: 'Preorder + Postorder determines unique tree ONLY if EVERY internal node has exactly two children!'
            }
          },
          {
            dayNumber: 9,
            dayTitle: 'Binary Search Trees (BST) & AVL Self-Balancing Trees',
            subject: 'Data Structures',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'BST property: Left subtree keys < root key < Right subtree keys. Inorder traversal of BST always produces sorted keys.',
                'BST search, insertion, and deletion: Deleting node with 2 children (replace with Inorder Predecessor or Inorder Successor).',
                'Counting distinct BSTs for n distinct keys = Catalan number C(n).',
                'AVL Trees: Balance factor BF in {-1, 0, +1}. Rotations: LL, RR, LR, RL. Minimum nodes in AVL tree of height h: N(h) = N(h-1) + N(h-2) + 1.'
              ],
              keyFormulasOrConcepts: [
                'Worst-case search time in skewed BST = O(n); Best/Average = O(log n)',
                'AVL minimum nodes recurrence: N(0)=1, N(1)=2, N(2)=4, N(3)=7, N(4)=12, N(5)=20',
                'Maximum height of AVL tree with n nodes is approximately 1.44 * log2(n)'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on BST key insertion sequences, deletion operations, and AVL tree rotations.',
              problemTypes: [
                'Sequences of numbers that can/cannot produce a given BST search path',
                'Resulting AVL tree structure after a sequence of key insertions',
                'NAT questions on minimum nodes in AVL tree of height h'
              ],
              timeTarget: 'Max 2 minutes per BST sequence trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Calculus: Maxima, Minima, Saddle Points, and Mean Value Theorems (Rolle\'s, Lagrange\'s).',
              targetCount: 'Solve 15 optimization problems finding local and global extrema.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document BST search path sequence trap: Once you turn left, you cannot encounter a key greater than the upper bound!',
              trapFocus: 'When verifying search sequences, maintain tight [min, max] interval bounds at every step!'
            }
          },
          {
            dayNumber: 10,
            dayTitle: 'Binary Heaps, Priority Queues & HeapSort',
            subject: 'Data Structures',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Max-Heap and Min-Heap properties: Complete binary tree structure, parent-child ordering.',
                'Array representation: Root at index 1, children at 2i and 2i+1, parent at floor(i/2).',
                'Heapify algorithm: O(log n) per subtree. Bottom-up Build-Heap complexity proof: sum(h/2^h) converges to O(n).',
                'Heap operations: Extract-Max O(log n), Insert-Key O(log n), Delete-Key O(log n). HeapSort complexity: O(n log n) in all cases.'
              ],
              keyFormulasOrConcepts: [
                'Build-Heap time complexity is O(n), NOT O(n log n)!',
                'Leaves of binary heap of size n are located from index floor(n/2) + 1 to n',
                'Number of nodes of height h in a heap of size n is at most ceil(n / 2^(h+1))'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on Build-Heap comparison counts, key deletion steps, and K-th largest element extraction.',
              problemTypes: [
                'Exact number of comparisons to build a max-heap of n elements',
                'Locating the minimum element in a Max-Heap (must search among the leaves in O(n) time)',
                'HeapSort comparisons in best vs worst case'
              ],
              timeTarget: 'Max 2 minutes per heap problem.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'General Aptitude: Permutations, Combinations, and Counting Principles.',
              targetCount: 'Solve 15 counting aptitude problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document Heap Minimum Element Search Trap: Minimum element is NOT at index n!',
              trapFocus: 'In a Max-Heap, the minimum element can be ANY of the leaf nodes (indices floor(n/2) + 1 to n). Searching it requires O(n) time!'
            }
          },
          {
            dayNumber: 11,
            dayTitle: 'Asymptotic Analysis & Recurrence Relations (Master Theorem)',
            subject: 'Algorithms',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Asymptotic notations: Formal definitions of Big-O, Big-Omega, Big-Theta, Little-o, Little-omega.',
                'Comparing growth rates: log(log n) < log n < (log n)^k < n^(1/k) < n < n log n < n^k < 2^n < n! < n^n.',
                'Recurrence solving methods: Substitution method, Recursion Tree method.',
                'Master Theorem for divide-and-conquer recurrences: T(n) = a*T(n/b) + f(n) across all 3 cases and Extended Master Theorem.'
              ],
              keyFormulasOrConcepts: [
                'Critical exponent: p = log_b(a)',
                'Case 1: f(n) = O(n^(p - eps)) => T(n) = Theta(n^p)',
                'Case 2: f(n) = Theta(n^p * log^k n) => T(n) = Theta(n^p * log^(k+1) n)',
                'Case 3: f(n) = Omega(n^(p + eps)) and regularity condition => T(n) = Theta(f(n))'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on asymptotic comparisons, Master Theorem applications, and non-standard recurrences.',
              problemTypes: [
                'Comparing pairs of functions f(n) and g(n) for Big-O and Big-Theta (MSQ)',
                'Recurrences where Master theorem does NOT apply (e.g., T(n) = 2T(n/2) + n/log n)',
                'Solving non-divide-and-conquer recurrences by variable substitution (e.g. n = 2^m)'
              ],
              timeTarget: 'Max 2 minutes per asymptotic comparison.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'General Aptitude: Probability fundamentals, Independent Events, and Bayes\' Theorem.',
              targetCount: 'Solve 15 standard probability problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record Master theorem polynomial difference trap in Mistake Diary.',
              trapFocus: 'f(n) must be POLYNOMIALLY larger or smaller than n^(log_b a). A factor of log n is NOT polynomial!'
            }
          },
          {
            dayNumber: 12,
            dayTitle: 'Divide & Conquer: MergeSort, QuickSort & Inversions',
            subject: 'Algorithms',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Comparison Sort lower bound: Decision tree model Omega(n log n) proof.',
                'MergeSort: Stability, external sorting, counting inversions in O(n log n) time.',
                'QuickSort: Partitioning schemes (Lomuto vs Hoare), worst-case O(n^2), randomized QuickSort expected O(n log n).',
                'Non-comparison sorts: Counting Sort O(n+k), Radix Sort O(d*(n+k)), Bucket Sort.'
              ],
              keyFormulasOrConcepts: [
                'Inversion count = number of pairs (i, j) such that i < j and A[i] > A[j]',
                'QuickSort space complexity: O(log n) auxiliary stack space for best/average case; O(n) for worst case'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on sorting stability, worst-case pivot selections, and inversion counts.',
              problemTypes: [
                'Number of comparisons executed in MergeSort vs QuickSort on already sorted arrays',
                'Stable vs Unstable sorting algorithms classification (MSQ)',
                'Finding median in O(n) time using QuickSelect'
              ],
              timeTarget: 'Max 2 minutes per sorting problem.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Quantitative Aptitude: Elementary Statistics (Mean, Median, Mode, Standard Deviation, Variance).',
              targetCount: 'Solve 15 statistics problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document QuickSort worst-case pivot traps: Naive pivot on already sorted array yields O(n^2).',
              trapFocus: 'QuickSort is NOT stable by default, whereas MergeSort is stable if <= is used during merge.'
            }
          },
          {
            dayNumber: 13,
            dayTitle: 'Searching & Hashing: Collision Handling & Probing',
            subject: 'Algorithms & Data Structures',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Hash functions: Division method (h(k) = k % m), multiplication method, universal hashing.',
                'Collision resolution: Chaining (load factor alpha = n/m, expected search O(1+alpha)).',
                'Open Addressing: Linear probing (primary clustering), Quadratic probing (secondary clustering), Double hashing.',
                'Successful vs Unsuccessful search expected comparisons formulas in open addressing.'
              ],
              keyFormulasOrConcepts: [
                'Double hashing formula: h(k, i) = (h1(k) + i * h2(k)) % m, where h2(k) must be coprime to m',
                'Unsuccessful search in open addressing expected probes = 1 / (1 - alpha)'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on hash table key insertions, linear probing probe counts, and double hashing.',
              problemTypes: [
                'NAT questions on number of collisions/probes to insert a sequence of keys',
                'Deleting keys in open addressing: using DELETED flag to prevent breaking search chains',
                'Load factor impact on hash table resizing'
              ],
              timeTarget: 'Max 2 minutes per probing trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Calculus: Definite & Indefinite Integrals, Integration by Parts, Area under Curves.',
              targetCount: 'Solve 15 calculus integration questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Log open addressing deletion traps: Simply setting cell to NULL terminates search early!',
              trapFocus: 'Always mark deleted cells with a special TOMBSTONE flag in linear/quadratic probing!'
            }
          },
          {
            dayNumber: 14,
            dayTitle: 'Week 2 Consolidation: 30-Question Timed Test on Trees, Heaps & Algorithms',
            subject: 'Algorithms & Non-Linear DS',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Comprehensive 3-hour review of Trees, BSTs, Heaps, Asymptotic Bounds, and Hashing.',
                'Formula scrub: Catalan numbers, heapify proofs, Master Theorem cases, hash probing formulas.',
                'Review of all 150 PYQs solved during Days 8 to 13.'
              ],
              keyFormulasOrConcepts: [
                'Master theorem edge cases summary sheet',
                'Tree property formulas: n = n0 + n1 + n2, n0 = n2 + 1'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Take a rigorous, timed 30-Question Sectional Test on Trees, BST, Heaps, Sorting, and Recurrences.',
              problemTypes: [
                '10 1-Mark MCQs / NATs on asymptotic notation and tree properties',
                '20 2-Mark questions on BST deletion sequences, heap operations, and QuickSort worst cases'
              ],
              timeTarget: 'Total 75 minutes timed test followed by 75 minutes error analysis.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Analytical Aptitude: Syllogisms, Venn Diagrams, and Logic Deductions.',
              targetCount: 'Solve 15 standard syllogism problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Week 2 Error Scrub: Calculate Week 2 PYQ accuracy and record all conceptual gaps in Mistake Diary.',
              trapFocus: 'Consolidate all tree traversal and Master theorem traps into high-yield review cards.'
            }
          }
        ]
      },
      {
        weekNumber: 3,
        weekTitle: 'Week 3: Graph Algorithms, Greedy & Dynamic Programming',
        phaseId: 'PHASE_1',
        phaseName: 'Phase 1: High-Yield Scoring Core',
        monthName: 'Month 1',
        dayRange: 'Days 15 to 21',
        primarySubjects: ['Algorithms (Graphs, Greedy, Dynamic Programming)\', \'Discrete Math\', \'General Aptitude'],
        weekGoal: 'Master BFS/DFS edge classifications, Kruskal/Prim MST proofs, Dijkstra negative edge constraints, and DP recurrence formulations.',
        expectedMarksTarget: '9–11 Marks',
        days: [
          {
            dayNumber: 15,
            dayTitle: 'Graph Traversals: BFS, DFS, Connected Components & Cycle Detection',
            subject: 'Algorithms',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Graph representations: Adjacency Matrix O(V^2) vs Adjacency List O(V+E).',
                'Breadth-First Search (BFS): Queue implementation, shortest path in unweighted graphs.',
                'Depth-First Search (DFS): Recursion stack, discovery & finish times, edge classification (Tree, Back, Forward, Cross edges).',
                'Cycle detection in Directed Graphs (Back edges via 3-coloring: WHITE, GRAY, BLACK) and Undirected Graphs.'
              ],
              keyFormulasOrConcepts: [
                'Back edge in DFS tree signifies a directed cycle',
                'Bipartite graph theorem: A graph is bipartite iff it contains NO odd-length cycle'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on BFS tree levels, DFS edge classifications, and topological sort orders.',
              problemTypes: [
                'Classifying edges as tree/back/forward/cross from given DFS start vertex',
                'Counting connected components and articulation points',
                'Valid topological sort sequences in DAGs'
              ],
              timeTarget: 'Max 2 minutes per graph traversal trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Quantitative Aptitude: Time, Speed, Distance, Relative Speed, and Train Problems.',
              targetCount: 'Solve 15 speed and distance numerical problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record DFS Cross Edge Trap in Mistake Diary.',
              trapFocus: 'A cross edge does NOT create a directed cycle; only a BACK edge (leading to an ancestor currently on the recursion stack) creates a cycle!'
            }
          },
          {
            dayNumber: 17,
            dayTitle: 'Minimum Spanning Trees: Kruskal, Prim & Disjoint Sets (DSU)',
            subject: 'Algorithms',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'MST definitions and Cut Property / Cycle Property proofs.',
                'Disjoint Set Union (DSU): Union by Rank and Path Compression (Ackermann function inverse alpha(V)).',
                'Kruskal\'s Algorithm: Greedy edge sorting O(E log E) + DSU cycle prevention.',
                'Prim\'s Algorithm: Priority queue vertex relaxation O((V+E) log V). Distinct edge weights guarantee unique MST.'
              ],
              keyFormulasOrConcepts: [
                'Cut Property: Minimum weight edge crossing any cut belongs to every MST',
                'Total number of edges in MST of connected graph with V vertices is ALWAYS V - 1'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on MST edge additions, uniqueness proofs, and Kruskal vs Prim execution orders.',
              problemTypes: [
                'NAT questions calculating total weight of MST',
                'Second-best MST weight and edge replacements',
                'Number of distinct MSTs when multiple edges have identical weights'
              ],
              timeTarget: 'Max 2 minutes per MST calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Linear Algebra: Vector Spaces, Subspaces, Basis, Dimension, and Rank-Nullity Theorem.',
              targetCount: 'Solve 15 linear algebra questions on basis and dimensions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document Identical Edge Weight MST Traps.',
              trapFocus: 'Distinct edge weights guarantee a UNIQUE MST; having duplicate edge weights does NOT mean multiple MSTs must exist (e.g., if duplicate edges are on the same cut)!'
            }
          },
          {
            dayNumber: 19,
            dayTitle: 'Shortest Paths: Dijkstra, Bellman-Ford & Floyd-Warshall',
            subject: 'Algorithms',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Single-Source Shortest Path: Relaxation operation (d[v] = min(d[v], d[u] + w(u,v))).',
                'Dijkstra\'s Algorithm: Greedy priority queue implementation O((V+E) log V), non-negative weights constraint.',
                'Bellman-Ford Algorithm: Dynamic programming edge relaxation V-1 times O(V*E), negative edge handling and negative cycle detection on V-th pass.',
                'Floyd-Warshall Algorithm: All-pairs shortest paths O(V^3), transitive closure.'
              ],
              keyFormulasOrConcepts: [
                'Dijkstra FAILS with negative edge weights even without negative cycles!',
                'Negative cycle exists iff distance updates occur during the V-th iteration of Bellman-Ford'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on tracing Dijkstra vertex extractions and Bellman-Ford negative cycle identification.',
              problemTypes: [
                'Traced distances after k iterations of Dijkstra or Bellman-Ford',
                'Negative weight cycle detection in directed graphs (MSQ)',
                'Floyd-Warshall matrix transformation traces'
              ],
              timeTarget: 'Max 2.5 minutes per shortest path trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Quantitative Aptitude: Work, Wages, Pipes & Cisterns, and Combined Efficiency.',
              targetCount: 'Solve 15 efficiency problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Log Dijkstra Negative Edge Trap into Mistake Diary.',
              trapFocus: 'Dijkstra assumes that once a vertex is marked extracted from the priority queue, its shortest distance is finalized. A negative edge later can invalidate this assumption!'
            }
          },
          {
            dayNumber: 21,
            dayTitle: 'Dynamic Programming: 0/1 Knapsack, LCS & Matrix Chain Multiplication',
            subject: 'Algorithms',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'DP Core: Optimal Substructure and Overlapping Subproblems, Memoization vs Tabulation.',
                '0/1 Knapsack Problem: Pseudo-polynomial DP table O(n*W), Space optimization to O(W).',
                'Longest Common Subsequence (LCS): Recurrence L[i,j] = 1 + L[i-1,j-1] if X[i]==Y[j], else max(L[i-1,j], L[i,j-1]).',
                'Matrix Chain Multiplication (MCM): Parenthesization recurrence m[i,j] = min(m[i,k] + m[k+1,j] + p_{i-1}*p_k*p_j) in O(n^3).'
              ],
              keyFormulasOrConcepts: [
                '0/1 Knapsack is NP-Complete (pseudo-polynomial time), whereas Fractional Knapsack is Greedy O(n log n)',
                'Number of scalar multiplications in Matrix Chain of dimensions p0 x p1 ... pn'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on DP state tables, optimal parenthesization multiplication counts, and LCS reconstruction.',
              problemTypes: [
                'NAT questions on minimum scalar multiplications to multiply matrix chains',
                'Length and number of distinct LCS strings',
                'Subset Sum and Coin Change DP table traces'
              ],
              timeTarget: 'Max 2 minutes per DP calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Probability: Conditional Probability, Total Probability, and Bayes\' Theorem.',
              targetCount: 'Solve 15 conditional probability problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document Matrix Chain Base Case Trap: Diagonal elements m[i,i] = 0 (zero multiplications for 1 matrix).',
              trapFocus: 'Always trace matrix dimensions correctly: matrix Ai has dimensions p_{i-1} x p_i!'
            }
          }
        ]
      },
      {
        weekNumber: 4,
        weekTitle: 'Week 4: Discrete Mathematics, Logic & Phase 1 Mock Consolidation',
        phaseId: 'PHASE_1',
        phaseName: 'Phase 1: High-Yield Scoring Core',
        monthName: 'Month 1',
        dayRange: 'Days 22 to 30',
        primarySubjects: ['Discrete Mathematics (Logic, Sets, Relations, Combinatorics)\', \'Linear Algebra\', \'Full Phase 1 Assessment'],
        weekGoal: 'Attain 100% accuracy in First-Order Logic translations, Equivalence/Poset counts, Combinatorial identities, and achieve > 35 Marks on Phase 1 Mock.',
        expectedMarksTarget: '10–12 Marks',
        days: [
          {
            dayNumber: 23,
            dayTitle: 'Propositional & First-Order Predicate Logic (Soundness & Validity)',
            subject: 'Discrete Mathematics',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Propositional logic: Truth tables, Tautologies, Contradictions, Contingencies, Logical Equivalences (De Morgan\'s, Contrapositive).',
                'Inference rules: Modus Ponens, Modus Tollens, Resolution principle.',
                'First-Order Logic: Quantifiers (forall, exists), Scope, Prenex normal form, Negation of quantified formulas.',
                'Valid, Satisfiable, and Unsatisfiable predicate formulas.'
              ],
              keyFormulasOrConcepts: [
                'p -> q is logically equivalent to ~p v q and ~q -> ~p',
                '~(forall x P(x)) is logically equivalent to exists x ~P(x)',
                'forall x (P(x) -> Q(x)) vs forall x (P(x) ^ Q(x)) English translations'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on English-to-FOL translations, validity of predicate expressions, and resolution refutation.',
              problemTypes: [
                'Translating English assertions involving "all", "some", "none", and "at least one"',
                'Identifying valid and equivalent First-Order Logic formulas (MSQ)',
                'Resolution refutation clause generation'
              ],
              timeTarget: 'Max 2 minutes per logic translation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Analytical Aptitude: Deductive logic, Syllogisms, and Assumption testing.',
              targetCount: 'Solve 15 deduction questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record Predicate Logic "All vs Some" Translation Pitfalls.',
              trapFocus: '"Every student who studies passes" translates to forall x (S(x) ^ P(x) -> Q(x)), NOT forall x (S(x) -> P(x) ^ Q(x))!'
            }
          },
          {
            dayNumber: 25,
            dayTitle: 'Set Theory, Relations, Equivalence Relations & Partial Orders (Posets)',
            subject: 'Discrete Mathematics',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Set operations: Union, Intersection, Difference, Cartesian Product, Power sets (cardinality 2^n).',
                'Relations: Reflexive, Irreflexive, Symmetric, Anti-symmetric, Asymmetric, Transitive.',
                'Equivalence Relations and Partitions (Bell numbers).',
                'Partial Order Relations (Posets): Reflexive, Anti-symmetric, Transitive. Hasse diagrams, Maximal/Minimal elements, Lattices, Distributive and Complemented lattices.'
              ],
              keyFormulasOrConcepts: [
                'Total relations on set with n elements = 2^(n^2)',
                'Reflexive relations = 2^(n^2 - n); Symmetric relations = 2^(n(n+1)/2)',
                'A lattice is distributive iff it does not contain pentagon (N5) or diamond (M3) sublattices'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on counting relations with given properties, checking Poset lattices, and Hasse diagrams.',
              problemTypes: [
                'NAT questions on number of reflexive, symmetric, or equivalence relations',
                'Testing if a Hasse diagram forms a lattice, bounded lattice, or boolean algebra',
                'Transitive closure computation using Warshall\'s algorithm'
              ],
              timeTarget: 'Max 2 minutes per relation calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Engineering Math: Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem, and Matrix Powers.',
              targetCount: 'Solve 15 linear algebra questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document Symmetric vs Anti-symmetric Fallacy in Mistake Diary.',
              trapFocus: 'Symmetric and Anti-symmetric are NOT mutually exclusive! A relation can be BOTH (e.g. equality relation {(a,a)}), or NEITHER!'
            }
          },
          {
            dayNumber: 27,
            dayTitle: 'Combinatorics: Pigeonhole Principle, Derangements & Generating Functions',
            subject: 'Discrete Mathematics',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Generalized Pigeonhole Principle (PHP): ceil(n / k) items in at least one box.',
                'Permutations and Combinations with repetitions: Stars and Bars theorem (x1 + ... + xk = n has C(n+k-1, k-1) non-negative solutions).',
                'Inclusion-Exclusion Principle (PIE) and Derangements formula: D(n) = n! * sum((-1)^k / k!).',
                'Generating Functions: Solving homogeneous and non-homogeneous linear recurrence relations.'
              ],
              keyFormulasOrConcepts: [
                'Derangements: D(1)=0, D(2)=1, D(3)=2, D(4)=9, D(5)=44; Ratio D(n)/n! converges to 1/e ~ 0.368',
                'Non-negative integer solutions to x1 + x2 + ... + xk = n is C(n + k - 1, k - 1)'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on Pigeonhole Principle scenarios, Derangements, and Stars-and-Bars counting.',
              problemTypes: [
                'NAT questions finding minimum number of picks to guarantee k items of the same type',
                'Number of onto functions (surjections) from set of size m to size n',
                'Derangement probability calculations'
              ],
              timeTarget: 'Max 2 minutes per combinatorial count.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'General Aptitude: Permutation & Combination counting problems and arrangements.',
              targetCount: 'Solve 15 counting problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record Onto Functions Surjection Formula into Mistake Diary.',
              trapFocus: 'Number of onto functions from size m to size n = sum_{k=0}^n (-1)^k * C(n, k) * (n - k)^m. Always verify m >= n!'
            }
          },
          {
            dayNumber: 30,
            dayTitle: 'Phase 1 Comprehensive Consolidation Exam: 65-Question Core Mock',
            subject: 'Phase 1 Full Syllabus Mock',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Comprehensive pass through all Phase 1 Master Formula Deck cards (C, Stacks, Queues, Trees, Heaps, Sorting, Graphs, Greedy, DP, Logic, Sets, Linear Algebra).',
                'Scrubbing all logged traps in the Mistake Diary from Days 1 to 29.',
                'Pre-mock mental calibration and virtual calculator speed warm-up.'
              ],
              keyFormulasOrConcepts: [
                'Accuracy over speed: Zero unforced errors on C pointers, Catalan numbers, Master Theorem, and BFS/DFS traces',
                'Time target: 25 mins Aptitude, 65 mins 1-Markers, 90 mins 2-Markers'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:30 PM (Practice)',
              target: 'Execute Full-Length 65-Question Phase 1 Core Mock Exam (100 Marks, strictly timed 180 minutes).',
              problemTypes: [
                '10 General Aptitude Questions (15 Marks)',
                '25 Technical 1-Mark Questions on Phase 1 Subjects (25 Marks)',
                '30 Technical 2-Mark Questions on Phase 1 High-Yield Core (60 Marks)'
              ],
              timeTarget: 'Strict 180 minutes non-negotiable timed exam simulation.'
            },
            aptitudeMathSlot: {
              time: '04:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Phase 1 Mock Detailed Error Audit: Classify all mistakes into Calculation, Misread, Blindspot, or Conceptual Gap.',
              targetCount: 'Audit all 65 mock questions; record exact mark losses.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Phase 1 Mastery Certification: Verify raw score > 35 Marks on Phase 1 Core subjects.',
              trapFocus: 'Formulate corrective focus cards for Phase 2 entry. Lock Phase 1 knowledge into long-term memory!'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // PHASE 2: SYSTEMS, THEORY & DATABASES (MONTH 2 / DAYS 31 TO 60)
  // =========================================================================
  {
    id: 'PHASE_2',
    name: 'Phase 2: Systems, Theory & Databases',
    month: 'Month 2',
    dayRange: 'Days 31 to 60',
    description: 'Deep mastery of Theory of Computation, Compiler Design, Operating Systems internals, and Relational Databases (DBMS).',
    targetMarks: '32–36 Marks (Solidified)',
    weeks: [
      {
        weekNumber: 5,
        weekTitle: 'Week 5: Theory of Computation (Automata, Grammars, Decidability)',
        phaseId: 'PHASE_2',
        phaseName: 'Phase 2: Systems, Theory & Databases',
        monthName: 'Month 2',
        dayRange: 'Days 31 to 37',
        primarySubjects: ['Theory of Computation (DFA, NFA, PDA, Turing Machines)\', \'Probability & Statistics'],
        weekGoal: 'Master DFA state minimization, Arden theorem, closure property proofs across Chomsky hierarchy, and Rice\'s Theorem.',
        expectedMarksTarget: '8–9 Marks',
        days: [
          {
            dayNumber: 31,
            dayTitle: 'Finite Automata: DFA Design, NFA to DFA Subset Construction',
            subject: 'Theory of Computation',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Deterministic Finite Automata (DFA) 5-tuple (Q, Sigma, delta, q0, F), transition functions.',
                'Non-Deterministic Finite Automata (NFA) and Epsilon-NFA: Language equivalence with DFA.',
                'Powerset subset construction: Converting NFA with n states to DFA with up to 2^n states.',
                'Designing minimal DFAs for modulo arithmetic languages (e.g. binary numbers divisible by k).'
              ],
              keyFormulasOrConcepts: [
                'Binary numbers divisible by k require exactly k states in minimal DFA',
                'Strings ending with specific substring of length m require m + 1 states in minimal DFA'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on counting states in minimal DFAs and NFA-to-DFA conversions.',
              problemTypes: [
                'NAT questions finding minimum number of states in DFA accepting given language',
                'NFA to DFA state count under subset construction',
                'Complement of DFA: Swap final and non-final states'
              ],
              timeTarget: 'Max 2 minutes per DFA state counting problem.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Engineering Math: Probability Sample Spaces, Conditional Probability, and Independence.',
              targetCount: 'Solve 15 problems on conditional probability.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document dead state omissions: In DFA, every state MUST have a transition for every alphabet symbol!',
              trapFocus: 'Do not forget the trap/dead state when calculating total DFA states for prefix-restricted languages.'
            }
          },
          {
            dayNumber: 32,
            dayTitle: 'Regular Expressions & DFA State Minimization (Myhill-Nerode)',
            subject: 'Theory of Computation',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Regular Expressions: Operators (*, +, concatenation), Arden\'s Theorem (R = Q + RP => R = QP*).',
                'DFA State Minimization: Table-filling algorithm (Myhill-Nerode equivalence relations).',
                'Distinguishable vs Indistinguishable states: Finding equivalence classes.',
                'Uniqueness of minimal DFA: Up to state relabeling (isomorphism).'
              ],
              keyFormulasOrConcepts: [
                'Arden theorem condition: P must NOT contain epsilon for unique solution R = QP*',
                'Myhill-Nerode theorem: Language is regular iff number of equivalence classes of R_L is finite'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on table-filling state minimization and regular expression simplification.',
              problemTypes: [
                'Step-by-step table filling to find equivalent state pairs',
                'Equivalence between two regular expressions (MSQ)',
                'Minimal DFA state count for regular expressions'
              ],
              timeTarget: 'Max 2.5 minutes per state minimization table.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Engineering Math: Bayes\' Theorem and Law of Total Probability.',
              targetCount: 'Solve 15 Bayes\' theorem diagnostic test problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Log state minimization traps: Unreachable states from start state MUST be removed first!',
              trapFocus: 'Always eliminate unreachable states before applying the table-filling minimization algorithm!'
            }
          }
        ]
      },
      {
        weekNumber: 6,
        weekTitle: 'Week 6: Compiler Design & Chomsky Hierarchy Decidability',
        phaseId: 'PHASE_2',
        phaseName: 'Phase 2: Systems, Theory & Databases',
        monthName: 'Month 2',
        dayRange: 'Days 38 to 44',
        primarySubjects: ['Compiler Design (Lex, LL(1), LR Parsers, SDT)\', \'TOC Decidability\', \'Engineering Math'],
        weekGoal: 'Attain 100% precision in LL(1) FIRST/FOLLOW parsing tables, LR state counting, SDT attribute evaluations, and Rice\'s Theorem undecidability proofs.',
        expectedMarksTarget: '8–10 Marks',
        days: [
          {
            dayNumber: 39,
            dayTitle: 'Lexical Analysis, Grammar Transformations & LL(1) Top-Down Parsing',
            subject: 'Compiler Design',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Lexical tokens, regular definitions, Lex specification files, longest match rule.',
                'Grammar transformations: Eliminating Immediate & Indirect Left Recursion, Left Factoring.',
                'FIRST and FOLLOW sets formal algorithms and calculation rules.',
                'Constructing LL(1) Predictive Parsing Table: Detecting FIRST/FIRST and FIRST/FOLLOW conflicts; Ambiguity.'
              ],
              keyFormulasOrConcepts: [
                'FOLLOW(A) never contains epsilon! $ (end-of-input) always belongs to FOLLOW(Start Symbol)',
                'Grammar is LL(1) iff parsing table contains at most one production per cell'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on FIRST & FOLLOW set calculations and LL(1) conflict identification.',
              problemTypes: [
                'NAT questions on number of entries in LL(1) parsing table',
                'Grammar ambiguity proofs using multiple parse trees for string',
                'Identifying which grammars are LL(1) (MSQ)'
              ],
              timeTarget: 'Max 2 minutes per FOLLOW set calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Engineering Math: Limits, Continuity, and L\'Hopital\'s Rule with indeterminate forms.',
              targetCount: 'Solve 15 calculus problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record FOLLOW Set Computation Traps in Mistake Diary.',
              trapFocus: 'When A -> alpha B, FOLLOW(B) includes FOLLOW(A). But when A -> alpha B beta and beta derives epsilon, FOLLOW(B) includes BOTH FIRST(beta)\{eps} AND FOLLOW(A)!'
            }
          },
          {
            dayNumber: 41,
            dayTitle: 'Bottom-Up Parsing: LR(0), SLR(1), CLR(1), LALR(1) & Conflicts',
            subject: 'Compiler Design',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Shift-Reduce (S-R) and Reduce-Reduce (R-R) parser conflicts.',
                'LR(0) Canonical Collection of items: Closure and Goto operations.',
                'SLR(1) table construction: Placing reduce actions strictly under FOLLOW(LHS).',
                'LR(1) items with lookaheads; CLR(1) table construction; LALR(1) state merging (same core items).',
                'Parser Power Hierarchy: LR(0) < SLR(1) < LALR(1) < CLR(1) and LL(1) vs LR relationships.'
              ],
              keyFormulasOrConcepts: [
                'LALR(1) has identical number of states as LR(0) / SLR(1)',
                'Merging states in LALR(1) can create Reduce-Reduce conflicts, but NEVER Shift-Reduce conflicts!'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on LR item states count and conflict detection across SLR/LALR/CLR.',
              problemTypes: [
                'NAT questions finding total number of states in LR(0) / LALR(1) automaton',
                'Classifying grammars as SLR(1), LALR(1), or CLR(1) (MSQ)',
                'Detecting Shift-Reduce vs Reduce-Reduce conflicts'
              ],
              timeTarget: 'Max 2.5 minutes per LR state table trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'General Aptitude: Geometry, Mensuration, and Coordinate Geometry.',
              targetCount: 'Solve 15 geometry aptitude problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Log LALR(1) Conflict Merging Rule into Mistake Diary.',
              trapFocus: 'LALR(1) state merging can NEVER introduce a Shift-Reduce conflict because lookaheads on reduce items can never conflict with existing shift items of the same core!'
            }
          },
          {
            dayNumber: 43,
            dayTitle: 'Syntax Directed Translation (SDT), Intermediate Code & Decidability',
            subject: 'Compiler Design & TOC',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Syntax Directed Definitions (SDD): Synthesized vs Inherited attributes.',
                'S-Attributed Definitions: Synthesized only, evaluated during bottom-up parsing.',
                'L-Attributed Definitions: Inherited attributes depend strictly on left siblings and parent; top-down evaluable.',
                'Three-Address Code (TAC), Quadruples, Triples, and DAGs for Basic Blocks.',
                'TOC Decidability: Halting Problem, Rice\'s Theorem (any non-trivial semantic property of RE languages is undecidable), Post Correspondence Problem (PCP).'
              ],
              keyFormulasOrConcepts: [
                'Every S-attributed definition is also an L-attributed definition',
                'Rice\'s Theorem applies ONLY to language properties (semantic properties) of Turing Machines'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on SDT evaluation values, DAG node counts, and Decidable vs Undecidable classifications.',
              problemTypes: [
                'Tracing attribute values at root of annotated parse tree',
                'Minimum number of nodes in DAG for arithmetic expressions',
                'Decidability and Turing Recognizability classifications (MSQ)'
              ],
              timeTarget: 'Max 2 minutes per SDT trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Discrete Mathematics: Graph Coloring, Chromatic number, and Planar Graph Euler Formula (V - E + F = 2).',
              targetCount: 'Solve 15 planar graph questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record Rice\'s Theorem Applicability Trap in Mistake Diary.',
              trapFocus: 'Rice\'s Theorem applies to WHAT the machine accepts (its language L(M)), NOT to HOW it computes (e.g. "Does M halt in 100 steps?" is DECIDABLE by direct simulation)!'
            }
          }
        ]
      },
      {
        weekNumber: 7,
        weekTitle: 'Week 7: Operating Systems (Synchronization, Deadlocks, Paging, Virtual Memory)',
        phaseId: 'PHASE_2',
        phaseName: 'Phase 2: Systems, Theory & Databases',
        monthName: 'Month 2',
        dayRange: 'Days 45 to 52',
        primarySubjects: ['Operating Systems\', \'Engineering Mathematics & Aptitude'],
        weekGoal: 'Master semaphore critical section proofs, Banker\'s safety algorithm, multi-level paging math, and TLB EMAT calculations with 100% accuracy.',
        expectedMarksTarget: '9–10 Marks',
        days: [
          {
            dayNumber: 44,
            dayTitle: 'Process Synchronization: Critical Sections, Peterson & Semaphores',
            subject: 'Operating Systems',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Critical Section problem: Mutual Exclusion, Progress, Bounded Waiting conditions.',
                'Software solutions: Peterson Algorithm for 2 processes (turn, flag[2]), proof of Progress.',
                'Hardware atomic instructions: Test-and-Set (TAS), Compare-and-Swap (CAS).',
                'Counting and Binary Semaphores: wait() and signal() definitions, Classical problems (Producer-Consumer, Readers-Writers).'
              ],
              keyFormulasOrConcepts: [
                'Peterson algorithm satisfies Mutual Exclusion, Progress, and Bounded Waiting for 2 processes',
                'Semaphores: Value S >= 0 indicates available resources; value < 0 indicates |S| processes queued'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on code tracing concurrent processes for mutual exclusion and deadlock.',
              problemTypes: [
                'Determining whether a concurrent protocol satisfies Mutual Exclusion and Progress (MSQ)',
                'Calculating final value of counting semaphore after sequence of P and V calls',
                'Producer-Consumer buffer synchronization edge cases'
              ],
              timeTarget: 'Max 2.5 minutes per synchronization code trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Engineering Math: Discrete Random Variables, Probability Mass Function (PMF), Expectation & Variance.',
              targetCount: 'Solve 15 expectation and variance problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record Progress condition violation traps: A process outside the critical section blocking another process.',
              trapFocus: 'Strict alternation violates the Progress condition because a process not wanting to enter can prevent the other!'
            }
          },
          {
            dayNumber: 46,
            dayTitle: 'Memory Management: Paging & Multi-Level Page Table Size Math',
            subject: 'Operating Systems',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Logical vs Physical address spaces, MMU hardware translation, base and limit registers.',
                'Paging architecture: Page number (VPN) and Page Offset (PO), Frame number (PFN).',
                'Page table size formula: (Number of pages) * (Page table entry size).',
                'Multi-level hierarchical paging: Splitting VPN bits across levels so inner page tables fit into 1 physical frame.'
              ],
              keyFormulasOrConcepts: [
                'Virtual address width = log2(Virtual Address Space size)',
                'Page Offset bits = log2(Page Size)',
                'Number of levels k: k-th level page table must fit into 1 frame => Page Size / PTE_size entries per table'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on calculating page table sizes and address bit splits in multi-level paging.',
              problemTypes: [
                'NAT questions finding bits in outer page table vs inner page table',
                'Maximum size of page table required for 32-bit and 64-bit systems',
                'Paging with inverted page tables'
              ],
              timeTarget: 'Max 2 minutes per page table calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Quantitative Aptitude: Mixtures, Allegations, Clocks, and Calendars.',
              targetCount: 'Solve 15 standard quantitative aptitude questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document address space unit confusion traps (bytes vs words, bits vs bytes in PTE size).',
              trapFocus: 'Always check if PTE size is given in bytes (e.g., 4 bytes = 32 bits) and whether physical memory is byte-addressed.'
            }
          },
          {
            dayNumber: 47,
            dayTitle: 'Virtual Memory: TLB Hit/Miss Ratio (EMAT) & Page Replacement',
            subject: 'Operating Systems',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Translation Lookaside Buffer (TLB): Associative cache for page table entries, TLB hit ratio h.',
                'Effective Memory Access Time (EMAT) formula in single-level and k-level paging.',
                'Page fault handling interrupt sequence, dirty bit, valid/invalid bit.',
                'Page Replacement Algorithms: FIFO (Belady\'s Anomaly), Optimal (OPT), Least Recently Used (LRU).'
              ],
              keyFormulasOrConcepts: [
                'EMAT = h * (t_tlb + t_m) + (1 - h) * (t_tlb + (k + 1) * t_m)',
                'Belady\'s Anomaly: Increasing frame allocation increases page faults in FIFO (never happens in stack algorithms like LRU)'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on TLB EMAT calculations and page fault counts under FIFO/LRU/Optimal.',
              problemTypes: [
                'NAT questions calculating EMAT with simultaneous vs sequential TLB lookup',
                'Tracing page fault strings under 3 and 4 frame allocations',
                'Page replacement algorithms exhibiting Belady Anomaly (MSQ)'
              ],
              timeTarget: 'Max 2 minutes per EMAT calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Spatial Aptitude: Mirror Imaging, Paper Folding, and 3D Assembly.',
              targetCount: 'Solve 15 spatial aptitude questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Log EMAT multi-level miss multiplier traps: on miss, access is (k + 1) * t_m!',
              trapFocus: 'In a 2-level page table, miss takes 3 memory accesses (Outer Table + Inner Table + Data Frame)!'
            }
          }
        ]
      },
      {
        weekNumber: 8,
        weekTitle: 'Week 8: Relational Databases (Relational Algebra, SQL, Normalization, Transactions)',
        phaseId: 'PHASE_2',
        phaseName: 'Phase 2: Systems, Theory & Databases',
        monthName: 'Month 2',
        dayRange: 'Days 53 to 60',
        primarySubjects: ['Databases (Relational Algebra, SQL, Normalization, Concurrency)\', \'Engineering Math'],
        weekGoal: 'Master Relational Algebra division queries, BCNF/3NF decomposition testing, Conflict Serializability precedence graphs, and B+ Tree order math.',
        expectedMarksTarget: '8–10 Marks',
        days: [
          {
            dayNumber: 54,
            dayTitle: 'Relational Algebra, Tuple Calculus & Complex SQL Queries',
            subject: 'Databases (DBMS)',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Relational Algebra operators: Selection (sigma), Projection (pi), Cartesian Product (x), Joins (Theta, Natural, Outer).',
                'Division Operator (R / S) representing universal quantification ("for all" queries).',
                'Tuple Relational Calculus (TRC) and Domain Relational Calculus (DRC), Safe vs Unsafe expressions.',
                'SQL: Nested subqueries, Correlated subqueries, GROUP BY, HAVING, NULL arithmetic in 3-valued logic.'
              ],
              keyFormulasOrConcepts: [
                'Division operator condition: Schema(R / S) = Schema(R) - Schema(S)',
                'COUNT(*) includes rows with NULL, but COUNT(column_name) ignores NULL values'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on equivalent Relational Algebra expressions and SQL queries with grouping/HAVING.',
              problemTypes: [
                'Identifying equivalent SQL query to a given Relational Algebra division expression',
                'Output tuples count in SQL queries involving Outer Joins and NULLs',
                'Expressive power equivalences between TRC and Relational Algebra (MSQ)'
              ],
              timeTarget: 'Max 2 minutes per SQL query trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Engineering Math: Continuous Random Variables, Normal, Exponential, and Uniform distributions.',
              targetCount: 'Solve 15 probability problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document SQL NULL Comparison Traps in Mistake Diary.',
              trapFocus: 'In SQL, column = NULL evaluates to UNKNOWN, not TRUE or FALSE! Always use IS NULL or IS NOT NULL!'
            }
          },
          {
            dayNumber: 56,
            dayTitle: 'Functional Dependencies, Attribute Closures & Normal Forms (BCNF, 3NF)',
            subject: 'Databases (DBMS)',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Functional Dependencies: Armstrong\'s Axioms (Reflexivity, Augmentation, Transitivity), Attribute Closures (X+).',
                'Finding all Candidate Keys of a relation schema, Minimal Cover / Canonical Cover algorithm.',
                'Normal Forms: 1NF, 2NF (no partial dependencies), 3NF (LHS is superkey OR RHS is prime attribute), BCNF (LHS is superkey).',
                'Decomposition properties: Lossless Join Decomposition test (R1 cap R2 -> R1 or R2) and Dependency Preservation.'
              ],
              keyFormulasOrConcepts: [
                'Lossless Join condition: (R1 cap R2) must be a superkey for R1 or R2',
                '3NF decomposition is ALWAYS lossless and dependency preserving; BCNF is always lossless but MAY NOT preserve dependencies'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on finding Candidate Keys, highest normal form identification, and decomposition checks.',
              problemTypes: [
                'NAT questions finding total number of candidate keys for a given relation',
                'Testing if a given decomposition is Lossless and Dependency Preserving',
                'Identifying the highest normal form satisfied by relation (2NF, 3NF, BCNF)'
              ],
              timeTarget: 'Max 2 minutes per candidate key calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Quantitative Aptitude: Profit, Loss, Mixtures, and Proportions.',
              targetCount: 'Solve 15 quantitative problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record 3NF Prime Attribute Exception in Mistake Diary.',
              trapFocus: 'In 3NF, if X -> Y and X is NOT a superkey, the FD is still valid as long as EVERY attribute in Y is a PRIME attribute (part of some candidate key)!'
            }
          },
          {
            dayNumber: 58,
            dayTitle: 'Transactions, Serializability, Concurrency Control (2PL) & B+ Trees',
            subject: 'Databases (DBMS)',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'ACID properties: Atomicity, Consistency, Isolation, Durability.',
                'Schedules: Conflict Serializability (Precedence Graph / Serialization Graph cycle test), View Serializability (Blind Writes).',
                'Recoverability: Recoverable schedules, Cascadeless schedules, Strict schedules.',
                'Two-Phase Locking (2PL): Growing phase and Shrinking phase guarantees Conflict Serializability; Strict 2PL and Rigorous 2PL.',
                'B+ Tree Indexing: Node order p, max and min keys/pointers in internal vs leaf nodes, search and insertion path height.'
              ],
              keyFormulasOrConcepts: [
                'A schedule is conflict serializable iff its precedence graph has NO cycles',
                'In B+ Tree of order p: Internal node holds max p pointers and p-1 keys; Leaf holds max p-1 keys'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on precedence graph cycle tests, strict/cascadeless schedules, and B+ tree node capacities.',
              problemTypes: [
                'Determining if an interleaved transaction schedule is Conflict Serializable and Recoverable',
                'NAT questions calculating maximum order or height of B+ Tree given disk block size',
                'Strict 2PL deadlock vulnerability checks'
              ],
              timeTarget: 'Max 2 minutes per schedule precedence check.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Verbal Ability: Reading Comprehension, Sentence Completion, and Critical Reasoning.',
              targetCount: 'Solve 15 verbal reasoning questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Log View Serializability Blind Write Trap into Mistake Diary.',
              trapFocus: 'Every Conflict Serializable schedule is View Serializable; but a schedule can be View Serializable without being Conflict Serializable ONLY if it contains BLIND WRITES (Write without a preceding Read)!'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // PHASE 3: HARDWARE, NETWORKS & WAR-ROOM FULL MOCKS (MONTH 3 / DAYS 61 TO 90)
  // =========================================================================
  {
    id: 'PHASE_3',
    name: 'Phase 3: Hardware, Networks & War-Room Mock Engine',
    month: 'Month 3',
    dayRange: 'Days 61 to 90',
    description: 'Digital Logic, Computer Organization & Architecture, Computer Networks, and 5 Full-Length 65-Question Mocks.',
    targetMarks: '32–36 Marks + Exam Speed Mastery',
    weeks: [
      {
        weekNumber: 9,
        weekTitle: 'Week 9: Digital Logic (Boolean Algebra, K-Maps, Combinational & Sequential Circuits)',
        phaseId: 'PHASE_3',
        phaseName: 'Phase 3: Hardware, Networks & War-Room Mock Engine',
        monthName: 'Month 3',
        dayRange: 'Days 61 to 67',
        primarySubjects: ['Digital Logic (Boolean Algebra, K-Maps, MUX, Counters)\', \'Engineering Math'],
        weekGoal: 'Master prime implicants minimization, multiplexer boolean synthesis, counter state transitions, and setup/hold time timing constraints.',
        expectedMarksTarget: '6–8 Marks',
        days: [
          {
            dayNumber: 62,
            dayTitle: 'Boolean Algebra, Canonical Forms & K-Map Minimization',
            subject: 'Digital Logic',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Boolean postulates, De Morgan\'s laws, Duality principle, Complement of boolean functions.',
                'Canonical SOP (minterms m_i) and Canonical POS (maxterms M_i).',
                'K-Map simplification (2, 3, 4, 5 variables): Prime Implicants (PI), Essential Prime Implicants (EPI).',
                'Don\'t Care conditions (d), Static-0 and Static-1 hazards and hazard-free cover generation.'
              ],
              keyFormulasOrConcepts: [
                'Essential Prime Implicant is a PI that covers at least one minterm not covered by ANY other PI',
                'Dual of a function is obtained by swapping AND <-> OR, but NOT complementing variables'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on counting PIs and EPIs and finding minimal SOP/POS boolean expressions.',
              problemTypes: [
                'NAT questions on number of Essential Prime Implicants in 4-variable K-map',
                'Identifying minimal boolean function with Don\'t Care terms',
                'Eliminating static-1 hazards by adding redundant consensus gates'
              ],
              timeTarget: 'Max 2 minutes per K-map problem.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Engineering Math: Matrix Rank, Cramer\'s Rule, and Homogeneous linear systems.',
              targetCount: 'Solve 15 linear algebra questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record Don\'t Care Inclusion Trap in Mistake Diary.',
              trapFocus: 'Don\'t Cares are used ONLY to form larger groups and simplify terms; they must NEVER be grouped alone if they do not cover actual minterms!'
            }
          },
          {
            dayNumber: 64,
            dayTitle: 'Combinational Circuits: Multiplexers, Decoders, Encoders & Adders',
            subject: 'Digital Logic',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Half Adder and Full Adder (Sum = A xor B xor Cin, Carry = AB + Cin(A xor B)), Carry Lookahead Adder delay O(1).',
                'Multiplexers (2:1, 4:1, 8:1): Implementing arbitrary boolean functions using MUX with/without extra inverters.',
                'Decoders (2:4, 3:8) with active-high and active-low enables; Demultiplexers.',
                'Priority Encoders (4:2, 8:3) with Valid bit output, Cascading multiplexers.'
              ],
              keyFormulasOrConcepts: [
                'An n-variable function can be implemented using a 2^(n-1) to 1 MUX with variables connected to data lines',
                'Carry Lookahead generator: Gi = Ai * Bi, Pi = Ai xor Bi'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on implementing logic functions using 2:1 and 4:1 MUXs and decoder networks.',
              problemTypes: [
                'Output boolean function of cascaded MUX circuits',
                'NAT questions on number of 2:1 MUXs required to build a 16:1 MUX',
                'Priority encoder active output codes'
              ],
              timeTarget: 'Max 2 minutes per MUX circuit trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'General Aptitude: Blood Relations, Directions, and Seating Arrangement.',
              targetCount: 'Solve 15 reasoning problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document MUX Select Line Order Trap in Mistake Diary.',
              trapFocus: 'Always verify which variable is MSB and which is LSB in MUX select lines! Swapping s1 and s0 completely alters the output function!'
            }
          },
          {
            dayNumber: 66,
            dayTitle: 'Sequential Circuits: Flip-Flops, Setup/Hold Time & Synchronous Counters',
            subject: 'Digital Logic',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Latches vs Flip-Flops. Characteristic equations and Excitation tables of SR, JK (race-around condition, Master-Slave), D, and T flip-flops.',
                'Timing constraints: Setup time (t_setup), Hold time (t_hold), Clock-to-Q propagation delay (t_cq).',
                'Maximum operating clock frequency formula: f_max = 1 / (t_cq + t_comb + t_setup).',
                'Synchronous Counters vs Ripple/Asynchronous Counters: MOD-N counters, lock-out states, self-starting counters.'
              ],
              keyFormulasOrConcepts: [
                'T Flip-Flop: Q_next = T xor Q; D Flip-Flop: Q_next = D',
                'Hold time condition: t_cq + t_comb >= t_hold (independent of clock frequency!)'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on counter state transition counting, MOD values, and maximum clock frequencies.',
              problemTypes: [
                'NAT questions determining MOD value of counter from schematic',
                'Calculating maximum clock frequency with gate delays and setup times',
                'Identifying next state sequences of Johnson and Ring counters'
              ],
              timeTarget: 'Max 2 minutes per counter trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Quantitative Aptitude: Permutations, Combinations, and Probability basics.',
              targetCount: 'Solve 15 aptitude questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record Hold Time Clock Independence Trap in Mistake Diary.',
              trapFocus: 'Decreasing clock frequency can fix SETUP time violations, but CANNOT fix HOLD time violations!'
            }
          }
        ]
      },
      {
        weekNumber: 10,
        weekTitle: 'Week 10: Computer Organization & Architecture (Cache Mapping, Pipelining)',
        phaseId: 'PHASE_3',
        phaseName: 'Phase 3: Hardware, Networks & War-Room Mock Engine',
        monthName: 'Month 3',
        dayRange: 'Days 68 to 74',
        primarySubjects: ['COA (Cache Memory, Pipelining, Addressing Modes)\', \'Engineering Math & Aptitude'],
        weekGoal: 'Master set-associative cache tag calculations, instruction pipelining speedup with hazards, and IEEE 754 floating point arithmetic.',
        expectedMarksTarget: '9–10 Marks',
        days: [
          {
            dayNumber: 69,
            dayTitle: 'Cache Memory: Direct, Set-Associative Mapping & Tag Bits',
            subject: 'Computer Organization & Architecture',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Memory hierarchy latency, locality of reference (temporal and spatial).',
                'Cache mapping architectures: Direct mapped, k-way set associative, fully associative.',
                'Physical address field breakdown: Tag bits, Set Index bits, Block/Word Offset bits.',
                'Cache size formulas: Data capacity vs Total capacity (including tag bits and valid/dirty bits).'
              ],
              keyFormulasOrConcepts: [
                'Number of Sets = (Total Lines in Cache) / k',
                'Set Index bits = log2(Number of Sets)',
                'Tag bits = Total Physical Address bits - (Set Index bits + Block Offset bits)'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on calculating tag bits, cache hit ratios, and memory access latency.',
              problemTypes: [
                'NAT questions on Tag bits in k-way set-associative cache with byte vs word addressing',
                'Total bits required for cache directory including valid and dirty bits',
                'Average Memory Access Time (AMAT) = t_cache + (miss_rate) * t_memory'
              ],
              timeTarget: 'Max 2 minutes per cache address breakdown.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Engineering Math: System of Linear Equations, Gaussian Elimination, and Matrix Inverses.',
              targetCount: 'Solve 15 linear algebra questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record word-addressable vs byte-addressable block offset slip in Mistake Diary.',
              trapFocus: 'If memory is 32-bit word addressable, block size of 32 bytes contains only 8 words => Offset is 3 bits, NOT 5 bits!'
            }
          },
          {
            dayNumber: 71,
            dayTitle: 'Instruction Pipelining: Hazards, Stalls & Operand Forwarding',
            subject: 'Computer Organization & Architecture',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Pipelined execution: Clock cycle time = max(stage delays) + intermediate register delay.',
                'Speedup formula: S = (k * n) / (k + n - 1 + stalls) where k = stages, n = instructions.',
                'Hazards: Structural hazards (resource conflicts), Data hazards (RAW, WAR, WAW), Control hazards (branches).',
                'Hazard resolution: Stalls (NOPs), Operand forwarding (bypass data path), Branch prediction.'
              ],
              keyFormulasOrConcepts: [
                'Ideal speedup for n >> k approaches k',
                'RAW (Read After Write) is true data dependency; WAR and WAW are name dependencies resolved by renaming'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on pipeline execution cycle counts, hazard identification, and speedup.',
              problemTypes: [
                'NAT questions finding total clock cycles to execute a code loop with RAW dependencies',
                'Cycles saved by hardware operand forwarding',
                'Branch penalty calculations with conditional branches'
              ],
              timeTarget: 'Max 2 minutes per pipeline timing diagram.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Quantitative Aptitude: Speed, Time, Distance, Relative Speed, and Work Rates.',
              targetCount: 'Solve 15 standard time and work problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Log pipeline register delay omission traps: Clock cycle must include register overhead!',
              trapFocus: 'Clock cycle period = bottleneck stage delay + t_reg. Never forget adding register delay!'
            }
          }
        ]
      },
      {
        weekNumber: 11,
        weekTitle: 'Week 11: Computer Networks (IPv4, Subnetting, Fragmentation, TCP)',
        phaseId: 'PHASE_3',
        phaseName: 'Phase 3: Hardware, Networks & War-Room Mock Engine',
        monthName: 'Month 3',
        dayRange: 'Days 75 to 81',
        primarySubjects: ['Computer Networks (IPv4, CIDR, Fragmentation, TCP)\', \'Engineering Math'],
        weekGoal: 'Master IP subnet prefix matching, fragmentation offset calculations, and TCP congestion control window dynamics.',
        expectedMarksTarget: '8–9 Marks',
        days: [
          {
            dayNumber: 76,
            dayTitle: 'IPv4 Addressing, Subnetting & IP Fragmentation',
            subject: 'Computer Networks',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'IPv4 header format (Total Length, Identification, Flags DF/MF, Fragment Offset, TTL, Protocol).',
                'CIDR subnetting: Subnet mask, network address, broadcast address, usable hosts = 2^(32-prefix) - 2.',
                'IP Fragmentation: MTU constraint, payload chunking in multiples of 8 bytes, offset = byte_index / 8.',
                'Longest Prefix Matching routing table lookup.'
              ],
              keyFormulasOrConcepts: [
                'Fragment Offset = (Payload Byte Index) / 8',
                'All fragments except the last MUST carry payload in exact multiples of 8 bytes',
                'MF (More Fragments) = 1 for all fragments except the last (MF = 0)'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on IP fragmentation offset calculations and CIDR longest prefix matching.',
              problemTypes: [
                'NAT questions on Fragment Offset field of second or third packet',
                'Routing table next-hop determination via longest prefix match',
                'Total overhead added due to fragmentation'
              ],
              timeTarget: 'Max 2 minutes per fragmentation calculation.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Engineering Math: Probability Uniform, Exponential, and Normal Distributions.',
              targetCount: 'Solve 15 continuous probability problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Record IP fragment offset 8-byte scaling traps: Entering raw byte count instead of dividing by 8!',
              trapFocus: 'The Fragment Offset field is stored in 8-byte blocks. Always divide byte offset by 8!'
            }
          },
          {
            dayNumber: 78,
            dayTitle: 'TCP Flow Control, Congestion Control (AIMD) & Window Dynamics',
            subject: 'Computer Networks',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'TCP header: Sequence number, ACK number, Window size, Flags (SYN, ACK, FIN, RST, PSH, URG).',
                'Flow control: Sliding window protocol, receiver advertised window (rwnd), Effective Window = min(cwnd, rwnd).',
                'Congestion Control phases: Slow Start (exponential growth), Congestion Avoidance (additive increase: AIMD).',
                'Tahoe vs Reno: Tahoe drops cwnd to 1 MSS on timeout and 3 dup ACKs; Reno performs Fast Recovery (cwnd = ssthresh + 3).'
              ],
              keyFormulasOrConcepts: [
                'Slow start: cwnd doubles every RTT (increases by 1 MSS for each ACK received)',
                'Congestion avoidance: cwnd increases by 1 MSS every RTT',
                'On packet loss: ssthresh = cwnd / 2'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 25 GATE PYQs on TCP congestion window size calculations across RTT rounds.',
              problemTypes: [
                'NAT questions finding cwnd size after n rounds with timeout or 3 duplicate ACKs',
                'Maximum achievable throughput given RTT and packet loss rate',
                'TCP sequence number wrapping time on high-bandwidth links'
              ],
              timeTarget: 'Max 2 minutes per TCP window trace.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Analytical Aptitude: Complex Tables, Data Interpretation, and Logical Grouping.',
              targetCount: 'Solve 15 data interpretation questions.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Document TCP Tahoe vs Reno threshold update traps: cwnd drops to 1 only on timeout or in Tahoe!',
              trapFocus: 'In TCP Reno on 3 duplicate ACKs: ssthresh = cwnd / 2, and cwnd starts at ssthresh in Fast Recovery!'
            }
          }
        ]
      },
      {
        weekNumber: 12,
        weekTitle: 'Week 12: All-Subject High-Speed PYQ Marathon & 200 Trap Dissection',
        phaseId: 'PHASE_3',
        phaseName: 'Phase 3: Hardware, Networks & War-Room Mock Engine',
        monthName: 'Month 3',
        dayRange: 'Days 82 to 84',
        primarySubjects: ['All 11 GATE Subjects\', \'Trap Dissection\', \'General Aptitude'],
        weekGoal: 'Execute rapid 50-question diagnostic marathons across all 11 technical subjects, eliminating all recurring calculation slips and memory traps.',
        expectedMarksTarget: 'Speed & Accuracy Lock-In',
        days: [
          {
            dayNumber: 83,
            dayTitle: 'All-Subject High-Speed PYQ Marathon & 200 Trap Dissection',
            subject: 'Comprehensive Revision (All 11 Subjects)',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Rapid Formula Vault cross-examination across all 11 GATE subjects.',
                'Master formulas scrub: Pointers, Asymptotics, Master Theorem, DFA states, LL/LR parsers, Semaphores, EMAT, Cache Tag bits, Pipelining speedup, Normal forms, IPv4 fragmentation.',
                'Virtual calculator keystroke muscle memory and speed drilling.'
              ],
              keyFormulasOrConcepts: [
                'High-yield formula synthesis across all technical domains',
                'Target time per NAT question: Under 90 seconds'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 50 high-speed GateOverflow PYQs covering the most frequently repeated tricky concepts from 2010 to 2024.',
              problemTypes: [
                '20 1-Mark mixed rapid-fire questions across all subjects',
                '30 2-Mark high-trap questions with previous national error rates > 60%'
              ],
              timeTarget: 'Max 1.5 minutes per question.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Aptitude Flash Drill: 20 mixed Quantitative, Spatial, and Verbal problems in 45 minutes.',
              targetCount: 'Solve 20 high-yield aptitude problems.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Scrub the entire Mistake Diary for re-occurring errors; build the "Do-Not-Touch" trap cheat-sheet.',
              trapFocus: 'Identify any lingering arithmetic slips under time pressure; eliminate guessing on MCQs!'
            }
          }
        ]
      },
      {
        weekNumber: 13,
        weekTitle: 'Week 13: Final War-Room Mocks & PSU Rank Optimization',
        phaseId: 'PHASE_3',
        phaseName: 'Phase 3: Hardware, Networks & War-Room Mock Engine',
        monthName: 'Month 3',
        dayRange: 'Days 85 to 90',
        primarySubjects: ['Full-Length GATE Mocks\', \'Formula Vault Scrubbing\', \'PSU Exam Strategy'],
        weekGoal: 'Execute Full-Length 65-Question Mocks under strict 180-minute conditions; achieve raw score > 75 Marks for AIR < 250.',
        expectedMarksTarget: '75–85+ Marks (PSU Elite)',
        days: [
          {
            dayNumber: 85,
            dayTitle: 'Full-Length Mock Exam 1 (65 Questions | 180 Mins) & In-Depth Analysis',
            subject: 'Full Syllabus War-Room Mock',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Rapid Formula Vault review across all 11 technical subjects and General Aptitude.',
                'Mental preparation, official virtual calculator muscle memory warm-up.',
                'Target time allocation: 25 mins Aptitude (15M), 70 mins 1-Markers (25M), 85 mins 2-Markers (60M).'
              ],
              keyFormulasOrConcepts: [
                'Negative marking defense: Never guess on 2-Mark MCQs without eliminating at least 2 options',
                'NAT questions have ZERO negative marks: Always attempt all plausible numerical answers'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:30 PM (Practice)',
              target: 'Execute Full-Length GATE CS Mock Exam 1 (65 Questions, 100 Marks, strictly timed 180 minutes).',
              problemTypes: [
                '10 General Aptitude Questions (5 1-Mark, 5 2-Mark)',
                '25 Technical 1-Mark Questions (MCQ, MSQ, NAT)',
                '30 Technical 2-Mark Questions (High-yield complex problems)'
              ],
              timeTarget: 'Strict 180 minutes non-negotiable exam simulation.'
            },
            aptitudeMathSlot: {
              time: '04:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Mock 1 Detailed Error Breakdown: Categorize every missed question into Cognitive Taxonomy.',
              targetCount: 'Audit all 65 questions; calculate exact negative marking penalty incurred.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Log all Mock 1 blunders into Mistake Diary; formulate corrective strategy for Mock 2.',
              trapFocus: 'Identify whether marks were lost to conceptual gaps or time-pressure arithmetic slips.'
            }
          },
          {
            dayNumber: 90,
            dayTitle: 'Final PSU Apex Readiness & Formula Vault Lock-In',
            subject: 'Comprehensive Revision & Strategy',
            theorySlot: {
              time: '07:00 AM – 10:00 AM (Theory)',
              topics: [
                'Complete pass through all 20+ Master Formula Deck cards.',
                'Review of all 100+ logged traps in the Mistake Diary across the entire 90 days.',
                'Finalizing exam day time-management strategy and virtual calculator short-cuts.'
              ],
              keyFormulasOrConcepts: [
                'AIR < 250 mindset: Accuracy over speed; eliminate negative marking',
                'PSU cutoff benchmark: 75+ raw marks ensures top PSU calls (IOCL, ONGC, NTPC, POSOCO)'
              ]
            },
            practiceSlot: {
              time: '11:30 AM – 02:00 PM (Practice)',
              target: 'Solve 20 highest-rated GateOverflow PYQs specifically testing memory traps from your Mistake Diary.',
              problemTypes: [
                'Re-solve previously failed NAT questions from Phase 1 and Phase 2',
                'Verify 100% accuracy on standard EMAT, Cache Tag, and Master Theorem derivations'
              ],
              timeTarget: 'Max 2 minutes per question.'
            },
            aptitudeMathSlot: {
              time: '05:00 PM – 06:15 PM (Aptitude & Math)',
              focus: 'Aptitude & Math Rapid Fire: 20 mixed high-yield questions.',
              targetCount: 'Ensure 15/15 target in General Aptitude on exam day.'
            },
            reviewSlot: {
              time: '06:30 PM – 07:15 PM (Review)',
              goal: 'Final 90-Day Blueprint Certification: Confirm schedule completion and ready status.',
              trapFocus: 'Peak performance state: Confident, calm, and mathematically precise.'
            }
          }
        ]
      }
    ]
  }
];

export function getDailyBlueprint(dayNumber: number): DailyHourlyTask {
  for (const phase of PHASE_WEEKLY_BLUEPRINT) {
    for (const week of phase.weeks) {
      const found = week.days.find(d => d.dayNumber === dayNumber);
      if (found) return found;
    }
  }

  // Synthesize consistent 4-slot structure from curriculum for days not explicitly listed
  const curr = GATE_90_DAYS_CURRICULUM.find(c => c.dayNumber === dayNumber) || GATE_90_DAYS_CURRICULUM[0];
  const topics = curr.techFocus.split(',').map(t => t.trim()).filter(Boolean);

  return {
    dayNumber: curr.dayNumber,
    dayTitle: curr.techFocus.split(':')[0] || `${curr.subject} Core Mastery`,
    subject: curr.subject,
    theorySlot: {
      time: '07:00 AM – 10:00 AM (Theory)',
      topics: topics.length > 0 ? topics : [curr.block1.focus],
      keyFormulasOrConcepts: [
        `Standard derivations and core theoretical definitions for ${curr.subject}`,
        `Comprehensive concept synthesis for ${curr.techFocus}`
      ]
    },
    practiceSlot: {
      time: '11:30 AM – 02:00 PM (Practice)',
      target: `Solve ${curr.pyqTarget} GATE PYQs on ${curr.techFocus}`,
      problemTypes: [
        'Single correct MCQs with subtle distractor options',
        'Numerical Answer Type (NAT) precision calculations',
        'Multiple Select Questions (MSQ) testing edge conditions'
      ],
      timeTarget: 'Max 2 minutes per problem.'
    },
    aptitudeMathSlot: {
      time: '05:00 PM – 06:15 PM (Aptitude & Math)',
      focus: curr.eveningFocus,
      targetCount: 'Solve 15 standard practice problems.'
    },
    reviewSlot: {
      time: '06:30 PM – 07:15 PM (Review)',
      goal: `Document all conceptual traps, edge cases, and calculation slips for Day ${curr.dayNumber}.`,
      trapFocus: `Scrub high-frequency confusion points and edge cases in ${curr.subject}.`
    }
  };
}

export function getWeekForDay(dayNumber: number): WeekBlueprint | null {
  for (const phase of PHASE_WEEKLY_BLUEPRINT) {
    for (const week of phase.weeks) {
      if (week.days.some(d => d.dayNumber === dayNumber)) {
        return week;
      }
    }
  }
  return null;
}
