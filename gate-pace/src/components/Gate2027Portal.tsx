'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GATE_2027_EXAM_OVERVIEW,
  SUBJECT_WEIGHTAGE_DATA,
  HIGH_YIELD_QA_SAMPLES,
  GateQA
} from '@/data/gate2027Info';
import {
  BookOpen,
  Calendar,
  CheckSquare,
  BarChart2,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  AlertTriangle,
  Lightbulb,
  FileText,
  Clock,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Gate2027Portal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('ALL');
  const [expandedQA, setExpandedQA] = useState<Record<string, boolean>>({ 'qa-1': true });

  const toggleQA = (id: string) => {
    setExpandedQA((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered Subject Weightage
  const filteredWeightage = SUBJECT_WEIGHTAGE_DATA.filter((s) => {
    if (selectedSubjectFilter !== 'ALL' && s.subject !== selectedSubjectFilter) return false;
    if (!searchTerm) return true;
    return (
      s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.highYieldTopics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      s.referenceBook.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Filtered Questions & Answers
  const filteredQA = HIGH_YIELD_QA_SAMPLES.filter((qa) => {
    if (selectedSubjectFilter !== 'ALL' && qa.subject !== selectedSubjectFilter) return false;
    if (!searchTerm) return true;
    return (
      qa.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qa.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qa.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qa.explanation.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const subjectList = ['ALL', ...Array.from(new Set(SUBJECT_WEIGHTAGE_DATA.map((s) => s.subject)))];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner: GATE 2027 Central Intelligence */}
      <div className="rounded-3xl bg-gradient-to-br from-cyan-900/30 via-slate-900 to-zinc-950 border border-cyan-800/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-600/60 text-cyan-300 text-xs font-mono font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            OFFICIAL GATE 2027 PORTAL • ORGANIZING INSTITUTE: IIT MADRAS
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            GATE 2027 Computer Science & IT — Blueprint & Master Center
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-mono leading-relaxed max-w-3xl">
            Complete syllabus breakdown, topic-wise expected weightages, examination marking architecture,
            and high-frequency question traps designed for Top 250 PSU rankers.
          </p>

          {/* Quick Page Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/syllabus"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-mono font-bold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <BookOpen className="w-4 h-4" />
              Detailed Syllabus Page
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/tasks"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono font-bold text-xs transition-all"
            >
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              Daily 3-Block Tasks
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono font-bold text-xs transition-all"
            >
              <BarChart2 className="w-4 h-4 text-purple-400" />
              Monitoring Dashboard
            </Link>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-zinc-800/80 relative z-10 text-xs font-mono">
          <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <span className="text-zinc-400 block text-[11px]">Total Marks & Questions</span>
            <span className="text-base sm:text-lg font-bold text-cyan-400">100 Marks / 65 Qs</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <span className="text-zinc-400 block text-[11px]">Exam Duration</span>
            <span className="text-base sm:text-lg font-bold text-emerald-400">180 Mins (3.0 Hrs)</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <span className="text-zinc-400 block text-[11px]">Examination Dates</span>
            <span className="text-base sm:text-lg font-bold text-amber-400">Feb 6–21, 2027</span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <span className="text-zinc-400 block text-[11px]">Scorecard Validity</span>
            <span className="text-base sm:text-lg font-bold text-purple-400">3 Years (2027–2030)</span>
          </div>
        </div>
      </div>

      {/* Global Interactive Search Bar */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search any GATE topic (e.g. Master Theorem, EMAT, DFA Minimization, IP Fragmentation, Cache)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Internet Search Quick Triggers */}
        {searchTerm.trim() && (
          <div className="flex items-center gap-2 self-end sm:self-center">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(`GATE CS ${searchTerm}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 text-xs font-mono font-semibold hover:bg-cyan-200 transition-colors"
            >
              <span>Search Web</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={`https://gateoverflow.in/search?q=${encodeURIComponent(searchTerm)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-mono font-semibold hover:bg-emerald-200 transition-colors"
            >
              <span>GateOverflow</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* Section 1: Question Pattern & Marking Scheme */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-zinc-800 pb-3">
          <Layers className="w-5 h-5 text-cyan-500" />
          <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
            1. Pattern of Examination & Marking Taxonomy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GATE_2027_EXAM_OVERVIEW.questionTypes.map((qType) => (
            <div
              key={qType.type}
              className="rounded-2xl p-5 bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-cyan-600 dark:text-cyan-400 font-bold border border-slate-200 dark:border-zinc-700">
                  {qType.type.split(' ')[0]} TYPE
                </span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-2">
                  {qType.type}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono mt-1 leading-relaxed">
                  {qType.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs font-mono">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                    Marking Scheme:
                  </span>
                  <span className="text-zinc-700 dark:text-zinc-300">{qType.marking}</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 italic">
                  💡 {qType.strategy}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Subject Topic Weightage & Expected Marks */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              2. Subject-Wise Expected Topic Weightages (100 Marks Total)
            </h2>
          </div>

          {/* Subject Filter Pills */}
          <div className="touch-scroll flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-xs font-mono -mx-2 px-2 sm:mx-0 sm:px-0">
            {subjectList.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubjectFilter(subj)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors touch-manipulation cursor-pointer ${
                  selectedSubjectFilter === subj
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {subj === 'ALL' ? 'All Subjects' : subj}
              </button>
            ))}
          </div>
        </div>

        {/* Weightage Table Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWeightage.map((item) => (
            <div
              key={item.subject}
              className="rounded-2xl p-5 bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 border-b border-slate-200 dark:border-zinc-800 pb-2.5">
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                      {item.subject}
                    </h3>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      Standard Reference: {item.referenceBook}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-black font-mono text-cyan-600 dark:text-cyan-400">
                      ~{item.expectedMarks} Marks
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 block">
                      ({item.percentage}% weight)
                    </span>
                  </div>
                </div>

                {/* Progress Visual */}
                <div className="w-full bg-slate-100 dark:bg-zinc-950 rounded-full h-2 my-3 overflow-hidden border border-slate-200 dark:border-zinc-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full"
                    style={{ width: `${(item.expectedMarks / 15) * 100}%` }}
                  />
                </div>

                {/* High-Yield Topics List */}
                <div className="space-y-1 mt-2">
                  <span className="text-[11px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                    High-Frequency Topics:
                  </span>
                  <ul className="space-y-1">
                    {item.highYieldTopics.map((topic, idx) => (
                      <li
                        key={idx}
                        className="text-xs font-mono text-zinc-700 dark:text-zinc-300 flex items-start gap-1.5"
                      >
                        <span className="text-cyan-500">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 flex justify-end">
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(`GATE CS ${item.subject} pyqs notes`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
                >
                  <span>Practice {item.subject} on Web</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: High-Yield Practice Questions & Solutions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100">
              3. High-Frequency Exam Questions, Solutions & Traps
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            {filteredQA.length} Master Questions
          </span>
        </div>

        <div className="space-y-3">
          {filteredQA.map((qa) => {
            const isOpen = expandedQA[qa.id] || false;

            return (
              <div
                key={qa.id}
                className="rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-md transition-all"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleQA(qa.id)}
                  className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 text-left hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold border border-cyan-300 dark:border-cyan-800">
                        {qa.questionType} ({qa.marks} {qa.marks === 1 ? 'Mark' : 'Marks'})
                      </span>
                      <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                        {qa.subject}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                        • {qa.topic}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1 line-clamp-2">
                      {qa.questionText}
                    </p>
                  </div>

                  <div className="p-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-200 dark:border-zinc-800/80 space-y-4">
                    {/* Full Question Statement */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 block mb-1">
                        PROBLEM STATEMENT:
                      </span>
                      <p className="text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
                        {qa.questionText}
                      </p>

                      {qa.options && (
                        <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-200 dark:border-zinc-800/60">
                          {qa.options.map((opt, idx) => (
                            <div
                              key={idx}
                              className="text-xs font-mono p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Answer & Explanation */}
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-300">
                          CORRECT ANSWER: {qa.correctAnswer}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
                        {qa.explanation}
                      </p>
                    </div>

                    {/* Exam Trap Alert */}
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-mono font-bold text-rose-700 dark:text-rose-400 block mb-0.5">
                          COMMON EXAM TRAP TO AVOID:
                        </span>
                        <p className="text-xs font-mono text-zinc-800 dark:text-zinc-300">
                          {qa.examTrap}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
