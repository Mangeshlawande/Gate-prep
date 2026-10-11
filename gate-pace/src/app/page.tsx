'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { CommandCenter } from '@/components/CommandCenter';
import { PrecisionTimer } from '@/components/PrecisionTimer';
import { PYQDrillLogger } from '@/components/PYQDrillLogger';
import { MistakeDiary } from '@/components/MistakeDiary';
import { FormulaVault } from '@/components/FormulaVault';
import { ResourcesHub } from '@/components/ResourcesHub';
import { RoadmapView } from '@/components/RoadmapView';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { useGateStore } from '@/store/gateStore';
import {
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  BookOpen,
  Map,
  BarChart3,
  Sparkles,
  Zap
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<
    'command' | 'timer' | 'pyq' | 'mistakes' | 'formulas' | 'resources' | 'roadmap' | 'analytics'
  >('command');

  const { activeDay, setActiveDay, checkAndUpdateStreak } = useGateStore();

  // Streak check on initial mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    checkAndUpdateStreak(today);
  }, [checkAndUpdateStreak]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input or textarea
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        return;
      }

      if (e.key === 'j' || e.key === 'J') {
        if (activeDay > 1) setActiveDay(activeDay - 1);
      } else if (e.key === 'k' || e.key === 'K') {
        if (activeDay < 90) setActiveDay(activeDay + 1);
      } else if (e.key === '1') {
        setActiveTab('command');
      } else if (e.key === '2') {
        setActiveTab('timer');
      } else if (e.key === '3') {
        setActiveTab('pyq');
      } else if (e.key === '4') {
        setActiveTab('mistakes');
      } else if (e.key === '5') {
        setActiveTab('formulas');
      } else if (e.key === '6') {
        setActiveTab('resources');
      } else if (e.key === '7') {
        setActiveTab('roadmap');
      } else if (e.key === '8') {
        setActiveTab('analytics');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDay, setActiveDay]);

  const navTabs = [
    { id: 'command', label: 'Command Center', icon: Target, badge: `Day ${activeDay}` },
    { id: 'timer', label: 'Precision Timer', icon: Clock, badge: 'What I Did' },
    { id: 'pyq', label: 'PYQ Drill Logger', icon: CheckCircle2, badge: 'Drill' },
    { id: 'mistakes', label: 'Mistake Diary', icon: AlertTriangle, badge: 'Taxonomy' },
    { id: 'formulas', label: 'Formula Deck', icon: FileText, badge: 'Flashcards' },
    { id: 'resources', label: 'Notes & GfG', icon: BookOpen, badge: 'Resources' },
    { id: 'roadmap', label: '90-Day Roadmap', icon: Map, badge: '1-90' },
    { id: 'analytics', label: 'Velocity & Data', icon: BarChart3, badge: 'Analytics' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-zinc-950">
      {/* Top Navbar with Gamification & Rank HUD */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Secondary Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800/80">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950/80 border border-cyan-500/60 text-cyan-300 font-bold shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                    : 'bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      isActive
                        ? 'bg-cyan-900/60 text-cyan-300'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab View Router */}
        <div className="transition-all duration-300">
          {activeTab === 'command' && <CommandCenter />}
          {activeTab === 'timer' && <PrecisionTimer />}
          {activeTab === 'pyq' && <PYQDrillLogger />}
          {activeTab === 'mistakes' && <MistakeDiary />}
          {activeTab === 'formulas' && <FormulaVault />}
          {activeTab === 'resources' && <ResourcesHub />}
          {activeTab === 'roadmap' && (
            <RoadmapView
              onSelectDay={(dayNum) => {
                setActiveDay(dayNum);
                setActiveTab('command');
              }}
            />
          )}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
        </div>
      </main>

      {/* Cyber-Focus Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/90 py-4 px-4 text-center text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>GATE-Pace 90-Day PSU Velocity Engine</span>
            <span>•</span>
            <span className="text-zinc-400">Offline-First PWA Mode Active</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-zinc-600">
            <span>Keys: [J] Prev Day / [K] Next Day / [1-8] Jump Tabs</span>
            <span>•</span>
            <span>Target: PSU AIR &lt; 250</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
