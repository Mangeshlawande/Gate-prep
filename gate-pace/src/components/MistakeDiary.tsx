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
    color: 'text-amber-400',
    bg: 'bg-amber-950/40 border-amber-800/80'
  },
  MISREAD_QUESTION: {
    label: 'Misread Question / Trap',
    color: 'text-orange-400',
    bg: 'bg-orange-950/40 border-orange-800/80'
  },
  EDGE_CASE_BLINDSPOT: {
    label: 'Edge Case Blindspot',
    color: 'text-purple-400',
    bg: 'bg-purple-950/40 border-purple-800/80'
  },
  CONCEPTUAL_GAP: {
    label: 'Conceptual Gap',
    color: 'text-rose-400',
    bg: 'bg-rose-950/40 border-rose-800/80'
  },
  TIME_PRESSURE: {
    label: 'Time Pressure / Panic',
    color: 'text-blue-400',
    bg: 'bg-blue-950/40 border-blue-800/80'
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
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-950 text-rose-400 border border-rose-800">
                <AlertOctagon className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold font-mono text-zinc-100">
                COGNITIVE MISTAKE DIARY & ERROR TAXONOMY
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              GATE is an elimination exam. Every logged mistake must be correctly re-solved <strong>twice</strong> to be marked resolved.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)] self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Close Form' : 'Log New Error'}
          </button>
        </div>

        {/* Cognitive Taxonomy Distribution Bar */}
        {totalMistakes > 0 && (
          <div className="mt-4 pt-2">
            <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 mb-2">
              <PieChart className="w-3.5 h-3.5 text-cyan-400" />
              ROOT-CAUSE ERROR DISTRIBUTION ({totalMistakes} TOTAL MISTAKES)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              {(Object.keys(CATEGORY_META) as ErrorTaxonomy[]).map((cat) => {
                const count = categoryCounts[cat];
                const pct = totalMistakes > 0 ? Math.round((count / totalMistakes) * 100) : 0;
                const meta = CATEGORY_META[cat];
                return (
                  <div key={cat} className={`p-2.5 rounded-xl border ${meta.bg}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 truncate">{meta.label}</span>
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
        <form onSubmit={handleCreateMistake} className="rounded-2xl bg-zinc-900 border border-rose-900/60 p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold font-mono text-rose-300">
            RECORD COGNITIVE BLUNDER INTO LOG
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">SUBJECT</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Theory of Computation"
                className="w-full text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">TOPIC</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. DFA Minimization / Pumping Lemma"
                className="w-full text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">ERROR CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ErrorTaxonomy)}
                className="w-full text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-rose-500 font-mono"
              >
                {(Object.keys(CATEGORY_META) as ErrorTaxonomy[]).map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_META[cat].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-1">
              PROBLEM STATEMENT / QUESTION DETAILS
            </label>
            <textarea
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Paste question statement or describe setup..."
              rows={2}
              className="w-full text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                MY BLUNDER ("WHAT DID I DO WRONG?")
              </label>
              <textarea
                value={userError}
                onChange={(e) => setUserError(e.target.value)}
                placeholder="Why did you lose marks? e.g. Assumed empty set is not regular..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-rose-500 font-mono resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                CORRECT APPROACH & DERIVATION RULE
              </label>
              <textarea
                value={correctApproach}
                onChange={(e) => setCorrectApproach(e.target.value)}
                placeholder="The correct theoretical rule to anchor in memory..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 font-mono resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-700 text-rose-300 font-mono text-xs font-bold"
            >
              Save Error Entry (+25 XP)
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
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
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                isSelected
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-600 font-bold shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
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
          <div className="text-center py-12 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 font-mono text-xs">
            No mistake entries match the selected filter. Clean track!
          </div>
        ) : (
          filteredMistakes.map((m) => {
            const meta = CATEGORY_META[m.errorCategory] || CATEGORY_META.CONCEPTUAL_GAP;

            return (
              <div
                key={m.id}
                className={`rounded-2xl p-5 border transition-all ${
                  m.isResolved
                    ? 'bg-zinc-950/70 border-emerald-900/50'
                    : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${meta.bg} ${meta.color}`}>
                      {meta.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-200">
                      {m.subject}
                    </span>
                    <span className="text-xs text-zinc-400">
                      • {m.topic}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      ({m.date} - Day {m.dayNumber})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Resolution Badge */}
                    {m.isResolved ? (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-400 font-mono text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> RESOLVED (2/2 Solves)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-700 text-zinc-400 font-mono text-xs">
                        Progress: {m.correctAttempts}/2 Correct Solves
                      </span>
                    )}

                    <button
                      onClick={() => deleteMistake(m.id)}
                      className="text-zinc-600 hover:text-rose-400 p-1"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="mt-3">
                  <p className="text-xs font-mono text-zinc-200 bg-zinc-950 p-3 rounded-xl border border-zinc-800/80">
                    {m.problemStatement}
                  </p>
                </div>

                {/* Blunder vs Correct Solution Side-by-Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40">
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wide block mb-1">
                      ⚠️ My Blunder:
                    </span>
                    <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                      {m.userError}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wide block mb-1">
                      ✅ Correct Rule:
                    </span>
                    <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                      {m.correctApproach}
                    </p>
                  </div>
                </div>

                {/* Re-attempt Action Buttons */}
                <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs font-mono text-zinc-500">
                    Test your recall: Re-solve now to eliminate this trap forever.
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => recordMistakeAttempt(m.id, true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 font-mono text-xs font-bold transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Re-Attempt Succeeded (+60 XP)
                    </button>
                    <button
                      onClick={() => recordMistakeAttempt(m.id, false)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-rose-950 border border-zinc-800 hover:border-rose-800 text-zinc-400 hover:text-rose-300 font-mono text-xs transition-all"
                      title="Reset solves to 0"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Failed (Reset)
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
