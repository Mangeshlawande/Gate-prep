'use client';

import React, { useState } from 'react';
import { useGateStore, TaskItem } from '@/store/gateStore';
import { GATE_90_DAYS_CURRICULUM } from '@/data/curriculum';
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
  Edit3
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const {
    activeDay,
    setActiveDay,
    selectedDate,
    setSelectedDate,
    tasks,
    toggleTaskStatus,
    updateTaskNotes,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    soundEnabled
  } = useGateStore();

  const [newSubtaskInputs, setNewSubtaskInputs] = useState<Record<string, string>>({});
  const [editingNotes, setEditingNotes] = useState<Record<string, boolean>>({});

  const dayCurriculum = GATE_90_DAYS_CURRICULUM.find((d) => d.dayNumber === activeDay) || GATE_90_DAYS_CURRICULUM[0];

  // Retrieve tasks for this day
  const b1Task = tasks[`day-${activeDay}-b1`];
  const b2Task = tasks[`day-${activeDay}-b2`];
  const b3Task = tasks[`day-${activeDay}-b3`];

  const currentTasks = [b1Task, b2Task, b3Task].filter(Boolean) as TaskItem[];
  const completedCount = currentTasks.filter((t) => t.status === 'done').length;
  const progressPercent = currentTasks.length > 0 ? Math.round((completedCount / currentTasks.length) * 100) : 0;

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

  const handleCompleteBlock = (task: TaskItem) => {
    const nextStatus = task.status === 'done' ? 'todo' : 'done';
    toggleTaskStatus(task.id, nextStatus);

    // If all 3 blocks become complete, trigger confetti!
    if (nextStatus === 'done' && completedCount === 2) {
      triggerConfetti();
    }
  };

  const getStatusBadge = (status: 'todo' | 'in_progress' | 'done') => {
    switch (status) {
      case 'done':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> COMPLETED
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 animate-pulse">
            <Clock className="w-3 h-3 text-cyan-400" /> IN PROGRESS
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-700 text-zinc-400">
            <Circle className="w-3 h-3 text-zinc-500" /> TO DO
          </span>
        );
    }
  };

  const renderBlockCard = (
    blockKey: 'BLOCK_1' | 'BLOCK_2' | 'BLOCK_3',
    task?: TaskItem,
    blockInfo?: { time: string; title: string; focus: string },
    accentClass: string = 'border-cyan-800/40'
  ) => {
    if (!task || !blockInfo) return null;

    const subtasks = task.subtasks || [];
    const completedSubs = subtasks.filter((s) => s.completed).length;

    return (
      <div
        className={`relative overflow-hidden rounded-xl bg-zinc-900/80 border ${
          task.status === 'done'
            ? 'border-emerald-600/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
            : task.status === 'in_progress'
            ? 'border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.12)]'
            : accentClass
        } p-5 backdrop-blur-sm transition-all duration-300`}
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

        {/* Block Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-cyan-400 border border-zinc-700">
              {blockKey.replace('_', ' ')}
            </span>
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-500" /> {blockInfo.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCompleteBlock(task)}
              className="cursor-pointer transition-transform active:scale-95"
              title="Click to toggle status"
            >
              {getStatusBadge(task.status)}
            </button>
          </div>
        </div>

        {/* Focus description */}
        <div className="mt-3">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            {blockInfo.title}
          </h3>
          <p className="text-sm text-cyan-300/90 font-medium mt-1 leading-snug">
            {blockInfo.focus}
          </p>
        </div>

        {/* Subtask Checklist */}
        <div className="mt-4 pt-3 border-t border-zinc-800/60">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
            <span>SUBTASKS & ACTION ITEMS</span>
            <span>
              {completedSubs}/{subtasks.length} Done
            </span>
          </div>

          <div className="space-y-2">
            {subtasks.map((sub) => (
              <div
                key={sub.id}
                className="flex items-start justify-between gap-2 p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/50 hover:border-zinc-700 transition-colors group"
              >
                <label className="flex items-start gap-2.5 flex-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={sub.completed}
                    onChange={() => toggleSubtask(task.id, sub.id)}
                    className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-cyan-500 focus:ring-cyan-500/20 cursor-pointer accent-cyan-500"
                  />
                  <span
                    className={`text-xs ${
                      sub.completed
                        ? 'line-through text-zinc-500'
                        : 'text-zinc-300 group-hover:text-zinc-100'
                    }`}
                  >
                    {sub.title}
                  </span>
                </label>
                <button
                  onClick={() => deleteSubtask(task.id, sub.id)}
                  className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-rose-400 p-1 transition-opacity"
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
              placeholder="+ Add a quick subtask or note..."
              value={newSubtaskInputs[task.id] || ''}
              onChange={(e) =>
                setNewSubtaskInputs((prev) => ({ ...prev, [task.id]: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddSubtask(task.id);
              }}
              className="flex-1 text-xs px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handleAddSubtask(task.id)}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-cyan-950 hover:text-cyan-400 text-zinc-300 border border-zinc-700 transition-colors"
              title="Add subtask"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Task Notes / Memory Drawer */}
        <div className="mt-4 pt-3 border-t border-zinc-800/60">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span className="font-mono flex items-center gap-1 text-[11px]">
              <Edit3 className="w-3 h-3 text-cyan-400" /> STUDY LOG / NOTES
            </span>
            <button
              onClick={() =>
                setEditingNotes((prev) => ({ ...prev, [task.id]: !prev[task.id] }))
              }
              className="text-[11px] text-cyan-400 hover:underline"
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
              className="w-full text-xs p-2 rounded-lg bg-zinc-950 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-cyan-500 resize-none font-mono"
            />
          ) : (
            <p className="text-xs text-zinc-400 bg-zinc-950/40 p-2 rounded-lg border border-zinc-900 font-mono italic">
              {task.notes || 'No notes logged yet. Click Edit Note to log insights.'}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Day Navigator, Progress & Calendar Sync */}
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-cyan-950 p-6 shadow-xl relative overflow-hidden">
        {/* Visual Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          {/* Day & Title */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-950 border border-cyan-700/60 text-cyan-300">
                {dayCurriculum.phaseName}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700">
                {dayCurriculum.subject}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-100 tracking-tight flex items-center gap-3">
              <span>DAY {dayCurriculum.dayNumber}</span>
              <span className="text-zinc-600 font-normal">/</span>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                {dayCurriculum.techFocus.split(':')[0]}
              </span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-mono">
              Evening Target: {dayCurriculum.eveningFocus}
            </p>
          </div>

          {/* Day Navigation & Calendar Date Sync */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Calendar date input */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs w-full sm:w-auto justify-between">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-cyan-400" />
                Date:
              </span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-zinc-200 outline-none font-mono cursor-pointer"
              />
            </div>

            {/* Prev / Next Day Controls */}
            <div className="flex items-center gap-1 w-full sm:w-auto justify-center">
              <button
                onClick={handlePrevDay}
                disabled={activeDay <= 1}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-600 text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Previous Day"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-center font-mono font-bold text-xs text-cyan-400 min-w-[90px]">
                DAY {activeDay} / 90
              </div>

              <button
                onClick={handleNextDay}
                disabled={activeDay >= 90}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-cyan-600 text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Next Day"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Day Completion Progress Bar */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-md">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                DAILY 3-BLOCK COMPLETION
              </span>
              <span className="font-bold text-cyan-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-2.5 overflow-hidden border border-zinc-800">
              <div
                className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 h-2.5 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Research & Practice shortcuts for today */}
          <div className="flex items-center gap-2">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(dayCurriculum.gfgSearchQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-600 text-xs font-mono text-emerald-400 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              GeeksforGeeks Notes
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={`https://gateoverflow.in/search?q=${encodeURIComponent(dayCurriculum.gateOverflowTag)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-600 text-xs font-mono text-cyan-400 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              GateOverflow PYQs
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* The 3 Core Daily Blocks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {renderBlockCard('BLOCK_1', b1Task, dayCurriculum.block1, 'border-cyan-900/50')}
        {renderBlockCard('BLOCK_2', b2Task, dayCurriculum.block2, 'border-blue-900/50')}
        {renderBlockCard('BLOCK_3', b3Task, dayCurriculum.block3, 'border-purple-900/50')}
      </div>
    </div>
  );
};
