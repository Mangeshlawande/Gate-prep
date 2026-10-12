'use client';

import React, { useState } from 'react';
import { useGateStore } from '@/store/gateStore';
import { FORMULA_DECK, FormulaCard } from '@/data/formulaDeck';
import {
  FileText,
  Search,
  CheckCircle,
  RotateCw,
  Sparkles,
  AlertTriangle,
  BookOpen,
  Eye,
  EyeOff
} from 'lucide-react';

export const FormulaVault: React.FC = () => {
  const { masteredFormulas, toggleFormulaMastery } = useGateStore();

  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'flashcard'>('cards');
  
  // Flashcard mode state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Extract unique subjects
  const allSubjects = ['ALL', ...Array.from(new Set(FORMULA_DECK.map((f) => f.subject)))];

  // Filter formulas
  const filteredFormulas = FORMULA_DECK.filter((f) => {
    const matchesSubject = selectedSubject === 'ALL' || f.subject === selectedSubject;
    const matchesSearch =
      searchQuery === '' ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const totalCount = FORMULA_DECK.length;
  const masteredCount = FORMULA_DECK.filter((f) => masteredFormulas.includes(f.id)).length;
  const masteryPercent = Math.round((masteredCount / totalCount) * 100);

  // Flashcard current item
  const currentFlashcard = filteredFormulas[flashcardIndex] || filteredFormulas[0];

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % Math.max(1, filteredFormulas.length));
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + filteredFormulas.length) % Math.max(1, filteredFormulas.length));
  };

  return (
    <div className="space-y-6">
      {/* Header & Mastery Status */}
      <div className="rounded-2xl bg-zinc-900/90 border border-cyan-950 p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 shrink-0">
                <FileText className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-100">
                DAILY GATE CS FORMULA DECK & CHEAT SHEETS
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              High-yield formulas, asymptotic bounds, theorems, and exam traps across all 10 GATE CS disciplines.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === 'cards'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sheet Grid
            </button>
            <button
              onClick={() => { setViewMode('flashcard'); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === 'flashcard'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Flashcard Drill
            </button>
          </div>
        </div>

        {/* Mastery Progress Bar */}
        <div className="mt-4 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:max-w-md">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
              <span>DECK MASTERY STATUS</span>
              <span className="text-cyan-400 font-bold">
                {masteredCount} / {totalCount} Mastered ({masteryPercent}%)
              </span>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${masteryPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search formula, theorem, trap..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-scroll -mx-3 px-3 sm:mx-0 sm:px-0">
        {allSubjects.map((subj) => (
          <button
            key={subj}
            onClick={() => { setSelectedSubject(subj); setFlashcardIndex(0); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all touch-manipulation cursor-pointer ${
              selectedSubject === subj
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-600 font-bold shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* View Mode 1: Flashcard Drill Mode */}
      {viewMode === 'flashcard' && currentFlashcard && (
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl bg-zinc-900 border border-cyan-900/60 p-4 sm:p-8 shadow-2xl flex flex-col items-center text-center relative overflow-hidden min-h-[380px] justify-between">
            {/* Card Subject & Index Header */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-zinc-500 pb-3 border-b border-zinc-800">
              <span className="text-cyan-400 font-bold">{currentFlashcard.subject}</span>
              <span>
                Card {flashcardIndex + 1} of {filteredFormulas.length}
              </span>
            </div>

            {/* Question / Formula Prompt */}
            <div className="my-auto py-6 w-full">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                {currentFlashcard.topic}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-100 mb-4">
                {currentFlashcard.title}
              </h3>

              {!isFlipped ? (
                <div className="py-8">
                  <p className="text-sm font-mono text-zinc-400 mb-4">
                    Recall the formula and critical exam trap in your mind before flipping!
                  </p>
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-600 text-cyan-300 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  >
                    <Eye className="w-4 h-4" /> REVEAL FORMULA & TRAPS
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-left w-full bg-zinc-950 p-5 rounded-xl border border-zinc-800">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-cyan-400 block mb-1">
                      FORMULA & INVARIANTS:
                    </span>
                    <pre className="text-xs font-mono text-cyan-200 whitespace-pre-wrap leading-relaxed">
                      {currentFlashcard.formula}
                    </pre>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 block mb-1">
                      KEY TAKEAWAYS:
                    </span>
                    <ul className="text-xs font-mono text-zinc-300 space-y-1 list-disc list-inside">
                      {currentFlashcard.keyPoints.map((kp, idx) => (
                        <li key={idx}>{kp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/60">
                    <span className="text-[10px] font-mono font-bold text-rose-400 block mb-0.5">
                      ⚠️ COMMON EXAM TRAP:
                    </span>
                    <p className="text-xs font-mono text-zinc-300">
                      {currentFlashcard.exampleTrap}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Flashcard Bottom Controls */}
            <div className="w-full flex items-center justify-between pt-4 border-t border-zinc-800 gap-2">
              <button
                onClick={handlePrevFlashcard}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono shrink-0 touch-manipulation cursor-pointer"
              >
                Prev
              </button>

              <button
                onClick={() => toggleFormulaMastery(currentFlashcard.id)}
                className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all truncate touch-manipulation cursor-pointer ${
                  masteredFormulas.includes(currentFlashcard.id)
                    ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-emerald-950 hover:text-emerald-300'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">
                  {masteredFormulas.includes(currentFlashcard.id) ? 'Mastered ✓' : 'Mark as Mastered (+30 XP)'}
                </span>
                <span className="sm:hidden">
                  {masteredFormulas.includes(currentFlashcard.id) ? 'Mastered ✓' : 'Mastered (+30 XP)'}
                </span>
              </button>

              <button
                onClick={handleNextFlashcard}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono shrink-0 touch-manipulation cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Mode 2: High-Density Cheat Sheet Grid */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFormulas.map((f) => {
            const isMastered = masteredFormulas.includes(f.id);

            return (
              <div
                key={f.id}
                className={`rounded-2xl p-4 sm:p-5 border transition-all ${
                  isMastered
                    ? 'bg-zinc-900/60 border-emerald-900/40'
                    : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-cyan-400 border border-zinc-700">
                      {f.subject}
                    </span>
                    <h3 className="text-base font-bold text-zinc-100 mt-1.5">
                      {f.title}
                    </h3>
                    <span className="text-xs text-zinc-400 font-mono">
                      {f.topic}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFormulaMastery(f.id)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      isMastered
                        ? 'bg-emerald-950 border-emerald-600 text-emerald-400'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-600 hover:text-zinc-400'
                    }`}
                    title={isMastered ? 'Marked Mastered' : 'Mark as Mastered'}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </div>

                {/* Formula Body */}
                <div className="mt-3">
                  <pre className="text-xs font-mono text-cyan-300 bg-zinc-950 p-3 rounded-xl border border-zinc-900 whitespace-pre-wrap leading-relaxed">
                    {f.formula}
                  </pre>
                </div>

                {/* Key Points */}
                <div className="mt-3 space-y-1">
                  {f.keyPoints.map((kp, idx) => (
                    <div key={idx} className="text-xs text-zinc-300 font-mono flex items-start gap-1.5">
                      <span className="text-cyan-500">•</span>
                      <span>{kp}</span>
                    </div>
                  ))}
                </div>

                {/* Exam Trap */}
                <div className="mt-3 p-2 rounded-lg bg-rose-950/20 border border-rose-900/40 text-[11px] font-mono text-zinc-300">
                  <span className="text-rose-400 font-bold block mb-0.5">⚠️ Exam Trap:</span>
                  {f.exampleTrap}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
