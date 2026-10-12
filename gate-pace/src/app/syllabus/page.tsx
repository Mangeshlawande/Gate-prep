'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  ExternalLink,
  Layers,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SUBJECT_WEIGHTAGE_DATA } from '@/data/gate2027Info';

const OFFICIAL_SECTIONS = [
  {
    sectionNumber: "General Aptitude",
    title: "General Aptitude (GA)",
    marks: "15 Marks (10 Questions)",
    subsections: [
      { name: "Verbal Aptitude", topics: "Basic English grammar (tenses, articles, adjectives, prepositions, conjunctions, verb-noun agreement); Vocabulary (words, idioms, phrases in context); Reading comprehension; Narrative sequencing." },
      { name: "Quantitative Aptitude", topics: "Data interpretation (data graphs, bar graphs, pie charts, tables); Numerical computation and estimation (ratios, percentages, powers, exponents, logarithms, permutations & combinations, series); Mensuration, geometry, elementary statistics and probability." },
      { name: "Analytical Aptitude", topics: "Logic: deduction and induction, Analogy, Numerical relations and reasoning." },
      { name: "Spatial Aptitude", topics: "Transformation of shapes: translation, rotation, scaling, mirroring, assembling, and grouping paper folding, cutting, patterns in 2D and 3D." }
    ],
    standardBook: "R.S. Aggarwal / Past GATE official papers"
  },
  {
    sectionNumber: "Section 1",
    title: "Engineering Mathematics",
    marks: "13 Marks (~9-10 Questions)",
    subsections: [
      { name: "Discrete Mathematics", topics: "Propositional and first order logic. Sets, relations, functions, partial orders and lattices. Monoids, Groups. Graphs: connectivity, matching, colouring. Combinatorics: counting, recurrence relations, generating functions." },
      { name: "Linear Algebra", topics: "Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition." },
      { name: "Calculus", topics: "Limits, continuity and differentiability, Maxima and minima, Mean value theorem, Integration." },
      { name: "Probability and Statistics", topics: "Random variables, Uniform, normal, exponential, Poisson and binomial distributions. Mean, median, mode and standard deviation. Conditional probability and Bayes theorem." }
    ],
    standardBook: "Kenneth H. Rosen & Erwin Kreyszig"
  },
  {
    sectionNumber: "Section 2",
    title: "Digital Logic",
    marks: "4 – 6 Marks",
    subsections: [
      { name: "Boolean Algebra & Circuits", topics: "Boolean algebra and minimization – algebraic technique, Karnaugh map, tabular method. Design of combinational and sequential circuits. Number representation and arithmetic (fixed and floating point)." }
    ],
    standardBook: "M. Morris Mano"
  },
  {
    sectionNumber: "Section 3",
    title: "Computer Organization and Architecture",
    marks: "8 – 10 Marks",
    subsections: [
      { name: "Architecture & Memory", topics: "Instruction set and addressing modes. Design of arithmetic and logic unit (ALU). Design of control unit – hardwired and microprogrammed. Memory interfacing and hierarchy: performance, cache memory mapping. I/O interface (interrupt and DMA). Instruction pipelining, pipeline hazards." }
    ],
    standardBook: "Carl Hamacher / Hennessy & Patterson"
  },
  {
    sectionNumber: "Section 4",
    title: "Programming and Data Structures",
    marks: "10 – 12 Marks",
    subsections: [
      { name: "Programming in C & DS", topics: "Programming in C. Recursion. Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs." }
    ],
    standardBook: "Kernighan & Ritchie (C) and Mark Allen Weiss (DS)"
  },
  {
    sectionNumber: "Section 5",
    title: "Algorithms",
    marks: "8 – 10 Marks",
    subsections: [
      { name: "Algorithms & Analysis", topics: "Searching, sorting, hashing. Asymptotic worst case time and space complexity. Algorithm design techniques: greedy, dynamic programming and divide-and-conquer. Graph traversals, minimum spanning trees, shortest paths." }
    ],
    standardBook: "CLRS (Introduction to Algorithms)"
  },
  {
    sectionNumber: "Section 6",
    title: "Theory of Computation",
    marks: "8 – 10 Marks",
    subsections: [
      { name: "Automata & Decidability", topics: "Regular expressions and finite automata. Context-free grammars and push-down automata. Regular and context-free languages, pumping lemma. Turing machines and undecidability." }
    ],
    standardBook: "Peter Linz / Michael Sipser"
  },
  {
    sectionNumber: "Section 7",
    title: "Compiler Design",
    marks: "4 – 5 Marks",
    subsections: [
      { name: "Compilers & Parsers", topics: "Lexical analysis, parsing, syntax-directed translation. Runtime environments. Intermediate code generation. Local optimisation, Data flow analyses: constant propagation, liveness analysis, common sub expression elimination." }
    ],
    standardBook: "Aho, Lam, Sethi, Ullman (Dragon Book)"
  },
  {
    sectionNumber: "Section 8",
    title: "Operating System",
    marks: "8 – 10 Marks",
    subsections: [
      { name: "OS & Memory Management", topics: "System calls, processes, threads, inter-process communication, concurrency and synchronization. Deadlock. CPU and I/O scheduling. Memory management and virtual memory. File systems." }
    ],
    standardBook: "Silberschatz, Galvin, Gagne"
  },
  {
    sectionNumber: "Section 9",
    title: "Databases",
    marks: "7 – 8 Marks",
    subsections: [
      { name: "Relational DBMS & SQL", topics: "ER-model. Relational model: relational algebra, tuple calculus, SQL. Integrity constraints, normal forms. File organization, indexing (e.g., B and B+ trees). Transactions and concurrency control." }
    ],
    standardBook: "Silberschatz, Korth, Sudarshan"
  },
  {
    sectionNumber: "Section 10",
    title: "Computer Networks",
    marks: "7 – 9 Marks",
    subsections: [
      { name: "Networks & Protocols", topics: "Principles of Layering; Basics of switching (circuit, packet and virtual circuit) and performance metrics; Data link layer: error detection, Medium Access Control, Ethernet; Distance vector and link state routing; IPv4 - Fragmentation, CIDR Notation, Network Address Translation; TCP- flow control and congestion control, socket API; DNS and HTTP." }
    ],
    standardBook: "Kurose & Ross / Andrew S. Tanenbaum"
  }
];

