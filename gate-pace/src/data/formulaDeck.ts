export interface FormulaCard {
  id: string;
  subject: string;
  topic: string;
  title: string;
  formula: string;
  keyPoints: string[];
  importance: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  exampleTrap: string;
}

export const FORMULA_DECK: FormulaCard[] = [
  // 1. Algorithms & Data Structures
  {
    id: "algo-master-theorem",
    subject: "Algorithms",
    topic: "Asymptotic Analysis",
    title: "Master Theorem for Divide & Conquer",
    formula: "T(n) = a*T(n/b) + f(n), where a >= 1, b > 1. Compare f(n) with n^(log_b(a)):\\nCase 1: f(n) = O(n^(log_b(a) - eps)) => T(n) = Theta(n^(log_b(a)))\\nCase 2: f(n) = Theta(n^(log_b(a)) * log^k(n)) => T(n) = Theta(n^(log_b(a)) * log^(k+1)(n))\\nCase 3: f(n) = Omega(n^(log_b(a) + eps)) & a*f(n/b) <= c*f(n) => T(n) = Theta(f(n))",
    keyPoints: [
      "Cannot be applied if a is not constant (e.g., T(n) = 2^n T(n/2)) or if b is not constant.",
      "Cannot be applied if f(n) is not polynomially larger/smaller (e.g., f(n) = n / log n). Use Akra-Bazzi or recursion tree instead.",
      "For Extended Case 2: if k = -1, T(n) = Theta(n^(log_b a) * log(log n))."
    ],
    importance: "CRITICAL",
    exampleTrap: "Applying standard Case 3 when the regularity condition a*f(n/b) <= c*f(n) for c < 1 fails."
  },
  {
    id: "algo-sorting-complexities",
    subject: "Algorithms",
    topic: "Sorting & Order Statistics",
    title: "Sorting Complexities & Stability Matrix",
    formula: "Merge Sort: Best=O(n log n), Worst=O(n log n), Space=O(n), Stable=YES\\nQuick Sort: Best=O(n log n), Worst=O(n^2), Space=O(log n) stack, Stable=NO\\nHeap Sort: Best=O(n log n), Worst=O(n log n), Space=O(1), Stable=NO\\nCounting Sort: O(n + k), Space=O(n + k), Stable=YES\\nRadix Sort: O(d*(n + b)), Stable=YES",
    keyPoints: [
      "Any comparison-based sort has a lower bound of Omega(n log n) comparisons in worst case.",
      "Quick Sort worst-case comparisons = n(n-1)/2 when array is already sorted and pivot is extreme.",
      "Binary search requires floor(log2 n) + 1 comparisons in worst case."
    ],
    importance: "CRITICAL",
    exampleTrap: "Assuming Heap Sort is stable or that Quick Sort has O(1) auxiliary space (recursion stack requires O(log n))."
  },
  {
    id: "ds-binary-tree-properties",
    subject: "Data Structures",
    topic: "Trees & Binary Trees",
    title: "Binary Tree Structural Invariants",
    formula: "In any non-empty binary tree: n_0 = n_2 + 1 (Leaves = Nodes with degree 2 + 1).\\nMax nodes at height h (root at 0): 2^(h+1) - 1.\\nMin height for n nodes: ceil(log2(n + 1)) - 1.\\nFor full k-ary tree with i internal nodes: L = (k - 1)*i + 1 leaves; Total nodes N = k*i + 1.",
    keyPoints: [
      "Strict/Full Binary Tree: Every node has either 0 or 2 children.",
      "Complete Binary Tree: Filled on all levels except possibly the last, filled from left to right.",
      "Heapify cost to build a heap from an unordered array is O(n), NOT O(n log n)."
    ],
    importance: "CRITICAL",
    exampleTrap: "Confusing Full Binary Tree with Complete Binary Tree in GATE questions."
  },

  // 2. Theory of Computation
  {
    id: "toc-closure-table",
    subject: "Theory of Computation",
    topic: "Closure Properties",
    title: "Language Closure Properties Master Table",
    formula: "Operation | Regular | CFL | DCFL | CSL | Recursive | RE\\nUnion:         YES       YES    NO     YES    YES       YES\\nIntersection:  YES       NO     NO     YES    YES       YES\\nComplement:    YES       NO     YES    YES    YES       NO\\nConcatenation: YES       YES    NO     YES    YES       YES\\nKleene Star:   YES       YES    NO     YES    YES       YES\\nInter w/ Reg:  YES       YES    YES    YES    YES       YES",
    keyPoints: [
      "DCFL is closed under Complement, but NOT under Union or Intersection.",
      "CFL is NOT closed under Intersection or Complement, but CFL intersected with Regular IS ALWAYS CFL.",
      "RE is NOT closed under Complement (if L and L' are RE, both are Recursive)."
    ],
    importance: "CRITICAL",
    exampleTrap: "Assuming CFL is closed under intersection because CFL intersected with Regular is CFL."
  },
  {
    id: "toc-decidability-matrix",
    subject: "Theory of Computation",
    topic: "Decidability & Halting",
    title: "Decision Properties & Rice's Theorem",
    formula: "Problem | Regular | CFL | DCFL | Turing (RE)\\nMembership (w in L):     D       D       D         U (Semi-decidable)\\nEmptiness (L = phi):     D       D       D         U\\nFiniteness (|L| < inf):  D       D       D         U\\nEquivalence (L1 = L2):   D       U       D         U\\nRegularity (Is L Reg?):  D       U       U         U (Rice Theorem)",
    keyPoints: [
      "Rice's Theorem Part 1: Any non-trivial semantic property of RE languages is undecidable.",
      "Rice's Theorem Part 2: Non-trivial property is undecidable and recognizable iff property is monotonic and computable.",
      "Post Correspondence Problem (PCP) is undecidable for alphabet size >= 2; decidable for unary alphabet."
    ],
    importance: "CRITICAL",
    exampleTrap: "Applying Rice's theorem to syntactic properties (like 'Does TM have 5 states?') which are decidable."
  },

  // 3. Compiler Design
  {
    id: "cd-parsing-table-conflicts",
    subject: "Compiler Design",
    topic: "Syntax Analysis & Parsing",
    title: "Parser Power & Conflict Hierarchy",
    formula: "Expressive Power: LL(1) < SLR(1) < LALR(1) < LR(1)\\nConflict types:\\n- Shift-Reduce (SR): Parser cannot decide whether to shift next token or reduce with a rule.\\n- Reduce-Reduce (RR): Parser has multiple rules ready to reduce on the same lookahead.",
    keyPoints: [
      "LR(1) has more states than LALR(1); LALR(1) merges states with identical LR(0) cores.",
      "Merging states in LALR(1) NEVER introduces new Shift-Reduce conflicts, but CAN introduce Reduce-Reduce conflicts.",
      "SLR(1) places reduces only in FOLLOW(A); LR(1) places reduces strictly in lookahead set."
    ],
    importance: "CRITICAL",
    exampleTrap: "Claiming that LALR(1) state merging can create Shift-Reduce conflicts (it only ever creates Reduce-Reduce)."
  },
  {
    id: "cd-sdt-attributes",
    subject: "Compiler Design",
    topic: "Syntax-Directed Translation",
    title: "S-Attributed vs L-Attributed SDT",
    formula: "S-Attributed SDT: Uses only Synthesized attributes. Computed Bottom-Up during LR parsing (at reduction).\\nL-Attributed SDT: Allows Synthesized and Inherited attributes, but Inherited attributes can only depend on:\\n1. Attributes of left-side parent A\\n2. Attributes of siblings to the LEFT of X_j\\nEvaluated in Top-Down Depth-First Left-to-Right order.",
    keyPoints: [
      "Every S-attributed definition is also an L-attributed definition.",
      "L-attributed SDT can be evaluated in an LL(1) parser using embedded actions.",
      "In bottom-up parsing, actions inside the RHS are replaced with dummy marker non-terminals."
    ],
    importance: "HIGH",
    exampleTrap: "Allowing an inherited attribute to depend on a sibling to the RIGHT in an L-attributed grammar."
  },

  // 4. Operating Systems
  {
    id: "os-paging-emat",
    subject: "Operating Systems",
    topic: "Memory Management & Paging",
    title: "Effective Memory Access Time (EMAT) with TLB",
    formula: "Single-Level Paging with TLB:\\nEMAT = h * (t_tlb + t_m) + (1 - h) * (t_tlb + 2 * t_m)\\n\\nk-Level Paging with TLB:\\nEMAT = h * (t_tlb + t_m) + (1 - h) * (t_tlb + (k + 1) * t_m)\\n\\nPage Table Size = Number of Page Table Entries * Size of Entry\\nNumber of Entries = Virtual Address Space / Page Size",
    keyPoints: [
      "If TLB lookup and memory access happen concurrently (parallel): EMAT = h * max(t_tlb, t_m) + (1-h) * (t_tlb + 2*t_m).",
      "Virtual address is split into: [Page Number (p) | Offset (d)], where d = log2(Page Size).",
      "In multi-level paging, inner page tables must fit exactly within 1 page frame."
    ],
    importance: "CRITICAL",
    exampleTrap: "Forgetting the final access to actual physical data frame (hence (k + 1) memory accesses on a TLB miss)."
  },
  {
    id: "os-deadlock-bankers",
    subject: "Operating Systems",
    topic: "Deadlocks & Synchronization",
    title: "Deadlock Invariants & Banker's Safety",
    formula: "Deadlock Conditions (Coffman): Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.\\nMin Resources to prevent deadlock with N processes each needing max R resources:\\nTotal Resources >= N * (R - 1) + 1\\n\\nBanker's Algorithm: Need[i][j] = Max[i][j] - Allocation[i][j]\\nIf Request_i <= Need_i and Request_i <= Available, test Safety Algorithm.",
    keyPoints: [
      "Safe state != Deadlock-free forever, but guarantees an execution sequence that avoids deadlock.",
      "All deadlock states are unsafe, but NOT all unsafe states lead to deadlock.",
      "Resource Allocation Graph (RAG): If single instance of each resource type, Cycle <=> Deadlock. If multiple instances, Cycle is necessary but not sufficient."
    ],
    importance: "CRITICAL",
    exampleTrap: "Assuming a cycle in a multi-instance resource graph always guarantees deadlock."
  },

  // 5. Computer Organization & Architecture
  {
    id: "coa-cache-amat",
    subject: "Computer Organization and Architecture",
    topic: "Memory Hierarchy & Caching",
    title: "Average Memory Access Time (AMAT) & Cache Mapping",
    formula: "AMAT = Hit_Time + (Miss_Rate * Miss_Penalty)\\n\\nMulti-Level Cache AMAT:\\nAMAT = H1 + M1 * (H2 + M2 * MainMemoryTime)\\n\\nAddress Breakdown in k-way Set Associative:\\n- Word Offset (bits) = log2(Block Size in bytes)\\n- Set Index (bits) = log2(Number of Sets)\\n- Number of Sets = Cache Size / (k * Block Size)\\n- Tag bits = Physical Address bits - (Set Index + Word Offset)",
    keyPoints: [
      "Direct Mapped is 1-way Set Associative. Fully Associative has 1 set of all blocks (0 set index bits).",
      "Tag Directory Size = Number of Blocks * Tag Bits (plus valid/dirty bits).",
      "Write-Through uses write buffers; Write-Back uses dirty bit and updates memory only on replacement."
    ],
    importance: "CRITICAL",
    exampleTrap: "Forgetting that Number of Sets = Total Blocks / k, not Total Blocks * k."
  },
  {
    id: "coa-pipelining-speedup",
    subject: "Computer Organization and Architecture",
    topic: "Instruction Pipelining",
    title: "Pipeline Speedup & Clock Period",
    formula: "Ideal Speedup for n instructions in k-stage pipeline:\\nSpeedup S = (n * k * tau) / ((k + n - 1) * tau) -> k (as n -> inf)\\n\\nClock period tau = max(stage_delays) + buffer_delay\\n\\nActual CPI = Ideal CPI (1) + Stalls_per_instruction\\nThroughput = n / ((k + n - 1 + Stalls) * tau)",
    keyPoints: [
      "Branch penalty reduces throughput; solved via Branch Prediction, Delayed Branching.",
      "Data Hazards: RAW (True dependency), WAR (Anti-dependency), WAW (Output dependency).",
      "Operand Forwarding eliminates RAW hazard stall between EX-EX or MEM-EX stages."
    ],
    importance: "CRITICAL",
    exampleTrap: "Omitting the latch/buffer delay when computing the minimum pipeline clock cycle time."
  },

  // 6. Databases (DBMS)
  {
    id: "dbms-normal-forms",
    subject: "Databases",
    topic: "Normalization & Functional Dependencies",
    title: "Normal Forms Classification Rules",
    formula: "For every non-trivial functional dependency X -> Y in R:\\n- 1NF: Atomic domain values, no multivalued attributes.\\n- 2NF: In 1NF and NO Partial Dependency (No proper subset of candidate key determines non-prime attribute).\\n- 3NF: In 2NF and for every X -> Y: Either X is a Superkey OR Y is a Prime attribute.\\n- BCNF: For every X -> Y: X MUST be a Superkey.",
    keyPoints: [
      "Lossless Join Decomposition: R1 cap R2 must be a superkey for R1 or R2.",
      "Dependency Preservation: (F1 union F2)+ must cover F+.",
      "Decomposition into 3NF is ALWAYS lossless AND dependency preserving.",
      "Decomposition into BCNF is ALWAYS lossless, but MAY NOT be dependency preserving."
    ],
    importance: "CRITICAL",
    exampleTrap: "Checking if Y is a prime attribute for BCNF (Prime attribute clause only applies to 3NF, NOT BCNF)."
  },
  {
    id: "dbms-transactions-serializability",
    subject: "Databases",
    topic: "Transactions & Concurrency",
    title: "Conflict vs View Serializability & 2PL",
    formula: "Conflict Equivalent: Operations order preserved for conflicting operations (same item, different txns, at least one write).\\nConflict Serializable: Precedence Graph (Serialization Graph) is an ACYCLIC Directed Graph.\\nStrict 2PL: All Exclusive locks held until Commit/Abort => Guarantees Strict schedule (Cascadeless + Recoverable) and Conflict Serializability.",
    keyPoints: [
      "Conflict Serializable => View Serializable (Converse is not always true; Blind Writes can make a schedule view serializable without being conflict serializable).",
      "Checking View Serializability is NP-Complete; Checking Conflict Serializability is O(V + E) using cycle detection.",
      "Basic 2PL prevents conflict inconsistency but is NOT deadlock-free."
    ],
    importance: "HIGH",
    exampleTrap: "Believing Basic 2PL prevents deadlocks (it does not; deadlocks can still occur in growing phase)."
  },

  // 7. Computer Networks
  {
    id: "cn-sliding-window",
    subject: "Computer Networks",
    topic: "Data Link Layer & Flow Control",
    title: "Sliding Window Protocols & Efficiency",
    formula: "Parameter a = Propagation Delay / Transmission Delay = T_p / T_t\\nRound Trip Time RTT = 2 * T_p\\n\\nStop-and-Wait Efficiency: eta = 1 / (1 + 2*a)\\n\\nGo-Back-N (GBN):\\n- Sender Window W_s <= 2^k - 1 (or 1 + 2*a)\\n- Receiver Window W_r = 1\\n- Max Efficiency = W_s / (1 + 2*a)\\n\\nSelective Repeat (SR):\\n- Sender Window W_s <= 2^(k-1)\\n- Receiver Window W_r = W_s\\n- Max Efficiency = W_s / (1 + 2*a)",
    keyPoints: [
      "Transmission delay T_t = Packet Size (L) / Bandwidth (B).",
      "Propagation delay T_p = Distance (d) / Propagation Speed (v).",
      "CSMA/CD Minimum Frame Size: L_min = 2 * T_p * Bandwidth.",
      "Token Ring token holding time: T_t >= T_p + Token transmission time."
    ],
    importance: "CRITICAL",
    exampleTrap: "Using 2^k as the GBN sender window instead of 2^k - 1, causing sequence number ambiguity on loss."
  },
  {
    id: "cn-ip-fragmentation",
    subject: "Computer Networks",
    topic: "Network Layer & IPv4",
    title: "IPv4 Fragmentation & Subnetting Math",
    formula: "Fragment Offset = (Byte Number of first byte in fragment payload) / 8\\nMore Fragments (MF) = 1 for all fragments except the LAST fragment (MF = 0).\\nPayload size of all fragments (except last) must be a MULTIPLE OF 8 bytes.\\n\\nSubnetting:\\nNumber of Subnets = 2^(subnet_bits)\\nUsable Hosts per Subnet = 2^(host_bits) - 2 (Minus Network ID and Directed Broadcast)",
    keyPoints: [
      "Header Length field in IPv4 has a scale factor of 4 bytes (Value 5 means 5 * 4 = 20 bytes).",
      "Total Length field includes BOTH Header + Data in bytes (Max 65535).",
      "Subnet Mask /24 = 255.255.255.0. /27 = 255.255.255.224 (32 - 2 = 30 usable hosts)."
    ],
    importance: "CRITICAL",
    exampleTrap: "Forgetting to divide the byte start index by 8 when calculating the Fragment Offset field."
  },

  // 8. Digital Logic
  {
    id: "dl-boolean-kmaps",
    subject: "Digital Logic",
    topic: "Boolean Algebra & K-Maps",
    title: "Boolean Minimization & Number Systems",
    formula: "De Morgan's: (A + B)' = A' * B', (A * B)' = A' + B'\\nConsensus Theorem: AB + A'C + BC = AB + A'C\\n\\n2's Complement Range for n bits: [-2^(n-1), +2^(n-1) - 1]\\n1's Complement Range for n bits: [-(2^(n-1) - 1), +(2^(n-1) - 1)]\\nIEEE 754 Single Precision (32-bit): 1 sign bit, 8 exponent bits (bias 127), 23 fraction bits.\\nValue = (-1)^s * (1.M) * 2^(E - 127)",
    keyPoints: [
      "Dual of expression: Replace AND with OR, OR with AND, 0 with 1, 1 with 0 (do NOT invert variables).",
      "Essential Prime Implicant: Contains at least one minterm covered by NO other prime implicant.",
      "Static-1 Hazard: Output momentarily drops to 0 when transitioning between adjacent 1-cells in K-Map."
    ],
    importance: "HIGH",
    exampleTrap: "Confusing Duality with Complementation (Complementation inverts each literal, Duality does not)."
  },

  // 9. Discrete Mathematics & Graph Theory
  {
    id: "dm-graph-euler-planar",
    subject: "Discrete Mathematics",
    topic: "Graph Theory",
    title: "Graph Invariants, Handshaking & Planarity",
    formula: "Handshaking Lemma: sum(deg(v)) = 2 * |E|\\nIn any graph: The number of vertices of ODD degree is ALWAYS EVEN.\\n\\nEuler's Formula for Connected Planar Graphs: V - E + R = 2\\nPlanar Graph Bounds (V >= 3):\\n- E <= 3*V - 6\\n- If triangle-free (no C3, e.g. bipartite): E <= 2*V - 4\\n\\nKuratowski's Theorem: Graph is planar iff it contains no subgraph homeomorphic to K5 or K3,3.",
    keyPoints: [
      "Tree with n vertices has exactly n - 1 edges and is 2-colorable (bipartite).",
      "Eulerian Circuit exists iff connected and EVERY vertex has an EVEN degree.",
      "Hamiltonian Cycle: Finding is NP-Complete. Dirac's Theorem: If min_deg >= n/2 for n >= 3, then Hamiltonian."
    ],
    importance: "CRITICAL",
    exampleTrap: "Applying E <= 3V - 6 on a bipartite or cycle-free planar graph instead of the tighter E <= 2V - 4 bound."
  },
  {
    id: "dm-combinatorics-derangements",
    subject: "Discrete Mathematics",
    topic: "Combinatorics & Recurrence",
    title: "Combinatorics, Inclusions & Derangements",
    formula: "Number of Derangements D(n):\\nD(n) = n! * sum_{k=0}^n [ (-1)^k / k! ]\\nD(1)=0, D(2)=1, D(3)=2, D(4)=9, D(5)=44, D(6)=265\\n\\nRecurrence: D(n) = (n - 1) * [ D(n-1) + D(n-2) ]\\n\\nPigeonhole Principle: If n items put into k boxes, at least one box contains ceil(n/k) items.",
    keyPoints: [
      "Number of onto functions (surjections) from m elements to n elements: sum_{k=0}^n (-1)^k * C(n, k) * (n - k)^m.",
      "Number of non-negative integer solutions to x1 + x2 + ... + xk = n is C(n + k - 1, k - 1).",
      "Number of positive integer solutions (xi >= 1) is C(n - 1, k - 1)."
    ],
    importance: "CRITICAL",
    exampleTrap: "Using non-negative solution formula C(n+k-1, k-1) when positive solutions (xi >= 1) are required."
  },

  // 10. Engineering Mathematics
  {
    id: "em-linear-algebra-eigen",
    subject: "Engineering Mathematics",
    topic: "Linear Algebra",
    title: "Eigenvalues, Determinants & System AX = B",
    formula: "Trace of A = sum of main diagonal elements = sum of Eigenvalues (lambda_1 + ... + lambda_n)\\nDeterminant of A = product of Eigenvalues (lambda_1 * ... * lambda_n)\\nEigenvalues of A^k are lambda_i^k.\\nEigenvalues of A^(-1) are 1 / lambda_i.\\n\\nSystem AX = B (n variables):\\n- Unique Solution: Rank(A) = Rank([A|B]) = n\\n- Infinitely Many: Rank(A) = Rank([A|B]) < n\\n- No Solution (Inconsistent): Rank(A) < Rank([A|B])",
    keyPoints: [
      "Cayley-Hamilton Theorem: Every square matrix satisfies its own characteristic equation |A - lambda*I| = 0.",
      "Symmetric matrix: All eigenvalues are REAL, and eigenvectors from distinct eigenvalues are ORTHOGONAL.",
      "Skew-symmetric matrix: All eigenvalues are either ZERO or PURELY IMAGINARY."
    ],
    importance: "CRITICAL",
    exampleTrap: "Calculating the full characteristic polynomial determinant when sum/product of eigenvalues is sufficient."
  },
  {
    id: "em-probability-distributions",
    subject: "Engineering Mathematics",
    topic: "Probability & Statistics",
    title: "Probability Distributions & Bayes' Theorem",
    formula: "Bayes' Theorem: P(A|B) = [ P(B|A) * P(A) ] / P(B)\\n\\nPoisson Distribution: P(X = k) = (lambda^k * e^(-lambda)) / k!\\n- Mean = lambda, Variance = lambda\\n\\nExponential Distribution: f(x) = lambda * e^(-lambda*x) for x >= 0\\n- Mean = 1 / lambda, Variance = 1 / lambda^2\\n- Memoryless Property: P(X > s + t | X > s) = P(X > t)\\n\\nBinomial Distribution: P(X = k) = C(n, k) * p^k * (1-p)^(n-k)\\n- Mean = n*p, Variance = n*p*(1-p)",
    keyPoints: [
      "Normal Distribution: Standard normal Z = (X - mu) / sigma.",
      "Expectation E[aX + bY] = a*E[X] + b*E[Y] ALWAYS (independence not required).",
      "Variance Var(X + Y) = Var(X) + Var(Y) + 2*Cov(X, Y). If independent, Var(X + Y) = Var(X) + Var(Y)."
    ],
    importance: "CRITICAL",
    exampleTrap: "Assuming Var(X + Y) = Var(X) + Var(Y) when variables are not independent."
  }
];
