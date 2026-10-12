'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { GateBot } from '@/components/GateBot';

export default function BotPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 pb-24 md:pb-10">
        <GateBot />
      </main>
    </div>
  );
}
