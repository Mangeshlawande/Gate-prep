'use client';

import React, { useState, useEffect } from 'react';
import { useGateStore, StudySession } from '@/store/gateStore';
import { soundEngine } from '@/utils/audio';
import { Play, Pause, RotateCcw, Clock, Plus, Trash2, CheckCircle2, Flame, BookMarked, Headphones } from 'lucide-react';

const GATE_SUBJECTS = [
  'Programming in C',
  'Data Structures',
  'Algorithms',
  'Theory of Computation',
  'Compiler Design',
  'Operating Systems',
  'Databases (DBMS)',
  'Computer Organization and Architecture',
  'Computer Networks',
  'Digital Logic',
  'Discrete Mathematics',
  'Engineering Mathematics',
  'General Aptitude',
  'Full Length Mock / Test Analysis'
];

export const PrecisionTimer: React.FC = () => {
  const {
    activeDay,
    selectedDate,
    studySessions,
    logStudySession,
    deleteStudySession,
    soundEnabled,
    activeAmbience,
    setAmbience
  } = useGateStore();

  // Timer Mode: 'stopwatch' | 'pomodoro'
  const [timerMode, setTimerMode] = useState<'stopwatch' | 'pomodoro'>('stopwatch');
  const [pomodoroTargetMins, setPomodoroTargetMins] = useState<number>(25);
  
  // Timer State
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [sessionStartTime, setSessionStartTime] = useState<string>('');

  // Form State for logging
  const [selectedSubject, setSelectedSubject] = useState<string>(GATE_SUBJECTS[0]);
  const [selectedBlock, setSelectedBlock] = useState<string>('Block 1: Technical Focus');
  const [whatIDidText, setWhatIDidText] = useState<string>('');

  // Timer Tick Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (timerMode === 'pomodoro' && prev >= pomodoroTargetMins * 60) {
            setIsActive(false);
            if (soundEnabled) soundEngine.playSuccess();
            return pomodoroTargetMins * 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, timerMode, pomodoroTargetMins, soundEnabled]);

  const handleStart = () => {
    if (!isActive && !sessionStartTime) {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setSessionStartTime(timeStr);
    }
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
    setSessionStartTime('');
  };

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const durationMinutes = Math.max(1, Math.round(seconds / 60));
    const now = new Date();
    const fallbackTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    logStudySession({
      date: selectedDate,
      dayNumber: activeDay,
      subject: selectedSubject,
      block: selectedBlock,
      startTime: sessionStartTime || fallbackTime,
      durationMinutes,
      whatIDid: whatIDidText || `Studied ${selectedSubject}`
    });

    // Reset timer and form
    handleReset();
    setWhatIDidText('');
  };

  // Format MM:SS or HH:MM:SS
  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Filter study sessions for the selected date
  const todaySessions = studySessions.filter((s) => s.date === selectedDate);
  const totalMinutesToday = todaySessions.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Big Focus Timer (5 cols) */}
      <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-cyan-950 p-6 shadow-xl flex flex-col items-center justify-between relative overflow-hidden">
        {/* Glow behind timer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Timer Mode Switcher */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800 relative z-10">
          <span className="text-xs font-mono font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> PRECISION STUDY STOPWATCH
          </span>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-950 p-1 rounded-lg border border-slate-300 dark:border-zinc-800 text-xs">
            <button
              onClick={() => { setTimerMode('stopwatch'); handleReset(); }}
              className={`px-2.5 py-1 rounded font-mono transition-colors ${
                timerMode === 'stopwatch'
                  ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 font-bold'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              Stopwatch
            </button>
            <button
              onClick={() => { setTimerMode('pomodoro'); handleReset(); }}
              className={`px-2.5 py-1 rounded font-mono transition-colors ${
                timerMode === 'pomodoro'
                  ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 font-bold'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
              }`}
            >
              Pomodoro
            </button>
          </div>
        </div>

        {/* Big Neon Time Display */}
        <div className="my-8 flex flex-col items-center relative z-10">
          <div className="text-5xl sm:text-6xl font-black font-mono tracking-wider text-cyan-600 dark:text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            {formatTime(seconds)}
          </div>
          <span className="text-xs font-mono text-zinc-500 mt-2">
            {isActive ? 'STATUS: SESSION RUNNING...' : 'STATUS: PAUSED / READY'}
          </span>

          {timerMode === 'pomodoro' && (
            <div className="flex items-center gap-2 mt-4">
              {[25, 45, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => { setPomodoroTargetMins(mins); handleReset(); }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                    pomodoroTargetMins === mins
                      ? 'bg-cyan-100 dark:bg-cyan-950 border-cyan-300 dark:border-cyan-600 text-cyan-900 dark:text-cyan-300 font-bold'
                      : 'bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Timer Play / Pause / Reset Controls */}
        <div className="flex items-center gap-3 w-full justify-center relative z-10">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-bold font-mono text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" /> START TIMER
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold font-mono text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95 cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-current" /> PAUSE
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Focus Ambience Soundscape */}
        <div className="w-full mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono relative z-10">
          <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <Headphones className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Focus Ambience:</span>
          </span>
          <select
            value={activeAmbience}
            onChange={(e) => setAmbience(e.target.value as 'none' | 'binaural_40hz' | 'brown_noise' | 'white_noise')}
            className="bg-slate-100 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs py-1 px-2 rounded-lg outline-none font-mono cursor-pointer"
            title="Ambient Study Noise Generator"
          >
            <option value="none">Off</option>
            <option value="binaural_40hz">40Hz Gamma Focus</option>
            <option value="brown_noise">Deep Brown Noise</option>
            <option value="white_noise">White Noise Shield</option>
          </select>
        </div>
      </div>

      {/* Right Column: Detailing "What I Did" & Session History (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Logger Form Card */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800">
            <h3 className="text-sm font-bold font-mono text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              LOG STUDY SESSION ("WHAT I DID & WHEN")
            </h3>
            <span className="text-xs font-mono text-zinc-500">
              Elapsed: {Math.max(1, Math.round(seconds / 60))} mins
            </span>
          </div>

          <form onSubmit={handleLogActivity} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1">
                  SUBJECT
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  {GATE_SUBJECTS.map((s) => (
                    <option key={s} value={s} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1">
                  DAILY BLOCK
                </label>
                <select
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="Block 1: Technical Focus" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Block 1 (Morning Technical)</option>
                  <option value="Block 2: PYQ Timed Drill" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Block 2 (Afternoon PYQ Drill)</option>
                  <option value="Block 3: Aptitude & Mistake Scrub" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Block 3 (Evening Math/Aptitude)</option>
                  <option value="Extra Revision / Test" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">Extra Revision / Night War Room</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-1">
                PRECISE ACTIVITY DETAILS ("WHAT DID YOU ACCOMPLISH?")
              </label>
              <textarea
                value={whatIDidText}
                onChange={(e) => setWhatIDidText(e.target.value)}
                placeholder="e.g., Derived Floyd-Warshall DP matrix; Solved 15 GateOverflow questions on Pointers; Revised Paging formulas..."
                rows={2}
                className="w-full text-xs p-3 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-cyan-500 font-mono resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 flex items-center gap-1 font-semibold">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Earns +{Math.max(2, Math.round((seconds / 60) * 2))} XP upon logging
              </span>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-950 dark:hover:bg-cyan-900 border border-cyan-500 dark:border-cyan-700 text-white dark:text-cyan-300 font-mono text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> LOG THIS SESSION
              </button>
            </div>
          </form>
        </div>

        {/* Activity Log Timeline for Selected Date */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800">
            <h3 className="text-sm font-bold font-mono text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              TIMELINE FOR {selectedDate}
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800">
              Total: {totalMinutesToday} mins ({(totalMinutesToday / 60).toFixed(1)} hrs)
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {todaySessions.length === 0 ? (
              <div className="text-center py-8 text-zinc-500 font-mono text-xs">
                No study sessions logged for {selectedDate} yet. Use the timer above to record your focus blocks!
              </div>
            ) : (
              todaySessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-cyan-700 dark:text-cyan-300">
                        {session.subject}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400">
                        {session.block}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        @ {session.startTime} ({session.durationMinutes} mins)
                      </span>
                    </div>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                      {session.whatIDid}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteStudySession(session.id)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-rose-500 p-1.5 transition-opacity"
                    title="Delete session"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
