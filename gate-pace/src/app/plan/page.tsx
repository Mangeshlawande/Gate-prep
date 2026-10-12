import React from 'react';
import { Navbar } from '@/components/Navbar';
import { WeeklyPlanView } from '@/components/WeeklyPlanView';

export const metadata = {
  title: 'Weekly Build Plan & Hourly Tasks | GATE-PACE',
  description: 'Detailed weekly topic tasks and hourly schedule breakdown across Phase 1, Phase 2, and Phase 3 for GATE CS & IT.'
};

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 pb-24 md:pb-10">
        <WeeklyPlanView />
      </main>
    </div>
  );
}
