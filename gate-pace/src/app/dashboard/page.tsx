'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PrecisionTimer } from '@/components/PrecisionTimer';
import { PYQDrillLogger } from '@/components/PYQDrillLogger';
import { MistakeDiary } from '@/components/MistakeDiary';
import { FormulaVault } from '@/components/FormulaVault';
import { ResourcesHub } from '@/components/ResourcesHub';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import {
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  BookOpen
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    'analytics' | 'timer' | 'pyq' | 'mistakes' | 'formulas' | 'resources'
  >('analytics');

  const tabs = [
    { id: 'analytics', label: 'Velocity & KPIs', icon: BarChart3 },
    { id: 'timer', label: 'Precision Timer & Log', icon: Clock },
    { id: 'pyq', label: 'PYQ Drill Logger', icon: CheckCircle2 },
    { id: 'mistakes', label: 'Mistake Diary', icon: AlertTriangle },
    { id: 'formulas', label: 'Formula Deck & Cards', icon: FileText },
    { id: 'resources', label: 'Notes & Resources', icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 pb-24 md:pb-10">
        {/* Dashboard Sub-Tabs Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-zinc-800 pb-3">
          <div>
            <h1 className="text-lg sm:text-2xl font-black font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
              PERFORMANCE MONITORING
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
              Track velocity, question accuracy by taxonomy, stopwatch session logs, and error scrubbing.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-none text-xs font-mono touch-scroll w-full sm:w-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer touch-manipulation ${
                    isActive
                      ? 'bg-cyan-600 text-white font-bold shadow-sm'
                      : 'bg-slate-200/80 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent hover:border-slate-300 dark:hover:border-zinc-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300">
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'timer' && <PrecisionTimer />}
          {activeTab === 'pyq' && <PYQDrillLogger />}
          {activeTab === 'mistakes' && <MistakeDiary />}
          {activeTab === 'formulas' && <FormulaVault />}
          {activeTab === 'resources' && <ResourcesHub />}
        </div>
      </main>
    </div>
  );
}
