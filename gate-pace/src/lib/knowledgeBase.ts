// Knowledge Base Seeder: Ingests GATE Curriculum, High-Yield Formulas, Textbooks, and PYQs into Vector DB and Graph DB
import { globalVectorDb, VectorDocument } from './vectorDb';
import { globalGraphDb, GraphNode, GraphEdge } from './graphDb';
import { FORMULA_DECK } from '@/data/formulaDeck';
import { GATE_RESOURCES } from '@/data/resources';
import { SUBJECT_WEIGHTAGE_DATA, HIGH_YIELD_QA_SAMPLES } from '@/data/gate2027Info';
import { GATE_90_DAYS_CURRICULUM } from '@/data/curriculum';

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

// High-Yield Topic Entities with Explicit Prerequisite Trees
export interface TopicDefinition {
  id: string;
  subjectId: string;
  subjectName: string;
  name: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Very High';
  expectedMarks: number;
  prerequisites: string[]; // Topic IDs this topic depends on
  description: string;
  commonTrap: string;
  tags: string[];
}

export const CORE_TOPICS: TopicDefinition[] = [
  // Discrete Math
  {
    id: 'topic-prop-logic',
    subjectId: 'subj-math',
    subjectName: 'Engineering Mathematics',
    name: 'Propositional Logic & Tautologies',
    difficulty: 'Moderate',
    expectedMarks: 2,
    prerequisites: [],
    description: 'Truth tables, logical connectives, conditionals, contrapositive, tautologies, contradictions, resolution.',
    commonTrap: 'Confusing p -> q with its converse q -> p. Remember p -> q is logically equivalent to ~p v q and ~q -> ~p.',
    tags: ['Discrete Math', 'Logic', 'Truth Tables', 'Inference']
  },
  {
    id: 'topic-fol',
    subjectId: 'subj-math',
    subjectName: 'Engineering Mathematics',
    name: 'First Order Predicate Logic & Quantifiers',
    difficulty: 'Hard',
    expectedMarks: 3,
    prerequisites: ['topic-prop-logic'],
    description: 'Universal and existential quantifiers, scope of quantifiers, negation of quantified statements, validity.',
    commonTrap: 'Negating "For all x, P(x) -> Q(x)": correct negation is "There exists x, P(x) ^ ~Q(x)", NOT "For all x, ~P(x)".',
    tags: ['Discrete Math', 'Predicates', 'Quantifiers']
  },
  {
    id: 'topic-graph-theory',
    subjectId: 'subj-math',
    subjectName: 'Engineering Mathematics',
    name: 'Graph Theory & Planarity',
    difficulty: 'Hard',
    expectedMarks: 3,
    prerequisites: ['topic-prop-logic'],
    description: 'Connectivity, bipartite graphs, planar graphs, Euler formula V - E + R = 2, Kuratowski theorem, graph coloring.',
    commonTrap: 'Applying E <= 3V - 6 on bipartite graphs: bipartite graphs have no triangles, so minimum cycle length is 4 => E <= 2V - 4.',
    tags: ['Discrete Math', 'Graphs', 'Planarity', 'Bipartite']
  },
  {
    id: 'topic-probability',
    subjectId: 'subj-math',
    subjectName: 'Engineering Mathematics',
    name: 'Conditional Probability & Bayes Theorem',
    difficulty: 'Moderate',
    expectedMarks: 3,
    prerequisites: [],
    description: 'Bayes Theorem, law of total probability, independent events, discrete random variables, Poisson & exponential distributions.',
    commonTrap: 'Assuming independence when events are only conditionally independent or mutually exclusive.',
    tags: ['Math', 'Probability', 'Bayes Theorem', 'Distributions']
  },

  // Algorithms & DS
  {
    id: 'topic-asymptotics',
    subjectId: 'subj-algo',
    subjectName: 'Algorithms',
    name: 'Asymptotic Analysis & Recurrences',
    difficulty: 'Moderate',
    expectedMarks: 2,
    prerequisites: [],
    description: 'Big-O, Big-Omega, Big-Theta notation, Master Theorem, Akra-Bazzi method, recursion tree derivations.',
    commonTrap: 'Applying Master Theorem when f(n) is not polynomial (e.g., T(n) = 2T(n/2) + n/log n). Standard Master theorem does not apply here!',
    tags: ['Algorithms', 'Master Theorem', 'Recurrences', 'Complexity']
  },
  {
    id: 'topic-sorting-searching',
    subjectId: 'subj-algo',
    subjectName: 'Algorithms',
    name: 'Sorting Algorithms & Lower Bounds',
    difficulty: 'Moderate',
    expectedMarks: 2,
    prerequisites: ['topic-asymptotics'],
    description: 'Comparison sort lower bound Omega(n log n), QuickSort worst vs average, MergeSort stability, HeapSort, Counting Sort.',
    commonTrap: 'QuickSort worst case occurs when array is already sorted or reverse sorted with naive pivot, degrading to O(n^2).',
    tags: ['Algorithms', 'Sorting', 'HeapSort', 'QuickSort']
  },
  {
    id: 'topic-graph-algo',
    subjectId: 'subj-algo',
    subjectName: 'Algorithms',
    name: 'Graph Algorithms: Shortest Paths & MST',
    difficulty: 'Hard',
    expectedMarks: 3,
    prerequisites: ['topic-asymptotics', 'topic-graph-theory'],
    description: "BFS/DFS, Topological Sort, Dijkstra's algorithm, Bellman-Ford, Kruskal's & Prim's algorithms, cut property.",
    commonTrap: "Running Dijkstra's algorithm on graphs with negative edge weights. Dijkstra fails; Bellman-Ford must be used.",
    tags: ['Algorithms', 'Dijkstra', 'MST', 'Bellman-Ford', 'Graphs']
  },
  {
    id: 'topic-dp',
    subjectId: 'subj-algo',
    subjectName: 'Algorithms',
    name: 'Dynamic Programming & Greedy Strategies',
    difficulty: 'Hard',
    expectedMarks: 3,
    prerequisites: ['topic-asymptotics'],
    description: 'Optimal substructure, overlapping subproblems, 0/1 Knapsack, LCS, Matrix Chain Multiplication, Huffman Coding.',
    commonTrap: 'Applying greedy strategy to 0/1 Knapsack: greedy only works for Fractional Knapsack!',
    tags: ['Algorithms', 'Dynamic Programming', 'Knapsack', 'LCS']
  },

  // Theory of Computation
  {
    id: 'topic-dfa-nfa',
    subjectId: 'subj-toc',
    subjectName: 'Theory of Computation',
    name: 'Finite Automata & Regular Languages',
    difficulty: 'Moderate',
    expectedMarks: 3,
    prerequisites: [],
    description: 'DFA, NFA, epsilon-NFA, regular expressions, Myhill-Nerode theorem, DFA state minimization table-filling algorithm.',
    commonTrap: 'Counting states in NFA vs DFA: 2^n subset construction can cause exponential explosion for certain patterns.',
    tags: ['TOC', 'DFA', 'NFA', 'Regular Languages', 'Minimization']
  },
  {
    id: 'topic-cfg-pda',
    subjectId: 'subj-toc',
    subjectName: 'Theory of Computation',
    name: 'Context-Free Grammars & Pushdown Automata',
    difficulty: 'Hard',
    expectedMarks: 3,
    prerequisites: ['topic-dfa-nfa'],
    description: 'Ambiguity in CFGs, Chomsky Normal Form, DPDA vs NPDA, closure properties of CFLs and DCFLs.',
    commonTrap: 'Assuming CFL is closed under intersection or complement: CFL is NOT closed under intersection or complement! DCFL is closed under complement.',
    tags: ['TOC', 'CFG', 'PDA', 'Closure Properties']
  },
  {
    id: 'topic-turing-decidability',
    subjectId: 'subj-toc',
    subjectName: 'Theory of Computation',
    name: 'Turing Machines, Decidability & Halting Problem',
    difficulty: 'Very High',
    expectedMarks: 3,
    prerequisites: ['topic-cfg-pda'],
    description: "Recursive vs recursively enumerable languages, Halting problem, Rice's theorem, reductions.",
    commonTrap: "Applying Rice's Theorem to non-trivial properties of Turing Machine encodings (syntax) instead of the recognized language (semantics).",
    tags: ['TOC', 'Turing Machines', 'Decidability', 'Halting Problem']
  },

  // Operating Systems
  {
    id: 'topic-process-sync',
    subjectId: 'subj-os',
    subjectName: 'Operating Systems',
    name: 'Process Synchronization & Semaphores',
    difficulty: 'Hard',
    expectedMarks: 3,
    prerequisites: [],
    description: 'Critical section problem, Peterson algorithm, counting & binary semaphores, Producer-Consumer, Readers-Writers.',
    commonTrap: 'Inverting wait() and signal() calls causing deadlock or mutual exclusion violation.',
    tags: ['Operating Systems', 'Concurrency', 'Semaphores', 'Deadlock']
  },
  {
    id: 'topic-deadlocks',
    subjectId: 'subj-os',
    subjectName: 'Operating Systems',
    name: "Deadlocks & Banker's Algorithm",
    difficulty: 'Moderate',
    expectedMarks: 2,
    prerequisites: ['topic-process-sync'],
    description: "4 Necessary conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait), Banker's Safety Algorithm, Resource Allocation Graph.",
    commonTrap: 'Unsafe state does NOT mean deadlock has occurred; it means system cannot guarantee avoidance of deadlock.',
    tags: ['Operating Systems', 'Deadlock', 'Bankers Algorithm']
  },
  {
    id: 'topic-paging-tlb',
    subjectId: 'subj-os',
    subjectName: 'Operating Systems',
    name: 'Virtual Memory, Multi-Level Paging & TLB',
    difficulty: 'Very High',
    expectedMarks: 4,
    prerequisites: [],
    description: 'Page tables, multi-level hierarchical paging, TLB hit/miss ratio, Effective Memory Access Time (EMAT), Inverted Page Tables.',
    commonTrap: 'In multi-level paging with k levels: on TLB miss, access takes (k + 1) * t_memory, NOT just 2 * t_memory!',
    tags: ['Operating Systems', 'Paging', 'TLB', 'Virtual Memory', 'EMAT']
  },

  // Computer Organization & Architecture
  {
    id: 'topic-cache-memory',
    subjectId: 'subj-coa',
    subjectName: 'Computer Organization & Architecture',
    name: 'Cache Memory Mapping & Performance',
    difficulty: 'Very High',
    expectedMarks: 4,
    prerequisites: [],
    description: 'Direct mapped, set-associative, fully associative, tag bits calculation, cache hit time, average memory access time.',
    commonTrap: 'Forgetting byte addressing vs word addressing when calculating block offset bits. If 32-bit words are addressed, divide byte size by 4!',
    tags: ['COA', 'Cache', 'Set Associative', 'Tag Bits', 'Memory Hierarchy']
  },
  {
    id: 'topic-pipelining',
    subjectId: 'subj-coa',
    subjectName: 'Computer Organization & Architecture',
    name: 'Instruction Pipelining & Hazards',
    difficulty: 'Hard',
    expectedMarks: 3,
    prerequisites: [],
    description: 'Speedup ratio, pipeline stages, structural hazards, data hazards (RAW, WAR, WAW), branch hazards, operand forwarding.',
    commonTrap: 'Pipeline clock cycle time is determined by the slowest stage PLUS intermediate register delay: Clock = max(stage_delays) + reg_delay.',
    tags: ['COA', 'Pipelining', 'Hazards', 'Speedup']
  },

  // Computer Networks
  {
    id: 'topic-ip-fragmentation',
    subjectId: 'subj-cn',
    subjectName: 'Computer Networks',
    name: 'IPv4 Addressing, Subnetting & Fragmentation',
    difficulty: 'Hard',
    expectedMarks: 3,
    prerequisites: [],
    description: 'CIDR subnet masks, routing table longest prefix match, MTU, fragment offset calculation, More Fragments (MF) flag.',
    commonTrap: 'Fragment Offset field represents 8-byte units: Fragment Offset = Byte Offset / 8. Always divide byte count by 8!',
    tags: ['Computer Networks', 'IPv4', 'Subnetting', 'Fragmentation', 'CIDR']
  },
  {
    id: 'topic-tcp-congestion',
    subjectId: 'subj-cn',
    subjectName: 'Computer Networks',
    name: 'TCP Flow Control & Congestion Control',
    difficulty: 'Hard',
    expectedMarks: 3,
    prerequisites: [],
    description: 'Slow Start, Congestion Avoidance, AIMD, Fast Retransmit, Fast Recovery, Tahoe vs Reno, advertised window.',
    commonTrap: 'After 3 duplicate ACKs (Reno): ssthresh = cwnd / 2, and cwnd starts at ssthresh + 3 (Fast Recovery), NOT 1 MSS (which is timeout)!',
    tags: ['Computer Networks', 'TCP', 'Congestion Control', 'Flow Control']
  },

  // Databases
  {
    id: 'topic-normal-forms',
    subjectId: 'subj-dbms',
    subjectName: 'Databases (DBMS)',
    name: 'Functional Dependencies & Normal Forms (3NF, BCNF)',
    difficulty: 'Very High',
    expectedMarks: 4,
    prerequisites: [],
    description: "Attribute closure, minimal cover, candidate keys, 1NF, 2NF, 3NF (LHS is superkey OR RHS is prime), BCNF, lossless join, dependency preservation.",
    commonTrap: "Assuming decomposition into BCNF always preserves functional dependencies: BCNF is NOT always dependency preserving! 3NF is always both lossless and dependency preserving.",
    tags: ['DBMS', 'Normalization', 'BCNF', '3NF', 'Functional Dependencies']
  },
  {
    id: 'topic-transactions',
    subjectId: 'subj-dbms',
    subjectName: 'Databases (DBMS)',
    name: 'Transactions, Serializability & Concurrency Control',
    difficulty: 'Hard',
    expectedMarks: 3,
    prerequisites: ['topic-normal-forms'],
    description: 'Conflict serializability precedence graph, view serializability, 2PL (Strict & Rigorous), timestamp ordering, deadlocks in DBMS.',
    commonTrap: 'Strict 2PL prevents cascading rollbacks and guarantees conflict serializability, but it does NOT prevent deadlocks!',
    tags: ['DBMS', 'Transactions', 'Serializability', '2PL', 'Concurrency']
  }
];

