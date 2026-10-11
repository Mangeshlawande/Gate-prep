'use client';

import React, { useState, useEffect } from 'react';
import { useGateStore, PYQLog, ErrorTaxonomy } from '@/store/gateStore';
import { soundEngine } from '@/utils/audio';
import {
  Timer,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Trash2,
  Calendar,
  Filter,
  Plus,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const SUBJECT_LIST = [
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
  'General Aptitude'
];

export const PYQDrillLogger: React.FC = () => {
  const {
    activeDay,
    selectedDate,
    pyqLogs,
    logPYQ,
    deletePYQ,
    addMistake,
    soundEnabled
  } = useGateStore();

  // Stopwatch for the active question
  const [qSeconds, setQSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [warningTriggered, setWarningTriggered] = useState<boolean>(false);
  const [circuitBreakerTriggered, setCircuitBreakerTriggered] = useState<boolean>(false);

  // Form Fields
  const [qNumber, setQNumber] = useState<number>(1);
  const [subject, setSubject] = useState<string>(SUBJECT_LIST[0]);
  const [topic, setTopic] = useState<string>('');
  const [qType, setQType] = useState<'MCQ' | 'MSQ' | 'NAT'>('MCQ');
  const [gateYear, setGateYear] = useState<string>('GATE 2024');
  const [qNotes, setQNotes] = useState<string>('');

  // Transfer to mistake diary state
  const [sendToMistakeModal, setSendToMistakeModal] = useState<PYQLog | null>(null);
  const [selectedErrorCategory, setSelectedErrorCategory] = useState<ErrorTaxonomy>('CONCEPTUAL_GAP');
  const [blunderNote, setBlunderNote] = useState<string>('');

  // Date filter for historical questions log
  const [filterDate, setFilterDate] = useState<string>(selectedDate);

  // Per-question timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setQSeconds((prev) => {
          const next = prev + 1;
          // Soft Warning at 2:00 mins (120 seconds)
          if (next === 120 && !warningTriggered) {
            setWarningTriggered(true);
            if (soundEnabled) soundEngine.playPacingWarning();
          }
          // Hard Circuit Breaker at 3:30 mins (210 seconds)
          if (next === 210 && !circuitBreakerTriggered) {
            setCircuitBreakerTriggered(true);
            if (soundEnabled) soundEngine.playCircuitBreaker();
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, warningTriggered, circuitBreakerTriggered, soundEnabled]);

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setQSeconds(0);
    setWarningTriggered(false);
    setCircuitBreakerTriggered(false);
  };

  const formatSeconds = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleRecordQuestion = (status: PYQLog['status']) => {
    const entry: Omit<PYQLog, 'id'> = {
      date: selectedDate,
      dayNumber: activeDay,
      questionNumber: qNumber,
      subject,
      topic: topic || `${subject} Practice`,
      questionType: qType,
      timeTakenSeconds: qSeconds,
      status,
      gateYear,
      notes: qNotes
    };

    logPYQ(entry);

    // Auto-advance question number
    setQNumber((prev) => prev + 1);
    setQNotes('');
    handleResetTimer();
  };

  const handleConfirmSendToMistake = () => {
    if (!sendToMistakeModal) return;

    addMistake({
      date: sendToMistakeModal.date,
      dayNumber: sendToMistakeModal.dayNumber,
      subject: sendToMistakeModal.subject,
      topic: sendToMistakeModal.topic,
      errorCategory: selectedErrorCategory,
      problemStatement: `Question #${sendToMistakeModal.questionNumber} (${sendToMistakeModal.gateYear || 'PYQ'} - ${sendToMistakeModal.questionType}): ${sendToMistakeModal.notes || 'No description provided'}`,
      userError: blunderNote || 'Trapped by time pressure or misread option/boundary condition.',
      correctApproach: 'Review authoritative formula / textbook definition.',
      referenceLinks: [`https://gateoverflow.in/search?q=${encodeURIComponent(sendToMistakeModal.subject)}`]
    });

    setSendToMistakeModal(null);
    setBlunderNote('');
  };

  // Filtered Questions Log
  const filteredQuestions = pyqLogs.filter((q) => {
    if (!filterDate) return true;
    return q.date === filterDate;
  });

  const correctFirstTryCount = filteredQuestions.filter((q) => q.status === 'CORRECT_FIRST_TRY').length;
  const correctSlowCount = filteredQuestions.filter((q) => q.status === 'CORRECT_SLOW').length;
  const incorrectCount = filteredQuestions.filter((q) => q.status === 'INCORRECT').length;
  const stuckCount = filteredQuestions.filter((q) => q.status === 'UNATTEMPTED_STUCK').length;
  const totalCount = filteredQuestions.length;
  const accuracyPercent = totalCount > 0 ? Math.round(((correctFirstTryCount + correctSlowCount) / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Section: Timed Drill Station */}
      <div className="rounded-2xl bg-zinc-900/90 border border-cyan-950 p-6 shadow-xl relative overflow-hidden">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          {/* Question Stopwatch Indicator */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-950 border border-zinc-800 min-w-[200px]">
              <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 mb-1">
                <Timer className="w-3.5 h-3.5 text-cyan-400" />
                PYQ STOPWATCH
              </span>
              <div
                className={`text-4xl font-mono font-black tracking-wider transition-colors ${
                  circuitBreakerTriggered
                    ? 'text-rose-400 animate-bounce'
                    : warningTriggered
                    ? 'text-amber-400 animate-pulse'
                    : 'text-cyan-400'
                }`}
              >
                {formatSeconds(qSeconds)}
              </div>

              {/* Status Message */}
              <div className="text-[10px] font-mono mt-2 text-center">
                {circuitBreakerTriggered ? (
                  <span className="text-rose-400 font-bold">
                    ⚠️ 3:30+ CIRCUIT BREAKER! FLAG OR SKIP!
                  </span>
                ) : warningTriggered ? (
                  <span className="text-amber-400 font-semibold">
                    ⏳ 2:00+ Soft Pacing Alert
                  </span>
                ) : (
                  <span className="text-zinc-500">Pacing Target: &lt; 2:00 mins</span>
                )}
              </div>

              {/* Mini Controls */}
              <div className="flex items-center gap-2 mt-3">
                {!isTimerRunning ? (
                  <button
                    onClick={handleStartTimer}
                    className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-900 transition-colors"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={handlePauseTimer}
                    className="px-3 py-1 rounded-lg bg-amber-950 border border-amber-700 text-amber-300 text-xs font-mono font-bold hover:bg-amber-900 transition-colors"
                  >
                    Pause
                  </button>
                )}
                <button
                  onClick={handleResetTimer}
                  className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs font-mono hover:text-zinc-200 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Question Details Input */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  QUESTION #
                </label>
                <input
                  type="number"
                  min={1}
                  max={65}
                  value={qNumber}
                  onChange={(e) => setQNumber(Number(e.target.value))}
                  className="w-full text-xs p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  TYPE
                </label>
                <select
                  value={qType}
                  onChange={(e) => setQType(e.target.value as 'MCQ' | 'MSQ' | 'NAT')}
                  className="w-full text-xs p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono focus:outline-none focus:border-cyan-500"
                >
                  <option value="MCQ">MCQ (-0.33 / -0.66)</option>
                  <option value="MSQ">MSQ (No Neg)</option>
                  <option value="NAT">NAT (No Neg)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  SUBJECT
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono focus:outline-none focus:border-cyan-500"
                >
                  {SUBJECT_LIST.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  SOURCE / YEAR
                </label>
                <input
                  type="text"
                  value={gateYear}
                  onChange={(e) => setGateYear(e.target.value)}
                  placeholder="e.g. 2024-Set1"
                  className="w-full text-xs p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="col-span-2 sm:col-span-4">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Topic / Trap Keyword (e.g. Pointers, Floyd Cycle, Peterson's Algo, LR Parsing)..."
                  className="w-full text-xs p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Quick Submit Buttons (Status) */}
          <div className="flex flex-col gap-2 w-full lg:w-48">
            <span className="text-[11px] font-mono text-zinc-500 text-center">
              LOG RESULT & ADVANCE
            </span>
            <button
              onClick={() => handleRecordQuestion('CORRECT_FIRST_TRY')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/70 text-emerald-300 font-mono text-xs font-bold transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> CORRECT (&lt;2m)
            </button>
            <button
              onClick={() => handleRecordQuestion('CORRECT_SLOW')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-600/70 text-cyan-300 font-mono text-xs font-bold transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> CORRECT (SLOW)
            </button>
            <button
              onClick={() => handleRecordQuestion('INCORRECT')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-600/70 text-rose-300 font-mono text-xs font-bold transition-all"
            >
              <XCircle className="w-3.5 h-3.5 text-rose-400" /> INCORRECT
            </button>
            <button
              onClick={() => handleRecordQuestion('UNATTEMPTED_STUCK')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-600/70 text-amber-300 font-mono text-xs font-bold transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> STUCK / SKIPPED
            </button>
          </div>
        </div>
      </div>

      {/* Date Filter & Analytics Summary Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-zinc-400">View Questions on Date:</span>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="text-xs px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
          />
          <button
            onClick={() => setFilterDate('')}
            className="text-xs text-cyan-400 hover:underline font-mono ml-2"
          >
            Show All
          </button>
        </div>

        {/* Accuracy and Count Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
            Total: <strong className="text-cyan-400">{totalCount}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-900 text-emerald-400">
            Correct: {correctFirstTryCount + correctSlowCount}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-900 text-rose-400">
            Incorrect: {incorrectCount}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-900 text-amber-400">
            Stuck: {stuckCount}
          </span>
          <span className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold">
            Accuracy: {accuracyPercent}%
          </span>
        </div>
      </div>

      {/* Questions List for the Date */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 shadow-xl">
        <h3 className="text-sm font-bold font-mono text-zinc-200 mb-4 flex items-center justify-between">
          <span>QUESTIONS LOGGED FOR {filterDate || 'ALL DATES'}</span>
          <span className="text-xs text-zinc-500 font-normal">
            Click "Send to Mistake Diary" for any wrong/stuck question
          </span>
        </h3>

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 font-mono text-xs">
            No practice questions logged for {filterDate || 'this date'}. Start solving using the stopwatch above!
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 transition-colors group"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      Q#{q.questionNumber}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {q.questionType}
                    </span>
                    <span className="text-xs font-mono font-semibold text-zinc-200">
                      {q.subject}
                    </span>
                    <span className="text-xs text-zinc-400">
                      • {q.topic}
                    </span>
                    {q.gateYear && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {q.gateYear}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono flex items-center gap-2">
                    <span>Date: {q.date} (Day {q.dayNumber})</span>
                    <span>•</span>
                    <span>Time: {Math.floor(q.timeTakenSeconds / 60)}m {q.timeTakenSeconds % 60}s</span>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* Status Badge */}
                  {q.status === 'CORRECT_FIRST_TRY' && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-emerald-950 border border-emerald-700 text-emerald-400">
                      Correct (&lt;2m)
                    </span>
                  )}
                  {q.status === 'CORRECT_SLOW' && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-cyan-950 border border-cyan-700 text-cyan-400">
                      Correct (Slow)
                    </span>
                  )}
                  {q.status === 'INCORRECT' && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-rose-950 border border-rose-700 text-rose-400">
                      Incorrect
                    </span>
                  )}
                  {q.status === 'UNATTEMPTED_STUCK' && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-amber-950 border border-amber-700 text-amber-400">
                      Stuck / Skipped
                    </span>
                  )}

                  {/* 1-Click Send to Mistake Diary */}
                  {(q.status === 'INCORRECT' || q.status === 'UNATTEMPTED_STUCK') && (
                    <button
                      onClick={() => setSendToMistakeModal(q)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-rose-950 text-rose-300 hover:text-rose-200 border border-zinc-700 hover:border-rose-600 text-xs font-mono transition-all flex items-center gap-1"
                      title="Send to Mistake Diary"
                    >
                      <span>Error Log</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={() => deletePYQ(q.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded text-zinc-600 hover:text-rose-400 transition-opacity"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Send to Mistake Diary Modal */}
      {sendToMistakeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-rose-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold font-mono text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> SEND TO MISTAKE DIARY
              </h3>
              <button
                onClick={() => setSendToMistakeModal(null)}
                className="text-zinc-500 hover:text-zinc-300 font-mono text-sm"
              >
                Cancel
              </button>
            </div>

            <div>
              <p className="text-xs text-zinc-300 font-mono">
                Transferring <strong>Q#{sendToMistakeModal.questionNumber}</strong> ({sendToMistakeModal.subject} - {sendToMistakeModal.topic}) into Cognitive Error Taxonomy.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                COGNITIVE ROOT CAUSE TAXONOMY
              </label>
              <select
                value={selectedErrorCategory}
                onChange={(e) => setSelectedErrorCategory(e.target.value as ErrorTaxonomy)}
                className="w-full text-xs p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-rose-500 font-mono"
              >
                <option value="CALCULATION_ARITHMETIC">Calculation / Arithmetic Slip</option>
                <option value="MISREAD_QUESTION">Misread Question / Missed 'NOT' / Units</option>
                <option value="EDGE_CASE_BLINDSPOT">Edge Case Blindspot (0, 1, empty set, etc.)</option>
                <option value="CONCEPTUAL_GAP">Conceptual Gap / Formula Forgotten</option>
                <option value="TIME_PRESSURE">Time Pressure Panic / Rushed Guess</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">
                USER BLUNDER NOTE ("WHY DID I MAKE THIS MISTAKE?")
              </label>
              <textarea
                value={blunderNote}
                onChange={(e) => setBlunderNote(e.target.value)}
                placeholder="e.g. Forgot to divide fragment offset by 8; Confused SLR with LALR reduce action; Missed bipartite graph condition..."
                rows={3}
                className="w-full text-xs p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-rose-500 font-mono resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => setSendToMistakeModal(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSendToMistake}
                className="px-4 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-700 text-rose-300 text-xs font-mono font-bold transition-all"
              >
                Log Into Mistake Diary (+25 XP)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
