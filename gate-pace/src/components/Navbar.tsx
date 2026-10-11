'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGateStore, getTodayTaskStats } from '@/store/gateStore';
import {
  Flame,
  Trophy,
  Volume2,
  VolumeX,
  Headphones,
  Calendar,
  Sun,
  Moon,
  Home,
  BookOpen,
  CheckSquare,
  BarChart2,
  CheckCircle2
} from 'lucide-react';

export function getRankInfo(xp: number) {
  if (xp < 500) return { title: 'GATE Aspirant', level: 1, next: 500, color: 'text-zinc-400 dark:text-zinc-300' };
  if (xp < 1500) return { title: 'Concept Specialist', level: 2, next: 1500, color: 'text-cyan-600 dark:text-cyan-400' };
  if (xp < 3500) return { title: 'Subject Master', level: 3, next: 3500, color: 'text-emerald-600 dark:text-emerald-400' };
  if (xp < 7000) return { title: 'Top 1,000 Contender', level: 4, next: 7000, color: 'text-amber-600 dark:text-amber-400' };
  if (xp < 12000) return { title: 'PSU Elite (AIR < 250)', level: 5, next: 12000, color: 'text-purple-600 dark:text-purple-400' };
  return { title: 'AIR 1 Apex Titan', level: 6, next: 25000, color: 'text-rose-600 dark:text-rose-400' };
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const {
    xp,
    streakCount,
    soundEnabled,
    toggleSound,
    activeAmbience,
    setAmbience,
    activeDay,
    selectedDate,
    tasks,
    theme,
    toggleTheme
  } = useGateStore();

  useEffect(() => {
    setMounted(true);
    // Sync html theme class on mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const rank = getRankInfo(xp);
  const xpPercent = Math.min(100, Math.round((xp / rank.next) * 100));
  
  // Real-time calculation of today's tasks
  const todayStats = getTodayTaskStats(tasks, activeDay);

  const navLinks = [
    { href: '/', label: 'GATE 2027 Portal', icon: Home },
    { href: '/syllabus', label: 'Detailed Syllabus', icon: BookOpen },
    { href: '/tasks', label: 'Daily Tasks', icon: CheckSquare },
    { href: '/dashboard', label: 'Dashboard & Monitor', icon: BarChart2 }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-cyan-950/70 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md px-4 py-2.5 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Date status */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600 dark:bg-cyan-950 border border-cyan-500/40 text-white dark:text-cyan-400 font-black shadow-[0_0_12px_rgba(6,182,212,0.35)] transition-transform group-hover:scale-105">
              GP
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-xs sm:text-sm bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
                  GATE-PACE 2027
                </span>
                <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.2 rounded-full bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300 font-mono tracking-wide">
                  IIT MADRAS
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3 text-cyan-500 dark:text-cyan-400" />
                  {mounted ? selectedDate : '2026-10-11'}
                </span>
                <span>•</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold font-mono">
                  DAY {mounted ? activeDay : 1}/90
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 ml-4 pl-4 border-l border-slate-200 dark:border-zinc-800 text-xs font-mono">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-300 font-bold border border-cyan-300 dark:border-cyan-800'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Center: GATE Aspirant Element & Live Task Progress Bar */}
        <div className="flex items-center gap-3">
          {/* Daily Streak Flame */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-zinc-900 border border-amber-300 dark:border-amber-900/60 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
            title="Active Preparation Streak"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">
              {mounted ? streakCount : 1}D
            </span>
          </div>

          {/* THE GATE ASPIRANT ELEMENT (Rank, XP, AND Live Daily Task Bar!) */}
          <div
            className="flex flex-col gap-1 min-w-[200px] sm:min-w-[240px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-300 dark:border-zinc-800 shadow-sm"
            title="GATE Aspirant Profile: Reflects your rank level and today's 3-block completion"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className={`font-semibold font-mono text-[11px] ${rank.color}`}>
                  {rank.title}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400">
                Today: {mounted ? todayStats.done : 0}/3 Done ({mounted ? todayStats.percent : 0}%)
              </span>
            </div>

            {/* LIVE REFLECTIVE TASK PROGRESS BAR */}
            <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden border border-slate-300 dark:border-zinc-700/60 relative">
              <div
                className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 h-2 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                style={{ width: `${mounted ? todayStats.percent : 0}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 dark:text-zinc-400">
              <span>Level {rank.level} • {mounted ? xp : 150} XP</span>
              <span>Next Rank: {rank.next} XP</span>
            </div>
          </div>
        </div>

        {/* Right Tools: Ambient Sounds, Theme Toggle, Audio */}
        <div className="flex items-center gap-2">
          {/* Ambient Sound Selector */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 rounded-lg p-1 text-xs">
            <Headphones className="w-3 h-3 text-cyan-600 dark:text-cyan-400 ml-1" />
            <select
              value={activeAmbience}
              onChange={(e) => setAmbience(e.target.value as 'none' | 'binaural_40hz' | 'brown_noise' | 'white_noise')}
              className="bg-transparent text-zinc-700 dark:text-zinc-300 text-[11px] py-0.5 px-1 outline-none font-mono cursor-pointer"
              title="Ambient Focus Soundscape"
            >
              <option value="none">Ambience: Off</option>
              <option value="binaural_40hz">40Hz Gamma Focus</option>
              <option value="brown_noise">Deep Brown Noise</option>
              <option value="white_noise">White Noise Shield</option>
            </select>
          </div>

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-cyan-100 dark:bg-cyan-950 border-cyan-300 dark:border-cyan-800 text-cyan-800 dark:text-cyan-400 hover:bg-cyan-200'
                : 'bg-slate-100 dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 text-zinc-400 hover:text-zinc-600'
            }`}
            title={soundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* LIGHT / DARK THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-300 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 text-zinc-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Links Row */}
      <div className="flex lg:hidden items-center justify-around gap-1 pt-2 mt-2 border-t border-slate-200 dark:border-zinc-800 text-[11px] font-mono">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                isActive
                  ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300 font-bold'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{link.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
};
