'use client';

import React from 'react';
import { useGateStore } from '@/store/gateStore';
import { Flame, Trophy, Volume2, VolumeX, Headphones, Zap, Calendar } from 'lucide-react';

export function getRankInfo(xp: number) {
  if (xp < 500) return { title: 'GATE Aspirant', level: 1, next: 500, color: 'text-zinc-400 border-zinc-700' };
  if (xp < 1500) return { title: 'Concept Specialist', level: 2, next: 1500, color: 'text-cyan-400 border-cyan-800' };
  if (xp < 3500) return { title: 'Subject Master', level: 3, next: 3500, color: 'text-emerald-400 border-emerald-800' };
  if (xp < 7000) return { title: 'Top 1,000 Contender', level: 4, next: 7000, color: 'text-amber-400 border-amber-800' };
  if (xp < 12000) return { title: 'PSU Elite (AIR < 250)', level: 5, next: 12000, color: 'text-purple-400 border-purple-800' };
  return { title: 'AIR 1 Apex Titan', level: 6, next: 25000, color: 'text-rose-400 border-rose-800' };
}

export const Navbar: React.FC = () => {
  const {
    xp,
    streakCount,
    soundEnabled,
    toggleSound,
    activeAmbience,
    setAmbience,
    activeDay,
    selectedDate
  } = useGateStore();

  const rank = getRankInfo(xp);
  const xpPercent = Math.min(100, Math.round((xp / rank.next) * 100));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-950/60 bg-zinc-950/85 backdrop-blur-md px-4 py-3 text-zinc-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Day Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 font-black shadow-[0_0_12px_rgba(6,182,212,0.35)]">
            GP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-sm bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                GATE-PACE
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 font-mono tracking-wide">
                PSU VELOCITY ENGINE
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
              <span className="flex items-center gap-1 font-mono text-zinc-300">
                <Calendar className="w-3 h-3 text-cyan-400" />
                {selectedDate}
              </span>
              <span>•</span>
              <span className="text-cyan-400 font-semibold font-mono">
                DAY {activeDay} / 90
              </span>
            </div>
          </div>
        </div>

        {/* Center: Gamification Stats (Streak, XP, Rank) */}
        <div className="flex items-center gap-3">
          {/* Streak Flame */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-amber-900/60 shadow-[0_0_10px_rgba(245,158,11,0.15)]" title="Daily Study Streak">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="font-mono font-bold text-amber-400 text-sm">
              {streakCount} {streakCount === 1 ? 'DAY' : 'DAYS'}
            </span>
          </div>

          {/* Rank Badge & XP */}
          <div className="hidden sm:flex flex-col gap-1 min-w-[170px] px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                <span className={`font-semibold font-mono text-[11px] ${rank.color}`}>
                  {rank.title}
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {xp} XP
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Tools: Sound, Ambience, Focus Mode */}
        <div className="flex items-center gap-2">
          {/* Ambient Focus Selector */}
          <div className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 rounded-lg p-1 text-xs">
            <Headphones className="w-3.5 h-3.5 text-cyan-400 ml-1" />
            <select
              value={activeAmbience}
              onChange={(e) => setAmbience(e.target.value as 'none' | 'binaural_40hz' | 'brown_noise' | 'white_noise')}
              className="bg-transparent text-zinc-300 text-xs py-0.5 px-1 outline-none font-mono cursor-pointer"
              title="Ambient Focus Soundscape"
            >
              <option value="none" className="bg-zinc-900 text-zinc-300">Ambience: Off</option>
              <option value="binaural_40hz" className="bg-zinc-900 text-zinc-300">40Hz Gamma Focus</option>
              <option value="brown_noise" className="bg-zinc-900 text-zinc-300">Deep Brown Noise</option>
              <option value="white_noise" className="bg-zinc-900 text-zinc-300">White Noise Shield</option>
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-cyan-950/70 border-cyan-800/80 text-cyan-400 hover:bg-cyan-900/60'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-400'
            }`}
            title={soundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
