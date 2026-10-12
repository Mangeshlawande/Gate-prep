'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CommandCenter } from '@/components/CommandCenter';
import { RoadmapView } from '@/components/RoadmapView';
import { WeeklyPlanView } from '@/components/WeeklyPlanView';
import { useGateStore } from '@/store/gateStore';
import { Target, Map, CalendarDays } from 'lucide-react';

export default function TasksPage() {
  const [taskView, setTaskView] = useState<'today' | 'weekly' | 'roadmap'>('today');
  const { setActiveDay } = useGateStore();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 pb-24 md:pb-10">
        {/* View Switcher Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-zinc-800 pb-3">
          <div>
            <h1 className="text-lg sm:text-2xl font-black font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
              DAILY TASKS & 90-DAY COMMAND
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
              3 Daily study blocks: Morning technical, afternoon timed PYQs, evening aptitude & error scrub.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 bg-slate-200/80 dark:bg-zinc-900 p-1 rounded-xl border border-slate-300 dark:border-zinc-800 text-xs font-mono w-full sm:w-auto">
            <button
              onClick={() => setTaskView('today')}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                taskView === 'today'
                  ? 'bg-cyan-600 text-white font-bold shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Target className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Today</span>
            </button>
            <button
              onClick={() => setTaskView('weekly')}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                taskView === 'weekly'
                  ? 'bg-cyan-600 text-white font-bold shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Weekly</span>
            </button>
            <button
              onClick={() => setTaskView('roadmap')}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-lg transition-colors cursor-pointer text-center ${
                taskView === 'roadmap'
                  ? 'bg-cyan-600 text-white font-bold shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Map className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Matrix</span>
            </button>
          </div>
        </div>

        {/* View Content */}
        {taskView === 'today' ? (
          <CommandCenter />
        ) : taskView === 'weekly' ? (
          <WeeklyPlanView />
        ) : (
          <RoadmapView
            onSelectDay={(dayNum) => {
              setActiveDay(dayNum);
              setTaskView('today');
            }}
          />
        )}
      </main>
    </div>
  );
}
