'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGateStore } from '@/store/gateStore';
import {
  Flame,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Home,
  BookOpen,
  CheckSquare,
  BarChart2,
  Menu,
  X,
  Bot,
  CalendarDays
} from 'lucide-react';

export function getRankInfo(xp: number) {
  if (xp < 500) return { title: 'GATE Aspirant', level: 1, next: 500, color: 'text-zinc-500 dark:text-zinc-400' };
  if (xp < 1500) return { title: 'Concept Specialist', level: 2, next: 1500, color: 'text-cyan-600 dark:text-cyan-400' };
  if (xp < 3500) return { title: 'Subject Master', level: 3, next: 3500, color: 'text-emerald-600 dark:text-emerald-400' };
  if (xp < 7000) return { title: 'Top 1,000 Contender', level: 4, next: 7000, color: 'text-amber-600 dark:text-amber-400' };
  if (xp < 12000) return { title: 'PSU Elite (AIR < 250)', level: 5, next: 12000, color: 'text-purple-600 dark:text-purple-400' };
  return { title: 'AIR 1 Apex Titan', level: 6, next: 25000, color: 'text-rose-600 dark:text-rose-400' };
}

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    streakCount,
    soundEnabled,
    toggleSound,
    activeDay,
    theme,
    toggleTheme,
    xp
  } = useGateStore();

  useEffect(() => {
    // Client-side mount confirmation
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const navLinks = [
    { href: '/', label: 'Portal', icon: Home },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/syllabus', label: 'Syllabus', icon: BookOpen },
    { href: '/dashboard', label: 'Monitor', icon: BarChart2 },
    { href: '/bot', label: 'AI Guide', icon: Bot }
  ];

  const currentRank = getRankInfo(mounted ? xp : 0);

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand & Desktop Navigation */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 min-w-0">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-600 dark:bg-cyan-950 border border-cyan-500/40 text-white dark:text-cyan-400 font-black shadow-sm text-xs sm:text-sm transition-transform group-hover:scale-105">
                GP
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold tracking-wider text-xs sm:text-base bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-300 bg-clip-text text-transparent">
                  GATE-PACE
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300">
                  D{mounted ? activeDay : 1}
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      isActive
                        ? 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800/80'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Active Preparation Streak */}
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/50"
              title="Daily Study Streak"
            >
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500 animate-pulse shrink-0" />
              <span className="font-mono font-bold text-amber-700 dark:text-amber-400 text-[11px] sm:text-xs">
                {mounted ? streakCount : 1}d
              </span>
            </div>

            {/* Sound Effects Toggle */}
            <button
              onClick={toggleSound}
              className={`p-1.5 sm:p-2 rounded-lg border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400'
                  : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-600'
              }`}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              aria-label="Toggle Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Light / Dark Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-zinc-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
              )}
            </button>

            {/* Mobile More Options / Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer touch-manipulation"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide Drawer (Expanded Quick Hub) */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <div
              className="md:hidden fixed inset-0 top-14 sm:top-16 bg-black/60 backdrop-blur-xs z-30 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <div className="md:hidden relative z-40 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 space-y-3 font-mono text-xs shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Rank & XP Card */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Rank Contender</span>
                  <span className={`font-bold text-xs ${currentRank.color}`}>{currentRank.title}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 block">Current XP</span>
                  <span className="font-bold text-xs text-amber-600 dark:text-amber-400">{mounted ? xp : 0} XP</span>
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block px-1">Navigation</span>
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors touch-manipulation ${
                        isActive
                          ? 'bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800'
                          : 'text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 active:bg-slate-200 dark:active:bg-zinc-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
                <Link
                  href="/plan"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors touch-manipulation ${
                    pathname === '/plan'
                      ? 'bg-purple-50 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 active:bg-slate-200 dark:active:bg-zinc-800'
                  }`}
                >
                  <CalendarDays className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>90-Day Weekly Blueprint</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Persistent Mobile Bottom Navigation Dock (Native App Bar) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-slate-200 dark:border-zinc-800/90 px-1 pt-1.5 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
      >
        <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href === '/tasks' && pathname === '/plan');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all touch-manipulation min-h-[48px] ${
                  isActive
                    ? 'text-cyan-600 dark:text-cyan-400 font-bold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 active:text-cyan-600'
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-transform ${
                    isActive
                      ? 'bg-cyan-100/70 dark:bg-cyan-950 border border-cyan-300/60 dark:border-cyan-800/80 scale-105'
                      : 'hover:bg-slate-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <span className="text-[10px] font-mono mt-0.5 tracking-tight truncate max-w-[64px] text-center">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

