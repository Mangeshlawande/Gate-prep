'use client';

import React, { useState, useEffect } from 'react';
import { useGateStore } from '@/store/gateStore';
import {
  BarChart3,
  TrendingUp,
  Download,
  Upload,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Calendar,
  Trophy
} from 'lucide-react';
import { getRankInfo } from '@/components/Navbar';

export const AnalyticsDashboard: React.FC = () => {
  const {
    startDate,
    setStartDate,
    activeDay,
    tasks,
    pyqLogs,
    mistakes,
    studySessions,
    xp,
    streakCount,
    resetAll,
    importState
  } = useGateStore();

  const [importText, setImportText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string>('');
  const [daysDiff, setDaysDiff] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const startMs = new Date(startDate).getTime();
      const nowMs = Date.now();
      const diff = Math.max(1, Math.floor((nowMs - startMs) / (1000 * 3600 * 24)) + 1);
      setDaysDiff(diff);
    } catch {
      setDaysDiff(1);
    }
  }, [startDate]);

  // Completed days: count how many days have all 3 blocks finished
  let completedDaysCount = 0;
  for (let d = 1; d <= 90; d++) {
    const b1 = tasks[`day-${d}-b1`];
    const b2 = tasks[`day-${d}-b2`];
    const b3 = tasks[`day-${d}-b3`];
    if (b1?.status === 'done' && b2?.status === 'done' && b3?.status === 'done') {
      completedDaysCount++;
    }
  }

  const delta = completedDaysCount - daysDiff;
  const velocityStatus = delta >= 1 ? 'AHEAD' : delta >= -1 ? 'ON_TRACK' : 'BEHIND';

  const rank = getRankInfo(xp);

  // 2. Study Hours
  const totalStudyMinutes = studySessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  // 3. PYQ Accuracy
  const totalPYQs = pyqLogs.length;
  const correctPYQs = pyqLogs.filter(
    (q) => q.status === 'CORRECT_FIRST_TRY' || q.status === 'CORRECT_SLOW'
  ).length;
  const pyqAccuracy = totalPYQs > 0 ? Math.round((correctPYQs / totalPYQs) * 100) : 0;

  // Breakdown by Type
  const mcqTotal = pyqLogs.filter((q) => q.questionType === 'MCQ').length;
  const mcqCorrect = pyqLogs.filter(
    (q) => q.questionType === 'MCQ' && (q.status === 'CORRECT_FIRST_TRY' || q.status === 'CORRECT_SLOW')
  ).length;

  const natTotal = pyqLogs.filter((q) => q.questionType === 'NAT').length;
  const natCorrect = pyqLogs.filter(
    (q) => q.questionType === 'NAT' && (q.status === 'CORRECT_FIRST_TRY' || q.status === 'CORRECT_SLOW')
  ).length;

  const msqTotal = pyqLogs.filter((q) => q.questionType === 'MSQ').length;
  const msqCorrect = pyqLogs.filter(
    (q) => q.questionType === 'MSQ' && (q.status === 'CORRECT_FIRST_TRY' || q.status === 'CORRECT_SLOW')
  ).length;

  // Export JSON handler
  const handleExport = () => {
    const fullState = useGateStore.getState();
    const jsonStr = JSON.stringify(fullState, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gate-pace-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const ok = importState(importText);
    if (ok) {
      setImportStatus('State restored successfully!');
      setImportText('');
    } else {
      setImportStatus('Invalid JSON data. Please verify your file contents.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Velocity Indicator */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-100">
                SCHEDULE VELOCITY & ANALYTICS ENGINE
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Live pacing metrics, question accuracy by type, study hours burn-up, and offline backups.
            </p>
          </div>

          {/* Velocity Status Pill */}
          <div className="flex items-center gap-2">
            {velocityStatus === 'AHEAD' && (
              <span className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300 font-mono text-[11px] sm:text-xs font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                🚀 PACE: {delta} DAYS AHEAD
              </span>
            )}
            {velocityStatus === 'ON_TRACK' && (
              <span className="px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-600 text-cyan-300 font-mono text-[11px] sm:text-xs font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                ⚡ PACE: ON TRACK
              </span>
            )}
            {velocityStatus === 'BEHIND' && (
              <span className="px-3 py-1.5 rounded-xl bg-rose-950 border border-rose-600 text-rose-300 font-mono text-[11px] sm:text-xs font-bold shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                ⚠️ PACE: {Math.abs(delta)} DAYS BEHIND
              </span>
            )}
          </div>
        </div>

        {/* Start Date Configuration */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-zinc-400">Preparation Start Date:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-zinc-400">
            <span>Calendar Days: <strong>{daysDiff}</strong></span>
            <span>•</span>
            <span>Days Completed: <strong className="text-cyan-400">{completedDaysCount}</strong></span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 shadow-lg">
          <span className="text-xs font-mono text-zinc-500 block mb-1">TOTAL STUDY TIME</span>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {totalStudyHours} <span className="text-sm font-normal text-zinc-400">Hours</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 mt-2 block">
            Across {studySessions.length} recorded focus sessions
          </span>
        </div>

        {/* KPI 2 */}
        <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 shadow-lg">
          <span className="text-xs font-mono text-zinc-500 block mb-1">PYQ ACCURACY</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {pyqAccuracy}%
          </div>
          <span className="text-[11px] font-mono text-zinc-500 mt-2 block">
            {correctPYQs} / {totalPYQs} Questions Solved Correct
          </span>
        </div>

        {/* KPI 3 */}
        <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 shadow-lg">
          <span className="text-xs font-mono text-zinc-500 block mb-1">ERRORS LOGGED</span>
          <div className="text-2xl font-bold font-mono text-rose-400">
            {mistakes.length}
          </div>
          <span className="text-[11px] font-mono text-zinc-500 mt-2 block">
            {mistakes.filter((m) => m.isResolved).length} successfully resolved
          </span>
        </div>

        {/* KPI 4 */}
        <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-zinc-500 block mb-1">STREAK & RANK TIER</span>
            <div className="text-2xl font-bold font-mono text-amber-400">
              {streakCount} Days <span className="text-sm font-normal text-zinc-400">({xp} XP)</span>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
            <span className={`font-semibold flex items-center gap-1.5 ${rank.color}`}>
              <Trophy className="w-3.5 h-3.5" />
              {rank.title}
            </span>
            <span className="text-[10px] text-zinc-500">Level {rank.level}</span>
          </div>
        </div>
      </div>

      {/* Accuracy by Question Type (MCQ vs MSQ vs NAT) */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-6 shadow-xl">
        <h3 className="text-sm font-bold font-mono text-zinc-200 mb-4">
          ACCURACY BREAKDOWN BY QUESTION TAXONOMY
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* MCQ */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400 font-bold">MCQ (Multiple Choice)</span>
              <span className="text-cyan-400 font-bold">
                {mcqTotal > 0 ? Math.round((mcqCorrect / mcqTotal) * 100) : 0}%
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              {mcqCorrect} of {mcqTotal} solved. High penalty (-0.33 / -0.66). Practice zero-guessing!
            </p>
          </div>

          {/* MSQ */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400 font-bold">MSQ (Multiple Select)</span>
              <span className="text-cyan-400 font-bold">
                {msqTotal > 0 ? Math.round((msqCorrect / msqTotal) * 100) : 0}%
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              {msqCorrect} of {msqTotal} solved. No negative marking, but all choices must match.
            </p>
          </div>

          {/* NAT */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-zinc-400 font-bold">NAT (Numerical Answer)</span>
              <span className="text-emerald-400 font-bold">
                {natTotal > 0 ? Math.round((natCorrect / natTotal) * 100) : 0}%
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              {natCorrect} of {natTotal} solved. Zero negative marking. Master Virtual Calculator!
            </p>
          </div>
        </div>
      </div>

      {/* Offline Data Vault (Export & Restore) */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold font-mono text-zinc-200 border-b border-zinc-800 pb-2">
          OFFLINE DATA VAULT & BACKUP RESTORE
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-300 font-mono">
              Your data is stored 100% locally in your browser (offline-first).
            </p>
            <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
              Export your full study logs, mistake diary, and personal notes as a portable JSON snapshot anytime.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 text-xs font-mono font-bold transition-all touch-manipulation cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              <Download className="w-3.5 h-3.5" /> EXPORT BACKUP (.JSON)
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all tasks and history to defaults?')) {
                  resetAll();
                }
              }}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-zinc-950 hover:bg-rose-950 border border-zinc-800 hover:border-rose-800 text-zinc-500 hover:text-rose-400 text-xs font-mono transition-all touch-manipulation cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset All
            </button>
          </div>
        </div>

        {/* Restore Section */}
        <div className="pt-2">
          <label className="block text-xs font-mono text-zinc-400 mb-1">
            RESTORE FROM JSON BACKUP FILE
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste JSON backup content here to restore..."
              rows={2}
              className="flex-1 text-xs p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono focus:outline-none focus:border-cyan-500 resize-none"
            />
            <button
              onClick={handleImport}
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono w-full sm:w-auto h-auto transition-colors touch-manipulation cursor-pointer"
            >
              Restore State
            </button>
          </div>
          {importStatus && (
            <p className="text-xs font-mono text-cyan-400 mt-2">{importStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
};
