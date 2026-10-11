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
    toggleTheme
  } = useGateStore();

  useEffect(() => {
    setMounted(true);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Portal', icon: Home },
    { href: '/plan', label: 'Plan', icon: CalendarDays },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/syllabus', label: 'Syllabus', icon: BookOpen },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart2 },
    { href: '/bot', label: 'AI Guide', icon: Bot }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600 dark:bg-cyan-950 border border-cyan-500/40 text-white dark:text-cyan-400 font-black shadow-sm transition-transform group-hover:scale-105">
              GP
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-sm sm:text-base bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-400 dark:to-teal-300 bg-clip-text text-transparent">
                GATE-PACE
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300">
                Day {mounted ? activeDay : 1}
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
        <div className="flex items-center gap-2">
          {/* Active Preparation Streak */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/50"
            title="Daily Study Streak"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400 text-xs">
              {mounted ? streakCount : 1}d
            </span>
          </div>

          {/* Sound Effects Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-colors ${
              soundEnabled
                ? 'bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400'
                : 'bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-600'
            }`}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Light / Dark Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-zinc-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Mobile Navigation Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 px-4 py-3 space-y-1 font-mono text-xs">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-bold border border-cyan-200 dark:border-cyan-800'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
