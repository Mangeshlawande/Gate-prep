# GATE-Pace: 90-Day Velocity Engine — Feature Roadmap & Checklist

> An interactive, high-retention task scheduling, monitoring, and GATE CS mastery workspace.

---

## 📊 Feature Implementation Status

### 1. Core Architecture & Offline-First Foundation
- [x] **1.1 Next.js 16 + React 19 + TypeScript + Tailwind CSS Project Setup**
- [x] **1.2 Offline-first Local Storage & State Management (Zustand with `persist` middleware)**
- [x] **1.3 Export / Import User Data (JSON backup and restore)**
- [x] **1.4 Progressive Web App (PWA) and zero-friction dev setup via root proxy scripts**

### 2. Daily Command Center & Scheduling (Date & Day Based)
- [x] **2.1 Current Day & Date Header with Calendar Navigator** (Jump to any date or Day 1-90, `[J]` / `[K]` keys)
- [x] **2.2 Pre-seeded 90-Day GATE CS Syllabus & Daily Blueprint** (from official 2027 syllabus & `generate_gate_plan.py`)
- [x] **2.3 Daily 3-Block Architecture**:
  - Block 1: Morning (07:00 – 10:00) Core Tech Breakdown
  - Block 2: Afternoon (11:30 – 14:00) Timed PYQ Drills (25 Qs target)
  - Block 3: Evening (17:00 – 19:00) Math & Aptitude + Mistake Scrub
- [x] **2.4 Interactive Tasks & Subtasks Manager**:
  - Direct 3-state status switcher: `[TODO]`, `[ACTIVE]`, `[DONE]`
  - Real-time reactivity syncing with the GATE Aspirant profile badge
  - Inline notes and resource link attachments
  - Completion progress bar per block and day

### 3. Precision Timers & Activity Logging
- [x] **3.1 Live Study Stopwatch & Pomodoro Timer** (visual circular progress, session tracking)
- [x] **3.2 Time Tracking Log ("What I did & When")**:
  - Start time, duration, subject, block tag, work log note
  - Visual timeline of the day's study sessions
- [x] **3.3 PYQ Per-Question Stopwatch**:
  - Soft warning at 2:00 mins (pacing alert beep)
  - Circuit-breaker at 3:30 mins ("Flag as Stuck / Skip" alert)
  - Quick status logger: Correct First Try / Correct Slow / Incorrect / Stuck

### 4. Daily Practice Questions & Date-Wise PYQ Logger
- [x] **4.1 Date-based Question Logger** (track questions solved on specific dates with calendar picker)
- [x] **4.2 Question metadata**: Subject, Topic, Type (`MCQ`, `MSQ`, `NAT`), Source (`GATE Year` / `GateOverflow`)
- [x] **4.3 Direct 1-Click "Send to Mistake Diary"** upon incorrect or stuck status

### 5. Structured Mistake Diary (Cognitive Error Taxonomy)
- [x] **5.1 5-Category Root Cause Classification**:
  - `Calculation / Arithmetic`
  - `Misread Question`
  - `Edge Case Blindspot`
  - `Conceptual Gap`
  - `Time Pressure`
- [x] **5.2 Mistake Entry Details**: Problem statement, Blunder notes, Correct approach, References
- [x] **5.3 Error Remediation System**: Requires 2 consecutive correct solves to mark as resolved
- [x] **5.4 Error Distribution Analytics** (Percentage distribution bar of where marks are lost)

### 6. Interactive Visual Effects & High-Retention Gamification
- [x] **6.1 Cyber-Focus Visual Theme**: High-contrast dark dashboard with neon cyan & emerald glow accents
- [x] **6.2 Gamification Engine**:
  - Daily Study Streak counter (with freeze protection)
  - Velocity Meter (Ahead / On Track / Behind)
  - Level / Rank System (Aspirant ➔ Top 1000 ➔ PSU Contender ➔ AIR 1 Apex Titan)
  - Celebration confetti (`canvas-confetti`) and synthesized Web Audio chime on block completion
- [x] **6.3 Ambient Focus Soundscapes**: Synthesized 40Hz Gamma wave focus tone, Brown noise, and White noise

### 7. Resource Hub, Notes & Daily Formula Cheat Sheets
- [x] **7.1 Curated Resource Directory**:
  - Direct links to GeeksforGeeks, GateOverflow, standard textbook chapters, and official TCS Virtual Calculator
  - Highlighting and personal annotation pins
- [x] **7.2 In-App Rich Notes Editor**:
  - Markdown notes with code blocks, subject tagging, and "Mark as Important / Starred ⭐"
- [x] **7.3 Daily Formula Sheets Deck (Quick Recall)**:
  - Subject-by-subject cheat sheets covering all 10 GATE CS subjects + Math
  - Interactive Flashcard Mode for daily formula reinforcement (Master Theorem, AMAT, EMAT, Paging, Graphs, etc.)

### 8. Analytics & Velocity Dashboard
- [x] **8.1 Planned vs Actual Study Hours Burn-Down & Velocity Score**
- [x] **8.2 Question Accuracy by Taxonomy** (MCQ vs MSQ vs NAT performance)
- [x] **8.3 Offline Data Vault** (Full JSON backup export & restore)

### 9. Official GATE 2027 Information Portal & Subject Weightages
- [x] **9.1 Organizing Institute (IIT Madras)** highlights, dates (Feb 6–21, 2027), 3-hour CBT, 65 questions, 100 marks
- [x] **9.2 Question Taxonomy**: MCQ (-0.33/-0.66), MSQ (No negative, no partial), NAT (Zero negative)
- [x] **9.3 Subject-Wise Topic Weightage & Marks Distribution Table**:
  - General Aptitude: 15 Marks
  - Engineering Math: 13 Marks
  - Discrete Math: ~8 Marks
  - Programming & DS: ~10-12 Marks
  - Algorithms: ~8-10 Marks
  - Theory of Computation: ~8-10 Marks
  - Compiler Design: ~4-5 Marks
  - Operating Systems: ~8-10 Marks
  - Databases: ~7-8 Marks
  - Computer Organization: ~8-9 Marks
  - Computer Networks: ~7-9 Marks
  - Digital Logic: ~4-6 Marks
- [x] **9.4 High-Yield Relevant Sample Questions & Solutions with Exam Traps**
- [x] **9.5 Built-In Internet Search Integration** (Direct query triggers to Google & GateOverflow)

### 10. Multi-Page Architecture & Light/Dark Theme Support
- [x] **10.1 Dedicated Page Routing**:
  - `/` — GATE 2027 Portal & Overview
  - `/syllabus` — Detailed Syllabus Directory
  - `/tasks` — Daily Tasks & 90-Day Matrix
  - `/dashboard` — Performance Monitoring & Study Workspace
- [x] **10.2 Global Navbar Links**: Instant seamless navigation across all 4 pages
- [x] **10.3 Native Light & Dark Theme Support**: Fast toggle with persistent preferences
- [x] **10.4 Bug Fix**: Fixed the "GATE Aspirant" rank element to include a live **Today's Tasks Progress Bar** (`Tasks: X/3 Done`) that updates dynamically whenever tasks are toggled between Todo, Active, and Done.

---

## 🚀 Running the App
Run either from the root or within `gate-pace`:
```bash
# From /home/mangesh/GATE
npm run dev

# Or from /home/mangesh/GATE/gate-pace
cd gate-pace
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
