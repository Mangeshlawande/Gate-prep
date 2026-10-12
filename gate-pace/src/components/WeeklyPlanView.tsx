'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PHASE_WEEKLY_BLUEPRINT,
  PhaseBlueprint,
  WeekBlueprint,
  DailyHourlyTask
} from '@/data/phaseWeeklyBlueprint';
import { useGateStore } from '@/store/gateStore';
import {
  CalendarDays,
  Clock,
  Target,
  BookOpen,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Zap,
  Award,
  Layers,
  ArrowRight,
  CheckCircle2,
  FileText,
  Printer
} from 'lucide-react';

export const WeeklyPlanView: React.FC = () => {
  const router = useRouter();
  const { activeDay, setActiveDay } = useGateStore();

  // Find phase containing activeDay or default to Phase 1
  const initialPhase = useMemo(() => {
    if (activeDay <= 30) return 'PHASE_1';
    if (activeDay <= 60) return 'PHASE_2';
    return 'PHASE_3';
  }, [activeDay]);

  const [selectedPhaseId, setSelectedPhaseId] = useState<'PHASE_1' | 'PHASE_2' | 'PHASE_3'>(initialPhase);
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(() => {
    const ph = PHASE_WEEKLY_BLUEPRINT.find(p => p.id === initialPhase);
    return ph?.weeks[0]?.weekNumber || 1;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({});
  const [allExpanded, setAllExpanded] = useState<boolean>(true);

  // Active Phase and Week
  const currentPhase = useMemo(() => {
    return PHASE_WEEKLY_BLUEPRINT.find(p => p.id === selectedPhaseId) || PHASE_WEEKLY_BLUEPRINT[0];
  }, [selectedPhaseId]);

  const currentWeek = useMemo(() => {
    return currentPhase.weeks.find(w => w.weekNumber === selectedWeekNum) || currentPhase.weeks[0];
  }, [currentPhase, selectedWeekNum]);

  // Handle phase switch
  const handlePhaseChange = (phaseId: 'PHASE_1' | 'PHASE_2' | 'PHASE_3') => {
    setSelectedPhaseId(phaseId);
    const ph = PHASE_WEEKLY_BLUEPRINT.find(p => p.id === phaseId);
    if (ph && ph.weeks.length > 0) {
      setSelectedWeekNum(ph.weeks[0].weekNumber);
    }
  };

  // Toggle single day
  const toggleDay = (dayNum: number) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayNum]: prev[dayNum] !== undefined ? !prev[dayNum] : !allExpanded
    }));
  };

  // Toggle all days
  const toggleAll = () => {
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    const updated: Record<number, boolean> = {};
    if (currentWeek) {
      currentWeek.days.forEach(d => {
        updated[d.dayNumber] = nextState;
      });
    }
    setExpandedDays(updated);
  };

  // Filter days based on search query
  const filteredDays = useMemo(() => {
    if (!currentWeek) return [];
    if (!searchQuery.trim()) return currentWeek.days;

    const q = searchQuery.toLowerCase();
    return currentWeek.days.filter(day => {
      const inTitle = day.dayTitle.toLowerCase().includes(q);
      const inSubject = day.subject.toLowerCase().includes(q);
      const inTheory = day.theorySlot.topics.some(t => t.toLowerCase().includes(q));
      const inPractice = day.practiceSlot.target.toLowerCase().includes(q) ||
        day.practiceSlot.problemTypes.some(pt => pt.toLowerCase().includes(q));
      const inAptitude = day.aptitudeMathSlot.focus.toLowerCase().includes(q);
      const inReview = day.reviewSlot.trapFocus.toLowerCase().includes(q) || day.reviewSlot.goal.toLowerCase().includes(q);

      return inTitle || inSubject || inTheory || inPractice || inAptitude || inReview;
    });
  }, [currentWeek, searchQuery]);

  const launchDay = (dayNumber: number) => {
    setActiveDay(dayNumber);
    router.push('/tasks');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Title & Mission Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 font-mono text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>90-DAY WEEKLY EXECUTION BLUEPRINT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
            WEEKLY BUILD PLAN & HOURLY TASK ARCHITECTURE
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-mono mt-1 max-w-3xl">
            Granular 4-slot daily execution roadmap across Phase 1 (Month 1), Phase 2 (Month 2), and Phase 3 (Month 3).
            Includes Theory, Practice Drills, Math/Aptitude, and Review Traps.
          </p>
        </div>

        {/* Global Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium border border-slate-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
            title="Print Week Plan"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print View</span>
          </button>
          <button
            onClick={() => launchDay(currentWeek?.days[0]?.dayNumber || activeDay)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Command Center</span>
          </button>
        </div>
      </div>

      {/* Phase Selector Banner: Month 1, Month 2, Month 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PHASE_WEEKLY_BLUEPRINT.map((phase) => {
          const isSelected = phase.id === selectedPhaseId;
          const isCurrentActiveDayPhase =
            (phase.id === 'PHASE_1' && activeDay <= 30) ||
            (phase.id === 'PHASE_2' && activeDay > 30 && activeDay <= 60) ||
            (phase.id === 'PHASE_3' && activeDay > 60);

          return (
            <button
              key={phase.id}
              onClick={() => handlePhaseChange(phase.id)}
              className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-white dark:bg-zinc-900/90 border-cyan-500 dark:border-cyan-500 shadow-md ring-2 ring-cyan-500/20'
                  : 'bg-white/60 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-900'
              }`}
            >
              {isCurrentActiveDayPhase && (
                <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Current (Day {activeDay})
                </div>
              )}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  {phase.month} • {phase.dayRange}
                </span>
              </div>
              <h3 className="font-mono font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 line-clamp-1">
                {phase.name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                {phase.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Target: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{phase.targetMarks}</strong>
                </span>
                <span className="text-cyan-600 dark:text-cyan-400 flex items-center gap-1 text-[11px] font-semibold">
                  {phase.weeks.length} Weeks Available <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Week Selector Chips for Current Phase */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-scroll p-1.5 bg-slate-100/80 dark:bg-zinc-900/80 rounded-2xl border border-slate-200 dark:border-zinc-800 -mx-3 px-3 sm:mx-0 sm:px-1.5">
        {currentPhase.weeks.map((week) => {
          const isWeekSelected = week.weekNumber === selectedWeekNum;
          return (
            <button
              key={week.weekNumber}
              onClick={() => setSelectedWeekNum(week.weekNumber)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all touch-manipulation cursor-pointer ${
                isWeekSelected
                  ? 'bg-cyan-600 text-white font-bold shadow-sm'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-100'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 shrink-0" />
              <span>Week {week.weekNumber}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                isWeekSelected
                  ? 'bg-white/20 text-white font-mono'
                  : 'bg-slate-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}>
                {week.dayRange}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Week Detailed Briefing Card */}
      {currentWeek && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-950/20 via-zinc-900/60 to-zinc-900/80 border border-cyan-800/40 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {currentWeek.monthName} • {currentWeek.dayRange}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Target: {currentWeek.expectedMarksTarget}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-mono text-zinc-100">
                {currentWeek.weekTitle}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-mono max-w-4xl leading-relaxed">
                🎯 <strong>Goal:</strong> {currentWeek.weekGoal}
              </p>
              <div className="flex items-center gap-2 pt-1 flex-wrap text-xs text-zinc-400 font-mono">
                <span>Core Subjects:</span>
                {currentWeek.primarySubjects.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-200 text-[11px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Week Metrics */}
            <div className="grid grid-cols-3 gap-2 shrink-0 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800 text-center font-mono">
              <div className="px-2">
                <div className="text-base font-black text-cyan-400">{currentWeek.days.length}</div>
                <div className="text-[10px] text-zinc-400">Total Days</div>
              </div>
              <div className="px-2 border-x border-zinc-800">
                <div className="text-base font-black text-emerald-400">8.25h</div>
                <div className="text-[10px] text-zinc-400">Daily Slots</div>
              </div>
              <div className="px-2">
                <div className="text-base font-black text-amber-400">{currentWeek.days.length * 25}+</div>
                <div className="text-[10px] text-zinc-400">Week PYQs</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Expand Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, traps, or formulas..."
            className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>

        {/* Expand / Collapse All */}
        <button
          onClick={toggleAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
        >
          {allExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Collapse All Days</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Expand All Days</span>
            </>
          )}
        </button>
      </div>

      {/* Daily Task Breakdown Cards */}
      <div className="space-y-4">
        {filteredDays.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-mono text-xs">
            No matching daily tasks found for &quot;{searchQuery}&quot;. Try searching for another topic or clear search.
          </div>
        ) : (
          filteredDays.map((day) => {
            const isExpanded = expandedDays[day.dayNumber] !== undefined ? expandedDays[day.dayNumber] : allExpanded;
            const isToday = day.dayNumber === activeDay;

            return (
              <div
                key={day.dayNumber}
                id={`day-${day.dayNumber}`}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isToday
                    ? 'border-cyan-500 dark:border-cyan-500/80 bg-white dark:bg-zinc-900/90 shadow-md ring-1 ring-cyan-500/30'
                    : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50'
                }`}
              >
                {/* Day Card Header */}
                <div
                  onClick={() => toggleDay(day.dayNumber)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-900/80 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-3.5 flex-1 min-w-0">
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex flex-col items-center justify-center font-mono font-bold shrink-0 shadow-sm border ${
                      isToday
                        ? 'bg-cyan-600 text-white border-cyan-500'
                        : 'bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-slate-200 dark:border-zinc-700'
                    }`}>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider leading-none text-zinc-400 dark:text-zinc-300">DAY</span>
                      <span className="text-sm sm:text-base font-black leading-none mt-0.5">{day.dayNumber}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                          {day.subject}
                        </span>
                        {isToday && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" />
                            Active Day
                          </span>
                        )}
                      </div>
                      <h3 className="font-mono font-bold text-xs sm:text-base text-zinc-900 dark:text-zinc-100 mt-1 truncate">
                        {day.dayTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Header Right Action & Toggle */}
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => launchDay(day.dayNumber)}
                      className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-900 transition-colors touch-manipulation cursor-pointer"
                      title="Set as Active Day and Open in Command Center"
                    >
                      <Target className="w-3.5 h-3.5 shrink-0" />
                      <span className="hidden xs:inline">Launch</span>
                    </button>
                    <button
                      onClick={() => toggleDay(day.dayNumber)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors touch-manipulation cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded 4-Slot Breakdown */}
                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-zinc-800/80 p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-zinc-950/40">
                    {/* The 4 Core Daily Slots */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      
                      {/* SLOT 1: THEORY (07:00 AM – 10:00 AM) */}
                      <div className="p-4 rounded-xl border border-cyan-200 dark:border-cyan-900/60 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
                        <div className="flex items-center justify-between border-b border-cyan-100 dark:border-cyan-900/40 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                            <h4 className="font-mono font-bold text-xs text-cyan-800 dark:text-cyan-300">
                              {day.theorySlot.time}
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400 font-semibold">
                            3 Hours
                          </span>
                        </div>

                        {/* Topics Covered */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                            Core Theoretical Breakdown:
                          </span>
                          <ul className="space-y-1.5 text-xs text-zinc-800 dark:text-zinc-200 font-mono leading-relaxed">
                            {day.theorySlot.topics.map((t, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-0.5 shrink-0">•</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Formulas / Concepts */}
                        {day.theorySlot.keyFormulasOrConcepts && day.theorySlot.keyFormulasOrConcepts.length > 0 && (
                          <div className="mt-2 p-2.5 rounded-lg bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-900/50">
                            <span className="text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider block mb-1">
                              ⚡ Key Theorems & Formulas:
                            </span>
                            <div className="space-y-1 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                              {day.theorySlot.keyFormulasOrConcepts.map((f, idx) => (
                                <div key={idx} className="flex items-start gap-1.5">
                                  <span className="text-cyan-600 dark:text-cyan-400">↳</span>
                                  <span>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* SLOT 2: PRACTICE (11:30 AM – 02:00 PM) */}
                      <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
                        <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/40 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <h4 className="font-mono font-bold text-xs text-emerald-800 dark:text-emerald-300">
                              {day.practiceSlot.time}
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-semibold">
                            2.5 Hours
                          </span>
                        </div>

                        {/* Practice Target Statement */}
                        <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
                              🎯 {day.practiceSlot.target}
                            </span>
                          </div>
                          <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200">
                            <Clock className="w-3 h-3" />
                            <span>{day.practiceSlot.timeTarget}</span>
                          </div>
                        </div>

                        {/* Problem Types */}
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                            Target Problem Types:
                          </span>
                          <ul className="space-y-1 text-xs text-zinc-800 dark:text-zinc-200 font-mono">
                            {day.practiceSlot.problemTypes.map((pt, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Quick links to GateOverflow & GFG */}
                        <div className="pt-1 flex items-center gap-2">
                          <a
                            href={`https://gateoverflow.in/questions?q=${encodeURIComponent(day.dayTitle)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>GateOverflow PYQs</span>
                          </a>
                          <span className="text-zinc-400">•</span>
                          <a
                            href={`https://www.google.com/search?q=geeksforgeeks+gate+${encodeURIComponent(day.dayTitle)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>GeeksforGeeks Notes</span>
                          </a>
                        </div>
                      </div>

                      {/* SLOT 3: APTITUDE & MATH (05:00 PM – 06:15 PM) */}
                      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
                        <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/40 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <h4 className="font-mono font-bold text-xs text-amber-800 dark:text-amber-300">
                              {day.aptitudeMathSlot.time}
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 font-semibold">
                            1.25 Hours
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                            Focus Topic:
                          </span>
                          <p className="text-xs text-zinc-800 dark:text-zinc-200 font-mono leading-relaxed">
                            {day.aptitudeMathSlot.focus}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50">
                          <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider block">
                            Daily Quota Target:
                          </span>
                          <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                            📐 {day.aptitudeMathSlot.targetCount}
                          </div>
                        </div>
                      </div>

                      {/* SLOT 4: REVIEW & TRAPS (06:30 PM – 07:15 PM) */}
                      <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
                        <div className="flex items-center justify-between border-b border-rose-100 dark:border-rose-900/40 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <h4 className="font-mono font-bold text-xs text-rose-800 dark:text-rose-300">
                              {day.reviewSlot.time}
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 font-semibold">
                            45 Mins
                          </span>
                        </div>

                        <div>
                          <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                            Review Goal:
                          </span>
                          <p className="text-xs text-zinc-800 dark:text-zinc-200 font-mono leading-relaxed">
                            {day.reviewSlot.goal}
                          </p>
                        </div>

                        {/* Critical Trap Box */}
                        <div className="p-2.5 rounded-lg bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                            <AlertTriangle className="w-3 h-3 text-rose-500" />
                            <span>GATE Trap Focus:</span>
                          </div>
                          <p className="text-xs font-mono font-semibold text-rose-900 dark:text-rose-200 mt-1 leading-relaxed">
                            ⚠️ {day.reviewSlot.trapFocus}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Day Action Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 dark:border-zinc-800/60 text-xs font-mono">
                      <div className="text-zinc-500 dark:text-zinc-400">
                        Total daily study target: <strong className="text-zinc-800 dark:text-zinc-200">8.25 hours</strong> across 4 focused blocks
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => launchDay(day.dayNumber)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-sm"
                        >
                          <Target className="w-3.5 h-3.5" />
                          <span>Open Day {day.dayNumber} in Command Center</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
