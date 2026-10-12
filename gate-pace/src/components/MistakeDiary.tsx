'use client';

import React, { useState } from 'react';
import { useGateStore, MistakeEntry, ErrorTaxonomy } from '@/store/gateStore';
import {
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Filter,
  ExternalLink,
  RotateCcw,
  BookOpen,
  PieChart
} from 'lucide-react';

const CATEGORY_META: Record<ErrorTaxonomy, { label: string; color: string; bg: string }> = {
  CALCULATION_ARITHMETIC: {
    label: 'Calculation / Arithmetic',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800/80'
  },
  MISREAD_QUESTION: {
    label: 'Misread Question / Trap',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800/80'
  },
  EDGE_CASE_BLINDSPOT: {
    label: 'Edge Case Blindspot',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800/80'
  },
  CONCEPTUAL_GAP: {
    label: 'Conceptual Gap',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/80'
  },
  TIME_PRESSURE: {
    label: 'Time Pressure / Panic',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800/80'
  }
};

export const MistakeDiary: React.FC = () => {
  const {
    activeDay,
    selectedDate,
    mistakes,
    addMistake,
    recordMistakeAttempt,
    deleteMistake
  } = useGateStore();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Form State
  const [subject, setSubject] = useState<string>('Operating Systems');
  const [topic, setTopic] = useState<string>('');
  const [category, setCategory] = useState<ErrorTaxonomy>('CONCEPTUAL_GAP');
  const [problemStatement, setProblemStatement] = useState<string>('');
  const [userError, setUserError] = useState<string>('');
  const [correctApproach, setCorrectApproach] = useState<string>('');

  const handleCreateMistake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemStatement.trim()) return;

    addMistake({
      date: selectedDate,
      dayNumber: activeDay,
      subject,
      topic: topic || `${subject} Problem`,
      errorCategory: category,
      problemStatement,
      userError: userError || 'Identified conceptual blunder or oversight.',
      correctApproach: correctApproach || 'Derive property methodically from first principles.',
      referenceLinks: [`https://gateoverflow.in/search?q=${encodeURIComponent(topic || subject)}`]
    });

    // Reset Form
    setProblemStatement('');
    setUserError('');
    setCorrectApproach('');
    setTopic('');
    setShowAddForm(false);
  };

  const filteredMistakes = mistakes.filter((m) => {
    if (activeCategoryFilter === 'ALL') return true;
    if (activeCategoryFilter === 'UNRESOLVED') return !m.isResolved;
    if (activeCategoryFilter === 'RESOLVED') return m.isResolved;
    return m.errorCategory === activeCategoryFilter;
  });

  // Calculate Error Category Distribution
  const totalMistakes = mistakes.length;
  const categoryCounts: Record<ErrorTaxonomy, number> = {
    CALCULATION_ARITHMETIC: 0,
    MISREAD_QUESTION: 0,
    EDGE_CASE_BLINDSPOT: 0,
    CONCEPTUAL_GAP: 0,
    TIME_PRESSURE: 0
  };

  mistakes.forEach((m) => {
    if (categoryCounts[m.errorCategory] !== undefined) {
      categoryCounts[m.errorCategory]++;
    }
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Analytics Summary */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 shrink-0">
                <AlertOctagon className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100">
                COGNITIVE MISTAKE DIARY
              </h2>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-mono">
              GATE is an elimination exam. Every logged mistake must be correctly re-solved <strong>twice</strong> to be marked resolved.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-950 dark:hover:bg-cyan-900 border border-cyan-500 dark:border-cyan-700 text-white dark:text-cyan-300 font-mono text-xs font-bold transition-all shadow-sm w-full sm:w-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Close Form' : 'Log New Error'}
          </button>
        </div>

        {/* Cognitive Taxonomy Distribution Bar */}
        {totalMistakes > 0 && (
          <div className="mt-4 pt-2">
            <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 mb-2">
              <PieChart className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              ROOT-CAUSE ERROR DISTRIBUTION ({totalMistakes} TOTAL MISTAKES)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              {(Object.keys(CATEGORY_META) as ErrorTaxonomy[]).map((cat) => {
                const count = categoryCounts[cat];
                const pct = totalMistakes > 0 ? Math.round((count / totalMistakes) * 100) : 0;
                const meta = CATEGORY_META[cat];
                return (
                  <div key={cat} className={`p-2.5 rounded-xl border ${meta.bg} last:col-span-2 sm:last:col-span-1`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-600 dark:text-zinc-400 truncate">{meta.label}</span>
                      <span className={`font-bold ${meta.color}`}>{count}</span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 mt-1">{pct}% of errors</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add New Mistake Collapsible Form */}
      {showAddForm && (
        <form onSubmit={handleCreateMistake} className="rounded-2xl bg-white dark:bg-zinc-900 border border-rose-300 dark:border-rose-900/60 p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold font-mono text-rose-700 dark:text-rose-300">
            RECORD COGNITIVE BLUNDER INTO LOG
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1">SUBJECT</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Theory of Computation"
                className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1">TOPIC</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. DFA Minimization / Pumping Lemma"
                className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1">ERROR CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ErrorTaxonomy)}
                className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-rose-500 font-mono"
              >
                {(Object.keys(CATEGORY_META) as ErrorTaxonomy[]).map((cat) => (
                  <option key={cat} value={cat} className="bg-white dark:bg-zinc-900">
                    {CATEGORY_META[cat].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1">
              PROBLEM STATEMENT / QUESTION DETAILS
            </label>
            <textarea
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Paste question statement or describe setup..."
              rows={2}
              className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1">
                MY BLUNDER (&quot;WHAT DID I DO WRONG?&quot;)
              </label>
              <textarea
                value={userError}
                onChange={(e) => setUserError(e.target.value)}
                placeholder="Why did you lose marks? e.g. Assumed empty set is not regular..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-rose-500 font-mono resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1">
                CORRECT APPROACH & DERIVATION RULE
              </label>
              <textarea
                value={correctApproach}
                onChange={(e) => setCorrectApproach(e.target.value)}
                placeholder="The correct theoretical rule to anchor in memory..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 dark:bg-rose-950 dark:hover:bg-rose-900 border border-rose-500 dark:border-rose-700 text-white dark:text-rose-300 font-mono text-xs font-bold cursor-pointer"
            >
              Save Error Entry (+25 XP)
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none touch-scroll -mx-2 px-2 sm:mx-0 sm:px-0">
        {['ALL', 'UNRESOLVED', 'RESOLVED', ...Object.keys(CATEGORY_META)].map((filterKey) => {
          const isSelected = activeCategoryFilter === filterKey;
          const label =
            filterKey === 'ALL'
              ? 'All Errors'
              : filterKey === 'UNRESOLVED'
              ? 'Unresolved Only'
              : filterKey === 'RESOLVED'
              ? 'Resolved'
              : CATEGORY_META[filterKey as ErrorTaxonomy]?.label || filterKey;

          return (
            <button
              key={filterKey}
              onClick={() => setActiveCategoryFilter(filterKey)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all touch-manipulation cursor-pointer ${
                isSelected
                  ? 'bg-cyan-600 text-white dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-500 dark:border-cyan-600 font-bold shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Mistake Entries List */}
      <div className="space-y-4">
        {filteredMistakes.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-zinc-500 font-mono text-xs">
            No mistake entries match the selected filter. Clean track!
          </div>
        ) : (
          filteredMistakes.map((m) => {
            const meta = CATEGORY_META[m.errorCategory] || CATEGORY_META.CONCEPTUAL_GAP;

            return (
              <div
                key={m.id}
                className={`rounded-2xl p-4 sm:p-5 border transition-all ${
                  m.isResolved
                    ? 'bg-emerald-50/50 dark:bg-zinc-950/70 border-emerald-300 dark:border-emerald-900/50'
                    : 'bg-white dark:bg-zinc-900/90 border-slate-200 dark:border-zinc-800 shadow-md hover:border-slate-300 dark:hover:border-zinc-700'
                }`}
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-zinc-800 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${meta.bg} ${meta.color}`}>
                      {meta.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                      {m.subject}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      • {m.topic}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      ({m.date} - Day {m.dayNumber})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Resolution Badge */}
                    {m.isResolved ? (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-600 text-emerald-800 dark:text-emerald-400 font-mono text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> RESOLVED (2/2 Solves)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 font-mono text-xs">
                        Progress: {m.correctAttempts}/2 Correct Solves
                      </span>
                    )}

                    <button
                      onClick={() => deleteMistake(m.id)}
                      className="text-zinc-400 hover:text-rose-500 p-1 cursor-pointer"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="mt-3">
                  <p className="text-xs font-mono text-zinc-800 dark:text-zinc-200 bg-slate-50 dark:bg-zinc-950 p-3 rounded-xl border border-slate-200 dark:border-zinc-800/80">
                    {m.problemStatement}
                  </p>
                </div>

                {/* Blunder vs Correct Solution Side-by-Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
                    <span className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide block mb-1">
                      ⚠️ My Blunder:
                    </span>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed">
                      {m.userError}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide block mb-1">
                      ✅ Correct Rule:
                    </span>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed">
                      {m.correctApproach}
                    </p>
                  </div>
                </div>

                {/* Re-attempt Action Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-xs font-mono text-zinc-500">
                    Test your recall: Re-solve now to eliminate this trap forever.
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => recordMistakeAttempt(m.id, true)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-950 dark:hover:bg-emerald-900 border border-emerald-500 dark:border-emerald-700 text-white dark:text-emerald-300 font-mono text-xs font-bold transition-all touch-manipulation cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Re-Attempt Succeeded (+60 XP)</span>
                    </button>
                    <button
                      onClick={() => recordMistakeAttempt(m.id, false)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-950 hover:bg-rose-100 dark:hover:bg-rose-950 border border-slate-300 dark:border-zinc-800 hover:border-rose-400 text-zinc-600 dark:text-zinc-400 hover:text-rose-700 dark:hover:text-rose-300 font-mono text-xs transition-all touch-manipulation cursor-pointer"
                      title="Reset solves to 0"
                    >
                      <RotateCcw className="w-3 h-3 shrink-0" />
                      <span>Failed (Reset)</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
