'use client';

import React, { useState } from 'react';
import { useGateStore, TaskItem, getTodayTaskStats } from '@/store/gateStore';
import { GATE_90_DAYS_CURRICULUM } from '@/data/curriculum';
import { getDailyBlueprint, getWeekForDay } from '@/data/phaseWeeklyBlueprint';
import { triggerConfetti } from '@/utils/confetti';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  BookOpen,
  CalendarDays,
  Target,
  Edit3,
  AlertTriangle,
  Layers,
  ChevronDown,
  ChevronUp,
  Zap
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const {
    activeDay,
    setActiveDay,
    selectedDate,
    setSelectedDate,
    tasks,
    setTaskStatus,
    updateTaskNotes,
    addSubtask,
    toggleSubtask,
    deleteSubtask
  } = useGateStore();

  const [newSubtaskInputs, setNewSubtaskInputs] = useState<Record<string, string>>({});
  const [editingNotes, setEditingNotes] = useState<Record<string, boolean>>({});
  const [showBlueprintDetails, setShowBlueprintDetails] = useState<boolean>(true);

  const dayCurriculum =
    GATE_90_DAYS_CURRICULUM.find((d) => d.dayNumber === activeDay) ||
    GATE_90_DAYS_CURRICULUM[0];

  const dailyBlueprint = getDailyBlueprint(activeDay);
  const currentWeek = getWeekForDay(activeDay);

  // Retrieve tasks for this day
  const b1Task = tasks[`day-${activeDay}-b1`];
  const b2Task = tasks[`day-${activeDay}-b2`];
  const b3Task = tasks[`day-${activeDay}-b3`];

  const todayStats = getTodayTaskStats(tasks, activeDay);

  const handlePrevDay = () => {
    if (activeDay > 1) {
      setActiveDay(activeDay - 1);
    }
  };

  const handleNextDay = () => {
    if (activeDay < 90) {
      setActiveDay(activeDay + 1);
    }
  };

  const handleAddSubtask = (taskId: string) => {
    const text = newSubtaskInputs[taskId]?.trim();
    if (!text) return;
    addSubtask(taskId, text);
    setNewSubtaskInputs((prev) => ({ ...prev, [taskId]: '' }));
  };

  const handleStatusChange = (taskId: string, nextStatus: 'todo' | 'in_progress' | 'done') => {
    setTaskStatus(taskId, nextStatus);
    if (nextStatus === 'done' && todayStats.done === 2) {
      triggerConfetti();
    }
  };

  const renderBlockCard = (
    blockKey: 'BLOCK_1' | 'BLOCK_2' | 'BLOCK_3',
    task?: TaskItem,
    blockInfo?: { time: string; title: string; focus: string },
    accentClass: string = 'border-slate-200 dark:border-cyan-800/40'
  ) => {
    if (!task || !blockInfo) return null;

    const subtasks = task.subtasks || [];
    const completedSubs = subtasks.filter((s) => s.completed).length;

    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900/90 border ${
          task.status === 'done'
            ? 'border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
            : task.status === 'in_progress'
            ? 'border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
            : accentClass
        } p-5 shadow-md backdrop-blur-sm transition-all duration-300 flex flex-col justify-between`}
      >
        {/* Glow corner accent */}
        <div
          className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl pointer-events-none ${
            task.status === 'done'
              ? 'bg-emerald-500/10'
              : task.status === 'in_progress'
              ? 'bg-cyan-500/15'
              : 'bg-zinc-700/10'
          }`}
        />

        <div>
          {/* Block Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-cyan-700 dark:text-cyan-400 border border-slate-300 dark:border-zinc-700">
                {blockKey.replace('_', ' ')}
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400 dark:text-zinc-500" /> {blockInfo.time}
              </span>
            </div>

            {/* Quick 3-State Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-950 p-1 rounded-lg border border-slate-200 dark:border-zinc-800">
              <button
                onClick={() => handleStatusChange(task.id, 'todo')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  task.status === 'todo'
                    ? 'bg-zinc-700 text-white shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
                title="Mark as Todo"
              >
                TODO
              </button>
              <button
                onClick={() => handleStatusChange(task.id, 'in_progress')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  task.status === 'in_progress'
                    ? 'bg-cyan-600 text-white shadow-sm animate-pulse'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400'
                }`}
                title="Mark as In Progress"
              >
                ACTIVE
              </button>
              <button
                onClick={() => handleStatusChange(task.id, 'done')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                  task.status === 'done'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
                title="Mark as Done"
              >
                DONE
              </button>
            </div>
          </div>

          {/* Focus description */}
          <div className="mt-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              {blockInfo.title}
            </h3>
            <p className="text-sm text-cyan-800 dark:text-cyan-300 font-medium mt-1 leading-snug">
              {blockInfo.focus}
            </p>
          </div>

          {/* Subtask Checklist */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800/60">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
              <span>SUBTASKS & CHECKLIST</span>
              <span className="font-bold">
                {completedSubs}/{subtasks.length} Done
              </span>
            </div>

            <div className="space-y-2">
              {subtasks.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800/50 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors group"
                >
                  <label className="flex items-start gap-2.5 flex-1 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sub.completed}
                      onChange={() => toggleSubtask(task.id, sub.id)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-cyan-500 focus:ring-cyan-500/20 cursor-pointer accent-cyan-500"
                    />
                    <span
                      className={`text-xs ${
                        sub.completed
                          ? 'line-through text-zinc-400 dark:text-zinc-500'
                          : 'text-zinc-800 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-zinc-100'
                      }`}
                    >
                      {sub.title}
                    </span>
                  </label>
                  <button
                    onClick={() => deleteSubtask(task.id, sub.id)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-rose-500 p-1 transition-opacity"
                    title="Delete subtask"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Subtask Input */}
            <div className="mt-2.5 flex items-center gap-2">
              <input
                type="text"
                placeholder="+ Add a quick subtask or checklist item..."
                value={newSubtaskInputs[task.id] || ''}
                onChange={(e) =>
                  setNewSubtaskInputs((prev) => ({ ...prev, [task.id]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddSubtask(task.id);
                }}
                className="flex-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-zinc-950/80 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => handleAddSubtask(task.id)}
                className="p-1.5 rounded-lg bg-slate-200 dark:bg-zinc-800 hover:bg-cyan-100 dark:hover:bg-cyan-950 hover:text-cyan-700 dark:hover:text-cyan-400 text-zinc-700 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700 transition-colors"
                title="Add subtask"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Task Notes / Memory Drawer */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800/60">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
            <span className="font-mono flex items-center gap-1 text-[11px]">
              <Edit3 className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> STUDY LOG / NOTES
            </span>
            <button
              onClick={() =>
                setEditingNotes((prev) => ({ ...prev, [task.id]: !prev[task.id] }))
              }
              className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline font-mono"
            >
              {editingNotes[task.id] ? 'Done' : 'Edit Note'}
            </button>
          </div>

          {editingNotes[task.id] ? (
            <textarea
              value={task.notes || ''}
              onChange={(e) => updateTaskNotes(task.id, e.target.value)}
              placeholder="Jot down formulas derived, doubts, or page numbers..."
              rows={2}
              className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500 resize-none font-mono"
            />
          ) : (
            <p className="text-xs text-zinc-600 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-950/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-900 font-mono italic">
              {task.notes || 'No notes logged yet. Click Edit Note to log insights.'}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Day Navigator, Dropdown Jumper & Progress */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border border-slate-300 dark:border-cyan-950 p-6 shadow-xl relative overflow-hidden transition-colors">
        {/* Visual Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          {/* Day & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-700/60 text-cyan-900 dark:text-cyan-300">
                {dayCurriculum.phaseName}
              </span>
              {currentWeek && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold font-mono bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60">
                  Week {currentWeek.weekNumber} ({currentWeek.dayRange})
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700">
                {dayCurriculum.subject}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-3">
              <span>DAY {activeDay}</span>
              <span className="text-zinc-400 dark:text-zinc-600 font-normal">:</span>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
                {dailyBlueprint.dayTitle}
              </span>
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl font-mono">
              Evening Focus: {dayCurriculum.eveningFocus}
            </p>
          </div>

          {/* Day Navigation & Calendar Date Sync */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Calendar date input */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-xs w-full sm:w-auto justify-between shadow-sm">
              <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                Date:
              </span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-zinc-800 dark:text-zinc-200 outline-none font-mono cursor-pointer"
              />
            </div>

            {/* Prev / Day Jump Select / Next Day Controls */}
            <div className="flex items-center gap-1 w-full sm:w-auto justify-center">
              <button
                onClick={handlePrevDay}
                disabled={activeDay <= 1}
                className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 hover:border-cyan-600 text-zinc-700 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                title="Previous Day"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Direct Jump Dropdown */}
              <select
                value={activeDay}
                onChange={(e) => setActiveDay(Number(e.target.value))}
                className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                title="Jump to any Day 1 to 90"
              >
                {GATE_90_DAYS_CURRICULUM.map((c) => (
                  <option key={c.dayNumber} value={c.dayNumber}>
                    Day {c.dayNumber}: {c.techFocus.split(',')[0].slice(0, 32)}
                  </option>
                ))}
              </select>

              <button
                onClick={handleNextDay}
                disabled={activeDay >= 90}
                className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 hover:border-cyan-600 text-zinc-700 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                title="Next Day"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Day Completion Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-md">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                DAILY 3-BLOCK COMPLETION
              </span>
              <span className="font-bold text-cyan-700 dark:text-cyan-400">
                {todayStats.done}/3 Done ({todayStats.percent}%)
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-zinc-950 rounded-full h-2.5 overflow-hidden border border-slate-300 dark:border-zinc-800">
              <div
                className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 h-2.5 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                style={{ width: `${todayStats.percent}%` }}
              />
            </div>
          </div>

          {/* Quick Research & Practice shortcuts for today */}
          <div className="flex items-center gap-2">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(dayCurriculum.gfgSearchQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-300 dark:border-zinc-800 hover:border-emerald-500 text-xs font-mono text-emerald-700 dark:text-emerald-400 transition-all shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              GeeksforGeeks Notes
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={`https://gateoverflow.in/search?q=${encodeURIComponent(dayCurriculum.gateOverflowTag)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-300 dark:border-zinc-800 hover:border-cyan-500 text-xs font-mono text-cyan-700 dark:text-cyan-400 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              GateOverflow PYQs
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HOURLY TASK SPECIFICATION & DAILY BLUEPRINT (THE CORE 4-SLOT BREAKDOWN)   */}
      {/* ========================================================================= */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 p-5 sm:p-6 shadow-md transition-colors space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-sm">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span>DAY {activeDay} HOURLY TASK ARCHITECTURE</span>
                <span className="text-xs font-normal text-cyan-600 dark:text-cyan-400">
                  (8.25 Hours Focus Breakdown)
                </span>
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                Exact theory topics, practice targets, speed constraints, and high-yield traps to scrub.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowBlueprintDetails(!showBlueprintDetails)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border border-slate-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {showBlueprintDetails ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Hide Schedule</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>View Full Schedule</span>
              </>
            )}
          </button>
        </div>

        {showBlueprintDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
            {/* SLOT 1: THEORY (07:00 AM – 10:00 AM) */}
            <div className="p-4 rounded-xl border border-cyan-200 dark:border-cyan-900/60 bg-slate-50/50 dark:bg-zinc-950/60 space-y-3">
              <div className="flex items-center justify-between border-b border-cyan-100 dark:border-cyan-900/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                  <h3 className="font-mono font-bold text-xs text-cyan-800 dark:text-cyan-300">
                    {dailyBlueprint.theorySlot.time}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 font-semibold">
                  3 Hours
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Core Topics to Cover:
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-800 dark:text-zinc-200 font-mono leading-relaxed">
                  {dailyBlueprint.theorySlot.topics.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-500 mt-0.5 shrink-0">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {dailyBlueprint.theorySlot.keyFormulasOrConcepts && dailyBlueprint.theorySlot.keyFormulasOrConcepts.length > 0 && (
                <div className="mt-2 p-2.5 rounded-lg bg-cyan-100/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50">
                  <span className="text-[10px] font-mono font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider block mb-1">
                    ⚡ Key Theorems & Formulas:
                  </span>
                  <div className="space-y-1 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                    {dailyBlueprint.theorySlot.keyFormulasOrConcepts.map((f, idx) => (
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
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-slate-50/50 dark:bg-zinc-950/60 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className="font-mono font-bold text-xs text-emerald-800 dark:text-emerald-300">
                    {dailyBlueprint.practiceSlot.time}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold">
                  2.5 Hours
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                <span className="text-xs font-mono font-bold text-emerald-900 dark:text-emerald-200 block">
                  🎯 {dailyBlueprint.practiceSlot.target}
                </span>
                <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-200">
                  <Clock className="w-3 h-3" />
                  <span>Time Target: {dailyBlueprint.practiceSlot.timeTarget}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                  Target Problem Types:
                </span>
                <ul className="space-y-1 text-xs text-zinc-800 dark:text-zinc-200 font-mono">
                  {dailyBlueprint.practiceSlot.problemTypes.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SLOT 3: APTITUDE & MATH (05:00 PM – 06:15 PM) */}
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-slate-50/50 dark:bg-zinc-950/60 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h3 className="font-mono font-bold text-xs text-amber-800 dark:text-amber-300">
                    {dailyBlueprint.aptitudeMathSlot.time}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-semibold">
                  1.25 Hours
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Focus Topic:
                </span>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 font-mono leading-relaxed">
                  {dailyBlueprint.aptitudeMathSlot.focus}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
                <span className="text-[10px] font-mono font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block">
                  Daily Quota Target:
                </span>
                <div className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  📐 {dailyBlueprint.aptitudeMathSlot.targetCount}
                </div>
              </div>
            </div>

            {/* SLOT 4: REVIEW & TRAPS (06:30 PM – 07:15 PM) */}
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-slate-50/50 dark:bg-zinc-950/60 space-y-3">
              <div className="flex items-center justify-between border-b border-rose-100 dark:border-rose-900/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <h3 className="font-mono font-bold text-xs text-rose-800 dark:text-rose-300">
                    {dailyBlueprint.reviewSlot.time}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 font-semibold">
                  45 Mins
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                  Review Goal:
                </span>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 font-mono leading-relaxed">
                  {dailyBlueprint.reviewSlot.goal}
                </p>
              </div>

              {/* Critical Trap Box */}
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3 text-rose-500" />
                  <span>GATE Trap Focus:</span>
                </div>
                <p className="text-xs font-mono font-semibold text-rose-900 dark:text-rose-200 mt-1 leading-relaxed">
                  ⚠️ {dailyBlueprint.reviewSlot.trapFocus}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE STUDY BLOCKS & CHECKLIST TRACKER                             */}
      {/* ========================================================================= */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold font-mono text-zinc-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Interactive Subtasks, Checklists & Study Notes</span>
          </h2>
          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
            Click status pills (TODO / ACTIVE / DONE) to track completion
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {renderBlockCard('BLOCK_1', b1Task, dayCurriculum.block1, 'border-slate-300 dark:border-cyan-900/50')}
          {renderBlockCard('BLOCK_2', b2Task, dayCurriculum.block2, 'border-slate-300 dark:border-blue-900/50')}
          {renderBlockCard('BLOCK_3', b3Task, dayCurriculum.block3, 'border-slate-300 dark:border-purple-900/50')}
        </div>
      </div>
    </div>
  );
};
