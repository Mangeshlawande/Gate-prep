'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Gate2027Portal } from '@/components/Gate2027Portal';
import Link from 'next/link';
import {
  BookOpen,
  CheckSquare,
  BarChart2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Bot
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar with Page Links, Live Reactive Task Progress in GATE Aspirant badge, and Light/Dark Switcher */}
      <Navbar />

      {/* Main Home Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Sub-Header Navigation Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-zinc-800 dark:text-zinc-200">GATE 2027 PORTAL ACTIVE</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-500 dark:text-zinc-400">Direct Page Links:</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <Link
              href="/syllabus"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-cyan-50 dark:hover:bg-cyan-950 text-zinc-700 dark:text-zinc-300 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-zinc-700 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Detailed Syllabus</span>
            </Link>

            <Link
              href="/tasks"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-zinc-700 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200 dark:border-zinc-700 transition-colors"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Daily Tasks</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-purple-50 dark:hover:bg-purple-950 text-zinc-700 dark:text-zinc-300 hover:text-purple-700 dark:hover:text-purple-300 border border-slate-200 dark:border-zinc-700 transition-colors"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Dashboard & Monitor</span>
            </Link>

            <Link
              href="/bot"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-cyan-50 dark:hover:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 transition-colors font-bold"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Guide Bot</span>
            </Link>
          </div>
        </div>

        {/* Central GATE 2027 Information Portal */}
        <Gate2027Portal />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-6 px-4 text-center text-xs font-mono text-zinc-500 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-600 dark:text-cyan-400">GATE-Pace 2027</span>
            <span>•</span>
            <span>IIT Madras Official Pattern & 90-Day Velocity Engine</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-500">
            <Link href="/syllabus" className="hover:underline">Detailed Syllabus</Link>
            <Link href="/tasks" className="hover:underline">Daily Tasks</Link>
            <Link href="/dashboard" className="hover:underline">Monitoring Dashboard</Link>
            <Link href="/bot" className="hover:underline text-cyan-600 dark:text-cyan-400 font-bold">AI Guide Bot</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
