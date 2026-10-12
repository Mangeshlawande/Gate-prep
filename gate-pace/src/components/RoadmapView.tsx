'use client';

import React, { useState } from 'react';
import { useGateStore } from '@/store/gateStore';
import { GATE_90_DAYS_CURRICULUM, DayCurriculum } from '@/data/curriculum';
import { Map, CheckCircle2, Clock, Calendar, ArrowRight, Zap } from 'lucide-react';

interface RoadmapViewProps {
  onSelectDay: (dayNumber: number) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onSelectDay }) => {
  const { activeDay, tasks } = useGateStore();
  const [selectedPhase, setSelectedPhase] = useState<string>('ALL');

  const filteredDays = GATE_90_DAYS_CURRICULUM.filter((d) => {
    if (selectedPhase === 'ALL') return true;
    return d.phase === selectedPhase;
  });

  // Helper to determine day completion status
  const getDayStatus = (dayNum: number) => {
    const b1 = tasks[`day-${dayNum}-b1`];
    const b2 = tasks[`day-${dayNum}-b2`];
    const b3 = tasks[`day-${dayNum}-b3`];

    const currentTasks = [b1, b2, b3].filter(Boolean);
    const doneCount = currentTasks.filter((t) => t.status === 'done').length;

    if (doneCount === 3) return 'DONE';
    if (doneCount > 0) return 'IN_PROGRESS';
    if (dayNum === activeDay) return 'ACTIVE';
    return 'UPCOMING';
  };

  // Stats
  const totalCompletedDays = GATE_90_DAYS_CURRICULUM.filter(
    (d) => getDayStatus(d.dayNumber) === 'DONE'
  ).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 shrink-0">
                <Map className="w-4 h-4" />
              </span>
              <h2 className="text-base sm:text-lg font-bold font-mono text-zinc-100">
                90-DAY PSU VELOCITY TIMELINE & CURRICULUM MATRIX
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              3-Block daily architecture across all 10 GATE CS technical areas, Engineering Math, and Aptitude.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
              Completed: <strong className="text-emerald-400">{totalCompletedDays}</strong> / 90 Days
            </span>
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-scroll mt-4 -mx-2 px-2 sm:mx-0 sm:px-0">
          {[
            { id: 'ALL', label: 'All 90 Days' },
            { id: 'CORE_FOUNDATION', label: 'Phase 1: High-Yield Core (Days 1–30)' },
            { id: 'SYSTEMS_AND_THEORY', label: 'Phase 2: Systems & Theory (Days 31–60)' },
            { id: 'WAR_ROOM_MOCKS', label: 'Phase 3: Architecture & War-Room (Days 61–90)' }
          ].map((phase) => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all touch-manipulation cursor-pointer ${
                selectedPhase === phase.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-600 font-bold shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {phase.label}
            </button>
          ))}
        </div>
      </div>

      {/* Days Interactive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDays.map((day) => {
          const status = getDayStatus(day.dayNumber);
          const isCurrentDay = day.dayNumber === activeDay;

          return (
            <div
              key={day.dayNumber}
              onClick={() => onSelectDay(day.dayNumber)}
              className={`rounded-2xl p-4 sm:p-5 border cursor-pointer transition-all hover:scale-[1.01] touch-manipulation ${
                isCurrentDay
                  ? 'bg-zinc-900 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/50'
                  : status === 'DONE'
                  ? 'bg-zinc-950/80 border-emerald-900/60 hover:border-emerald-700'
                  : status === 'IN_PROGRESS'
                  ? 'bg-zinc-900/90 border-amber-900/50 hover:border-amber-700'
                  : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono font-bold text-sm ${
                      isCurrentDay ? 'text-cyan-400' : 'text-zinc-200'
                    }`}
                  >
                    DAY {day.dayNumber}
                  </span>
                  {isCurrentDay && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300">
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Status Indicator */}
                <div>
                  {status === 'DONE' && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Done
                    </span>
                  )}
                  {status === 'IN_PROGRESS' && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400">
                      <Clock className="w-3.5 h-3.5" /> Partial
                    </span>
                  )}
                  {status === 'UPCOMING' && (
                    <span className="text-[11px] font-mono text-zinc-600">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>

              {/* Subject & Topics */}
              <div className="mt-3 space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-cyan-300 border border-zinc-700 block w-fit">
                  {day.subject}
                </span>
                <h4 className="text-sm font-bold text-zinc-200 line-clamp-2 leading-snug">
                  {day.techFocus}
                </h4>
                <p className="text-xs text-zinc-400 font-mono line-clamp-1">
                  Evening: {day.eveningFocus}
                </p>
              </div>

              {/* Footer CTA */}
              <div className="mt-4 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-cyan-400 group">
                <span>Open Command Center</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