export default function SyllabusPage() {
  const [search, setSearch] = useState('');

  const filteredSections = OFFICIAL_SECTIONS.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.sectionNumber.toLowerCase().includes(q) ||
      s.subsections.some((sub) => sub.name.toLowerCase().includes(q) || sub.topics.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 pb-24 md:pb-10">
        {/* Header Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-cyan-900/40 via-slate-900 to-zinc-950 border border-cyan-800/50 p-5 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-600/60 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> OFFICIAL GATE 2027 SYLLABUS DIRECTORY
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Official GATE 2027 Computer Science & IT Syllabus
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 font-mono">
              Organized by IIT Madras across Section 1 through Section 10 and General Aptitude. Includes expected marks distribution and standard textbook guides.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-lg">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search topics, algorithms, theorems (e.g. Master Theorem, B+ Trees, Paging)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-cyan-500 shadow-sm"
          />
        </div>

        {/* Sections List */}
        <div className="space-y-5 sm:space-y-6">
          {filteredSections.map((sec) => (
            <div
              key={sec.sectionNumber}
              className="rounded-2xl p-4 sm:p-6 bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-zinc-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 shrink-0">
                    {sec.sectionNumber}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {sec.title}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                    {sec.marks}
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-[11px] sm:text-xs">
                    Ref: {sec.standardBook}
                  </span>
                </div>
              </div>

              {/* Subsections & Official Topics */}
              <div className="space-y-2.5 sm:space-y-3">
                {sec.subsections.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 space-y-1"
                  >
                    <h3 className="text-xs font-bold font-mono text-cyan-700 dark:text-cyan-400">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed">
                      {sub.topics}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
                <a
                  href={`https://gateoverflow.in/search?q=${encodeURIComponent(sec.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  <span>Solve Past PYQs on GateOverflow</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <Link
                  href="/tasks"
                  className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
                >
                  <span>Track in 90-Day Schedule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