let isInitialized = false;

/**
 * Ingest all curriculum, formula deck, resources, topics, and PYQs into Vector DB and Graph DB
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

  // Clear if forced
  if (force) {
    globalVectorDb.clear();
    globalGraphDb.importState(JSON.stringify({ nodes: [], edges: [] }));
  }

  // Only ingest if empty
  const needIngest = globalVectorDb.count() === 0 || globalGraphDb.getAllNodes().length === 0;
  if (!needIngest && !force) {
    isInitialized = true;
    return {
      vectorCount: globalVectorDb.count(),
      nodeCount: globalGraphDb.getAllNodes().length,
      edgeCount: globalGraphDb.getAllEdges().length
    };
  }

  // 1. Ingest Subjects as Graph Nodes
  for (const s of CORE_GATE_SUBJECTS) {
    globalGraphDb.addNode({
      id: s.id,
      label: 'Subject',
      name: s.name,
      properties: {
        expectedMarks: s.expectedMarks,
        book: s.book,
        description: `GATE CS Subject: ${s.name} (~${s.expectedMarks} Marks expected). Recommended standard text: ${s.book}.`
      }
    });

    // Also index in Vector DB
    globalVectorDb.insert({
      id: `vec-${s.id}`,
      title: `${s.name} (GATE Subject Overview)`,
      content: `Subject: ${s.name}. Expected marks in GATE: ~${s.expectedMarks} Marks. Reference Standard Textbook: ${s.book}. Covers complete official syllabus according to IIT Madras guidelines.`,
      category: 'topic',
      metadata: {
        subject: s.name,
        expectedMarks: s.expectedMarks
      }
    });
  }

  // 2. Ingest Topics as Graph Nodes & Edges
  for (const t of CORE_TOPICS) {
    globalGraphDb.addNode({
      id: t.id,
      label: 'Topic',
      name: t.name,
      properties: {
        subject: t.subjectName,
        difficulty: t.difficulty,
        expectedMarks: t.expectedMarks,
        description: t.description,
        examTrap: t.commonTrap,
        tags: t.tags
      }
    });

    // Subtopic edge to subject
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

    // Ingest into Vector DB
    globalVectorDb.insert({
      id: `vec-${t.id}`,
      title: `${t.name} (${t.subjectName})`,
      content: `${t.name} in ${t.subjectName}. Difficulty: ${t.difficulty}. Weightage: ~${t.expectedMarks} Marks. Core syllabus concepts: ${t.description}. Exam Pitfall / Trap: ${t.commonTrap}. Tags: ${t.tags.join(', ')}.`,
      category: 'topic',
      metadata: {
        subject: t.subjectName,
        difficulty: t.difficulty,
        expectedMarks: t.expectedMarks,
        trapWarning: t.commonTrap,
        tags: t.tags
      }
    });
  }

  // 3. Ingest Formulas from FORMULA_DECK
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
        description: `Formula for ${f.title}: ${f.formula}. Key derivation points: ${f.keyPoints.join('; ')}. Trap: ${f.exampleTrap}`
      }
    });

    // Find matching topic node
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

    // Ingest formula into Vector DB
    globalVectorDb.insert({
      id: `vec-formula-${f.id}`,
      title: `Formula: ${f.title} (${f.subject})`,
      content: `Formula & Derivation for ${f.title} (${f.subject} - ${f.topic}). Formula: ${f.formula}. Key points: ${f.keyPoints.join(' ')}. Common mistake / exam trap: ${f.exampleTrap}. Importance: ${f.importance}.`,
      category: 'formula',
      metadata: {
        subject: f.subject,
        importance: f.importance,
        trapWarning: f.exampleTrap
      }
    });
  }

  // 4. Ingest Curated Resources from GATE_RESOURCES
  for (const r of GATE_RESOURCES) {
    const rNodeId = `res-${r.id}`;
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

    // Link resource to matching subject
    const matchingSubject = CORE_GATE_SUBJECTS.find(
      (s) => r.subject.toLowerCase().includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(r.subject.toLowerCase())
    );
    if (matchingSubject) {
      globalGraphDb.addEdge({
        id: `edge-res-${matchingSubject.id}-${r.id}`,
        source: rNodeId,
        target: matchingSubject.id,
        type: 'RECOMMENDED_FOR'
      });
    }

    // Ingest into Vector DB
    globalVectorDb.insert({
      id: `vec-res-${r.id}`,
      title: `${r.title} (${r.category})`,
      content: `Resource: ${r.title}. Category: ${r.category}. Subject: ${r.subject}. Link: ${r.url}. Description: ${r.description}. Useful for: ${r.tags.join(', ')}.`,
      category: 'resource',
      metadata: {
        subject: r.subject,
        url: r.url,
        tags: r.tags,
        category: r.category
      }
    });
  }

  // 5. Ingest Solved High-Yield PYQs from HIGH_YIELD_QA_SAMPLES
  for (const q of HIGH_YIELD_QA_SAMPLES) {
    const qNodeId = `pyq-${q.id}`;
    globalGraphDb.addNode({
      id: qNodeId,
      label: 'Problem',
      name: `Q#${q.id}: ${q.topic} (${q.questionType} - ${q.marks}M)`,
      properties: {
        subject: q.subject,
        topic: q.topic,
        questionType: q.questionType,
        marks: q.marks,
        description: q.questionText,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        examTrap: q.examTrap
      }
    });

    // Link problem to topic
    const matchingTopic = CORE_TOPICS.find((t) => t.subjectName === q.subject || q.topic.includes(t.name));
    if (matchingTopic) {
      globalGraphDb.addEdge({
        id: `edge-pyq-${matchingTopic.id}-${q.id}`,
        source: qNodeId,
        target: matchingTopic.id,
        type: 'TESTED_IN'
      });
    }

    // Ingest into Vector DB
    globalVectorDb.insert({
      id: `vec-pyq-${q.id}`,
      title: `Solved Problem: ${q.topic} (${q.subject} ${q.questionType})`,
      content: `Question: ${q.questionText} Options: ${(q.options || []).join(' | ')}. Correct Answer: ${q.correctAnswer}. Detailed Step-by-Step Explanation: ${q.explanation}. Memory Trap: ${q.examTrap}.`,
      category: 'problem',
      metadata: {
        subject: q.subject,
        difficulty: q.marks === 2 ? 'Hard' : 'Moderate',
        trapWarning: q.examTrap
      }
    });
  }

  // 6. Ingest Sample 90-Day Curriculum Blocks (First 15 High-Yield Days)
  const curriculumSample = GATE_90_DAYS_CURRICULUM.slice(0, 20);
  for (const c of curriculumSample) {
    globalVectorDb.insert({
      id: `vec-curr-day-${c.dayNumber}`,
      title: `Day ${c.dayNumber}: ${c.subject} (${c.phaseName})`,
      content: `Day ${c.dayNumber} Curriculum Plan. Phase: ${c.phaseName}. Subject: ${c.subject}. Morning Technical Focus: ${c.techFocus}. Evening Aptitude & Drill Focus: ${c.eveningFocus}. Recommended Tasks: ${c.suggestedTasks.join('; ')}.`,
      category: 'curriculum',
      metadata: {
        subject: c.subject,
        dayNumber: c.dayNumber
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
