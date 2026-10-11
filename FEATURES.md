# GATE-Pace: 90-Day Velocity Engine — Feature Roadmap & Checklist

> An interactive, high-retention task scheduling, monitoring, and GATE CS mastery workspace.

---

## 📊 Feature Implementation Checklist

### 1. Core Architecture & Offline-First Foundation
- [ ] **1.1 Next.js 15 + TypeScript + Tailwind CSS Project Setup**
- [ ] **1.2 Offline-first Local Storage & State Management (Zustand + IndexedDB/LocalStorage)**
- [ ] **1.3 Export / Import User Data (JSON backup and restore)**
- [ ] **1.4 Progressive Web App (PWA) manifest & service worker readiness**

### 2. Daily Command Center & Scheduling (Date & Day Based)
- [ ] **2.1 Current Day & Date Header with Calendar Navigator** (Jump to any date or Day 1-90)
- [ ] **2.2 Pre-seeded 90-Day GATE CS Syllabus & Daily Blueprint** (from official 2027 syllabus)
- [ ] **2.3 Daily 3-Block Architecture**:
  - Block 1: Morning (07:00 – 10:00) Core Tech Breakdown
  - Block 2: Afternoon (11:30 – 14:00) Timed PYQ Drills (20–30 Qs)
  - Block 3: Evening (17:00 – 19:00) Math & Aptitude + Mistake Scrub
- [ ] **2.4 Interactive Tasks & Subtasks Manager**:
  - Add, edit, delete tasks and subtasks
  - Status pipeline: `Todo` ➔ `In Progress` ➔ `Done`
  - Inline notes and resource link attachments
  - Completion progress bar per block and day

### 3. Precision Timers & Activity Logging
- [ ] **3.1 Live Study Stopwatch & Pomodoro Timer** (visual circular progress, session tracking)
- [ ] **3.2 Time Tracking Log ("What I did & When")**:
  - Start time, duration, subject, subtopic, work log note
  - Visual timeline of the day's study sessions
- [ ] **3.3 PYQ Per-Question Stopwatch**:
  - Soft warning at 2:00 mins (pacing alert)
  - Circuit-breaker at 3:30 mins ("Flag as Stuck / Skip")
  - Quick status logger: Correct / Slow / Failed / Stuck

### 4. Daily Practice Questions & Date-Wise PYQ Logger
- [ ] **4.1 Date-based Question Logger** (track questions solved on specific dates)
- [ ] **4.2 Question metadata**: Subject, Topic, Type (`MCQ`, `MSQ`, `NAT`), Source (`GATE Year` / `GateOverflow`)
- [ ] **4.3 Direct 1-Click "Send to Mistake Diary"** upon incorrect or stuck status

### 5. Structured Mistake Diary (Cognitive Error Taxonomy)
- [ ] **5.1 5-Category Root Cause Classification**:
  - `Calculation / Arithmetic`
  - `Misread Question`
  - `Edge Case Blindspot`
  - `Conceptual Gap`
  - `Time Pressure`
- [ ] **5.2 Mistake Entry Details**: Problem statement, Blunder notes, Correct approach, References
- [ ] **5.3 Error Remediation System**: Mark as resolved only after 2 consecutive correct re-attempts
- [ ] **5.4 Error Distribution Analytics** (Pie/Donut chart of where marks are lost)

### 6. Interactive Visual Effects & High-Retention Gamification
- [ ] **6.1 Cyber-Focus Visual Theme**: High-contrast dark dashboard with neon glow accents, smooth animations
- [ ] **6.2 Gamification Engine**:
  - Daily Study Streak counter (with freeze protection)
  - Velocity Meter (Ahead / On Track / Behind)
  - Level / Rank System (Aspirant ➔ Top 1000 ➔ PSU Contender ➔ AIR 1 Contender)
  - Celebration confetti and audio feedback on completing daily blocks
- [ ] **6.3 Focus / Zen Mode**: Distraction-free full-screen timer with ambient soundscape options

### 7. Resource Hub, Notes & Daily Formula Cheat Sheets
- [ ] **7.1 Curated Resource Directory**:
  - Direct links to GeeksforGeeks, GateOverflow, standard textbook chapters, and NPTEL
  - Highlighting and personal annotation pins
- [ ] **7.2 In-App Rich Notes Editor**:
  - Markdown support, code formatting, subject tagging
  - Mark notes as "Important / Starred"
- [ ] **7.3 Daily Formula Sheets Deck (Quick Recall)**:
  - Subject-by-subject cheat sheets covering all 10 GATE CS subjects + Math
  - Interactive Flashcard Mode for daily formula reinforcement (Master Theorem, AMAT, EMAT, Paging, Graphs, etc.)

### 8. Analytics & Velocity Dashboard
- [ ] **8.1 Planned vs Actual Study Hours Burn-Down**
- [ ] **8.2 Subject Mastery Heatmap** (Accuracy & completion per subject)
- [ ] **8.3 PYQ Accuracy & Average NAT Solving Speed Metrics**

---
*Created on 2026-10-11 for GATE CS PSU Velocity Engine.*
